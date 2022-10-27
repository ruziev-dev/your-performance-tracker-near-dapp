import { Chip, ChipTypeMap } from "@mui/material";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";
import React from "react";
import { DisplayText } from "./DisplayText";

type ChipProps = {
  text: string | number;
  onClick?: () => void;
};

type Props = DefaultComponentProps<ChipTypeMap<ChipProps>>;

export const LocChip: React.FC<Props> = ({ text, onClick, ...props }) => {
  return (
    <Chip
      color="secondary"
      onClick={onClick}
      label={<DisplayText>{text}</DisplayText>}
      {...props}
    />
  );
};
