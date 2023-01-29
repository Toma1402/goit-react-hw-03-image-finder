import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export const ImageGallery = ({ imageArray }) => {
  return (
    <ul className="ImageGallery">
      {imageArray.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          largeImg={largeImageURL}
          idx={id}
          tags={tags}
          image={webformatURL}
        />
      ))}
    </ul>
  );
};
ImageGallery.propTypes = {
  imageArray: PropTypes.array.isRequired,
};
