// https://github.com/Bluefinger/solid-mdx/blob/latest-solid-updates/src/index.ts

import { HTMLElements, SVGElements } from "./elements"

import type { JSX } from "solid-js"
import {
    createComponent,
    createContext,
    createMemo,
    mergeProps,
    splitProps,
    useContext,
} from "solid-js"
import { Dynamic } from "solid-js/web"

export type MDXComponents = {
    [key in keyof JSX.IntrinsicElements]: (
        // eslint-disable-next-line no-unused-vars
        props: JSX.IntrinsicElements[key]
    ) => JSX.Element
}

export interface MDXProps {
    components?:
        | MDXComponents
        | {
              // eslint-disable-next-line no-unused-vars
              [k: string]: (props: any) => JSX.Element
          }
    children?: JSX.Element
}

// eslint-disable-next-line no-unused-vars
export type MDXComponent = (props: MDXProps) => JSX.Element

export const MDXContext = createContext<MDXComponents>(
    [...HTMLElements, ...SVGElements].reduce((acc, el) => {
        acc[el] = (props: JSX.IntrinsicElements[typeof el]) => {
            const merge = mergeProps(props, {
                component: el,
            })

            return createComponent(Dynamic, merge)
        }

        return acc
    }, {} as MDXComponents)
)

export const MDXProvider: MDXComponent = (props) => {
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
