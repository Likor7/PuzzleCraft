import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import UploadPage from './pages/UploadPage';
import PuzzlePage from './pages/PuzzlePage';

function App() {
  const isImageUploaded = () => {
    return sessionStorage.getItem('originalImageUrl') ? true : false;
  };

  const ProtectedRoute = ({ children }) => {
    if (!isImageUploaded()) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <Router>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<UploadPage />} />
          <Route
            path="/puzzle"
            element={
              <ProtectedRoute>
                <PuzzlePage />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;