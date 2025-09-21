import { useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import SelectComponent from "../Select/Select";
import { energyConfig } from "../../config/config";
import {
  Box,
  Button,
  Flex,
  Text,
  TextField,
  Grid,
  Heading,
} from "@radix-ui/themes";
import { getEnergyFields } from "../../config/config";
import { useEnergyStore } from "../../store/useEnergyStore";
import type {
  EnergyOffering,
  EnergyType,
} from "../../modules/Offers/interfaces/interfaces";
import type { FieldConfig } from "./interfaces";
import { FormContainerStyle } from "./Form.style";

export default function EnergyForm() {
  const [energyType, setEnergyType] = useState<EnergyType>("solar");
  const { control, reset } = useForm<Record<string, any>>();
  const { addOffer } = useEnergyStore();
  const fields: FieldConfig[] = useMemo(() => getEnergyFields(energyType), [energyType]);

  const handleFileUpload = (event: any) => {
    console.log(event);
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e?.target?.result as string);
        console.log(jsonData);
        reset(jsonData);
      } catch (err) {
        alert("JSON file is not valid");
      }
    };
    reader.readAsText(file);
  };

  const onSubmit = () => {
    addOffer({
      type: energyType,
      ...control._formValues,
      confirmed: false,
    } as EnergyOffering);
    alert(`Offer of ${energyType} published successfully 🚀`);
    reset();
  };

  

  return (
      <FormContainerStyle>
      <Box
        mt="5"
        style={{
          width: "800px",
          padding: 20,
          background: "var(--gray-a2)",
          borderRadius: "var(--radius-3)",
        }}
      >
        <form>
          <Heading size="6" mb="2" color="lime">
            Create new offer
          </Heading>
          <Flex gap="3" direction="row" align="center">
            <Text size="1" color="gray">
              Energy type
            </Text>
            <SelectComponent
              selectedValue={energyType}
              onChange={(value) => setEnergyType(value as EnergyType)}
              items={Object.keys(energyConfig).map((type) => ({
                value: type,
                label: type,
              }))}
            />
          </Flex>
          <Grid columns="3" gap="3" mt="5">
            {fields.map((field) => (
              <Flex
                direction="column"
                gap="1"
                style={{ display: "flex", alignItems: "center" }}
              >
                <Text size="1" color="gray">
                  {field.label}
                </Text>
                <Controller
                  name={field.name}
                  control={control}
                  render={({ field: controllerField }) => (
                    <Box width={"200px"}>
                      <TextField.Root
                        size="2"
                        placeholder={field.label}
                        {...controllerField}
                        type={field.type}
                      />
                    </Box>
                  )}
                />
              </Flex>
            ))}
          </Grid>
        </form>
        <Flex direction="row" gap="3" justify="between" mt="8">
          <input type="file" accept=".json" onChange={handleFileUpload} />
          <Button onClick={onSubmit}>Save</Button>
        </Flex>
      </Box>
    </FormContainerStyle>
  );
}
