import { Select } from "@radix-ui/themes";
import { SelectTriggerContainer } from "./Select.style";

const SelectComponent = ({
  selectedValue,
  items,
  onChange,
}: {
  selectedValue: string;
  items: { value: string; label: string }[];
  onChange: (value: string) => void;
}) => {
  return (
    <>
      <Select.Root
        value={selectedValue}
        onValueChange={(value) => onChange(value)}
      >
        <SelectTriggerContainer>
          <Select.Trigger />
        </SelectTriggerContainer>

        <Select.Content>
          <Select.Group>
            {items.map((item) => (
              <Select.Item value={item.value}>{item.label}</Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default SelectComponent;
