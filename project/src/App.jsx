import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import PlacesRoute from './pages/PlacesRoute';
import About from './pages/About';
import Blogs from './pages/Blogs';
import BlogsDetails from './pages/BlogsDetails';
import Login from './components/Login/LoginForm';
import RegisterForm from './components/Register/RegisterForm';
import BookingPage from './components/Booking/BookingPage';
import AdminPage from './pages/AdminPage';
import NoPage from './pages/NoPage';
import AccountSettings from './components/EditAccount/AccountSetting'; // Import the AccountSettings component
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AuthProvider } from './utils/AuthContext'; // Import the AuthProvider
import './index.css';

const App = () => {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 900,
      easing: 'ease-in-sine',
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="blogs/:id" element={<BlogsDetails />} />
            <Route path="best-places" element={<PlacesRoute />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<RegisterForm />} />
            <Route path="*" element={<NoPage />} />
            <Route path="/Booking" element={<BookingPage />} />
            <Route path="admin" element={<AdminPage />} />
            <Route path="AccountSetting" element={<AccountSettings />} /> {/* Add the AccountSettings route */}
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;