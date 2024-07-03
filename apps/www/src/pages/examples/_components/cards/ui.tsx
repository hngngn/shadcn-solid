import type { ParentComponent } from "solid-js";
import { DemoCookieSettings } from "./cookie-setting";
import { DemoCreateAccount } from "./create-account";
import { DemoGithub } from "./github-cards";
import { DemoNotifications } from "./notifications";
import { DemoPaymentMethod } from "./payment-method";
import { DemoReportAnIssue } from "./report-an-issue";
import { DemoShareDocument } from "./share-document";

const DemoContainer: ParentComponent = (props) => {
	return (
		<div class="flex items-center justify-center [&>div]:w-full">
			{props.children}
		</div>
	);
};

const CardsUI = () => {
	return (
		<>
			<div class="md:hidden">
				<img
					src="/examples/cards-light.png"
					width={1280}
					height={1214}
					alt="Cards"
					class="block dark:hidden"
				/>
				<img
					src="/examples/cards-dark.png"
					width={1280}
					height={1214}
					alt="Cards"
					class="hidden dark:block"
				/>
			</div>
			<div class="hidden items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3">
				<div class="col-span-2 grid items-start gap-6 lg:col-span-1">
					<DemoContainer>
						<DemoCreateAccount />
					</DemoContainer>
					<DemoContainer>
						<DemoPaymentMethod />
					</DemoContainer>
				</div>
				<div class="col-span-2 grid items-start gap-6 lg:col-span-1">
					<DemoContainer>
						<DemoShareDocument />
					</DemoContainer>
					<DemoContainer>
						<DemoReportAnIssue />
					</DemoContainer>
				</div>
				<div class="col-span-2 grid items-start gap-6 lg:col-span-2 lg:grid-cols-2 xl:col-span-1 xl:grid-cols-1">
					<DemoContainer>
						<DemoNotifications />
					</DemoContainer>
					<DemoContainer>
						<DemoGithub />
					</DemoContainer>
					<DemoContainer>
						<DemoCookieSettings />
					</DemoContainer>
				</div>
			</div>
		</>
	);
};

export default CardsUI;
