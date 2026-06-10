"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (element?: HTMLElement) => void;
      };
    };
  }
}

export function TwitterEmbed({ html }: { html: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.twttr?.widgets && containerRef.current) {
      window.twttr.widgets.load(containerRef.current);
    }
  }, [html]);

  function handleScriptLoad() {
    if (window.twttr?.widgets && containerRef.current) {
      window.twttr.widgets.load(containerRef.current);
    }
  }

  return (
    <>
      <Script
        src="https://platform.x.com/widgets.js"
        strategy="lazyOnload"
        onLoad={handleScriptLoad}
      />
      <div
        ref={containerRef}
        className="twitter-embed [&_blockquote]:!m-0"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
}
