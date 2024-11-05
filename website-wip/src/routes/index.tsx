import { MDXContent } from "@/components/mdx-content";
import { docs } from "../../.velite";

const HomePage = () => {
	const doc = docs.filter((i) => i.title === "Introduction")[0];

	return (
		<div>
			<MDXContent code={doc.code} />
		</div>
	);
};

export default HomePage;
