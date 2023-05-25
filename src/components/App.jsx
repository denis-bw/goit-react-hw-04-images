import { useState, useEffect } from "react";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader'
import Searchbar from './Searchbar/Searchbar';
import { Modal } from "./Modal/Modal";
import { ImageGallery } from './ImageGallery/ImageGallery';
import { api } from './api/api';


export function App () {

  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState(false);
  const [total, setTotal] = useState(false);
  
  useEffect(() => {
    if (query === '') {
      return;
    }

    setLoading(true)
    api(query, page).then(data => {  
        if (data.hits.length === 0) {
        setTotal(0)
        return toast.error("Nothing found", {
          position: toast.POSITION.TOP_CENTER
        })
      }
        
      if (page > 1) {
        setImages(prevState => {
          return [...prevState, ...data.hits]
        })
        setTotal(data.total)
        return;
      }

      setImages([...data.hits])
      setTotal(data.total)

    }).finally(() => {setLoading(false)});

  },[query,page])

  
  const findImage = (value) => {
    if (value.trim() === "") {
      return toast.error("Enter a valid value", {
        position: toast.POSITION.TOP_CENTER
    })}

    setPage(1);
    setQuery(value.trim().toLowerCase())
  }


  const incremenPage = () => {
    setPage(prevState => prevState +1)
  }

  const openModal = (largeImage) => {
        setShowModal(prevStateModal => !prevStateModal)
        setLargeImage(largeImage)
  }

  const totalPage = total / images.length;
  
    return <div>
            <Searchbar onSubmit={findImage} />       
            <ImageGallery 
              imagesList={images}
              showModal={openModal}
            />
            {loading && <Loader/>}        
            {totalPage > 1 && !loading && images.length !== 0 && <Button onClick={incremenPage} />}
            {showModal && <Modal onClose={openModal} largeImage={largeImage} />}
            <ToastContainer autoClose={3000} />
          </div> 
};


