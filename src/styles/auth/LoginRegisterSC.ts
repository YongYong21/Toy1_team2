import styled, { keyframes } from 'styled-components';
import { FaTimesCircle } from 'react-icons/fa';
import { LuMailSearch, LuMailCheck } from 'react-icons/lu';
import { MdDone, MdOutlineErrorOutline } from 'react-icons/md';

// 카드 컴포넌트 (로그인)
export const LoginContainer = styled.div`
  position: relative;
  box-shadow: ${(props) => props.theme.shadows.shadow2.shadow};
  background-color: ${(props) => props.theme.white};
  margin: 0 auto;
  padding: 24px;
  flex-direction: column;
  align-items: center;
  width: 354px;
  height: 470px;
  text-align: center;
  border: 1px solid #cacaca;
  border-radius: 20px;
`;
// 카드 컴포넌트 (회원가입)
export const RegisterContainer = styled(LoginContainer)`
  height: 650px;
`;
// 카드 컴포넌트 (비밀번호 찾기)
export const FindPwContainer = styled(LoginContainer)`
  height: 370px;
`;

const fadeInOut = keyframes`
  0% { opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { opacity: 0; }
`;

// Toast 메세지
export const ToastMessage = styled.div`
  z-index: 1000;
  position: fixed;
  top: 8%;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 16px 10px 45px;
  border-radius: 8px;
  background-color: rgba(238, 81, 81, 0.8);
  color: white;
  width: auto;
  display: inline-block;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  white-space: nowrap;
  line-height: 1.5;
  animation: ${fadeInOut} 6s ease;

  /* 에러 스타일 */
  &.error {
    background-color: rgba(238, 81, 81, 0.8);
  }

  /* 성공 스타일 */
  &.success {
    background-color: rgba(24, 223, 140, 0.8);
  }
`;

// Company Space 로고
export const LogoName = styled.h2`
  color: ${(props) => props.theme.blue700};
  font-size: ${(props) => props.theme.textStyles.subtitle4.fontSize};
  line-height: ${(props) => props.theme.textStyles.subtitle4.lineHeight};
  height: 36px;
  letter-spacing: -1px;
  margin-top: 10px;
  font-weight: 900;
`;

// 로그인, 사원등록 제목
export const Title = styled.p`
  font-size: ${(props) => props.theme.textStyles.subtitle3.fontSize};
  line-height: ${(props) => props.theme.textStyles.subtitle3.lineHeight};
  font-weight: 600;
  margin-bottom: 25px;
`;

// input태그 부모 컨테이너
export const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

// input태그 부모 컨테이너 (+label)
export const InputLabelContainer = styled(InputContainer)`
  margin-top: 20px;
`;

// input태그 label
export const InputLabel = styled.label`
  font-size: ${(props) => props.theme.textStyles.button.fontSize};
  line-height: ${(props) => props.theme.textStyles.button.lineHeight};
  position: absolute;
  top: -50%;
`;

// input 태그
export const Input = styled.input`
  border: 1px solid ${(props) => props.theme.gray400};
  font-size: ${(props) => props.theme.textStyles.body2.fontSize};
  margin-bottom: 10px;
  padding: 9px 16px;
  width: 100%;
  height: 40px;
  border-radius: 8px;
  outline: none;
  font-family: Pretendard;
  &::placeholder {
    color: ${(props) => props.theme.gray500};
  }
  &:focus {
    border-color: ${(props) => props.theme.blue700};
  }
`;

// X 아이콘
export const ClearIcon = styled(FaTimesCircle)`
  color: ${(props) => props.theme.gray400};
  position: absolute;
  width: 16px;
  top: 40%;
  right: 16px;
  transform: translateY(-50%);
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: ${(props) => props.theme.gray500};
  }
`;

// 인증요청 아이콘
export const AuthIcon = styled(LuMailSearch)`
  color: ${(props) => props.theme.gray600};
  position: absolute;
  width: 16px;
  top: 40%;
  right: 16px;
  transform: translateY(-50%);
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: ${(props) => props.theme.blue700};
  }
`;

// 인증완료 아이콘
export const AuthCheckedIcon = styled(LuMailCheck)`
  color: ${(props) => props.theme.gray400};
  position: absolute;
  width: 16px;
  top: 40%;
  right: 16px;
  transform: translateY(-50%);
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: ${(props) => props.theme.gray500};
  }
`;

// error 아이콘
export const ErrorIcon = styled(MdOutlineErrorOutline)`
  color: ${(props) => props.theme.error};
  position: absolute;
  width: 16px;
  top: 40%;
  right: 16px;
  transform: translateY(-50%);
  transition: all 0.3s;
`;

// Toast용 error 아이콘
export const WhiteErrorIcon = styled(ErrorIcon)`
  color: ${(props) => props.theme.white};
  width: 24px;
  height: 24px;
  top: 50%;
  right: none;
  left: 16px;
  transform: translateY(-50%);
`;

// success 아이콘
export const SuccessIcon = styled(MdDone)`
  color: ${(props) => props.theme.success};
  position: absolute;
  width: 16px;
  top: 40%;
  right: 16px;
  transform: translateY(-50%);
  transition: all 0.3s;
`;

// Toast용 success 아이콘
export const WhiteSuccessIcon = styled(SuccessIcon)`
  color: ${(props) => props.theme.white};
  width: 24px;
  height: 24px;
  top: 50%;
  right: none;
  left: 16px;
  transform: translateY(-50%);
`;

// 로그인 및 가입하기 버튼 `btn-bl`
export const MainButton = styled.button`
  background-color: ${(props) => props.theme.blue700};
  color: ${(props) => props.theme.white};
  margin-bottom: 16px;
  width: 100%;
  padding: 0px 0;
  height: 40px;
  border-radius: 8px;
  font-family: Pretendard;
  font-size: 16px;
  transition: all 0.3s;
  &:hover {
    background-color: ${(props) => props.theme.blue800};
  }
`;

// 페이지 유도 질문태그
export const Question = styled.p`
  width: 100%;
  height: 48px;
  font-size: 16px;
  font-weight: 400;
  border-top: 1px solid rgba(132, 132, 132, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 페이지 유도버튼
export const NextPage = styled.div`
  color: ${(props) => props.theme.blue700};
  margin-bottom: 10px;
  width: 100%;
  height: 40px;
  border: 0px solid;
  border-radius: 8px;
  background-color: #e5f0ff;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  &:hover {
    background-color: ${(props) => props.theme.blue300};
  }
`;
