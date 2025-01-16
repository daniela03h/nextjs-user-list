"use client";

import { Box, Typography, Button } from "@mui/material";
import Info from "@/components/Table/Table";
import UserModal from "@/components/Modal/Modal";
import { useState, useEffect } from "react";

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [users, setUsers] = useState([])

  const handleCloseModal = async () => {
    setOpenModal(false);
    const response = await fetch("/api/user");
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/user");
      const data = await response.json();
      setUsers(data);
    }
    fetchData();
  },[])

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: 4,
          flexDirection: "column",
          padding: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 4,
            padding: 4,
          }}
        >
          <Typography variant="h4" color="#000000" sx={{ fontWeight: "bold" }}>
            Listado de Usuarios
          </Typography>
          <Button
            variant="contained"
            sx={{ height: "50px", fontWeight: "bold" }}
            onClick={() => setOpenModal(true)}
          >
            Agregar Usuario
          </Button>
        </Box>
        <Info users={users} setUsers={setUsers}/>
      </Box>
      <UserModal open={openModal} handleClose={handleCloseModal}/>
    </>
  );
}
