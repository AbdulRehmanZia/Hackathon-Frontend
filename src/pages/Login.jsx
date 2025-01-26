import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import loginSchema from "../utilis/loginSchema.js";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Link,
} from "@mui/material";

const Login = () => {
  const [CNIC, setCNIC] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate form data using Zod
    try {
      loginSchema.parse({ CNIC, password }); // Validate inputs
      setErrors({}); // Clear errors if validation passes
    } catch (err) {
      const validationErrors = {};
      err.errors.forEach((error) => {
        validationErrors[error.path[0]] = error.message;
      });
      setErrors(validationErrors); // Set validation errors
      return; // Stop if validation fails
    }

    // Proceed with login if validation passes
    try {
      await login(CNIC, password);
      navigate("/admin/dashboard"); // Redirect to dashboard
    } catch (err) {
      setErrors({ general: err.response?.data?.message || "Login failed." });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{ mt: 1, width: "100%" }}
        >
          <TextField
            label="CNIC"
            fullWidth
            margin="normal"
            value={CNIC}
            onChange={(e) => setCNIC(e.target.value)}
            error={!!errors.CNIC}
            helperText={errors.CNIC}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
            required
          />
          {errors.general && (
            <Typography color="error" align="center">
              {errors.general}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
