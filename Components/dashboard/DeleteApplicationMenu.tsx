"use client";

import {  MoreVertical, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface DeleteApplicationMenuProps {
  appId: string;
}

export default function DeleteApplicationMenu({
  appId,
}: DeleteApplicationMenuProps) {
  const onDelete = async (id: string) => {
    const confirmed = confirm(
      "Are you sure you want to delete this application?"
    );
    if (!confirmed) return;

    const res = await fetch(`/api/applications/${id}/delete`, {
      method: "DELETE",
    });

    if (res.ok) {
      // Optional: refetch or update state to remove the item from UI
      alert("Deleted successfully");
    } else {
      alert("Failed to delete");
    }
  };


  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect
  (() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={menuRef}>
      {/* Icon Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
        title="Open menu"
        aria-label="Open menu"
      >
        <MoreVertical className="w-5 h-5 text-gray-600" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <button
            onClick={() => {
              setOpen(false);
              onDelete(appId);
            }}
            className="w-full px-4 py-2 flex items-center text-sm text-red-600 hover:bg-red-100 rounded-md"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Application
          </button>
        </div>
      )}
    </div>
  );
}
