import {
  Cell,
  NewInput,
  NewInputContainer,
  ToggleDocsBtn,
} from '../../styles/Home/TodoListSC';

interface NewTodoProps {
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
}

export function NewTodoContainer({
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
}: NewTodoProps): //
JSX.Element {
  const handleEnterSubmit = //
    (e: React.KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === 'Enter') {
        //  엔터를 눌렀으면
        //  심플하게 [내용 ,아이디]로 인자를 구성
        const temp = todo.slice();
        temp.unshift([newDo, new Date().getTime(), docs[0]]);
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
      temp.unshift([newDo, new Date().getTime(), docs[0]]);
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
        <ToggleDocsBtn>없음</ToggleDocsBtn>
      </Cell>
    </NewInputContainer>
  );
}
