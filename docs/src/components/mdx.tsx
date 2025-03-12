// https://github.com/nksaraf/solid-mdx

import {
  createComponent,
  createContext,
  createMemo,
  mergeProps,
  splitProps,
  useContext,
  type JSX,
  type ParentProps,
} from "solid-js"
import { Dynamic } from "solid-js/web"

export const HTMLElements = new Set<
  keyof JSX.HTMLElementTags | keyof JSX.HTMLElementDeprecatedTags
>([
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "menu",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "slot",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "template",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  "big",
  "keygen",
  "menuitem",
  "noindex",
  "param",
])

const SVGElements = new Set<keyof JSX.SVGElementTags>([
  "animate",
  "animateMotion",
  "animateTransform",
  "circle",
  "clipPath",
  "defs",
  "desc",
  "ellipse",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "filter",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "marker",
  "mask",
  "metadata",
  "mpath",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "set",
  "stop",
  "svg",
  "switch",
  "symbol",
  "text",
  "textPath",
  "tspan",
  "use",
  "view",
])

export type MDXComponents = {
  [key in keyof JSX.IntrinsicElements]: (
    props: JSX.IntrinsicElements[key]
  ) => JSX.Element
}

type MDXProps = ParentProps<{
  components?: MDXComponents | Record<string, unknown>
}>

export const MDXContext = createContext<MDXComponents>(
  [...HTMLElements, ...SVGElements].reduce((acc, el) => {
    acc[el] = (props: JSX.IntrinsicElements[typeof el]) => {
      return createComponent(
        Dynamic,
        // eslint-disable-next-line solid/reactivity
        mergeProps(props, {
          component: el,
        })
      )
    }

    return acc
  }, {} as MDXComponents)
)

export const MDXProvider = (props: MDXProps) => {
  const context = useContext(MDXContext)
  const [local, other] = splitProps(props, ["children"])
  const value = createMemo(() => ({ ...context, ...other.components }))

  return createComponent(MDXContext.Provider, {
    get value() {
      return value()
    },
    get children() {
      return local.children
    },
  })
}

export const useMDXComponents = () => {
  return useContext(MDXContext)
}
