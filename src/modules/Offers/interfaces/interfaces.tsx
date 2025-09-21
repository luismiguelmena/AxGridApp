// types/Energy.ts
export type EnergyType = 
  | "solar"
  | "gas"
  | "wind"
  | "hydro"
  | "kinetic"
  | "thermal";

export interface BaseOffering {
  id: string;
  type: EnergyType;
  price: number;
  minimumQuantity: number;
  contractTerms:string;
  paymentTerms:string;
  capacity: number;
  location: string;
  certifications?: string[]; 
  confirmed: boolean;
}

export interface SolarOffering extends BaseOffering {
  type: "solar";
  energyOutputPredictions: number[];
  timeOfAvailability: string[];
}

export interface GasOffering extends BaseOffering {
  type: "gas";
  deliveryMethod: "pipeline" | "lng";
  flexibilityOfSupply: string;
  emissionCredits?: number;
  contractLength: string;
}

export interface WindOffering extends BaseOffering {
  type: "wind";
  windSpeedPredictions: number[];
  turbineEfficiency: number;
  timeOfAvailability: string[];
}

export interface HydroOffering extends BaseOffering {
  type: "hydro";
  waterFlowRate: number;
  reservoirLevel: number;
  regulatoryCompliance: boolean;
  flexibilityOfSupply: string;
  energyStorage?: number;
}

export interface KineticOffering extends BaseOffering {
  type: "kinetic";
  energyConversionEfficiency: number;
  predictabilityOfSource: string;
}

export interface ThermalOffering extends BaseOffering {
  type: "thermal";
  heatSourceStability: string;
  temperatureGradient: number;
  conversionEfficiency: number;
  environmentalImpact: string;
}

export type EnergyOffering =
  | SolarOffering
  | GasOffering
  | WindOffering
  | HydroOffering
  | KineticOffering
  | ThermalOffering;

