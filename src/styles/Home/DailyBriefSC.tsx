import { styled } from 'styled-components';
import { theme } from '../Theme';
import { MdCheck, MdEditNote } from 'react-icons/md';

export const BriefContainer = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  height: 376px;
`;

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  text-align: center;
  width: 1256px;
`;

export const GreetingArea = styled.div``;

export const CurrentDate = styled.h3`
  font-size: ${theme.textStyles.subtitle4.fontSize};
  font-weight: 300;
  color: ${theme.gray700};
  line-height: 1.5;

  margin-top: 80px;
`;

export const CurrentUser = styled.h1`
  font-size: ${theme.textStyles.subtitle1.fontSize};
  font-weight: 600;
  line-height: 1.5;

  margin-top: 8px;
`;

export const UN = styled.span`
  font-size: ${theme.textStyles.subtitle1.fontSize};
  font-weight: 700;
  margin-top: 8px;
  line-height: 1.5;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    color: ${theme.blue600};
  }
`;

export const BriefArea = styled.article`
  display: flex;
  position: relative;

  width: 610px;
  height: 72px;
  border-radius: 36px;

  background-color: ${theme.gray200};

  margin-right: 0;
  margin-top: 40px;
`;

export const SelectPeriod = styled.button`
  display: flex;
  align-items: center;

  border-radius: 36px 0 0 36px;

  transition: background-color 0.2s;

  padding: 0;

  &:hover {
    background-color: ${theme.gray300};
  }

  &::after {
    content: '';
    width: 1px;
    height: 40px;
    background-color: ${theme.gray400};
    margin-left: 8px;
  }
`;

export const PeriodBtn = styled.div`
  width: 86px;

  font-size: 22px;
  white-space: nowrap;

  margin: 0 12px 0 32px;
`;

export const Menu = styled.div`
  position: absolute;
  bottom: -140px;

  width: 160px;
  padding: 4px;
  box-sizing: border-box;

  border: 2px solid ${theme.gray500};
  border-radius: 8px;

  background-color: ${theme.white};
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.2);
`;

export const DocsComponentUl = styled.ul`
  position: absolute;
  top: 28px;
  z-index: 5;

  height: 120px;

  border: 1px solid ${theme.gray500};
  border-radius: 8px;

  overflow-y: scroll;
  box-shadow: ${theme.shadows.shadow2};
`;

export const MenuUl = styled.ul``;
export const MenuLi = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 40px;
  border-radius: 8px;
  background-color: ${theme.white};

  white-space: no-wrap;

  &:hover {
    background-color: ${theme.blue100};
  }
`;

export const BoardArea = styled.article`
  display: flex;
  align-items: center;
  gap: 56px;
`;

export const BoardEl = styled.div`
  display: flex;
  align-items: center;

  font-size: ${theme.textStyles.body1.fontSize};

  &:first-child {
    margin-left: 40px;
  }
`;

export const WorkType = styled.span`
  margin: 0 16px 0 4px;
`;

export const WorkAmount = styled.span`
  font-size: ${theme.textStyles.subtitle3.fontSize};
  font-weight: 700;
  color: ${theme.gray700};

  cursor: pointer;

  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    color: ${theme.blue600};
  }
`;
export const Check = styled(MdCheck)`
  color: ${theme.gray700};
  font-size: 24px;
`;

export const EditNote = styled(MdEditNote)`
  color: ${theme.gray700};
  font-size: 24px;
`;
