import styled from 'styled-components';
import { theme } from '../Theme';

export const HomeContainer = styled.div`
  position: relative;
  padding-top: 56px;
`;

export const ParaTitle = styled.span`
  position: absolute;
  bottom: 120px;
  left: 25%;

  font-size: 48px;
  font-weight: 700;
  color: ${theme.white};

  text-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);

  margin: auto;
`;

export const ParaSubtitle = styled.span`
  position: absolute;
  bottom: 80px;
  left: 25%;

  font-size: 24px;
  font-weight: 500;
  color: ${theme.white};

  margin: auto;
  text-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
`;

export const ParaText = styled.span`
  position: absolute;
  bottom: 180px;
  left: 25.2%;

  font-size: 14px;
  font-weight: 800;
  color: #fff624;

  margin: auto;
  text-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
`;

export const TransparentLeft = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 220px;
  z-index: 1;

  width: 72px;
  height: 72px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.1);

  margin: auto;
  pointer-events: none;
`;

export const TransparentRight = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 220px;
  z-index: 1;

  width: 72px;
  height: 72px;

  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.1);

  margin: auto;
  pointer-events: none;
`;
