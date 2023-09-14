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
  width: 7.8rem;

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
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 1rem;
  margin-top: 2rem;

  h1 {
    margin-bottom: 1rem;
  }

  input[type="file"],
  input[type="text"] {
    margin-bottom: 2rem;
    padding: 0.5rem;

    border: 1px solid #ccc;
    border-radius: 5px;

    width: 100%;
  }
`;

export const DeleteButton = styled.button`
  position: absolute;

  top: 30px;
  right: 30px;

  font-size: 2rem;
  color: #3a7bdf;
`;
