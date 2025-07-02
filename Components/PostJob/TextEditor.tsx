"use client"
import ReactQuill from 'react-quill-new';
import "react-quill/dist/quill.snow.css";
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

