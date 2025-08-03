import { Routes, Route } from "react-router-dom";
import { Container, CssBaseline } from "@mui/material";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Game from "./pages/Game"

function App() {


  return (
    <>
      <CssBaseline />
      <Container sx={{ display: 'flex' }}>
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </Container>

    </>
  )
}

export default App
