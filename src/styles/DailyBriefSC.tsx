import { css, styled } from "styled-components";
import { theme } from "./Theme";
import { MdCheck, MdEditNote } from "react-icons/md";

export const BriefContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  height: 376px;
`;

export const Inner = styled.div`
  width: 1256px;
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const GreetingArea = styled.div``;

export const CurrentDate = styled.h3`
  font-size: ${theme.textStyles.subtitle4.fontSize};
  color: ${theme.gray700};
  font-weight: 300;
  margin-top: 80px;
  line-height: 1.5;
`;

export const CurrentUser = styled.h1`
  font-size: ${theme.textStyles.subtitle1.fontSize};
  font-weight: 600;
  margin-top: 8px;
  line-height: 1.5;
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
  background-color: ${theme.gray200};
  width: 610px;
  height: 72px;
  border-radius: 36px;
  margin-top: 40px;
  display: flex;
  margin-right: 0;
  position: relative;
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
    content: "";
    width: 1px;
    height: 40px;
    background-color: ${theme.gray400};
    margin-left: 8px;
  }
`;

export const PeriodBtn = styled.button`
  font-size: ${theme.textStyles.subtitle4.fontSize};
  margin: 0 12px 0 32px;
  width: 82px;
`;

export const Menu = styled.div`
  position: absolute;
  bottom: -140px;
  width: 160px;
  border: 2px solid ${theme.gray500};
  border-radius: 8px;
  background-color: ${theme.white};
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  padding: 4px;
`;

// export const start = styled.css`
//   opacity: 0;
// `;

// export const end = styled.css`
//   opacity: 1;
// `;
export const MenuUnli = styled.ul`
  position: absolute;
  top: 28px;
  z-index: 5;
  height: 100px;
  overflow-y: scroll;
  border: 1px solid ${theme.gray500};
  border-radius: 8px;
  box-shadow: ${theme.shadows.shadow2};
`;

export const MenuUl = styled.ul``;
export const MenuLi = styled.li`
  border-radius: 8px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${theme.white};

  &:hover {
    background-color: ${theme.blue100};
  }
`;

export const BoardArea = styled.article`
  display: flex;
  gap: 56px;
  align-items: center;
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
