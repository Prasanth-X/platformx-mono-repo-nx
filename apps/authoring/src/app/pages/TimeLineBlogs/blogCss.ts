
export const timeLineBlogsConstDesign = () => {
  return `
body{
  background-color: #f5f6f8;
  height:100%;
}
.Platform-x-Tab-root{
  text-transform: capitalize !important;
  max-width: 360px;
  min-width: 33.3%;
  color: #89909A !important;
  font-size:14px;

}

.Platform-x-Tabs-indicator {
  background-color: transparent !important;
  height: 1;
}
.Platform-x-ButtonBase-root.Mui-selected {
color: #2d2d39;
background: #2D2D39;
border-radius: 27px;
padding: 8px 20px;
margin: 5px 0;
color: #fff !important;
text-tranform:capitalize !important;
min-height: 30px;
}
// @media screen and (min-height: 600px) and (orientation: landscape) {
//   * {
//   zoom: 0.983 !important;
//   }
//   .platx-blog .contentArea {
//     display: flex;
//     flex-direction: column;
//     flex-wrap: nowrap;
//     align-items: stretch;
//     height: calc(100vh - 45px);
// }

// .eventArea{
//   height: calc(100vh - 93px);
// }
// .innerContentArea{
//   height: calc(100vh - 140px);
// }
}
// @media screen and (min-height: 650px) and (orientation: landscape) {
//   * {
//   zoom: 0.993 !important;
//   }
//   .platx-blog .contentArea {
//     display: flex;
//     flex-direction: column;
//     flex-wrap: nowrap;
//     align-items: stretch;
//     height: calc(100vh - 50px);
// }
// }

//     @media screen and (min-height: 720px) and (orientation: landscape) {
//       * {
//       zoom: 0.999;
//       }
//     }
//     @media screen and (min-height: 780px) and (orientation: landscape) {
//       * {
//       zoom: unset !important;
//       }
//       .platx-blog .contentArea {
//         display: flex;
//         flex-direction: column;
//         flex-wrap: nowrap;
//         align-items: stretch;
//         height: calc(100vh - 98px);
//     }
//     .eventArea{
//       height: calc(100vh - 93px);
//     }
//     .innerContentArea{
//       height: calc(100vh - 140px);
//     }
//     }
//     @media screen and (min-width:1024px) and (max-width: 1279px)
//     {
//     .platx-blog .contentArea {
//       display: flex;
//       flex-direction: column;
//       flex-wrap: nowrap;
//       align-items: stretch;
//       height: calc(100vh - 120px);
//   }
//   .Platform-x-TabPanel-root {
//     height: calc(100vh - 100px) !important;
// }
}
`
};

export const blockQuotes = () => {
  return `.placeholdertext[placeholder]:empty::before {
    content: attr(placeholder);
    color: #ced3d9; 
    font-size: 14px;
  }
  .placeholdertext[placeholder]:empty:focus::before {
    content: "";
  }`
};