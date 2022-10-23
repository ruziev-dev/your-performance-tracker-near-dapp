import {
  Avatar,
  Box,
  Paper,
  PaperTypeMap,
  SvgIconProps,
  Typography,
  useTheme,
} from "@mui/material";
import React, { FC } from "react";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";
import { DisplayText } from "./DisplayText";

interface BalanceCardProps {
  title: string;
  nearValue: string | number;
  Icon: React.FC<SvgIconProps>;
  unit: string;
  ActionElement?: React.FC;
}

type Props = DefaultComponentProps<PaperTypeMap<BalanceCardProps>>;

export const BalanceCard: FC<Props> = ({
  title,
  unit,
  nearValue,
  Icon,
  sx,
  ActionElement,
  ...paperProps
}) => {
  const { palette } = useTheme();
  return (
    <Paper
      sx={{
        width: 200,
        height: 80,

        ...sx,
      }}
      {...paperProps}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Box sx={{ marginTop: 1 }}>
          <DisplayText>{title.toUpperCase()}</DisplayText>
          <Typography>
            {nearValue} {unit}
          </Typography>
        </Box>
        <Avatar
          sx={{ bgcolor: palette.background.default, marginTop: -7 }}
          variant="circular"
        >
          <Icon sx={{ color: palette.text.disabled }} />
        </Avatar>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: -2, mr: 1 }}>
        {!!ActionElement && <ActionElement />}
      </Box>
    </Paper>
  );
};
