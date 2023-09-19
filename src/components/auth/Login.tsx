import React, { useEffect, useState } from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
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
} from '../../styles/Auth/LoginRegisterSC';

const LoginForm: React.FC = () => {
  /* ------------------ Toast 메세지 ------------------ */
  // Toast 메시지 상태관리
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  // Toast 메시지를 숨기는 함수
  const hideToastMessage: () => void = () => {
    setShowToast(false);
    setToastMessage(null);
  };

  useEffect(() => {
    if (toastMessage !== null) {
      setShowToast(true);
      setTimeout(hideToastMessage, 6000);
    }
  }, [toastMessage]);

  /* ------------------ Container 가운데 정렬 ------------------ */

  // 디바이스 높이를 상태로 저장.
  const [deviceHeight, setDeviceHeight] = useState(window.innerHeight);
  useEffect(() => {
    // 브라우저 창 크기가 변경될 때마다 디바이스 높이 업데이트
    const handleResize: () => void = () => {
      setShowToast(false);
      setDeviceHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  // margin-top과 margin-bottom 계산
  const setMarginTop = (deviceHeight - 471) / 2;
  const setMarginBottom = (deviceHeight - 471) / 2;

  /* ------------------ Input타입 관련기능 ------------------ */

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  // input value값 저장
  const handleEmailInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setEmail(e.target.value);
  };
  const handlePasswordInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setPwd(e.target.value);
  };

  // input value값 초기화 기능
  const handleClearEmailInput: () => void = () => {
    setEmail('');
  };
  const handleClearPasswordInput: () => void = () => {
    setPwd('');
  };

  // 로그인 페이지가 로드될 때 로컬 스토리지에서 상태를 읽어옴
  useEffect(() => {
    const registrationSuccess = localStorage.getItem('registrationSuccess');
    if (registrationSuccess === 'true') {
      setToastMessage(
        '회원가입이 완료되었습니다. 로그인을 위해 전송된 인증 메일을 확인해주세요.',
      );
      // 로컬 스토리지에서 상태를 삭제 (한 번만 보여주기 위해 )
      localStorage.removeItem('registrationSuccess');
    }
  }, []);
  // 이전페이지 등록 (로그인 후 이동)
  const navigate = useNavigate();
  // 로그인 기능
  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, pwd);
      const user = auth.currentUser;

      if (user !== null) {
        const { emailVerified } = user; // 사용자의 이메일 인증 여부 추출
        if (emailVerified) {
          // 이메일 인증이 완료 된 경우
          setToastMessage('로그인 완료');

          setTimeout(() => {
            navigate('/');
          }, 1000);
        } else {
          // 사용자 정보를 초기화하고 로그아웃
          await signOut(auth); // signOut 함수 반환 프로미스 처리
          setToastMessage(
            '이메일 인증이 진행되지 않았습니다. 먼저 인증을 진행해주세요.',
          );
        }
      }
    } catch (e) {
      const errorCode = (e as any).code;
      if (typeof errorCode === 'string') {
        switch (errorCode) {
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
            setToastMessage(
              '알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.',
            );
        }
      } else {
        setToastMessage('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <LoginContainer
        style={{ marginTop: setMarginTop, marginBottom: setMarginBottom }}
      >
        {showToast && (
          <ToastMessage
            className={
              toastMessage !== null && toastMessage.includes('완료')
                ? 'success'
                : 'error'
            }
          >
            {toastMessage !== null && toastMessage.includes('완료') ? (
              <WhiteSuccessIcon />
            ) : (
              <WhiteErrorIcon />
            )}
            {toastMessage}
          </ToastMessage>
        )}
        <LogoName>Company Space</LogoName>
        <Title>로그인</Title>
        <InputContainer>
          <Input
            type="email"
            value={email}
            onChange={handleEmailInputChange}
            placeholder="이메일"
          />
          {email !== '' && <ClearIcon onClick={handleClearEmailInput} />}
        </InputContainer>
        <InputContainer>
          <Input
            type="password"
            value={pwd}
            onChange={handlePasswordInputChange}
            placeholder="비밀번호"
          />
          {pwd !== '' && <ClearIcon onClick={handleClearPasswordInput} />}
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
