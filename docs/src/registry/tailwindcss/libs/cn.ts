import clsx, { type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...classLists: ClassValue[]) => twMerge(clsx(classLists))
