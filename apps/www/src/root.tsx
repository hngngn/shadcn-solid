// @refresh reload
import {
    ColorModeProvider,
    ColorModeScript,
    cookieStorageManagerSSR,
} from "@kobalte/core"
import { Suspense, useContext } from "solid-js"
import { isServer } from "solid-js/web"
import { MDXProvider } from "solid-mdx"
import {
    Body,
    ErrorBoundary,
    FileRoutes,
    Head,
    Html,
    Link,
    Meta,
    Routes,
    Scripts,
    ServerContext,
    Title,
} from "solid-start"
import { MDXComponent, SiteFooter, SiteHeader } from "~/components"

import "@unocss/reset/tailwind.css"
import "uno.css"
import "~/styles/index.scss"
import { siteConfig } from "./config"

const Root = () => {
    const event = useContext(ServerContext)

    const storageManager = cookieStorageManagerSSR(
        isServer ? event?.request.headers.get("cookie") ?? "" : document.cookie
    )

    return (
        <Html lang="en">
            <Head>
                <Title>{siteConfig.title}</Title>
                <Meta charset="utf-8" />
                <Meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta name="description" content={siteConfig.description} />
                <Meta
                    name="keywords"
                    content="Solidjs,SolidStart,UnoCSS,Kobalte"
                />
                <Meta name="author" content="hngngn" />
                <Meta property="og:title" content={siteConfig.title} />
                <Meta
                    property="og:description"
                    content={siteConfig.description}
                />
                <Meta property="og:url" content={siteConfig.url} />
                <Meta property="og:site_name" content={siteConfig.title} />
                <Meta property="og:locale" content="en_US" />
                <Meta property="og:type" content="website" />
                <Link rel="shortcut icon" href="/favicon-16x16.png" />
                <Link rel="icon" href="/favicon.ico" />
                <Link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <Link
                    rel="manifest"
                    href={`${siteConfig.url}/site.webmanifest`}
                />
            </Head>
            <Body class="font-sans antialiased bg-background text-foreground min-h-screen">
                <Suspense>
                    <ErrorBoundary>
                        <ColorModeScript storageType={storageManager.type} />
                        <ColorModeProvider storageManager={storageManager}>
                            <div class="relative flex min-h-screen flex-col">
                                <SiteHeader />
                                <MDXProvider components={MDXComponent}>
                                    <div class="flex-1">
                                        <div class="border-b">
                                            <Routes>
                                                <FileRoutes />
                                            </Routes>
                                        </div>
                                    </div>
                                </MDXProvider>
                                <SiteFooter />
                            </div>
                        </ColorModeProvider>
                    </ErrorBoundary>
                </Suspense>
                <Scripts />
            </Body>
        </Html>
    )
}

export default Root
