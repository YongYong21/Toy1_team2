import React, { useState, useEffect  } from "react";
import styled from "styled-components";

const HeaderButton = styled.button`
  font-size: 30px;
  padding: 10px;
  border-radius: 14px;

  background-color: black;
  color: white;
`;

const AppWrapper = styled.div`
    background-color: black;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ModalWrapper = styled.div`
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

const ModalHeaderContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;

const ModalTitleText = styled.p`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 150%;
`;

const DateText = styled.p`
  font-weight: 500;
  font-size: 16px;
  margin-left: 20px;
  color: #9199A4;
`;


const ModalContent = styled.div`
  padding: 24px;

  background-color: #F1F5F8;
  border-radius: 14px;
  line-height: 150%;
  width: 490px;
  height: 308px;

  filter: drop-shadow(0px 12px 40px rgba(0, 0, 0, 0.12));

  .triangle {
    width: 30px;
    background-color: #F1F5F8;
    height: 30px;
    border-radius: 4px;

    transform: rotate(135deg);
    right: 30px;
    top: -10px;
    position: absolute;
}
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 18px;
  cursor: pointer;
`;

const TimeText = styled.p`
  font-size: 64px;
  margin: 30px;
`;

const TimeContainer = styled.div`
  display: flex; /* 내부 요소들을 가로로 정렬 */
  align-items: center; /* 수직 정렬 (중앙 정렬) */
  justify-content: space-between; /* 좌우 간격을 균등하게 배분 */
`;

const OnOffText = styled.p`
  font-size: 16px;
  margin: 20px;
`;

const TimerText = styled.p`
  font-size: 16px;
  margin: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: auto; /* 버튼을 아래로 이동 */
`;

const CommuteButton = styled.button`

    background: #3A7BDF;
    border-radius: 12px;
    color: white; /* 흰색 텍스트 */
    padding: 10px 24px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;

    font-family: 'Pretendard';
    font-style: normal;
    font-size: 12px;
    line-height: 150%;
    text-align: center;

  &:hover {
    background: #2565C8;
  }
`;

function CommuteModal() {
     // 모달창을 열고 닫는 상태를 관리
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState("");
    const [currentTime, setCurrentTime] = useState(""); // 현재 시간 상태 추가

    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);


    // 모달창을 열고 닫는 함수
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
      };
    
      const toggleTimer = () => {
        if (!isTimerRunning) {
          setIsTimerRunning(true);
          setTimer(
            setInterval(() => {
              setSeconds((prevSeconds) => prevSeconds + 1);
            }, 1000)
          );
        } else {
          setIsTimerRunning(false);
          if (timer) {
            clearInterval(timer);
            setTimer(null);
            setSeconds(0); // 타이머를 리셋하고 초를 0으로 초기화
          }
        }
      };

    useEffect(() => {
        const today = new Date();
        const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
        const formattedDate = `${today.getFullYear()}.${today.getMonth() + 1}.${today.getDate()}`;
        const dayOfWeek = daysOfWeek[today.getDay()]; // 현재 요일 가져오기
        setCurrentDate(`${formattedDate} ${dayOfWeek}`); // 날짜와 요일을 함께 표시

        // 현재 시간을 얻어와서 시분초 형식으로 포맷팅
        const formatTime = () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, "0");
            const minutes = now.getMinutes().toString().padStart(2, "0");
            const seconds = now.getSeconds().toString().padStart(2, "0");
            return `${hours}:${minutes}:${seconds}`;
        };
        
        // 1초마다 현재 시간 업데이트
        const intervalId = setInterval(() => {
            setCurrentTime(formatTime());
        }, 1000);
    
        return () => {
            clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 클리어
        };
      }, []);



  return (
    <AppWrapper>
      <header>
        <HeaderButton onClick={toggleModal}>commute</HeaderButton>
      </header>

      {isModalOpen && (
        <ModalWrapper onClick={toggleModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <div className='triangle'></div>
            <ModalHeaderContainer>
                <CloseButton onClick={toggleModal}>&times;</CloseButton>
                <ModalTitleText>출퇴근</ModalTitleText>
                <DateText>{currentDate}</DateText>
            </ModalHeaderContainer>
            <TimeContainer>
                <div>
                    <OnOffText>{isTimerRunning ? `ON` : "OFF"}</OnOffText>
                </div>
                <TimeText>{currentTime}</TimeText> {/* 현재 시간 표시 */}   
            </TimeContainer>
            <ButtonContainer>
                <div>
                    <TimerText>{isTimerRunning ? `${seconds}초 동안 일하는 중...` : "출근을 눌러 근무를 시작하세요!"}</TimerText>
                </div>
                <CommuteButton onClick={toggleTimer}>
                    {isTimerRunning ? "퇴근" : "출근"}
                </CommuteButton>
            </ButtonContainer>    
          </ModalContent>
        </ModalWrapper>
      )}
    </AppWrapper>
  );
}

export default CommuteModal;