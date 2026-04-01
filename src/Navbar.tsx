import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, LayoutDashboard, MessageSquare, Home, LogIn, LogOut, User, BookOpen, Info, UserCircle, Gamepad2, Settings, StickyNote, Menu, X } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useFirebase } from "../context/FirebaseContext";
import { useLanguage } from "../context/LanguageContext";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const { user, login, logout, loading } = useFirebase();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (location.pathname === "/chat") return null;

  const navItems = [
    { path: "/", label: t('nav.home'), icon: Home },
    { path: "/chat", label: t('nav.aura_ai'), icon: MessageSquare },
    { path: "/dashboard", label: t('nav.dashboard'), icon: LayoutDashboard },
    { path: "/quiz", label: t('nav.quiz_game'), icon: Gamepad2 },
    { path: "/research", label: t('nav.research'), icon: BookOpen },
    { path: "/notes", label: t('nav.notes'), icon: StickyNote },
    { path: "/profile", label: t('nav.portfolio'), icon: UserCircle },
    ...(user?.role === 'admin' ? [{ path: "/admin", label: t('nav.admin'), icon: LayoutDashboard }] : []),
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 hidden md:flex justify-center p-6 pointer-events-none">
        <div className="flex items-center gap-2 p-2 glass rounded-full pointer-events-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300",
                  isActive ? "text-white" : "text-white/50 hover:text-white/80"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white/10 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon size={18} />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
          <div className="w-px h-6 bg-white/10 mx-2" />
          {!loading && (
            user ? (
              <div className="flex items-center gap-3 pl-2 pr-1">
                <div className="flex items-center gap-2">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || ""} className="w-8 h-8 rounded-full border border-white/20" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-aura-primary/20 flex items-center justify-center border border-white/20">
                      <User size={14} className="text-aura-primary" />
                    </div>
                  )}
                  <span className="text-xs font-medium text-white/80 hidden sm:inline-block max-w-[100px] truncate">
                    {user.displayName?.split(' ')[0]}
                  </span>
                </div>
                <button onClick={logout} className="p-2 text-white/50 hover:text-red-400 transition-colors rounded-full hover:bg-white/5" title={t('nav.logout')}>
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button onClick={login} className="flex items-center gap-2 px-4 py-2 rounded-full bg-aura-primary text-white hover:bg-aura-primary/80 transition-all text-sm font-medium">
                <LogIn size={16} />
                <span>{t('nav.login')}</span>
              </button>
            )
          )}
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 md:hidden pointer-events-none">
        <div className="flex items-center justify-between px-4 py-3 pointer-events-auto glass mx-3 mt-3 rounded-2xl">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-aura-primary flex items-center justify-center">
              <Sparkles size={14} className="text-white" />
            </div>
            <span className="text-sm font-bold font-display">Learna.ai</span>
          </Link>
          <div className="flex items-center gap-2">
            {!loading && user && (
              user.photoURL ? (
                <img src={user.photoURL} alt="" className="w-7 h-7 rounded-full border border-white/20" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-7 h-7 rounded-full bg-aura-primary/20 flex items-center justify-center border border-white/20">
                  <User size={12} className="text-aura-primary" />
                </div>
              )
            )}
            <button
              onClick={() => setMobileMenuOpen(v => !v)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/70"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm pointer-events-auto"
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
                className="absolute top-[72px] left-3 right-3 bg-[#0d0d20] border border-white/10 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
              >
                <div className="p-3 grid grid-cols-2 gap-1.5">
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-2.5 px-3 py-3 rounded-xl transition-all duration-200 text-sm font-medium",
                          isActive
                            ? "bg-aura-primary/20 text-aura-primary border border-aura-primary/30"
                            : "text-white/60 hover:bg-white/5 hover:text-white border border-transparent"
                        )}
                      >
                        <Icon size={16} />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
                <div className="px-3 pb-3 border-t border-white/[0.06] pt-2">
                  {!loading && (
                    user ? (
                      <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-white/5">
                        <div className="flex items-center gap-2">
                          {user.photoURL ? (
                            <img src={user.photoURL} alt="" className="w-7 h-7 rounded-full border border-white/20" referrerPolicy="no-referrer" />
                          ) : (
                            <div className="w-7 h-7 rounded-full bg-aura-primary/20 flex items-center justify-center">
                              <User size={12} className="text-aura-primary" />
                            </div>
                          )}
                          <span className="text-xs font-medium text-white/70 max-w-[120px] truncate">{user.displayName}</span>
                        </div>
                        <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs text-red-400 bg-red-500/10 border border-red-500/20">
                          <LogOut size={12} /> Logout
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => { login(); setMobileMenuOpen(false); }} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-aura-primary text-white text-sm font-semibold">
                        <LogIn size={16} /> {t('nav.login')}
                      </button>
                    )
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
