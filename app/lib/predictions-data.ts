export type AvailabilityLevel = "High" | "Medium" | "Low"

export interface ZonePrediction {
  id: string
  name: string
  availability: AvailabilityLevel
  confidence: number
  trendData: { day: string; value: number }[]
  factors: {
    waterTemp: string
    moonPhase: string
    tideConditions: string
    windSpeed: string
  }
  predictions: {
    catchVolume: string
    weatherPatterns: string
    seasonalMigration: string
  }
  recommendations: string[]
}

export interface FishSpecies {
  id: string
  name: string
  availability: AvailabilityLevel
  currentStock: string
  avgPrice: string
  confidence: number
  trendDirection: "up" | "down" | "stable"
}

export interface WeeklyChange {
  id: string
  name: string
  status: "Improved Conditions" | "Remains Stable" | "Conditions Declined"
  previous: { availability: AvailabilityLevel; confidence: number }
  updated: { availability: AvailabilityLevel; confidence: number }
  confidenceChange: number
}

export const zonePredictions: ZonePrediction[] = [
  {
    id: "north-bay",
    name: "North Bay Zone",
    availability: "High",
    confidence: 87,
    trendData: [
      { day: "Mon", value: 65 },
      { day: "Tue", value: 72 },
      { day: "Wed", value: 78 },
      { day: "Thu", value: 82 },
      { day: "Fri", value: 85 },
      { day: "Sat", value: 88 },
      { day: "Sun", value: 87 },
    ],
    factors: {
      waterTemp: "Optimal",
      moonPhase: "Waxing Gibbous",
      tideConditions: "High Tide",
      windSpeed: "5-10 knots",
    },
    predictions: {
      catchVolume: "Your historical data shows consistent patterns",
      weatherPatterns: "Favorable conditions detected for next 7 days",
      seasonalMigration: "Peak season for this location",
    },
    recommendations: [
      "Plan fishing trips during early morning hours (5-8 AM)",
      "Use live bait for better catch rates in these conditions",
      "Focus on areas with depth between 20-35 meters",
    ],
  },
  {
    id: "coastal-ridge",
    name: "Coastal Ridge",
    availability: "Medium",
    confidence: 72,
    trendData: [
      { day: "Mon", value: 75 },
      { day: "Tue", value: 70 },
      { day: "Wed", value: 68 },
      { day: "Thu", value: 65 },
      { day: "Fri", value: 72 },
      { day: "Sat", value: 70 },
      { day: "Sun", value: 72 },
    ],
    factors: {
      waterTemp: "Optimal",
      moonPhase: "Waxing Gibbous",
      tideConditions: "High Tide",
      windSpeed: "5-10 knots",
    },
    predictions: {
      catchVolume: "Your historical data shows consistent patterns",
      weatherPatterns: "Favorable conditions detected for next 7 days",
      seasonalMigration: "Peak season for this location",
    },
    recommendations: [
      "Plan fishing trips during early morning hours (5-8 AM)",
      "Use live bait for better catch rates in these conditions",
      "Focus on areas with depth between 20-35 meters",
    ],
  },
  {
    id: "deep-water",
    name: "Deep Water Point",
    availability: "Low",
    confidence: 65,
    trendData: [
      { day: "Mon", value: 55 },
      { day: "Tue", value: 50 },
      { day: "Wed", value: 48 },
      { day: "Thu", value: 52 },
      { day: "Fri", value: 58 },
      { day: "Sat", value: 62 },
      { day: "Sun", value: 65 },
    ],
    factors: {
      waterTemp: "Optimal",
      moonPhase: "Waxing Gibbous",
      tideConditions: "High Tide",
      windSpeed: "5-10 knots",
    },
    predictions: {
      catchVolume: "Your historical data shows consistent patterns",
      weatherPatterns: "Favorable conditions detected for next 7 days",
      seasonalMigration: "Peak season for this location",
    },
    recommendations: [
      "Plan fishing trips during early morning hours (5-8 AM)",
      "Use live bait for better catch rates in these conditions",
      "Focus on areas with depth between 20-35 meters",
    ],
  },
  {
    id: "eastern-reef",
    name: "Eastern Reef",
    availability: "High",
    confidence: 91,
    trendData: [
      { day: "Mon", value: 80 },
      { day: "Tue", value: 82 },
      { day: "Wed", value: 85 },
      { day: "Thu", value: 88 },
      { day: "Fri", value: 90 },
      { day: "Sat", value: 91 },
      { day: "Sun", value: 91 },
    ],
    factors: {
      waterTemp: "Optimal",
      moonPhase: "Waxing Gibbous",
      tideConditions: "High Tide",
      windSpeed: "5-10 knots",
    },
    predictions: {
      catchVolume: "Your historical data shows consistent patterns",
      weatherPatterns: "Favorable conditions detected for next 7 days",
      seasonalMigration: "Peak season for this location",
    },
    recommendations: [
      "Plan fishing trips during early morning hours (5-8 AM)",
      "Use live bait for better catch rates in these conditions",
      "Focus on areas with depth between 20-35 meters",
    ],
  },
  {
    id: "sunset-harbor",
    name: "Sunset Harbor",
    availability: "Medium",
    confidence: 78,
    trendData: [
      { day: "Mon", value: 70 },
      { day: "Tue", value: 73 },
      { day: "Wed", value: 76 },
      { day: "Thu", value: 74 },
      { day: "Fri", value: 78 },
      { day: "Sat", value: 77 },
      { day: "Sun", value: 78 },
    ],
    factors: {
      waterTemp: "Optimal",
      moonPhase: "Waxing Gibbous",
      tideConditions: "High Tide",
      windSpeed: "5-10 knots",
    },
    predictions: {
      catchVolume: "Your historical data shows consistent patterns",
      weatherPatterns: "Favorable conditions detected for next 7 days",
      seasonalMigration: "Peak season for this location",
    },
    recommendations: [
      "Plan fishing trips during early morning hours (5-8 AM)",
      "Use live bait for better catch rates in these conditions",
      "Focus on areas with depth between 20-35 meters",
    ],
  },
  {
    id: "whale-point",
    name: "Whale Point",
    availability: "High",
    confidence: 84,
    trendData: [
      { day: "Mon", value: 75 },
      { day: "Tue", value: 78 },
      { day: "Wed", value: 80 },
      { day: "Thu", value: 82 },
      { day: "Fri", value: 83 },
      { day: "Sat", value: 84 },
      { day: "Sun", value: 84 },
    ],
    factors: {
      waterTemp: "Optimal",
      moonPhase: "Waxing Gibbous",
      tideConditions: "High Tide",
      windSpeed: "5-10 knots",
    },
    predictions: {
      catchVolume: "Your historical data shows consistent patterns",
      weatherPatterns: "Favorable conditions detected for next 7 days",
      seasonalMigration: "Peak season for this location",
    },
    recommendations: [
      "Plan fishing trips during early morning hours (5-8 AM)",
      "Use live bait for better catch rates in these conditions",
      "Focus on areas with depth between 20-35 meters",
    ],
  },
]

export const fishSpecies: FishSpecies[] = [
  { id: "tuna", name: "Tuna", availability: "High", currentStock: "450 kg", avgPrice: "PHP 850/kg", confidence: 92, trendDirection: "up" },
  { id: "salmon", name: "Salmon", availability: "Medium", currentStock: "280 kg", avgPrice: "PHP 720/kg", confidence: 85, trendDirection: "up" },
  { id: "mackerel", name: "Mackerel", availability: "High", currentStock: "620 kg", avgPrice: "PHP 420/kg", confidence: 88, trendDirection: "up" },
  { id: "sardines", name: "Sardines", availability: "Low", currentStock: "120 kg", avgPrice: "PHP 380/kg", confidence: 78, trendDirection: "down" },
  { id: "snapper", name: "Snapper", availability: "Medium", currentStock: "340 kg", avgPrice: "PHP 950/kg", confidence: 81, trendDirection: "up" },
  { id: "grouper", name: "Grouper", availability: "High", currentStock: "520 kg", avgPrice: "PHP 1100/kg", confidence: 90, trendDirection: "up" },
]

export const weeklyChanges: WeeklyChange[] = [
  {
    id: "north-bay",
    name: "North Bay Zone",
    status: "Improved Conditions",
    previous: { availability: "Medium", confidence: 78 },
    updated: { availability: "High", confidence: 87 },
    confidenceChange: 9,
  },
  {
    id: "eastern-reef",
    name: "Eastern Reef",
    status: "Improved Conditions",
    previous: { availability: "High", confidence: 85 },
    updated: { availability: "High", confidence: 91 },
    confidenceChange: 6,
  },
  {
    id: "coastal-ridge",
    name: "Coastal Ridge",
    status: "Conditions Declined",
    previous: { availability: "High", confidence: 81 },
    updated: { availability: "Medium", confidence: 72 },
    confidenceChange: -9,
  },
  {
    id: "sunset-harbor",
    name: "Sunset Harbor",
    status: "Remains Stable",
    previous: { availability: "Medium", confidence: 74 },
    updated: { availability: "Medium", confidence: 78 },
    confidenceChange: 4,
  },
  {
    id: "deep-water",
    name: "Deep Water Point",
    status: "Remains Stable",
    previous: { availability: "Low", confidence: 62 },
    updated: { availability: "Low", confidence: 65 },
    confidenceChange: 3,
  },
  {
    id: "whale-point",
    name: "Whale Point",
    status: "Improved Conditions",
    previous: { availability: "Medium", confidence: 76 },
    updated: { availability: "High", confidence: 84 },
    confidenceChange: 8,
  },
]

export const weeklyInsights = [
  "North Bay Zone and Whale Point have shown significant improvement, moving from Medium to High availability with increased confidence levels.",
  "Coastal Ridge conditions have declined from High to Medium due to recent weather pattern changes. Consider alternative locations this week.",
  "Eastern Reef maintains High availability with a confidence boost to 91%, making it your most reliable location this week.",
  "Overall, 3 out of 6 locations have improved conditions, suggesting favorable fishing opportunities for the week ahead.",
]
