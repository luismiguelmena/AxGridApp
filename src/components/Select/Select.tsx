import { Select } from "@radix-ui/themes";
import "./styles.css";
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
    <div>
 <Select.Root value={selectedValue} onValueChange={(value) => onChange(value)}>
	<Select.Trigger className=".SelectTrigger" style={{width: "145px", height: "30px"}}/>
	<Select.Content>
		<Select.Group>
			{items.map((item) => (
				<Select.Item value={item.value}>{item.label}</Select.Item>
			))}
		</Select.Group>
	</Select.Content>
</Select.Root>
    </div>
   
  );
};

export default SelectComponent;
