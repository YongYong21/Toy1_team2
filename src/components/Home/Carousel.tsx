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
import { Link } from 'react-router-dom';

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
      bgColor: '#5B58F5',
      link: '/wiki/rules',
      imgurl:
        'https://firebasestorage.googleapis.com/v0/b/wiki-app-46908.appspot.com/o/carousel_wiki.png?alt=media&token=e5407165-ecfc-439c-96c6-d0c6299bf58e',
    }, //
    {
      title: 'Gallery',
      subtitle: '협력사 등 사진 관리',
      phrase: '협력사들을 한 눈에 관리해보세요.',
      bgColor: '#E5E940',
      link: '/gallery/facility',
      imgurl:
        'https://firebasestorage.googleapis.com/v0/b/wiki-app-46908.appspot.com/o/carousel_gallery.png?alt=media&token=0809dbd1-5dcd-456a-b7c0-721a42bffe1d',
    }, //
    {
      title: 'Commute',
      subtitle: '일한 만큼 제대로 기록',
      phrase: '제대로 일했다는 것을 인증해보세요.',
      bgColor: '#FDA14D',
      link: '',
      imgurl:
        'https://firebasestorage.googleapis.com/v0/b/wiki-app-46908.appspot.com/o/carousel_commute.png?alt=media&token=289cea2d-6cef-4ec5-9d2d-d473ab6e8a6b',
    },
    {
      title: 'Auth',
      subtitle: '최고의 인증 기능',
      phrase: 'Company Space 만의 철저한 보안 기능을 체험해보세요.',
      bgColor: '#1BC17B',
      link: '',
      imgurl:
        'https://firebasestorage.googleapis.com/v0/b/wiki-app-46908.appspot.com/o/carousel_auth.png?alt=media&token=2e07a388-3d89-47fa-903e-809ea9a1a8c2',
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
            <Link to={`${thread.link}`} key={idx}>
              <SwiperSlide
                key={idx}
                style={{
                  backgroundImage: `url(${thread.imgurl})`,
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
            </Link>
          );
        })}
      </Swiper>
      <TransparentLeft></TransparentLeft>
      <TransparentRight></TransparentRight>
    </div>
  );
}
