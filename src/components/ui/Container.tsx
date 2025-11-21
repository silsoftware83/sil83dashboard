import { useTheme } from '../../context/ThemeContext'

const Container = ({ children }: any) => {
  const { darkMode } = useTheme()

  return (
    <div
      className={`
        min-h-screen w-full overflow-y-auto
        ${darkMode 
          ? 'bg-gray-700 text-white' 
          : 'bg-gray-50 text-gray-900'
        } 
        p-4 rounded-2xl
      `}
    >
      {children}
    </div>
  )
}

export default Container
