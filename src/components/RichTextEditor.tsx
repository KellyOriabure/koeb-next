"use client";

import React, { useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link as LinkIcon,
  Strikethrough,
  Heading1,
  Heading2,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Enter content...",
  className = "",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const exec = useCallback((command: string, valueArg: string | undefined = undefined) => {
    document.execCommand(command, false, valueArg);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const insertLink = useCallback(() => {
    const url = prompt("Enter URL:");
    if (url) {
      exec("createLink", url);
    }
  }, [exec]);

  return (
    <div
      className={`border rounded-md bg-background ${
        isFocused ? "ring-2 ring-ring ring-offset-2" : ""
      } ${className}`}
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b p-2 bg-muted/30">
        <ToolbarButton
          icon={<Bold className="h-4 w-4" />}
          label="Bold"
          onClick={() => exec("bold")}
        />
        <ToolbarButton
          icon={<Italic className="h-4 w-4" />}
          label="Italic"
          onClick={() => exec("italic")}
        />
        <ToolbarButton
          icon={<Underline className="h-4 w-4" />}
          label="Underline"
          onClick={() => exec("underline")}
        />
        <ToolbarButton
          icon={<Strikethrough className="h-4 w-4" />}
          label="Strikethrough"
          onClick={() => exec("strikeThrough")}
        />
        <div className="w-px h-6 bg-border mx-1" />
        <ToolbarButton
          icon={<Heading1 className="h-4 w-4" />}
          label="Heading 1"
          onClick={() => exec("formatBlock", "H1")}
        />
        <ToolbarButton
          icon={<Heading2 className="h-4 w-4" />}
          label="Heading 2"
          onClick={() => exec("formatBlock", "H2")}
        />
        <div className="w-px h-6 bg-border mx-1" />
        <ToolbarButton
          icon={<List className="h-4 w-4" />}
          label="Bullet List"
          onClick={() => exec("insertUnorderedList")}
        />
        <ToolbarButton
          icon={<ListOrdered className="h-4 w-4" />}
          label="Numbered List"
          onClick={() => exec("insertOrderedList")}
        />
        <div className="w-px h-6 bg-border mx-1" />
        <ToolbarButton
          icon={<LinkIcon className="h-4 w-4" />}
          label="Link"
          onClick={insertLink}
        />
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className="min-h-[160px] p-3 outline-none prose prose-sm max-w-none"
        onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        dangerouslySetInnerHTML={{ __html: value }}
        data-placeholder={placeholder}
      />
    </div>
  );
}

function ToolbarButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="h-8 w-8 p-0"
      onClick={onClick}
      title={label}
    >
      {icon}
    </Button>
  );
}
