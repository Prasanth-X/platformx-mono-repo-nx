import {
  Box,
  Grid,
  Typography
} from "@mui/material";

export const MobileListingGrid = (grid) => {

  return (
    <Grid container spacing={2} sx={{ margin: '10px 0' }}>
      {[0, 1, 2, 3, 4, 5, 6].map((item) =>
        (<Grid item xs={5.5} sx={{ margin: '5px' }}>
          <Box
            sx={{
              position: 'relative',
              '&:hover': {
                '#text': {
                  display: 'block',
                },
              },
            }}
          >
            <img
              src='https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?cs=srgb&dl=pexels-sagui-andrea-618833.jpg&fm=jpg'
              style={{ width: '100%', height: '150px', borderRadius: '8px' }}
            />
            <Box
              id='text'
              sx={{
                borderRadius: '8px',
                padding: '6px',
                position: 'absolute',
                top: 0,
                backgroundColor: 'black',
                display: 'none',
              }}
            >
              <img
                src="https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?cs=srgb&dl=pexels-sagui-andrea-618833.jpg&fm=jpg"
                style={{ width: "100%", height: "150px", borderRadius: "8px" }}
              />
              <Box
                id="text"
                sx={
                  {
                    borderRadius: "8px",
                    padding: '6px',
                    position: 'absolute',
                    top: 0,
                    backgroundColor: 'black',
                    display: "none",
                  }
                }
              >
                <Typography sx={{ fontSize: '16px', color: '#fff', paddingBottom: '7px' }}>The Leaf</Typography>
                <Typography sx={{ fontSize: '10px', color: '#fff', paddingBottom: '7px' }}>Description is the pattern of narrative development that aims to make vivid a place, object, character, group…</Typography>
                <Typography sx={{ fontSize: '10px', color: '#fff', paddingBottom: '5px' }}>By John Dio</Typography>
                <Typography sx={{ fontSize: '10px', color: '#fff', paddingBottom: '5px' }}>May 21, 2022 | 14:12</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>)
      )}
    </Grid>
  );
};
// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Collapse from '@mui/material/Collapse';
// import IconButton from '@mui/material/IconButton';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { TransitionGroup } from 'react-transition-group';

// const FRUITS = [
//   '🍏 Apple',
//   '🍌 Banana',
//   '🍍 Pineapple',
//   '🥥 Coconut',
//   '🍉 Watermelon',
// ];

// interface RenderItemOptions {
//   item: string;
//   handleRemoveFruit: (item: string) => void;
// }

// function renderItem({ item, handleRemoveFruit }: RenderItemOptions) {
//   return (
//     <ListItem
//       secondaryAction={
//         <IconButton
//           edge="end"
//           aria-label="delete"
//           title="Delete"
//           onClick={() => handleRemoveFruit(item)}
//         >
//           <DeleteIcon />
//         </IconButton>
//       }
//     >
//       <ListItemText primary={item} />
//       <ListItemText primary={item} />
//       <ListItemText primary={item} />
//     </ListItem>
//   );
// }

// export default function MobileListingGrid() {
//   const [fruitsInBasket, setFruitsInBasket] = React.useState(FRUITS.slice(0, 3));

//   const handleAddFruit = () => {
//     const nextHiddenItem = FRUITS.find((i) => !fruitsInBasket.includes(i));
//     if (nextHiddenItem) {
//       setFruitsInBasket((prev) => [nextHiddenItem, ...prev]);
//     }
//   };

//   const handleRemoveFruit = (item: string) => {
//     setFruitsInBasket((prev) => [...prev.filter((i) => i !== item)]);
//   };

//   const addFruitButton = (
//     <Button
//       variant="contained"
//       disabled={fruitsInBasket.length >= FRUITS.length}
//       onClick={handleAddFruit}
//     >
//       Add fruit to basket
//     </Button>
//   );

//   return (
//     <div>
//       {addFruitButton}
//       <Box sx={{ mt: 1 }}>
//         <List>
//           <TransitionGroup>
//             {fruitsInBasket.map((item) => (
//               <Collapse key={item}>
//                 {renderItem({ item, handleRemoveFruit })}
//               </Collapse>
//             ))}
//           </TransitionGroup>
//         </List>
//       </Box>
//     </div>
//   );
// }
