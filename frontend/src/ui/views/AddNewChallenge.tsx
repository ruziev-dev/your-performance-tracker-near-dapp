import React, { useState } from "react";
import {
  Box,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Stack } from "@mui/system";
import { toNear } from "../../utils/helpers";
import store from "../../store/store";
import { ActionButton } from "../atoms/ActionButton";
import { BalanceInputChipsHelper } from "../components/BalanceInputChipsHelper";
import { PROOF_TYPE } from "../../near/contract";

const proofType = [
  { value: PROOF_TYPE.NONE, label: "🙅🏻‍♂️ Nothing" },
  { value: PROOF_TYPE.TEXT, label: "📝 Note" },
  { value: PROOF_TYPE.MEDIA, label: "📷 Media" },
];
const defaultProof = proofType[0];

type TProofType = typeof defaultProof;

type TextInputData = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export const AddNewChallenge = observer(() => {
  const nearAccountBalance = parseFloat(
    toNear(store.userState?.free_hold || "0")
  );

  const maxNearBalance = nearAccountBalance.toFixed(2);

  const [name, setName] = useState("");
  const [bet, setBet] = useState("");
  const [selectedProofType, setProofType] = useState<TProofType>(defaultProof);
  const [expDate, setExpDate] = useState<Dayjs | null>(null);

  const [isError, setError] = useState(false);

  const setFixValue = (percantage: number) => () => {
    setError(false);
    setBet(String(Number(maxNearBalance) * percantage));
  };

  const onCahngeName = (data: TextInputData) => {
    const { value } = data.target;
    if (value.trim() || value === "") {
      setName(value);
    }
  };

  const onChangeValue = (data: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9]*(?:\.[0-9]*)?$/;
    const newValue = data.target.value;

    newValue.replace(",", ".");

    const numValue = Number(newValue);
    if (numValue >= nearAccountBalance) setError(true);
    else setError(false);

    if (regex.test(newValue) || newValue === "") {
      setBet(newValue);
    } else setError(true);
  };

  const isReadyToSave = !!(name && bet && expDate);

  const saveNewChallenge = () => {
    store.createChallenge({
      proofType: selectedProofType.value,
      name,
      bet,
      expiration: expDate?.toISOString() as string,
    });
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
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Typography
        sx={{
          fontSize: 30,
          fontWeight: 100,
          width: "50%",
          textAlign: "center",
          mt: 2,
        }}
      >
        FILL IN FIELDS TO CREATE NEW CHALLENGE
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3}>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={onCahngeName}
          />

          <OutlinedInput
            error={isError}
            value={bet}
            onChange={onChangeValue}
            endAdornment={<InputAdornment position="end">Ⓝ</InputAdornment>}
          />

          <BalanceInputChipsHelper chips={heplerChips} />

          <TextField
            select
            label="Proof type"
            value={selectedProofType.value}
            helperText="Please select your currency"
          >
            {proofType.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                onClick={() => setProofType(option)}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <DesktopDatePicker
            label="Expiration date"
            value={expDate}
            minDate={dayjs(new Date())}
            onChange={(newValue) => {
              setExpDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <ActionButton
            disabled={!isReadyToSave}
            title="CREATE"
            onClick={saveNewChallenge}
            isLoading={store.isLoading}
          />
        </Stack>
      </LocalizationProvider>
    </Box>
  );
});
