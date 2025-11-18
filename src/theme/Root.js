import React, { useEffect } from 'react';
import { useColorMode } from '@docusaurus/theme-common';

export default function Root({ children }) {
  const { colorMode } = useColorMode();

  useEffect(() => {
    // Send theme change to parent window (Portfolio)
    if (window.parent !== window) {
      try {
        window.parent.postMessage(
          {
            type: 'DOCUSAURUS_THEME_CHANGE',
            theme: colorMode
          },
          'https://arlindbekjiri.com' // Your portfolio domain
        );

        console.log('Theme message sent to parent:', colorMode);
      } catch (error) {
        console.log('Could not send theme to parent:', error);
      }
    }
  }, [colorMode]);

  return <>{children}</>;
}