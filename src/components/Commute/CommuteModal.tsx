import React, { useState, useEffect } from 'react';
import firebase from '../../shared/api/firebase';
import { FaBusinessTime } from 'react-icons/fa';

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
  PauseButton,
} from '../../styles/Commute/CommuteModalSC';

// 초를 시, 분, 초로 변환하는 함수
const formatTimeFromSeconds = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedTime = `${hours.toString().padStart(2, '0')} : ${minutes
    .toString()
    .padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
  return formattedTime;
};

// 시작 시간 포맷팅
function formatWorkStartTime(startTime: Date | null): string {
  if (startTime instanceof Date) {
    const hours = startTime.getHours();
    const minutes = startTime.getMinutes();

    const formattedHours = hours < 10 ? `0${hours}` : hours.toString();
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();

    return `${formattedHours}:${formattedMinutes}`;
  } else {
    return '00:00'; // startTime이 유효하지 않을 때 기본값을 반환합니다.
  }
}

// 퇴근 시간 포맷팅
function formatWorkEndTime(startTime: Date | null): string {
  if (startTime instanceof Date) {
    // 출근 시간에 9시간(540분)을 더해 예상 퇴근 시간을 계산
    const endTime = new Date(startTime.getTime() + 540 * 60 * 1000);

    const hours = endTime.getHours();
    const minutes = endTime.getMinutes();

    const formattedHours = hours < 10 ? `0${hours}` : hours.toString();
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();

    return `${formattedHours}:${formattedMinutes}`;
  } else {
    return '00:00'; // startTime이 유효하지 않을 때 기본값을 반환합니다.
  }
}

function CommuteModal(): JSX.Element {
  // 모달창을 열고 닫는 상태를 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCommuteButtonClicked, setIsCommuteButtonClicked] = useState(false); // 출근 버튼 클릭 상태 추가

  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState(''); // 현재 시간 상태 추가

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [workStartTime, setWorkStartTime] = useState<Date | null>(null); // 출근 시간 상태 변수 추가

  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const [modalTitle, setModalTitle] = useState('');

  const [displayName, setDisplayName] = useState<string>(''); // 사용자 이름 상태 변수 추가

  // 모달창을 열고 닫는 함수
  const toggleModal = (): void => {
    setIsModalOpen(!isModalOpen);
    // 모달 상태를 로컬 스토리지에 저장
    localStorage.setItem('isModalOpen', JSON.stringify(!isModalOpen));
  };

  const toggleTimer = (): void => {
    localStorage.setItem('isCommuteButtonClicked', JSON.stringify(true));

    if (!isTimerRunning) {
      // Timer가 true일 때
      setIsTimerRunning(true);
      setIsCommuteButtonClicked(true);
    } else if (isTimerRunning) {
      // Timer가 false일 때

      if (seconds > 0) {
        setIsTimerRunning(false);
        setIsCommuteButtonClicked(true);

        if (timer !== null) {
          clearInterval(timer);
          setTimer(null);
        }
      }
    }
  };

  // 근무 시간 타이머 일시 정지 함수
  const pauseTimer = (): void => {
    localStorage.setItem('isTimerRunning', JSON.stringify(false));

    setIsTimerRunning(false);

    if (timer !== null) {
      clearInterval(timer);
      setTimer(null);
    }
  };

  const handleCommuteButtonClick = (): void => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = `${hours < 10 ? '0' : ''}${hours}:${
      minutes < 10 ? '0' : ''
    }${minutes}`;

    localStorage.setItem('isTimerRunning', JSON.stringify(true));

    if (seconds > 0) {
      // 타이머가 실행 중인 경우, 업무를 재개할 것인지 확인합니다.
      const confirmation = window.confirm(
        `현재 시각은 ${currentTime} 입니다. 업무를 재개하시겠습니까?`,
      );
      if (confirmation) {
        toggleTimer();
        setIsCommuteButtonClicked(true);

        // 출근 버튼이 클릭되었을 때 로컬 스토리지에 해당 상태 저장
        localStorage.setItem('isCommuteButtonClicked', JSON.stringify(true));
        localStorage.setItem('isTimerRunning', JSON.stringify(true));

        setModalTitle(`${displayName}님 오늘도 파이팅하세요! 👊`); // 멘트 업데이트
      }
    } else {
      localStorage.setItem('isTimerRunning', JSON.stringify(false));

      // 타이머가 실행 중이 아닌 경우, 출근할 것인지 확인합니다.
      const confirmation = window.confirm(
        `현재 시각은 ${currentTime} 입니다. 출근하시겠습니까?`,
      );
      if (confirmation) {
        toggleTimer();

        setIsCommuteButtonClicked(true);
        localStorage.setItem('isTimerRunning', JSON.stringify(true));

        setWorkStartTime(now);
        localStorage.setItem('workStartTime', JSON.stringify(now));

        setModalTitle(`${displayName}님 오늘도 파이팅하세요! 👊`); // 멘트 업데이트
      }
    }
  };

  // reset 타이머 (퇴근)
  const resetTimer = (): void => {
    const now = new Date();
    const hours = now.getHours();
    const currentTime = `${hours < 10 ? '0' : ''}${hours}:${
      now.getMinutes() < 10 ? '0' : ''
    }${now.getMinutes()}`;

    const confirmation = window.confirm(
      `현재 시각은 ${currentTime}입니다. 퇴근하시겠습니까? \n근무 시간: ${formatTimeFromSeconds(
        seconds,
      )}`,
    );
    if (confirmation) {
      setSeconds(0); // 타이머를 리셋하고 초를 0으로 초기화

      // 로컬 스토리지에서 seconds를 초기화
      localStorage.setItem('seconds', JSON.stringify(0));

      setIsTimerRunning(false);
      localStorage.setItem('isTimerRunning', JSON.stringify(false));

      localStorage.setItem('workStartTime', JSON.stringify(null));

      if (timer != null) {
        clearInterval(timer);
        setTimer(null);
      }
      localStorage.setItem('isCommuteButtonClicked', JSON.stringify(false));
      setIsCommuteButtonClicked(false); // seconds가 0일 때 버튼 클릭 상태를 false로 업데이트
      // localStorage.setItem('workStartTime', JSON.stringify(null));

      // 모달 상태를 초기화하여 모달이 닫히도록 설정
      setModalTitle(`${displayName}님 오늘도 수고하셨습니다. 👏`);
    }
  };

  // 오늘 날짜, 현재 시간 표시
  useEffect(() => {
    const today = new Date();
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const formattedDate = `${today.getFullYear()}.${
      today.getMonth() + 1
    }.${today.getDate()}`;
    const dayOfWeek = daysOfWeek[today.getDay()]; // 현재 요일 가져오기
    setCurrentDate(`${formattedDate} ${dayOfWeek}`); // 날짜와 요일을 함께 표시

    // 현재 시간을 얻어와서 시분초 형식으로 포맷팅
    const formatTime = (): string => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
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

  // 페이지 로드 시 로컬 스토리지에서 상태 복원
  useEffect(() => {
    const isModalOpenString = localStorage.getItem('isModalOpen');
    if (isModalOpenString !== null) {
      const isModalOpenFromStorage = JSON.parse(isModalOpenString);
      setIsModalOpen(isModalOpenFromStorage);
    }

    const isCommuteButtonClickedString = localStorage.getItem(
      'isCommuteButtonClicked',
    );
    if (isCommuteButtonClickedString !== null) {
      const isCommuteButtonClickedFromStorage = JSON.parse(
        isCommuteButtonClickedString,
      );
      setIsCommuteButtonClicked(isCommuteButtonClickedFromStorage);
    }

    const secondsInLocalStorage = localStorage.getItem('seconds');
    if (secondsInLocalStorage !== null) {
      const secondsAsNumber = JSON.parse(secondsInLocalStorage);
      setSeconds(secondsAsNumber);
    }

    const isTimerRunningString = localStorage.getItem('isTimerRunning');
    if (isTimerRunningString !== null) {
      const isTimerRunningFromStorage = JSON.parse(isTimerRunningString);
      setIsTimerRunning(isTimerRunningFromStorage);
    }

    const workStartTimeString = localStorage.getItem('workStartTime');
    if (workStartTimeString !== null) {
      const workStartTimeFromStorage = new Date(
        JSON.parse(workStartTimeString),
      );
      setWorkStartTime(workStartTimeFromStorage);
    }
  }, []);

  // 새로 고침해도 시간이 가게 됨!
  useEffect(() => {
    if (isTimerRunning) {
      const timerId = setInterval(() => {
        setSeconds((prevSeconds) => {
          const newSeconds = prevSeconds + 1;
          localStorage.setItem('seconds', JSON.stringify(newSeconds)); // 타이머 초를 저장
          return newSeconds;
        });
      }, 1000);

      return () => {
        clearInterval(timerId); // 컴포넌트가 언마운트되면 타이머 해제
      };
    }
  }, [isTimerRunning]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        const displayName = user.displayName; // 사용자 이름 가져오기
        setDisplayName(displayName ?? '사용자'); // 사용자 이름 업데이트

        // displayName을 modalTitle에 적용
        setModalTitle(`${displayName}님 업무 시작 전 입니다. 👀`);
      }
    });
  }, []);

  return (
    <>
      <AppWrapper>
        <header>
          <HeaderButton onClick={toggleModal}>
            {seconds > 0 ? (
              formatTimeFromSeconds(seconds)
            ) : (
              <FaBusinessTime
                style={{ fontSize: '24px', color: 'white', marginTop: '3px' }}
              />
            )}
          </HeaderButton>
        </header>

        {isModalOpen && (
          <ModalWrapper onClick={toggleModal}>
            <ModalContent
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="triangle"></div>

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
                    <TimerText $isTimerRunning={isTimerRunning}>
                      {formatTimeFromSeconds(seconds)}
                    </TimerText>
                  </TimerTextContainer>

                  <CommuteTimeTextContainer>
                    <WorkStartTextContainer>
                      <WorkStartTextTitle>출근 시간</WorkStartTextTitle>
                      <WorkStartText>
                        {workStartTime !== null && workStartTime !== undefined
                          ? formatWorkStartTime(workStartTime)
                          : '00:00'}
                      </WorkStartText>
                    </WorkStartTextContainer>

                    <ExpectedWorkEndTextContainer>
                      <ExpectedWorkEndTextTitle>
                        예상 퇴근 시간
                      </ExpectedWorkEndTextTitle>
                      <ExpectedWorkEndText>
                        {workStartTime !== null && workStartTime !== undefined
                          ? formatWorkEndTime(workStartTime)
                          : '00:00'}
                      </ExpectedWorkEndText>
                    </ExpectedWorkEndTextContainer>
                  </CommuteTimeTextContainer>

                  <BreakTimeText>점심 시간 12:00~13:00</BreakTimeText>
                </>
              )}
              <ButtonContainer>
                {isTimerRunning && seconds > 0 ? (
                  <>
                    <PauseButton onClick={pauseTimer}>일시 정지</PauseButton>
                    <CommuteButton onClick={resetTimer}>퇴근하기</CommuteButton>
                  </>
                ) : (
                  <CommuteButton onClick={handleCommuteButtonClick}>
                    {seconds === 0 ? '출근하기' : '업무 시작'}
                  </CommuteButton>
                )}
              </ButtonContainer>
            </ModalContent>
          </ModalWrapper>
        )}
      </AppWrapper>
    </>
  );
}

export default CommuteModal;
