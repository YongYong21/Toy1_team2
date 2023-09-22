import styled from 'styled-components';
import { theme } from '../Theme';

export const HeaderButton = styled.button`
  font-family: 'Pretendard', sans-serif;
  font-size: ${theme.textStyles.button.fontSize};
  font-weight: 500;

  border-radius: 50px;

  width: 120px;
  height: 39px;
  margin: 9px 36px 4px 7px;
  padding: 4px 8px;

  background-color: #325183;
  color: ${theme.white};

  line-height: 160%;
  text-align: center; /* 텍스트를 가운데 정렬 */

  float: right;

  &:hover {
    background-color: ${theme.blue800};
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
  flex-direction: column;
`;

export const DateText = styled.p`
  flex: 1;
  font-weight: 500;
  font-size: ${theme.textStyles.body1.fontSize};

  margin: 0 0 4px 12px;

  color: ${theme.gray600};
`;

export const ModalTitleText = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 700;
  margin: 0 0 3px 8px;

  font-size: ${theme.textStyles.subtitle4.fontSize};
  line-height: ${theme.textStyles.subtitle4.lineHeight};
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 45px;
  right: 150px;

  margin-left: 230px;
  font-size: 40px;
`;

export const ModalContent = styled.div`
  padding: 24px;

  background-color: ${theme.gray100};
  border-radius: 14px;
  line-height: 150%;
  width: 490px;

  margin: 30px 120px 30px 30px;

  box-shadow: ${theme.shadows.shadow2.shadow};
  .triangle {
    width: 27px;
    background-color: ${theme.gray100};
    height: 30px;
    border-radius: 3px;

    transform: rotate(135deg);
    right: 210px;
    top: 18px;
    position: absolute;
  }
`;

export const TimeText = styled.span`
  margin: 0 0 8px 8px;

  font-weight: 500;
  font-size: ${theme.textStyles.body1.fontSize};
  color: ${theme.gray600};
`;

TimeText.shouldForwardProp = (prop) => prop !== 'isTimerRunning'; // isTimerRunning 프롭 필터링

export const TimerTextContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 3px;

  background: ${theme.gray300};
  border-radius: 12px;
`;

export const TimerTextTitle = styled.span`
  margin: 10px 0 0 20px;

  font-size: ${theme.textStyles.button.fontSize};
  line-height: ${theme.textStyles.button.lineHeight};

  color: ${theme.gray600};
`;

interface TimerTextProps {
  $isTimerRunning: boolean;
}

export const TimerText = styled.span<TimerTextProps>`
  font-size: 64px; /* 큰 폰트 크기로 설정 */
  align-self: center; /* 가운데 정렬 */

  color: ${(props) => (props.$isTimerRunning ? props.theme.error : 'black')};
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  padding: 30px 0 50px 0;
`;

export const CommuteTimeTextContainer = styled.div`
  display: flex;
  justify-content: space-between; /* 컨테이너 사이의 공간을 동등하게 분할 */
`;

export const WorkStartTextContainer = styled.div`
  flex: 1; /* 가로 공간 동등하게 분할 */
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 텍스트를 오른쪽으로 정렬 */

  background-color: ${theme.gray300};
  border-radius: 12px;
  margin: 10px 5px 0 0;
`;

export const WorkStartTextTitle = styled.span`
  font-size: ${theme.textStyles.button.fontSize};
  line-height: ${theme.textStyles.button.lineHeight};

  color: ${theme.gray600};

  margin: 10px 0 0 20px;
`;

export const WorkStartText = styled.span`
  align-self: center; /* 가운데 정렬 */
  padding: 10px 0 20px 0;

  font-weight: 700;
  font-size: ${theme.textStyles.subtitle2.fontSize};
  color: ${theme.blueBg2};
`;

export const ExpectedWorkEndTextContainer = styled.div`
  flex: 1; /* 가로 공간 동등하게 분할 */
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 텍스트를 오른쪽으로 정렬 */

  background-color: ${theme.gray300};
  border-radius: 12px;
  margin: 10px 0 0 5px;
`;

export const ExpectedWorkEndTextTitle = styled.span`
  font-size: ${theme.textStyles.button.fontSize};
  line-height: ${theme.textStyles.button.lineHeight};

  color: ${theme.gray600};

  margin: 10px 0 0 20px;
`;

export const ExpectedWorkEndText = styled.span`
  align-self: center; /* 가운데 정렬 */
  padding: 10px 0 20px 0;

  font-weight: 700;
  font-size: ${theme.textStyles.subtitle2.fontSize};
  color: ${theme.gray600};
`;

export const BreakTimeText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 40px;
  margin-top: 12px;

  background: ${theme.gray400};
  font-size: ${theme.textStyles.button.fontSize};
  font-weight: 500;
  color: ${theme.blueBg1};
  border-radius: 12px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

/* Button */
export const CommuteButton = styled.button`
  background: ${theme.blue700};
  border-radius: 12px;
  color: white;

  width: 439px;
  height: 48px;
  margin: 14px 0 0 0px;

  transition:
    background-color 0.3s,
    color 0.3s;

  font-family: 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: ${theme.textStyles.button.fontSize};
  line-height: ${theme.textStyles.button.lineHeight};
  text-align: center;

  &:hover {
    background: ${theme.blue800};
  }
`;

export const PauseButton = styled.button`
  background: ${theme.blue300};
  border-radius: 12px;
  color: ${theme.blue700};

  width: 439px;
  height: 48px;
  margin: 14px 10px 0 0;

  transition:
    background-color 0.3s,
    color 0.3s;

  font-family: 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: ${theme.textStyles.button.fontSize};
  line-height: ${theme.textStyles.button.lineHeight};
  text-align: center;

  &:hover {
    background: ${theme.blue400};
  }
`;
