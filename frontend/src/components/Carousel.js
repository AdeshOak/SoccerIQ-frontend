// components/Carousel.js
import React from 'react';
import { Box, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useRef } from 'react';

const Carousel = ({ children }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
  
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const scrollAmount = clientWidth * 0.8;
    const maxScroll = scrollWidth - clientWidth;
  
    let newPosition;
    if (direction === 'left') {
      newPosition = scrollLeft - scrollAmount;
      if (newPosition < 0) newPosition = maxScroll; // Loop to end
    } else {
      newPosition = scrollLeft + scrollAmount;
      if (newPosition > maxScroll) newPosition = 0; // Loop to start
    }
  
    scrollRef.current.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', overflow: 'hidden' , borderRadius: 2}}>
      {/* Scroll buttons */}
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
        {children}
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
