import styled from 'styled-components';

export const Main = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

  margin-left: 1.5rem;

  .no-data {
    font-size: ${(props) => props.theme.textStyles.body1.fontSize};
  }
`;
