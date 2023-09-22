import { styled } from 'styled-components';
import { theme } from '../Theme';
import { BiChevronRight } from 'react-icons/bi';

export const SectionContainer = styled.div`
  width: 100%;
  height: 296px;
  position: relative;
`;

export const ImgsContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;

  width: 100%;
  height: 104%;

  overflow-y: scroll;

  padding: 56px 24px 0 24px;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ImgItems = styled.div`
  position: relative;

  width: 170px;
  height: 170px;
  border-radius: 8px;

  background-size: cover;
  background-color: ${theme.gray200};

  box-shadow: 0 0px 16px 8px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;

  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const ImgTitle = styled.div`
  position: absolute;
  bottom: 0;

  display: flex;
  align-items: end;

  height: 56px;
  width: 100%;

  color: ${theme.white};

  border-radius: 0 0 8px 8px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 5%, black 95%);

  padding: 0 0 12px 16px;
`;

export const NoImg = styled.div`
  flex-direction: column;
  align-items: center;
  gap: 24px;
  justify-content: center;

  display: flex;
  width: 100%;
  height: 100%;

  font-size: ${theme.textStyles.subtitle5.fontSize};
  color: ${theme.gray600};
  padding-top: 40px;
`;

export const ImgHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  position: absolute;
  z-index: 5;

  width: 100%;
  height: 40px;
  background-color: ${theme.gray200};

  font-size: ${theme.textStyles.body2.fontSize};
  font-weight: 500;
  color: ${theme.gray700};

  padding: 0 24px;
`;

export const BtnSmLiShortcut = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;

  font-size: ${theme.textStyles.button.fontSize};
  color: ${theme.blue700};

  padding: 6px 8px;
  border-radius: 8px;

  &:hover {
    background-color: ${theme.blue100};
  }
`;

export const RightArrow = styled(BiChevronRight)`
  font-size: 20px;

  box-sizing: content-box;
  cursor: pointer;
  padding: 8px;

  &:hover {
    color: ${theme.blue700};
    backgrond-color: ${theme.blue200};
  }
`;
