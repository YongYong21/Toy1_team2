import React from 'react';
import pageNotFoundImg from '../../assets/images/pageNotFoundImg.svg';
import {
  FlexBox,
  ErrorText,
  FooterContainer,
} from '../../styles/NotFound/NotFound';
import { Footer } from '../../components/Footer/Footer';

export default function NotFound(): JSX.Element {
  return (
    <>
      <FlexBox>
        <img className="image" src={pageNotFoundImg} />
        <ErrorText>요청하신 페이지가 존재하지 않습니다</ErrorText>
      </FlexBox>
      <FooterContainer>
        <Footer />
      </FooterContainer>
    </>
  );
}
