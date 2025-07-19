import { Routes, Route } from "react-router-dom";
import { Container, CssBaseline } from "@mui/material";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {


  return (
    <>
      <CssBaseline />
      <Container sx={{ display: 'flex' }}>
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Container>

    </>
  )
}

export default App
