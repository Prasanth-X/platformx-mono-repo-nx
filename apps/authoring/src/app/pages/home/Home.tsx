import React from 'react';
import './Home.css';
import { Template } from './Template';
import Box from '@mui/material/Box';
import { Testimonials } from './Testimonials';
import { Controls } from './Controls';
import { Journey } from './Journey';
import { Banner } from './Banner';

export const Home = () => {
  return (
    <>
      <Box>
        <Banner />
        <Template />
        <Controls />
        <Testimonials />
        <Journey />
      </Box>
    </>
  );
};
