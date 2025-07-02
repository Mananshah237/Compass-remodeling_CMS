"use client";

import { useState, createContext, useContext } from "react";
import { PostProvider } from "@/contexts/post-context";
import { Header } from "@/components/header";

const HeaderVisibilityContext = createContext({
  visible: true,
  setVisible: (v: boolean) => {},
});

export function useHeaderVisibility() {
  return useContext(HeaderVisibilityContext);
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [headerVisible, setHeaderVisible] = useState(true);

  return (
    <PostProvider>
      <HeaderVisibilityContext.Provider value={{ visible: headerVisible, setVisible: setHeaderVisible }}>
        <div className="min-h-screen flex flex-col bg-gray-100">
          <Header collapsible visible={headerVisible} onToggle={() => setHeaderVisible((v) => !v)} />
          <div style={{ marginTop: headerVisible ? 64 : 0, transition: 'margin-top 0.3s' }}>
            {children}
          </div>
        </div>
      </HeaderVisibilityContext.Provider>
    </PostProvider>
  );
} 