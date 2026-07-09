import { useEffect, useRef, useState } from "react";

interface TurnstileProps {
  siteKey: string;
  onVerify: (token: string | null) => void;
}

declare global {
  interface Window {
    turnstile?: {
      render: (element: HTMLElement | string, options: any) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

export default function Turnstile({ siteKey, onVerify }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!window.turnstile) {
        setIsFallback(true);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (window.turnstile) {
      setScriptLoaded(true);
      return;
    }

    const scriptId = "cloudflare-turnstile-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    const checkInterval = setInterval(() => {
      if (window.turnstile) {
        setScriptLoaded(true);
        clearInterval(checkInterval);
      }
    }, 100);

    return () => clearInterval(checkInterval);
  }, []);

  useEffect(() => {
    if (!scriptLoaded || !containerRef.current || !window.turnstile) return;

    if (widgetIdRef.current) {
      try {
        window.turnstile.remove(widgetIdRef.current);
      } catch (e) {
        console.error("Error removing turnstile widget:", e);
      }
      widgetIdRef.current = null;
    }

    try {
      const widgetId = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: (token: string) => {
          onVerify(token);
        },
        "expired-callback": () => {
          onVerify(null);
        },
        "error-callback": () => {
          onVerify(null);
        },
      });
      widgetIdRef.current = widgetId;
    } catch (err) {
      console.error("Turnstile render error:", err);
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch (e) {
          // Ignore
        }
      }
    };
  }, [scriptLoaded, siteKey, onVerify]);

  if (isFallback) {
    return (
      <div className="my-2 p-3 bg-gray-50 border border-gray-200 rounded flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input 
            type="checkbox" 
            onChange={(e) => onVerify(e.target.checked ? "local-fallback-token" : null)}
            className="w-4 h-4 rounded border-gray-300 text-[#2271b1] focus:ring-[#2271b1]" 
          />
          <span className="text-xs font-semibold text-gray-700">I am not a robot</span>
        </label>
        <span className="text-[9px] text-gray-400 font-mono">local verify</span>
      </div>
    );
  }

  return <div ref={containerRef} className="my-2" />;
}
