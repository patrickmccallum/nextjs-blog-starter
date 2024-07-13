import {
    TypographyH1,
    TypographyLink,
    TypographyP,
} from '@/components/typography'

export default function NotFoundPage() {
    return (
        <div className="max-w-prose">
            <TypographyH1>404</TypographyH1>
            <TypographyP>Sorry, checked twice, but...</TypographyP>
            <TypographyP className="font-bold">File Not Found</TypographyP>
            <div className={'pt-2'}>
                <TypographyLink href={'/'}>Go back home</TypographyLink>
            </div>
        </div>
    )
}
