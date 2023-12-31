import { siteConfig } from "@/config/site"
import { mergeProps, splitProps, type VoidComponent } from "solid-js"
import { Link, Meta, Title } from "solid-start"

type MetadataProps = {
	title?: string
	description?: string
	type?: "website" | "article"
}

export const Metadata: VoidComponent<MetadataProps> = (props) => {
	const merge = mergeProps<MetadataProps[]>(
		{
			title: siteConfig.title,
			description: siteConfig.description,
			type: "website",
		},
		props
	)
	const [local, rest] = splitProps(merge, ["title"])

	return (
		<>
			<Title>
				{local.title ? `${local.title} - shadcn-solid` : local.title}
			</Title>
			<Meta charset="utf-8" />
			<Meta
				name="viewport"
				content="width=device-width, initial-scale=1"
			/>
			<Meta name="description" content={rest.description} />
			<Meta name="keywords" content="Solidjs,SolidStart,UnoCSS,Kobalte" />
			<Meta name="author" content="hngngn" />
			<Meta property="og:title" content={local.title} />
			<Meta property="og:description" content={rest.description} />
			<Meta property="og:url" content={siteConfig.url} />
			<Meta property="og:site_name" content={siteConfig.title} />
			<Meta property="og:locale" content="en_US" />
			<Meta property="og:type" content={rest.type} />
			<Link rel="shortcut icon" href="/favicon-16x16.png" />
			<Link rel="icon" href="/favicon.ico" />
			<Link rel="apple-touch-icon" href="/apple-touch-icon.png" />
			<Link rel="manifest" href="/site.webmanifest" />
		</>
	)
}
