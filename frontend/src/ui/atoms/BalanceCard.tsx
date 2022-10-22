import { Box, Paper, PaperTypeMap, Typography } from "@mui/material";
import React, { FC } from "react";
import { observer } from "mobx-react-lite";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";

interface BalanceCardProps {
  title: string;
  nearValue: string | number;
  Icon: React.FC;
  unit: string
}

type Props = DefaultComponentProps<PaperTypeMap<BalanceCardProps>>;

export const BalanceCard: FC<Props> = observer(
  ({ title, unit, nearValue, Icon, sx, ...paperProps }) => {
    return (
      <Paper
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: 200,
          height: 80,
          ...sx,
        }}
        {...paperProps}
      >
        <Box>
          <Typography variant="button">{title.toUpperCase()}</Typography>
          <Typography>{nearValue} {unit}</Typography>
        </Box>

        <Icon />
      </Paper>
    );
  }
);
