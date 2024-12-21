import { clientOnly } from "@solidjs/start";

const Page = clientOnly(() => import("./_components"));

const Home = () => {
	return <Page />;
};

export default Home;
