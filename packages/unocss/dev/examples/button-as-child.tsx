import { As } from "@kobalte/core";
import { Button } from "../../ui/button";

const ButtonAsChild = () => {
  return (
    <Button asChild>
      <As component="a" href="#">
        Login
      </As>
    </Button>
  );
};

export default ButtonAsChild;
