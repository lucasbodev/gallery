/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { useRef } from 'react';
import './CarrouselQuote.css'
import { forwardRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';


const CarrouselQuote = forwardRef(({ carrouselOpen, quote }, ref) => {

    const [open, setOpen] = useState(false);
    const subnail = useRef(null);
    const content = useRef(null);

    useEffect(() => {
        if (carrouselOpen) {
            openQuote();
        } else {
            closeQuote();
        }
    }, [open, carrouselOpen]);

    const openQuote = () => {
        if (!open) {
            content.current.classList.add("open");
            setOpen(true);
        } else {
            subnail.current.style.opacity = 1;
        }
    }

    const closeQuote = () => {
        if (open) {
            subnail.current.style.opacity = 0;
            content.current.classList.remove("open");
            setOpen(false);
        }
    }

    return (
        <div className="carrousel-quote" ref={ref}>
            <div ref={content} className="carrousel-quote-content">
                <div className="carrousel-quote-text">{quote}</div>
                <div className="carrousel-quote-author">
                    <span className="carrousel-quote-author-name"><strong>John Doe</strong> - The Big Foundator</span>
                </div>
            </div>
            {
                open &&
                <div className="carrousel-quote-subnail" ref={subnail}>
                    <span className='carrousel-quote-title'></span>
                    <span className='carrousel-quote-subtitle'></span>
                </div>
            }
        </div>
    );
});

export default CarrouselQuote;