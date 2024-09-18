/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { useRef } from 'react';
import './CarrouselText.css'
import { forwardRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const CarrouselText = forwardRef(({ carrouselOpen, text }, ref) => {

    const [open, setOpen] = useState(false);
    const subnail = useRef(null);
    const content = useRef(null);

    useEffect(() => {
        if (carrouselOpen) {
            openText();
        } else {
            closeText();
        }
    }, [open, carrouselOpen]);

    const openText = () => {
        if (!open) {
            content.current.classList.add("open");
            setOpen(true);
        } else {
            subnail.current.style.opacity = 1;
        }
    }

    const closeText = () => {
        if (open) {
            content.current.classList.remove("open");
            subnail.current.style.opacity = 0;
            setOpen(false);
        }
    }

    return (
        <div className="carrousel-text" ref={ref}>
            <div ref={content} className="carrousel-text-content">
                {text}
            </div>
            {
                open &&
                <div className="carrousel-text-subnail" ref={subnail}>
                    <span className='carrousel-text-title'></span>
                    <span className='carrousel-text-subtitle'></span>
                </div>
            }
        </div>
    );
});

export default CarrouselText;