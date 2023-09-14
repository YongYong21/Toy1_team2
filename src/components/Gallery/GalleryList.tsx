import React from "react";
import GalleryItem from "./GalleryItem";
import { ImageData } from "../../pages/Gallery/Gallery";
import { Main } from "../../styles/Gallery/GalleryList";

interface GalleryListProps {
  images: ImageData[];
  deleteData: (image: ImageData) => void;
}

export default function GalleryList({ images, deleteData }: GalleryListProps) {
  return (
    <Main>
      {images.map((image) => {
        return (
          <GalleryItem image={image} key={image.id} deleteData={deleteData} />
        );
      })}
    </Main>
  );
}
