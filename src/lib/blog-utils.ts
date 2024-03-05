import fs from 'fs'
import path from 'path'
import { ReactNode } from 'react'
import { Metadata } from 'next'
import slugify from 'slugify'

// Define our types

// Blog metadata.json structure
type BlogMetadata = {
    id: string
    datePublished: string
    tags: Array<string>
    nextMetadata: Metadata
}

// How we'll pass around an "MdxBlogPage" object
export type MdxBlogPage = {
    id: string
    title: string
    slug: string
    metadata: BlogMetadata
    content: ReactNode
    isPublished: boolean
}

// Used for reading the metadata.json file
function parseFile(blogBaseDir: string, fileContent: string) {
    // Read the metadata from metadata.json
    let metadata = JSON.parse(
        fs.readFileSync(path.join(blogBaseDir, 'metadata.json'), 'utf-8')
    )

    return { metadata: metadata as BlogMetadata, content: fileContent }
}

// A recursive function for exploring a directory
const scanDirectoriesForBlogs = (dir: string): string[] => {
    let files: string[] = []

    fs.readdirSync(dir, { withFileTypes: true }).forEach((dirent) => {
        if (dirent.isDirectory()) {
            files = [
                ...files,
                ...scanDirectoriesForBlogs(path.join(dir, dirent.name)),
            ]
        } else if (dirent.name.includes('metadata.json')) {
            files.push(path.join(dir, dirent.name))
        }
    })

    return files
}

// Loads an MDX file
const readBlogDirectory = (fileName: string) => {
    const file = fs.readFileSync(fileName, 'utf-8')

    const s = fileName.split('/')
    s.pop()

    return parseFile(s.join('/'), file)
}

// Gets blog data from a list of files discovered from a base directory
function getBlogData(dir: string): MdxBlogPage[] {
    let mdxFiles = scanDirectoriesForBlogs(dir)

    return mdxFiles.map((file) => {
        let { metadata, content } = readBlogDirectory(path.join(file))
        let slug = file.split('/')[file.split('/').length - 2]

        return {
            id: metadata.id,
            title: metadata.nextMetadata.title as string,
            metadata,
            slug,
            content,
            isPublished: Boolean(
                metadata.datePublished &&
                    new Date(metadata.datePublished) <= new Date()
            ),
        }
    })
}

/**
 * GetPostsOptions
 * @param includeUnpublished - Include unpublished posts
 * @param sortBy - Sort by datePublishedDesc by default
 * @param limit - Limit the number of posts returned
 * @param tagged - Filter by tags
 */
type GetPostsOptions = {
    includeUnpublished?: boolean
    sortBy?: 'datePublishedDesc' | 'datePublishedAsc'
    limit?: number
    tagged?: string[]
}

/**
 * Get blog posts
 * @param options - Options for getting blog posts
 * @returns An array of blog posts
 */
export function getBlogPosts(options?: GetPostsOptions): Array<MdxBlogPage> {
    let posts = getBlogData(path.join(process.cwd(), 'src/app/blog'))

    // Filter out unpublished first
    if (!options?.includeUnpublished) {
        posts = posts.filter(
            (post) =>
                post.metadata.datePublished &&
                new Date(post.metadata.datePublished) < new Date()
        )
    }

    // Sort by datePublished
    if (options?.sortBy === 'datePublishedDesc') {
        posts = posts
            .filter((b) => Boolean(b.metadata.datePublished))
            .sort(
                (a, b) =>
                    new Date(b.metadata.datePublished).getTime() -
                    new Date(a.metadata.datePublished).getTime()
            )
    } else if (options?.sortBy === 'datePublishedAsc') {
        posts = posts
            .filter((b) => Boolean(b.metadata.datePublished))
            .sort(
                (a, b) =>
                    new Date(a.metadata.datePublished).getTime() -
                    new Date(b.metadata.datePublished).getTime()
            )
    }

    // Filter by tags
    if (options?.tagged !== undefined) {
        posts = posts.filter((post) => {
            let tags = post.metadata.tags
            return options.tagged?.some((tag) => tags.includes(tag))
        })
    }

    // Limit
    posts.length = options?.limit ?? posts.length

    return posts
}

/**
 * Get blog post by slug
 * @param slug - The slug of the blog post
 * @param includeUnpublished - Include unpublished posts
 * @returns The blog post
 */
export function getBlogPostBySlug(
    slug: string,
    includeUnpublished?: boolean
): MdxBlogPage | undefined {
    let posts = getBlogPosts({ includeUnpublished })
    return posts.find((post) => post.slug === slug)
}

/**
 * Get blog post by the id defined in the metadata.json
 * @param id - The id of the blog post
 * @returns The blog post
 */
export function getBlogPostById(id: string): MdxBlogPage | undefined {
    let posts = getBlogPosts({ includeUnpublished: true })
    return posts.find((post) => post.id === id)
}

/**
 * Gets blog posts by tag
 * @param tag - The tag to filter by
 * @param includeUnpublished - Include unpublished posts
 * @returns An array of blog posts
 */
export function getBlogPostsByTag(
    tag: string,
    options?: {
        includeUnpublished?: boolean
        isSlugified?: boolean
    }
): Array<MdxBlogPage> {
    let posts = getBlogPosts({
        includeUnpublished: options?.includeUnpublished,
    })

    if (options?.isSlugified) {
        return posts.filter((post) =>
            post.metadata.tags
                .map((t) => slugify(t, { lower: true, strict: true }))
                .includes(tag)
        )
    }

    return posts.filter((post) => post.metadata.tags.includes(tag))
}

type GetTagsResult = {
    name: string
    slug: string
    count: number
    articles: Array<MdxBlogPage>
}

/**
 * Gets all tags by popularity
 * @returns Record of tags, popularity, and articles
 */
export function getAllTags(): Array<GetTagsResult> {
    let posts = getBlogPosts()

    let tags: Record<string, GetTagsResult> = {}

    posts.forEach((post) => {
        post.metadata.tags.forEach((tag) => {
            if (tags[tag]) {
                tags[tag]['count']++
                tags[tag]['articles'].push(post)
            } else {
                tags[tag] = {
                    name: tag,
                    count: 1,
                    articles: [post],
                    slug: slugify(tag, { lower: true, strict: true }),
                }
            }
        })
    })

    return Object.entries(tags)
        .sort((a, b) => b[1].count - a[1].count)
        .map(([tag]) => tags[tag])
}
