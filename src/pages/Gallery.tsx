import React, { useEffect, useState } from "react";
import { firestore, storage } from "../api/firebase";
import { AddButton, TitleWrap, Title, Main } from "../styles/Gallery";
import GalleryList from "../components/GalleryList";

export interface ImageData {
  id: string;
  imageUrl: string;
  name: string;
}

export default function Gallery() {
  const [images, setImages] = useState<ImageData[]>([]);
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
  }, [bucket]);

  return (
    <>
      <TitleWrap>
        <Title>협력사</Title>
        <AddButton>추가하기</AddButton>
      </TitleWrap>
      <Main>
        <GalleryList images={images} deleteData={deleteData} />
      </Main>
    </>
  );
}
