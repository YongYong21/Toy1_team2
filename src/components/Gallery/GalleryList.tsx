import React from 'react';
import GalleryItem from './GalleryItem';
import { type ImageData } from './GalleryContent';
import { Main } from '../../styles/Gallery/GalleryList';

interface GalleryListProps {
  images: ImageData[];
  deleteData: (image: ImageData) => void;
}

export default function GalleryList({
  images,
  deleteData,
}: GalleryListProps): JSX.Element {
  return (
    <Main>
      {images.length === 0 ? (
        <h1 className="no-data">
          업로드 된 사진이 없습니다. 새로운 사진을 추가해주세요!
        </h1>
      ) : (
        images.map((image) => (
          <GalleryItem image={image} key={image.id} deleteData={deleteData} />
        ))
      )}
    </Main>
  );
}
