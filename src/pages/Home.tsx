import { Carousel } from '../components/Carousel';
import { DailyBrief } from '../components/DailyBrief';
import { Shortcut } from '../components/Shortcut';
import { TodoList } from '../components/TodoList';
import { HomeContainer } from '../styles/HomeSC';
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
