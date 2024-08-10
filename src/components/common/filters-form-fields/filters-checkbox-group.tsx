import React from "react";
import {CheckboxGroup} from "@nextui-org/react";
import {FilterCheckbox} from "./filter-checkbox";

interface FilterCheckboxGroupProps {
    filterValues: string[];
    filterKey: string
}

export default function FilterCheckboxGroup({ filterValues, filterKey }: FilterCheckboxGroupProps) {
    const [groupSelected, setGroupSelected] = React.useState([]);

    const renderedLabel = "Select " + filterKey;
    const renderedFilterCheckBoxes = filterValues.map((filter) => {
        return (<FilterCheckbox
            key={filter}
        >
            {filter}
        </FilterCheckbox>)
    })
    
    return (
        <div className="flex flex-col gap-1 w-full">
        <CheckboxGroup
            className="gap-1"
            label={renderedLabel}
            orientation="horizontal"
            value={groupSelected}
            // onChange={setGroupSelected}
        >
            {renderedFilterCheckBoxes}
        </CheckboxGroup>
        <p className="mt-4 ml-1 text-default-500">
            Selected: {groupSelected.join(", ")}
        </p>
        </div>
    );
    }
      