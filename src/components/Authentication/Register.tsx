import React, { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signOut,
} from 'firebase/auth';
import { auth, firestore } from '../../shared/api/firebase';
import { Link, useNavigate } from 'react-router-dom';
import {
  RegisterContainer,
  ToastMessage,
  WhiteErrorIcon,
  WhiteSuccessIcon,
  LogoName,
  Title,
  InputLabelContainer,
  Input,
  InputLabel,
  SuccessIcon,
  ErrorIcon,
  MainButton,
  Question,
  NextPage,
} from '../../styles/Authentication/LoginRegisterSC';

const RegisterForm: React.FC = () => {
  /* -------------------- State 관리 -------------------- */
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwdChk, setPwdChk] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [passwordValid, setPasswordValid] = useState(2);
  const [passwordMatch, setPasswordMatch] = useState(2);
  const [inputLabelText1, setInputLabelText1] = useState('비밀번호');
  const [inputLabelText2, setInputLabelText2] = useState('비밀번호 확인');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [deviceHeight, setDeviceHeight] = useState(window.innerHeight);
  const navigate = useNavigate();

  // 디바이스 높이를 상태로 저장.
  const handleResize = (): void => {
    setDeviceHeight(window.innerHeight);
  };

  // Toast 메시지를 숨기는 함수
  const hideToastMessage = (): void => {
    setShowToast(false);
    setToastMessage(null);
  };

  // input value값 저장
  const handleEmailInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setEmail(e.target.value);
  };

  const handlePasswordInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const newPassword = e.target.value.trim();
    setPwd(newPassword);

    // 비밀번호 확인 Label 변경 (유효성 검사)
    const isPasswordValid = validatePassword(newPassword);
    if (newPassword !== '') {
      if (isPasswordValid) {
        setPasswordValid(1);
        setInputLabelText1('올바른 비밀번호 형식입니다.');
      } else {
        setPasswordValid(0);
        setInputLabelText1('8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다.');
      }
    } else {
      setPasswordValid(2);
      setInputLabelText1('비밀번호');
    }
  };

  const handlePasswordChkInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const newPasswordChk = e.target.value.trim();
    setPwdChk(newPasswordChk);
  };

  const handleNameInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setName(e.target.value);
  };

  const handleClassInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setPhone(e.target.value);
  };

  /* ------------------ 비밀번호 일치여부 ------------------ */
  // 비밀번호, 비밀번호 확인값 상태 동기화.
  useEffect(() => {
    if (pwdChk !== '') {
      // 비밀번호와 비밀번호 확인 값이 일치하는지 확인
      if (pwd === pwdChk) {
        setPasswordMatch(1);
        setInputLabelText2('비밀번호가 일치합니다.');
      } else {
        setPasswordMatch(0);
        setInputLabelText2('비밀번호가 다릅니다.');
      }
    } else {
      setPasswordMatch(2);
      setInputLabelText2('비밀번호 확인');
    }
  }, [pwd, pwdChk]);

  /* ------------------ Toast 메세지 ------------------ */
  useEffect(() => {
    if (toastMessage !== null) {
      setShowToast(true);
      setTimeout(hideToastMessage, 6000);
    }
  }, [toastMessage]);

  /* ------------------ Container 가운데 정렬 ------------------ */
  useEffect(() => {
    // 브라우저 창 크기가 변경될 때마다 디바이스 높이 업데이트
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  /* -------------------------------- 회원가입 관련 기능 -------------------------------- */
  // 비밀번호는 최소 8자 이상, 영문, 숫자, 특수문자를 포함해야 함.
  const validatePassword = (password: string): boolean => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password); // boolean 반환
  };

  // 회원가입 유효성 검사
  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    if (
      passwordValid === 1 &&
      passwordMatch === 1 &&
      name !== null &&
      phone !== null
    ) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          pwdChk,
        );
        const user = userCredential.user;
        await updateProfile(user, {
          displayName: name, // 이름 업데이트
        });
        await sendEmailVerification(user);

        // Firestore에 사용자 데이터 저장
        const userDocRef = firestore.collection('users').doc(email);
        await userDocRef.set({
          userEmail: email,
          isEmailVerified: false, // 처음에는 이메일 미인증 상태로 저장
        });

        localStorage.setItem('registrationSuccess', 'true');
        await signOut(auth);
        navigate('/login');
      } catch (error) {
        const errorCode = (error as any).code;
        if (typeof errorCode === 'string') {
          switch (errorCode) {
            case 'auth/invalid-email':
              setToastMessage('잘못된 이메일 주소입니다.');
              break;
            case 'auth/email-already-in-use':
              setToastMessage('이미 사용중인 이메일입니다.');
              break;
            default:
              setToastMessage('알 수 없는 오류가 발생했습니다.');
          }
        }
      }
    } else {
      setToastMessage('입력하지 않은 값이 있습니다.');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <RegisterContainer
        style={{
          marginTop: (deviceHeight - 595) / 2,
          marginBottom: (deviceHeight - 707) / 2,
        }}
      >
        {showToast && (
          <ToastMessage
            className={
              toastMessage !== null && toastMessage.includes('전송')
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
        <Title>사원 등록</Title>
        <InputLabelContainer>
          <InputLabel>이메일</InputLabel>
          <Input
            type="email"
            value={email}
            onChange={handleEmailInputChange}
            placeholder="example@email.com"
          />
        </InputLabelContainer>
        <InputLabelContainer>
          <InputLabel
            style={
              passwordValid === 2
                ? {}
                : { color: passwordValid !== 0 ? '#2BDA90' : '#EE5151' }
            }
          >
            {inputLabelText1}
          </InputLabel>
          <Input
            type="password"
            value={pwd}
            onChange={handlePasswordInputChange}
            placeholder="••••"
            style={
              passwordValid === 2
                ? {}
                : { borderColor: passwordValid !== 0 ? '#2BDA90' : '#EE5151' }
            }
          />
          {passwordValid === 2 ? null : pwd !== null && passwordValid !== 0 ? (
            <SuccessIcon />
          ) : (
            <ErrorIcon />
          )}
        </InputLabelContainer>
        <InputLabelContainer>
          <InputLabel
            style={
              passwordMatch === 2
                ? {}
                : { color: passwordMatch !== 0 ? '#2BDA90' : '#EE5151' }
            }
          >
            {inputLabelText2}
          </InputLabel>
          <Input
            type="password"
            value={pwdChk}
            onChange={handlePasswordChkInputChange}
            placeholder="••••"
            style={
              passwordMatch === 2
                ? {}
                : { borderColor: passwordMatch !== 0 ? '#2BDA90' : '#EE5151' }
            }
          />
          {passwordMatch === 2 ? null : pwdChk !== null &&
            passwordMatch !== 0 ? (
            <SuccessIcon />
          ) : (
            <ErrorIcon />
          )}
        </InputLabelContainer>
        <InputLabelContainer>
          <InputLabel>이름</InputLabel>
          <Input
            type="text"
            value={name}
            onChange={handleNameInputChange}
            placeholder="ex) 홍길동"
          />
        </InputLabelContainer>
        <InputLabelContainer>
          <InputLabel>연락처</InputLabel>
          <Input
            type="phone"
            value={phone}
            onChange={handleClassInputChange}
            placeholder="ex) 010-0000-0000"
          />
        </InputLabelContainer>
        <MainButton type="submit">등록하기</MainButton>
        <Question>이미 사원등록을 하셨나요?</Question>
        <Link to="/login">
          <NextPage>로그인 하기</NextPage>
        </Link>
      </RegisterContainer>
    </form>
  );
};

export default RegisterForm;
