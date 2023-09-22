import { useEffect, useState } from 'react';
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
  Col,
  NoContent,
} from '../../styles/Home/TodoListSC';
import { Height30 } from '../../styles/Home/ShortcutSC';
import { NewTodoContainer } from './NewTodoContainer';
import { ListComponent } from './ListComponent';

interface TaskProps {
  todo: Array<[string, number, string, string]>;
  setTodo: React.Dispatch<Array<[string, number, string, string]>>;
  done: Array<[string, number, string, string]>;
  setDone: React.Dispatch<Array<[string, number, string, string]>>;
  TabMenu: number[];
  setTabMenu: React.Dispatch<number[]>;
  tglEditTodo: boolean[];
  setTglEditTodo: React.Dispatch<boolean[]>;
}

export function TodoList({
  todo,
  setTodo,
  done,
  setDone,
  TabMenu,
  setTabMenu,
  tglEditTodo,
  setTglEditTodo,
}: TaskProps): JSX.Element {
  const [toggleNew, setToggleNew] = useState(false); //  새로운 toDo생성 UI 표출/닫힘
  const [newDo, setNewDo] = useState(''); //   새로운 할 일 인자

  const [deleteTodo, setDeleteTodo] = useState<boolean[]>([]); //  할일 삭제 툴팁 표출 or 숨기기
  const [deleteDone, setDeleteDone] = useState<boolean[]>([]); //  완료된 일 삭제 툴팁 표출 or 숨기기
  const [tglEditDone, setTglEditDone] = useState<boolean[]>([]); //  완료한 일 수정 상태 포츌 / 숨기기
  const [tglTodoDocs, setTglTodoDocs] = useState<boolean[]>([]); //  관련문서 선택창 표출 / 숨기기

  const [docs] = useState<string[]>([
    '없음',
    '회사 내규',
    '팀소개',
    '조직도',
    '진행중인 프로젝트',
    '예정된 프로젝트',
    '완료된 프로젝트',
    '신입사원 필독서',
    '온보딩 주제',
  ]);

  // 첫 페이지 로딩때만 실행할 로직
  useEffect(() => {
    // localStorage에서 할 일 목록 불러오기 & setTodo()로 설정
    const gotTodo = localStorage.getItem('todo');
    if (gotTodo !== null) {
      const parsedTodo = JSON.parse(gotTodo) as Array<
        [string, number, string, string]
      >;
      setTodo(parsedTodo);
    }

    // localStorage에서 완료된 일 목록 불러오기 & setTodo()로 설정
    const gotDone = localStorage.getItem('done');
    if (gotDone !== null) {
      const parsedDone = JSON.parse(gotDone);
      setDone(parsedDone);
    }
  }, []);

  const handleSwitchTab = (e: React.MouseEvent<HTMLDivElement>): void => {
    const tar = e.target as HTMLElement;
    if (tar.textContent === '진행할 작업') {
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
        {TabMenu[0] === 1 && (
          <BtnSmLi
            onClick={() => {
              setToggleNew(!toggleNew);
            }}
          >
            <Plus></Plus>새 추가
          </BtnSmLi>
        )}
        {
          TabMenu[1] === 1 && <Height30></Height30> // height설정만 있어서 비어있을 때 높이 유지해주는 요소.
        }
      </TitleLine>
      <TabList onClick={handleSwitchTab}>
        {TabMenu[0] === 1 ? (
          <TabBtnClk>진행할 작업</TabBtnClk>
        ) : (
          <TabBtn>진행할 작업</TabBtn>
        )}
        {TabMenu[1] === 1 ? (
          <TabBtnClk>완료된 작업</TabBtnClk>
        ) : (
          <TabBtn>완료된 작업</TabBtn>
        )}
      </TabList>
      <Th>
        <Col>할일</Col>
        <Col>관련문서</Col>
      </Th>
      {/* 새로운 리스트 추가하기 컴포넌트 */}
      {toggleNew && (
        <NewTodoContainer
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
          docs={docs}
        ></NewTodoContainer>
      )}
      <Tb>
        {/* 현재 탭의 listEl이 0개일 시 문구 표시 */}
        {TabMenu[0] === 1 && todo.length === 0 && (
          <NoContent>새로운 할 일을 생성해보세요!</NoContent>
        )}
        {TabMenu[1] === 1 && done.length === 0 && (
          <NoContent>완료한 할 일이 없습니다.</NoContent>
        )}
        {/* 탭활성화에 따라 리스트 추가되는 곳 */}
        {TabMenu[0] === 1 &&
          todo.map((todoEl, idx) => (
            <ListComponent
              key={idx}
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
              tglEditTodo={tglEditTodo}
              setTglEditTodo={setTglEditTodo}
              tglEditDone={tglEditDone}
              setTglEditDone={setTglEditDone}
              tglTodoDocs={tglTodoDocs}
              setTglTodoDocs={setTglTodoDocs}
              docs={docs}
            ></ListComponent>
          ))}
        {TabMenu[1] === 1 &&
          done.map((doneEl, idx) => (
            <ListComponent
              key={idx}
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
              tglEditTodo={tglEditTodo}
              setTglEditTodo={setTglEditTodo}
              tglEditDone={tglEditDone}
              setTglEditDone={setTglEditDone}
              tglTodoDocs={tglTodoDocs}
              setTglTodoDocs={setTglTodoDocs}
              docs={docs}
            ></ListComponent>
          ))}
      </Tb>
    </TodoListContainer>
  );
}
