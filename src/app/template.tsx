import Link from 'next/link'
import { PropsWithChildren } from 'react'
import {cn} from "@/lib/style-utils";

export default function GlobalTemplate({ children }: PropsWithChildren) {
    return (
        <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-6 px-6 py-4 text-neutral-800 dark:text-neutral-50">
            <header className="flex items-center gap-4 text-lg">
                <HeaderLink href={'/'}>Home</HeaderLink>
                <HeaderLink href={'/blog'}>Blog</HeaderLink>
                <HeaderLink
                    href={
                        'https://github.com/patrickmccallum/nextjs-blog-starter'
                    }
                    className="ml-auto"
                >
                    GitHub Repo
                </HeaderLink>
            </header>
            <main>{children}</main>
            <footer className="flex justify-between border-t border-neutral-200 py-4 text-sm text-neutral-500 dark:border-neutral-600">
                <p>Thanks for visiting 👍</p>
                <ul className="flex list-none gap-2">
                    <li>Find me on</li>
                    <li>
                        <Link
                            href={'https://x.com/patsnacks'}
                            className="underline"
                        >
                            X
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={'https://github.com/patrickmccallum'}
                            className="underline"
                        >
                            Github
                        </Link>
                    </li>
                </ul>
            </footer>
        </div>
    )
}

const HeaderLink = ({ href, className, children }: PropsWithChildren<{ href: string, className?: string }>) => {
    return (
        <Link href={href} className={cn("hover:decoration-solid underline decoration-dashed underline-offset-4", className)}>
            {children}
        </Link>
    )
}