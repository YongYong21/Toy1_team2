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
} from './LoginRegisterSC';


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
  const marginTop = (deviceHeight - 471) / 2;
  const marginBottom = (deviceHeight - 471) / 2;

  /*------------------ Input X 아이콘 기능 ------------------*/
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleClearInput = () => {
    setInputValue('');
  };

  return (
    <form>
      <Container style={{ marginTop: marginTop, marginBottom: marginBottom }}>
        <LogoName>Company Space</LogoName>
        <Title>사원 등록</Title>
        <Input type="email" value={inputValue} onChange={handleInputChange} placeholder="이메일" />
        {inputValue && (
        <ClearIcon onClick={handleClearInput} />
      )}
        <Input type="password" onChange={handleInputChange} placeholder="비밀번호" />
        
        <MainButton>등록하기</MainButton>
        <Question>이미 사원등록을 하셨나요?</Question>

        <Link to="/">
          <NextPage>로그인 하기</NextPage>
        </Link>
      </Container>
    </form>
  );
};

export default FormComponent;
