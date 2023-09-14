import React from "react";
import Modal from "react-modal";
import { MdClear } from "react-icons/md";
import { modalStyle } from "../styles/Gallery/GalleryModal";
import {
  DeleteButton,
  AddButton,
  ModalContent,
} from "../styles/Gallery/Gallery";

interface UploadModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onUpload: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onRequestClose,
  onUpload,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={modalStyle}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={true}
    >
      <DeleteButton className="delete-btn" onClick={onRequestClose}>
        <MdClear />
      </DeleteButton>
      <ModalContent>
        <h1>이미지를 선택해주세요</h1>
        <input type="file"></input>
        <h1>이름을 작성해주세요</h1>
        <input type="text"></input>
      </ModalContent>
      <AddButton className="add-btn" onClick={onUpload}>
        추가하기
      </AddButton>
    </Modal>
  );
};

export default UploadModal;
