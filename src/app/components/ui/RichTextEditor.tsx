import React, { useRef, useEffect, useCallback } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: number;
}

const BTN =
  "inline-flex items-center justify-center px-2 py-1 text-[12px] rounded hover:bg-gray-200 active:bg-gray-300 transition-colors select-none cursor-pointer border-0 bg-transparent text-gray-700 font-sans";
const SEP = "inline-block w-px h-5 bg-gray-300 mx-1 flex-shrink-0";

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your content here...",
  minHeight = 220,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const suppressNext = useRef(false);

  // Sync external value → DOM (only when value changes from outside)
  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    if (suppressNext.current) {
      suppressNext.current = false;
      return;
    }
    // Only update if content actually differs to avoid cursor jump
    if (el.innerHTML !== (value || "")) {
      el.innerHTML = value || "";
    }
  }, [value]);

  const emitChange = useCallback(() => {
    if (!editorRef.current) return;
    suppressNext.current = true;
    onChange(editorRef.current.innerHTML);
  }, [onChange]);

  const exec = useCallback(
    (cmd: string, arg?: string) => {
      editorRef.current?.focus();
      document.execCommand(cmd, false, arg ?? "");
      emitChange();
    },
    [emitChange]
  );

  const formatBlock = useCallback(
    (tag: string) => {
      editorRef.current?.focus();
      document.execCommand("formatBlock", false, tag);
      emitChange();
    },
    [emitChange]
  );

  const insertHR = useCallback(() => {
    editorRef.current?.focus();
    document.execCommand("insertHTML", false, "<hr style='border:none;border-top:1px solid #d1d5db;margin:1rem 0;'/>");
    emitChange();
  }, [emitChange]);

  const insertLink = useCallback(() => {
    const url = prompt("Enter URL (include https://):");
    if (url && url.trim()) {
      editorRef.current?.focus();
      // If text is selected, wrap it; otherwise insert the URL as text
      const selection = window.getSelection();
      if (selection && selection.toString().trim()) {
        document.execCommand("createLink", false, url.trim());
      } else {
        document.execCommand(
          "insertHTML",
          false,
          `<a href="${url.trim()}" target="_blank" rel="noopener noreferrer">${url.trim()}</a>`
        );
      }
      emitChange();
    }
  }, [emitChange]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Keyboard shortcuts
    if (e.metaKey || e.ctrlKey) {
      if (e.key === "b") { e.preventDefault(); exec("bold"); }
      if (e.key === "i") { e.preventDefault(); exec("italic"); }
      if (e.key === "u") { e.preventDefault(); exec("underline"); }
      if (e.key === "z") { e.preventDefault(); exec("undo"); }
      if (e.key === "y") { e.preventDefault(); exec("redo"); }
    }
  };

  const isEmpty = !value || value === "<br>" || value === "<div><br></div>";

  return (
    <div className="border border-gray-300 rounded overflow-hidden focus-within:border-[#2271b1] focus-within:ring-1 focus-within:ring-[#2271b1]/20 transition-all">
      {/* ── Toolbar ── */}
      <div
        className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 bg-gray-50 border-b border-gray-200"
        onMouseDown={(e) => e.preventDefault()} // prevent losing editor focus
      >
        {/* Undo / Redo */}
        <button type="button" title="Undo (Ctrl+Z)" onClick={() => exec("undo")} className={BTN}>
          ↩
        </button>
        <button type="button" title="Redo (Ctrl+Y)" onClick={() => exec("redo")} className={BTN}>
          ↪
        </button>
        <span className={SEP} />

        {/* Headings */}
        <button type="button" title="Heading 1" onClick={() => formatBlock("h1")} className={BTN + " font-black text-[11px]"}>
          H1
        </button>
        <button type="button" title="Heading 2" onClick={() => formatBlock("h2")} className={BTN + " font-black text-[11px]"}>
          H2
        </button>
        <button type="button" title="Heading 3" onClick={() => formatBlock("h3")} className={BTN + " font-black text-[11px]"}>
          H3
        </button>
        <button type="button" title="Paragraph" onClick={() => formatBlock("p")} className={BTN + " text-[11px]"}>
          ¶
        </button>
        <span className={SEP} />

        {/* Inline formatting */}
        <button type="button" title="Bold (Ctrl+B)" onClick={() => exec("bold")} className={BTN + " font-bold"}>
          B
        </button>
        <button type="button" title="Italic (Ctrl+I)" onClick={() => exec("italic")} className={BTN + " italic"}>
          I
        </button>
        <button type="button" title="Underline (Ctrl+U)" onClick={() => exec("underline")} className={BTN + " underline"}>
          U
        </button>
        <span className={SEP} />

        {/* Lists */}
        <button type="button" title="Bullet List" onClick={() => exec("insertUnorderedList")} className={BTN}>
          • ≡
        </button>
        <button type="button" title="Numbered List" onClick={() => exec("insertOrderedList")} className={BTN}>
          1. ≡
        </button>
        <span className={SEP} />

        {/* Alignment */}
        <button type="button" title="Align Left" onClick={() => exec("justifyLeft")} className={BTN} style={{ letterSpacing: "-1px" }}>
          ⬱L
        </button>
        <button type="button" title="Align Center" onClick={() => exec("justifyCenter")} className={BTN} style={{ letterSpacing: "-1px" }}>
          ⬱C
        </button>
        <button type="button" title="Align Right" onClick={() => exec("justifyRight")} className={BTN} style={{ letterSpacing: "-1px" }}>
          ⬱R
        </button>
        <button type="button" title="Justify" onClick={() => exec("justifyFull")} className={BTN} style={{ letterSpacing: "-1px" }}>
          ⬱J
        </button>
        <span className={SEP} />

        {/* Block quote */}
        <button
          type="button"
          title="Block Quote"
          onClick={() => formatBlock("blockquote")}
          className={BTN + " text-base leading-none"}
        >
          "
        </button>

        {/* Link */}
        <button type="button" title="Insert / Edit Link" onClick={insertLink} className={BTN}>
          🔗
        </button>

        {/* Horizontal rule */}
        <button type="button" title="Horizontal Divider" onClick={insertHR} className={BTN}>
          ─
        </button>
      </div>

      {/* ── Editable content area ── */}
      <div className="relative">
        {isEmpty && (
          <div className="absolute top-3 left-4 text-gray-400 text-sm pointer-events-none select-none">
            {placeholder}
          </div>
        )}
        <div
          ref={editorRef}
          contentEditable
          onInput={emitChange}
          onKeyDown={handleKeyDown}
          suppressContentEditableWarning
          className="p-4 text-sm text-gray-800 focus:outline-none rte-content"
          style={{ minHeight }}
        />
      </div>

      {/* ── Embedded prose styles ── */}
      <style>{`
        .rte-content h1 { font-size: 1.75rem; font-weight: 800; margin: 0.75rem 0 0.5rem; line-height: 1.2; color: #1d2327; }
        .rte-content h2 { font-size: 1.375rem; font-weight: 700; margin: 0.65rem 0 0.4rem; line-height: 1.25; color: #1d2327; }
        .rte-content h3 { font-size: 1.1rem; font-weight: 700; margin: 0.55rem 0 0.35rem; line-height: 1.3; color: #1d2327; }
        .rte-content p { margin: 0.4rem 0; line-height: 1.65; }
        .rte-content ul { list-style: disc; padding-left: 1.5rem; margin: 0.5rem 0; }
        .rte-content ol { list-style: decimal; padding-left: 1.5rem; margin: 0.5rem 0; }
        .rte-content li { margin: 0.2rem 0; line-height: 1.6; }
        .rte-content a { color: #2271b1; text-decoration: underline; }
        .rte-content a:hover { color: #135e96; }
        .rte-content blockquote { border-left: 4px solid #2271b1; padding: 0.5rem 1rem; margin: 0.75rem 0; background: #f0f6fc; color: #444; font-style: italic; border-radius: 0 4px 4px 0; }
        .rte-content hr { border: none; border-top: 1px solid #d1d5db; margin: 1rem 0; }
        .rte-content strong, .rte-content b { font-weight: 700; }
        .rte-content em, .rte-content i { font-style: italic; }
        .rte-content u { text-decoration: underline; }
      `}</style>
    </div>
  );
}
