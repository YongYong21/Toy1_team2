import { useEffect, useState } from "react";
import { HomeContainer } from "./HomeSC";

import { Children, useCallback, useMemo } from "react";
import { Swiper } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from "swiper";

import "swiper/css/bundle";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";

SwiperCore.use([Pagination, Autoplay]);

interface CarouselProps {
  children: React.ReactNode;
  indicator: boolean;
}

const Carousel = ({ item, indicator }: CarouselProps) => {
  /** Swiper option 설정 */
  /** on 메소드를 사용하지 않으면 useMemo<SwiperOptions>로 대체 가능 */
  const settings = useMemo<Swiper>(
    () => ({
      spaceBetween: 10,
      autoplay: {
        delay: 4000,
      },
      pagination: indicator && {
        clickable: true,
      },
    }),
    [indicator]
  );

  return (
    /** Swiper에 option값을 받아와서 적용 */
    <Swiper {...settings}>{children}</Swiper>
  );
};

export function Home() {
  return (
    <HomeContainer>
      <Carousel />
    </HomeContainer>
  );
}
