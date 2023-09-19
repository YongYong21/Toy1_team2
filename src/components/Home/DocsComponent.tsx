import { MenuLiInTdl } from '../../styles/Home/TodoListSC';
import { DocsComponentUl } from '../../styles/Home/DailyBriefSC';

interface DocsProps {
  docs: string[];
  todo: Array<[string, number, string]>;
  setTodo: React.Dispatch<Array<[string, number, string]>>;
  done: Array<[string, number, string]>;
  setDone: React.Dispatch<Array<[string, number, string]>>;
}

export function DocsComponent({
  docs,
  todo,
  setTodo,
  done,
  setDone,
}: DocsProps): JSX.Element {
  const updSelectedDocs = (e: React.MouseEvent<HTMLElement>): void => {
    const tar = e.target as HTMLElement;
    const targetId = tar.closest('.target-id') as HTMLElement;
    const id = targetId.dataset.id;

    const todoIdx = todo.findIndex((v) => v[1] === Number(id));
    if (todoIdx !== -1) {
      const todoCopy = todo.slice();
      todoCopy[todoIdx][2] = tar.innerText;
      setTodo(todoCopy);

      const strfied = JSON.stringify(todoCopy);
      localStorage.setItem('todo', strfied);
      return undefined;
    }

    const doneIdx = done.findIndex((v) => v[1] === Number(id));
    if (doneIdx !== -1) {
      const doneCopy = done.slice();
      doneCopy[doneIdx][2] = tar.innerText;
      setDone(doneCopy);

      const strfied = JSON.stringify(doneCopy);
      localStorage.setItem('done', strfied);
      return undefined;
    }
  };

  return (
    <DocsComponentUl>
      {docs.map((doc, idx) => (
        <MenuLiInTdl //
          key={idx}
          onMouseDown={updSelectedDocs}
        >
          {doc}
        </MenuLiInTdl>
      ))}
    </DocsComponentUl>
  );
}
