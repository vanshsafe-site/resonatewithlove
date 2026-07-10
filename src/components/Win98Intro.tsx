import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Props {
  onEnter: () => void;
  glitching: boolean;
}

export function Win98Intro({ onEnter, glitching }: Props) {
  const [loadPct, setLoadPct] = useState(0);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setBlink((b) => !b), 600);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (loadPct >= 68) return;
    const t = setTimeout(() => setLoadPct((p) => Math.min(68, p + Math.random() * 6)), 220);
    return () => clearTimeout(t);
  }, [loadPct]);

  return (
    <motion.div
      className="win98 min-h-screen p-2 md:p-6 relative overflow-hidden"
      animate={
        glitching
          ? {
              filter: [
                "hue-rotate(0deg) contrast(1)",
                "hue-rotate(90deg) contrast(1.4) saturate(2)",
                "hue-rotate(-40deg) contrast(2)",
                "hue-rotate(180deg) contrast(3) invert(0.2)",
              ],
              scale: [1, 1.02, 0.98, 1.05, 0.6],
              skewX: [0, 8, -12, 20, 0],
              opacity: [1, 1, 1, 0.8, 0],
            }
          : {}
      }
      transition={{ duration: 2.2, ease: "easeInOut" }}
    >
      {/* Menu bar */}
      <div className="text-[11px] flex gap-3 mb-2 select-none">
        <span><u>F</u>ile</span><span><u>E</u>dit</span><span><u>V</u>iew</span>
        <span>F<u>a</u>vorites</span><span><u>T</u>ools</span><span><u>H</u>elp</span>
      </div>

      {/* Address bar */}
      <div className="flex items-center gap-2 mb-3 text-[11px]">
        <span>Address</span>
        <div className="sunken flex-1 px-2 py-1">http://www.reasonateai.net/index.html</div>
        <button className="btn98">Go</button>
      </div>

      <div className="grid md:grid-cols-[220px_1fr] gap-3">
        {/* Sidebar */}
        <div className="window p-2 text-[12px] hidden md:block">
          <div className="title-bar text-[11px]">
            <span>Navigation</span><span>_ □ ×</span>
          </div>
          <ul className="p-2 space-y-1">
            {["🏠 Home", "📁 Products", "📧 Contact Us", "💾 Downloads", "🎵 Guestbook", "🔗 Web Ring", "❓ FAQ"].map((x) => (
              <li key={x} className="hover:bg-blue-700 hover:text-white px-1 cursor-pointer">
                <u>{x}</u>
              </li>
            ))}
          </ul>
          <div className="sunken p-2 mt-2 text-[10px] text-center">
            <div>Visitor #</div>
            <div className="font-mono text-red-600 text-lg">000042</div>
            <div>Best viewed in</div>
            <div className="font-bold">IE 5.0</div>
            <div>800×600</div>
          </div>
        </div>

        {/* Main window */}
        <div className="window">
          <div className="title-bar">
            <span>🌐 ReasonateAI - Microsoft Internet Explorer</span>
            <span>_ □ ×</span>
          </div>
          <div className="p-4 bg-white text-black">
            <div
              className="text-center py-4 mb-4"
              style={{
                background: "linear-gradient(180deg, #ff00ff, #ffff00)",
                fontFamily: "Comic Sans MS, cursive",
              }}
            >
                <h1 className="text-3xl font-bold text-blue-900" style={{ textShadow: "2px 2px 0 #fff" }}>
                🌟 Welcome to ReasonateAI! 🌟
              </h1>
              <p className="text-red-700 font-bold text-sm mt-1">~ Your #1 Source for A.I. on the Web! ~</p>
              <p className="text-[10px] mt-1">
                {blink ? "🚧 UNDER CONSTRUCTION 🚧" : "★ NEW! ★ NEW! ★ NEW! ★"}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-3 text-[12px]">
              <div className="border-2 border-gray-500 p-2 bg-gray-100">
                <div className="font-bold text-blue-800 underline">📢 Latest News</div>
                <ul className="list-disc pl-4 mt-1 space-y-1">
                  <li>Site launched Jan 14, 1999!</li>
                  <li>Now with FRAMES support</li>
                  <li>Sign our guestbook!</li>
                </ul>
              </div>
              <div className="border-2 border-gray-500 p-2 bg-yellow-100">
                <div className="font-bold text-purple-900 underline">💿 Downloads</div>
                <p className="mt-1">Get the ReasonateAI screensaver ONLY 2.4 MB!</p>
                <button className="btn98 mt-2 w-full">Download.exe</button>
              </div>
              <div className="border-2 border-gray-500 p-2 bg-blue-50">
                <div className="font-bold text-green-800 underline">🎁 Free Stuff!</div>
                <p className="mt-1">MP3s, wallpapers, cursors and more!</p>
                <div className="overflow-hidden text-red-600 text-[10px] mt-2 whitespace-nowrap">
                  <div className="inline-block animate-[grid-move_6s_linear_infinite]">
                    ★★★ Click here for FREE stuff ★★★ &nbsp; ★★★ Click here for FREE stuff ★★★
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 border-2 border-dashed border-gray-500 p-3">
              <div className="text-[11px]">
                <b>About us:</b> Reasonate A.I. is a cutting-edge information superhighway destination
                dedicated to bringing you the finest artificial intelligence content on the World Wide
                Web. Please bookmark this page and tell your friends!
              </div>
              <div className="mt-2 flex gap-2 flex-wrap">
                <img alt="ie" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='88' height='31'><rect width='88' height='31' fill='%23004080'/><text x='44' y='20' font-family='monospace' font-size='10' fill='white' text-anchor='middle'>Best in IE 5</text></svg>" />
                <img alt="ns" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='88' height='31'><rect width='88' height='31' fill='%23444'/><text x='44' y='20' font-family='monospace' font-size='10' fill='%2300ff00' text-anchor='middle'>Netscape 4</text></svg>" />
                <img alt="html" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='88' height='31'><rect width='88' height='31' fill='%23fff' stroke='%23000'/><text x='44' y='20' font-family='monospace' font-size='10' fill='%23c00' text-anchor='middle'>HTML 3.2</text></svg>" />
              </div>
            </div>

              <div className="mt-6 text-center">
              <button
                onClick={onEnter}
                className="btn98"
                style={{ fontSize: 14, padding: "6px 22px" }}
              >
                ➤ Visit Site
              </button>
              <div className="text-[10px] mt-2 text-gray-600">© 1999 ReasonateAI Inc. All Rights Reserved.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Status bar */}
        <div className="mt-3 flex items-center gap-2 text-[11px] window px-2 py-1">
        <div className="sunken flex-1 px-2">
          {loadPct < 68 ? `Loading reasonateai.net... (${Math.floor(loadPct)}%)` : "Waiting for www.geocities-cdn.com..."}
        </div>
        <div className="sunken px-2">🔒 Internet</div>
      </div>

      {/* Glitch scanlines overlay when glitching */}
      {glitching && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(0,255,255,0.15) 0 2px, transparent 2px 4px)",
            mixBlendMode: "screen",
          }}
        />
      )}
    </motion.div>
  );
}