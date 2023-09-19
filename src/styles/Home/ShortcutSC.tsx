import { styled } from 'styled-components';
import { theme } from '../Theme';

export const ShortcutContainer = styled.article`
  border: 1px solid ${theme.gray400};
  height: 400px;
  width: 592px;
  border-radius: 8px;
  background-color: ${theme.white};
  box-shadow: ${theme.shadows.shadow1.shadow};
`;

export const Height30 = styled.div`
  height: 30px;
`;

export const ShortcutCell = styled.div`
  font-size: ${theme.textStyles.body2.fontSize};
  display: flex;
  align-items: center;
  position: relative;
  height: 28px;

  &:first-child {
    width: 80%;
    font-size: 16px;
  }
  &:last-child {
    width: 20%;
    font-size: 14px;
  }
`;

export const ShortcutCol = styled.div`
  font-size: ${theme.textStyles.body2.fontSize};
  font-size: ${theme.textStyles.body2.lineHeight};
  margin: 8px 0;
  height: 100%;

  &:first-child {
    width: 80%;
  }
  &:last-child {
    width: 20%;
  }
`;
