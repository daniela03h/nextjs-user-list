import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Dispatch, SetStateAction } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

interface Props {
  users: User[]
  setUsers: Dispatch<SetStateAction<never[]>>
}

export default function Info({ users, setUsers }: Props) {

  const handleDeleteUser = async (id: number) => {
    const response = await fetch('/api/user/', {
      method: "DELETE",
      body: String(id)
    });
    if (response.ok) {
      const users = await response.json();
      setUsers(users)
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              Nombre
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              Email
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              Edad
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              Acciones
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user: User) => (
            <TableRow key={user.id}>
              <TableCell sx={{ fontSize: "16px" }}>{user.name}</TableCell>
              <TableCell sx={{ fontSize: "16px" }}>{user.email}</TableCell>
              <TableCell sx={{ textAlign: "center", fontSize: "16px" }}>
                {user.age}
              </TableCell>
              <TableCell sx={{ textAlign: "center", fontSize: "16px" }}>
                <IconButton
                  sx={{ color: "#FF0000" }}
                  onClick={() => handleDeleteUser(user.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
