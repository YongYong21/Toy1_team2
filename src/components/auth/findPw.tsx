import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../api/firebase';
import {
  FindPwContainer,
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

const FindPwForm: React.FC = () => {
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
      setTimeout(hideToastMessage, 3000);
    }
  }, [toastMessage]);

  /* ------------------ Container 가운데 정렬 ------------------ */

  // 디바이스 높이를 상태로 저장.
  const [deviceHeight, setDeviceHeight] = useState(window.innerHeight);
  useEffect(() => {
    // 브라우저 창 크기가 변경될 때마다 디바이스 높이 업데이트
    const handleResize: () => void = () => {
      setDeviceHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  // margin-top과 margin-bottom 계산
  const marginTop = (deviceHeight - 371) / 2;
  const marginBottom = (deviceHeight - 471) / 2;

  /* ------------------ Input타입 관련기능 ------------------ */

  const [email, setEmail] = useState('');

  // input value값 저장
  const handleEmailInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setEmail(e.target.value);
  };

  // input value값 초기화 기능
  const handleClearEmailInput: () => void = () => {
    setEmail('');
  };

  // 비밀번호 찾기 기능
  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setToastMessage(
          '비밀번호 변경 링크를 이메일로 전송했습니다. 이메일을 확인해주세요.',
        );
      })
      .catch((e) => {
        switch (e.code) {
          case 'auth/missing-email':
            setToastMessage('이메일을 입력해주세요.');
            break;
          case 'auth/user-not-found':
            setToastMessage('존재하지 않는 이메일입니다.');
            break;
          default:
            setToastMessage(
              '알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.',
            );
        }
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <FindPwContainer
        style={{ marginTop: marginTop, marginBottom: marginBottom }}
      >
        {showToast && (
          <ToastMessage
            className={
              toastMessage !== null && toastMessage.includes('전송')
                ? 'success'
                : 'error'
            }
          >
            {toastMessage !== null && toastMessage.includes('전송') ? (
              <WhiteSuccessIcon />
            ) : (
              <WhiteErrorIcon />
            )}
            {toastMessage}
          </ToastMessage>
        )}
        <LogoName>Company Space</LogoName>
        <Title>비밀번호 찾기</Title>
        <InputContainer>
          <Input
            type="email"
            value={email}
            onChange={handleEmailInputChange}
            placeholder="이메일"
          />
          {email !== null && <ClearIcon onClick={handleClearEmailInput} />}
        </InputContainer>

        <MainButton>비밀번호 찾기</MainButton>
        <Question>로그인 화면으로 돌아가시겠어요?</Question>
        <Link to="/login">
          <NextPage>로그인 화면으로</NextPage>
        </Link>
      </FindPwContainer>
    </form>
  );
};

export default FindPwForm;
