import { LabelAndValue } from "@/types/Common";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import React, { Key } from "react";

interface Props<T extends Key> {
  items: LabelAndValue<T>[];
  label: string;
  id: string;
  name: string;
  value?: T | null;
  onChange?: (item: T) => void;
  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean; 
}

function SelectField<T extends Key>({
  items,
  label,
  id,
  required,
  value,
  onChange,
  readOnly,
  disabled,
}: Readonly<Props<T>>) {
  return (
    <div className="">
      <label htmlFor={id} className="block mb-2">
        {label} {required ? <span className="text-[#D9214E]">*</span> : ""}
      </label>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Autocomplete
          className="max-w-xs"
          defaultItems={items}
          placeholder="Select an option"
          variant="flat"
          defaultSelectedKey={value as string}
          onSelectionChange={(k) => onChange?.(k as T)}
          isReadOnly={readOnly}
          isDisabled={disabled} 
          aria-labelledby={id ?? label}
        >
          {(item) => (
            <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
          )}
        </Autocomplete>
      </div>
    </div>
  );
}

export default SelectField;
