import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, firestore } from '../../shared/api/firebase';
import { getDoc, doc } from 'firebase/firestore';
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
} from '../../styles/Authentication/LoginRegisterSC';

const FindPwForm: React.FC = () => {
  /* ------------------ State 관리 ------------------ */
  const [email, setEmail] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [deviceHeight, setDeviceHeight] = useState(window.innerHeight);

  // 디바이스 높이를 상태로 저장.
  const handleResize = (): void => {
    setDeviceHeight(window.innerHeight);
  };

  // Toast 메시지를 숨기는 함수
  const hideToastMessage: () => void = () => {
    setShowToast(false);
    setToastMessage(null);
  };

  // email value값 저장
  const handleEmailInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setEmail(e.target.value);
  };

  // email value Clear 버튼 동작 함수
  const handleClearEmailInput = (): void => {
    setEmail('');
  };
  /* ------------------ Toast 메세지 ------------------ */
  useEffect(() => {
    if (toastMessage !== null) {
      setShowToast(true);
      setTimeout(hideToastMessage, 6000);
    }
  }, [toastMessage]);

  /* ------------------ Container 가운데 정렬 ------------------ */
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  /* -------------------------------- 이메일 인증 여부를 확인하는 함수 -------------------------------- */
  const checkEmailVerificationStatus = async (
    email: string,
  ): Promise<boolean> => {
    const userDocRef = doc(firestore, 'users', email);
    const usersDoc = await getDoc(userDocRef);
    const usersDocData = usersDoc.data();
    return usersDocData?.isEmailVerified; // 이메일 인증 여부 반환
  };

  /* -------------------------------- 비밀번호 찾기 기능 -------------------------------- */
  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    const isEmailVerified = await checkEmailVerificationStatus(email);
    if (isEmailVerified) {
      try {
        await auth.sendPasswordResetEmail(email);
        setToastMessage(
          '비밀번호 변경 링크를 이메일로 전송했습니다. 이메일을 확인해주세요.',
        );
      } catch (error) {
        const errorCode = (error as any).code;
        if (typeof errorCode === 'string') {
          switch (errorCode) {
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
        }
      }
    } else {
      setToastMessage(
        '인증되지 않은 이메일입니다. 먼저 이메일 인증을 완료후 로그인을 진행해야 합니다.',
      );
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <FindPwContainer
        style={{
          marginTop: (deviceHeight - 371) / 2,
          marginBottom: (deviceHeight - 371) / 2,
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
          {email !== '' && <ClearIcon onClick={handleClearEmailInput} />}
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
