"use client";

import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useForm } from "react-hook-form";

interface User {
  name: string;
  email: string;
  age: number;
}

interface UserModalProps {
  open: boolean;
  handleClose: () => void;
}

export default function UserModal({
  open = false,
  handleClose,
}: UserModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<User>();

  const onSubmit = async(data: User) => {
    const response = await fetch("/api/user",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      alert("Error al agregar el usuario")
      throw new Error("Error al agregar el usuario");
    }
    reset();
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        sx: { width: "700px" },
        onSubmit: handleSubmit(onSubmit),
      }}
    >
      <DialogTitle>Agregar Usuario</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          gap: 4,
          flexDirection: "column",
        }}
      >
        <TextField
          sx={{ marginTop: "10px" }}
          label="Nombre"
          variant="outlined"
          {...register("name", { required: true })}
          error={Boolean(errors.name)}
          helperText={Boolean(errors.name) && "El nombre es requerido"}
        />
        <TextField
          label="Correo Electrónico"
          type="email"
          variant="outlined"
          {...register("email", { required: true })}
          error={Boolean(errors.email)}
          helperText={Boolean(errors.email) && "El correo es requerido"}
        />
        <TextField
          label="Edad"
          type="number"
          variant="outlined"
          {...register("age", { required: true })}
          error={Boolean(errors.age)}
          helperText={Boolean(errors.age) && "La edad es requerido"}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button
          type="submit"
          variant="contained"
          sx={{ height: "50px", fontWeight: "bold" }}
        >
          Agregar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
