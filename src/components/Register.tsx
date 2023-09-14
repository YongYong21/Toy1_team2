import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../api/firebase';
import { Link, useNavigate } from 'react-router-dom';
import {
  RegisterContainer,
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
  AuthIcon,
} from '../styles/LoginRegisterSC';

const FormComponent = () => {
  /*------------------ Form 위치 ------------------*/

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
  const marginTop = (deviceHeight - 721) / 2;
  const marginBottom = (deviceHeight - 721) / 2;

  /* -------------------- useState -------------------- */

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwdChk, setPwdChk] = useState('');
  const [passwordValid, setPasswordValid] = useState(2);
  const [passwordMatch, setPasswordMatch] = useState(2);
  const [inputLabelText1, setInputLabelText1] = useState('비밀번호');
  const [inputLabelText2, setInputLabelText2] = useState('비밀번호 확인');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // input value값 저장
  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  /* -------------------- 비밀번호 유효성 검사 -------------------- */

  // 1. 비밀번호는 최소 8자 이상, 영문, 숫자, 특수문자를 포함해야 함.
  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password); // boolean 반환
  };

  const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value.trim();
    setPwd(newPassword);
    const isPasswordValid = validatePassword(newPassword);

    // 비밀번호 확인 Label 변경
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

  // 2. useEffect로 비밀번호, 비밀번호 확인값 상태 동기화.
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

  const handlePasswordChkInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPasswordChk = e.target.value.trim();
    setPwdChk(newPasswordChk);
  };
  // ----------------------------------------

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleClassInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const navigate = useNavigate();
  // 회원가입 수행 버튼
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordValid === 1 && passwordMatch === 1 && name && phone) {
      createUserWithEmailAndPassword(auth, email, pwdChk)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name, // 이름 업데이트
          });
          localStorage.setItem('registrationSuccess', 'true');
          navigate('/login');
        })
        .catch((e) => {
          switch (e.code) {
            case 'auth/invalid-email':
              alert('잘못된 이메일 주소입니다.');
              break;
            case 'auth/email-already-in-use':
              alert('이미 가입되어 있는 계정입니다.');
              break;
          }
        });
    } else {
      alert('입력하지 않은 값이 있습니다.');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <RegisterContainer style={{ marginTop: marginTop, marginBottom: marginBottom }}>
        <LogoName>Company Space</LogoName>
        <Title>사원 등록</Title>
        <InputLabelContainer>
          <InputLabel>이메일</InputLabel>
          <Input type="email" value={email} onChange={handleEmailInputChange} placeholder="example@email.com" />
          {email && <AuthIcon />}
        </InputLabelContainer>
        <InputLabelContainer>
          <InputLabel style={passwordValid === 2 ? {} : { color: passwordValid ? '#2BDA90' : '#EE5151' }}>
            {inputLabelText1}
          </InputLabel>
          <Input
            type="password"
            value={pwd}
            onChange={handlePasswordInputChange}
            placeholder="••••"
            style={passwordValid === 2 ? {} : { borderColor: passwordValid ? '#2BDA90' : '#EE5151' }}
          />
          {passwordValid === 2 ? null : pwd && passwordValid ? <SuccessIcon /> : <ErrorIcon />}
        </InputLabelContainer>
        <InputLabelContainer>
          <InputLabel style={passwordMatch === 2 ? {} : { color: passwordMatch ? '#2BDA90' : '#EE5151' }}>
            {inputLabelText2}
          </InputLabel>
          <Input
            type="password"
            value={pwdChk}
            onChange={handlePasswordChkInputChange}
            placeholder="••••"
            style={passwordMatch === 2 ? {} : { borderColor: passwordMatch ? '#2BDA90' : '#EE5151' }}
          />
          {passwordMatch === 2 ? null : pwdChk && passwordMatch ? <SuccessIcon /> : <ErrorIcon />}
        </InputLabelContainer>
        <InputLabelContainer>
          <InputLabel>이름</InputLabel>
          <Input type="text" value={name} onChange={handleNameInputChange} placeholder="ex) 홍길동" />
        </InputLabelContainer>
        <InputLabelContainer>
          <InputLabel>연락처</InputLabel>
          <Input type="phone" value={phone} onChange={handleClassInputChange} placeholder="ex) 010-0000-0000" />
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

export default FormComponent;
