import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { DisplayText } from "../atoms/DisplayText";

const steps = [
  {
    label: "Connect Near Wallet",
    description: "",
  },
  {
    label: "DEPOSIT SOME Ⓝ TOKENS",
    description: "",
  },
  {
    label: "CREATE YOUR PERSONAL CHALLENGES AND SELECT PROOF TYPE",
    description: `It can be "Run marathon" or "Read 5 books in this month" or some another.
    When you create challenge you have to choose a proof type (text/media note), make a bet for the challenge and set deadline.`,
  },
  {
    label: "COMPLETE YOUR PERSONAL CHALLENGE BEFORE DEALINE",
    description: `or you will lost your bet for the challenge after expiration date`,
  },
];

export const ActionSteps = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ ml: 5, mr: 5 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>
              <DisplayText>{step.label}</DisplayText>
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  {index < steps.length - 1 && (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      NEXT
                    </Button>
                  )}
                  {index !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                      Back
                    </Button>
                  )}
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};
