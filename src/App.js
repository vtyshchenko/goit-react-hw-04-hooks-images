import { useState } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

import Searchbar from './components/SearchBar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import ButtonClose from './components/Modal/ButtonClose';
import Modal from './components/Modal';
import fetchImages from './services/apiService';
import Spinner from './components/Loader';

import { ReactComponent as IconButtonClose } from './images/icon-close.svg';

function App() {
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [findText, setFindText] = useState('');
  const [images, setImages] = useState([]);
  const [currImg, setCurrImg] = useState(0);
  const [page, setPage] = useState(0);

  const toggleModal = () => {
    setShowModal(state => !state);
  };

  const handleGetImages = ({ searchText }) => {
    const setPageNumber = searchText ? 0 : page;
    const findingText = searchText ? searchText.toLowerCase().trim() : findText;

    setStatus('pending');
    setFindText(findingText);
    setPage(setPageNumber);

    fetchImages(findingText, page + 1, 12)
      .then(response => {
        setStatus('resolved');
        const setImageses = findingText && findText !== findingText ? 0 : 1;
        setPage(state => state + 1);

        if (setImageses === 1) {
          setImages([...images, ...response]);
          window.scrollBy({
            top: document.documentElement.clientHeight - 260,
            behavior: 'smooth',
          });
        } else {
          setImages([...response]);
          document.body.scrollTop = 0; // For Safari
          document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        }
      })
      .catch(() => {
        setStatus('rejected');
      });
  };

  const handleClick = event => {
    const img = images.filter(item => item.id === Number(event.target.attributes.id.nodeValue));
    setCurrImg(images.indexOf(img[0]));
    img.length > 0 && toggleModal();
  };

  const handleRight = () => {
    setCurrImg(state => (state === images.length - 1 ? 0 : state + 1));
  };

  const handleLeft = () => {
    setCurrImg(state => (state === 0 ? images.length - 1 : state - 1));
  };

  const isShow = status === 'resolved' || status === 'pending';
  return (
    <div className="App">
      <Searchbar onSubmit={handleGetImages} />

      {status === 'rejected' && <p>Error. No images were found for your query: {findText}...</p>}
      {isShow && (
        <>
          <ImageGallery imageList={images} onClick={handleClick} />
          {status === 'pending' ? <Spinner /> : <Button onClick={handleGetImages} />}
        </>
      )}
      {showModal && (
        <Modal onClose={toggleModal} onLeft={handleLeft} onRight={handleRight}>
          <ButtonClose onClick={toggleModal} aria-label="Close modal window">
            <IconButtonClose fill="black" />
          </ButtonClose>
          <img src={images[currImg].largeImageURL} alt={images[currImg].tags} />
        </Modal>
      )}
      <ToastContainer autoClose={3000} />
    </div>
  );
}

App.propTypes = {
  status: PropTypes.oneOf(['idle', 'pending', 'resolved', 'rejected']),
  showModal: PropTypes.bool,
  findText: PropTypes.string,
  images: PropTypes.array,
  currImg: PropTypes.number,
  page: PropTypes.number,
};

export default App;
