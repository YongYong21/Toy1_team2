import {
  Tr,
  Cell,
  ChkIcon,
  CheckIcon,
  MoreIcon,
  DeleteToolTip,
  MoreButton,
  ChkedIcon,
  TitleEditInput,
  TodoTitle,
  ToggleDocsBtn,
} from '../../styles/Home/TodoListSC';

import { DocsComponent } from './DocsComponent';
import { useAuthState } from '../../shared/contexts/AuthContext';

interface ListComponentProps {
  listEl: [string, number, string, string];
  todo: Array<[string, number, string, string]>;
  setTodo: React.Dispatch<Array<[string, number, string, string]>>;
  done: Array<[string, number, string, string]>;
  setDone: React.Dispatch<Array<[string, number, string, string]>>;
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
  tglTodoDocs: boolean[];
  setTglTodoDocs: React.Dispatch<boolean[]>;
  docs: string[];
}

export function ListComponent({
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
  tglTodoDocs,
  setTglTodoDocs,
  docs,
}: ListComponentProps): //
JSX.Element {
  const authState = useAuthState(); // 인증 컨텍스트에서 인증 상태 가져오기

  // 체크버튼 눌렀을 때 todo에서 doned으로 스위치하는 함수
  const switchTodoToDone = (e: React.MouseEvent<HTMLElement>): void => {
    if (authState.state !== 'loaded' || !authState.isAuthentication) {
      return;
    }
    const tar = e.currentTarget as HTMLElement; // 현재 이벤트 타겟
    const dataset = tar.dataset.id; // HTML DataSet을 iD에 넣어 활용

    //  ID에 매칭되는 놈 찾아서 done으로 보내는 과정
    const matched = todo.find(
      (v: [string, number, string, string]) => v[1].toString() === dataset,
    ) as [string, number, string, string];
    const doneCopy: Array<[string, number, string, string]> = done.slice();
    doneCopy.unshift(matched);
    const strfiedDone = JSON.stringify(doneCopy);
    localStorage.setItem('done', strfiedDone);
    setDone(doneCopy);

    //  ID에 매칭되는 놈 찾아서 todo에서 제거시키는 과정
    const subtracted = todo.filter(
      (v: [string, number, string, string]) => v[1].toString() !== dataset,
    );
    const strfiedTodo = JSON.stringify(subtracted);
    localStorage.setItem('todo', strfiedTodo);
    setTodo(subtracted);
  };

  // 체크버튼 눌렀을 때 done에서 todo으로 스위치하는 함수
  const switchDoneToTodo = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (authState.state !== 'loaded' || !authState.isAuthentication) {
      return;
    }
    const tar = e.currentTarget as HTMLElement; // 현재 이벤트 타겟
    const dataset = tar.dataset.id; // HTML DataSet을 iD에 넣어 활용

    //  ID에 매칭되는 놈 찾아서 todo로 보내는 과정
    const matched = done.find(
      (v: [string, number, string, string]) => v[1].toString() === dataset,
    ) as [string, number, string, string];
    const todoCopy: Array<[string, number, string, string]> = todo.slice();
    todoCopy.unshift(matched);
    const strfiedTodo = JSON.stringify(todoCopy);
    localStorage.setItem('todo', strfiedTodo);
    setTodo(todoCopy);

    //  ID에 매칭되는 놈 찾아서 done에서 제거시키는 과정
    const subtracted = done.filter(
      (v: [string, number, string, string]) => v[1].toString() !== dataset,
    );
    const strfiedDone = JSON.stringify(subtracted);
    localStorage.setItem('done', strfiedDone);
    setDone(subtracted);
  };

  //  '삭제 툴팁' 키고 끄기 함수
  const ToggleDeleteBtn = //
    (e: React.FocusEvent<HTMLButtonElement>, eType: string): void => {
      if (authState.state !== 'loaded' || !authState.isAuthentication) {
        return;
      }
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
      } else if (TabMenu[1] === 1) {
        const filtered = done.slice().filter((v) => v[1] !== Number(tarId));
        setDone(filtered);
        const strfied = JSON.stringify(filtered);
        localStorage.setItem('done', strfied);
      }
    };

  // 수정 상태로 전환하기 함수
  const ToggleEditTitle = //
    (e: React.MouseEvent<HTMLElement>): void => {
      if (authState.state !== 'loaded' || !authState.isAuthentication) {
        return;
      }
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

    if (tar.value.length > 28) {
      tar.value = tar.value.slice(0, 28);
    }
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

  // 문서 열기 함수
  const toggleDocsList = (): void => {
    if (authState.state !== 'loaded' || !authState.isAuthentication) {
      return;
    }
    if (tglTodoDocs[idx]) {
      setTglTodoDocs([]);
    } else {
      const tglTodoDocsCopy = tglTodoDocs.slice();
      tglTodoDocsCopy[idx] = true;
      setTglTodoDocs(tglTodoDocsCopy);
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
        <Cell className="target-id" data-id={listEl[1].toString()}>
          {/* 관련 문서 선택 부분 */}
          <ToggleDocsBtn //
            onClick={toggleDocsList}
            onBlur={toggleDocsList}
          >
            {listEl[2]}
          </ToggleDocsBtn>
          {tglTodoDocs[idx] && (
            <DocsComponent //
              todo={todo}
              setTodo={setTodo}
              docs={docs}
              done={done}
              setDone={setDone}
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
              maxLength={30}
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
        <Cell className="target-id" data-id={listEl[1].toString()}>
          <ToggleDocsBtn //
            onClick={toggleDocsList}
            onBlur={toggleDocsList}
          >
            {listEl[2]}
          </ToggleDocsBtn>
          {tglTodoDocs[idx] && (
            <DocsComponent //
              todo={todo}
              setTodo={setTodo}
              docs={docs}
              done={done}
              setDone={setDone}
            ></DocsComponent>
          )}
        </Cell>
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
