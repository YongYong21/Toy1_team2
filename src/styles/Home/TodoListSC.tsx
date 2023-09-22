import { styled } from 'styled-components';
import { theme } from '../Theme';
import { LuPlus } from 'react-icons/lu';
import { HiDocumentText } from 'react-icons/hi';
import { MdCheck, MdMoreHoriz } from 'react-icons/md';
import { PiWarningCircleBold } from 'react-icons/pi';

export const TodoListContainer = styled.article`
  height: 400px;
  width: 592px;

  border: 1px solid ${theme.gray400};
  border-radius: 8px;

  background-color: ${theme.white};
  box-shadow: ${theme.shadows.shadow1.shadow};
  overflow-y: hidden;
`;

export const TitleLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  position: relative;

  margin: 16px 24px;
`;

export const Title = styled.span`
  font-size: ${theme.textStyles.subtitle5.fontSize};
  font-weight: 700;
  line-height: ${theme.textStyles.subtitle5.lineHeight};
`;

export const BtnSmLi = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;

  font-size: ${theme.textStyles.button.fontSize};
  color: ${theme.blue700};

  background-color: ${theme.blue200};
  border-radius: 8px;
  padding: 6px 8px;

  &:hover {
    background-color: ${theme.blue300};
  }
`;

export const Plus = styled(LuPlus)`
  font-size: 16px;
`;

export const TabList = styled.div`
  position: relative;

  display: flex;
  gap: 32px;

  padding: 0 24px;
  magin-top: 16px;
  border-bottom: 1px solid ${theme.gray400};
`;

export const TabBtn = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  font-size: ${theme.textStyles.body2.fontSize};
  line-height: ${theme.textStyles.body2.lineHeight};
  color: ${theme.gray700};

  cursor: pointer;
  margin-bottom: 4px;

  &:hover {
    color: black;
  }

  &::after {
    content: '';
    width: 100%;
    height: 2px;
    position: absolute;
    bottom: -5px;
  }
`;
export const TabBtnClk = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  font-size: ${theme.textStyles.body2.fontSize};
  line-height: ${theme.textStyles.body2.lineHeight};

  color: #000;
  cursor: pointer;
  margin-bottom: 4px;

  &:hover {
    color: black;
  }

  &::after {
    content: '';
    width: 100%;
    height: 2px;
    position: absolute;
    background-color: ${theme.blue700};
    bottom: -5px;
  }
`;

export const Th = styled.div`
  display: flex;
  padding: 8px 24px;

  background-color: ${theme.white};
  position: relative;
  z-index: 1;
`;

export const Col = styled.div`
  font-size: ${theme.textStyles.body2.fontSize};
  height: 100%;

  margin: 8px 0;

  &:first-child {
    width: 70%;
  }

  &:last-child {
    width: 30%;
  }
`;

export const Tb = styled.div`
  position: relative;
  height: 263px;

  overflow-y: scroll;
`;
export const Tr = styled.div`
  display: flex;
  position: relative;

  cursor: pointer;
  padding: 8px 24px;

  &:hover {
    background-color: ${theme.blue100};
    font-weight: 500;
  }
`;

export const NewInputContainer = styled.div`
  display: flex;
  position: relative;

  background-color: ${theme.blue100};
  cursor: pointer;
  padding: 8px 24px;
`;

export const Cell = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  font-size: ${theme.textStyles.body2.fontSize};

  &:first-child {
    width: 70%;
  }
  &:last-child {
    width: 30%;
  }
`;

export const FloatBtn = styled.button`
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 16px;

  height: 20px;
  border: 1px solid ${theme.blue500};
  border-radius: 4px;

  font-size: ${theme.textStyles.caption};
  color: ${theme.blue500};

  margin: auto;
  opacity: 0;

  ${Tr}:hover & {
    opacity: 1;
  }

  &:hover {
    border: 1px solid ${theme.blue700};
    color: ${theme.blue700};
  }
`;

export const DocText = styled(HiDocumentText)`
  width: 16px;
  color: ${theme.blue300};

  margin-right: 8px;

  ${Cell}:hover & {
    color: ${theme.blue500};
  }
`;

export const ChkIcon = styled(MdCheck)`
  font-size: 16px;
  color: ${theme.blue300};

  border: 1px solid ${theme.blue300};
  border-radius: 50%;

  transition: all 0.2s;
  margin-right: 8px;

  ${Cell}:hover & {
    color: ${theme.blue500};
    border: 1px solid ${theme.blue500};
  }

  &:hover {
    color: ${theme.white};
    background-color: ${theme.blue700};
    border: none;
  }
`;

export const ChkedIcon = styled(MdCheck)`
  font-size: 16px;
  color: ${theme.white};
  border-radius: 50%;

  background-color: ${theme.blue700};

  margin-right: 8px;
  transition: all 0.2s;

  ${Cell}:hover & {
    background-color: ${theme.blue500};
  }
`;

export const TitleEditInput = styled.input`
  width: 90%;
  height: 28px;

  font-size: 16px;
  font-family: 'Pretendard', sans-serif;
  margin: 0;
`;

export const Info = styled(PiWarningCircleBold)`
  font-size: 40px;
  margin-right: 8px;
`;

export const NewInput = styled.input`
  width: 100%;
  margin-right: 24px;
`;

export const CheckIcon = styled.div``;

export const NoContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 60%;
  color: ${theme.gray700};
`;

export const MoreIcon = styled(MdMoreHoriz)``;

export const MoreButton = styled.button`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 12px;
  margin: auto;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 24px;
  color: ${theme.blue700};

  padding: 0;

  opacity: 0;
  transition: 0.3s;

  ${Tr}:hover & {
    opacity: 1;
    color: ${theme.gray500};
  }

  ${MoreIcon}:hover & {
    background-color: ${theme.blue700};
  }
`;

export const DeleteToolTip = styled.div`
  position: absolute;
  right: 0;
  bottom: -28px;
  z-index: 2;

  color: ${theme.gray700};

  background-color: ${theme.white};
  border: 1px solid ${theme.gray300};
  border-radius: 4px;
  box-shadow: 0 0 40px 4px rgba(0, 0, 0, 0.1);

  padding: 8px 16px;
  opacity: 1;
`;

export const TodoTitle = styled.span`
  display: flex;
  align-items: center;

  height: 28px;
  border-radius: 4px;
  white-space: normal;

  padding-left: 8px;

  width: 90%;
  &:hover {
    background-color: ${theme.blue200};
  }
`;

export const ToggleDocsBtn = styled.button`
  color: ${theme.gray600};
  padding: 0 8px;

  height: 24px;
  width: 120px;
  border-radius: 4px;

  display: flex;
  align-items: center;

  &:hover {
    background-color: ${theme.blue200};
  }

  &:focus {
    background-color: ${theme.white};
    border: 1px solid ${theme.gray500};
  }
`;

export const MenuLiInTdl = styled.li`
  display: flex;
  width: 120px;
  height: 32px;

  justify-content: center;
  align-items: center;

  border-radius: 8px;
  background-color: ${theme.white};
  box-sizing: border-box;

  &:hover {
    background-color: ${theme.blue100};
  }
`;
