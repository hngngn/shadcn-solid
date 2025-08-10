import { createServerFileRoute } from "@tanstack/solid-start/server"
import { ImageResponse } from "@vercel/og"

const loadAssets = async (): Promise<
  { name: string; data: Buffer; weight: 400 | 600; style: "normal" }[]
> => {
  const [
    { base64Font: normal },
    { base64Font: mono },
    { base64Font: semibold },
  ] = await Promise.all([
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    import("./geist-regular-otf.json").then((mod) => mod.default || mod),
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    import("./geistmono-regular-otf.json").then((mod) => mod.default || mod),
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    import("./geist-semibold-otf.json").then((mod) => mod.default || mod),
  ])

  return [
    {
      name: "Geist",
      data: Buffer.from(normal, "base64"),
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: "Geist Mono",
      data: Buffer.from(mono, "base64"),
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: "Geist",
      data: Buffer.from(semibold, "base64"),
      weight: 600 as const,
      style: "normal" as const,
    },
  ]
}

export const ServerRoute = createServerFileRoute("/_og/og").methods({
  GET: async ({ request }) => {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get("title")
    const description = searchParams.get("description")

    const [fonts] = await Promise.all([loadAssets()])

    return new ImageResponse(
      {
        type: "div",
        props: {
          tw: "flex h-full w-full bg-black text-white",
          style: { fontFamily: "Geist Sans" },
          children: [
            {
              type: "div",
              props: {
                tw: "flex border absolute border-stone-700 border-dashed inset-y-0 left-16 w-[1px]",
              },
            },
            {
              type: "div",
              props: {
                tw: "flex border absolute border-stone-700 border-dashed inset-y-0 right-16 w-[1px]",
              },
            },
            {
              type: "div",
              props: {
                tw: "flex border absolute border-stone-700 inset-x-0 h-[1px] top-16",
              },
            },
            {
              type: "div",
              props: {
                tw: "flex border absolute border-stone-700 inset-x-0 h-[1px] bottom-16",
              },
            },
            {
              type: "div",
              props: {
                tw: "flex absolute flex-row bottom-24 right-24 text-white",
                children: [
                  {
                    type: "svg",
                    props: {
                      xmlns: "http://www.w3.org/2000/svg",
                      viewBox: "0 0 256 256",
                      width: 48,
                      height: 48,
                      children: [
                        {
                          type: "rect",
                          props: {
                            width: "256",
                            height: "256",
                            fill: "none",
                          },
                        },
                        {
                          type: "line",
                          props: {
                            x1: "208",
                            y1: "128",
                            x2: "128",
                            y2: "208",
                            fill: "none",
                            stroke: "#51a2ff",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "32",
                          },
                        },
                        {
                          type: "line",
                          props: {
                            x1: "192",
                            y1: "40",
                            x2: "40",
                            y2: "192",
                            fill: "none",
                            stroke: "#51a2ff",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "32",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
            {
              type: "div",
              props: {
                tw: "flex flex-col absolute w-[896px] justify-center inset-32",
                children: [
                  {
                    type: "div",
                    props: {
                      tw: "tracking-tight flex-grow-1 flex flex-col justify-center leading-[1.1]",
                      style: {
                        textWrap: "balance",
                        fontWeight: 600,
                        fontSize: title && title.length > 20 ? 64 : 80,
                        letterSpacing: "-0.04em",
                      },
                      children: title,
                    },
                  },
                  {
                    type: "div",
                    props: {
                      tw: "text-[40px] leading-[1.5] flex-grow-1 text-stone-400",
                      style: {
                        fontWeight: 500,
                        textWrap: "balance",
                      },
                      children: description,
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      {
        width: 1200,
        height: 628,
        fonts,
      },
    )
  },
})
