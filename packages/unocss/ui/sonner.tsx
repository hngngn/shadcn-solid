import { Toaster as Sonner } from "somoto";

export const Toaster = (props: Parameters<typeof Sonner>[0]) => {
	return (
		<Sonner
			toastOptions={{
				classNames: {
					toast:
						"group toast bg-background text-foreground border-border shadow-lg",
					description: "text-muted-foreground",
				},
				actionButtonStyle: {
					"--normal-bg": "hsl(var(--primary-foreground))",
					"--normal-text": "hsl(var(--primary))",
				},
				cancelButtonStyle: {
					"--normal-bg": "hsl(var(--muted-foreground))",
					"--normal-text": "hsl(var(--muted))",
				},
			}}
			{...props}
		/>
	);
};
