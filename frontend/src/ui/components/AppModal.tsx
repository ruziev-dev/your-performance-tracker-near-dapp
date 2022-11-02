import React, { useState } from "react";
import { Box, Modal, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import store from "../../store/store";
import { ActionButton } from "../atoms/ActionButton";
import PlaylistAddCircleTwoToneIcon from "@mui/icons-material/PlaylistAddCircleTwoTone";
import { DisplayText } from "../atoms/DisplayText";
import { Stack } from "@mui/system";

export const AppModal = observer(() => {
  const [textValue, setTextValue] = useState("");

  const onClose = () => {
    setTextValue("");
    store.hideModal();
  };
  const onChangeValue = (event) => {
    const value = event.target.value;
    setTextValue(value);
  };

  const onClickButton = async () => {
    store?.modalState
      ?.action(store?.modalState?.challenge.uuid as string, textValue.trim())
      .then(onClose);
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
          <TextField
            id="outlined-multiline-static"
            label="Text note"
            multiline
            rows={4}
            value={textValue}
            onChange={onChangeValue}
          />
          <ActionButton
            disabled={!textValue.trim()}
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
