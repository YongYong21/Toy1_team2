import { useEffect, useState } from 'react';
import { AngleUp, AngleDown } from '../styles/HeaderSC';
import firebase from '../api/firebase';

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
} from '../styles/DailyBriefSC';

export function DailyBrief(): JSX.Element {
  const dayObj = {
    0: '일',
    1: '월',
    2: '화',
    3: '수',
    4: '목',
    5: '금',
    6: '토',
  };

  const [days, setDays] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [month, setMonth] = useState<string>('');

  const [username, setUsername] = useState('');
  const [done] = useState(0);
  const [todo] = useState(0);
  const [focused, setFocused] = useState(false);
  const [period, setPeriod] = useState('이번 주');

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

  return (
    <BriefContainer>
      <Inner>
        <GreetingArea>
          <CurrentDate>
            {month}월 {date}일 {days}요일
          </CurrentDate>
          <CurrentUser>
            안녕하세요,&nbsp;
            <UN>{username.length > 8 ? username.slice(0, 8) : username}</UN>님
          </CurrentUser>
        </GreetingArea>
        <BriefArea>
          <SelectPeriod
            onClick={() => {
              setFocused(true);
            }}
          >
            <PeriodBtn>{period}</PeriodBtn>
            <div>{focused ? <AngleUp></AngleUp> : <AngleDown></AngleDown>}</div>
            {focused ? (
              <Menu>
                <MenuUl
                  className="menu-ul"
                  onClick={(e) => {
                    e.stopPropagation();
                    const eTarget = e.target as HTMLElement;
                    setPeriod(eTarget.innerText);
                    setFocused(false);
                  }}
                >
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
              <WorkAmount>{done}</WorkAmount>
            </BoardEl>
            <BoardEl>
              <EditNote></EditNote>
              <WorkType>진행할 작업</WorkType>
              <WorkAmount>{todo}</WorkAmount>
            </BoardEl>
          </BoardArea>
        </BriefArea>
      </Inner>
    </BriefContainer>
  );
}
