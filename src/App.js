import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { HomePage, LandingPage, TimerPage } from "./components";
import { Navbar } from "./components/navigation";
import { Login, Signup } from "./components/auth";

function App() {
  return (
    <div>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/timer" element={<TimerPage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </div>
  );
}

export default App;
