import { createStore } from "solid-js/store";

type Props = {
	pathname: string;
};

export const [store, setStore] = createStore<Props>({
	pathname: "",
});
