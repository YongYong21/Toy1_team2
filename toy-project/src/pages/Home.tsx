import { useEffect, useState } from "react";
import { HomeContainer } from "./HomeSC";

import { Swiper, SwiperSlide, useSwiper, SwiperProps } from "swiper/react";
// import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css/bundle";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";

declare module "swiper/react" {
  interface SwiperProps {
    // 원하는 프로퍼티를 추가합니다.
    spaceBetween?: number;
    slidesPerView?: number;
    navigation?: boolean;
    loop?: boolean;
  }
}

function MySlider() {
  const slideStyles = {
    background: 'url("../assets/images/money.jpeg") center/contain no-repeat',
    width: "200px",
    height: "200px",
  };
}

export function Home() {
  return (
    <HomeContainer>
      <Carousel />
    </HomeContainer>
  );
}

function Carousel() {
  return (
    <Swiper
      spaceBetween={30} //
      slidesPerView={1}
      navigation={true}
      loop={true}
      onSlideChange={() => console.log("Slide change")}
      wrapperTag="div"
      className="swiper-container"
    >
      <SwiperSlide className="swiper-slide"></SwiperSlide>
      <SwiperSlide className="swiper-slide"></SwiperSlide>
      <SwiperSlide className="swiper-slide"></SwiperSlide>
    </Swiper>
  );
}
