import React, { useState, useEffect  } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../../styles/Theme"; // Theme.ts에서 테마를 가져옵니다.

import GlobalStyles from "../../styles/GlobalStyles"; // GlobalStyles.tsx 파일을 불러옵니다.
import {
  HeaderButton,
  AppWrapper,
  ModalWrapper,
  ModalHeaderContainer,
  ModalTitleText,
  DateText,
  CloseButton,
  ModalContent,
  TimeText,
  TimerTextContainer,
  TimerTextTitle,
  TimerText,
  CommuteTimeTextContainer,
  WorkStartTextContainer,
  WorkStartTextTitle,
  WorkStartText,
  ExpectedWorkEndTextContainer,
  ExpectedWorkEndTextTitle,
  ExpectedWorkEndText,
  BreakTimeText,
  ButtonContainer,
  CommuteButton,
  PauseButton
} from "../../styles/CommuteModal/commuteModalStyles";

// 초를 시, 분, 초로 변환하는 함수
const formatTimeFromSeconds = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedTime = `${hours.toString().padStart(2, "0")} : ${minutes.toString().padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`;
  return formattedTime;
};

function formatWorkStartTime(startTime: Date): string {
  const hours = startTime.getHours();
  const minutes = startTime.getMinutes();

  const formattedHours = hours < 10 ? `0${hours}` : hours.toString();
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();

  return `${formattedHours}:${formattedMinutes}`;
}

  function formatWorkEndTime(startTime: Date): string {
    // 출근 시간에 9시간(540분)을 더해 예상 퇴근 시간을 계산
    const endTime = new Date(startTime.getTime() + 540 * 60 * 1000);

    const hours = endTime.getHours();
    const minutes = endTime.getMinutes();

    const formattedHours = hours < 10 ? `0${hours}` : hours.toString();
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();

    return `${formattedHours}:${formattedMinutes}`;
  }

function CommuteModal() : JSX.Element {
     // 모달창을 열고 닫는 상태를 관리
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState("");
    const [currentTime, setCurrentTime] = useState(''); // 현재 시간 상태 추가

    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    const [isCommuteButtonClicked, setIsCommuteButtonClicked] = useState(false); // 출근 버튼 클릭 상태 추가
    const [modalTitle, setModalTitle] = useState("김사원님, 아직 출근전 입니다. 👀");

    const [workStartTime, setWorkStartTime] = useState<Date | null>(null); // 출근 시간 상태 변수 추가

    // 모달창을 열고 닫는 함수
    const toggleModal = (): void => {
      setIsModalOpen(!isModalOpen);
    };

      const toggleTimer = (): void => {
        if (!isTimerRunning) {
          setIsTimerRunning(true);
          setTimer(
            setInterval(() => {
              setSeconds((prevSeconds) => prevSeconds + 1);
            }, 1000)
          );
        } else if (isTimerRunning) {
          if (seconds > 0) {
            setIsTimerRunning(false);
            if (timer !== null) {
              clearInterval(timer);
              setTimer(null);
            }
          }
        }
      };

        // 근무 시간 타이머 일시 정지 함수
        const pauseTimer = (): void => {
          setIsTimerRunning(false);
          if (timer !== null) {
            clearInterval(timer);
            setTimer(null);
          }
        };

        const handleCommuteButtonClick = (): void => {
          const now = new Date();
          const hours = now.getHours();
          const currentTime = `${hours < 10 ? '0' : ''}${hours}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()}`;
        
          if (seconds > 0) {
            // 타이머가 실행 중인 경우, 업무를 재개할 것인지 확인합니다.
            const confirmation = window.confirm(`현재 시각은 ${currentTime} 입니다. 업무를 재개하시겠습니까?`);
            if (confirmation) {
              pauseTimer(); // 휴게 시간 측정 중지
              setIsCommuteButtonClicked(true);
              setModalTitle("김사원님 오늘도 파이팅하세요! 👊"); // 멘트 업데이트
              
                // 출근 시간은 한 번 설정한 후 변경하지 않습니다.
                if (workStartTime === null) {
                  setWorkStartTime(now); // 출근 시간 업데이트
                }
                toggleTimer();
            }
          } else {
            // 타이머가 실행 중이 아닌 경우, 출근할 것인지 확인합니다.
            const confirmation = window.confirm(`현재 시각은 ${currentTime} 입니다. 출근하시겠습니까?`);
            if (confirmation) {
              setIsCommuteButtonClicked(true);
              toggleTimer();
              setModalTitle("김사원님 오늘도 파이팅하세요! 👊"); // 멘트 업데이트
                  // 출근 시간은 한 번 설정한 후 변경하지 않습니다.
              if (workStartTime === null) {
                setWorkStartTime(now); // 출근 시간 업데이트
              }
            }
          }
        };
        const resetTimer = (): void => {
          const now = new Date();
          const hours = now.getHours();
          const currentTime = `${hours < 10 ? '0' : ''}${hours}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()}`;
          
          const confirmation = window.confirm(`현재 시각은 ${currentTime}입니다. 퇴근하시겠습니까? \n근무 시간: ${formatTimeFromSeconds(seconds)}`);
          if (confirmation) {
            setIsTimerRunning(false);
            if (timer != null) {
              clearInterval(timer);
              setTimer(null);
              setSeconds(0); // 타이머를 리셋하고 초를 0으로 초기화
            }

            // 모달 상태를 초기화하여 모달이 닫히도록 설정
              setIsCommuteButtonClicked(false);
              setModalTitle(`김사원님, 오늘도 수고하셨습니다. 👏`);         
            }
        };

    useEffect(() => {
        const today = new Date();
        const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
        const formattedDate = `${today.getFullYear()}.${today.getMonth() + 1}.${today.getDate()}`;
        const dayOfWeek = daysOfWeek[today.getDay()]; // 현재 요일 가져오기
        setCurrentDate(`${formattedDate} ${dayOfWeek}`); // 날짜와 요일을 함께 표시

        // 현재 시간을 얻어와서 시분초 형식으로 포맷팅
        const formatTime = (): string => {
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
    <ThemeProvider theme={theme}>
      <GlobalStyles /> {/* 전역 스타일을 적용합니다. */}
      <>
        <AppWrapper>
          <header>
            <HeaderButton onClick={toggleModal}>
              {seconds > 0 ? formatTimeFromSeconds(seconds) : 'Commute'}
            </HeaderButton>
          </header>

          {isModalOpen && (
            <ModalWrapper onClick={toggleModal}>
              <ModalContent onClick={(e) => { e.stopPropagation(); }}>
                <div className='triangle'></div>

                <ModalHeaderContainer>
                  <DateText>{currentDate}</DateText>
                  <ModalTitleText>{modalTitle}</ModalTitleText>
                  <CloseButton onClick={toggleModal}>&times;</CloseButton>
                </ModalHeaderContainer>
                
                {isCommuteButtonClicked && ( // 출근 버튼이 클릭되면 TimeContainer를 보여줍니다.
                    <>
                    <TimeText>현재 시간 {currentTime}</TimeText>
                    <TimerTextContainer>
                      <TimerTextTitle>근무 시간</TimerTextTitle>
                      <TimerText isTimerRunning={isTimerRunning}>
                        {formatTimeFromSeconds(seconds)}
                      </TimerText>
                    </TimerTextContainer>
                    
                    <CommuteTimeTextContainer>
                      <WorkStartTextContainer>
                        <WorkStartTextTitle>출근 시간</WorkStartTextTitle>
                        <WorkStartText>
                          {workStartTime !== null && workStartTime !== undefined ? formatWorkStartTime(workStartTime) : '00:00'}
                        </WorkStartText>
                      </WorkStartTextContainer>

                      <ExpectedWorkEndTextContainer>
                        <ExpectedWorkEndTextTitle>예상 퇴근 시간</ExpectedWorkEndTextTitle>
                        <ExpectedWorkEndText>
                          {workStartTime !== null && workStartTime !== undefined ? formatWorkEndTime(workStartTime) : '00:00'}
                        </ExpectedWorkEndText>
                      </ExpectedWorkEndTextContainer>
                    </CommuteTimeTextContainer>

                    <BreakTimeText>
                        점심 시간 12:00~13:00
                    </BreakTimeText>
                    
                  </>
                )}
                  <ButtonContainer>
                    {isTimerRunning && seconds > 0 ? (
                      <>
                        <PauseButton onClick={pauseTimer}>
                          일시 정지
                        </PauseButton>
                        <CommuteButton onClick={resetTimer}>
                          퇴근하기
                        </CommuteButton>
                      </>
                    ) : (
                      <CommuteButton onClick={handleCommuteButtonClick}>
                        {seconds === 0 ? "출근하기" : "업무 시작"}
                      </CommuteButton>
                    )}
                  </ButtonContainer>
              </ModalContent>
            </ModalWrapper>
          )}
        </AppWrapper>
      </>
    </ThemeProvider>
  );
};

export default CommuteModal;