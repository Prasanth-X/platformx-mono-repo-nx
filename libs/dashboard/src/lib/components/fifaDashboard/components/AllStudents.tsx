import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useEffect } from 'react';
import { userCourseListMapper } from '../../../utils/mapper';
interface user {
  orderNo: string;
  date: string;
  userName: string;
  price: number;
  number: string;
  course: string;
  status: string;
}

const AllStudents = ({ users }: any) => {
  const [userList, setUserList] = React.useState<user[]>([]);

  useEffect(() => {
    users?.length !== 0 && setUserList(userCourseListMapper(users));
  }, [users]);

  return (
    <Table>
      <TableHead>
        <TableRow sx={{ backgroundColor: '#F7F7FC' }}>
          <TableCell>No</TableCell>
          <TableCell>ID Users</TableCell>
          <TableCell>Users Name</TableCell>
          <TableCell>Role</TableCell>
          <TableCell>Joining date</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>No. of course completed</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {userList?.length > 0 &&
          userList.map((order) => (
            <TableRow key={order.orderNo} sx={{ backgroundColor: 'white' }}>
              <TableCell>{order.number}</TableCell>
              <TableCell>{order.orderNo}</TableCell>
              <TableCell>{order.userName}</TableCell>
              <TableCell>{order.course}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{order.price}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default AllStudents;
