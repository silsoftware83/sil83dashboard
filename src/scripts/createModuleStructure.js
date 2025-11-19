#!/usr/bin/env node
/**
 * Script interactivo para crear la estructura base de un módulo.
 * Uso:
 *    node createModuleStructure.js
 */

import fs from "fs";
import path from "path";
import readline from "readline";

// Función auxiliar para capitalizar nombres
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Interfaz para leer desde consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Preguntar nombre del módulo
rl.question("🧩 Ingresa el nombre del módulo: ", (moduleName) => {
  if (!moduleName) {
    console.error("❌ Debes ingresar un nombre válido.");
    rl.close();
    process.exit(1);
  }

  const currentDir = process.cwd(); // carpeta actual donde se ejecuta
  const modulePath = path.join(currentDir, moduleName);

  const folders = [
    "components",
    "services",
    "hooks",
    "types",
    "utils",
    "constants",
    "styles",
    "[id]"
  ];

  const files = [
    {
      name: "index.tsx",
      content: `// Página principal del módulo ${moduleName}
export default function ${capitalize(moduleName)}Page() {
  return <div>${capitalize(moduleName)} works!</div>;
}
`
    },
    {
      name: "nuevo.tsx",
      content: `// Página para crear nuevo registro en ${moduleName}
export default function Nuevo${capitalize(moduleName)}() {
  return <div>Nuevo ${capitalize(moduleName)}</div>;
}
`
    },
    {
      name: "[id]/index.tsx",
      content: `// Detalle del elemento seleccionado de ${moduleName}
export default function ${capitalize(moduleName)}Detalle() {
  return <div>Detalle de ${capitalize(moduleName)}</div>;
}
`
    }
  ];

  // Crear carpeta base
  if (!fs.existsSync(modulePath)) {
    fs.mkdirSync(modulePath);
    console.log(`📁 Creada carpeta: ${moduleName}`);
  } else {
    console.warn(`⚠️ La carpeta "${moduleName}" ya existe. Se agregarán las subcarpetas faltantes.`);
  }

  // Crear subcarpetas
  folders.forEach(folder => {
    const folderPath = path.join(modulePath, folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
      console.log(`  📂 ${folder}/`);
    }
  });

  // Crear archivos base
  files.forEach(file => {
    const filePath = path.join(modulePath, file.name);
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, file.content);
      console.log(`  📝 ${file.name}`);
    } else {
      console.warn(`  ⚠️ ${file.name} ya existe, no se sobrescribió.`);
    }
  });

  console.log(`✅ Estructura creada correctamente para el módulo "${moduleName}".`);
  rl.close();
});