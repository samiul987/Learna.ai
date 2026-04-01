import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ChatPage from "./pages/ChatPage";
import AdminPage from "./pages/AdminPage";
import ProfilePage from "./pages/ProfilePage";
import ResearchPage from "./pages/ResearchPage";
import QuizPage from "./pages/QuizPage";
import Navbar from "./components/Navbar";
import { motion, AnimatePresence } from "motion/react";
import { FirebaseProvider } from "./context/FirebaseContext";
import { LanguageProvider } from "./context/LanguageContext";
import DashboardPage from "./pages/DashboardPage";
import NotesPage from "./pages/NotesPage";
import ErrorBoundary from "./components/ErrorBoundary";

export default function App() {
  return (
    <FirebaseProvider>
      <LanguageProvider>
        <Router>
        <div className="relative min-h-screen overflow-x-hidden">
          <Navbar />
          <main>
            <ErrorBoundary>
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/chat" element={<ChatPage />} />
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/research" element={<ResearchPage />} />
                  <Route path="/quiz" element={<QuizPage />} />
                  <Route path="/notes" element={<NotesPage />} />
                </Routes>
              </AnimatePresence>
            </ErrorBoundary>
          </main>
          
          {/* Background Atmosphere */}
          <div className="fixed inset-0 -z-10 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-aura-primary/20 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-aura-secondary/10 blur-[120px] rounded-full animate-pulse delay-1000" />
          </div>
        </div>
      </Router>
    </LanguageProvider>
  </FirebaseProvider>
);
}
