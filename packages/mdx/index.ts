import type { JSX } from "solid-js";
import {
  createComponent,
  createContext,
  createMemo,
  mergeProps,
  splitProps,
  useContext,
} from "solid-js";
import { Dynamic } from "solid-js/web";

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
  "param",
]);

const booleans = [
  "allowfullscreen",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "disabled",
  "formnovalidate",
  "hidden",
  "indeterminate",
  "ismap",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "seamless",
  "selected",
];

const BooleanAttributes = new Set(booleans);

const Properties = new Set([
  "className",
  "value",
  "readOnly",
  "formNoValidate",
  "isMap",
  "noModule",
  "playsInline",
  ...booleans,
]);

const ChildProperties = new Set([
  "innerHTML",
  "textContent",
  "innerText",
  "children",
]);

// React Compat
const Aliases = {
  className: "class",
  htmlFor: "for",
};

const PropAliases = {
  class: "className",
  formnovalidate: "formNoValidate",
  ismap: "isMap",
  nomodule: "noModule",
  playsinline: "playsInline",
  readonly: "readOnly",
};

// list of Element events that will be delegated
const DelegatedEvents = new Set([
  "beforeinput",
  "click",
  "dblclick",
  "focusin",
  "focusout",
  "input",
  "keydown",
  "keyup",
  "mousedown",
  "mousemove",
  "mouseout",
  "mouseover",
  "mouseup",
  "pointerdown",
  "pointermove",
  "pointerout",
  "pointerover",
  "pointerup",
  "touchend",
  "touchmove",
  "touchstart",
]);

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
]);

const SVGNamespace = {
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
};

export {
  BooleanAttributes,
  Properties,
  ChildProperties,
  PropAliases,
  Aliases,
  DelegatedEvents,
  SVGElements,
  SVGNamespace,
};

export type MDXComponents = {
  [key in keyof JSX.IntrinsicElements]: (
    props: JSX.IntrinsicElements[key],
  ) => JSX.Element;
};

export interface MDXProps {
  components?: MDXComponents | Record<string, unknown>;
  children?: JSX.Element;
}

export type MDXComponent = (props: MDXProps) => JSX.Element;

export const MDXContext = createContext<MDXComponents>(
  [...HTMLElements, ...SVGElements].reduce((acc, el) => {
    acc[el] = (props: JSX.IntrinsicElements[typeof el]) => {
      const merge = mergeProps(props, {
        component: el,
      });
      return createComponent(Dynamic, merge);
    };

    return acc;
  }, {} as MDXComponents),
);

export const MDXProvider: MDXComponent = (props) => {
  const context = useContext(MDXContext);
  const [local, other] = splitProps(props, ["children"]);
  const value = createMemo(() => ({ ...context, ...other.components }));

  return createComponent(MDXContext.Provider, {
    get value() {
      return value();
    },
    get children() {
      return local.children;
    },
  });
};

export const useMDXComponents = () => {
  return useContext(MDXContext);
};
