import { useNavigate } from 'react-router-dom';
import {
  ImgsContainer,
  ImgItems,
  ImgTitle,
  NoImg,
  ImgHeader,
  BtnSmLiShortcut,
  RightArrow,
  SectionContainer,
} from '../../styles/Home/ShortcutGallerySC';
import { firestore } from '../../api/firebase';
import { useEffect, useState } from 'react';

export interface ImageData {
  id: string;
  imageUrl: string;
  name: string;
}

export function ShortcutGallery(): JSX.Element {
  const navigate = useNavigate();
  const [images, setImages] = useState<ImageData[]>([]);
  const bucket = firestore.collection('facility');

  /** 데이터 가져오기 */
  useEffect((): void => {
    const fetchData = async (): Promise<void> => {
      try {
        const querySnapshot = await bucket.get();
        const imageList: ImageData[] = [];

        querySnapshot.forEach((doc) => {
          if (doc.exists) {
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
        setImages(imageList);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    void fetchData();
  }, []);

  const onNaviagate = (): void => {
    navigate('/gallery/facility');
    // 추후 /gallery/partner로 바꿀 예정
  };

  return (
    <SectionContainer>
      <ImgHeader>
        회사시설 이미지
        <RightArrow onClick={onNaviagate} />
      </ImgHeader>
      <ImgsContainer>
        {images.length === 0 && (
          <NoImg>
            이런, 사내시설 이미지가 없네요.
            <BtnSmLiShortcut //
              onClick={onNaviagate}
            >
              갤러리로 이동
            </BtnSmLiShortcut>
          </NoImg>
        )}
        {images.length !== 0 &&
          images.map((image, idx) => {
            return (
              <ImgItems
                key={idx}
                style={{ backgroundImage: `url(${image.imageUrl})` }}
                onClick={onNaviagate}
              >
                <ImgTitle>{image.name}</ImgTitle>
              </ImgItems>
            );
          })}
      </ImgsContainer>
    </SectionContainer>
  );
}
