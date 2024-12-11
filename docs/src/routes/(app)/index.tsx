import { Announcement } from "@/components/announcement";
import Example from "@/components/example";
import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/registry/tailwindcss/ui/button";
import { clientOnly } from "@solidjs/start";

const MailUI = clientOnly(
	() => import("@/routes/(app)/examples/_components/mail/ui"),
);

const Home = () => {
	return (
		<div class="relative">
			<section class="flex flex-col items-start gap-2 border-b border-border/40 py-8 dark:border-border md:py-10 lg:py-12">
				<div class="container">
					<Announcement />
					<h1 class="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
						Build your component library
					</h1>
					<p class="max-w-2xl text-balance text-lg font-light text-foreground">
						Beautifully designed components that you can copy and paste into
						your apps. Accessible. Customizable. Open Source.
					</p>
					<div class="flex w-full items-center justify-start gap-2 py-2">
						<a href="/docs/introduction" class={buttonVariants({ size: "sm" })}>
							Get Started
						</a>
						<a
							target="_blank"
							rel="noreferrer"
							href={siteConfig.links.github}
							class={buttonVariants({ variant: "ghost", size: "sm" })}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="mr-2 h-4 w-4"
								viewBox="0 0 24 24"
							>
								<path
									fill="none"
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2c2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2a4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6c-.6.6-.6 1.2-.5 2V21"
								/>
							</svg>
							GitHub
						</a>
					</div>
				</div>
			</section>
			<div class="container py-6">
				<Example />
				<section class="overflow-hidden rounded-lg border bg-background shadow-md md:hidden md:shadow-xl">
					<img
						src="/examples/mail-dark.png"
						width={1280}
						height={727}
						alt="Mail"
						class="hidden dark:block"
					/>
					<img
						src="/examples/mail-light.png"
						width={1280}
						height={727}
						alt="Mail"
						class="block dark:hidden"
					/>
				</section>
				<section class="hidden md:block">
					<div class="overflow-hidden rounded-lg border bg-background shadow-lg">
						<MailUI />
					</div>
				</section>
			</div>
		</div>
	);
};

export default Home;
