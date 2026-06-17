"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  Save,
  Key,
  CheckCheck,
  Mail,
  Phone,
  Camera,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  Info,
  Clock,
  ArrowRight,
  Fingerprint,
  Sun,
  Moon,
  ShieldAlert,
  Smartphone,
  Laptop,
  Check,
  AlertTriangle,
  Award
} from "lucide-react";

export default function Home() {
  // Settings Theme
  const [theme, setTheme] = useState("light"); // "dark" or "light"

  // Account Detail States
  const [name, setName] = useState("Om Gadhiya");
  const [username, setUsername] = useState("om_gadhiya_001");
  const [email, setEmail] = useState("omgadhiya97@gmail.com");
  const [phone, setPhone] = useState("+91 97245 67890");
  const [bio, setBio] = useState("Education | Learning and Building Premium Web Apps 🚀");
  const [avatar, setAvatar] = useState("/om_gadhiya.png");

  // Password Change States
  const [currentPassword, setCurrentPassword] = useState("omgadhiya97@123");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Show/Hide Password States
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Switch tabs in sidebar
  const [activeSection, setActiveSection] = useState("profile"); // "profile", "security"

  // 2FA state
  const [twoFactor, setTwoFactor] = useState(false);

  // Status Alerts
  const [toast, setToast] = useState<string | null>(null);
  const [timeString, setTimeString] = useState("");

  // Live clock simulation
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setTimeString(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Password Validation Criteria Checks
  const hasMinLength = newPassword.length >= 8;
  const hasCapital = /[A-Z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSpecial = /[^A-Za-z0-9]/.test(newPassword);

  // Security score calculation
  const getSecurityScore = () => {
    let score = 50; // Base score
    if (twoFactor) score += 20;
    if (currentPassword.length >= 10) score += 10;
    if (name && username && email && phone) score += 10;
    if (newPassword && hasMinLength && hasCapital && hasNumber && hasSpecial) score += 10;
    return Math.min(score, 100);
  };

  const securityScore = getSecurityScore();

  // Password complexity rating helper
  const getPasswordStrength = () => {
    if (!newPassword) return { score: 0, label: "None", color: "bg-slate-800", text: "text-slate-500" };
    let score = 0;
    if (hasMinLength) score++;
    if (hasCapital) score++;
    if (hasNumber) score++;
    if (hasSpecial) score++;

    switch (score) {
      case 1: return { score: 25, label: "Weak ⚠️", color: "bg-rose-500/80", text: "text-rose-400" };
      case 2: return { score: 50, label: "Medium ⚡", color: "bg-amber-500/80", text: "text-amber-400" };
      case 3: return { score: 75, label: "Strong ✨", color: "bg-indigo-500/80", text: "text-indigo-400" };
      case 4: return { score: 100, label: "Excellent 🔒", color: "bg-emerald-500/80", text: "text-emerald-400" };
      default: return { score: 10, label: "Too Short ❌", color: "bg-rose-600/85", text: "text-rose-500" };
    }
  };

  const passwordStrength = getPasswordStrength();

  // Save Account Profile details
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setToast("Account details updated successfully! 🎉");
    setTimeout(() => setToast(null), 3000);
  };

  // Change Password
  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    setCurrentPassword(newPassword);
    setNewPassword("");
    setConfirmPassword("");
    setToast("Password updated successfully! 🛡️");
    setTimeout(() => setToast(null), 3000);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
      setToast("Profile picture updated successfully! 📸");
      setTimeout(() => setToast(null), 3000);
    }
  };

  const triggerAvatarUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <main className={`min-h-screen w-full transition-colors duration-500 flex flex-col justify-start items-center p-4 sm:p-6 md:p-12 font-sans relative overflow-hidden ${
      theme === "dark" ? "bg-[#04060A] text-[#E4E6EB]" : "bg-slate-50 text-black light-theme"
    }`}>
      
      {/* Hidden File Input for Avatar Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleAvatarFileChange}
        accept="image/*"
        className="hidden"
      />
      
      {/* Background glowing particles (Aurora effect) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`absolute top-[5%] left-[10%] w-[380px] h-[380px] rounded-full blur-[120px] transition-opacity duration-700 ${
          theme === "dark" ? "bg-cyan-500/10 opacity-100" : "bg-cyan-400/5 opacity-80"
        }`} />
        <div className={`absolute bottom-[10%] right-[10%] w-[450px] h-[450px] rounded-full blur-[140px] transition-opacity duration-700 ${
          theme === "dark" ? "bg-purple-500/10 opacity-100" : "bg-purple-400/5 opacity-80"
        }`} />
        <div className={`absolute top-[35%] left-[45%] w-[420px] h-[420px] rounded-full blur-[130px] transition-opacity duration-700 ${
          theme === "dark" ? "bg-indigo-500/5 opacity-100" : "bg-indigo-400/3 opacity-70"
        }`} />
      </div>

      {/* Floating Toast Notification */}
      {toast && (
        <div className="fixed top-8 z-50 bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 font-extrabold px-6 py-4 rounded-full shadow-[0_12px_40px_rgba(6,182,212,0.4)] text-sm tracking-wide flex items-center gap-2.5 animate-bounce border border-white/20">
          <CheckCheck className="w-5 h-5 text-slate-950" />
          <span>{toast}</span>
        </div>
      )}

      {/* Outer Dashboard frame */}
      <div className="w-full max-w-5xl z-10 space-y-6">
        
        {/* Top Header Panel */}
        <div className={`relative border rounded-3xl p-5 md:p-6 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden transition-colors duration-500 ${
          theme === "dark" 
            ? "bg-gradient-to-r from-slate-950 via-[#0B0F19] to-slate-950 border-slate-800/80" 
            : "bg-white border-slate-200"
        }`}>
          
          {/* Header glowing lines */}
          <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

          {/* Left info title */}
          <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center flex-shrink-0 text-cyan-400 shadow-inner">
              <Fingerprint className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 dark:from-white dark:to-slate-400 from-slate-950 to-slate-700">
                  Settings Dashboard
                </span>
              </h1>
              <p className={`text-xs mt-1 ${theme === "dark" ? "text-slate-400" : "text-black font-semibold"}`}>
                Customize account profile details and manage credentials.
              </p>
            </div>
          </div>

          {/* Theme toggler and live widgets */}
          <div className="flex items-center gap-3">
            {/* Dark / Light Toggle */}
            <button
              onClick={() => {
                const sound = new Audio();
                sound.play().catch(() => {});
                setTheme(prev => (prev === "dark" ? "light" : "dark"));
              }}
              className={`p-2.5 rounded-2xl border transition-all cursor-pointer ${
                theme === "dark"
                  ? "bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800"
                  : "bg-white border-slate-200 text-slate-800 hover:bg-slate-100 shadow-sm"
              }`}
              title="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>

            <div className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border select-none ${
              theme === "dark" ? "bg-slate-900/50 border-slate-800/60" : "bg-white border-slate-200 shadow-sm"
            }`}>
              <Clock className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold">{timeString || "12:37"}</span>
              <div className="w-px h-3 bg-slate-800" />
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Secured</span>
            </div>
          </div>
        </div>

        {/* Dashboard Grid Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT SIDEBAR: Navigations & Security Score (Desktop Only) */}
          <div className="hidden lg:block lg:col-span-4 space-y-6">
            
            {/* Navigation Card */}
            <div className={`border rounded-[28px] p-5 shadow-xl transition-all duration-500 ${
              theme === "dark" ? "bg-[#080B12]/80 border-slate-800/80" : "bg-white border-slate-200 shadow-md"
            }`}>
              <h3 className={`text-xs font-extrabold uppercase tracking-wider mb-4 px-1.5 ${theme === "dark" ? "text-slate-400" : "text-black"}`}>Settings Hub</h3>
              
              <div className="space-y-1.5">
                <button
                  onClick={() => setActiveSection("profile")}
                  className={`w-full flex items-center gap-3 p-3.5 rounded-2xl font-bold text-xs.5 transition-all text-left ${
                    activeSection === "profile"
                      ? "bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 text-cyan-400 border border-cyan-500/20"
                      : theme === "dark" ? "text-slate-400 hover:text-slate-200" : "text-black hover:text-cyan-500"
                  }`}
                >
                  <User className="w-4.5 h-4.5" />
                  <span>Account Details</span>
                </button>

                <button
                  onClick={() => setActiveSection("security")}
                  className={`w-full flex items-center gap-3 p-3.5 rounded-2xl font-bold text-xs.5 transition-all text-left ${
                    activeSection === "security"
                      ? "bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 text-cyan-400 border border-cyan-500/20"
                      : theme === "dark" ? "text-slate-400 hover:text-slate-200" : "text-black hover:text-cyan-500"
                  }`}
                >
                  <Lock className="w-4.5 h-4.5" />
                  <span>Password & Security</span>
                </button>
              </div>
            </div>

            {/* Premium Security Score Widget */}
            <div className={`border rounded-[28px] p-5 shadow-xl transition-all duration-500 overflow-hidden relative ${
              theme === "dark" ? "bg-[#080B12]/80 border-slate-800/80" : "bg-white border-slate-200 shadow-md"
            }`}>
              
              {/* Orb effect inside card */}
              <div className="absolute top-0 right-0 w-[100px] h-[100px] bg-cyan-500/5 rounded-full blur-[20px] pointer-events-none" />

              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-cyan-400" />
                <h3 className={`text-xs font-extrabold uppercase tracking-wider ${theme === "dark" ? "text-slate-300 dark:text-slate-200" : "text-black"}`}>Security Health</h3>
              </div>

              <div className="flex items-center gap-4">
                
                {/* Circular Score display */}
                <div className="relative w-18 h-18 rounded-full border-4 border-slate-800 flex items-center justify-center flex-shrink-0">
                  <div className={`absolute inset-0 rounded-full border-4 border-cyan-400 transition-all duration-500`} style={{ clipPath: `polygon(0 0, 100% 0, 100% ${securityScore}%, 0 ${securityScore}%)` }} />
                  <span className="text-base font-black text-white dark:text-inherit">{securityScore}%</span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs.5 font-bold text-white tracking-wide">
                    {securityScore === 100 ? "Highly Shielded! 🔒" : "Enhancement Recommended"}
                  </h4>
                  <p className={`text-[10px] leading-normal ${theme === "dark" ? "text-slate-400" : "text-black"}`}>
                    {securityScore === 100 ? "Your account profile details are fully setup with robust configurations." : "Set a strong password and enable 2-Factor Authentication to reach 100% protection."}
                  </p>
                </div>
              </div>

              {/* 2-Factor Authentication Switch */}
              <div className="mt-5 pt-4 border-t border-slate-800/50 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4.5 h-4.5 text-emerald-400" />
                  <span className="text-[11px] font-bold">2-Factor Authentication</span>
                </div>
                
                {/* Custom Switch Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    const sound = new Audio();
                    sound.play().catch(() => {});
                    setTwoFactor(!twoFactor);
                    setToast(twoFactor ? "Two-Factor Auth Disabled 🔓" : "Two-Factor Auth Enabled 🔒");
                    setTimeout(() => setToast(null), 2500);
                  }}
                  className={`w-10 h-5.5 rounded-full p-0.5 transition-colors duration-300 relative ${
                    twoFactor ? "bg-cyan-500" : "bg-slate-800"
                  }`}
                >
                  <div className={`w-4.5 h-4.5 rounded-full bg-slate-950 transition-transform duration-300 ${
                    twoFactor ? "translate-x-4.5 bg-white" : "translate-x-0"
                  }`} />
                </button>
              </div>

            </div>

          </div>

          {/* RIGHT CENTRAL WORKSPACE: Forms */}
          <div className="lg:col-span-8 w-full space-y-4">
            
            {/* Mobile Navigation Switcher (Horizontal Tabs) */}
            <div className={`flex lg:hidden gap-1.5 p-1.5 rounded-2xl border transition-colors duration-500 ${
              theme === "dark" 
                ? "bg-slate-950/40 border-slate-800/80" 
                : "bg-white border-slate-200 shadow-sm"
            }`}>
              <button
                type="button"
                onClick={() => setActiveSection("profile")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs.5 transition-all cursor-pointer ${
                  activeSection === "profile"
                    ? theme === "dark"
                      ? "bg-gradient-to-r from-cyan-500/15 to-indigo-500/15 text-cyan-400 border border-cyan-500/20"
                      : "bg-cyan-50 text-cyan-600 border border-cyan-200"
                    : theme === "dark" ? "text-slate-400 hover:text-slate-200" : "text-slate-500"
                }`}
              >
                <User className="w-4 h-4" />
                <span>Account</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSection("security")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs.5 transition-all cursor-pointer ${
                  activeSection === "security"
                    ? theme === "dark"
                      ? "bg-gradient-to-r from-cyan-500/15 to-indigo-500/15 text-cyan-400 border border-cyan-500/20"
                      : "bg-cyan-50 text-cyan-600 border border-cyan-200"
                    : theme === "dark" ? "text-slate-400 hover:text-slate-200" : "text-slate-500"
                }`}
              >
                <Lock className="w-4 h-4" />
                <span>Security</span>
              </button>
            </div>
            
            {/* Account Details Tab Panel */}
            {activeSection === "profile" && (
              <div className={`border rounded-[32px] p-6 md:p-8 shadow-2xl transition-all duration-500 relative overflow-hidden ${
                theme === "dark" ? "bg-[#080B12]/80 border-slate-800/80" : "bg-white border-slate-200 shadow-md"
              }`}>
                
                <form onSubmit={handleSaveProfile} className="space-y-6">
                  
                  <div className="border-b border-slate-800/50 pb-4 flex items-center justify-between select-none">
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-cyan-400" />
                      <h2 className="text-lg font-black tracking-wide">Account Profile Details</h2>
                    </div>
                    <span className="text-[10px] text-slate-500 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full font-bold">Information</span>
                  </div>

                  {/* Avatar Upload Grid */}
                  <div className={`flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl border select-none transition-colors duration-500 ${
                    theme === "dark" ? "bg-slate-950/40 border-slate-900/60" : "bg-slate-50 border-slate-200"
                  }`}>
                    
                    <div className="relative group">
                      
                      {/* Interactive breathing outer border */}
                      <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 opacity-60 blur-xs group-hover:opacity-100 transition duration-300 animate-spin-slow" />
                      
                      <div className="w-[88px] h-[88px] rounded-full overflow-hidden border-[3px] border-slate-950 relative bg-slate-900">
                        <Image
                          src={avatar}
                          alt={name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <button
                        type="button"
                        onClick={triggerAvatarUpload}
                        className="absolute -bottom-1 -right-1 p-2 bg-slate-900 border border-slate-700/80 text-cyan-400 rounded-full shadow-lg hover:bg-slate-800 transition"
                        title="Upload Avatar"
                      >
                        <Camera className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-center sm:text-left space-y-1">
                      <h3 className="text-sm.5 font-extrabold">{name}</h3>
                      <p className={`text-[11px] leading-normal ${theme === "dark" ? "text-slate-400" : "text-black"}`}>
                        JPG, PNG allowed. Standard resolution will be automatically configured.
                      </p>
                      
                      <div className="flex items-center justify-center sm:justify-start gap-3 mt-1.5">
                        <button
                          type="button"
                          onClick={triggerAvatarUpload}
                          className="text-xs text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1.5 transition"
                        >
                          <RefreshCw className="w-3.5 h-3.5" /> Roll Random Photo
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Form fields with custom designs */}
                  <div className="space-y-4">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-2 text-left">
                        <label className={`text-[11px] font-bold uppercase tracking-widest px-0.5 ${theme === "dark" ? "text-slate-400" : "text-black"}`}>Full Name</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className={`w-full border rounded-2xl px-4 py-3.5 text-xs.5 outline-none transition duration-300 ${
                            theme === "dark" 
                              ? "bg-slate-950/60 border-slate-800 text-white focus:border-cyan-500/80 focus:ring-2 focus:ring-cyan-500/10" 
                              : "bg-slate-50 border-slate-200 text-black font-semibold focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400/10"
                          }`}
                          placeholder="Your full name..."
                          required
                        />
                      </div>

                      {/* Username */}
                      <div className="space-y-2 text-left">
                        <label className={`text-[11px] font-bold uppercase tracking-widest px-0.5 ${theme === "dark" ? "text-slate-400" : "text-black"}`}>Username</label>
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className={`w-full border rounded-2xl px-4 py-3.5 text-xs.5 outline-none transition duration-300 ${
                            theme === "dark" 
                              ? "bg-slate-950/60 border-slate-800 text-white focus:border-cyan-500/80 focus:ring-2 focus:ring-cyan-500/10" 
                              : "bg-slate-50 border-slate-200 text-black font-semibold focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400/10"
                          }`}
                          placeholder="Your username..."
                          required
                        />
                      </div>
                    </div>

                    {/* Email address with inner icon */}
                    <div className="space-y-2 text-left">
                      <label className={`text-[11px] font-bold uppercase tracking-widest px-0.5 ${theme === "dark" ? "text-slate-400" : "text-black"}`}>Email Address</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                          <Mail className="w-4 h-4" />
                        </span>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`w-full border rounded-2xl pl-12 pr-4 py-3.5 text-xs.5 outline-none transition duration-300 ${
                            theme === "dark" 
                              ? "bg-slate-950/60 border-slate-800 text-white focus:border-cyan-500/80 focus:ring-2 focus:ring-cyan-500/10" 
                              : "bg-slate-50 border-slate-200 text-black font-semibold focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400/10"
                          }`}
                          placeholder="your.email@domain.com"
                          required
                        />
                      </div>
                    </div>

                    {/* Phone number with inner icon */}
                    <div className="space-y-2 text-left">
                      <label className={`text-[11px] font-bold uppercase tracking-widest px-0.5 ${theme === "dark" ? "text-slate-400" : "text-black"}`}>Phone Number</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                          <Phone className="w-4 h-4" />
                        </span>
                        <input
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className={`w-full border rounded-2xl pl-12 pr-4 py-3.5 text-xs.5 outline-none transition duration-300 ${
                            theme === "dark" 
                              ? "bg-slate-950/60 border-slate-800 text-white focus:border-cyan-500/80 focus:ring-2 focus:ring-cyan-500/10" 
                              : "bg-slate-50 border-slate-200 text-black font-semibold focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400/10"
                          }`}
                          placeholder="Your phone number..."
                          required
                        />
                      </div>
                    </div>

                    {/* Bio details */}
                    <div className="space-y-2 text-left">
                      <label className={`text-[11px] font-bold uppercase tracking-widest px-0.5 ${theme === "dark" ? "text-slate-400" : "text-black"}`}>Bio Details</label>
                      <textarea
                        rows={3}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className={`w-full border rounded-2xl p-4.5 text-xs.5 outline-none transition duration-300 resize-none ${
                          theme === "dark" 
                            ? "bg-slate-950/60 border-slate-800 text-white focus:border-cyan-500/80 focus:ring-2 focus:ring-cyan-500/10" 
                            : "bg-slate-50 border-slate-200 text-black font-semibold focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400/10"
                        }`}
                        placeholder="Write something about yourself..."
                      />
                    </div>

                  </div>

                  {/* Save button */}
                  <button
                    type="submit"
                    className="w-full group bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-slate-950 font-black py-4 rounded-2xl text-xs.5 transition-all shadow-[0_8px_25px_rgba(6,182,212,0.2)] flex items-center justify-center gap-1.5 mt-4 select-none cursor-pointer"
                  >
                    <Save className="w-4.5 h-4.5" /> Save Account Profile Details
                  </button>

                </form>

              </div>
            )}

            {/* Password Security Tab Panel */}
            {activeSection === "security" && (
              <div className={`border rounded-[32px] p-6 md:p-8 shadow-2xl transition-all duration-500 relative overflow-hidden ${
                theme === "dark" ? "bg-[#080B12]/80 border-slate-800/80" : "bg-white border-slate-200 shadow-md"
              }`}>
                
                <form onSubmit={handleSavePassword} className="space-y-6">
                  
                  <div className="border-b border-slate-800/50 pb-4 flex items-center justify-between select-none">
                    <div className="flex items-center gap-2">
                      <Lock className="w-5 h-5 text-indigo-400" />
                      <h2 className="text-lg font-black tracking-wide">Change Password Settings</h2>
                    </div>
                    <span className="text-[10px] text-slate-500 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full font-bold">Authentication</span>
                  </div>

                  <div className="space-y-4">
                    
                    {/* Current Password */}
                    <div className="space-y-2 text-left relative">
                      <label className={`text-[11px] font-bold uppercase tracking-widest px-0.5 ${theme === "dark" ? "text-slate-400" : "text-black"}`}>Current Password</label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? "text" : "password"}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className={`w-full border rounded-2xl pl-4 pr-11 py-3.5 text-xs.5 outline-none transition duration-300 ${
                            theme === "dark" 
                              ? "bg-slate-950/60 border-slate-800 text-white focus:border-cyan-500/80 focus:ring-2 focus:ring-cyan-500/10" 
                              : "bg-slate-50 border-slate-200 text-black font-semibold focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400/10"
                          }`}
                          placeholder="Type current password..."
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition-colors"
                        >
                          {showCurrentPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                        </button>
                      </div>
                    </div>

                    {/* New Password */}
                    <div className="space-y-2 text-left relative">
                      <label className={`text-[11px] font-bold uppercase tracking-widest px-0.5 ${theme === "dark" ? "text-slate-400" : "text-black"}`}>New Password</label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className={`w-full border rounded-2xl pl-4 pr-11 py-3.5 text-xs.5 outline-none transition duration-300 ${
                            theme === "dark" 
                              ? "bg-slate-950/60 border-slate-800 text-white focus:border-cyan-500/80 focus:ring-2 focus:ring-cyan-500/10" 
                              : "bg-slate-50 border-slate-200 text-black font-semibold focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400/10"
                          }`}
                          placeholder="Type new secure password..."
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition-colors"
                        >
                          {showNewPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                        </button>
                      </div>

                      {/* Real-time Checklist & Strength Gauge */}
                      {newPassword && (
                        <div className="mt-3.5 p-4 bg-slate-950/90 rounded-2xl border border-slate-900 space-y-3 select-none animate-fade-in text-xs">
                          
                          {/* Strength Bar */}
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-[10.5px]">
                              <span className="text-slate-400">Security Index:</span>
                              <span className={`font-bold ${passwordStrength.text}`}>{passwordStrength.label}</span>
                            </div>
                            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                              <div
                                className={`h-full transition-all duration-500 ${passwordStrength.color}`}
                                style={{ width: `${passwordStrength.score}%` }}
                              />
                            </div>
                          </div>

                          {/* Checklist indicators */}
                          <div className="pt-2 border-t border-slate-900/60 grid grid-cols-2 gap-2 text-[10.5px]">
                            <div className="flex items-center gap-1.5">
                              {hasMinLength ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <div className="w-3.5 h-3.5 rounded-full border border-slate-700" />
                              )}
                              <span className={hasMinLength ? "text-slate-200" : "text-slate-500"}>8+ Characters</span>
                            </div>

                            <div className="flex items-center gap-1.5">
                              {hasCapital ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <div className="w-3.5 h-3.5 rounded-full border border-slate-700" />
                              )}
                              <span className={hasCapital ? "text-slate-200" : "text-slate-500"}>Uppercase Letter</span>
                            </div>

                            <div className="flex items-center gap-1.5">
                              {hasNumber ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <div className="w-3.5 h-3.5 rounded-full border border-slate-700" />
                              )}
                              <span className={hasNumber ? "text-slate-200" : "text-slate-500"}>Number (0-9)</span>
                            </div>

                            <div className="flex items-center gap-1.5">
                              {hasSpecial ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <div className="w-3.5 h-3.5 rounded-full border border-slate-700" />
                              )}
                              <span className={hasSpecial ? "text-slate-200" : "text-slate-500"}>Special Symbol</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2 text-left relative">
                      <label className={`text-[11px] font-bold uppercase tracking-widest px-0.5 ${theme === "dark" ? "text-slate-400" : "text-black"}`}>Confirm New Password</label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className={`w-full border rounded-2xl pl-4 pr-11 py-3.5 text-xs.5 outline-none transition duration-300 ${
                            theme === "dark" 
                              ? "bg-slate-950/60 border-slate-800 text-white focus:border-cyan-500/80 focus:ring-2 focus:ring-cyan-500/10" 
                              : "bg-slate-50 border-slate-200 text-black font-semibold focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400/10"
                          }`}
                          placeholder="Verify new secure password..."
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Update button */}
                  <button
                    type="submit"
                    className="w-full bg-white text-slate-950 font-black py-4 rounded-2xl text-xs.5 hover:bg-slate-200 transition-all flex items-center justify-center gap-1.5 mt-4 shadow-md select-none cursor-pointer"
                  >
                    <Key className="w-4.5 h-4.5" /> Save New Password
                  </button>

                </form>

              </div>
            )}

            {/* Mobile Security Health Card (Visible on mobile/tablet, hidden on desktop) */}
            <div className={`block lg:hidden border rounded-[28px] p-5 shadow-xl transition-all duration-500 overflow-hidden relative ${
              theme === "dark" ? "bg-[#080B12]/80 border-slate-800/80" : "bg-white border-slate-200 shadow-md"
            }`}>
              
              {/* Orb effect inside card */}
              <div className="absolute top-0 right-0 w-[100px] h-[100px] bg-cyan-500/5 rounded-full blur-[20px] pointer-events-none" />

              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-cyan-400" />
                <h3 className="text-xs font-extrabold uppercase text-slate-350 dark:text-slate-200 tracking-wider">Security Health</h3>
              </div>

              <div className="flex items-center gap-4">
                
                {/* Circular Score display */}
                <div className="relative w-18 h-18 rounded-full border-4 border-slate-800 flex items-center justify-center flex-shrink-0">
                  <div className={`absolute inset-0 rounded-full border-4 border-cyan-400 transition-all duration-500`} style={{ clipPath: `polygon(0 0, 100% 0, 100% ${securityScore}%, 0 ${securityScore}%)` }} />
                  <span className="text-base font-black text-white dark:text-inherit">{securityScore}%</span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs.5 font-bold text-white tracking-wide">
                    {securityScore === 100 ? "Highly Shielded! 🔒" : "Enhancement Recommended"}
                  </h4>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    {securityScore === 100 ? "Your account profile details are fully setup with robust configurations." : "Set a strong password and enable 2-Factor Authentication to reach 100% protection."}
                  </p>
                </div>
              </div>

              {/* 2-Factor Authentication Switch */}
              <div className="mt-5 pt-4 border-t border-slate-800/50 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4.5 h-4.5 text-emerald-400" />
                  <span className="text-[11px] font-bold">2-Factor Authentication</span>
                </div>
                
                {/* Custom Switch Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    setTwoFactor(!twoFactor);
                    setToast(twoFactor ? "Two-Factor Auth Disabled 🔓" : "Two-Factor Auth Enabled 🔒");
                    setTimeout(() => setToast(null), 2500);
                  }}
                  className={`w-10 h-5.5 rounded-full p-0.5 transition-colors duration-300 relative ${
                    twoFactor ? "bg-cyan-500" : "bg-slate-800"
                  }`}
                >
                  <div className={`w-4.5 h-4.5 rounded-full bg-slate-950 transition-transform duration-300 ${
                    twoFactor ? "translate-x-4.5 bg-white" : "translate-x-0"
                  }`} />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* SSL Footer details */}
      <div className="mt-12 text-center text-[10.5px] text-slate-500 select-none z-10">
        Secure Settings Hub. Encrypted using SHA-256 protocols. Powered by Next.js.
      </div>

    </main>
  );
}
