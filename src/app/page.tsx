"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { TextField, Box, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

interface UserCredentials {
  username: string;
  password: string;
}

export default function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserCredentials>();

  const onSubmit = (data: UserCredentials) => {
    localStorage.setItem("authUser", data.username);
    router.push("/home");
  };

  console.log(errors);

  useEffect(() => {
    const authUser = localStorage.getItem("authUser");
    if (authUser) {
      router.push("/home");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 4,
          flexDirection: "column",
          backgroundColor: "white",
          borderRadius: 2,
          padding: 4,
          boxShadow: 3,
          width: 700,
        }}
      >
        <Typography
          variant="h4"
          color="#000000"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          INICIO DE SESIÓN
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: "flex",
              gap: 4,
              flexDirection: "column",
            }}
          >
            <TextField
              label="Usuario"
              variant="outlined"
              {...register("username", { required: true })}
              error={Boolean(errors.username)}
              helperText={Boolean(errors.username) && "El usuario es requerido"}
            />
            <TextField
              label="Contraseña"
              type="password"
              variant="outlined"
              {...register("password", { required: true })}
              error={Boolean(errors.password)}
              helperText={Boolean(errors.password) && "La contraseña es requerida"}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ height: "50px", fontWeight: "bold" }}
            >
              Iniciar sesión
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
