import { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  render() {
    const { idx, tags, image, largeImg } = this.props;
    return (
      <>
        <li onClick={this.toggleModal} className="ImageGalleryItem" key={idx}>
          <img className="ImageGalleryItem-image" src={image} alt={tags} />
        </li>
        {this.state.showModal && (
          <Modal content={largeImg} onCloseModal={this.toggleModal} />
        )}
      </>
    );
  }
}
ImageGalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  idx: PropTypes.number.isRequired,
};
