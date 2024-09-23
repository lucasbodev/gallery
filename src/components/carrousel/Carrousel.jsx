/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import './Carrousel.css';
import { useRef } from 'react';
import CarrouselCard from '../carrousel-card/CarrouselCard';
import Draggable from '../draggable/Draggable';

const Carrousel = ({ galleryOpen, onOpenGallery, onCloseGallery, title, subtitle, images }) => {

  const items = useRef([]);
  const clickOutItem = useRef(null);
  const [open, setOpen] = useState(false);
  const draggableContainer = useRef(null);
  const [draggable, setDraggable] = useState(true);

  useEffect(() => {
    setCarrousel();
  }, [open, galleryOpen]);

  const setCarrousel = () => {
    if (!galleryOpen && open) {
      onClose();
    } else if (open) {
      expandList();
    } else {
      setDraggable(false);
    }
  }

  const onOpen = () => {
    if (!open) {
      setOpen(true);
      onOpenGallery();
      scrollToCarrousel();
      setDraggable(true);
    }
  }

  const onClose = () => {
    if (open) {
      setOpen(false);
      shrinkList();
      setDraggable(false);
    }
  }

  const expandList = () => {
    draggableContainer.current.classList.add("open");
    clickOutItem.current.classList.add("open");
    showItems();
  }

  const shrinkList = () => {
    draggableContainer.current.classList.remove("open");
    clickOutItem.current.classList.remove("open");
    hideItems();
    rollback();
  }

  const showItems = () => {
    items.current.forEach(item => {
      item.style.opacity = "1";
    });
  }

  const hideItems = () => {
    items.current.forEach(item => {
      if (item !== items.current[0]) {
        item.style.opacity = "0";
      }
    });
  }

  const rollback = () => {
    draggableContainer.current.scrollTo({
      left: 0,
      behavior: "smooth"
    });
  }

  const scrollToCarrousel = () => {
    const yOffset = -50;
    const y = draggableContainer.current.getBoundingClientRect().top + window.scrollY + yOffset;

    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  const setItemRef = (el, index) => {
    items.current[index] = el;
  };

  return (
    <div className='carrousel-container'>
      <Draggable ref={draggableContainer} draggable={draggable}>
        {images.map((image, index) => (
          index === 0 ?
            <CarrouselCard ref={(el) => setItemRef(el, index)} key={index} carrouselOpen={open} img={image} onOpen={onOpen} title={title} subtitle={subtitle} /> :
            <CarrouselCard ref={(el) => setItemRef(el, index)} key={index} carrouselOpen={open} img={image} />
        ))}
        <div className="click-out-item" ref={clickOutItem} onClick={onCloseGallery}></div>
      </Draggable>
    </div>
  );
};

export default Carrousel;