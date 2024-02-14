import { Problem } from "../types.ts";
import { Alert } from "@patternfly/react-core";
import React from "react";
import Display from "@patternfly/react-styles/css/utilities/Display/display";
import Sizing from "@patternfly/react-styles/css/utilities/Sizing/sizing";
import Spacing from "@patternfly/react-styles/css/utilities/Spacing/spacing";
import Flex from "@patternfly/react-styles/css/utilities/Flex/flex";
import { css } from "@patternfly/react-styles";
import { CrosshairLocation } from "../../SizedNiivueCanvas";
import { FooterContent } from "./footer.tsx";

type ControlPanelProps = {
  problems: Problem[];
  crosshairLocation: CrosshairLocation;
};

const ControlPanel: React.FC<ControlPanelProps> = ({
  problems,
  crosshairLocation,
}) => {
  return (
    <div
      className={css(Display.displayFlex, Flex.flexDirectionColumn)}
      style={{ height: "100%" }}
    >
      {problems.length === 0 || (
        <div>
          {problems.map(({ variant, title, body }, i) => (
            <Alert variant={variant} title={title} key={i}>
              {body}
            </Alert>
          ))}
        </div>
      )}
      <div className={css(Flex.flexGrow_1, Sizing.h_100)}>
        hello i am content
      </div>
      <div className={css(Flex.flexGrow_0, Spacing.pSm)}>
        <FooterContent crosshairLocation={crosshairLocation} />
      </div>
    </div>
  );
};

export { ControlPanel };
