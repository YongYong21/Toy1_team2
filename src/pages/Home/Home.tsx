import { Carousel } from '../../components/Home/Carousel';
import { DailyBrief } from '../../components/Home/DailyBrief';
import { Shortcut } from '../../components/Home/Shortcut';
import { TodoList } from '../../components/Home/TodoList';
import { HomeContainer } from '../../styles/Home/HomeSC';

export function Home(): JSX.Element {
  // set done, todo를 todo에서 가져오기
  return (
    <HomeContainer>
      <Carousel />
      <DailyBrief />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '24px',
          marginTop: '24px',
        }}
      >
        <Shortcut></Shortcut>
        <TodoList></TodoList>
      </div>
    </HomeContainer>
  );
}
