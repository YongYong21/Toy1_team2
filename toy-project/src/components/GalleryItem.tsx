import React, { useState } from "react";
import { ImageData } from "../pages/Gallery";
import { Item } from "../styles/GalleryItem";
import { MdClear } from "react-icons/md";

interface GalleryItemProps {
  image: ImageData;
}

export default function GalleryItem({ image }: GalleryItemProps) {
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
          {hovered && <MdClear className="clear-icon" />}
        </div>
      </Item>
    </>
  );
}
