import React, { useState } from "react";
import {
  Box,
  CardContent,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import store from "../../store/store";
import { toNear, toYoctoNear } from "../../utils/helpers";
import { ActionButton } from "../atoms/ActionButton";
import { BalanceInputChipsHelper } from "../components/BalanceInputChipsHelper";

export const Withdraw = observer(() => {
  const freeHoldBalance = toNear(store.userState?.free_hold || "");
  const freeHoldBalanceValue = parseFloat(freeHoldBalance);

  const [value, setValue] = useState("");
  const [isError, setError] = useState(false);

  const onChangeValue = (data: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9]*(?:\.[0-9]*)?$/;
    const newValue = data.target.value;

    newValue.replace(",", ".");

    const numValue = Number(newValue);
    if (numValue >= freeHoldBalanceValue) setError(true);
    else setError(false);

    if (regex.test(newValue) || newValue === "") {
      setValue(newValue);
    }
  };

  const setFixValue = (percantage: number) => () => {
    setError(false);
    setValue(String(Number(freeHoldBalance) * percantage));
  };

  const heplerChips = [
    { text: "25%", onClick: setFixValue(0.25) },
    { text: "50%", onClick: setFixValue(0.5) },
    { text: "75%", onClick: setFixValue(0.75) },
    { text: `max ${freeHoldBalance} Ⓝ`, onClick: setFixValue(1) },
  ];

  const withdraw = () => store.withdraw(toYoctoNear(value) || "");
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
          ENTER WITHDRAW VALUE
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
        <BalanceInputChipsHelper chips={heplerChips} />

        <ActionButton
          isLoading={store.isLoading}
          title="WITHDRAW"
          disabled={isError || value === ""}
          onClick={withdraw}
        />
      </CardContent>
    </Box>
  );
});
