import { Box } from '@mui/material';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import HorizontalCard from '../Components/HorizontalCard/HorizontalCard';
import { HorizontalCardProps } from './HorizontalCard.types';
import { boostContentWithIconMapper } from './helper';

const HorizontalCardList = ({ boostContent }: HorizontalCardProps) => {
  const boostContentWithIcons = boostContentWithIconMapper(boostContent);
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '20px',
        overflowX: 'auto',
        paddingBottom: '6px',
      }}
    >
      {boostContentWithIcons.map(
        (item, index) =>
          item.url !== '' && (
            <HorizontalCard
              key={`${item.title} ${index.toString()}`}
              Title={item.title}
              Description={item.description}
              url={item.url}
              icon={item.icon}
            />
          )
      )}
    </Box>
  );
};

export default HorizontalCardList;
