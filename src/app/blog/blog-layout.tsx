import { TypographyH1 } from '@/components/typography'
import { getBlogPostById } from '@/lib/blog-utils'
import { PropsWithChildren } from 'react'
import { ShareButtons } from './share-buttons'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import slugify from 'slugify'

interface BlogLayout {
    blogPostId: string
}

export default function BlogLayout({
    blogPostId,
    children,
}: PropsWithChildren<BlogLayout>) {
    const blogPost = getBlogPostById(blogPostId)

    // Hide posts when they're not published yet TODO:// except on dev
    if (!blogPost || !blogPost.isPublished) {
        notFound()
    }

    return (
        <div
            className={
                'flex flex-col gap-6 text-neutral-800 dark:text-neutral-50'
            }
        >
            <article className={'max-w-prose text-lg leading-loose'}>
                <TypographyH1>{blogPost.title as string}</TypographyH1>
                <div className="mt-2 text-lg leading-relaxed text-neutral-500 dark:text-neutral-400">
                    {blogPost.metadata.nextMetadata.description}
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                    {blogPost.metadata.tags.map((tag) => (
                        <Link
                            href={`/blog/tags/${slugify(tag, { strict: true, lower: true })}`}
                            key={tag}
                        >
                            <span className="rounded-md bg-neutral-100 px-2 py-1 text-sm hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600">
                                {tag}
                            </span>
                        </Link>
                    ))}
                </div>
                <div className="mt-6">{children}</div>
            </article>
            <ShareButtons blogPost={blogPost} />
        </div>
    )
}
