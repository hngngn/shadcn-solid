import { clientOnly } from "@solidjs/start";

const MailUI = clientOnly(
	() => import("~/routes/examples/_components/mail/ui"),
);

const MailPage = () => {
	return <MailUI />;
};

export default MailPage;
