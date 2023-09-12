import styled from "styled-components";

export const Item = styled.div`
  margin: 10px;
  .item-wrap {
    width: 360px;
    height: 360px;

    margin: 10px;

    border-radius: 8px;
    border: none;

    box-shadow: 2px 2px 50px 7px rgba(0, 0, 0, 0.15);

    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;

    gap: 10%;

    &:hover {
      transform: scale(0.98);
      opacity: 50%;
      transition: 0.3s;
    }
  }

  .image-container {
    width: 70%;
    height: 50%;

    position: relative;

    margin: 0 auto;

    img {
      position: absolute;
      top: 0;
      left: 0;

      width: 100%;
      height: 80%;

      object-fit: contain;
    }
  }

  p {
    font-size: 1.5rem;
  }
`;
