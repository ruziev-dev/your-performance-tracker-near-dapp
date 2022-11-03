import React, { useState } from "react";
import { Box, Modal, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import store from "../../store/store";
import { ActionButton } from "../atoms/ActionButton";
import PlaylistAddCircleTwoToneIcon from "@mui/icons-material/PlaylistAddCircleTwoTone";
import { DisplayText } from "../atoms/DisplayText";
import { Stack } from "@mui/system";
import { DropFileInput } from "./FileInput/FileInput";
import { PROOF_TYPE } from "../../near/contract";

export const AppModal = observer(() => {
  const [fileValue, setFile] = useState<File | null>(null);
  const [textValue, setTextValue] = useState("");

  const isBtnDisabled =
    store?.modalState?.challenge.proof_type === PROOF_TYPE.MEDIA
      ? !fileValue
      : !textValue.trim();

  const onClose = () => {
    setFile(null);
    setTextValue("");
    store.hideModal();
  };
  const onChangeValue = (event) => {
    const value = event.target.value;
    setTextValue(value);
  };

  const onClickButton = async () => {
    switch (store?.modalState?.challenge.proof_type) {
      case PROOF_TYPE.TEXT: {
        store
          .completeChallenge(
            store?.modalState?.challenge.uuid as string,
            textValue.trim()
          )
          .then(onClose);
        return;
      }

      case PROOF_TYPE.MEDIA: {
        if (fileValue)
          store
            .completeChallengeWithFile(
              store?.modalState?.challenge.uuid as string,
              fileValue
            )
            .then(onClose);
        return;
      }
    }
  };

  return (
    <Modal
      open={!!store.modalState}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <DisplayText>{store?.modalState?.title}</DisplayText>
        </Box>
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
      </Box>
    </Modal>
  );
});

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
