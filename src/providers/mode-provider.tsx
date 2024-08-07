'use client'

import { createContext, useContext } from "react";

type Mode = {
  business: boolean
  colors: {
      primary: string
      secondary: string
      background: string
  }
}

const clientMode: Mode = {
  business: false,
  colors: {
      primary: "text-emerald-950",
      secondary: "text-gray-400",
      background: "bg-white"
  }
}

const businessMode: Mode = {
  business: true,
  colors: {
      primary: "text-white",
      secondary: "text-gray-400",
      background: "bg-emerald-950"
  }
}

const ModeContext = createContext<Mode>(clientMode);

export const ModeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ModeContext.Provider value={clientMode}>
      {children}
    </ModeContext.Provider>
  )
}

export const useMode = () => useContext(ModeContext);