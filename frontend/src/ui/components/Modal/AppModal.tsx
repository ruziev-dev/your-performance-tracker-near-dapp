import React, { ChangeEvent, useState } from "react";
import { Box, Modal } from "@mui/material";
import { observer } from "mobx-react-lite";
import store from "../../../store/store";
import { DisplayText } from "../../atoms/DisplayText";
import { PROOF_TYPE } from "../../../near/contract";
import { ShowProofModal } from "./ShowProofModal";
import { AddProofModal } from "./AddProofModal";
import { APP_MODAL_TYPE } from "../../../types/frontend-types";

export const AppModal = observer(() => {
  const [fileValue, setFile] = useState<File | null>(null);
  const [textValue, setTextValue] = useState("");

  const onClose = () => {
    setFile(null);
    setTextValue("");
    store.hideModal();
  };
  const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
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
        <DisplayText>{store?.modalState?.title}</DisplayText>

        {store.modalState?.viewType === APP_MODAL_TYPE.SHOW_PROOF_DATA && (
          <ShowProofModal />
        )}
        {store.modalState?.viewType === APP_MODAL_TYPE.INPUT_PROOF_FORM && (
          <AddProofModal
            onChangeValue={onChangeValue}
            onClickButton={onClickButton}
            setFile={setFile}
            fileValue={fileValue}
            textValue={textValue}
          />
        )}
      </Box>
    </Modal>
  );
});

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 310,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
