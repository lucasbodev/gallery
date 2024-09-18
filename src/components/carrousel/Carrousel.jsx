/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import './Carrousel.css';
import { useRef } from 'react';
import CarrouselCard from '../carrousel-card/CarrouselCard';
import CarrouselQuote from '../carrousel-quote/CarrouselQuote';
import CarrouselText from '../carrousel-text/CarrouselText';

const Carrousel = ({ galleryOpen, onOpenGallery, onCloseGallery }) => {

  const scrollContainer = useRef(null);
  const scrollItems = useRef([]);
  const clickOutItem = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setCarrousel();
    return () => {
      scrollContainer.current.removeEventListener('wheel', onWheel);
    }
  }, [open, galleryOpen]);

  const setCarrousel = () => {
    if (!galleryOpen && open) {
      onClose();
    } else if (open) {
      expandList();
      scrollContainer.current.addEventListener('wheel', onWheel, { passive: false });
    } 
  }

  const onOpen = () => {
    if (!open) {
      setOpen(true);
      onOpenGallery();
      scrollToCarrousel();
    }
  }

  const onClose = () => {
    if (open) {
      setOpen(false);
      shrinkList();
    }
  }

  const onWheel = (event) => {
    if (open) {
      if (!isTouchPad(event)) {
        if (cantScrollLeft(event) || cantScrollRight(event)) {
          return; // Laisse le scroll vertical se faire (ne pas appeler preventDefault)
        } else {
          // Scroll horizontal si on n'est pas aux extrémités
          event.preventDefault();
          scrollContainer.current.scrollLeft += event.deltaY * 3;
        }
      }
    }
  };

  const expandList = () => {
    scrollContainer.current.classList.add("open");
    clickOutItem.current.classList.add("open");
    showItems();
  }

  const shrinkList = () => {
    scrollContainer.current.classList.remove("open");
    clickOutItem.current.classList.remove("open");
    hideItems();
    rollback();
  }

  const showItems = () => {
    scrollItems.current.forEach(item => {
      item.style.opacity = "1";
    });
  }

  const hideItems = () => {
    scrollItems.current.forEach(item => {
      if (item !== scrollItems.current[0]) {
        item.style.opacity = "0";
      }
    });
  }

  const rollback = () => {
    scrollContainer.current.scrollTo({
      left: 0,
      behavior: "smooth"
    });
  }

  const scrollToCarrousel = () => {
    const yOffset = -50;
    const y = scrollContainer.current.getBoundingClientRect().top + window.scrollY + yOffset;

    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  const isTouchPad = (event) => {
    let isTouchPad = true;
    if (event.deltaY === 100 || event.deltaY === -100) {
      isTouchPad = false;
    }
    return isTouchPad;
  }

  const cantScrollLeft = (event) => {
    return scrollContainer.current.scrollLeft === 0 && event.deltaY < 0;
  }

  const cantScrollRight = (event) => {
    const maxScrollLeft = scrollContainer.current.scrollWidth - scrollContainer.current.clientWidth;
    const tolerance = 5; // Marge de tolérance pour les comparaisons
    return scrollContainer.current.scrollLeft >= maxScrollLeft - tolerance && event.deltaY > 0;
  }

  const setItemRef = (el, index) => {
    scrollItems.current[index] = el;
  };

  return (
    <div className='carrousel-container'>
      <div className="click-out-item" ref={clickOutItem} onClick={onCloseGallery} onWheel={() => {}}></div>
      <div className="scroll-container" ref={scrollContainer}>
        <div className="item-list" onClick={onClose}>
          <CarrouselCard ref={(el) => setItemRef(el, 0)} carrouselOpen={open} img={"image1.png"} onOpen={onOpen}/>
          <CarrouselText ref={(el) => setItemRef(el, 1)} carrouselOpen={open} text={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer rhoncus arcu eu facilisis egestas. Nulla at quam a massa viverra mollis faucibus ut nisl. Pellentesque hendrerit aliquet varius. Pellentesque et augue eros. Nam a urna iaculis, condimentum arcu sit amet, pharetra mi. Praesent maximus pellentesque magna, et vestibulum ante bibendum ac. Aliquam aliquam elit tellus. Pellentesque luctus ultricies ligula, ac dictum diam vehicula ut. Nunc vel diam tempor massa mattis euismod at ac arcu."
          } />
          <CarrouselCard ref={(el) => setItemRef(el, 2)} carrouselOpen={open} img={"image2.png"}/>
          <CarrouselCard ref={(el) => setItemRef(el, 3)} carrouselOpen={open} img={"image3.png"}/>
          <CarrouselQuote ref={(el) => setItemRef(el, 4)} carrouselOpen={open} quote={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer rhoncus arcu eu facilisis egestas. Nulla at quam a massa viverra mollis faucibus ut nisl. "
          } />
          <CarrouselCard ref={(el) => setItemRef(el, 5)} carrouselOpen={open} img={"image4.png"}/>
          <CarrouselCard ref={(el) => setItemRef(el, 6)} carrouselOpen={open} img={"image5.png"}/>
        </div>
      </div>
    </div>
  );
}

export default Carrousel;