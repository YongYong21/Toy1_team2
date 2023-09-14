import React, { useEffect, useState } from "react";
import { firestore, storage } from "../../api/firebase";
import {
  AddButton,
  TitleWrap,
  Title,
  Main,
  ModalContent,
  DeleteButton,
} from "../../styles/Gallery/Gallery";
import GalleryList from "../../components/Gallery/GalleryList";
import Modal from "react-modal";
import { modalStyle } from "../../styles/Gallery/GalleryModal";
import { MdClear } from "react-icons/md";
import UploadModal from "../../components/UploadModal";

export interface ImageData {
  id: string;
  imageUrl: string;
  name: string;
}

export default function Gallery() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const bucket = firestore.collection("wiki-test");

  /**데이터 삭제 */
  const deleteData = async (doc: ImageData) => {
    const dataId = doc.id;
    const imageRef = storage.refFromURL(doc.imageUrl);

    try {
      await bucket.doc(dataId).delete();

      await imageRef.delete();

      setImages((prevImages) =>
        prevImages.filter((image) => image.id !== doc.id)
      );
    } catch (error) {
      console.log("데이터 삭제 에러: " + error);
    }
  };

  /** 모달 관련 */
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    /**데이터 가져오기 */
    const fetchData = async () => {
      try {
        const querySnapshot = await bucket.get();
        const imageList: ImageData[] = [];

        querySnapshot.forEach((doc) => {
          if (doc.exists) {
            const data = doc.data();
            imageList.push({
              id: doc.id,
              imageUrl: data.imageUrl,
              name: data.name,
            });
          }
        });
        setImages(imageList);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
    console.log("렌더링");
  }, []);

  return (
    <>
      <TitleWrap>
        <Title>협력사</Title>
        <AddButton onClick={openModal}>추가하기</AddButton>
        <UploadModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          onUpload={() => {
            closeModal();
          }}
        />
      </TitleWrap>
      <Main>
        <GalleryList images={images} deleteData={deleteData} />
      </Main>
    </>
  );
}
