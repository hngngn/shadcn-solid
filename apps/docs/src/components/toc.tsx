import { For, createEffect, createSignal } from "solid-js"
import { createIntersectionObserver } from "@solid-primitives/intersection-observer"

const Toc = (props: {
  data: { depth: number; slug: string; text: string }[]
}) => {
  const [targets, setTargets] = createSignal<Element[]>([])

  createEffect(() => {
    for (const item of props.data) {
      setTargets((p) => [...p, document.getElementById(item.slug) as Element])
    }
  })

  const [activeItem, setActiveItem] = createSignal<string[]>([])

  createIntersectionObserver(targets, (entries) => {
    for (const entry of entries) {
      const id = entry.target.getAttribute("id")
      if (id === null) return

      if (entry.isIntersecting && !activeItem().includes(id)) {
        setActiveItem([...activeItem(), id])
        return
      }
      if (!entry.isIntersecting && activeItem().includes(id)) {
        setActiveItem(activeItem().filter((h) => h !== id))
        return
      }
    }
  })

  return (
    <aside class="flex flex-col gap-2 p-4 pt-0">
      <p class="text-muted-foreground bg-background sticky top-0 h-6 text-xs">
        On This Page
      </p>
      <ul class="flex flex-col gap-2">
        <For each={props.data}>
          {(item) => (
            <li
              data-active={activeItem().includes(item.slug)}
              data-depth={item.depth}
              class="text-muted-foreground hover:text-foreground data-[active=true]:text-foreground text-[0.8rem] no-underline transition-colors data-[depth=3]:pl-4 data-[depth=4]:pl-6"
            >
              <a href={`#${item.slug}`}>{item.text}</a>
            </li>
          )}
        </For>
      </ul>
    </aside>
  )
}

export default Toc
