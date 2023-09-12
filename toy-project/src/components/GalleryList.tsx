import React from "react";
import GalleryItem from "./GalleryItem";
import { ImageData } from "../pages/Gallery";
import { Main } from "../styles/GalleryList";

interface GalleryListProps {
  images: ImageData[];
}

export default function GalleryList({ images }: GalleryListProps) {
  return (
    <Main>
      {images.map((image) => {
        return <GalleryItem image={image} key={image.id} />;
      })}
    </Main>
  );
}
