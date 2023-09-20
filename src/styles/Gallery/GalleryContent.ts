import styled, { keyframes } from 'styled-components';

export const FlexBox = styled.div`
  display: flex;
  flex-direction: column;

  margin: 0 auto;
  margin-left: 300px;

  width: 80%;

  padding: 2%;
`;

export const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;

  margin: 1rem auto 0;

  width: 90%;
`;

export const Title = styled.h1`
  font-size: ${(props) => props.theme.textStyles.subtitle1.fontSize};
`;

export const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoadingSpinner = styled.div`
  border: 6px solid rgba(0, 0, 0, 0.3);
  border-top: 6px solid ${(props) => props.theme.blue700};
  border-radius: 50%;

  width: 50px;
  height: 50px;

  animation: ${spin} 1s linear infinite;
`;

export const AddButton = styled.button`
  width: 7.8rem;

  margin: 2px 0;
  padding: 12px 32px;

  border-radius: 8px;
  border: none;

  background-color: ${(props) => props.theme.blue700};

  font-size: ${(props) => props.theme.textStyles.button.fontSize};
  color: white;

  &:hover {
    background-color: ${(props) => props.theme.blue800};

    transition: 0.3s;
  }
`;

export const Main = styled.div`
  width: 100%;
  min-height: 100vh;

  // 로딩 애니메이션을 위해 center
  display: flex;
  justify-content: center;

  margin: 0 auto;
  padding: 3rem;
`;

export const DeleteButton = styled.button`
  position: absolute;

  top: 30px;
  right: 30px;

  font-size: 2rem;
  color: ${(props) => props.theme.blue600};
`;
