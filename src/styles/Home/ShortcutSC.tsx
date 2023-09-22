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
  display: flex;
  position: relative;
  align-items: center;

  font-size: ${theme.textStyles.body2.fontSize};

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

  height: 100%;

  margin: 8px 0;

  &:first-child {
    width: 80%;
  }

  &:last-child {
    width: 20%;
  }
`;
