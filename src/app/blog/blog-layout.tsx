'use client'

import { MdxBlogPage } from '@/lib/blog-utils'
import Link from 'next/link'
import { PropsWithChildren, useEffect, useState } from 'react'

interface BlogLayout {
    blogPost: MdxBlogPage
}

export default function BlogLayout({
    blogPost,
    children,
}: PropsWithChildren<BlogLayout>) {
    const [pageUrl, setPageUrl] = useState('')

    useEffect(() => {
        setPageUrl(window.location.href)
    }, [])

    return (
        <div
            className={
                'flex flex-col gap-6 text-neutral-800 dark:text-neutral-50'
            }
        >
            <article className={'max-w-prose text-lg leading-loose'}>
                {children}
            </article>
            <div className="text-sm ">
                <Link
                    href={`http://twitter.com/share?text=Check out ${blogPost.title}&url=${pageUrl}`}
                    className="underline"
                >
                    Share on Twitter
                </Link>
            </div>
        </div>
    )
}
