import React from "react";
import { Avatar, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import TropyIcon from '../../../../assets/Trophy.svg';
import image67 from '../../../../assets/image67.svg'

interface Student {
  id: number;
  name: string;
  email: string;
  wages: number;
  photoUrl: string;
}

const TopStudents: React.FC = () => {
  const students: Student[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      wages: 178,
      photoUrl: "/path-to-john-doe-photo.jpg"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      wages: 172,
      photoUrl: "/path-to-jane-smith-photo.jpg"
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        wages: 170,
        photoUrl: "/path-to-jane-smith-photo.jpg"
      },
      {
        id: 4,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        wages: 160,
        photoUrl: "/path-to-jane-smith-photo.jpg"
      },
      {
        id: 5,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        wages: 150,
        photoUrl: "/path-to-jane-smith-photo.jpg"
      },
      {
        id: 6,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        wages: 150,
        photoUrl: 'image67'
      },
  ];

  return (
    <div style={{marginTop: "6px"}}>
      {students.map((student) => (
        <div key={student.id} style={{ display: "flex", alignItems: "center", marginLeft: "7px", marginBottom: "20px" }}>
          <Avatar src={student.photoUrl} alt={student.name} />
          <div style={{ marginLeft: "10px" }}>
            <Typography variant="h6">{student.name}</Typography>
            <Typography variant="body1" style={{ color: "#777777" }}>{student.email}</Typography>
          </div>
          <div style={{ position: "absolute", float: "right", right: "41px", marginBottom: "15px", display: 'flex',  }}>
            <img style={{marginRight: "5px"}} src={TropyIcon}  />
            <Typography variant="body2">{student.wages}</Typography>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopStudents;