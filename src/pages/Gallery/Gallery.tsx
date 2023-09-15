import { useEffect, useState } from 'react';
import { firestore, storage } from '../../api/firebase';
import {
  AddButton,
  TitleWrap,
  Title,
  Main,
} from '../../styles/Gallery/Gallery';
import GalleryList from '../../components/Gallery/GalleryList';

import UploadModal from '../../components/Gallery/UploadModal';

export interface ImageData {
  id: string;
  imageUrl: string;
  name: string;
}

export default function Gallery(): JSX.Element {
  const [images, setImages] = useState<ImageData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const bucket = firestore.collection('wiki-test');

  /** 데이터 삭제 */
  const deleteData = async (doc: ImageData): Promise<void> => {
    const dataId = doc.id;
    const imageRef = storage.refFromURL(doc.imageUrl);

    try {
      await bucket.doc(dataId).delete();

      await imageRef.delete();

      setImages((prevImages) =>
        prevImages.filter((image) => image.id !== doc.id),
      );
    } catch (error) {
      console.log(error);
    }
  };

  /** 모달 관련 */
  const openModal = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    /** 데이터 가져오기 */
    const fetchData = async (): Promise<void> => {
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
        console.error('Error fetching data: ', error);
      }
    };
    void fetchData();
    console.log('렌더링');
  }, []);

  /** 데이터 추가 */
  const onUpload = async (
    selectedFile: File | null,
    name: string,
  ): Promise<void> => {
    if (selectedFile == null || name === '') {
      alert('값을 모두 채워주세요!');
      return;
    }
    if (selectedFile != null && name !== '') {
      try {
        // 스토리지에 넣기
        const storageRef = storage.ref();
        const fileRef = storageRef.child(selectedFile.name);
        await fileRef.put(selectedFile);

        // 파이어스토어에 넣기
        const imageUrl = await fileRef.getDownloadURL();
        const docRef = await bucket.add({ imageUrl, name });

        // useState 사용
        setImages((prevImages) => [
          ...prevImages,
          { id: docRef.id, imageUrl, name },
        ]);

        alert('성공적으로 업로드되었습니다!');
        // 모달 닫기
        closeModal();
      } catch (error) {
        console.error('데이터 업로드 에러: ', error);
      }
    }
  };

  return (
    <>
      <TitleWrap>
        <Title>협력사</Title>
        <AddButton onClick={openModal}>추가하기</AddButton>
        <UploadModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          onUpload={onUpload}
        />
      </TitleWrap>
      <Main>
        <GalleryList images={images} deleteData={deleteData} />
      </Main>
    </>
  );
}
