import { createStore } from "solid-js/store"

import { mails, type Mail } from "./data"

type Config = {
  selected: Mail["id"] | null
}

export const [mail, setMail] = createStore<Config>({
  selected: mails[0].id,
})
