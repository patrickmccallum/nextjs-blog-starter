import {
    TypographyH1,
    TypographyH2,
    TypographyH3,
    TypographyP,
} from '@/components/typography'
import { getBlogPosts } from '@/lib/blog-utils'
import Link from 'next/link'

export default function Home() {
    const blogs = getBlogPosts({
        includeUnpublished: false,
        sortBy: 'datePublishedDesc',
        limit: 10,
    })

    return (
        <div className="flex flex-col gap-2">
            <TypographyH1>
                Welcome to my blog <span aria-hidden="true">👋</span>
            </TypographyH1>
            <TypographyH2>Recent posts</TypographyH2>
            <ol className="flex max-w-md flex-col divide-y">
                {blogs.map((blog) => (
                    <li key={blog.id} className="py-4">
                        <Link
                            href={`/blog/${blog.slug}`}
                            className="flex flex-col hover:underline"
                        >
                            <TypographyH3 className="mt-0">
                                {blog.title}
                            </TypographyH3>
                            <TypographyP className="mt-0 line-clamp-2">
                                {blog.metadata.nextMetadata.description}
                            </TypographyP>
                        </Link>
                    </li>
                ))}
            </ol>
        </div>
    )
}
