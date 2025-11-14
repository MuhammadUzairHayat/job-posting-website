"use client"
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function TextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      theme="snow"
      placeholder="Write job description here..."
      className="bg-white"
    />
  );
}

