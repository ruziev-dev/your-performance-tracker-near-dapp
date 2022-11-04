import React, { FC, useEffect, useState } from "react";
import { AvatarTypeMap, Avatar } from "@mui/material";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";
import PhotoCameraFrontTwoToneIcon from "@mui/icons-material/PhotoCameraFrontTwoTone";
import StickyNote2TwoToneIcon from "@mui/icons-material/StickyNote2TwoTone";
import BookmarkAddedTwoToneIcon from "@mui/icons-material/BookmarkAddedTwoTone";
import { PROOF_TYPE } from "../../near/contract";
import { ipfs } from "../../api/ipfs";
import { fileToBase64 } from "../../utils/helpers";

interface ProofPictureProps {
  proofType: PROOF_TYPE;
  isEnded?: boolean;
  wasted?: boolean;
  proofData?: string;
}

type Props = DefaultComponentProps<AvatarTypeMap<ProofPictureProps>>;

export const ProofPicture: FC<Props> = ({
  proofData,
  proofType,
  isEnded,
  wasted,
  sx,
  ...props
}) => {
  const [picSrc, setPicSrc] = useState("");
  useEffect(() => {
    if (proofType === PROOF_TYPE.MEDIA && proofData)
      ipfs
        .getFile(proofData)
        .then((file) => fileToBase64(file).then((base64) => setPicSrc(base64)));
  }, [proofData]);

  return (
    <Avatar
      onClick={console.log}
      alt="test alt text"
      sx={{
        ...sx,
        ":hover": proofData ? { bgcolor: "success.main" } : null,
        bgcolor: isEnded
          ? wasted
            ? "error.main"
            : "primary.main"
          : "warning.main",
      }}
      //src={picSrc}
      {...props}
    >
      <Icon proofType={proofType} />
    </Avatar>
  );
};

type IconProps = { proofType: PROOF_TYPE };
const Icon: FC<IconProps> = ({ proofType }) => {
  switch (proofType) {
    case PROOF_TYPE.MEDIA:
      return <PhotoCameraFrontTwoToneIcon />;
    case PROOF_TYPE.TEXT:
      return <StickyNote2TwoToneIcon />;
    default:
      return <BookmarkAddedTwoToneIcon />;
  }
};
