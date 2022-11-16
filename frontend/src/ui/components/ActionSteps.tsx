import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DisplayText } from "../atoms/DisplayText";
import { Stack } from "@mui/system";
import { Avatar, Divider } from "@mui/material";

const steps = [
  {
    label: "Connect Near Wallet",
    description: "And start using this application",
  },
  {
    label: "DEPOSIT SOME NEAR TOKENS",
    description: "You can withdraw it after",
  },
  {
    label: "CREATE YOUR PERSONAL CHALLENGES AND SELECT PROOF TYPE",
    description: `It can be "Run marathon" or "Read 5 books in this month" or some another.
    When you create challenge you have to choose a proof type (text/media note), make a bet for the challenge and set deadline.`,
  },
  {
    label: "COMPLETE YOUR PERSONAL CHALLENGE BEFORE DEALINE",
    description: `Or you will lost your bet for the challenge after expiration date`,
  },
];

export const ActionSteps = () => {
  return (
    <Box sx={{ ml: 5, mr: 5 }}>
      {steps.map((item, index) => (
        <Stack>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Avatar sx={{ bgcolor: "primary.main" }}>{index + 1}</Avatar>
            <DisplayText>{item.label}</DisplayText>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
              mt: 1,
              mb: 1,
            }}
          >
            {index !== steps.length - 1 ? (
              <Divider
                orientation="vertical"
                flexItem
                sx={{ bgcolor: "gray", ml: 2.5 }}
              />
            ) : (
              <Box sx={{ ml: 2.5 }} />
            )}

            <Typography typography="body1" sx={{ ml: 3, fontWeight: 700 }}>
              {item.description}
            </Typography>
          </Box>
        </Stack>
      ))}
    </Box>
  );
};
