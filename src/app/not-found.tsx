import { TypographyH1, TypographyP } from '@/components/typography'

export default function NotFoundPage() {
    return (
        <div className="max-w-prose">
            <TypographyH1>404</TypographyH1>
            <TypographyP>
                Sorry, I looked everywhere, I promise, absolutely everywhere;
                even through the couch, and the bed, and the trash cans as well.
            </TypographyP>
            <TypographyP>
                Believe me, I tried! But for that URL you gave? Well,
                there&apos;s no easy way to say this, so, here it is I&apos;m
                just gonna say it...
            </TypographyP>
            <TypographyP>The truth is...</TypographyP>
            <TypographyP>With THAT URL?</TypographyP>
            <TypographyP className="font-bold">404 File Not Found</TypographyP>
        </div>
    )
}
