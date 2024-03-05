import {
    TypographyH1,
    TypographyH2,
    TypographyP,
} from '@/components/typography'
import { getAllTags } from '@/lib/blog-utils'
import Link from 'next/link'

export default function TagsPage() {
    const tags = getAllTags()

    return (
        <div>
            <TypographyH1>Posts by tag</TypographyH1>
            <ul>
                {tags.map((tag) => (
                    <li key={tag.slug}>
                        <Link
                            href={`/blog/tags/${tag.slug}`}
                            className="hover:underline"
                        >
                            <TypographyP>
                                {tag.name}{' '}
                                <span className="text-xs opacity-50">
                                    ({tag.count})
                                </span>
                            </TypographyP>{' '}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
