import React from "react";
import { ImageData } from "../pages/Gallery";
import { Item } from "../styles/GalleryItem";

interface GalleryItemProps {
  image: ImageData;
}

export default function GalleryItem({ image }: GalleryItemProps) {
  return (
    <>
      <Item>
        <div className="item-wrap" key={image.id}>
          <div className="image-container">
            <img src={image.imageUrl} alt={image.name} />
          </div>
          <p>{image.name}</p>
        </div>
      </Item>
    </>
  );
}
