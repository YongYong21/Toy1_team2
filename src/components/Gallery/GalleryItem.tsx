import React, { useState } from "react";
import { ImageData } from "../../pages/Gallery/Gallery";
import { Item } from "../../styles/Gallery/GalleryItem";
import { MdClear } from "react-icons/md";
import { DeleteButton } from "../../styles/Gallery/Gallery";

interface GalleryItemProps {
  image: ImageData;
  deleteData: (image: ImageData) => void;
}

export default function GalleryItem({ image, deleteData }: GalleryItemProps) {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <>
      <Item onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className="item-wrap" key={image.id}>
          <div className="image-container">
            <img className="image" src={image.imageUrl} alt={image.name} />
          </div>
          <p className="image-name">{image.name}</p>
          {hovered && (
            <DeleteButton
              className="delete-btn"
              onClick={() => deleteData(image)}
            >
              <MdClear />
            </DeleteButton>
          )}
        </div>
      </Item>
    </>
  );
}
