import { useEffect, useState } from "react";
import { BtnSmLi, Plus, TabBtn, TabList, Title, TitleLine, TodoListContainer, TabBtnClk, Th, Tb, Tr, Cell, ChkIcon, NewInput, Col, NewInputContainer, CheckIcon, NoContent } from "../styles/TodoListSC";
import { Height30 } from "../styles/ShortcutSC";
import { Check } from "../styles/DailyBriefSC";

export function TodoList() {
  let [toggleNew, setToggleNew] = useState(false); //새로운 toDo생성 UI 표출/닫힘
  let [newDo, setNewDo] = useState(""); //새로운 할 일 인자
  let [TabMenu, setTabMenu] = useState([1, 0]); // 탭 전환 상태값

  let [todo, setTodo] = useState<[string, number][]>([]); // 할 일 목록
  let [done, setDone] = useState<[string, number][]>([]); // 완료된 일 목록

  //첫 페이지 로딩때만 실행할 로직
  useEffect(() => {
    //localStorage에서 할 일 목록 불러오기 & setTodo()로 설정
    let parsedTodo = JSON.parse(localStorage.getItem("todo") as string) || [];
    setTodo(parsedTodo);

    //localStorage에서 완료된 일 목록 불러오기 & setTodo()로 설정
    let parsedDone = JSON.parse(localStorage.getItem("done") as string) || [];
    setDone(parsedDone);
  }, []);

  let handleSwitchTab = (e: React.MouseEvent<HTMLDivElement>) => {
    let tar = e.target as HTMLElement;
    if (tar.textContent === "진행할 작업") {
      setTabMenu([1, 0]);
    } else {
      setTabMenu([0, 1]);
      setToggleNew(false);
    }
  };

  return (
    <TodoListContainer>
      <TitleLine>
        <Title>할 일</Title>
        {/* 탭에 따라 우측 새 추가 아이콘 표출/숨김 */}
        {!!TabMenu[0] && (
          <BtnSmLi onClick={() => setToggleNew(!toggleNew)}>
            <Plus></Plus>새 추가
          </BtnSmLi>
        )}
        {
          !!TabMenu[1] && <Height30></Height30> //height설정만 있어서 비어있을 때 높이 유지해주는 요소.
        }
      </TitleLine>
      <TabList onClick={handleSwitchTab}>
        {TabMenu[0] === 1 ? <TabBtnClk>진행할 작업</TabBtnClk> : <TabBtn>진행할 작업</TabBtn>}
        {TabMenu[1] === 1 ? <TabBtnClk>완료된 작업</TabBtnClk> : <TabBtn>완료된 작업</TabBtn>}
      </TabList>
      <Th>
        <Col>할일</Col>
        <Col>관련문서</Col>
      </Th>
      {/* 새로운 리스트 추가하기 컴포넌트 */}
      {toggleNew && (
        <NewListInputContainer
          setToggleNew={setToggleNew} //
          newDo={newDo}
          setNewDo={setNewDo}
          todo={todo}
          setTodo={setTodo}
        ></NewListInputContainer>
      )}
      <Tb>
        {/* 리스트 추가되는 곳 */}
        {!!TabMenu[0] && !todo.length && <NoContent>새로운 할 일을 생성해보세요!</NoContent>}
        {!!TabMenu[1] && !done.length && <NoContent>완료한 할 일이 없습니다.</NoContent>}
        {!!TabMenu[0] &&
          todo.map((todoEl) => (
            <ListEl
              todo={todo} //
              listEl={todoEl}
              setTodo={setTodo}
              setDone={setDone}
              done={done}
              TabMenu={TabMenu}
            ></ListEl>
          ))}
        {!!TabMenu[1] &&
          done?.map((doneEl) => (
            <ListEl
              todo={todo} //
              setTodo={setTodo}
              done={done}
              listEl={doneEl}
              setDone={setDone}
              TabMenu={TabMenu}
            ></ListEl>
          ))}
      </Tb>
    </TodoListContainer>
  );
}

function ListEl({
  todo, // 할일 목록 (배열)
  listEl, // 인자 하나하나(배열 아님)
  setTodo, // 할일 목록 setState
  done, //완료된 목록 (배열)
  setDone, // 완료된 목록 setState
  TabMenu, // 탭 메뉴 (현재 뭐 선택되어 있는지)
}: {
  todo: [string, number][];
  listEl: [string, number];
  setTodo: React.Dispatch<[string, number][]>;
  done: [string, number][];
  setDone: React.Dispatch<[string, number][]>;
  TabMenu: number[];
}) {
  //체크버튼 눌러서 todo에서 doned으로 스위치하는 함수
  let switchTodoToDone = (e: React.MouseEvent<HTMLElement>) => {
    let tar = e.currentTarget as HTMLElement; //현재 이벤트 타겟
    let dataset = tar.dataset.id; //HTML DataSet을 iD에 넣어 활용

    // ID에 매칭되는 놈 찾아서 done으로 보내는 과정
    let matched = todo.find((v: [string, number]) => v[1].toString() === dataset) as [string, number];
    let doneCopy: [string, number][] = done.slice();
    doneCopy.unshift(matched);
    let strfiedDone = JSON.stringify(doneCopy);
    localStorage.setItem("done", strfiedDone);
    setDone(doneCopy);

    // ID에 매칭되는 놈 찾아서 todo에서 제거시키는 과정
    let subtracted = todo.filter((v: [string, number]) => v[1].toString() !== dataset);
    let strfiedTodo = JSON.stringify(subtracted);
    localStorage.setItem("todo", strfiedTodo);
    setTodo(subtracted);
  };

  //체크버튼 눌러서 done에서 todo으로 스위치하는 함수
  let switchDoneToTodo = (e: React.MouseEvent<HTMLDivElement>) => {
    let tar = e.currentTarget as HTMLElement; //현재 이벤트 타겟
    let dataset = tar.dataset.id; //HTML DataSet을 iD에 넣어 활용

    // ID에 매칭되는 놈 찾아서 todo로 보내는 과정
    let matched = done.find((v: [string, number]) => v[1].toString() === dataset) as [string, number];
    let todoCopy: [string, number][] = todo.slice();
    todoCopy.unshift(matched);
    let strfiedTodo = JSON.stringify(todoCopy);
    localStorage.setItem("todo", strfiedTodo);
    setTodo(todoCopy);

    // ID에 매칭되는 놈 찾아서 done에서 제거시키는 과정
    let subtracted = done.filter((v: [string, number]) => v[1].toString() !== dataset);
    let strfiedDone = JSON.stringify(subtracted);
    localStorage.setItem("done", strfiedDone);
    setDone(subtracted);
  };

  if (TabMenu[0] === 1) {
    return (
      <Tr>
        <Cell>
          <CheckIcon data-id={listEl[1].toString()} onClick={switchTodoToDone}>
            <ChkIcon />
          </CheckIcon>
          {listEl[0]}
          {/* <EditBtn></EditBtn> */}
        </Cell>
        <Cell>신입사원 필독서</Cell>
      </Tr>
    );
  } else {
    return (
      <Tr>
        <Cell>
          <CheckIcon data-id={listEl[1]?.toString()} onClick={switchDoneToTodo}>
            <ChkIcon />
          </CheckIcon>
          {listEl[0]}
          {/* <EditBtn></EditBtn> */}
        </Cell>
        <Cell>신입사원 필독서</Cell>
      </Tr>
    );
  }
}

function EditBtn() {
  return <button onClick={(e) => {}}>수정</button>;
}

function NewListInputContainer({
  setToggleNew, //
  setNewDo,
  newDo,
  todo,
  setTodo,
}: {
  setToggleNew: React.Dispatch<boolean>;
  setNewDo: React.Dispatch<string>;
  newDo: string;
  todo: [string, number][];
  setTodo: React.Dispatch<[string, number][]>;
}) {
  return (
    <NewInputContainer>
      <Cell>
        <NewInput
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              // 엔터를 눌렀으면
              // 심플하게 [내용 ,아이디]로 인자를 구성
              let temp = todo.slice() || [];
              temp.unshift([newDo, new Date().getTime()]);
              setTodo(temp);

              // stringify해서 localStorage에 다 저장
              let strfied = JSON.stringify(temp);
              localStorage.setItem("todo", strfied);
              setToggleNew(false);
            }
          }}
          onChange={(e) => {
            setNewDo(e.target.value); //타이핑 값을 그대로 새로운 인자값
          }}
        ></NewInput>
      </Cell>
      <Cell>
        {/* 문서 설정 */}
        신입사원 필독서<Check></Check>
      </Cell>
    </NewInputContainer>
  );
}
