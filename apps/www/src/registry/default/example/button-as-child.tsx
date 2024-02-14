import { As } from "@kobalte/core";
import { A } from "@solidjs/router";
import { Button } from "../ui/button";

const ButtonAsChild = () => {
  return (
    <Button asChild>
      <As component={A} href="#">
        Login
      </As>
    </Button>
  );
};

export default ButtonAsChild;
