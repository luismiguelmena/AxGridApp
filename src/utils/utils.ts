import type { BaseOffering, EnergyType, SolarOffering, WindOffering, HydroOffering, GasOffering, KineticOffering, ThermalOffering } from "../modules/Offers/interfaces/interfaces";


const energyTypes: EnergyType[] = ["solar", "wind", "hydro", "gas", "kinetic", "thermal"];
const paymentTerms: string[] = ["Wire transfer", "Credit card", "Bank transfer"];
const contractTerms: string[] = ["1 year", "2 years", "3 years", "4 years"];
const locations: string[] = ["Madrid, Spain", "Seville, Spain", "Barcelona, Spain", "Valencia, Spain", "Bilbao, Spain", "Malaga, Spain", "Alicante, Spain", "Murcia, Spain", "Palma de Mallorca, Spain", "Granada, Spain", "Zaragoza, Spain", "Vigo, Spain", "Oviedo, Spain", "Badajoz, Spain", "Córdoba, Spain", "Sevilla, Spain", "Cádiz, Spain", "Málaga, Spain", "Murcia, Spain", "Palma de Mallorca, Spain", "Granada, Spain", "Zaragoza, Spain", "Vigo, Spain", "Oviedo, Spain", "Badajoz, Spain", "Córdoba, Spain", "Sevilla, Spain", "Cádiz, Spain"];

export const generateRandomOffer = (id: number): BaseOffering => {
  const type = energyTypes[Math.floor(Math.random() * energyTypes.length)];

  const baseOffer: BaseOffering = {
    id: id.toString(),
    type,
    price: Math.floor(Math.random() * 200) + 50,
    minimumQuantity: Math.floor(Math.random() * 500) + 50,
    contractTerms: contractTerms[Math.floor(Math.random() * contractTerms.length)],
    paymentTerms: paymentTerms[Math.floor(Math.random() * paymentTerms.length)],
    capacity: Math.floor(Math.random() * 1000) + 100,
    location: locations[Math.floor(Math.random() * locations.length)],
    confirmed: false,
  };

  switch (type) {
    case "solar":
      return {
        ...baseOffer,
        type: "solar",
        energyOutputPredictions: Array.from({ length: 7 }, () => Math.floor(Math.random() * 1000)),
        timeOfAvailability: Array.from({ length: 7 }, (_, i) => `Day ${i + 1}`),
      } as SolarOffering;

    case "wind":
      return {
        ...baseOffer,
        type: "wind",
        windSpeedPredictions: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)),
        turbineEfficiency: Math.random() * 100,
        timeOfAvailability: Array.from({ length: 7 }, (_, i) => `Day ${i + 1}`),
        certifications: ["REC"],
      } as WindOffering;

    case "hydro":
      return {
        ...baseOffer,
        type: "hydro",
        waterFlowRate: Math.floor(Math.random() * 500),
        reservoirLevel: Math.floor(Math.random() * 100),
        regulatoryCompliance: Math.random() < 0.5,
        flexibilityOfSupply: "medium",
        storageCapacity: Math.floor(Math.random() * 200),
        energyStorage: Math.floor(Math.random() * 200),
      } as HydroOffering;

    case "gas":
      return {
        ...baseOffer,
        type: "gas",
        deliveryMethod: Math.random() < 0.5 ? "pipeline" : "lng",
        flexibilityOfSupply: "high",
        contractLength: `${Math.floor(Math.random() * 5) + 1} years`,
        emissionCredits: Math.floor(Math.random() * 100),
      } as GasOffering;

    case "kinetic":
      return {
        ...baseOffer,
        type: "kinetic",
        energyConversionEfficiency: Math.random() * 100,
        predictabilityOfSource: "medium",
      } as KineticOffering;

    case "thermal":
      return {
        ...baseOffer,
        type: "thermal",
        heatSourceStability: "high",
        temperatureGradient: Math.floor(Math.random() * 100),
        conversionEfficiency: Math.random() * 100,
        environmentalImpact: "low",
      } as ThermalOffering;

    default:
      return baseOffer;
  }
};
