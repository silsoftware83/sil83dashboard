import React from 'react'
interface Props {
  sidebarOpen: boolean
  darkMode: boolean
}

export const Sidebar: ({ darkMode, sidebarOpen }: Props) => React.JSX.Element = ({ darkMode, sidebarOpen }: Props) => {
  console.log("🚀 ~ Sidebar ~ sidebarOpen:", sidebarOpen)
  console.log("🚀 ~ Sidebar ~ darkMode:", darkMode)
  return (
    <div>Sidebar</div>
  )
}
