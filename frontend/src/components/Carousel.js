// components/Carousel.js
import React, { useRef, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const Carousel = ({ children }) => {
  const scrollRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);

  // Clone children to create seamless infinite illusion
  const clonedChildren = React.Children.toArray(children);
  const duplicatedChildren = [...clonedChildren, ...clonedChildren];

  const scroll = (direction) => {
    if (!scrollRef.current || isScrolling) return;
    setIsScrolling(true);

    const { scrollLeft, offsetWidth, scrollWidth } = scrollRef.current;
    const scrollAmount = offsetWidth * 0.8;
    const maxNaturalScroll = scrollWidth / 2; // Original content width

    let newPosition = scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);

    // Handle seamless reset
    if (newPosition >= maxNaturalScroll * 1.5) {
      newPosition = newPosition - maxNaturalScroll;
      scrollRef.current.scrollLeft = newPosition;
    } else if (newPosition <= -maxNaturalScroll) {
      newPosition = newPosition + maxNaturalScroll;
      scrollRef.current.scrollLeft = newPosition;
    }

    scrollRef.current.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });

    // Reset scrolling state after animation
    setTimeout(() => setIsScrolling(false), 500);
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', overflow: 'hidden', borderRadius: 2 }}>
      <IconButton
        onClick={() => scroll('left')}
        sx={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1,
          color: 'white',
          backgroundColor: 'rgba(0,0,0,0.4)',
          '&:hover': { backgroundColor: 'rgba(0,0,0,0.6)' },
        }}
      >
        <ChevronLeft />
      </IconButton>

      <Box
        ref={scrollRef}
        sx={{
          display: 'flex',
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          gap: 2,
          px: 5,
          py: 2,
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {duplicatedChildren}
      </Box>

      <IconButton
        onClick={() => scroll('right')}
        sx={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1,
          color: 'white',
          backgroundColor: 'rgba(0,0,0,0.4)',
          '&:hover': { backgroundColor: 'rgba(0,0,0,0.6)' },
        }}
      >
        <ChevronRight />
      </IconButton>
    </Box>
  );
};

export default Carousel;