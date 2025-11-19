import React from 'react'

interface Props {
    darkMode: boolean
    setSidebarOpen: (value: boolean) => void
    setDarkMode: (value: boolean) => void
    sidebarOpen: boolean;
}

export const Navbar: ({ darkMode, setDarkMode }: Props) => React.JSX.Element = ({ darkMode, setDarkMode }: Props) => {
  console.log("🚀 ~ Navbar ~ setDarkMode:", setDarkMode)
  console.log("🚀 ~ Navbar ~ darkMode:", darkMode)
  return (
    <div>Navbar</div>
  )
}
