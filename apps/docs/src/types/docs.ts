export type TTableOfContentsItem = {
	title: string
	url: string
	items?: TTableOfContentsItem[]
}

export type TTableOfContents = {
	items: TTableOfContentsItem[]
}
