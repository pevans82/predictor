import React from "react";
import Button from "@material-ui/core/Button";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@material-ui/icons";
import MobileStepper from "@material-ui/core/MobileStepper";
import {useTheme} from "@material-ui/core/styles";

export default function ProgressStepper(props) {
    const theme = useTheme();

    return (
        <MobileStepper
            steps={props.maxSteps}
            position="static"
            variant="progress"
            activeStep={props.activeStep}
            backButton={
                <Button size="small" onClick={props.onHandlePrevious} disabled={props.activeStep === 0}>
                    {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
                </Button>
            }
            nextButton={
                <Button size="small" onClick={props.onHandleNext} disabled={props.activeStep === props.maxSteps - 1}>
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
                </Button>
            }
        />
    )
}