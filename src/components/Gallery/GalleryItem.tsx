import React, { useState } from 'react';
import { type ImageData } from './GalleryContent';
import { Item } from '../../styles/Gallery/GalleryItem';
import { MdClear } from 'react-icons/md';
import { DeleteButton } from '../../styles/Gallery/GalleryContent';
import { useAuthState } from '../../contexts/AuthContext';

interface GalleryItemProps {
  image: ImageData;
  deleteData: (image: ImageData) => void;
}

export default function GalleryItem({
  image,
  deleteData,
}: GalleryItemProps): JSX.Element {
  const [hovered, setHovered] = useState(false);
  const authState = useAuthState();

  const handleMouseEnter = (): void => {
    setHovered(true);
  };

  const handleMouseLeave = (): void => {
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
          {hovered &&
            authState.state === 'loaded' &&
            authState.isAuthentication && (
              <DeleteButton
                className="delete-btn"
                onClick={() => {
                  deleteData(image);
                }}
              >
                <MdClear />
              </DeleteButton>
            )}
        </div>
      </Item>
    </>
  );
}
