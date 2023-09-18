import type ReactModal from 'react-modal';
import styled from 'styled-components';

export const modalStyle: ReactModal.Styles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  content: {
    width: '43%',
    height: '50%',
    minWidth: '25rem',

    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    borderRadius: '16px',

    boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.15)',

    backgroundColor: 'white',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};

export const ModalContent = styled.div`
  display: flex;
  align-items: center;
  gap: 15%;
  justify-content: center;
  text-align: center;

  padding: 1rem;
  margin: 3rem 0 1rem;

  width: 100%;
  height: 70%;

  .input-text {
    margin-bottom: 1rem;
    font-size: ${(props) => props.theme.textStyles.subtitle5.fontSize};
  }

  input[type='file'],
  input[type='text'] {
    margin-bottom: 2%;
    padding: 0.5rem;

    border: 1px solid;
    border-color: ${(props) => props.theme.gray500};
    border-radius: 8px;

    width: 100%;
  }

  .preview-img {
    width: 90%;
    max-width: 15rem;
    max-height: 15rem;

    cursor: pointer;

    &:hover {
      opacity: 70%;
      transition: 0.3s;
    }

    border: 1px solid;
    border-color: ${(props) => props.theme.gray500};

    padding: 10%;
  }

  .input-img {
    display: none;
  }
`;
