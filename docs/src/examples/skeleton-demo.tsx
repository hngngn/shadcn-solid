import { Skeleton } from "@repo/tailwindcss/ui/skeleton";

const SkeletonDemo = () => {
	return (
		<div class="flex items-center space-x-4">
			<Skeleton class="h-12 w-12 rounded-full" />
			<div class="space-y-2">
				<Skeleton class="h-4 w-[250px]" />
				<Skeleton class="h-4 w-[200px]" />
			</div>
		</div>
	);
};

export default SkeletonDemo;
