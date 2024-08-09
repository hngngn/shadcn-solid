import { Button } from "@repo/tailwindcss/solid/button";

const ButtonAsChild = () => {
	return (
		<Button as="a" href="#">
			Login
		</Button>
	);
};

export default ButtonAsChild;
