import { makePersisted } from "@solid-primitives/storage";
import { type FrameWork, frameworks } from "scripts/utils/framework";
import { type Style, styles } from "scripts/utils/styles";
import {
	type Accessor,
	type ParentComponent,
	type Setter,
	createContext,
	createSignal,
	useContext,
} from "solid-js";

type Context = {
	style: Accessor<Style>;
	setStyle: Setter<Style>;
	framework: Accessor<FrameWork>;
	setFramework: Setter<FrameWork>;
};

const StyleContext = createContext<Context>();

export const StyleProvider: ParentComponent = (props) => {
	const [style, setStyle] = makePersisted(createSignal<Style>(styles[0]), {
		name: "style",
	});
	const [framework, setFramework] = makePersisted(
		createSignal<FrameWork>(frameworks[0]),
		{
			name: "framework",
		},
	);

	const value: Context = {
		style,
		setStyle,
		framework,
		setFramework,
	};

	return (
		<StyleContext.Provider value={value}>
			{props.children}
		</StyleContext.Provider>
	);
};

export const useStyle = () => {
	const ctx = useContext(StyleContext);

	if (!ctx) {
		throw new Error("useStyle must be use within `StyleProvider`");
	}

	return ctx;
};
