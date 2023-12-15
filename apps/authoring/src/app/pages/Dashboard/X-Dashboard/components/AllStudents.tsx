import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Box } from '@mui/material';

interface Order {
  orderNo: string;
  date: string;
  customerName: string;
  price: number;
  number: string;
  course: string;
  status: 'Registered' | 'Pending' | 'Delivered';
}

const AllStudents: React.FC = () => {
  const orders: Order[] = [
    {
      number: '1',
      course: 'React',
      orderNo: '#33425',
      date: 'June 30, 2023',
      customerName: 'Mike Dean',
      price: 299.91,
      status: 'Registered',
    },
    {
      number: '1',
      course: 'React',
      orderNo: '#33426',
      date: 'June 29, 2023',
      customerName: 'Chris Pratt',
      price: 899.91,
      status: 'Pending',
    },
    {
        number: '1',
        course: 'React',
        orderNo: '#33427',
        date: 'June 28, 2023',
        customerName: 'Zoe Saldana',
        price: 199.91,
        status: 'Delivered',
      },
      {
        number: '1',
        course: 'React',
        orderNo: '#33428',
        date: 'June 27, 2023',
        customerName: 'Sean Gunn',
        price: 399.91,
        status: 'Delivered',
      },
      {
        number: '1',
        course: 'React',
        orderNo: '#33429',
        date: 'June 26, 2023',
        customerName: 'Dave Bautista',
        price: 699.95,
        status: 'Delivered',
      },
      {
        number: '1',
        course: 'React',
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
        <TableRow sx={{ backgroundColor: '#F7F7FC' }}>
          <TableCell>No</TableCell>
          <TableCell>ID Users</TableCell>
          <TableCell>Users Name</TableCell>
          <TableCell>Course</TableCell>
          <TableCell>Order Date</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Rewards</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.orderNo} sx={{ backgroundColor: 'white' }}>
            <TableCell>{order.number}</TableCell>
            <TableCell>{order.orderNo}</TableCell>
            <TableCell>{order.customerName}</TableCell>
            <TableCell>{order.course}</TableCell>
            <TableCell>{order.date}</TableCell>
            <TableCell>{order.status}</TableCell>
            <TableCell>${order.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AllStudents;