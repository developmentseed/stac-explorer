import { Select } from "@chakra-ui/react";

type DropdownProps<T> = {
    items: T[];
    valueKey: keyof T;
    displayKey: keyof T;
    selectedValue: string;
    onSelectionChange: (selectedValue: string) => void;
};

// Dropdown is a generic component that can be used with any type T that extends an object with an id string field.
// It takes a list of items (items), a key for the value (valueKey), a key for the display text (displayKey),
// the currently selected value (selectedValue), and a callback for when the selection changes (onSelectionChange).
export default function Dropdown<T extends { id: string }>({
  items,
  valueKey,
  displayKey,
  selectedValue,
  onSelectionChange,
}: DropdownProps<T>) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectionChange(event.target.value);
  };

  return (
    <div>
      <Select overflow="hidden" value={selectedValue} onChange={handleChange}>
        <option value="">Select an option</option>
        {items.map(item => (
          <option key={item.id} value={item[valueKey] as unknown as string}>
            {item[displayKey] as unknown as string}
          </option>
        ))}
      </Select>
    </div>
  );
};
