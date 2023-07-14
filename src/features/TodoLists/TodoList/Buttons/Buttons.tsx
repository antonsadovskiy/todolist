import React, { FC, memo } from "react";
import { FilterType } from "../../types";
import { TabSwitcher } from "../../../../components/ui/tab-switcher";

type ButtonsPropsType = {
  filter: FilterType;
  setFilter: (filterValue: FilterType) => void;
};

const Buttons: FC<ButtonsPropsType> = memo((props) => {
  const setFilter = (value: string) => props.setFilter(value as FilterType);

  const options = [
    { value: "all", label: "All" },
    {
      value: "active",
      label: "Active",
    },
    { value: "completed", label: "Completed" },
  ];

  return (
    <TabSwitcher options={options} value={props.filter} onChange={setFilter} />
  );
});

export default Buttons;
