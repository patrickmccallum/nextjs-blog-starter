import Link from 'next/link'
import { PropsWithChildren } from 'react'

export default function GlobalTemplate({ children }: PropsWithChildren) {
    return (
        <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-6 px-6 py-4 text-neutral-800 dark:text-neutral-50">
            <header className="flex items-center gap-4 text-lg">
                <Link href={'/'}>Home</Link>
                <Link href={'/blog'}>Blog</Link>
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
