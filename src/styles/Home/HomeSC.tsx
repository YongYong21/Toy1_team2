import styled from 'styled-components';
import { theme } from '../Theme';

export const HomeContainer = styled.div`
  padding-top: 56px;
  position: relative;
  height: 1500px;
`;

export const ParaTitle = styled.span`
  font-size: 48px;
  font-weight: 700;
  color: ${theme.white};
  position: absolute;
  bottom: 120px;
  left: 25%;
  margin: auto;
  text-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
`;

export const ParaSubtitle = styled.span`
  font-size: 24px;
  font-weight: 500;
  color: ${theme.white};
  position: absolute;
  bottom: 80px;
  left: 25%;
  margin: auto;
  text-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
`;

export const ParaText = styled.span`
  font-size: 14px;
  font-weight: 800;
  color: #fff624;
  position: absolute;
  bottom: 180px;
  left: 25.2%;
  margin: auto;
  text-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
`;

export const TransparentLeft = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  left: 220px;
  z-index: 1;
  pointer-events: none;
`;

export const TransparentRight = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  right: 220px;
  z-index: 1;
  pointer-events: none;
`;
