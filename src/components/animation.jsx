/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const AnimatedComponent = ({ children, animation }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    let animationInstance;

    if (element && animation) {
      animationInstance = animation(element, gsap);
    }

    return () => {
      if (animationInstance && animationInstance.kill) {
        animationInstance.kill();
      }
    };
  }, [animation]);

  return <div ref={elementRef}>{children}</div>;
};

export default AnimatedComponent;