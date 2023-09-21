import styled from 'styled-components';
import { theme } from '../Theme';

const ContentsContainer = styled.div`
  width: 1280px;
  min-width: 1080px;

  padding: 20px 30px 0px;
  margin-left: 256px;
`;
const TitleDiv = styled.div`
  padding: 8px;
  margin-bottom: 16px;

  font-size: ${theme.textStyles.subtitle1.fontSize};
  line-height: ${theme.textStyles.subtitle1.lineHeight};
`;
const TimeStampWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 16px;
`;
const TimeStampDiv = styled.div`
  width: 80%;
  height: 30px;

  font-size: 16px;
  padding: 8px;
`;
const EditBtn = styled.button`
  min-width: 92px;
  height: 48px;

  color: white;
  background-color: ${theme.blue700};

  font-size: ${theme.textStyles.button.fontSize};
  line-height: ${theme.textStyles.button.lineHeight};

  border-radius: 12px;

  padding: 12px 32px;

  transition: all 0.3s;

  &:hover {
    background-color: ${theme.blue800};
    color: #fefefe;
  }
`;
const CancelBtn = styled.button`
  min-width: 92px;
  height: 48px;

  padding: 12px 32px;

  color: ${theme.gray700};
  background-color: ${theme.gray200};

  font-size: ${theme.textStyles.button.fontSize};
  line-height: ${theme.textStyles.button.lineHeight};

  border-radius: 12px;

  transition: all 0.3s;

  &:hover {
    background-color: ${theme.gray400};
  }
`;
const AddBtn = styled.button`
  min-width: 92px;
  height: 48px;

  margin-right: auto;
  padding: 12px 32px;

  float: right;

  border-radius: 12px;

  color: white;
  background-color: ${theme.blue700};

  font-size: ${theme.textStyles.button.fontSize};
  line-height: ${theme.textStyles.button.lineHeight};

  transition: all 0.3s;

  &:hover {
    background-color: ${theme.blue800};
    color: #fefefe;
  }
`;
const ContentsDiv = styled.div`
  padding: 8px;
  ul {
    list-style-type: disc;
  }
  ol {
    list-style-type: decimal;
  }
  &:hover {
  }
`;
const PostDiv = styled.div`
  width: 70%;

  margin: 0px 16px 16px;
  padding: 16px;

  border: 1px solid black;
  border-radius: 8px;

  & > div {
    margin-bottom: 16px;
  }
  & > div:first-child {
    font-size: ${theme.textStyles.subtitle3.fontSize};
    line-height: ${theme.textStyles.subtitle3.lineHeight};
  }
`;
const PostTitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: ${theme.textStyles.subtitle1.fontSize};
  line-height: ${theme.textStyles.subtitle1.lineHeight};
  svg {
    cursor: pointer;
  }
`;
const DimDiv = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;

  background-color: rgba(0, 0, 0, 0.3);
`;
const PostModal = styled.div`
  width: 800px;

  margin: 32px auto;

  position: fixed;

  background-color: white;

  textarea {
    resize: none;
  }
`;
const PostTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 16px;
  border: 1px solid ${theme.gray300};

  font-size: ${theme.textStyles.subtitle2.fontSize};
  line-height: ${theme.textStyles.subtitle2.lineHeight};

  svg {
    cursor: pointer;
  }
`;
const LabelDiv = styled.div`
  padding: 16px;
  div {
    margin-bottom: 8px;
    font-size: ${theme.textStyles.body1.fontSize};
    line-height: ${theme.textStyles.body1.lineHeight};
  }
`;
const Label = styled.label`
  input {
    margin-bottom: 16px;
    border: 1px solid #ccc;
    padding: 8px;
    outline-color: ${theme.blue600};
  }

  textarea {
    border: 1px solid #ccc;
    padding: 8px;
    width: 100%;
    height: 150px;
    outline-color: ${theme.blue600};
  }
`;
const ButtonContainer = styled.div`
  margin: 32px 0;
  padding: 16px;

  display: flex;
  justify-content: center;
  gap: 20px;
`;

export {
  ContentsContainer,
  TitleDiv,
  TimeStampWrap,
  TimeStampDiv,
  EditBtn,
  CancelBtn,
  AddBtn,
  ContentsDiv,
  PostDiv,
  PostTitleDiv,
  DimDiv,
  PostModal,
  PostTitleContainer,
  LabelDiv,
  Label,
  ButtonContainer,
};
