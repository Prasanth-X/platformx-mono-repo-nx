import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { ReportGraph } from '@platformx/utilities';

export const CourseReportDialog = ({
  isDialogOpen,
  handleClose,
  courseTitle,
}: any) => {
  return (
    <Dialog onClose={handleClose} open={isDialogOpen} maxWidth="em">
      <DialogTitle>
        <Typography variant="h4regular">{courseTitle}</Typography>
      </DialogTitle>
      <Grid container>
        <Grid item xs={12} md={12} lg={12}>
          <Box
            sx={{
              borderRadius: '5px',
              border: '1px solid #EFF0F6',
              minHeight: '300px',
              minWidth: '1000px',
              padding: '20px 0 0  20px',
            }}
          >
            <Typography variant="h5bold">Participants</Typography>
            <IconButton
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
              }}
            >
              <CloseIcon />
            </IconButton>
            <Box
              sx={{ display: 'flex', justifyContent: 'center', gap: '15px' }}
            >
              <Box
                sx={{
                  width: '25px',
                  height: '25px',
                  borderRadius: '2px',
                  backgroundColor: '#0049B2',
                }}
              ></Box>
              <Typography variant="h5bold">100 Passed </Typography>
              <Box
                sx={{
                  width: '25px',
                  height: '25px',
                  borderRadius: '2px',
                  backgroundColor: '#2874F0',
                }}
              ></Box>
              <Typography variant="h5bold">20 Not passed</Typography>
              <Box
                sx={{
                  width: '25px',
                  height: '25px',
                  borderRadius: '2px',
                  backgroundColor: '#3C91FF',
                }}
              ></Box>
              <Typography variant="h5bold">4 Undefined</Typography>
            </Box>
            <ReportGraph />
          </Box>
        </Grid>
        <Box
          sx={{
            width: '60%',
            margin: '10px auto',
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#F7F7FC' }}>
                <TableCell>Participants</TableCell>
                <TableCell>Visited</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key="1" sx={{ backgroundColor: 'white' }}>
                <TableCell>Smith</TableCell>
                <TableCell>4</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Grid>
    </Dialog>
  );
};
