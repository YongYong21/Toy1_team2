import { useEffect, useState } from 'react';
import { AngleUp, AngleDown } from '../../styles/Home/HeaderSC';
import firebase from '../../api/firebase';

import {
  BriefContainer,
  Inner,
  GreetingArea,
  CurrentDate,
  CurrentUser,
  BriefArea,
  SelectPeriod,
  PeriodBtn,
  Menu,
  MenuLi,
  MenuUl,
  BoardArea,
  Check,
  EditNote,
  BoardEl,
  WorkType,
  WorkAmount,
  UN,
} from '../../styles/Home/DailyBriefSC';

interface TaskProps {
  todo: Array<[string, number, string, string]>;
  done: Array<[string, number, string, string]>;
}

const dayObj = {
  0: '일',
  1: '월',
  2: '화',
  3: '수',
  4: '목',
  5: '금',
  6: '토',
};

const monthObj = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export function DailyBrief({ todo, done }: TaskProps): JSX.Element {
  const [days, setDays] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [month, setMonth] = useState<string>('');

  const [username, setUsername] = useState('');
  const [focused, setFocused] = useState(false);
  const [period, setPeriod] = useState('이번 주');
  const [nums, setNums] = useState([todo.length, done.length]);

  useEffect(() => {
    const thisMonth = new Date().getMonth();
    const thisDate = new Date().getDate();
    const thisDay = new Date().getDay();
    setDays(dayObj[thisDay as keyof typeof dayObj]);
    setDate(`${thisDate}`);
    setMonth(`${thisMonth + 1}`);

    firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        const displayName = user.displayName;
        setUsername(displayName ?? '사용자');
      } else {
        setUsername('사용자');
      }
    });
  }, []);

  useEffect(() => {
    sortTodo();
  }, [todo]);
  useEffect(() => {
    sortTodo();
  }, [period]);

  const isThereCreatedDay = (
    tasks: Array<[string, number, string, string]>,
  ): boolean => {
    let flag = true;
    const temp = tasks.slice();
    for (let i = 0; i < temp.length; i++) {
      if (temp[i][3] === undefined) {
        temp[i][3] = '2023 8 21 4';
        flag = false;
      }
    }
    if (!flag) {
      const strfied = JSON.stringify(temp);
      localStorage.setItem('todo', strfied);
      setNums([todo.length, done.length]);
    }
    return flag;
  };

  const sortTodo = (): void => {
    const thisYear = new Date().getFullYear();
    const thisMonth = new Date().getMonth() + 1;
    const thisDate = new Date().getDate();
    let thisDay = new Date().getDay();

    let todoCnt = 0;
    let doneCnt = 0;

    if (period === '전체') {
      setNums([todo.length, done.length]);
    } else if (period === '이번 달') {
      // 생성일이 없으면 일단 '오늘'로 채워넣고 로컬스토리지 저장하는 함수
      isThereCreatedDay(todo);
      isThereCreatedDay(done);

      todo.forEach((task) => {
        const whenItIsMade = task[3].split(' ');
        const birthYear = Number(whenItIsMade[0]);
        const birthMonth = Number(whenItIsMade[1]) + 1;

        if (birthYear === thisYear && birthMonth === thisMonth) {
          todoCnt += 1;
        }
      });

      done.forEach((task) => {
        const whenItIsMade = task[3].split(' ');
        const birthYear = Number(whenItIsMade[0]);
        const birthMonth = Number(whenItIsMade[1]) + 1;

        if (birthYear === thisYear && birthMonth === thisMonth) {
          doneCnt += 1;
        }
      });

      setNums([todoCnt, doneCnt]);
    } else if (period === '이번 주') {
      // 일요일: 0인데 7로 변환
      if (thisDay === 0) {
        thisDay = 7;
      }

      // 이번주 월요일을 구하기
      let mondayOfThisWeek = thisDate - thisDay + 1;

      if (mondayOfThisWeek <= 0) {
        mondayOfThisWeek = monthObj[thisMonth] - mondayOfThisWeek;
      }

      todo.forEach((task) => {
        const whenItIsMade = task[3].split(' ');
        const birthYear = Number(whenItIsMade[0]);
        const birthMonth = Number(whenItIsMade[1]) + 1;
        const birthDate = Number(whenItIsMade[2]);

        if (
          birthYear === thisYear &&
          birthMonth === thisMonth &&
          birthDate <= thisDate
        ) {
          todoCnt += 1;
        }
      });

      done.forEach((task) => {
        const whenItIsMade = task[3].split(' ');
        const birthYear = Number(whenItIsMade[0]);
        const birthMonth = Number(whenItIsMade[1]) + 1;
        const birthDate = Number(whenItIsMade[2]);

        if (
          birthYear === thisYear &&
          birthMonth === thisMonth &&
          birthDate <= thisDate
        ) {
          doneCnt += 1;
        }
      });
      setNums([todoCnt, doneCnt]);
    }
  };

  const onClickMenu = (e: React.MouseEvent<HTMLUListElement>): void => {
    e.stopPropagation();
    const eTarget = e.target as HTMLElement;
    setPeriod(eTarget.innerText);
    setFocused(false);
  };

  const onClickPeriodBtn = (): void => {
    setFocused(true);
  };

  const onBlurPeriodBtn = (): void => {
    setFocused(false);
  };

  return (
    <BriefContainer>
      <Inner>
        <GreetingArea>
          <CurrentDate>
            {month}월 {date}일 {days}요일
          </CurrentDate>
          {username === '사용자' ? (
            <CurrentUser>
              효율적인 <UN>일정관리</UN>를 시작해보세요.
            </CurrentUser>
          ) : (
            <CurrentUser>
              안녕하세요,&nbsp;
              <UN>{username.length > 8 ? username.slice(0, 8) : username}</UN>님
            </CurrentUser>
          )}
        </GreetingArea>
        <BriefArea>
          <SelectPeriod onClick={onClickPeriodBtn} onBlur={onBlurPeriodBtn}>
            <PeriodBtn>{period}</PeriodBtn>
            <div>{focused ? <AngleUp></AngleUp> : <AngleDown></AngleDown>}</div>
            {focused ? (
              <Menu>
                <MenuUl className="menu-ul" onClick={onClickMenu}>
                  <MenuLi>이번 주</MenuLi>
                  <MenuLi>이번 달</MenuLi>
                  <MenuLi>전체</MenuLi>
                </MenuUl>
              </Menu>
            ) : null}
          </SelectPeriod>
          <BoardArea>
            <BoardEl>
              <Check></Check>
              <WorkType>완료된 작업</WorkType>
              <WorkAmount>{nums[1]}</WorkAmount>
            </BoardEl>
            <BoardEl>
              <EditNote></EditNote>
              <WorkType>진행할 작업</WorkType>
              <WorkAmount>{nums[0]}</WorkAmount>
            </BoardEl>
          </BoardArea>
        </BriefArea>
      </Inner>
    </BriefContainer>
  );
}
