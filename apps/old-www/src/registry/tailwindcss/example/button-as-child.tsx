import { Button } from "../ui/button";

const ButtonAsChild = () => {
  return (
    <Button as="a" href="#">
      Login
    </Button>
  );
};

export default ButtonAsChild;
