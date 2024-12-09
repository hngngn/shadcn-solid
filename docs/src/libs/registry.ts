/* eslint-disable @typescript-eslint/no-unsafe-argument */

import fs from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { Project, ScriptKind, type SourceFile, SyntaxKind } from "ts-morph";
import * as v from "valibot";
import { Index } from "~/__registry__";
import { fixImport } from "../../scripts/import";
import {
	registryEntrySchema,
	type registryItemFileSchema,
} from "../../scripts/utils/schema";

const memoizedIndex: typeof Index = Object.fromEntries(
	Object.entries(Index).map(([style, items]) => [style, { ...items }]),
);

const createTempSourceFile = async (filename: string) => {
	const dir = await fs.mkdtemp(path.join(tmpdir(), "shadcn-"));
	return path.join(dir, filename);
};

const removeVariable = (sourceFile: SourceFile, name: string) => {
	sourceFile.getVariableDeclaration(name)?.remove();
};

const getFileContent = async (filePath: string) => {
	const raw = await fs.readFile(filePath, "utf-8");

	const project = new Project({
		compilerOptions: {},
	});

	const tempFile = await createTempSourceFile(filePath);
	const sourceFile = project.createSourceFile(tempFile, raw, {
		scriptKind: ScriptKind.TSX,
	});

	// Remove meta variables.
	removeVariable(sourceFile, "iframeHeight");
	removeVariable(sourceFile, "containerClassName");
	removeVariable(sourceFile, "description");

	let code = sourceFile.getFullText();

	// Fix imports.
	code = fixImport(code);

	return code;
};

const extractVariable = (sourceFile: SourceFile, name: string) => {
	const variable = sourceFile.getVariableDeclaration(name);
	if (!variable) {
		return null;
	}

	const value = variable
		.getInitializerIfKindOrThrow(SyntaxKind.StringLiteral)
		.getLiteralValue();

	variable.remove();

	return value;
};

const getFileMeta = async (filePath: string) => {
	const raw = await fs.readFile(filePath, "utf-8");

	const project = new Project({
		compilerOptions: {},
	});

	const tempFile = await createTempSourceFile(filePath);
	const sourceFile = project.createSourceFile(tempFile, raw, {
		scriptKind: ScriptKind.TSX,
	});

	const iframeHeight = extractVariable(sourceFile, "iframeHeight");
	const containerClassName = extractVariable(sourceFile, "containerClassName");
	const description = extractVariable(sourceFile, "description");

	return {
		iframeHeight,
		containerClassName,
		description,
	};
};

const getFileTarget = (file: v.InferInput<typeof registryItemFileSchema>) => {
	let target = file.target;

	if (!target || target === "") {
		const fileName = file.path.split("/").pop();
		if (
			file.type === "registry:block" ||
			file.type === "registry:component" ||
			file.type === "registry:example"
		) {
			target = `components/${fileName}`;
		}

		if (file.type === "registry:ui") {
			target = `components/ui/${fileName}`;
		}

		if (file.type === "registry:hook") {
			target = `hooks/${fileName}`;
		}

		if (file.type === "registry:libs") {
			target = `libs/${fileName}`;
		}
	}

	return target;
};

const fixFilePaths = (
	files: v.InferInput<typeof registryEntrySchema>["files"],
) => {
	if (!files) {
		return [];
	}

	// Resolve all paths relative to the first file's directory.
	const firstFilePath = files[0].path;
	const firstFilePathDir = path.dirname(firstFilePath);

	return files.map((file) => {
		return {
			...file,
			path: path.relative(firstFilePathDir, file.path),
			target: getFileTarget(file),
		};
	});
};

export const getRegistryItem = async (name: string) => {
	const item = memoizedIndex.tailwindcss[name];

	if (!item) {
		return null;
	}

	// Convert all file paths to object.
	// TODO: remove when we migrate to new registry.
	item.files = item.files.map((file: unknown) =>
		typeof file === "string" ? { path: file } : file,
	);

	// Fail early before doing expensive file operations.
	const result = v.safeParse(registryEntrySchema, item);
	if (!result.success) {
		return null;
	}

	let files: typeof result.output.files = [];
	for (const file of item.files) {
		const content = await getFileContent(file.path);
		const relativePath = path.relative(process.cwd(), file.path);

		files.push({
			...file,
			path: relativePath,
			content,
		});
	}

	// Get meta.
	// Assume the first file is the main file.
	const meta = await getFileMeta(files[0].path);

	// Fix file paths.
	files = fixFilePaths(files);

	const parsed = v.safeParse(registryEntrySchema, {
		...result.output,
		files,
		meta,
	});

	if (!parsed.success) {
		console.error(parsed.issues);
		return null;
	}

	return parsed.output;
};

export type FileTree = {
	name: string;
	path?: string;
	children?: FileTree[];
};

export const createFileTreeForRegistryItemFiles = (
	files: { path: string; target?: string }[],
) => {
	const root: FileTree[] = [];

	for (const file of files) {
		const path = file.target ?? file.path;
		const parts = path.split("/");
		let currentLevel = root;
		for (let i = 0; i < parts.length; i++) {
			const part = parts[i];
			const isFile = i === parts.length - 1;
			const existingNode = currentLevel.find((node) => node.name === part);
			if (existingNode) {
				if (isFile) {
					// Update existing file node with full path
					existingNode.path = path;
				} else {
					// Move to next level in the tree
					currentLevel = existingNode.children!;
				}
			} else {
				const newNode: FileTree = isFile
					? { name: part, path }
					: { name: part, children: [] };
				currentLevel.push(newNode);
				if (!isFile) {
					currentLevel = newNode.children!;
				}
			}
		}
	}

	return root;
};
