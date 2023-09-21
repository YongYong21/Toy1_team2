import styled from 'styled-components';

export const FlexBox = styled.div`
  margin: 0 auto;
  margin-top: 200px;

  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  justify-content: space-between;

  .image {
    width: 60%;
  }
`;

export const ErrorText = styled.h1`
  font-size: 1.5rem;
  color: ${(props) => props.theme.gray700};
`;

export const FooterContainer = styled.div`
  margin-top: 200px;
`;
