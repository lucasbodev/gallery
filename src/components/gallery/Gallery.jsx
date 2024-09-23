/* eslint-disable react/prop-types */
import './Gallery.css'
import Carrousel from '../carrousel/Carrousel';
import { useRef, useState } from 'react';

const Gallery = ({ carrousels }) => {

    const gallery = useRef(null);
    const clickOut = useRef(null);
    const [open, setOpen] = useState(false);
    // let scrollTimeout = null;

    const onOpen = () => {
        setOpen(true);
    }

    const onClose = () => {
        setOpen(false);
    }

    // const onWheel = () => {
    //       // Rétrécir légèrement la liste pendant le scroll
    //       gallery.current.style.transform = 'scale(0.9)';

    //       // Si l'utilisateur continue de scroller, on annule le retour à la taille normale
    //       if (scrollTimeout) {
    //         clearTimeout(scrollTimeout);
    //       }

    //       // Après un délai sans scroll, restaurer la taille normale progressivement
    //       scrollTimeout = setTimeout(() => {
    //         gallery.current.style.transition = 'transform 1.5s linear';
    //         gallery.current.style.transform = 'scale(1)';
    //       }, 250); 
    // }

    return (
        <div className='gallery' ref={gallery}>
            {carrousels.map((carrousel) => (
                <Carrousel
                    key={carrousel.id}
                    title={carrousel.title}
                    subtitle={carrousel.subtitle}
                    images={carrousel.images}
                    galleryOpen={open}
                    onOpenGallery={onOpen}
                    onCloseGallery={onClose}
                />
            ))}
            <div className="click-out-body" ref={clickOut} onClick={onClose}></div>
        </div>
    );
}

export default Gallery;