import { useState, useEffect } from 'react';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import ImageGalleryItem from './components/ImageGalleryItem';
import Button from './components/Button';
import Modal from './components/Modal';
import Loader from './components/Loader';
import fetchPicturesApi from './services/apiService';

export default function App() {
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPicture, setCurrentPicture] = useState(null);
  const [firstMount, setFirstMount] = useState(true);

  useEffect(() => {
    if (firstMount) {
      setFirstMount(false);
      return;
    }
    fetchPicturesApi(name, page)
      .then(pictures => {
        if (pictures.total === 0) {
          setError(`We don't have picture: ${name}`);
          setStatus('rejected');
        } else {
          setPictures(prevState => [...prevState, ...pictures.hits]);
          setStatus('resolved');
        }
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [name, page]);

  const formSubmit = name => {
    setName(name);
    setPictures([]);
    setPage(1);
    setStatus('pending');
  };

  const openModal = (id, largeImageURL, tags) => {
    setShowModal(true);
    setCurrentPicture({ id, largeImageURL, tags });
  };

  return (
    <div className="App">
      <Searchbar onSubmit={formSubmit} />
      {status === 'pending' && <Loader />}
      {status === 'resolved' && (
        <>
          <ImageGallery>
            {pictures.map(({ id, tags, webformatURL, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                id={id}
                tags={tags}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                openModal={openModal}
              />
            ))}
          </ImageGallery>
          <Button loadMore={setPage} />
        </>
      )}
      {showModal && (
        <Modal picture={currentPicture} closeModal={setShowModal} />
      )}
      {status === 'rejected' && <h1>{error}</h1>}
    </div>
  );
}
