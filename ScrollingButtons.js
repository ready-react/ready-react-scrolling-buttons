import React, { useRef } from 'react';

export default () => {

    const refScroll = useRef();
    let positionScroll = 0;
    let startScrolling = null;

    const handleStopScrolling = (e) => {
        e.preventDefault();
        startScrolling = false;
    }

    const handleScroll = (e, next = true) => {
        e.preventDefault();

        const boxWidth = refScroll.current.scrollWidth - 200;
        startScrolling = true;


        const prepareValScroll = (val, add=0) => {
            if (val <= 0) {
                return add ? add : 0;
            }
            return val;
        }

        const eventScrolling = () => {     
            
            console.log(positionScroll);
           console.log(boxWidth);

            if (next) {
                positionScroll += 50;
                refScroll.current.scroll(prepareValScroll(positionScroll, 50), 0);
            } else {
                positionScroll -= 50;                
                refScroll.current.scroll(prepareValScroll(positionScroll), 0);
            }
        }

        const timeScrolling = () => {
            if (next && positionScroll >= boxWidth) {
                return false;
            }
            if (startScrolling && positionScroll > 0) {
                eventScrolling();
                setTimeout(() => {
                    timeScrolling();
                }, 100);
            }
        }
        
        if ((next && positionScroll >= boxWidth)
            || (!next && positionScroll <= 0)) {
            return false;
        }
        eventScrolling();
        timeScrolling();
    }

    return (
        <div>
            <button
                onMouseDown={(e) => handleScroll(e, false)}
                onMouseUp={(e) => handleStopScrolling(e)}
                >back</button>
            <button
                onMouseDown={(e) => handleScroll(e)}
                onMouseUp={(e) => handleStopScrolling(e)}
            >forward</button>

            <div style={{
                height: '100px',
                width: '120px',
                backgroundColor: '#efefef',
                padding: '10px 25px',
                overflow: 'auto',
                whiteSpace: 'noWrap',
                scrollBehavior: 'smooth'
            }}
                ref={refScroll}
            >
                text lorem text lorem text lorem text lorem text lorem text lorem text lorem text lorem<br/>
                text lorem text lorem text lorem text lorem text lorem text lorem text lorem text lorem<br/>
                text lorem text lorem text lorem text lorem text lorem text lorem text lorem text lorem
            </div>
        </div>
    );
}