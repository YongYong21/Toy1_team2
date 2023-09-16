import { useEffect, useState } from "react";
import {
  BtnSmLi,
  Plus,
  TabBtn,
  TabList,
  Title,
  TitleLine,
  TodoListContainer,
  TabBtnClk,
  Th,
  Tb,
  Tr,
  Cell,
  ChkIcon,
  NewInput,
  Col,
  NewInputContainer,
  CheckIcon,
  NoContent,
  MoreIcon,
  DeleteToolTip,
  MoreButton,
  ChkedIcon,
  TitleEditInput,
} from "../styles/TodoListSC";
import { Height30 } from "../styles/ShortcutSC";
import { Check } from "../styles/DailyBriefSC";

export function TodoList() {
  const [toggleNew, setToggleNew] = useState(false); //새로운 toDo생성 UI 표출/닫힘
  const [newDo, setNewDo] = useState(""); //새로운 할 일 인자
  const [TabMenu, setTabMenu] = useState([1, 0]); // 탭 전환 상태값

  const [todo, setTodo] = useState<[string, number][]>([]); // 할 일 목록
  const [done, setDone] = useState<[string, number][]>([]); // 완료된 일 목록
  const [deleteTodo, setDeleteTodo] = useState<boolean[]>([]); // 할일 삭제 툴팁 표출 or 숨기기
  const [deleteDone, setDeleteDone] = useState<boolean[]>([]); // 완료된 일 삭제 툴팁 표출 or 숨기기
  const [tglUdtTodo, setTglUdtTodo] = useState<boolean[]>([]);
  const [tglUdtDone, setTglUdtDone] = useState<boolean[]>([]);

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
          deleteTodo={deleteTodo}
          setDeleteTodo={setDeleteTodo}
          deleteDone={deleteDone}
          setDeleteDone={setDeleteDone}
          TabMenu={TabMenu}
        ></NewListInputContainer>
      )}
      <Tb>
        {/* 현재 탭의 listEl이 0개일 시 문구 표시 */}
        {!!TabMenu[0] && !todo.length && <NoContent>새로운 할 일을 생성해보세요!</NoContent>}
        {!!TabMenu[1] && !done.length && <NoContent>완료한 할 일이 없습니다.</NoContent>}
        {/* 탭활성화에 따라 리스트 추가되는 곳 */}
        {!!TabMenu[0] &&
          todo.map((todoEl, idx) => (
            <ListComponent
              todo={todo} //
              listEl={todoEl}
              setTodo={setTodo}
              setDone={setDone}
              done={done}
              TabMenu={TabMenu}
              deleteTodo={deleteTodo}
              setDeleteTodo={setDeleteTodo}
              deleteDone={deleteDone}
              setDeleteDone={setDeleteDone}
              idx={idx}
              tglUdtTodo={tglUdtTodo}
              setTglUdtTodo={setTglUdtTodo}
            ></ListComponent>
          ))}
        {!!TabMenu[1] &&
          done.map((doneEl, idx) => (
            <ListComponent
              todo={todo} //
              setTodo={setTodo}
              done={done}
              listEl={doneEl}
              setDone={setDone}
              TabMenu={TabMenu}
              deleteDone={deleteDone}
              setDeleteDone={setDeleteDone}
              deleteTodo={deleteTodo}
              setDeleteTodo={setDeleteTodo}
              idx={idx}
              tglUdtTodo={tglUdtTodo}
              setTglUdtTodo={setTglUdtTodo}
            ></ListComponent>
          ))}
      </Tb>
    </TodoListContainer>
  );
}

function NewListInputContainer({
  setToggleNew, //
  setNewDo,
  newDo,
  todo,
  setTodo,
  deleteTodo,
  setDeleteTodo,
  setDeleteDone,
  deleteDone,
  TabMenu,
}: {
  setToggleNew: React.Dispatch<boolean>;
  setNewDo: React.Dispatch<string>;
  newDo: string;
  todo: [string, number][];
  setTodo: React.Dispatch<[string, number][]>;
  deleteTodo: boolean[];
  setDeleteTodo: React.Dispatch<boolean[]>;
  deleteDone: boolean[];
  setDeleteDone: React.Dispatch<boolean[]>;
  TabMenu: number[];
}) {
  // React.KeyboardEvent<HTMLInputElement>
  const handleEnterSubmit = //
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        // 엔터를 눌렀으면
        // 심플하게 [내용 ,아이디]로 인자를 구성
        let temp = todo.slice() || [];
        temp.unshift([newDo, new Date().getTime()]);
        setTodo(temp);

        // stringify해서 localStorage에 다 저장
        let strfied = JSON.stringify(temp);
        localStorage.setItem("todo", strfied);

        // 삭제 툴팁 심기
        if (TabMenu[0] === 1) {
          let deleteTodoCopy = deleteTodo.slice();
          deleteTodoCopy.unshift(false);
          setDeleteTodo(deleteTodoCopy);
        } else if (TabMenu[1] === 1) {
          let deleteDoneCopy = deleteDone.slice();
          deleteDoneCopy.unshift(false);
          setDeleteDone(deleteDoneCopy);
        }

        setToggleNew(false);
      }
    };

  return (
    <NewInputContainer>
      <Cell>
        <NewInput
          onKeyDown={handleEnterSubmit}
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

// function EditBtn() {
//   return <button onClick={(e) => {}}>수정</button>;
// }

function ListComponent({
  todo, // 할일 목록 (배열)
  listEl, // 인자 하나하나(배열 아님)
  setTodo, // 할일 목록 setState
  done, //완료된 목록 (배열)
  setDone, // 완료된 목록 setState
  TabMenu, // 탭 메뉴 (현재 뭐 선택되어 있는지)
  deleteTodo, //삭제 팝업
  setDeleteTodo, //삭제 팝업 보이기/숨기기
  deleteDone,
  setDeleteDone,
  idx, //인덱스(순서)
  tglUdtTodo,
  setTglUdtTodo,
}: {
  todo: [string, number][];
  listEl: [string, number];
  setTodo: React.Dispatch<[string, number][]>;
  done: [string, number][];
  setDone: React.Dispatch<[string, number][]>;
  TabMenu: number[];
  deleteTodo: boolean[];
  setDeleteTodo: React.Dispatch<boolean[]>;
  deleteDone: boolean[];
  setDeleteDone: React.Dispatch<boolean[]>;
  idx: number;
  tglUdtTodo: boolean[];
  setTglUdtTodo: React.Dispatch<boolean[]>;
}) {
  //체크버튼 눌렀을 때 todo에서 doned으로 스위치하는 함수
  const switchTodoToDone = (e: React.MouseEvent<HTMLElement>) => {
    const tar = e.currentTarget as HTMLElement; //현재 이벤트 타겟
    const dataset = tar.dataset.id; //HTML DataSet을 iD에 넣어 활용

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

  //체크버튼 눌렀을 때 done에서 todo으로 스위치하는 함수
  const switchDoneToTodo = (e: React.MouseEvent<HTMLDivElement>) => {
    const tar = e.currentTarget as HTMLElement; //현재 이벤트 타겟
    const dataset = tar.dataset.id; //HTML DataSet을 iD에 넣어 활용

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

  // 삭제툴팁 키고 끄기 함수
  const ToggleDeleteBtn = //
    (e: React.FocusEvent<HTMLButtonElement>, eType: string) => {
      const tar = e.target;
      const tarId = tar.dataset.id;
      console.log(eType);
      // 삭제 툴팁 표출 로직
      if (eType === "focus") {
        if (TabMenu[0] === 1) {
          const findIdx = todo.findIndex((v) => v[1] === Number(tarId));
          let deleteTodoCopy = deleteTodo.slice();
          deleteTodoCopy[findIdx] = true;
          setDeleteTodo(deleteTodoCopy);
        } else if (TabMenu[1] === 1) {
          const findIdx = done.findIndex((v) => v[1] === Number(tarId));
          let deleteDoneCopy = deleteDone.slice();
          deleteDoneCopy[findIdx] = true;
          setDeleteDone(deleteDoneCopy);
        }
        // 삭제 툴팁 숨기기 로직
      } else {
        if (TabMenu[0] === 1) {
          let deleteTodoCopy = deleteTodo.slice().map((v) => false);
          setTimeout(() => setDeleteTodo(deleteTodoCopy), 200);
        } else if (TabMenu[1] === 1) {
          let deleteDoneCopy = deleteDone.slice().map((v) => false);
          setTimeout(() => setDeleteDone(deleteDoneCopy), 200);
        }
      }
    };

  // 삭제하기 함수
  const handleDeleteList = //
    (e: React.MouseEvent<HTMLElement>) => {
      let tar = e.target as HTMLElement;
      let tarId = tar.dataset.id;

      if (TabMenu[0] === 1) {
        const filtered = todo.slice().filter((v) => v[1] !== Number(tarId));
        setTodo(filtered);
        const strfied = JSON.stringify(filtered);
        localStorage.setItem("todo", strfied);
      } else if (TabMenu[1] === 1) {
        const filtered = done.slice().filter((v) => v[1] !== Number(tarId));
        setDone(filtered);
        const strfied = JSON.stringify(filtered);
        localStorage.setItem("done", strfied);
      }
    };

  // JSX 리턴하는 부분
  if (TabMenu[0] === 1) {
    return (
      <Tr>
        <Cell onClick={() => {}}>
          <CheckIcon //
            data-id={listEl[1].toString()}
            onClick={switchTodoToDone}
          >
            <ChkIcon />
          </CheckIcon>
          {tglUdtTodo[idx] ? <TitleEditInput /> : listEl[0]}
        </Cell>
        <Cell>
          관련 문서 선택
          <MoreButton data-id={listEl[1].toString()} onFocus={(e) => ToggleDeleteBtn(e, "focus")} onBlur={(e) => ToggleDeleteBtn(e, "blur")}>
            <MoreIcon></MoreIcon>
          </MoreButton>
          {deleteTodo[idx] && ( //
            <DeleteToolTip //
              data-id={listEl[1].toString()}
              onClick={handleDeleteList}
            >
              삭제
            </DeleteToolTip>
          )}
        </Cell>
      </Tr>
    );
  } else {
    return (
      <Tr style={{ opacity: 0.5 }}>
        <Cell>
          <CheckIcon //
            data-id={listEl[1].toString()}
            onClick={switchDoneToTodo}
          >
            <ChkedIcon />
          </CheckIcon>
          {listEl[0]}
        </Cell>
        <Cell>관련 문서 선택 </Cell>
        <MoreButton data-id={listEl[1].toString()} onFocus={(e) => ToggleDeleteBtn(e, "focus")} onBlur={(e) => ToggleDeleteBtn(e, "blur")}>
          <MoreIcon></MoreIcon>
        </MoreButton>
        {deleteDone[idx] && ( //
          <DeleteToolTip //
            data-id={listEl[1].toString()}
            onClick={handleDeleteList}
          >
            삭제
          </DeleteToolTip>
        )}
      </Tr>
    );
  }
}
