import {
  AccountCircle,
  Email,
  Lock,
  Person,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router"; // useNavigate is a hook provided by react-router-dom to navigate to different routes
import { registerUser } from "../../services/user";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [serverMessage, setServerMessage] = React.useState("");

  const registerUserMutation = useMutation({
    mutationFn: registerUser,

    onSuccess: () => {
      navigate("../login");
    },
    onError: (error) => {
      console.log("Error: ", error);
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
    registerUserMutation.mutate(data);
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 4,
        p: 3,
        borderRadius: 2,
        backgroundColor: "white",
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Sign Up
      </Typography>
      {serverMessage && (
        <Typography variant="body2" align="center" color="error">
          {serverMessage}
        </Typography>
      )}
      <Typography variant="body2" align="center">
        {registerUserMutation.isLoading ? <CircularProgress size={20} /> : null}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* First Name */}
        <TextField
          fullWidth
          margin="normal"
          label="First Name"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            ),
          }}
          {...register("firstname", {
            required: "First name is required",
            maxLength: {
              value: 30,
              message: "First name cannot exceed 30 characters",
            },
          })}
          error={!!errors.firstname}
          helperText={errors.firstname?.message}
        />

        {/* Last Name */}
        <TextField
          fullWidth
          margin="normal"
          label="Last Name"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            ),
          }}
          {...register("lastName", {
            maxLength: {
              value: 30,
              message: "Last name cannot exceed 30 characters",
            },
          })}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />

        {/* Username */}
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

        {/* Email */}
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Enter a valid email address",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        {/* Password */}
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
          Sign Up
        </Button>
      </form>
      <Button
        variant="text"
        sx={{ mt: 2 }}
        onClick={() => navigate("../login")}
      >
        Login
      </Button>
    </Box>
  );
};

export default SignUpForm;
