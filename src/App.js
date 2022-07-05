
import './App.css';
import { Routes, Route } from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import Header from "./Components/Header";


function App() {
  return (
    <>
      <Routes>
        <Route path="/Todo" element={<Header />} />
        <Route exact path="/" element={<LoginForm />} />
      </Routes>
    </>
  );
}

export default App;
