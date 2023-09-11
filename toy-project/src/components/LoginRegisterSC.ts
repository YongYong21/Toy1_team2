import styled from 'styled-components';
import { FaTimesCircle } from 'react-icons/fa';

// 카드 컴포넌트 
export const Container = styled.div`
  margin: 0 auto;
  padding: 24px;
  flex-direction: column;
  align-items: center;
  width: 354px;
  height: 400px;
  font-family: Pretendard;
  text-align: center;
  border: 1px solid #cacaca;
  border-radius: 20px;
  box-shadow: 0px 2px 2px 1px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
`;

// Company Sapce 로고
export const LogoName = styled.h2`
  height: 36px;
  font-size: 24px;
  margin-top: 20px;
  margin-bottom: 0;
  font-weight: 900;
  color: #3a7bdf;
`;

// 로그인, 사원등록 제목
export const Title = styled.p`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 25px;
`;

// input태그 컨테이너
export const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;
// input 태그
export const Input = styled.input`
  margin-bottom: 10px;
  padding: 9px 16px;
  width: 100%;
  height: 40px;
  border: 1px solid rgba(132, 132, 132, 0.5);
  border-radius: 8px;
  box-sizing: border-box;
  background-color: #fdfdfd;
  font-size: 14px;
  font-family: Pretendard;
  outline: none;

  &:focus {
    border-color: #3a7bdf;
  }
`;

// X 아이콘
export const ClearIcon = styled(FaTimesCircle)`
  position: absolute;
  width: 16px;
  top: 40%;
  right: 16px;
  transform: translateY(-50%);
  color: #D0DAE3;
  cursor: pointer;
  transition: all 0.3s;

  &:hover{
    color: #B4BCC6;
  }
`;

// 로그인 및 가입하기 버튼 `btn-bl`
export const MainButton = styled.button`
  margin-bottom: 16px;
  width: 100%;
  padding: 0px 0;
  height: 40px;
  border: 0;
  border-radius: 8px;
  background-color: #3a7bdf;
  color: #ffffff;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: #2565c8;
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
export const NextPage = styled.a`
  margin-bottom: 10px;
  width: 100%;
  height: 40px;
  border: 0px solid;
  border-radius: 8px;
  background-color: #e5f0ff;
  color: #3a7bdf;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  &:hover {
    background-color: #c8deff;
  }
`;
