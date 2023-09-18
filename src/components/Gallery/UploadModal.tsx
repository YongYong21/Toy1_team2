import React, { useState } from 'react';
import Modal from 'react-modal';
import { MdClear } from 'react-icons/md';
import { modalStyle } from '../../styles/Gallery/GalleryModal';
import {
  DeleteButton,
  AddButton,
  ModalContent,
} from '../../styles/Gallery/Gallery';

interface UploadModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onUpload: (selectedFile: File | null, name: string) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onRequestClose,
  onUpload,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [name, setName] = useState<string>('');

  /** 파일 변화 */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files != null) {
      setSelectedFile(e.target.files[0]);
    }
  };

  /** input text 변화 */
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  const handleUpload = (): void => {
    onUpload(selectedFile, name);
    if (selectedFile != null && name !== '') {
      setSelectedFile(null);
      setName('');
    }
  };

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
        <input type="file" onChange={handleFileChange} />
        <h1>이름을 작성해주세요</h1>
        <input type="text" value={name} onChange={handleNameChange} />
      </ModalContent>
      <AddButton className="add-btn" onClick={handleUpload}>
        추가하기
      </AddButton>
    </Modal>
  );
};

export default UploadModal;
