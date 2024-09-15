import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import Footer from "./components/Footer/Footer";
import SignUp from "./components/Registration/SignUp/SignUp";
import Login from "./components/Registration/Login/Login";
import AddLostItem from "./pages/AddLostItem/AddLostItem";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact Component={Home} />
        <Route path="/search" exact Component={Search} />
        <Route path="/add" exact Component={AddLostItem} />
        <Route path="/signup" exact Component={SignUp} />
        <Route path="/login" exact Component={Login} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
