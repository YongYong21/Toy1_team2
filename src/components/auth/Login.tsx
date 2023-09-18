import React, { useEffect, useState } from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { auth } from '../../api/firebase';
import {
  LoginContainer,
  ToastMessage,
  WhiteErrorIcon,
  WhiteSuccessIcon,
  LogoName,
  Title,
  Input,
  MainButton,
  Question,
  NextPage,
  ClearIcon,
  InputContainer,
} from '../../styles/auth/LoginRegisterSC';

const LoginForm = () => {

/*------------------ Toast 메세지 ------------------*/
// Toast 메시지 상태관리
const [toastMessage, setToastMessage] = useState<string | null>(null);
const [showToast, setShowToast] = useState(false);

// Toast 메시지를 숨기는 함수
const hideToastMessage = () => {
  setShowToast(false);
  setToastMessage('');
};

useEffect(() => {
  if(toastMessage) {
    setShowToast(true);
    setTimeout(hideToastMessage, 3000);
  }
},[toastMessage])

/*------------------ Container 가운데 정렬 ------------------*/

  // 디바이스 높이를 상태로 저장.
  const [deviceHeight, setDeviceHeight] = useState(window.innerHeight);
  useEffect(() => {
    // 브라우저 창 크기가 변경될 때마다 디바이스 높이 업데이트
    const handleResize = () => {
      setDeviceHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  // margin-top과 margin-bottom 계산
  const marginTop = (deviceHeight - 471) / 2;
  const marginBottom = (deviceHeight - 471) / 2;

  /*------------------ Input타입 관련기능 ------------------*/

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  // input value값 저장
  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwd(e.target.value);
  };

  // input value값 초기화 기능
  const handleClearEmailInput = () => {
    setEmail('');
  };
  const handleClearPasswordInput = () => {
    setPwd('');
  };

  // 로그인 페이지가 로드될 때 로컬 스토리지에서 상태를 읽어옴
  useEffect(() => {
    const registrationSuccess = localStorage.getItem('registrationSuccess');
    if (registrationSuccess === 'true') {
      setToastMessage('회원가입이 완료되었습니다. 로그인을 위해 전송된 인증 메일을 확인해주세요.');
      // 로컬 스토리지에서 상태를 삭제 (한 번만 보여주기 위해)
      localStorage.removeItem('registrationSuccess');
    }
  }, []);

  // 로그인 기능
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, pwd)
      .then(() => {
        const user = auth.currentUser;
        if (user) {
          let { emailVerified } = user; // 사용자의 이메일 인증 여부 추출
          if (emailVerified) {
            // 이메일 인증이 완료 된 경우
            setToastMessage('로그인 완료');
            fetchUserProfile();

            /*  여기에 메인 페이지 이동 코드 작성하기!  */

            return;
          } else {
            // 사용자 정보를 초기화하고 로그아웃
            signOut(auth);
            setToastMessage('이메일 인증이 진행되지 않았습니다. 먼저 인증을 진행해주세요.');
            fetchUserProfile();
            return;
          }
        }
      })
      .catch((e) => {
        switch (e.code) {
          case 'auth/invalid-email':
            setToastMessage('이메일을 입력해주세요.');
            break;
          case 'auth/missing-password':
            setToastMessage('비밀번호를 입력해주세요.');
            break;
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            setToastMessage('이메일이나 비밀번호가 올바르지 않습니다.');
            break;
          default:
            setToastMessage('알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.');
        }
      });
  };

  // 프로필 조회용 기능
  const fetchUserProfile = () => {
    const user = auth.currentUser; // 현재 로그인한 사용자 정보를 가져옵니다.

    if (user) {
      const { displayName, email, emailVerified } = user;
      console.log('사용자 이름:', displayName);
      console.log('사용자 이메일:', email);
      console.log('이메일 인증여부:', emailVerified);
    } else {
      // 사용자가 로그인하지 않은 경우
      console.log('사용자가 로그인하지 않았습니다.');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <LoginContainer style={{ marginTop: marginTop, marginBottom: marginBottom }}>
      {showToast && (
          <ToastMessage className={toastMessage?.includes('완료') ? 'success' : 'error'}>
            {toastMessage?.includes('완료') ? <WhiteSuccessIcon /> : <WhiteErrorIcon />}
            {toastMessage}
          </ToastMessage>
        )}
        <LogoName>Company Space</LogoName>
        <Title>로그인</Title>
        <InputContainer>
          <Input type="email" value={email} onChange={handleEmailInputChange} placeholder="이메일" />
          {email && <ClearIcon onClick={handleClearEmailInput} />}
        </InputContainer>
        <InputContainer>
          <Input type="password" value={pwd} onChange={handlePasswordInputChange} placeholder="비밀번호" />
          {pwd && <ClearIcon onClick={handleClearPasswordInput} />}
        </InputContainer>
        <MainButton>로그인</MainButton>
        <Question>아직 등록된 사원이 아니신가요?</Question>
        <Link to="/register">
          <NextPage>사원 등록</NextPage>
        </Link>
        <Link to="/findpw">
          <NextPage>비밀번호 찾기</NextPage>
        </Link>
      </LoginContainer>
    </form>
  );
};

export default LoginForm;
