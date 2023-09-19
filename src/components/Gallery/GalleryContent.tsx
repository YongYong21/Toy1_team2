import { useEffect, useState } from 'react';
import { firestore, storage } from '../../api/firebase';
import { useParams } from 'react-router-dom';
import {
  AddButton,
  TitleWrap,
  Title,
  Main,
  FlexBox,
} from '../../styles/Gallery/GalleryContent';
import GalleryList from './GalleryList';
import UploadModal from './UploadModal';

export interface ImageData {
  id: string;
  imageUrl: string;
  name: string;
}

export default function GalleryContent(): JSX.Element {
  const { id } = useParams() as { id: string };
  const [images, setImages] = useState<ImageData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const bucket = firestore.collection(id);
  const [title, setTitle] = useState<string>('');

  /** 데이터 삭제 */
  const deleteData = async (doc: ImageData): Promise<void> => {
    const dataId = doc.id;
    const imageRef = storage.refFromURL(doc.imageUrl);

    try {
      if (confirm('정말 삭제하시겠습니까?')) {
        await bucket.doc(dataId).delete();

        await imageRef.delete();

        setImages((prevImages) =>
          prevImages.filter((image) => image.id !== doc.id),
        );

        setTimeout(() => {
          alert('삭제가 완료되었습니다!');
        }, 5);
      }
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
            /** 타이틀 문서 제외하고 이미지 데이터만 가져오기 */
            if (doc.id !== 'title') {
              const data = doc.data();
              imageList.push({
                id: doc.id,
                imageUrl: data.imageUrl,
                name: data.name,
              });
            }
          }
        });

        /** title 가져오기 */
        const docRef = await bucket.doc('title').get();
        if (docRef.exists) {
          const data = docRef.data();
          if (data !== undefined) {
            setTitle(data.title);
          }
        }

        setImages(imageList);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    void fetchData();
  }, [id]);

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
    <FlexBox>
      <TitleWrap>
        <Title>{title}</Title>
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
    </FlexBox>
  );
}
