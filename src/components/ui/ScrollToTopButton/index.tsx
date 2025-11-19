import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTopButton({ darkMode=true, scrollContainerId = 'main-content' }) {
  const [isVisible, setIsVisible] = useState(false);

  // Mostrar botón cuando el usuario ha scrolleado hacia abajo
  useEffect(() => {
    const scrollContainer = document.getElementById(scrollContainerId);
    
    if (!scrollContainer) {
      console.error(`Contenedor con ID "${scrollContainerId}" no encontrado`);
      return;
    }

    const toggleVisibility = () => {
      const scrollTop = scrollContainer.scrollTop;
    
      if (scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    scrollContainer.addEventListener('scroll', toggleVisibility);

    return () => {
      scrollContainer.removeEventListener('scroll', toggleVisibility);
    };
  }, [scrollContainerId]);

  // Función para scroll hacia arriba
  const scrollToTop = () => {
    const scrollContainer = document.getElementById(scrollContainerId);
    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50 ${
            darkMode 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
          aria-label="Volver arriba"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </>
  );
}