import { cn } from '@/lib/style-utils'
import Link, { LinkProps } from 'next/link'

interface TypographyBaseProps {
    className?: string
    children?: React.ReactNode
}

export const TypographyH1 = ({ className, children }: TypographyBaseProps) => {
    return (
        <h1 className={cn('mt-4 text-3xl font-bold', className)}>{children}</h1>
    )
}

export const TypographyH2 = ({ className, children }: TypographyBaseProps) => {
    return (
        <h2 className={cn('mt-4 text-2xl font-bold', className)}>{children}</h2>
    )
}

export const TypographyH3 = ({ className, children }: TypographyBaseProps) => {
    return (
        <h3 className={cn('mt-4 text-lg font-semibold', className)}>
            {children}
        </h3>
    )
}

export const TypographyP = ({ className, children }: TypographyBaseProps) => {
    return <p className={cn('mt-2 text-base', className)}>{children}</p>
}

export function TypographyListOrdered(props: any) {
    return (
        <ol className="my-6 ml-6 list-inside list-decimal [&>li]:mt-2">
            {props.children}
        </ol>
    )
}

export function TypographyListUnordered(props: any) {
    return (
        <ul className="my-6 ml-6 list-inside list-disc [&>li]:mt-2">
            {props.children}
        </ul>
    )
}

export function TypographyListItem(props: any) {
    return <li className="text-base">{props.children}</li>
}

export function TypographyLead({ children, className }: TypographyBaseProps) {
    return (
        <p
            className={cn(
                'text-muted-foreground dark:text-muted/80 text-xl',
                className,
            )}
        >
            {children}
        </p>
    )
}

export function TypographyLink({
    children,
    className,
    ...props
}: TypographyBaseProps & LinkProps & { target?: string }) {
    return (
        <Link
            {...props}
            referrerPolicy={'no-referrer'}
            className={cn(
                'font-semibold',
                'text-primary-bg',
                'dark:text-primary-foreground',
                'underline-offset-7 underline-6 underline decoration-dashed underline-offset-4',
                'hover:decoration-primary hover:decoration-solid',
                'dark:hover:decoration-primary-foreground',
                'focus-visible:decoration-primary-foreground focus-visible:decoration-solid',
                className,
            )}
        >
            {children}
        </Link>
    )
}
