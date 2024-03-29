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

export default function Home() {
    return (
        <div className="flex flex-col gap-2">
            <SectionIntro />
            <SectionAboutMe />
            <SectionBlog />
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
        <section className={'max-w-prose'}>
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
    const blogs = getBlogPosts({
        includeUnpublished: false,
        sortBy: 'datePublishedDesc',
        limit: 10,
    })

    return (
        <section>
            <TypographyH2>Recent posts</TypographyH2>
            <ol className="flex max-w-prose flex-col gap-2">
                {blogs.map((blog) => (
                    <li
                        key={blog.id}
                        className="border-l-4 border-l-neutral-200 py-4 pl-4"
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
            </ol>
        </section>
    )
}
