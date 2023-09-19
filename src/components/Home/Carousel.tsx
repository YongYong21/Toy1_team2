import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
  Autoplay,
  Parallax,
} from 'swiper/modules';

import {
  ParaTitle,
  ParaSubtitle,
  ParaText,
  TransparentLeft,
  TransparentRight,
} from '../../styles/Home/HomeSC';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

declare module 'swiper/react' {
  interface SwiperProps {
    spaceBetween?: number;
    slidesPerView?: number;
    navigation?: boolean;
    loop?: boolean;
    autoplay?: object;
    pagination?: object;
    modules?: any[];
    effect?: string;
    parallax?: boolean;
  }
}

export function Carousel(): JSX.Element {
  const containerStyles = {
    backgroundColor: '#333333',
    height: '400px',
    width: '100%',
  };

  const [threads] = useState([
    {
      title: 'Wiki',
      subtitle: '한 번에 회사 문서 관리',
      phrase: '일잘러가 되려면 우리 회사 내부 문서부터 확인해봐요.',
      bgColor: '#EDB3A4',
      url: 'https://assets.fontsinuse.com/static/use-media-items/159/158488/upto-700xauto/64fb3b9c/@2x/colonne_origin_a3-arcueil-hd_a3a84_8566a.webp',
    }, //
    {
      title: 'Gallery',
      subtitle: '협력사 등 사진 관리',
      phrase: '협력사들을 한 눈에 관리해보세요.',
      bgColor: '#6333f6',
      url: 'https://images.velog.io/images/sohee-k/post/59bb6fa6-8059-42d3-9937-c6ebce3a6120/68747470733a2f2f7377697065726a732e636f6d2f696d616765732f73686172652d62616e6e65722e706e67.png',
    }, //
    {
      title: 'Commute',
      subtitle: '일한 만큼 제대로 기록',
      phrase: '제대로 일했다는 것을 인증해보세요.',
      bgColor: '#666',
      url: 'https://hips.hearstapps.com/hmg-prod/images/russian-blue-royalty-free-image-1658451809.jpg',
    },
    {
      title: 'Auth',
      subtitle: '최고의 인증 기능',
      phrase: 'Company Space 만의 철저한 보안 기능을 체험해보세요.',
      bgColor: '#666',
      url: 'https://i.pinimg.com/originals/dd/9a/41/dd9a4126d2a91aa0010abf9cacff7622.jpg',
    },
  ]);

  return (
    <div style={{ position: 'relative' }}>
      <Swiper
        modules={[
          Navigation,
          Pagination,
          Scrollbar,
          A11y,
          EffectFade,
          Autoplay,
          Parallax,
        ]}
        effect="fade"
        parallax={true}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        loop={true}
        wrapperTag="div"
        style={containerStyles}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {threads.map((thread, idx) => {
          return (
            <SwiperSlide
              key={idx}
              style={{
                backgroundImage: `url(${thread.url})`,
                backgroundColor: thread.bgColor,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            >
              <ParaTitle className="title" data-swiper-parallax="-100">
                {thread.title}
              </ParaTitle>
              <ParaSubtitle className="subtitle" data-swiper-parallax="-200">
                {thread.subtitle}
              </ParaSubtitle>
              <ParaText
                className="text"
                data-swiper-parallax="-200"
                data-swiper-parallax-duration="300"
              >
                <p>NEW</p>
              </ParaText>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <TransparentLeft></TransparentLeft>
      <TransparentRight></TransparentRight>
    </div>
  );
}
