import React, { useState, useEffect } from 'react';
import './ZoomedImage.css';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const ZoomedImage = ({ imageUrl, index }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const magnifierSize = 50; // Adjust the size of the magnifier

    const xOffset = x - magnifierSize / 2;
    const yOffset = y - magnifierSize / 2;

    setPosition({
      x: Math.min(Math.max(xOffset, 0), width - magnifierSize),
      y: Math.min(Math.max(yOffset, 0), height - magnifierSize),
    });
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth < 900);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // Call it initially
    return () => window.removeEventListener('resize', handleResize);
  }, [showMagnifier]);

  const handleMouseLeave = () => {
    setShowMagnifier(false);
  };

  const handleMouseEnter = () => {
    setShowMagnifier(true);
  };

  return (
    <div
      className="zoomed-image-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {showMagnifier && !isMobile && (
        <div
          className="zoomed-image "
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            backgroundImage: `url(${imageUrl})`,
            backgroundPosition: `-${position.x}px -${position.y}px`,
          }}
        ></div>
      )}
      {isMobile && (
        <Zoom>
          <img
            alt={`subImage - ${index}`}
            src={imageUrl}
            
          />
        </Zoom>
      )}

      {!isMobile && (<img src={imageUrl} alt={`subImage - ${index}`} className={`original-image ${showMagnifier ? 'cursor-none' : 'cursor-pointer'}`} />)}
    </div>

  );
};

export default ZoomedImage;
