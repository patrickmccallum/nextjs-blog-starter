import fs from 'fs'
import path from 'path'
import { ReactNode } from 'react'
import { Metadata } from 'next'

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

export function getBlogPostBySlug(slug: string): MdxBlogPage | undefined {
    let posts = getBlogPosts({ includeUnpublished: true })
    return posts.find((post) => post.slug === slug)
}

export function getBlogPostById(id: string): MdxBlogPage | undefined {
    let posts = getBlogPosts({ includeUnpublished: true })
    return posts.find((post) => post.id === id)
}
