import { Button } from "@repo/tailwindcss/default/button";

const ButtonAsChild = () => {
	return (
		<Button as="a" href="#">
			Login
		</Button>
	);
};

export default ButtonAsChild;
