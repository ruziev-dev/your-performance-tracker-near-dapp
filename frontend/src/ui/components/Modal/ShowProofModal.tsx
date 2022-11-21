import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import store from "../../../store/store";

import { Stack } from "@mui/system";
import { ipfs } from "../../../api/ipfs";
import { PROOF_TYPE } from "../../../near/contract";
import { fileToBase64 } from "../../../utils/helpers";

export const ShowProofModal = observer(() => {
  const challenge = store?.modalState?.challenge;

  if (!challenge) return null;
  const [picSrc, setPicSrc] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (challenge?.proof_type === PROOF_TYPE.MEDIA && challenge.proof_data)
      ipfs
        .getFile(challenge.proof_data)
        .then((file) => fileToBase64(file).then((base64) => setPicSrc(base64)))
        .catch((error) => {
          console.warn("[ShowProofModal] getFile error:", error);
          setErrorMsg(error.message);
        });
  }, [challenge.proof_data]);
  return (
    <Stack sx={{ gap: 3 }}>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {store?.modalState?.subtitle}
      </Typography>

      {challenge.proof_type === PROOF_TYPE.TEXT ? (
        <Paper sx={{ width: 370, minHeight: 300, borderRadius: 5, padding: 3 }}>
          <Typography>{challenge.proof_data}</Typography>
        </Paper>
      ) : (
        <>
          {errorMsg && (
            <Typography typography="caption" color="error">
              {errorMsg}
            </Typography>
          )}
          {picSrc ? (
            <img style={{ maxWidth: "100%" }} src={picSrc} />
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {!errorMsg && <CircularProgress />}
            </Box>
          )}
        </>
      )}
    </Stack>
  );
});
