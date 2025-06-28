"use client";

import { useEffect } from "react";

export function useTitleHeader(title, setTitleHeader) {
  useEffect(() => {
    if (setTitleHeader && title) {
      setTitleHeader(title);
    }

    return () => {
      if (setTitleHeader) {
        setTitleHeader("Dashboard");
      }
    };
  }, [title, setTitleHeader]);
}
