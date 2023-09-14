import styled from "styled-components";

export const TitleWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 55%;

  margin-top: 5rem;
`;

export const Title = styled.h1`
  margin: auto 0;

  font-size: 2rem;
`;

export const AddButton = styled.button`
  cursor: pointer;

  margin: 2px 0;
  padding: 12px 32px;

  border-radius: 8px;
  border: none;

  background-color: #3a7bdf;

  font-size: 15px;
  color: white;

  &:hover {
    background-color: #2565c8;

    color: white;

    transition: 0.3s;
  }
`;

export const Main = styled.div`
  width: 80%;
  min-height: 100vh;

  margin: 0 auto;
  padding: 3rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
