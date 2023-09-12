import styled from "styled-components";

export const Item = styled.div`
  margin: 10px;
  .item-wrap {
    width: 360px;
    height: 360px;

    position: relative;

    margin: 10px;

    border-radius: 8px;
    border: none;

    box-shadow: 2px 2px 50px 7px rgba(0, 0, 0, 0.15);

    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    gap: 10%;
  }

  .item-wrap:hover {
    opacity: 70%;

    transform: scale(0.98);
    transition: 0.3s;
  }

  .image-container {
    width: 70%;
    height: 50%;

    position: relative;

    margin: 0 auto;

    .image {
      position: absolute;
      top: 0;
      left: 0;

      width: 100%;
      height: 80%;

      object-fit: contain;
    }
  }

  .image-name {
    font-size: 1.5rem;
  }

  .clear-icon {
    width: 30px;
    height: 30px;

    position: absolute;

    top: 30px;
    right: 30px;

    cursor: pointer;

    color: #3a7bdf;
  }
`;