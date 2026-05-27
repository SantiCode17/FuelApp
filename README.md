# FuelApp

A React Native + Expo app to find fuel stations and compare prices in Spain, France and Portugal.

![Expo](https://img.shields.io/badge/Expo-SDK-000020?logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-0.7x-61dafb?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)
![NativeWind](https://img.shields.io/badge/NativeWind-Tailwind-38bdf8?logo=tailwindcss&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow)

## Overview

Cross-platform mobile app that lets drivers browse fuel stations in Spain, France and Portugal by province, search around a custom radius on the map, or list stations near a chosen one. Built on top of the public [precioil](https://api.precioil.es/) API as the multimedia/mobile-development coursework for the DAM diploma.

## Tech Stack

- **Expo Router** — file-based navigation
- **NativeWind** — Tailwind CSS for React Native
- **TanStack React Query** — server-state management
- **Zustand** — global state
- **Axios** — HTTP client
- **expo-location** — geolocation
- **react-native-maps** — Google Maps integration

## Features

- Hierarchical browse: Province → Municipality → Station
- Station detail screen with 30-day price history
- Radius search on the map with adjustable distance
- "Nearby stations" — find stations within 10 km of a chosen one
- Cached server state with React Query

## Getting Started

### Prerequisites

- Node.js ≥ 18
- Expo CLI (`npx expo`)
- A Google Maps API key (required for the Android map view)

### Installation

```bash
git clone https://github.com/SantiCode17/FuelApp.git
cd FuelApp
npm install
```

### Configuration

Add your Google Maps API key in `app.json`:

```json
"android": {
  "config": {
    "googleMaps": {
      "apiKey": "YOUR_GOOGLE_MAPS_API_KEY"
    }
  }
}
```

### Usage

```bash
npm start
```

Scan the QR with Expo Go or press `a` for an Android emulator.

## Project Structure

```
FuelApp/
├── app/                  Expo Router (routes and screens)
│   ├── (stack)/
│   │   ├── (drawer)/
│   │   │   └── (tabs)/   Stations · Radius map · Nearby
│   │   └── station/[id]  Station detail
├── components/           Shared UI + station components
├── core/                 Business logic (Axios setup, use cases, utils)
├── infrastructure/       Type interfaces and mappers
└── presentation/         Hooks (React Query) + Zustand store
```

## API

The app consumes the public [precioil](https://api.precioil.es/) API:

| Endpoint | Description |
| --- | --- |
| `/provincias` | List provinces |
| `/municipios/provincia/:id` | Municipalities of a province |
| `/estaciones/municipio/:id` | Stations of a municipality |
| `/estaciones/detalles/:id` | Station details |
| `/estaciones/historico/:id` | 30-day price history |
| `/estaciones/radio` | Stations within a radius (paginated) |
| `/estaciones/cerca/:id` | Stations near another station |

## License

Released under the [MIT License](LICENSE). Originally developed as academic coursework for the Mobile Programming module at IES Salvador Gadea.

## Author

**Santiago Sánchez March** — [GitHub](https://github.com/SantiCode17) · [LinkedIn](https://www.linkedin.com/in/santiago-s%C3%A1nchez-march/)
