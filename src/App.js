import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage, LandingPage, TimerPage } from "./components";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="timer" element={<TimerPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
