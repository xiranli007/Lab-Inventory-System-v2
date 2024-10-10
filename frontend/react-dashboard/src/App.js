// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Inventory from "./pages/Inventory";
// import CultureCollection from "./pages/CultureCollection";
// import Request from "./pages/Request";
// import Order from "./pages/Order";
// import CultureEditPage from "./pages/CultureEditPage";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

// const App = () => {
// 	return (
// 		<Router>
// 			{/* Navbar for navigation */}
// 			<Navbar />

// 			{/* Define routes for each page */}
// 			<Routes>
// 				<Route path="/login" element={<Login />} />
// 				<Route path="/" element={<Home />} />
// 				<Route path="/inventory" element={<Inventory />} />
// 				<Route path="/culture" element={<CultureCollection />} />
// 				<Route path="/culture/edit/:id" element={<CultureEditPage />} />
// 				<Route path="/request" element={<Request />} />
// 				<Route path="/order" element={<Order />} />
// 			</Routes>
// 		</Router>
// 	);
// };

// export default App;
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import CultureCollection from "./pages/CultureCollection";
import Request from "./pages/Request";
import Order from "./pages/Order";
import CultureEditPage from "./pages/CultureEditPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/inventory" 
            element={
              <ProtectedRoute>
                <Inventory />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/culture" 
            element={
              <ProtectedRoute>
                <CultureCollection />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/culture/edit/:id" 
            element={
              <ProtectedRoute>
                <CultureEditPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/request" 
            element={
              <ProtectedRoute>
                <Request />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/order" 
            element={
              <ProtectedRoute>
                <Order />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
