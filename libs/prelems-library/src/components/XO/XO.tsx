import { Box } from "@mui/material";
import React from "react";

const XO = () => {
  return (
    <Box>
      <iframe
        src={"https://exo-vm.dev.hcl-x.com/portal/dw/spaces"}
        width='100%'
        height='500px'
        id=''
        className=''
        style={{ display: "block", position: "relative" }}
        sandbox='allow-same-origin allow-scripts allow-popups allow-forms'
        frameBorder={0}
      />
    </Box>
  );
};
export default XO;
