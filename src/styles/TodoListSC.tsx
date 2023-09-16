import { css, styled } from "styled-components";
import { theme } from "./Theme";
import { LuPlus } from "react-icons/lu";
import { HiDocumentText } from "react-icons/hi";
import { MdCheck, MdMoreHoriz } from "react-icons/md";
import { PiWarningCircleBold } from "react-icons/pi";

export let TodoListContainer = styled.article`
  border: 1px solid ${theme.gray400};
  height: 400px;
  width: 592px;
  border-radius: 8px;
  background-color: ${theme.white};
  box-shadow: ${theme.shadows.shadow1.shadow};
`;

export let TitleLine = styled.div`
  margin: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

export let Title = styled.span`
  font-size: ${theme.textStyles.subtitle5.fontSize};
  line-height: ${theme.textStyles.subtitle5.lineHeight};
  font-weight: 700;
`;

export let BtnSmLi = styled.button`
  font-size: ${theme.textStyles.button.fontSize};
  padding: 6px 16px;
  background-color: ${theme.blue200};
  border-radius: 8px;
  color: ${theme.blue700};
  &:hover {
    background-color: ${theme.blue300};
  }
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 8px;
`;

export let Plus = styled(LuPlus)`
  font-size: 16px;
`;

export let TabList = styled.div`
  magin-top: 16px;
  padding: 0 24px;
  display: flex;
  gap: 32px;
  position: relative;
  border-bottom: 1px solid ${theme.gray400};
`;

export let TabBtn = styled.div`
  font-size: ${theme.textStyles.body2.fontSize};
  line-height: ${theme.textStyles.body2.lineHeight};
  cursor: pointer;
  color: ${theme.gray700};
  margin-bottom: 4px;
  position: relative;
  display: flex;
  flex-direction: column;

  &:hover {
    color: black;
  }
  &::after {
    content: "";
    width: 100%;
    height: 2px;
    position: absolute;
    bottom: -5px;
  }
`;
export let TabBtnClk = styled.div`
  font-size: ${theme.textStyles.body2.fontSize};
  line-height: ${theme.textStyles.body2.lineHeight};
  cursor: pointer;
  color: #000;
  margin-bottom: 4px;
  position: relative;
  display: flex;
  flex-direction: column;

  &:hover {
    color: black;
  }
  &::after {
    content: "";
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
  font-size: ${theme.textStyles.body2.lineHeight};
  margin: 8px 0;
  height: 100%;

  &:first-child {
    width: 70%;
  }
  &:last-child {
    width: 30%;
  }
`;
// overflow: scroll;
export const Tb = styled.div`
  height: 100%;
`;
export const Tr = styled.div`
  padding: 8px 24px;
  display: flex;
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: ${theme.blue100};
    font-weight: 500;
  }
`;

export const NewInputContainer = styled.div`
  padding: 8px 24px;
  display: flex;
  cursor: pointer;
  position: relative;
  background-color: ${theme.blue100};
`;

export const Cell = styled.div`
  font-size: ${theme.textStyles.body2.fontSize};
  display: flex;
  align-items: center;
  position: relative;

  &:first-child {
    width: 70%;
    &:hover {
      text-decoration: underline;
    }
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
  margin: auto;
  height: 20px;
  border: 1px solid ${theme.blue500};
  border-radius: 4px;
  color: ${theme.blue500};
  font-size: ${theme.textStyles.caption};
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
  margin-right: 8px;
  color: ${theme.blue300};

  ${Cell}:hover & {
    color: ${theme.blue500};
  }
`;

export const ChkIcon = styled(MdCheck)`
  font-size: 16px;
  margin-right: 8px;
  color: ${theme.blue300};
  border: 1px solid ${theme.blue300};
  border-radius: 50%;
  transition: all 0.2s;

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
  margin-right: 8px;
  color: ${theme.white};
  border-radius: 50%;
  background-color: ${theme.blue700};
  transition: all 0.2s;

  ${Cell}:hover & {
    background-color: ${theme.blue500};
  }
`;

export const TitleEditInput = styled.input`
  width: 80%;
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
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${theme.gray700};
`;

export const MoreIcon = styled(MdMoreHoriz)``;

export const MoreButton = styled.button`
  font-size: 24px;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 24px;
  margin: auto;
  padding: 0;
  color: ${theme.blue700};
  opacity: 0;
  transition: 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
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
  background-color: ${theme.white};
  border: 1px solid ${theme.gray300};
  padding: 8px 16px;
  bottom: -32px;
  z-index: 2;
  box-shadow: 0 0 40px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  color: ${theme.gray700};
  opacity: 1;
`;
