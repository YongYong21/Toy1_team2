import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  LogoName,
  Title,
  Input,
  MainButton,
  Question,
  NextPage,
  ClearIcon,
  InputContainer,
} from './LoginRegisterSC';

const LoginComponent = () => {
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

  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  // input value값 저장
  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };
  const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };

  // input value값 초기화 기능
  const handleClearEmailInput = () => {
    setEmailValue('');
  };
  const handleClearPasswordInput = () => {
    setPasswordValue('');
  };

  return (
    <form>
      <Container style={{ marginTop: marginTop, marginBottom: marginBottom }}>
        <LogoName>Company Space</LogoName>
        <Title>로그인</Title>
        <InputContainer>
          <Input type="email" value={emailValue} onChange={handleEmailInputChange} placeholder="이메일" />
          {emailValue && <ClearIcon onClick={handleClearEmailInput} />}
        </InputContainer>
        <InputContainer>
          <Input type="password" value={passwordValue} onChange={handlePasswordInputChange} placeholder="비밀번호" />
          {passwordValue && <ClearIcon onClick={handleClearPasswordInput} />}
        </InputContainer>
        <MainButton>로그인</MainButton>
        <Question>아직 등록된 사원이 아니신가요?</Question>
        <Link to="/register">
          <NextPage>사원 등록</NextPage>
        </Link>
      </Container>
    </form>
  );
};

export default LoginComponent;
