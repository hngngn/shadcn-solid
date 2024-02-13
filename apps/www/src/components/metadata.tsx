import { siteConfig } from "@/config/site";
import { Link, Meta, Title } from "@solidjs/meta";
import { mergeProps, splitProps, type VoidComponent } from "solid-js";

type MetadataProps = {
  title?: string;
  description?: string;
  type?: "website" | "article";
};

export const Metadata: VoidComponent<MetadataProps> = props => {
  const merge = mergeProps<MetadataProps[]>(
    {
      title: siteConfig.title,
      description: siteConfig.description,
      type: "website"
    },
    props
  );
  const [local, rest] = splitProps(merge, ["title"]);

  return (
    <>
      <Title>
        {local.title !== siteConfig.title ? `${local.title} - shadcn-solid` : local.title}
      </Title>
      <Meta name="description" content={rest.description} />
      <Meta name="keywords" content="Solidjs,SolidStart,TailwindCSS,KobalteUI" />
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
  );
};
