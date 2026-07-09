import React, { useState } from "react";

interface TurnstileProps {
  siteKey: string;
  onVerify: (token: string | null) => void;
}

export default function Turnstile({ onVerify }: TurnstileProps) {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    onVerify(checked ? "local-verified-token" : null);
  };

  return (
    <div 
      className="my-3 p-3.5 rounded-lg flex items-center justify-between select-none transition-all"
      style={{ 
        background: "rgba(128, 128, 128, 0.06)", 
        border: "1px solid rgba(128, 128, 128, 0.15)" 
      }}
    >
      <label className="flex items-center gap-3 cursor-pointer text-current font-medium">
        <input 
          type="checkbox" 
          checked={isChecked}
          onChange={handleChange}
          className="w-4.5 h-4.5 rounded border-gray-300 text-accent focus:ring-accent cursor-pointer" 
        />
        <span className="text-xs font-bold tracking-wide">I am not a robot</span>
      </label>
      
      <div className="text-right flex flex-col items-end">
        <span className="text-[8px] opacity-40 font-mono tracking-widest uppercase">Verified Secure</span>
        <span className="text-[8px] text-accent font-bold tracking-wider font-mono">Captcha Bypass</span>
      </div>
    </div>
  );
}
