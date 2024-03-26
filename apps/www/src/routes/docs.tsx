import { MDXComponent } from "@/components/mdx-components";
import { Pager } from "@/components/pager";
import { Sidebar } from "@/components/sidebar";
import { TableOfContents } from "@/components/toc";
import { badgeVariants } from "@/registry/default/ui/badge";
import { A, type RouteSectionProps } from "@solidjs/router";
import { createMemo, Show } from "solid-js";
import { MDXProvider } from "solid-mdx";
import { Balancer } from "solid-wrap-balancer";
import { Meta, Title } from "@solidjs/meta";
import { siteConfig } from "@/config/site";

type Heading = { depth: number; text: string; slug: string };

type Frontmatter = {
  title: string;
  description: string;
  component?: boolean;
  link?: {
    doc: string;
    api: string;
  };
  toc: boolean;
};

const contents = /*#__PURE__*/ import.meta.glob<
  true,
  any,
  {
    headings: Heading[];
    frontmatter: Frontmatter;
  }
>("../contents/docs/**/*.mdx", {
  eager: true
});

const DocumentLayout = (props: RouteSectionProps) => {
  const markdownData = createMemo(() => ({
    frontmatter: contents[
      `../contents${
        props.location.pathname === "/docs" || props.location.pathname === "/docs/installation"
          ? props.location.pathname + "/index"
          : props.location.pathname
      }.mdx`
    ].frontmatter as Frontmatter,
    headings: contents[
      `../contents${
        props.location.pathname === "/docs" || props.location.pathname === "/docs/installation"
          ? props.location.pathname + "/index"
          : props.location.pathname
      }.mdx`
    ].headings as Heading[]
  }));

  return (
    <>
      <Title>{`${markdownData().frontmatter.title} - shadcn-solid`}</Title>
      <Meta name="description" content={markdownData().frontmatter.description} />

      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:title" content={`${markdownData().frontmatter.title} - shadcn-solid`} />
      <Meta name="twitter:description" content={markdownData().frontmatter.description} />
      <Meta name="twitter:image" content="https://shadcn-solid.com/og.png" />
      <Meta name="twitter:creator" content="@hnggngnn" />

      <Meta property="og:title" content={`${markdownData().frontmatter.title} - shadcn-solid`} />
      <Meta property="og:description" content={markdownData().frontmatter.description} />
      <Meta property="og:type" content="article" />
      <Meta property="og:url" content={`${siteConfig.url + props.location.pathname}`} />
      <Meta property="og:image" content="https://shadcn-solid.com/og.png" />
      <Meta property="og:alt" content={siteConfig.title} />
      <Meta property="og:image:width" content="1200" />
      <Meta property="og:image:height" content="630" />

      <div class="border-b">
        <div class="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
          <aside class="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
            <div class="relative h-full overflow-y-auto py-6 pr-6 lg:py-8">
              <Sidebar />
            </div>
          </aside>
          <main class="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
            <div class="mx-auto w-full min-w-0">
              <div class="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
                <div class="overflow-hidden text-ellipsis whitespace-nowrap">Docs</div>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m9 6l6 6l-6 6"
                  />
                </svg>
                <div class="font-medium text-foreground">{markdownData().frontmatter.title}</div>
              </div>
              <div class="space-y-2">
                <h1 class="scroll-m-20 text-4xl font-bold tracking-tight">
                  {markdownData().frontmatter.title}
                </h1>
                <Show when={markdownData().frontmatter.description}>
                  <p class="text-lg text-muted-foreground">
                    <Balancer>{markdownData().frontmatter.description}</Balancer>
                  </p>
                </Show>
              </div>
              <Show when={markdownData().frontmatter.link}>
                <div class="flex items-center space-x-2 pt-4">
                  <Show when={markdownData().frontmatter.link?.doc}>
                    <A
                      href={markdownData().frontmatter.link?.doc!}
                      target="_blank"
                      rel="noreferrer"
                      class={badgeVariants({
                        variant: "secondary"
                      })}
                    >
                      Docs{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="ml-1 h-3 w-3"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6m-7 1l9-9m-5 0h5v5"
                        />
                      </svg>
                    </A>
                  </Show>
                  <Show when={markdownData().frontmatter.link?.api}>
                    <A
                      href={markdownData().frontmatter.link?.api!}
                      target="_blank"
                      rel="noreferrer"
                      class={badgeVariants({
                        variant: "secondary"
                      })}
                    >
                      API Reference
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="ml-1 h-3 w-3"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6m-7 1l9-9m-5 0h5v5"
                        />
                      </svg>
                    </A>
                  </Show>
                </div>
              </Show>
              <div class="max-w-full pb-12 pt-8">
                <MDXProvider components={MDXComponent}>{props.children}</MDXProvider>
              </div>
              <Pager slug={props.location.pathname} />
            </div>
            <Show when={markdownData().frontmatter.toc === undefined}>
              <div class="hidden text-sm xl:block">
                <div class="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] overflow-hidden pt-6">
                  <TableOfContents data={markdownData().headings} />
                </div>
              </div>
            </Show>
          </main>
        </div>
      </div>
    </>
  );
};

export default DocumentLayout;
