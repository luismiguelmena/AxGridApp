type FieldType = "text" | "number" | "date";

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
}

export interface EnergyConfig {
  specific: FieldConfig[];
}