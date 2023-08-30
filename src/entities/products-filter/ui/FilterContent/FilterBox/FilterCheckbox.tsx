import React, { useState } from "react";
import {
  Checkbox,
  type CheckboxProps,
} from "../../../../../shared/ui/Checkbox";
import { type FilterParamNames } from "../../../model/types";
import { useCustomSearchParams } from "../../../../../shared/model/hooks";
import { useNavigate } from "react-router-dom";
import { isPlainEnumValue } from "../../../lib/helpers";
import { type AttributePlainEnumValue } from "@commercetools/platform-sdk";
import { Paths } from "../../../../../shared/constants/paths";

type FilterCHeckboxProps = CheckboxProps & {
  filterName: FilterParamNames;
  value: AttributePlainEnumValue | number;
};

export function FilterCheckbox({
  filterName,
  onChange,
  value,
  ...props
}: FilterCHeckboxProps) {
  const currentValue = isPlainEnumValue(value) ? value.key : value.toString();

  const { searchParams, deleteValue } = useCustomSearchParams();

  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(
    searchParams.getAll(filterName).includes(currentValue),
  );

  const handleChange = (checked: boolean): void => {
    setIsChecked(checked);
    if (checked) {
      searchParams.append(filterName, currentValue);
    } else {
      deleteValue(filterName, currentValue);
    }
    navigate({
      pathname: Paths.Catalog,
      search: searchParams.toString(),
    });
  };

  return (
    <Checkbox
      value={value}
      {...props}
      checked={isChecked}
      onChange={(event, checked) => {
        handleChange(checked);
      }}
    />
  );
}
