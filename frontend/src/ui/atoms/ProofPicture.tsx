import React, { FC } from "react";
import { AvatarTypeMap, Avatar, Tooltip } from "@mui/material";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";
import PhotoCameraFrontTwoToneIcon from "@mui/icons-material/PhotoCameraFrontTwoTone";
import StickyNote2TwoToneIcon from "@mui/icons-material/StickyNote2TwoTone";
import BookmarkAddedTwoToneIcon from "@mui/icons-material/BookmarkAddedTwoTone";
import { PROOF_TYPE } from "../../near/contract";

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
  let tooltip = "Without any proof info";
  switch (proofType) {
    case PROOF_TYPE.MEDIA:
      tooltip = "With proof of photo";
      break;
    case PROOF_TYPE.TEXT:
      tooltip = "With proof of note";
      break;
    default:
      break;
  }

  return (
    <Tooltip title={tooltip}>
      <Avatar
        sx={{
          ...sx,
          bgcolor: isEnded
            ? wasted
              ? "error.main"
              : "primary.main"
            : "warning.main",
        }}
        {...props}
      >
        <Icon proofType={proofType} />
      </Avatar>
    </Tooltip>
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
