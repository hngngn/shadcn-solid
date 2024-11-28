import { Toaster as Sonner } from "somoto";

export const Toaster = (props: Parameters<typeof Sonner>[0]) => {
	return (
		<Sonner
			toastOptions={{
				unstyled: true,
				className: "toaster group",
				classNames: {
					toast:
						"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
					description: "group-[.toast]:text-muted-foreground",
					actionButton:
						"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
					cancelButton:
						"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
				},
			}}
			{...props}
		/>
	);
};
