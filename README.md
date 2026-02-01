# FuelApp

Aplicación React Native con Expo para buscar estaciones de combustible en España, Francia y Portugal.

## 📱 Características

- **Listado de Provincias → Municipios → Estaciones**: Navegación jerárquica para encontrar estaciones
- **Detalles de Estación**: Información completa incluyendo historial de precios de 30 días
- **Mapa por Radio**: Busca estaciones cercanas a tu ubicación con radio personalizable
- **Estaciones Cercanas**: Encuentra estaciones en un radio de 10km desde otra estación

## 🛠️ Tecnologías

- **Expo Router** - Navegación
- **NativeWind** - Estilos con Tailwind CSS
- **TanStack Query** - Gestión de estado del servidor
- **Zustand** - Gestión del estado global
- **Axios** - Cliente HTTP
- **expo-location** - Geolocalización
- **react-native-maps** - Mapas de Google

## 📋 Requisitos

- Node.js 18+
- Expo CLI
- API Key de Google Maps (para Android)

## 🚀 Instalación

```bash
# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm start
```

## ⚙️ Configuración

### Google Maps API Key (Android)

1. Obtén una API Key en [Google Cloud Console](https://console.cloud.google.com/)
2. Habilita la API de Google Maps para Android
3. Actualiza `app.json`:

```json
"android": {
  "config": {
    "googleMaps": {
      "apiKey": "TU_API_KEY_AQUI"
    }
  }
}
```

## 📁 Estructura del Proyecto

```
FuelApp/
├── app/                        # Expo Router (Rutas y Pantallas)
│   ├── _layout.tsx             # Configuración global
│   ├── global.css              # Estilos globales
│   ├── (stack)/                # Stack principal
│   │   ├── (drawer)/           # Drawer
│   │   │   ├── (tabs)/         # Tabs
│   │   │   │   ├── stations/   # Tab 1: Listados
│   │   │   │   ├── map/        # Tab 2: Mapa por radio
│   │   │   │   └── nearby/     # Tab 3: Cerca de estación
│   │   └── station/[id]        # Detalles de estación
│
├── components/                 # Componentes
│   ├── shared/                 # Loader, ErrorView, Button...
│   └── fuel/                   # StationCard, PriceList...
│
├── core/                       # Lógica de Negocio
│   ├── api/                    # Configuración Axios
│   ├── actions/                # Casos de uso
│   └── utils/                  # Utilidades (fuel-types)
│
├── infrastructure/             # Adaptadores
│   ├── interfaces/             # Tipos TypeScript
│   └── mappers/                # Transformadores
│
└── presentation/               # Lógica de Vista
    ├── hooks/                  # Custom Hooks (TanStack Query)
    └── store/                  # Zustand (permisos)
```

## 🔗 API

Utiliza la API de **precioil**: https://api.precioil.es/

### Endpoints utilizados:

| Endpoint | Descripción |
|----------|-------------|
| `/provincias` | Listado de provincias |
| `/municipios/provincia/:id` | Municipios por provincia |
| `/estaciones/municipio/:id` | Estaciones por municipio |
| `/estaciones/detalles/:id` | Detalles de estación |
| `/estaciones/historico/:id` | Historial de precios |
| `/estaciones/radio` | Estaciones en un radio (con paginación) |
| `/estaciones/cerca/:id` | Estaciones cercanas a otra estación |

## 👨‍💻 Autor

Desarrollado por **SANTIAGO SANCHEZ MARCH** para la asignatura de Programación Multimedia y Dispositivos Móviles.

