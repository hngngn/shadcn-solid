import { clientOnly } from "@solidjs/start";

const MailUI = clientOnly(() => import("./_components/mail/ui"));

const MailPage = () => {
	return <MailUI />;
};

export default MailPage;
