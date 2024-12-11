import { Index } from "@/__registry__";
import { registryEntrySchema } from "@/registry/schema";
import * as v from "valibot";

const BLOCKS_WHITELIST_PREFIXES = ["sidebar"];
const REGISTRY_BLOCK_TYPES = ["registry:block"];

export const getAllBlockId = () => {
	const blocks = _getAllBlocks();
	return blocks.map((block) => block.name);
};

const _getAllBlocks = () => {
	const index = v.parse(
		v.record(v.string(), registryEntrySchema),
		Index.tailwindcss,
	);

	return Object.values(index).filter((block) =>
		BLOCKS_WHITELIST_PREFIXES.some(
			(prefix) =>
				block.name.startsWith(prefix) &&
				REGISTRY_BLOCK_TYPES.includes(block.type),
		),
	);
};
