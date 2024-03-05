import {
    TypographyH1,
    TypographyH3,
    TypographyP,
} from '@/components/typography'
import { getBlogPostsByTag } from '@/lib/blog-utils'
import Link from 'next/link'

export default function TagPage({ params }: { params: { tag: string } }) {
    const posts = getBlogPostsByTag(params.tag, { isSlugified: true })

    return (
        <div>
            <TypographyH1>
                Posts tagged {params.tag.replaceAll('-', ' ')}
            </TypographyH1>
            <ul>
                {posts.map((post) => (
                    <li key={post.metadata.id}>
                        <Link
                            href={`/blog/${post.slug}`}
                            className="hover:underline"
                        >
                            <TypographyH3 className="line-clamp-1">
                                {post.title}
                            </TypographyH3>
                            <TypographyP className="line-clamp-2">
                                {post.metadata.nextMetadata.description}
                            </TypographyP>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
