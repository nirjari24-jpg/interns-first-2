const fs = require("fs");

const frontend_page_path = "c:/Users/Krupali Bathani/OneDrive/Desktop/GIT/interns-first-/frontend/app/page.tsx";
const chatgroup_page_path = "c:/Users/Krupali Bathani/OneDrive/Desktop/GIT/interns-first-/chatgroup/app/page.tsx";

function fixFile(filePath) {
  let code = fs.readFileSync(filePath, "utf8");
  
  // Normalize line endings to LF
  code = code.replace(/\r\n/g, "\n");
  
  const target = `            ) : (
              /* LOGIN FORM */
              <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Username or Email</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                      <UserIcon className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      placeholder="Enter username or email"
                      className={\`w-full pl-11 pr-4 py-3 border rounded-xl outline-none text-xs.5 font-medium transition-all \${
                        theme === "black"
                          ? "bg-black border-neutral-900 text-white placeholder-slate-700 focus:border-cyan-500/80 focus:ring-2 focus:ring-cyan-500/10"
                          : isDark 
                            ? "bg-slate-950/60 border-slate-800 text-white placeholder-slate-700 focus:border-cyan-500/80 focus:ring-2 focus:ring-cyan-500/10" 
                            : "bg-slate-50/80 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400/10"
                      }\`}
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Password</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter password"
                      className={\`w-full pl-11 pr-4 py-3 border rounded-xl outline-none text-xs.5 font-medium transition-all \${
                        theme === "black"
                          ? "bg-black border-neutral-900 text-white placeholder-slate-700 focus:border-cyan-500/80 focus:ring-2 focus:ring-cyan-500/10"
                          : isDark 
                            ? "bg-slate-950/60 border-slate-800 text-white placeholder-slate-700 focus:border-cyan-500/80 focus:ring-2 focus:ring-cyan-500/10" 
                            : "bg-slate-50/80 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400/10"
                      }\`}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!loginIdentifier.trim() || !loginPassword}
                  className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 font-extrabold text-white rounded-xl shadow-[0_8px_20px_rgba(6,182,212,0.15)] active:scale-95 transition-all text-xs.5 mt-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Log In & Join
                </button>
              </form>`;

  if (code.includes(target)) {
    code = code.replace(target, "");
    console.log(`Success: Fixed duplicate login form syntax in ${filePath}`);
    
    // Restore CRLF line endings
    const output = code.replace(/\n/g, "\r\n");
    fs.writeFileSync(filePath, output, "utf8");
  } else {
    // Try without CRLF mapping (just in case)
    let raw = fs.readFileSync(filePath, "utf8");
    let targetNormalized = target.replace(/\n/g, "\r\n");
    if (raw.includes(targetNormalized)) {
      raw = raw.replace(targetNormalized, "");
      console.log(`Success (CRLF): Fixed duplicate login form syntax in ${filePath}`);
      fs.writeFileSync(filePath, raw, "utf8");
    } else {
      console.log(`Warning: Target duplicate form pattern not found in ${filePath}`);
    }
  }
}

fixFile(frontend_page_path);
fixFile(chatgroup_page_path);
