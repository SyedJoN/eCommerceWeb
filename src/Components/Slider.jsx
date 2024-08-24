import React, { useRef, useEffect } from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const fadeImages = [
  {
    url: 'https://source.unsplash.com/random/1000x1000?tshirts',
    caption: 'First Slide'
  },
  {
    url: 'https://source.unsplash.com/random/1000x1000?mens_clothing',
    caption: 'Second Slide'
  },
  {
    url: 'https://source.unsplash.com/random/1000x1000?women_clothing',
    caption: 'Third Slide'
  },
];

const Slider = () => {
  const fadeRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * fadeImages.length);
      fadeRef.current.goTo(randomIndex);
    }, 3000); // Change slide every 3 seconds (adjust as needed)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slide-container">
      <Fade autoplay={false} ref={fadeRef}>
        {fadeImages.map((fadeImage, index) => (
          <div key={index}>
            <img
              style={{ width: '100%', height: '700px', objectFit: 'cover' }}
              src={fadeImage.url}
            />
          </div>
        ))}
      </Fade>
    </div>
  );
};

export default Slider;
