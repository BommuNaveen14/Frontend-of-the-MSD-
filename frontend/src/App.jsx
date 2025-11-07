import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import LandDetails from "./pages/LandDetails";
import SellerForm from "./pages/SellerForm";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import RentForm from "./pages/RentForm";
import { isLoggedIn, logout } from "./utils/auth";
import "./App.css";


// ✅ Navbar Component
function Navbar() {
  const loggedIn = isLoggedIn();

  return (
    <nav className="navbar">
      <div className="logo">Real estate and Rental system</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/seller-form">Sell</Link>
        <Link to="/rent-form">Rent</Link>

        {!loggedIn ? (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

// ✅ Private route (protect Home, Seller, Rent)
function PrivateRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" />;
}

// ✅ Public route (redirect logged-in users)
function PublicRoute({ children }) {
  return isLoggedIn() ? <Navigate to="/" /> : children;
}

// ✅ Layout wrapper to hide Navbar on login/signup pages
function Layout({ children }) {
  const location = useLocation();
  const hideNavbar = ["/login", "/signup"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}

// ✅ Main App Component
export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/seller-form"
            element={
              <PrivateRoute>
                <SellerForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/rent-form"
            element={
              <PrivateRoute>
                <RentForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/land/:id"
            element={
              <PrivateRoute>
                <LandDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}
