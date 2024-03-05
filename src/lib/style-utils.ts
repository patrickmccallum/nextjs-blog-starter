import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Will reconcile and de-dupe classnames for tailwind, as well as support
// conditional classes.
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
