import styled from "styled-components";

export const HeaderButton = styled.button`
  font-size: ${({ theme }) => theme.textStyles.button.fontSize};
  border-radius: 12px;

  width: 127px;
  height: 39px;
  margin : 7px;

  background-color: ${props => props.theme.gray200};
  color: black;

  line-height: 160%;
  text-align: center; /* 텍스트를 가운데 정렬 */

  &:hover {
      background-color: ${props => props.theme.gray300};
    }
`;

export const AppWrapper = styled.div`
  background-color: white;
  height: 56px;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const ModalWrapper = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 50px;
    right: 0;
    left: 0;
    bottom: 0;

    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    z-index: 1;
`;

export const ModalHeaderContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const ModalTitleText = styled.p`
    font-family: 'Pretendard', sans-serif;
    font-style: normal;
    font-weight: 700;

    font-size: ${({ theme }) => theme.textStyles.subtitle4.fontSize};
    line-height: ${({ theme }) => theme.textStyles.subtitle4.lineHeight};
`;

export const DateText = styled.p`
  font-weight: 500;
  font-size: ${({ theme }) => theme.textStyles.body1.fontSize};
  
  margin-left: 20px;
  margin-bottom: 4px;

  color: ${({ theme }) => theme.gray600};
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 36px;
`;


export const ModalContent = styled.div`
  padding: 24px;

  background-color: ${({ theme }) => theme.gray200};
  border-radius: 14px;
  line-height: 150%;
  width: 490px;
  height: 320px;

  box-shadow: ${({ theme }) => theme.shadows.shadow3.shadow};
  .triangle {
    width: 30px;
    background-color: ${({ theme }) => theme.gray200};;
    height: 30px;
    border-radius: 4px;

    transform: rotate(135deg);
    right: 30px;
    top: -10px;
    position: absolute;
}
`;

export const TimeContainer = styled.div`
  background: ${({ theme }) => theme.gray300};
  border-radius: 12px;

  width: 446px;
  height: 162px;
  margin: 13px 0;

  display: flex; /* 내부 요소들을 가로로 정렬 */
  align-items: center; /* 수직 정렬 (중앙 정렬) */
`;

export const TimeText = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 50px;
  margin-left: 10px;
  letter-spacing : 4px;
`;

interface OnOffTextProps {
  isTimerRunning: boolean;
}

export const OnOffText = styled.p<OnOffTextProps>`
  border-radius: 4px;

  width: 50px;
  padding: 0px 8px;

  font-size: ${({ theme }) => theme.textStyles.subtitle5.fontSize};
  margin: 24px;
  color: ${({ theme }) => theme.white};

  display: flex;
  justify-content: center;

  /* 조건에 따라 배경색 변경 */
  background: ${props => (props.isTimerRunning ? ({ theme }) => theme.error : ({ theme }) => theme.gray700)};
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const TimerText = styled.p`
  background: ${({ theme }) => theme.gray300};
  border-radius: 12px;
  width: 340px;
  height: 48px;

  display: flex;
  justify-content: center;

  color: ${({ theme }) => theme.gray700};
  font-size: ${({ theme }) => theme.textStyles.subtitle5.fontSize};

  padding: 12px;
  margin-right: 16px;
`;

export const CommuteButton = styled.button`
    background: ${({ theme }) => theme.blue700};
    border-radius: 12px;
    color: white;
    padding: 10px 24px;
    transition: background-color 0.3s, color 0.3s;

    font-family: 'Pretendard', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: ${({ theme }) => theme.textStyles.button.fontSize};
    line-height: ${({ theme }) => theme.textStyles.button.lineHeight};
    text-align: center;

  &:hover {
    background: ${({ theme }) => theme.blue800};
  }
`;

export const PauseButton = styled.button`
  // background-color: #f44336;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 16px;
  // margin-left: 10px;

  // &:hover {
  //   background-color: #d32f2f;
  // }
`;
