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
  padding: 56px 24px 0 24px;
  width: 100%;
  height: 104%;
  gap: 16px;
  flex-wrap: wrap;
  overflow-y: scroll;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ImgItems = styled.div`
  width: 170px;
  height: 170px;
  border-radius: 8px;
  background-size: cover;
  background-color: ${theme.gray200};
  position: relative;
  box-shadow: 0 0px 16px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    transform: translateY(-4px);
  }
`;

export const ImgTitle = styled.div`
  position: absolute;
  bottom: 0;
  height: 56px;
  width: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 5%, black 95%);
  color: ${theme.white};
  display: flex;
  align-items: end;
  padding: 0 0 12px 16px;
  border-radius: 0 0 8px 8px;
`;

export const NoImg = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  justify-content: center;
  font-size: ${theme.textStyles.subtitle5.fontSize};
  color: ${theme.gray600};
  padding-top: 40px;
`;

export const ImgHeader = styled.div`
  font-size: ${theme.textStyles.body2.fontSize};
  font-weight: 500;
  height: 40px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${theme.gray200};
  color: ${theme.gray700};
  position: absolute;
  z-index: 5;
  width: 100%;
`;

export const BtnSmLiShortcut = styled.button`
  font-size: ${theme.textStyles.button.fontSize};
  padding: 6px 16px;
  border-radius: 8px;
  color: ${theme.blue700};
  &:hover {
    background-color: ${theme.blue100};
  }
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 8px;
`;

export const RightArrow = styled(BiChevronRight)`
  font-size: 20px;
  padding: 8px;
  box-sizing: content-box;
  &:hover {
    color: ${theme.blue700};
    backgrond-color: ${theme.blue200};
  }
  cursor: pointer;
`;
