import styled from 'styled-components';

export const Main = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  .no-data {
    font-size: ${(props) => props.theme.textStyles.body1.fontSize};
  }
`;
