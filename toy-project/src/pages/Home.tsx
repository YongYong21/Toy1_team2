import { Carousel } from "../components/Carousel";
import { DailyBrief } from "../components/DailyBrief";
import { HomeContainer } from "../styles/HomeSC";
export function Home() {
  return (
    <HomeContainer>
      <Carousel />
      <DailyBrief />
    </HomeContainer>
  );
}
