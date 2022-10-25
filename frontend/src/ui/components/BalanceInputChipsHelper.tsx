import { Box } from "@mui/material";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";
import { BoxTypeMap } from "@mui/system";
import React from "react";
import { LocChip } from "../atoms/LocChip";

type ChipProp = {
  text: string | number;
  onClick: () => void;
};

type BalanceInputChipsHelperProps = {
  chips: ChipProp[];
};

type Props = DefaultComponentProps<BoxTypeMap<BalanceInputChipsHelperProps>>;

export const BalanceInputChipsHelper: React.FC<Props> = ({
  chips,
  sx,
  ...props
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 1,
        mt: 1,
        mb: 1,
        ...sx,
      }}
      {...props}
    >
      {chips.map((props) => (
        <LocChip key={props.text} text={props.text} onClick={props.onClick} />
      ))}
    </Box>
  );
};
