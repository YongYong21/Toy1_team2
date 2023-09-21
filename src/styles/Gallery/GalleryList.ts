import styled from 'styled-components';

export const Main = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

  max-width: 75rem;

  .no-data {
    font-size: ${(props) => props.theme.textStyles.body1.fontSize};
  }
`;
