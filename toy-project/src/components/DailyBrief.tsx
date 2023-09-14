import { useEffect, useState } from "react";
import { AngleUp, AngleDown } from "./HeaderSC";

export function DailyBrief() {
  // interface dayProps {
  //   0: string;
  //   1: string;
  //   2: string;
  //   3: string;
  //   4: string;
  //   5: string;
  //   0: string;
  //   0: string;
  // }
  // let dayObj = {
  //   0: "일",
  //   1: "월",
  //   2: "화",
  //   3: "수",
  //   4: "목",
  //   5: "금",
  //   6: "토",
  // };
  let [days, setDays] = useState("");
  useEffect(() => {
    let thisMonth = new Date().getMonth();
    let thisDate = new Date().getDate();
    let thisDay = new Date().getDay();
    console.log(thisMonth, thisDate, thisDay);
    // console.log(dayObj["1"]);
    // setDays(dayObj[thisDay]);
  }, []);

  return (
    <div>
      <div>
        <h3>
          {}월 {}일 {days} 요일
        </h3>
        <h1>안녕하세요, {}님</h1>
      </div>
      <article>
        <div>
          <span>이번 주</span>
          <AngleDown></AngleDown>
        </div>
        <div>
          <span></span>
          <span>완료된 작업</span>
          <span>{}</span>
        </div>
        <div>
          <span></span>
          <span>진행할 작업</span>
          <span>{}</span>
        </div>
      </article>
    </div>
  );
}
