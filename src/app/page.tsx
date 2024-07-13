import {
    TypographyH1,
    TypographyH2,
    TypographyH3,
    TypographyLead,
    TypographyLink,
    TypographyP,
} from '@/components/typography'
import { getBlogPosts } from '@/lib/blog-utils'
import Link from 'next/link'
import Image from 'next/image'
import ImgProfilePic from './profile-pic.png'
import { workExperience } from '@/data/work-experience'
import { memo } from 'react'

export default function Home() {
    return (
        <div className="flex flex-col gap-2">
            <SectionIntro />
            <div className={'flex flex-col gap-4 md:grid md:grid-cols-8'}>
                <div className={'flex flex-col gap-4 md:col-span-5'}>
                    <SectionAboutMe />
                    <SectionBlog />
                </div>
                <div className={'col-span-3 flex flex-[33%] flex-col gap-4'}>
                    <SectionResume />
                </div>
            </div>
        </div>
    )
}

const SectionIntro = () => {
    return (
        <section
            className={
                'flex flex-col gap-2 md:flex-row md:items-center md:gap-8'
            }
        >
            <Image
                src={ImgProfilePic}
                alt="A photo of me, Dev"
                width={100}
                height={100}
                className="rounded-full"
                placeholder={'blur'}
                priority
            />
            <div>
                <TypographyH1 className={'mt-0'}>
                    My name&apos;s Dev
                </TypographyH1>
                <TypographyLead>
                    Welcome to my blog <span aria-hidden="true">👋</span>
                </TypographyLead>
            </div>
        </section>
    )
}

const SectionAboutMe = () => {
    return (
        <section className={'rounded-lg border p-4 px-6'}>
            <TypographyH2>About me</TypographyH2>
            <TypographyP>
                I&apos;m a software engineer who loves to write about web
                development, programming, and other tech stuff.
            </TypographyP>
            <TypographyP>
                On the weekends, I like to go hiking and take photos of
                landscapes.
            </TypographyP>
            <TypographyP>
                Have a look at some of my{' '}
                <TypographyLink href={'/blog/my-first-post'}>
                    latest snaps!
                </TypographyLink>
            </TypographyP>
        </section>
    )
}

const SectionBlog = () => {
    const MAX_RECENT_POSTS = 3

    const blogs = getBlogPosts({
        includeUnpublished: false,
        sortBy: 'datePublishedDesc',
        limit: MAX_RECENT_POSTS,
    })
    const allBlogs = getBlogPosts({
        includeUnpublished: false,
        sortBy: 'datePublishedDesc',
    })

    const overflowBlogs = allBlogs.length - blogs.length

    return (
        <section className={'flex flex-col gap-6 rounded-lg border p-4 px-6'}>
            <TypographyH2>Recent posts</TypographyH2>
            <ol className="flex max-w-prose flex-col gap-4 divide-y">
                {blogs.map((blog) => (
                    <li
                        key={blog.id}
                        className="[&:not(:first-child)]:pt-4"
                    >
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
                {overflowBlogs > 0 && (
                    <li className="pt-4 text-center">
                        <TypographyLink href={'/blog'}>
                            See {overflowBlogs} other posts
                        </TypographyLink>
                    </li>
                )}
            </ol>
        </section>
    )
}

const SectionResume = memo(() => {
    const MAX_WORK_EXPERIENCE = 3

    const displayWorkExperience = workExperience.slice(0, 3)
    const overflowWorkExperience = workExperience.length - MAX_WORK_EXPERIENCE

    return (
        <section className={'rounded-lg border p-4'}>
            <TypographyH2>Experience</TypographyH2>

            <ol className={'list-none divide-y dark:divide-neutral-700'}>
                {displayWorkExperience.map((experience, index) => {
                    return (
                        <li
                            key={index}
                            className={'flex flex-col items-start gap-4 py-4'}
                        >
                            <Image
                                src={`https://logo.clearbit.com/${experience.url.replaceAll('https://', '')}`}
                                className={'mt-1 rounded'}
                                alt={`${experience.company} logo`}
                                width={25}
                                height={25}
                            />
                            <div className={'flex flex-col'}>
                                <TypographyH3 className={'mt-0'}>
                                    {experience.title}
                                </TypographyH3>
                                <TypographyP className={'mt-1'}>
                                    {experience.company}
                                </TypographyP>
                                <TypographyP className={'text-sm'}>
                                    {experience.description}
                                </TypographyP>
                                <Link
                                    href={experience.url}
                                    target={'_blank'}
                                    className={'mt-4 w-full'}
                                >
                                    <button
                                        className={
                                            'w-full rounded border-0 bg-neutral-100 px-4 py-2 text-sm font-semibold'
                                        }
                                    >
                                        Visit website
                                    </button>
                                </Link>
                            </div>
                        </li>
                    )
                })}
                {overflowWorkExperience > 0 && (
                    <li className={'pb-2 pt-4 text-center'}>
                        <TypographyLink href={'/work'}>
                            See {overflowWorkExperience} other positions
                        </TypographyLink>
                    </li>
                )}
            </ol>
        </section>
    )
})

SectionResume.displayName = 'SectionResume'
