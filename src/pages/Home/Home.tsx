import { useState } from 'react';
import { Carousel } from '../../components/Home/Carousel';
import { DailyBrief } from '../../components/Home/DailyBrief';
import { Shortcut } from '../../components/Home/Shortcut';
import { TodoList } from '../../components/Home/TodoList';
import { HomeContainer } from '../../styles/Home/HomeSC';
import { Footer } from '../../components/Footer/Footer';

export function Home(): JSX.Element {
  const [todo, setTodo] = useState<Array<[string, number, string]>>([]); //  할 일 목록
  const [done, setDone] = useState<Array<[string, number, string]>>([]); //  완료된 일 목록
  const [TabMenu, setTabMenu] = useState([1, 0]); //  탭 전환 상태값
  const [tglEditTodo, setTglEditTodo] = useState<boolean[]>([]); //  할일 수정 상태 표출 / 숨기기

  return (
    <HomeContainer>
      <Carousel />
      <DailyBrief todo={todo} done={done} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '24px',
          marginTop: '24px',
          height: '520px',
        }}
      >
        <Shortcut //
          todo={todo}
          setTodo={setTodo}
          setTabMenu={setTabMenu}
          setTglEditTodo={setTglEditTodo}
        ></Shortcut>
        <TodoList
          todo={todo}
          setTodo={setTodo}
          done={done}
          setDone={setDone}
          TabMenu={TabMenu}
          setTabMenu={setTabMenu}
          tglEditTodo={tglEditTodo}
          setTglEditTodo={setTglEditTodo}
        ></TodoList>
      </div>
      <Footer />
    </HomeContainer>
  );
}
