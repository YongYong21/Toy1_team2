import styled from 'styled-components';
import { theme } from '../Theme';

const FlexDiv = styled.div`
  width: 100%;

  display: flex;
  margin-left: 256px;
  ul {
    list-style-type: disc;
  }
  ol {
    list-style-type: decimal;
  }
  textarea {
    resize: none;
  }
`;
const ContentsContainer = styled.div`
  width: 85vh;
  position: relative;
  padding: 20px 30px 0px;
`;
const CenterBorder = styled.div`
  width: 2px;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;

  background-color: ${theme.gray500};
`;
const TitleDiv = styled.div`
  height: 52px;

  margin-bottom: 16px;
  padding: 8px;

  font-size: 36px;
`;
const TimeStampWrap = styled.div`
  display: flex;
  margin-bottom: 16px;
`;
const TimeStampDiv = styled.div`
  height: 30px;

  padding: 8px;

  font-size: 16px;
`;

const ContentsDiv = styled.div`
  height: 75vh;

  padding: 8px;

  overflow-x: hidden;
  overflow-y: auto;
`;
const StyledTextarea = styled.textarea`
  min-width: 100%;
  height: 70vh;

  padding: 10px;

  font-size: 16px;
`;
const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  gap: 5rem;
`;
const EditBtn = styled.button`
  min-width: 92px;
  height: 48px;

  padding: 12px 32px;

  border-radius: 12px;

  font-size: ${theme.textStyles.button.fontSize};
  line-height: ${theme.textStyles.button.lineHeight};

  transition: all 0.3s;
  /* 첫 번째 버튼 스타일 */
  &.btn1 {
    color: white;
    background-color: ${theme.blue700};
    &:hover {
      background-color: ${theme.blue800};
    }
  }

  /* 두 번째 버튼 스타일 */
  &.btn2 {
    color: ${theme.gray700};
    background-color: ${theme.gray200};
    &:hover {
      background-color: ${theme.gray400};
    }
  }
`;
export {
  FlexDiv,
  ContentsContainer,
  CenterBorder,
  TitleDiv,
  TimeStampWrap,
  TimeStampDiv,
  ContentsDiv,
  StyledTextarea,
  ButtonDiv,
  EditBtn,
};
