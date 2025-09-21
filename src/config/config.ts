import type { EnergyConfig, FieldConfig } from "../components/Form/interfaces";
import type { EnergyType } from "../modules/Offers/interfaces/interfaces";

const baseCommonFields: FieldConfig[] = [
    { name: "price", label: "Price (€/MWh)", type: "number" ,placeholder:"Ex: 100"},
    { name: "minQuantity", label: "Quantity (MWh)", type: "number" ,placeholder:"Ex: 100"},
    { name: "contractTerms", label: "Contract Terms", type: "text" ,placeholder:"Ex: 12 month"},
    { name: "paymentTerms", label: "Payment Terms", type: "text" }
  ];
  
export const energyConfig: Record<EnergyType, EnergyConfig> = {
  solar: {
    specific: [
      { name: "capacity", label: "Capacity (MW)", type: "number", placeholder:"Ex: 100"},
      { name: "location", label: "Location", type: "text", placeholder:"Ex: Madrid, Spain"},
      { name: "predictions", label: "Output Predictions", type: "text" },
      { name: "availability", label: "Time of Availability", type: "text", placeholder:"Ex: 08:00 - 18:00"},
      { name: "certifications", label: "Certifications", type: "text", placeholder:"Ex: ISO 14001"},
      { name: "timeOfAvailability", label: "Time of Availability", type: "text", placeholder:"Ex: Monday to Friday"},
      { name: "energyOutputPredictions", label: "Energy Output Predictions", type: "text", placeholder:"Ex: 500 MWh/mes"}
    ]
  },
  gas: {
    specific: [
      { name: "capacity", label: "Capacity (MW)", type: "number", placeholder:"Ex: 100"},
      { name: "deliveryMethod", label: "Delivery Method", type: "text" },
      { name: "supplyFlexibility", label: "Flexibility of Supply", type: "text", placeholder:"Ex: High"},
      { name: "emissionCredits", label: "Emission Credits / Penalties", type: "text", placeholder:"Ex: -200"},
      { name: "contractLength", label: "Contract Length", type: "text", placeholder:"Ex: 3 years"}
    ]
  },

  wind: {
    specific: [
      { name: "capacity", label: "Capacity (MW)", type: "number", placeholder:"Ex: 100"},
      { name: "location", label: "Location", type: "text", placeholder:"Ex: Madrid, Spain"},
      { name: "windSpeed", label: "Wind Speed Predictions", type: "text" },
      { name: "turbineEfficiency", label: "Turbine Efficiency (%)", type: "number", placeholder:"Ex: 87"},
      { name: "availability", label: "Time of Availability", type: "text", placeholder:"Ex: 08:00 - 18:00"},
      { name: "certifications", label: "Certifications", type: "text", placeholder:"Ex: ISO 14001"}
    ]
  },

  hydro: {
    specific: [
      { name: "capacity", label: "Capacity (MW)", type: "number", placeholder:"Ex: 100"},
      { name: "waterFlowRate", label: "Water Flow Rate (m³/s)", type: "number", placeholder:"Ex: 100"},
      { name: "reservoirLevel", label: "Reservoir Level (%)", type: "number", placeholder:"Ex: 100"},
      { name: "regulatoryCompliance", label: "Regulatory Compliance", type: "text", placeholder:"Ex: ISO 14001"},
      { name: "supplyFlexibility", label: "Flexibility of Supply", type: "text", placeholder:"Ex: High"},
      { name: "storageCapacity", label: "Energy Storage Capacity (MWh)", type: "number", placeholder:"Ex: 100"}
    ]
  },

  thermal: {
    specific: [
      { name: "capacity", label: "Capacity (MW)", type: "number", placeholder:"Ex: 100"},
      { name: "heatSourceStability", label: "Heat Source Stability", type: "text", placeholder:"Ex: High"},
      { name: "temperatureGradient", label: "Temperature  (°C)", type: "number", placeholder:"Ex: 100"},
      { name: "conversionEfficiency", label: "Efficiency (%)", type: "number" ,placeholder:"Ex: 87"},
      { name: "location", label: "Location", type: "text", placeholder:"Ex: Madrid, Spain"},
      { name: "environmentalImpact", label: "Environmental Impact", type: "text" }
    ]
  },
  kinetic: {
    specific: [
      { name: "energyConversionEfficiency", label: "Efficiency (%)", type: "number" ,placeholder:"Ex: 87"},
      { name: "predictabilityOfSource", label: "Predictability of Source", type: "text", placeholder:"Ex: High"}
    ]
  }
};

export const getEnergyFields = (type: EnergyType): FieldConfig[] => {
    return [...baseCommonFields, ...energyConfig[type].specific];
  };
