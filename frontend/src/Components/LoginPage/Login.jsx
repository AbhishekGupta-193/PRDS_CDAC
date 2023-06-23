import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useGlobalContext } from "../../StateContext";

const theme = createTheme();

export default function SignIn() {
  const { curuser, setcuruser , setuser} = useGlobalContext();

  console.log(curuser, "curuser ");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const Data = new FormData(event.currentTarget);
    const userData = {
      email: Data.get("email"),
      password: Data.get("password"),
    };
    const myurl = "http://localhost:5000/login";

    try {
      const { data } = await axios.post(myurl, userData);
      console.log(data);
      const code = data.status;
      localStorage.setItem("allusers", JSON.stringify(data.allusers));
      if (code === 400) alert("All inputs are required");
      else if (code === 401) alert("Invalid Credientials");
      else if (
        (code === 200) & (data.user.email === "emp@gmail.com") ||
        data.user.email === "rpo@gmail.com"
      ) {
        setcuruser(data.user);

        localStorage.setItem("curuser", JSON.stringify(data.user));

        navigate("/main/EmployeeSection");
      } else if ((code === 200) & (data.user.email === "hr@gmail.com")) {
        setcuruser(data.user);

        localStorage.setItem("curuser", JSON.stringify(data.user));
        navigate("/main2/HR");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
