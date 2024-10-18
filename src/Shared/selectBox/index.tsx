import "./styles.css";
import { InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { FC } from "react";
import { KeyboardArrowDown } from "@mui/icons-material";
import { ErrorMessage } from "../errorMessage";

type FieldProps = {
  id: string;
  name: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
};

type ErrorMessageProps = {
  fieldProps: FieldProps;
  options: any[];
  defaultValue?: any;
  value?: any;
  errorMessage?: string | boolean;
  onChange?: Function;
  direction?: "ltr" | "rtl";
  disabled?: boolean;
  form?: any;
};

export const ZSSelectBox: FC<ErrorMessageProps> = ({
  fieldProps,
  options,
  defaultValue,
  value, // Ensure you have the value prop here
  errorMessage,
  direction = "ltr",
  disabled = false,
  form,
  onChange,
}) => {
  return (
    <div className="selectBoxContainer">
      {fieldProps?.label && (
        <InputLabel>
          {fieldProps?.label}
          {fieldProps?.required ? " * " : ""}
        </InputLabel>
      )}
      <Select
        name={fieldProps?.name}
        fullWidth
        value={value || defaultValue || " "} // Use value prop
        disabled={disabled}
        IconComponent={KeyboardArrowDown}
        error={errorMessage ? Boolean(errorMessage) : false} // Update this logic if needed
        onChange={(e) => {
          if (onChange) {
            onChange(e.target.value);
          }
        }}
      >
        {fieldProps?.placeholder && (
          <MenuItem disabled value=" " style={{ direction }}>
            <Typography className="disableSelect">
              {fieldProps?.placeholder}
            </Typography>
          </MenuItem>
        )}
        {options?.map((option: any, index: number) => (
          <MenuItem value={option?.value} style={{ direction }} key={index}>
            {option?.label}
          </MenuItem>
        ))}
      </Select>
      {typeof errorMessage !== "boolean" && (
        <ErrorMessage
          message={
            errorMessage ??
            ((form?.touched as any)?.[fieldProps?.name] &&
              (form?.errors as any)?.[fieldProps?.name])
          }
        />
      )}
    </div>
  );
};
