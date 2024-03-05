'use client'

import { MdxBlogPage } from '@/lib/blog-utils'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface ShareButtonsProps {
    blogPost: MdxBlogPage
}

export const ShareButtons = ({ blogPost }: ShareButtonsProps) => {
    const [pageUrl, setPageUrl] = useState('')

    useEffect(() => {
        setPageUrl(window.location.href)
    }, [])

    return (
        <div className="text-sm ">
            <Link
                href={`http://twitter.com/share?text=Check out ${blogPost.title}&url=${pageUrl}`}
                className="underline"
            >
                Share on Twitter
            </Link>
        </div>
    )
}
