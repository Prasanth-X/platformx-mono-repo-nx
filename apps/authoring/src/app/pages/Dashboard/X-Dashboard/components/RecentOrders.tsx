import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Box } from '@mui/material';

interface Order {
  orderNo: string;
  date: string;
  customerName: string;
  price: number;
  status: 'Delivered' | 'Pending';
}

const RecentOrders: React.FC = () => {
  const orders: Order[] = [
    {
      orderNo: '#33425',
      date: 'June 30, 2023',
      customerName: 'Mike Dean',
      price: 299.91,
      status: 'Delivered',
    },
    {
      orderNo: '#33426',
      date: 'June 29, 2023',
      customerName: 'Chris Pratt',
      price: 899.91,
      status: 'Pending',
    },
    {
        orderNo: '#33427',
        date: 'June 28, 2023',
        customerName: 'Zoe Saldana',
        price: 199.91,
        status: 'Delivered',
      },
      {
        orderNo: '#33428',
        date: 'June 27, 2023',
        customerName: 'Sean Gunn',
        price: 399.91,
        status: 'Delivered',
      },
      {
        orderNo: '#33429',
        date: 'June 26, 2023',
        customerName: 'Dave Bautista',
        price: 699.95,
        status: 'Delivered',
      },
      {
        orderNo: '#33431',
        date: 'June 25, 2023',
        customerName: 'Bradley Cooper',
        price: 499.90,
        status: 'Pending',
      },
    // Add more orders here...
  ];

  return (
    <Table>
      <TableHead>
        <TableRow sx={{ backgroundColor: '#4B9EF9', color: '#ffffff !important' }}>
          <TableCell sx={{ color: '#ffffff' }}>Order No</TableCell>
          <TableCell sx={{ color: '#ffffff' }}>Date</TableCell>
          <TableCell sx={{ color: '#ffffff' }}>Customer Name</TableCell>
          <TableCell sx={{ color: '#ffffff' }}>Price</TableCell>
          <TableCell sx={{ color: '#ffffff' }}>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.orderNo} sx={{ backgroundColor: 'white' }}>
            <TableCell>{order.orderNo}</TableCell>
            <TableCell>{order.date}</TableCell>
            <TableCell>{order.customerName}</TableCell>
            <TableCell>${order.price}</TableCell>
            <TableCell>
              <Box
                sx={{
                  width: '93px',
                  height: '32px',
                  flexShrink: 0,
                  textAlign: 'center',
                  borderRadius: '5px',
                  padding: '5px',
                  backgroundColor: order.status === 'Delivered' ? '#DEF5D9' : '#FFF2D9',
                  color: order.status === 'Delivered' ? '#0FA069' : '#E2AB30',
                }}
              >
                {order.status}
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RecentOrders;