/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { useRef } from 'react';
import './Draggable.css';
import { forwardRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const Draggable = forwardRef(({ children, draggable }, ref) => {
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    // const clickOutItem = useRef(null);
    const [centeredElement, setCenteredElement] = useState(null); // Track the centered element

    useEffect(() => {
        ref.current.addEventListener('touchmove', onMouseMove, { passive: false });
        return () => {
            window.removeEventListener('touchmove', onMouseMove);
        };
    }, []);

    const onMouseDown = (e) => {
        if (e.pageX) {
            e.preventDefault();
        } else if (!centeredElement) {
            snapToClosestElement();
        }
        isDragging.current = true;
        startX.current = (e.pageX || e.touches[0].pageX) - ref.current.offsetLeft;
        scrollLeft.current = ref.current.scrollLeft;
        ref.current.classList.add('dragging');
    };

    const onMouseUp = () => {
        isDragging.current = false;
        ref.current.classList.remove('dragging');
        snapToClosestElement();
    };

    const onMouseMove = (e) => {
        if (!isDragging.current) return;
        e.preventDefault();
        const x = (e.pageX || e.touches[0].pageX) - ref.current.offsetLeft;
        let walk = (x - startX.current);

        ref.current.scrollLeft = scrollLeft.current - walk;
    };

    const snapToClosestElement = () => {
        const container = ref.current;
        const childrenArray = Array.from(container.children);
        const containerCenter = container.scrollLeft + container.offsetWidth / 2;

        let closestChild = null;
        let closestOffset = Infinity;

        childrenArray.forEach((child) => {
            const childCenter = child.offsetLeft + child.offsetWidth / 2;
            const offset = Math.abs(containerCenter - childCenter);
            if (offset < closestOffset && child !== centeredElement) {
                closestOffset = offset;
                closestChild = child;
            }
        });

        if (closestChild) {
            const childCenter = closestChild.offsetLeft + closestChild.offsetWidth / 2;
            const targetScrollLeft = container.scrollLeft + (childCenter - containerCenter);

            smoothScroll(container.scrollLeft, targetScrollLeft, 400);
            setCenteredElement(closestChild);
        }
    };

    const smoothScroll = (start, end, duration) => {
        const startTime = performance.now();

        const scrollAnimation = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1); // Ensure the progress is capped at 1
            const ease = easeOutCubic(progress);

            ref.current.scrollLeft = start + (end - start) * ease;

            if (progress < 1) {
                requestAnimationFrame(scrollAnimation);
            }
        };

        requestAnimationFrame(scrollAnimation);
    };

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    // const manageClickIn = () => {
    //     console.log("click in");
    //     clickOutItem.current.classList.add("open");
    //     ref.current.classList.add("open");
    //     // onClickIn();
    // }

    // const manageClickOut = () => {
    //     console.log("click out");
    //     clickOutItem.current.classList.remove("open");
    //     ref.current.classList.remove("open");
    //     onClickOut();
    // }

    return (
        draggable ?
            <div
                ref={ref}
                className="draggable-container"
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}
                onTouchStart={onMouseDown}
                onTouchEnd={onMouseUp}
            // onClick={manageClickIn}
            >
                {/* <div className="click-out-item" ref={clickOutItem} onClick={manageClickOut}></div> */}
                {children}
            </div> :
            <div
                ref={ref}
                className="draggable-container closed"
            >
                {children}
            </div>
    );
});

export default Draggable;