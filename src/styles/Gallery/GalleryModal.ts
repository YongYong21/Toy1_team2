import type ReactModal from 'react-modal';

export const modalStyle: ReactModal.Styles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  content: {
    width: '39%',
    height: '46%',
    minWidth: '25rem',

    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    borderRadius: '16px',

    boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',

    backgroundColor: 'white',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    padding: '3rem',
  },
};
