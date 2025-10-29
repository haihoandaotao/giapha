import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Families from './pages/Families';
import CreateFamily from './pages/CreateFamily';
import FamilyDetail from './pages/FamilyDetail';
import FamilyTree from './pages/FamilyTree';
import PersonDetail from './pages/PersonDetail';
import Dashboard from './pages/Dashboard';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/families" element={<Families />} />
              <Route path="/family/create" element={<CreateFamily />} />
              <Route path="/family/:id" element={<FamilyDetail />} />
              <Route path="/family-tree/:id" element={<FamilyTree />} />
              <Route path="/person/:id" element={<PersonDetail />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
