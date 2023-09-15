import { useEffect, useState } from "react";
import { AngleUp, AngleDown } from "./HeaderSC";
import firebase from "../api/firebase";

import { BriefContainer, Inner, GreetingArea, CurrentDate, CurrentUser, BriefArea, SelectPeriod, PeriodBtn, Menu, MenuLi, MenuUl, BoardArea, Check, EditNote, BoardEl, WorkType, WorkAmount, UN } from "../styles/DailyBriefSC";

export function DailyBrief() {
  let dayObj = {
    0: "일",
    1: "월",
    2: "화",
    3: "수",
    4: "목",
    5: "금",
    6: "토",
  };

  let [days, setDays] = useState<string>("");
  let [date, setDate] = useState<string>("");
  let [month, setMonth] = useState<string>("");

  let [username, setUsername] = useState("");
  let [done, setDone] = useState(0);
  let [todo, setTodo] = useState(0);
  let [focused, setFocused] = useState(false);
  let [period, setPeriod] = useState("이번 주");

  useEffect(() => {
    let thisMonth = new Date().getMonth();
    let thisDate = new Date().getDate();
    let thisDay = new Date().getDay();
    console.log(thisMonth, thisDate, thisDay);
    console.log(dayObj["1"]);
    setDays(dayObj[thisDay as keyof typeof dayObj]);
    setDate(`${thisDate}`);
    setMonth(`${thisMonth + 1}`);

    const auth = firebase.auth();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const displayName = user.displayName;
        setUsername(displayName || "사용자");
      } else {
        setUsername("사용자");
      }
    });
  }, []);
  useEffect(() => {
    console.log(focused, new Date().getTime());
  }, [focused]);

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
                    let eTarget = e.target as HTMLElement;
                    console.log(eTarget.innerText);
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
