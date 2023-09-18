import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { MdClear } from 'react-icons/md';
import { modalStyle, ModalContent } from '../../styles/Gallery/GalleryModal';
import { DeleteButton, AddButton } from '../../styles/Gallery/GalleryContent';
import previewImg from '../../assets/previewImg.jpg';

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
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);

  /** 파일 변화 */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files != null) {
      const file = e.target.files[0];
      setSelectedFile(file);

      /** 미리보기 */
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 모달이 열릴 때 각 데이터 초기화
  useEffect(() => {
    if (isOpen) {
      setPreviewUrl(undefined);
      setName('');
      setSelectedFile(null);
    }
  }, [isOpen]);

  /** input text 변화 */
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  /** 업로드 */
  const handleUpload = (): void => {
    onUpload(selectedFile, name);
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
        <div className="choose-img-wrap">
          <h1 className="input-text">이미지를 선택해주세요</h1>
          <label htmlFor="input-img">
            <img className="preview-img" src={previewUrl ?? previewImg} />
          </label>
          <input
            type="file"
            id="input-img"
            className="input-img"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <div className="input-name-wrap">
          <h1 className="input-text">이름을 작성해주세요</h1>
          <input type="text" value={name} onChange={handleNameChange} />
        </div>
      </ModalContent>
      <AddButton className="add-btn" onClick={handleUpload}>
        추가하기
      </AddButton>
    </Modal>
  );
};

export default UploadModal;
