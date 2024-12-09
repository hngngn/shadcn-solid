"use server";

import * as v from "valibot";
import { Index } from "~/__registry__";
import { registryEntrySchema } from "../../scripts/utils/schema";

const BLOCKS_WHITELIST_PREFIXES = ["sidebar"];
const REGISTRY_BLOCK_TYPES = ["registry:block"];

export const getAllBlockIds = async () => {
	const blocks = await _getAllBlocks();
	return blocks.map((block) => block.name);
};

const _getAllBlocks = async () => {
	const index = await v.parseAsync(
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
