import { styled } from 'styled-components';
import { theme } from './Theme';

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
