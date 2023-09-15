import { useEffect, useState } from "react";
import { BtnSmLi, Plus, TabBtn, TabList, Title, TitleLine, TodoListContainer, TabBtnClk, Th, Col, Tb, Tr, Cell, Chk, TooltipDenied, Info, NewInput, ColTodo, CellTodo, TrNew } from "../styles/TodoListSC";
import { Height30 } from "../styles/ShortcutSC";
import { Check } from "../styles/DailyBriefSC";
import { stringify } from "querystring";

export function TodoList() {
  let [toggleNew, setToggleNew] = useState(false);
  let [newDo, setNewDo] = useState("");
  let [clkTab, setClkTab] = useState([1, 0]);

  let [todo, setTodo] = useState<[any, number][]>([]);
  let [done, setDone] = useState<[any, number][]>([]);

  useEffect(() => {
    // 페이지 로딩이 되면 localStorage로 setTodo를 가져옴.
    let parsedTodo = JSON.parse(localStorage.getItem("todo") as string);
    console.log(parsedTodo, "!");
    setTodo(parsedTodo);

    let parsedDone = JSON.parse(localStorage.getItem("done") as string);
    setDone(parsedDone);
  }, []);

  return (
    <TodoListContainer>
      <TitleLine>
        <Title>할 일</Title>
        {clkTab[0] ? (
          <BtnSmLi
            onClick={() => {
              setToggleNew(!toggleNew);
            }}
          >
            <Plus></Plus>새 추가
          </BtnSmLi>
        ) : (
          <Height30></Height30>
        )}
      </TitleLine>
      <TabList
        onClick={(e) => {
          let tar = e.target as HTMLElement;
          if (tar.textContent === "진행할 작업") {
            setClkTab([1, 0]);
          } else {
            setClkTab([0, 1]);
            setToggleNew(false);
          }
        }}
      >
        {clkTab.map((v, i) => {
          return v ? ( //
            <TabBtnClk>{["진행할 작업", "완료된 작업"][i]}</TabBtnClk> //
          ) : (
            <TabBtn>{["진행할 작업", "완료된 작업"][i]}</TabBtn>
          );
        })}
      </TabList>
      <Th>
        <ColTodo>할일</ColTodo>
        <ColTodo>관련문서</ColTodo>
      </Th>
      {toggleNew && (
        <AddNewContainer
          setToggleNew={setToggleNew} //
          newDo={newDo}
          setNewDo={setNewDo}
          todo={todo}
          setTodo={setTodo}
        ></AddNewContainer>
      )}
      <Tb>
        {/* 리스트 추가되는 곳 */}
        {!!clkTab[0] &&
          todo?.map((todoEl) => (
            <PostComponent
              todo={todo} //
              todoEl={todoEl}
              setTodo={setTodo}
              setDone={setDone}
              done={done}
            ></PostComponent>
          ))}
        {false &&
          !!clkTab[0] &&
          done.map((todoEl) => (
            <PostComponent
              todo={todo} //
              todoEl={todoEl}
              setTodo={setTodo}
              setDone={setDone}
              done={done}
            ></PostComponent>
          ))}
      </Tb>
    </TodoListContainer>
  );
}

function PostComponent({ todoEl, setTodo, todo, setDone, done }: { todoEl: [any, number]; setTodo: any; todo: any; setDone: any; done: [any, number][] }) {
  if (true) {
    return (
      <Tr>
        <CellTodo>
          <div
            data-id={todoEl[1].toString()}
            onClick={(e) => {
              let tar = e.currentTarget as HTMLElement;
              let dataset = tar.dataset.id;
              console.log(dataset, "to Done");

              let matched = todo.find((v: [any, number]) => v[1].toString() === dataset);
              setDone(matched);
              let subbed = todo.filter((v: [any, number]) => v[1].toString() !== dataset);
              let strfied = JSON.stringify(subbed);
              localStorage.setItem("todo", strfied);
              setTodo(subbed);
            }}
          >
            <Chk />
          </div>
          {todoEl[0]}
          {/* <EditBtn></EditBtn> */}
        </CellTodo>
        <CellTodo>신입사원 필독서</CellTodo>
      </Tr>
    );
  } else {
    return (
      <Tr>
        <Cell>
          <Chk />
          isEdit: True
        </Cell>
        <Cell>신입사원 필독서</Cell>
        <Cell>정범환</Cell>
      </Tr>
    );
  }
}

function EditBtn() {
  return <button onClick={(e) => {}}>수정</button>;
}

function AddNewContainer({ setToggleNew, setNewDo, newDo, todo, setTodo }: { setToggleNew: any; setNewDo: any; newDo: any; todo: [any, number][]; setTodo: any }) {
  return (
    <TrNew>
      <CellTodo>
        <NewInput
          onKeyDown={(e) => {
            console.log(e.key);
            if (e.key === "Enter") {
              let temp = todo?.slice() || [];
              temp.unshift([newDo, new Date().getTime()]);
              setTodo(temp);
              let strfied = JSON.stringify(temp);
              localStorage.setItem("todo", strfied);
              setToggleNew(false);
            }
          }}
          onChange={(e) => {
            setNewDo(e.target.value);
          }}
        ></NewInput>
      </CellTodo>
      <CellTodo>
        신입사원 필독서<Check></Check>
      </CellTodo>
    </TrNew>
  );
}
