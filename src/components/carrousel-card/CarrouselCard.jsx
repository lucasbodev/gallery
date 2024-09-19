/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { useRef } from 'react';
import './CarrouselCard.css'
import { forwardRef } from 'react';
import { useEffect, useState } from 'react';

const CarrouselCard = forwardRef(({ carrouselOpen, onOpen, img, title, subtitle }, ref) => {

    const image = useRef(null);
    const subnail = useRef(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (carrouselOpen) {
            openCard();
        } else {
            closeCard();
        }
    }, [open, carrouselOpen]);

    const openCard = () => {
        if (!open) {
            image.current.classList.add("open");
            setOpen(true);
        } else {
            subnail.current.style.opacity = 1;
        }
    }

    const closeCard = () => {
        if (open) {
            image.current.classList.remove("open");
            subnail.current.style.opacity = 0;
            setOpen(false);
        } 
    }

    return (
        <div className="carrousel-card" ref={ref} onClick={onOpen}>
            <img className='carrousel-card-image' ref={image} src={img.rendered} />
            {
                open &&
                <div className="carrousel-card-subnail" ref={subnail}>
                    <span className='carrousel-card-title'>{title && title.rendered}</span>
                    <span className='carrousel-card-subtitle'>{subtitle}</span>
                </div>
            }
        </div>
    );
});

export default CarrouselCard;