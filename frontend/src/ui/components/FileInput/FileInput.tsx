import "./file-input.css";

import React, { FC, useRef, useState } from "react";
import CloudUploadTwoToneIcon from "@mui/icons-material/CloudUploadTwoTone";
import { DisplayText } from "../../atoms/DisplayText";
import { Stack } from "@mui/system";
import { arrayBufferToBase64 } from "../../../utils/helpers";
import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  file: File | null;
  setFile: (file: File | null) => void;
};

export const DropFileInput: FC<Props> = ({ file, setFile }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [base64Data, setBase64Data] = useState<string | null>("");

  const onDragEnter = () => wrapperRef.current?.classList.add("dragover");
  const onDragLeave = () => wrapperRef.current?.classList.remove("dragover");
  const onDrop = () => wrapperRef.current?.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files?.[0];
    if (newFile) {
      setFile(newFile);
      setFile(newFile);
    }
  };

  const fileRemove = () => {
    setFile(null);
    setFile(null);
  };

  file?.arrayBuffer().then((buff) => {
    const base64data = arrayBufferToBase64(buff, file?.type);
    setBase64Data(base64data);
  });

  return (
    <>
      {file ? (
        <Box className="drop-file-input">
          {base64Data && <img src={base64Data} className="proof-image" />}
          <IconButton
            color="error"
            onClick={fileRemove}
            aria-label="delete"
            size="large"
            sx={{ position: "absolute", top: 0, right: 0, zIndex: 15 }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ) : (
        <Stack
          ref={wrapperRef}
          className="drop-file-input"
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <CloudUploadTwoToneIcon fontSize="large" color="primary" />
          <DisplayText sx={{ color: "primary.main" }}>
            Drag & Drop your files here
          </DisplayText>
          <input type="file" accept="image/*" onChange={onFileDrop} />
        </Stack>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          fontSize: 12,
          mt: -1,
        }}
      >
        <p>{file?.name || ""}</p>
        <p>{file ? `${Number(file.size / 1024).toFixed(2)}  kB` : ""}</p>
      </Box>
    </>
  );
};
