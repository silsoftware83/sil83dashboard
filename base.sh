#!/bin/bash

# Ruta base del proyecto (puedes cambiarla o dejar . para el directorio actual)
BASE_DIR="."

echo "📁 Creando estructura de carpetas para el dashboard..."

# Carpetas principales
mkdir -p $BASE_DIR/{public,src}

# Public
mkdir -p $BASE_DIR/public/{images,icons,fonts}

# Src
mkdir -p $BASE_DIR/src/{assets,components,features,pages,hooks,context,services,store,utils,styles,routes}

# Assets
mkdir -p $BASE_DIR/src/assets/{images,icons,fonts}

# Components
mkdir -p $BASE_DIR/src/components/{ui,layout,charts}

# Features
mkdir -p $BASE_DIR/src/features/{users,reports,settings}
mkdir -p $BASE_DIR/src/features/users/{components,pages,hooks,services}
mkdir -p $BASE_DIR/src/features/reports/{components,pages,hooks,services}
mkdir -p $BASE_DIR/src/features/settings/{components,pages,hooks,services}

# Services
mkdir -p $BASE_DIR/src/services/{api,helpers}

echo "✅ Estructura de carpetas creada exitosamente."
