import { Text } from "@radix-ui/themes";
import type { EnergyOffering } from "./interfaces/interfaces";
import gasImage from "../../assets/images/gas.jpg";
import solarImage from "../../assets/images/solar.jpg";
import windImage from "../../assets/images/wind.jpg";
import hydroImage from "../../assets/images/hydro.jpg";
import kineticImage from "../../assets/images/kinetic.jpg";
import thermalImage from "../../assets/images/thermal.jpg";

export const images: Record<string, string> = {
  gas: gasImage,
  wind: windImage,
  solar: solarImage,
  kinetic: kineticImage,
  hydro: hydroImage,
  thermal: thermalImage,
};

export const detailRenderers: Record<
  EnergyOffering["type"],
  (offer: any) => React.ReactElement
> = {
  solar: (offer) => (
    <>
      <Text size="2">Horas: {offer.timeOfAvailability?.join(", ")}</Text>
      <Text size="2">
        Predicciones: {offer.energyOutputPredictions?.join(", ")} kWh
      </Text>
    </>
  ),
  gas: (offer) => (
    <>
      <Text size="2">Delivery method: {offer.deliveryMethod}</Text>
      <Text size="2">Contract Length: {offer.contractLength}</Text>
      <Text size="2">Flexibility of Supply: {offer.flexibilityOfSupply}</Text>
      {offer.emissionCredits !== undefined && (
        <Text size="2">
          Emission Credits or Penalties: {offer.emissionCredits}
        </Text>
      )}
    </>
  ),
  wind: (offer) => (
    <>
      <Text size="2">
        Wind Speed Predictions: {offer.windSpeedPredictions.join(", ")} m/s
      </Text>
      <Text size="2">
        Turbine Efficiency: {Math.round(offer.turbineEfficiency * 100)}%
      </Text>
      <Text size="2">
        Time of Availability: {offer.timeOfAvailability.join(", ")}
      </Text>
      <Text size="2">Certifications: {offer.certifications.join(", ")}</Text>
    </>
  ),
  hydro: (offer) => (
    <>
      <Text size="2">Water Flow Rate: {offer.waterFlowRate} m³/s</Text>
      <Text size="2">Reservoir Level: {offer.reservoirLevel} m</Text>
      <Text size="2">
        Flexibility of Supply: {offer.flexibilityOfSupply ?? "N/A"}
      </Text>
      <Text size="2">Regulatory Compliance: {offer.regulatoryCompliance}</Text>
      <Text size="2">Energy Storage: {offer.energyStorage}</Text>
    </>
  ),
  kinetic: (offer) => (
    <>
      <Text size="2">
        Energy Conversion Efficiency:{" "}
        {Math.round(offer.energyConversionEfficiency * 100)}%
      </Text>
      <Text size="2">
        Predictability of Source: {offer.predictabilityOfSource}
      </Text>
    </>
  ),
  thermal: (offer) => (
    <>
      <Text size="2">Heat Source Stability: {offer.heatSourceStability}</Text>
      <Text size="2">Temperature Gradient: {offer.temperatureGradient}°C</Text>
      <Text size="2">
        Conversion Efficiency: {Math.round(offer.conversionEfficiency * 100)}%
      </Text>
      <Text size="2">Environmental Impact: {offer.environmentalImpact}</Text>
    </>
  ),
};
