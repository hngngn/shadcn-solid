import { siteConfig } from "@/config/site";
import { Link, Meta, Title } from "@solidjs/meta";
import { type VoidComponent } from "solid-js";

export const Metadata: VoidComponent = () => {
  return (
    <>
      <Title>{siteConfig.title}</Title>
      <Meta name="description" content={siteConfig.description} />
      <Meta
        name="keywords"
        content="Solidjs,SolidStart,TailwindCSS,Kobalte UI,shadcn,Solid Component"
      />
      <Meta name="author" content="hngngn" />

      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:site" content={siteConfig.url} />
      <Meta name="twitter:title" content={siteConfig.title} />
      <Meta name="twitter:description" content={siteConfig.description} />
      <Meta name="twitter:image" content="https://shadcn-solid.com/og.png" />
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

      <Link rel="shortcut icon" href="/favicon-16x16.png" />
      <Link rel="icon" href="/favicon.ico" />
      <Link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <Link rel="manifest" href="/site.webmanifest" />
      <Link
        rel="preload"
        href="/fonts/GeistVariableVF.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
    </>
  );
};
