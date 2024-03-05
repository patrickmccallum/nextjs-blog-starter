import {
    TypographyH1,
    TypographyH2,
    TypographyH3,
    TypographyP,
} from '@/components/typography'
import { getBlogPosts } from '@/lib/blog-utils'
import Link from 'next/link'

export default function BlogPage() {
    const allPosts = getBlogPosts({
        sortBy: 'datePublishedDesc',
    })

    // Group blog posts by month and year
    const byYearMonth = allPosts.reduce(
        (acc, post) => {
            const date = new Date(post.metadata.datePublished),
                year = date.getFullYear(),
                month = date.getMonth(),
                key = `${year}-${month}`

            if (!acc[key]) {
                acc[key] = []
            }
            acc[key].push(post)
            return acc
        },
        {} as Record<string, Array<any>>
    )

    return (
        <div>
            <TypographyH1>Blog</TypographyH1>
            <p>
                Have a browse through my entire collection, or see{' '}
                <Link
                    href={'/blog/tags'}
                    className="underline decoration-dotted underline-offset-4 hover:decoration-solid"
                >
                    them by tag
                </Link>
                .
            </p>
            <ol className="list-none">
                {Object.keys(byYearMonth).map((yearMonth) => {
                    const posts = byYearMonth[yearMonth]
                    const date = new Date(posts[0].metadata.datePublished)
                    return (
                        <li
                            key={yearMonth}
                            className="border-b border-neutral-300 pb-4 last-of-type:border-b-0 last-of-type:pb-0 dark:border-neutral-600"
                        >
                            <TypographyH2>
                                {date.toLocaleDateString('en-GB', {
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </TypographyH2>
                            <ul>
                                {posts.map((post) => (
                                    <li key={post.metadata.slug}>
                                        <Link
                                            href={`/blog/${post.slug}`}
                                            className="hover:underline"
                                        >
                                            <TypographyH3 className="line-clamp-1">
                                                {post.title}
                                            </TypographyH3>
                                            <TypographyP className="line-clamp-2">
                                                {
                                                    post.metadata.nextMetadata
                                                        .description
                                                }
                                            </TypographyP>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    )
                })}
            </ol>
        </div>
    )
}
