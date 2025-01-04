import {
  AccountCircle,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { UserContext } from "../../contexts/user";
import { loginUser } from "../../services/user";

const LoginForm = () => {
  const navigate = useNavigate();

  const [serverMessage, setServerMessage] = React.useState("");
  const { dispatchUser } = useContext(UserContext);

  const loginUserMutation = useMutation({
    mutationFn: loginUser,

    onSuccess: (data) => {
      dispatchUser({
        type: "SET_USER",
        payload: { ...data.user, authenticated: true },
      });
      navigate("/");
    },
    onError: (error) => {
      setServerMessage(error.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = (data) => {
    console.log("Form Data: ", data);
    setServerMessage("");
    loginUserMutation.mutate(data);
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 4,
        p: 3,
        borderRadius: 2,
        backgroundColor: "white",
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Sign In.
      </Typography>
      <Typography variant="body2" align="center" color="error" gutterBottom>
        {serverMessage}{" "}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Username Field */}
        <TextField
          fullWidth
          margin="normal"
          label="Username"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          {...register("username", {
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters",
            },
          })}
          error={!!errors.username}
          helperText={errors.username?.message}
        />

        {/* Password Field */}
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Login
        </Button>
      </form>
      <Button
        variant="text"
        sx={{ mt: 2 }}
        onClick={() => navigate("../register")}
      >
        Signup
      </Button>
    </Box>
  );
};

export default LoginForm;
