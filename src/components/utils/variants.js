export const fadeIn = (direction, delay) => {
    return {
        hidden: {
            y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
            x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
            opacity: 0,
        },
        show: {
            y: 0,
            x: 0,
            opacity: 1,
            transition: {
                type: 'tween',
                duration: 1.5,  // Longer duration for extra smoothness
                delay: delay,
                ease: [0.42, 0, 0.58, 1]  // Smoother easing for natural motion
            }
        }
    };
};
