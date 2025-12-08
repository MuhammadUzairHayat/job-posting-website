"use client";

import { useState, useCallback } from "react";

interface UseAdminActionsOptions {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function useAdminActions({ onSuccess, onError }: UseAdminActionsOptions = {}) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleApiCall = useCallback(
    async (
      url: string,
      method: string,
      body?: Record<string, unknown>,
      successMessage?: string
    ) => {
      setLoading(url);
      try {
        const response = await fetch(url, {
          method,
          headers: body ? { "Content-Type": "application/json" } : undefined,
          body: body ? JSON.stringify(body) : undefined,
        });

        if (response.ok) {
          const data = await response.json();
          if (successMessage) {
            alert(successMessage);
          }
          onSuccess?.();
          return data;
        } else {
          const errorMessage = "Operation failed";
          alert(errorMessage);
          onError?.(errorMessage);
          return null;
        }
      } catch (error) {
        console.error("Error:", error);
        const errorMessage = "An error occurred";
        alert(errorMessage);
        onError?.(errorMessage);
        return null;
      } finally {
        setLoading(null);
      }
    },
    [onSuccess, onError]
  );

  return {
    loading,
    handleApiCall,
  };
}
