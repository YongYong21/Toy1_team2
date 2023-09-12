import React, { useEffect, useState } from "react";
import { firestore } from "../api/firebase";
import { AddButton, TitleWrap, Title, Main } from "../styles/Gallery";
import GalleryList from "../components/GalleryList";

export interface ImageData {
  id: string;
  imageUrl: string;
  name: string;
}

export default function Gallery() {
  /**데이터 가져오기 */
  const [images, setImages] = useState<ImageData[]>([]);

  const fetchData = async () => {
    try {
      const bucket = firestore.collection("imageName");
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <TitleWrap>
        <Title>협력사</Title>
        <AddButton>추가하기</AddButton>
      </TitleWrap>
      <Main>
        <GalleryList images={images} />
      </Main>
    </>
  );
}
