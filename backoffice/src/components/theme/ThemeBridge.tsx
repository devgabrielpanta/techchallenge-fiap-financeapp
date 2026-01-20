"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export function ThemeBridge() {
  const theme = useSelector((state: RootState) => state.global.theme);

  useEffect(() => {
    const iframes = document.querySelectorAll("iframe");

    iframes.forEach((iframe) => {
      iframe.contentWindow?.postMessage({ type: "SET_THEME", theme }, "*");
    });
  }, [theme]);

  return null;
}
