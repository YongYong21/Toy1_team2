import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';
import { ImgsContainer, ImgItems } from '../../styles/Home/ShortcutGallerySC';
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
  const bucket = firestore.collection('wiki-test');

  /** 데이터 가져오기 */
  useEffect((): void => {
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
        console.log(imageList, 'imageList');
        console.log(images, 'images');
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    console.log('렌더링');
    void fetchData();
  }, []);

  const fff = (): void => {
    navigate('/');
  };

  return (
    <ImgsContainer>
      <ImgItems onClick={fff}>
        {images.map((image, idx) => {
          return (
            <ImgItems
              key={idx}
              style={{ backgroundImage: `url(${image.imageUrl})` }}
            ></ImgItems>
          );
        })}
      </ImgItems>
    </ImgsContainer>
  );
}
