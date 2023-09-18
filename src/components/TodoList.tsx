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
  TodoTitle,
  ToggleDocsBtn,
  MenuLiInTdl,
} from '../styles/TodoListSC';
import { Height30 } from '../styles/ShortcutSC';
import { MenuUnli } from '../styles/DailyBriefSC';

export function TodoList(): JSX.Element {
  const [toggleNew, setToggleNew] = useState(false); //  새로운 toDo생성 UI 표출/닫힘
  const [newDo, setNewDo] = useState(''); //   새로운 할 일 인자
  const [TabMenu, setTabMenu] = useState([1, 0]); //  탭 전환 상태값

  const [todo, setTodo] = useState<Array<[string, number, string]>>([]); //  할 일 목록
  const [done, setDone] = useState<Array<[string, number, string]>>([]); //  완료된 일 목록
  const [deleteTodo, setDeleteTodo] = useState<boolean[]>([]); //  할일 삭제 툴팁 표출 or 숨기기
  const [deleteDone, setDeleteDone] = useState<boolean[]>([]); //  완료된 일 삭제 툴팁 표출 or 숨기기
  const [tglEditTodo, setTglEditTodo] = useState<boolean[]>([]); //  할일 수정 상태 표출 / 숨기기
  const [tglEditDone, setTglEditDone] = useState<boolean[]>([]); //  완료한 일 수정 상태 포츌 / 숨기기
  const [docsOpen, setDocsOpen] = useState<boolean[]>([]); //  관련문서 선택창 표출 / 숨기기
  const [newDocsOpen, setNewDocsOpen] = useState<boolean>(false);

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

  const [selectedDocs, setSelectedDocs] = useState<string>(docs[0]); //  여기가 문제였구먼ㅠㅠㅠ

  // 첫 페이지 로딩때만 실행할 로직
  useEffect(() => {
    // localStorage에서 할 일 목록 불러오기 & setTodo()로 설정
    const gotTodo = localStorage.getItem('todo');
    if (gotTodo !== null) {
      const parsedTodo = JSON.parse(gotTodo) as Array<[string, number, string]>;
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
          docs={docs}
          selectedDocs={selectedDocs}
          setSelectedDocs={setSelectedDocs}
          newDocsOpen={newDocsOpen}
          setNewDocsOpen={setNewDocsOpen}
        ></NewListInputContainer>
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
              docsOpen={docsOpen}
              setDocsOpen={setDocsOpen}
              docs={docs}
              selectedDocs={selectedDocs}
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
              docsOpen={docsOpen}
              setDocsOpen={setDocsOpen}
              docs={docs}
              selectedDocs={selectedDocs}
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
  docs,
  selectedDocs,
  setSelectedDocs,
  newDocsOpen,
  setNewDocsOpen,
}: {
  setToggleNew: React.Dispatch<boolean>;
  setNewDo: React.Dispatch<string>;
  newDo: string;
  todo: Array<[string, number, string]>;
  setTodo: React.Dispatch<Array<[string, number, string]>>;
  deleteTodo: boolean[];
  setDeleteTodo: React.Dispatch<boolean[]>;
  deleteDone: boolean[];
  setDeleteDone: React.Dispatch<boolean[]>;
  TabMenu: number[];
  docs: string[];
  selectedDocs: string;
  setSelectedDocs: React.Dispatch<string>;
  newDocsOpen: boolean;
  setNewDocsOpen: React.Dispatch<boolean>;
}): JSX.Element {
  //  const
  //  selectedDocs
  //  setSelectedDocs

  const handleEnterSubmit = //
    (e: React.KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === 'Enter') {
        //  엔터를 눌렀으면
        //  심플하게 [내용 ,아이디]로 인자를 구성
        const temp = todo.slice();
        temp.unshift([newDo, new Date().getTime(), selectedDocs]);
        setTodo(temp);

        //  stringify해서 localStorage에 다 저장
        const strfied = JSON.stringify(temp);
        localStorage.setItem('todo', strfied);

        //  삭제 툴팁 심기
        if (TabMenu[0] === 1) {
          const deleteTodoCopy = deleteTodo.slice();
          deleteTodoCopy.unshift(false);
          setDeleteTodo(deleteTodoCopy);
        } else if (TabMenu[1] === 1) {
          const deleteDoneCopy = deleteDone.slice();
          deleteDoneCopy.unshift(false);
          setDeleteDone(deleteDoneCopy);
        }

        setNewDo('');
        setToggleNew(false);
      }
    };

  const handleBlurSubmitNew = //
    (e: React.FocusEvent<HTMLInputElement>): void => {
      const temp = todo.slice();
      temp.unshift([newDo, new Date().getTime(), selectedDocs]);
      setTodo(temp);

      //  stringify해서 localStorage에 다 저장
      const strfied = JSON.stringify(temp);
      localStorage.setItem('todo', strfied);

      //  삭제 툴팁 심기
      if (TabMenu[0] === 1) {
        const deleteTodoCopy = deleteTodo.slice();
        deleteTodoCopy.unshift(false);
        setDeleteTodo(deleteTodoCopy);
      } else if (TabMenu[1] === 1) {
        const deleteDoneCopy = deleteDone.slice();
        deleteDoneCopy.unshift(false);
        setDeleteDone(deleteDoneCopy);
      }
      setToggleNew(false);
    };

  return (
    <NewInputContainer>
      <Cell>
        <NewInput
          autoFocus
          onKeyDown={handleEnterSubmit}
          onBlur={handleBlurSubmitNew}
          onChange={(e) => {
            setNewDo(e.target.value); // 이거 없으면 새로고침 해야지만 새로운 내용 이름이 제대로 보임. useState 비동기 처리가 끝나기 전에 작업이 끝나서 처리 되기 전의 값이 보이는 현상..
          }}
        ></NewInput>
      </Cell>
      <Cell>
        <ToggleDocsBtn //
          onClick={() => {
            setNewDocsOpen(!newDocsOpen);
          }}
          onBlur={() => {
            setNewDocsOpen(!newDocsOpen);
          }}
        >
          {selectedDocs}
        </ToggleDocsBtn>
        {newDocsOpen && (
          <MenuUnli>
            {docs.map((doc, idx) => (
              <MenuLiInTdl key={idx}>{doc}</MenuLiInTdl>
              // 왜냐하면 신규 컴포넌트이고 만들어지는 순간 일반 컴포넌트가 되어서??
            ))}
          </MenuUnli>
        )}
      </Cell>
    </NewInputContainer>
  );
}

//  function EditBtn() {
//    return <button onClick={(e) => {}}>수정</button>;
//  }

function ListComponent({
  todo, //  할일 목록 (배열)
  listEl, //  인자 하나하나(배열 아님)
  setTodo, //  할일 목록 setState
  done, // 완료된 목록 (배열)
  setDone, //  완료된 목록 setState
  TabMenu, //  탭 메뉴 (현재 뭐 선택되어 있는지)
  deleteTodo, // 삭제 팝업
  setDeleteTodo, // 삭제 팝업 보이기/숨기기
  deleteDone,
  setDeleteDone,
  idx, // 인덱스(순서)
  tglEditTodo,
  setTglEditTodo,
  tglEditDone,
  setTglEditDone,
  docsOpen,
  setDocsOpen,
  docs,
  selectedDocs,
}: {
  todo: Array<[string, number, string]>;
  listEl: [string, number, string];
  setTodo: React.Dispatch<Array<[string, number, string]>>;
  done: Array<[string, number, string]>;
  setDone: React.Dispatch<Array<[string, number, string]>>;
  TabMenu: number[];
  deleteTodo: boolean[];
  setDeleteTodo: React.Dispatch<boolean[]>;
  deleteDone: boolean[];
  setDeleteDone: React.Dispatch<boolean[]>;
  idx: number;
  tglEditTodo: boolean[];
  setTglEditTodo: React.Dispatch<boolean[]>;
  tglEditDone: boolean[];
  setTglEditDone: React.Dispatch<boolean[]>;
  docsOpen: boolean[];
  setDocsOpen: React.Dispatch<boolean[]>;
  docs: string[];
  selectedDocs: string;
}): JSX.Element {
  // 체크버튼 눌렀을 때 todo에서 doned으로 스위치하는 함수
  const switchTodoToDone = (e: React.MouseEvent<HTMLElement>): void => {
    const tar = e.currentTarget as HTMLElement; // 현재 이벤트 타겟
    const dataset = tar.dataset.id; // HTML DataSet을 iD에 넣어 활용

    //  ID에 매칭되는 놈 찾아서 done으로 보내는 과정
    const matched = todo.find(
      (v: [string, number, string]) => v[1].toString() === dataset,
    ) as [string, number, string];
    const doneCopy: Array<[string, number, string]> = done.slice();
    doneCopy.unshift(matched);
    const strfiedDone = JSON.stringify(doneCopy);
    localStorage.setItem('done', strfiedDone);
    setDone(doneCopy);

    //  ID에 매칭되는 놈 찾아서 todo에서 제거시키는 과정
    const subtracted = todo.filter(
      (v: [string, number, string]) => v[1].toString() !== dataset,
    );
    const strfiedTodo = JSON.stringify(subtracted);
    localStorage.setItem('todo', strfiedTodo);
    setTodo(subtracted);
  };

  // 체크버튼 눌렀을 때 done에서 todo으로 스위치하는 함수
  const switchDoneToTodo = (e: React.MouseEvent<HTMLDivElement>): void => {
    const tar = e.currentTarget as HTMLElement; // 현재 이벤트 타겟
    const dataset = tar.dataset.id; // HTML DataSet을 iD에 넣어 활용

    //  ID에 매칭되는 놈 찾아서 todo로 보내는 과정
    const matched = done.find(
      (v: [string, number, string]) => v[1].toString() === dataset,
    ) as [string, number, string];
    const todoCopy: Array<[string, number, string]> = todo.slice();
    todoCopy.unshift(matched);
    const strfiedTodo = JSON.stringify(todoCopy);
    localStorage.setItem('todo', strfiedTodo);
    setTodo(todoCopy);

    //  ID에 매칭되는 놈 찾아서 done에서 제거시키는 과정
    const subtracted = done.filter(
      (v: [string, number, string]) => v[1].toString() !== dataset,
    );
    const strfiedDone = JSON.stringify(subtracted);
    localStorage.setItem('done', strfiedDone);
    setDone(subtracted);
  };

  //  '삭제 툴팁' 키고 끄기 함수
  const ToggleDeleteBtn = //
    (e: React.FocusEvent<HTMLButtonElement>, eType: string): void => {
      const tar = e.target;
      const tarId = tar.dataset.id;

      //  삭제 툴팁 표출 로직
      if (eType === 'focus') {
        if (TabMenu[0] === 1) {
          const findIdx = todo.findIndex((v) => v[1] === Number(tarId));
          const deleteTodoCopy = deleteTodo.slice();
          deleteTodoCopy[findIdx] = true;
          setDeleteTodo(deleteTodoCopy);
        } else if (TabMenu[1] === 1) {
          const findIdx = done.findIndex((v) => v[1] === Number(tarId));
          const deleteDoneCopy = deleteDone.slice();
          deleteDoneCopy[findIdx] = true;
          setDeleteDone(deleteDoneCopy);
        }
        //  삭제 툴팁 숨기기 로직
      } else {
        if (TabMenu[0] === 1) {
          const deleteTodoCopy = deleteTodo.slice().map((v) => false);
          setTimeout(() => {
            setDeleteTodo(deleteTodoCopy);
          }, 200);
        } else if (TabMenu[1] === 1) {
          const deleteDoneCopy = deleteDone.slice().map((v) => false);
          setTimeout(() => {
            setDeleteDone(deleteDoneCopy);
          }, 200);
        }
      }
    };

  //  삭제하기 함수
  const handleDeleteList = //
    (e: React.MouseEvent<HTMLElement>): void => {
      e.stopPropagation();
      const tar = e.target as HTMLElement;
      const tarId = tar.dataset.id;

      if (TabMenu[0] === 1) {
        const filtered = todo.slice().filter((v) => v[1] !== Number(tarId));
        setTodo(filtered);
        const strfied = JSON.stringify(filtered);
        localStorage.setItem('todo', strfied);
        console.log('tab0 deleting~!');
      } else if (TabMenu[1] === 1) {
        console.log('tab1 deleting~!');
        const filtered = done.slice().filter((v) => v[1] !== Number(tarId));
        setDone(filtered);
        const strfied = JSON.stringify(filtered);
        localStorage.setItem('done', strfied);
      }
    };

  // 수정 상태로 전환하기 함수
  const ToggleEditTitle = //
    (e: React.MouseEvent<HTMLElement>): void => {
      const tar = e.target as HTMLInputElement;
      const tarId = tar.dataset.id;

      if (TabMenu[0] === 1) {
        const findIdx = todo.findIndex((v) => v[1] === Number(tarId));
        const tglEditTodoCopy = tglEditTodo.slice();
        tglEditTodoCopy[findIdx] = true;
        setTglEditTodo(tglEditTodoCopy);
      } else if (TabMenu[1] === 1) {
        const findIdx = done.findIndex((v) => v[1] === Number(tarId));
        const tglEditDoneCopy = tglEditDone.slice();
        tglEditDoneCopy[findIdx] = true;
        setTglEditDone(tglEditDoneCopy);
      }
    };

  //  블러로 수정하기 함수
  const handleUpdateEdit = //
    (e: React.FocusEvent<HTMLInputElement>): void => {
      const tar = e.currentTarget as HTMLInputElement;
      const tarId = tar.dataset.id;

      if (TabMenu[0] === 1) {
        const findIdx = todo.findIndex((v) => v[1] === Number(tarId));
        const tglEditTodoCopy = new Array(tglEditTodo.length)
          .fill(0)
          .map((v) => false);

        if (tar.value !== '') {
          const todoCopy = todo.slice();
          todoCopy[findIdx][0] = tar.value;
          setTodo(todoCopy);

          const strfied = JSON.stringify(todoCopy);
          localStorage.setItem('todo', strfied);
        }

        setTglEditTodo(tglEditTodoCopy);
      } else if (TabMenu[1] === 1) {
        const findIdx = done.findIndex((v) => v[1] === Number(tarId));
        const tglEditDoneCopy = new Array(tglEditDone.length)
          .fill(0)
          .map((v) => false);

        if (tar.value !== '') {
          const doneCopy = done.slice();
          doneCopy[findIdx][0] = tar.value;
          setDone(doneCopy);

          const strfied = JSON.stringify(doneCopy);
          localStorage.setItem('done', strfied);
        }
        setTglEditDone(tglEditDoneCopy);
      }
    };

  // 키보드 엔터로 수정하기 함수
  const handleUpdateWithEnter = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    const tar = e.currentTarget as HTMLInputElement;
    const tarId = tar.dataset.id;

    if (e.key !== 'Enter') return;

    if (TabMenu[0] === 1) {
      const findIdx = todo.findIndex((v) => v[1] === Number(tarId));
      const tglEditTodoCopy = new Array(tglEditTodo.length)
        .fill(0)
        .map((v) => false);

      if (tar.value !== '') {
        const todoCopy = todo.slice();
        todoCopy[findIdx][0] = tar.value;
        setTodo(todoCopy);

        const strfied = JSON.stringify(todoCopy);
        localStorage.setItem('todo', strfied);
      }

      setTglEditTodo(tglEditTodoCopy);
    } else if (TabMenu[1] === 1) {
      const findIdx = done.findIndex((v) => v[1] === Number(tarId));
      const tglEditDoneCopy = new Array(tglEditDone.length)
        .fill(0)
        .map((v) => false);

      if (tar.value !== '') {
        const doneCopy = done.slice();
        doneCopy[findIdx][0] = tar.value;
        setDone(doneCopy);

        const strfied = JSON.stringify(doneCopy);
        localStorage.setItem('done', strfied);
      }
      setTglEditDone(tglEditDoneCopy);
    }
  };

  const toggleDocsList = (): void => {
    if (docsOpen[idx]) {
      const tar = new Array(docsOpen.length).fill(0).map((v) => false);
      setDocsOpen(tar);
    } else {
      const docOpenCopy = docsOpen.slice();
      docOpenCopy[idx] = true;
      setDocsOpen(docOpenCopy);
    }
  };

  //  JSX 리턴하는 부분
  if (TabMenu[0] === 1) {
    return (
      <Tr>
        <Cell>
          {tglEditTodo[idx] ? (
            <TitleEditInput //
              onBlur={handleUpdateEdit}
              onKeyDown={handleUpdateWithEnter}
              defaultValue={listEl[0]}
              data-id={listEl[1].toString()}
              autoFocus
            />
          ) : (
            <>
              <CheckIcon //
                data-id={listEl[1].toString()}
                onClick={switchTodoToDone}
              >
                <ChkIcon />
              </CheckIcon>
              <TodoTitle //
                data-id={listEl[1].toString()}
                onClick={ToggleEditTitle}
              >
                {listEl[0]}
              </TodoTitle>
            </>
          )}
        </Cell>
        <Cell>
          {' '}
          {/* 관련 문서 선택 부분 */}
          <ToggleDocsBtn //
            onClick={toggleDocsList}
            onBlur={toggleDocsList}
          >
            {selectedDocs}
          </ToggleDocsBtn>
          {docsOpen[idx] && (
            <DocsComponent //
              docsOpen={docsOpen}
              setDocsOpen={setDocsOpen}
              docs={docs}
              idx={idx}
            ></DocsComponent>
          )}
          <MoreButton //
            data-id={listEl[1].toString()}
            onFocus={(e) => {
              ToggleDeleteBtn(e, 'focus');
            }}
            onBlur={(e) => {
              ToggleDeleteBtn(e, 'blur');
            }}
          >
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
      <Tr>
        <Cell style={{ opacity: 0.5 }}>
          {tglEditDone[idx] ? (
            <TitleEditInput //
              onBlur={handleUpdateEdit}
              onKeyDown={handleUpdateWithEnter}
              defaultValue={listEl[0]}
              data-id={listEl[1].toString()}
              autoFocus
            />
          ) : (
            <>
              <CheckIcon //
                data-id={listEl[1].toString()}
                onClick={switchDoneToTodo}
              >
                <ChkedIcon />
              </CheckIcon>
              <TodoTitle //
                data-id={listEl[1].toString()}
                onClick={ToggleEditTitle}
              >
                {listEl[0]}
              </TodoTitle>
            </>
          )}
        </Cell>
        <Cell style={{ opacity: 0.5 }}>관련 문서 선택</Cell>
        <MoreButton //
          data-id={listEl[1].toString()}
          onFocus={(e) => {
            ToggleDeleteBtn(e, 'focus');
          }}
          onBlur={(e) => {
            ToggleDeleteBtn(e, 'blur');
          }}
        >
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

function DocsComponent({
  idx,
  docsOpen, //
  setDocsOpen,
  docs,
}: {
  idx: number | undefined;
  docsOpen: boolean[];
  setDocsOpen: React.Dispatch<boolean[]>;
  docs: string[];
}): JSX.Element {
  const updSelectedDocs = (e: React.MouseEvent<HTMLLIElement>): void => {
    console.log('!!!!!!!!!!');
  };

  return (
    <MenuUnli>
      {docs.map((doc, idx) => (
        <MenuLiInTdl //
          key={idx}
          onClick={updSelectedDocs}
          onMouseEnter={() => {
            console.log('!!!!');
          }}
        >
          {doc}
        </MenuLiInTdl>
      ))}
    </MenuUnli>
  );
}
