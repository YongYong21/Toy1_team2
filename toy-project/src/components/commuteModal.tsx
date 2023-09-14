import React, { useState, useEffect  } from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../styles/Theme"; // Theme.ts에서 테마를 가져옵니다.

import GlobalStyles from "../styles/GlobalStyles"; // GlobalStyles.tsx 파일을 불러옵니다.
import {
  HeaderButton,
  AppWrapper,
  ModalWrapper,
  ModalHeaderContainer,
  ModalTitleText,
  DateText,
  CloseButton,
  ModalContent,
  TimeContainer,
  TimeText,
  OnOffText,
  ButtonContainer,
  TimerText,
  CommuteButton,
} from "../styles/commuteModalStyles";

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
    <ThemeProvider theme={theme}>
      <GlobalStyles /> {/* 전역 스타일을 적용합니다. */}
      <>
        <AppWrapper>
          <header>
            <HeaderButton onClick={toggleModal}>commute</HeaderButton>
          </header>

          {isModalOpen && (
            <ModalWrapper onClick={toggleModal}>
              <ModalContent onClick={(e) => e.stopPropagation()}>
                <div className='triangle'></div>

                <ModalHeaderContainer>
                  <ModalTitleText>출퇴근</ModalTitleText>
                  <DateText>{currentDate}</DateText>
                  <CloseButton onClick={toggleModal}>&times;</CloseButton>
                </ModalHeaderContainer>

                <TimeContainer>
                  <OnOffText isTimerRunning={isTimerRunning}>
                    {isTimerRunning ? `ON` : "OFF"}
                  </OnOffText>
                  <TimeText>{currentTime}</TimeText> {/* 현재 시간 표시 */}
                </TimeContainer>

                <ButtonContainer>
                  <TimerText>
                    {isTimerRunning
                      ? `${seconds}초 동안 일하는 중...`
                      : "출근을 눌러 근무를 시작하세요!"}
                  </TimerText>
                  <CommuteButton onClick={toggleTimer}>
                    {isTimerRunning ? "퇴근" : "출근"}
                  </CommuteButton>
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