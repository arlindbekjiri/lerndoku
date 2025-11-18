import React, { useEffect } from "react";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

export default function Root({ children }) {
  useEffect(() => {
    // Only run in browser, not during SSG
    if (!ExecutionEnvironment.canUseDOM) {
      return;
    }

    const sendThemeToParent = () => {
      if (window.parent !== window) {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme") || "light";

        try {
          window.parent.postMessage(
            {
              type: "DOCUSAURUS_THEME_CHANGE",
              theme: currentTheme,
            },
            "*",
          );
          console.log("✅ Theme sent to parent:", currentTheme);
        } catch (error) {
          console.log("❌ Could not send theme to parent:", error);
        }
      }
    };

    // Send initial theme
    sendThemeToParent();

    // Watch for theme changes on <html> element
    const html = document.documentElement;
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-theme"
        ) {
          sendThemeToParent();
        }
      });
    });

    observer.observe(html, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return <>{children}</>;
}
