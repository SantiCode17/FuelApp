// Mapeo de tipos de combustible por país

export const SPAIN_FUEL_TYPES: Record<number, string> = {
  1: "Biodiésel",
  2: "Bioetanol",
  3: "Gas Natural Comprimido",
  4: "Gas Natural Licuado",
  5: "Gases licuados del petróleo",
  6: "Gasóleo A",
  7: "Gasóleo B",
  8: "Gasóleo Premium",
  9: "Gasolina 95 E10",
  10: "Gasolina 95 E5",
  11: "Gasolina 95 E5 Premium",
  12: "Gasolina 98 E10",
  13: "Gasolina 98 E5",
  14: "Hidrógeno",
  15: "Gasóleo C",
};

export const FRANCE_FUEL_TYPES: Record<number, string> = {
  100: "SP98",
  101: "Gazole",
  102: "SP95",
  103: "E85",
  104: "E10",
  105: "GPLc",
};

export const PORTUGAL_FUEL_TYPES: Record<number, string> = {
  1120: "GPL Auto",
  1141: "GNC €/m3",
  1142: "GNL €/kg",
  1143: "GNC €/kg",
  2101: "Gasoleo simples",
  2105: "Gasoleo especial",
  2115: "Biodiesel B15",
  2150: "Gasoleo colorido",
  2155: "Gasóleo de aquecimento",
  3201: "Gasolina simples 95",
  3205: "Gasolina especial 95",
  3210: "Gasolina de mistura (motores a 2 tempos)",
  3400: "Gasolina 98",
  3405: "Gasolina especial 98",
};

// Combina todos los mapeos
export const ALL_FUEL_TYPES: Record<number, string> = {
  ...SPAIN_FUEL_TYPES,
  ...FRANCE_FUEL_TYPES,
  ...PORTUGAL_FUEL_TYPES,
};

export function getFuelTypeName(fuelTypeId: number): string {
  return ALL_FUEL_TYPES[fuelTypeId] || `Combustible ${fuelTypeId}`;
}

// Colores para cada tipo de combustible
export function getFuelTypeColor(fuelTypeId: number): string {
  // IDs personalizados de la app (del mapper)
  // 1: Gasolina 95, 2: Gasolina 98
  if ([1, 2, 9, 10, 11, 12, 13, 100, 102, 104, 3201, 3205, 3400, 3405].includes(fuelTypeId)) {
    return "#22c55e"; // Verde
  }
  // 3: Diésel, 4: Diésel Premium, 6: Diésel B
  if ([3, 4, 6, 1, 6, 7, 8, 15, 101, 2101, 2105, 2115, 2150, 2155].includes(fuelTypeId)) {
    return "#f97316"; // Naranja
  }
  // 5: GLP
  if ([5, 3, 4, 105, 1120, 1141, 1142, 1143].includes(fuelTypeId)) {
    return "#3b82f6"; // Azul
  }
  // Bioetanol/Otros
  return "#8b5cf6"; // Púrpura
}
