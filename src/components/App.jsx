import { Component } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from 'services-api/fetchApi';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    image: '',
    imageArr: null,
    loading: false,
    error: null,
    showBtn: false,
    page: 1,
    total: 0,
  };
  async componentDidUpdate(_, prevState) {
    if (
      prevState.image !== this.state.image ||
      prevState.page !== this.state.page
    ) {
      try {
        const resp = await fetchImages(this.state.image, this.state.page);
        if (!resp.total) {
          toast.warning('Sorry, we have not images named ' + this.state.image);
          this.setState({ imageArr: [], showBtn: false });
          return;
        }

        this.setState(prev => ({
          imageArr:
            this.state.page === 1
              ? [...resp.hits]
              : [...prev.imageArr, ...resp.hits],
          total: resp.total,
          showBtn: true,
        }));
      } catch (error) {
        this.setState({ error: error });
      } finally {
        this.setState({
          loading: false,
        });
      }
    }
  }
  handleLoadMore = e => {
    this.setState({
      page: this.state.page + 1,
    });
  };
  handleFormSubmit = imageName => {
    this.setState({ image: imageName, page: 1, loading: true });
  };

  render() {
    const { error, loading, imageArr, showBtn } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />

        {error &&
          (() =>
            toast.error(
              "Sorry, didn't work. Try other name or repeat your request later!"
            ))}
        {loading && <Loader />}
        {imageArr && <ImageGallery imageArray={this.state.imageArr} />}
        {showBtn && <Button onLoadMore={this.handleLoadMore} />}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
