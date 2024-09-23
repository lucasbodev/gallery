/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import './Scrollable.css';
import { forwardRef } from 'react';

const Scrollable = forwardRef(({ children }, ref) => {

    useEffect(() => {
        ref.current.addEventListener('wheel', onWheel, { passive: false });
        return () => {
            ref.current.removeEventListener('wheel', onWheel);
        };
    }, []);

    const onWheel = (event) => {
        if (open) {
            if (!isTouchPad(event)) {
                if (cantScrollLeft(event) || cantScrollRight(event)) {
                    return; // Laisse le scroll vertical se faire (ne pas appeler preventDefault)
                } else {
                    // Scroll horizontal si on n'est pas aux extrémités
                    event.preventDefault();
                    ref.current.scrollLeft += event.deltaY * 3;
                }
            }
        }
    };


    const isTouchPad = (event) => {
        //TOFO: Vérifier si c'est un touchpad avec les évènements onTouchStart et onTouchEnd
        let isTouchPad = true;
        if (event.deltaY === 100 || event.deltaY === -100) {
            isTouchPad = false;
        }
        return isTouchPad;
    }

    const cantScrollLeft = (event) => {
        return ref.current.scrollLeft === 0 && event.deltaY < 0;
    }

    const cantScrollRight = (event) => {
        const maxScrollLeft = ref.current.scrollWidth - ref.current.clientWidth;
        const tolerance = 5; // Marge de tolérance pour les comparaisons
        return ref.current.scrollLeft >= maxScrollLeft - tolerance && event.deltaY > 0;
    }

    return (
        <div className="scroll-container" ref={ref}>
            {children}
        </div>

    );
});

export default Scrollable;