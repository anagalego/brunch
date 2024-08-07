'use client'

import { createContext, SetStateAction, useContext, useState } from "react";

type Mode = {
  business: boolean
  colors: {
      primary: string
      secondary: string
      background: string
  }
}

interface ModeContextProps {
  mode: Mode;
  toggleMode: () => void
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

const ModeContext = createContext<ModeContextProps>({
  mode: clientMode,
  toggleMode: () => null
});


export const ModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState(clientMode);

  const toggleMode = () => {
    setMode(mode.business ? clientMode : businessMode)
  }

  return (
    <ModeContext.Provider value={{mode, toggleMode}}>
      {children}
    </ModeContext.Provider>
  )
}

export const useMode = () => useContext(ModeContext);