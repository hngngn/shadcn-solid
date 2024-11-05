import { Link, Meta, MetaProvider, Style, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import { siteConfig } from "./config/site";

export default function App() {
	return (
		<Router
			root={(props) => (
				<MetaProvider>
					<Title>{siteConfig.title}</Title>
					<Meta name="description" content={siteConfig.description} />

					<Meta name="twitter:card" content="summary_large_image" />
					<Meta name="twitter:title" content={siteConfig.title} />
					<Meta name="twitter:description" content={siteConfig.description} />
					<meta
						name="twitter:image"
						content="https://shadcn-solid.com/og.png"
					/>
					<Meta name="twitter:image:alt" content={siteConfig.title} />
					<Meta name="twitter:creator" content="@hnggngnn" />

					<Meta property="og:title" content={siteConfig.title} />
					<Meta property="og:description" content={siteConfig.description} />
					<Meta property="og:url" content={siteConfig.url} />
					<Meta property="og:site_name" content={siteConfig.title} />
					<Meta property="og:locale" content="en_US" />
					<Meta property="og:type" content="article" />
					<Meta property="og:image" content="https://shadcn-solid.com/og.png" />
					<Meta property="og:alt" content={siteConfig.title} />
					<Meta property="og:image:width" content="1200" />
					<Meta property="og:image:height" content="630" />

					<Meta property="canonical" content={siteConfig.url} />

					<Link rel="sitemap" href="/sitemap-index.xml" />
					<Link rel="shortcut icon" href="/favicon-16x16.png" />
					<Link rel="icon" href="/favicon.ico" />
					<Link rel="apple-touch-icon" href="/apple-touch-icon.png" />
					<Link rel="manifest" href="/site.webmanifest" />
					<Link
						rel="preload"
						href="/fonts/GeistVariableVF.woff2"
						as="font"
						type="font/woff2"
						crossorigin="anonymous"
					/>

					<Style type="text/css">
						{`@font-face {
							font-family: "Geist Sans Variable";
							src: url("/fonts/GeistVariableVF.woff2") format("woff2");
							font-display: swap;
						}`}
					</Style>

					<Suspense>{props.children}</Suspense>
				</MetaProvider>
			)}
		>
			<FileRoutes />
		</Router>
	);
}