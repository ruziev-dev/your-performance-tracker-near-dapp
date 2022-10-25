import React, { useEffect, useState } from "react";
import {
  Box,
  CardContent,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import store from "../../store/store";
import { toNear } from "../../utils/helpers";
import { ActionButton } from "../atoms/ActionButton";
import { BalanceInputChipsHelper } from "../components/BalanceInputChipsHelper";

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

  const deposit = () => store.deposit(value);

  const setFixValue = (percantage: number) => () => {
    setError(false);
    setValue(String(Number(maxNearBalance) * percantage));
  };

  const heplerChips = [
    { text: "25%", onClick: setFixValue(0.25) },
    { text: "50%", onClick: setFixValue(0.5) },
    { text: "75%", onClick: setFixValue(0.75) },
    { text: `max ${maxNearBalance} Ⓝ`, onClick: setFixValue(1) },
  ];

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
          SET YOUR DEPOSIT VALUE
        </Typography>

        <OutlinedInput
          id="outlined-adornment-weight"
          error={isError}
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
          title="DEPOSIT"
          disabled={isError || value === ""}
          onClick={deposit}
        />
      </CardContent>
      <ActionButton title="test Alert" onClick={store.showAlert} />
    </Box>
  );
});
