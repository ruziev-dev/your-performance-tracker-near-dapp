import React, { ChangeEvent, FC } from "react";
import { TextField, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import store from "../../../store/store";
import { ActionButton } from "../../atoms/ActionButton";
import PlaylistAddCircleTwoToneIcon from "@mui/icons-material/PlaylistAddCircleTwoTone";
import { Stack } from "@mui/system";
import { DropFileInput } from "../FileInput/FileInput";
import { PROOF_TYPE } from "../../../near/contract";

type Props = {
  onChangeValue: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickButton: () => void;
  fileValue: File | null;
  setFile: (file: File | null) => void;
  textValue: string;
};

export const AddProofModal: FC<Props> = observer(
  ({ onChangeValue, onClickButton, fileValue, setFile, textValue }) => {
    const isBtnDisabled =
      store?.modalState?.challenge.proof_type === PROOF_TYPE.MEDIA
        ? !fileValue
        : !textValue.trim();

    return (
      <Stack sx={{ gap: 3 }}>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {store?.modalState?.subtitle}
        </Typography>
        {store?.modalState?.contentType === "text" ? (
          <TextField
            id="outlined-multiline-static"
            label="Text note"
            multiline
            rows={4}
            value={textValue}
            onChange={onChangeValue}
          />
        ) : (
          <DropFileInput file={fileValue} setFile={setFile} />
        )}

        <ActionButton
          disabled={isBtnDisabled}
          isLoading={store.isLoading}
          title={store?.modalState?.actionName || "SAVE"}
          startIcon={<PlaylistAddCircleTwoToneIcon />}
          onClick={onClickButton}
        />
      </Stack>
    );
  }
);
