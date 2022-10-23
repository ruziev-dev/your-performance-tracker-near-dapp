import React, { useEffect, useState } from "react";
import {
  Box,
  CardContent,
  Chip,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import store from "../../store/store";
import { toNear } from "../../utils/helpers";
import { DisplayText } from "../atoms/DisplayText";
import { ActionButton } from "../atoms/ActionButton";

export const Deposit = observer(() => {
  useEffect(() => {
    store.getAccountBalance();
  }, []);

  const nearAccountBalance = parseFloat(
    toNear(store.accountBalance?.available || "0")
  );

  const maxNearBalance = nearAccountBalance.toFixed(2);

  const [value, setValue] = useState("");
  const [isError, setError] = useState(false);

  const onChangeValue = (data: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9]*(?:\.[0-9]*)?$/;
    const newValue = data.target.value;

    newValue.replace(",", ".");

    const numValue = Number(newValue);
    if (numValue >= nearAccountBalance) setError(true);
    else setError(false);

    if (regex.test(newValue) || newValue === "") {
      setValue(newValue);
    }
  };

  const deposit = () => store.deposit(value)
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 500,
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "space-between",
        }}
      >
        <Typography sx={{ fontSize: 30, fontWeight: 100 }}>
          SET YOUR DEPOSIT VALUE
        </Typography>

        <OutlinedInput
          error={isError}
          id="outlined-adornment-weight"
          value={value}
          onChange={onChangeValue}
          endAdornment={<InputAdornment position="end">Ⓝ</InputAdornment>}
          aria-describedby="outlined-weight-helper-text"
          inputProps={{
            "aria-label": "weight",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            gap: 1,
            mt: 1,
            mb: 1,
          }}
        >
          <Chip
            color="secondary"
            onClick={() => setValue(String(Number(maxNearBalance) * 0.25))}
            label={<DisplayText>25%</DisplayText>}
          />
          <Chip
            color="secondary"
            onClick={() => setValue(String(Number(maxNearBalance) * 0.5))}
            label={<DisplayText>50%</DisplayText>}
          />
          <Chip
            color="secondary"
            onClick={() => setValue(String(Number(maxNearBalance) * 0.75))}
            label={<DisplayText>75%</DisplayText>}
          />
          <Chip
            color="secondary"
            onClick={() => setValue(maxNearBalance)}
            label={<DisplayText>max {maxNearBalance} Ⓝ</DisplayText>}
          />
        </Box>

        <ActionButton
          title="DEPOSIT"
          disabled={isError || value === ""}
          onClick={deposit}
        />
      </CardContent>
    </Box>
  );
});
