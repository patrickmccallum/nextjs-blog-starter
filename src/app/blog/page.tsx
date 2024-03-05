import { getBlogPosts } from '@/lib/blog-utils'

export default function BlogPage() {
    const allPosts = getBlogPosts({
        sortBy: 'datePublishedDesc',
    })

    return (
        <div>
            <main>
                <h1>Blog</h1>
                <p>Blog page</p>
            </main>
        </div>
    )
}
