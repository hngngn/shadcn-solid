import { Toaster as Sonner } from "somoto";

export const Toaster = (props: Parameters<typeof Sonner>[0]) => {
	return (
		<Sonner
			toastOptions={{
				unstyled: true,
				className: "toaster group",
				classNames: {
					toast:
						"group toast group-[.toaster]:(bg-background text-foreground border-border shadow-lg)",
					description: "group-[.toast]:text-muted-foreground",
					actionButton: "group-[.toast]:(bg-primary text-primary-foreground)",
					cancelButton: "group-[.toast]:(bg-muted text-muted-foreground)",
				},
			}}
			{...props}
		/>
	);
};
