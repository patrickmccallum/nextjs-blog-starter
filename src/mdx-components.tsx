import type { MDXComponents } from 'mdx/types'
import {
    TypographyH1,
    TypographyH2,
    TypographyLink,
    TypographyListItem,
    TypographyListOrdered,
    TypographyListUnordered,
    TypographyP,
} from './components/typography'

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...components,
        h1: TypographyH1,
        h2: TypographyH2,
        p: TypographyP,
        ol: TypographyListOrdered,
        ul: TypographyListUnordered,
        li: TypographyListItem,
        a: (props) => (
            <TypographyLink
                href={props.href!}
                target={'_blank'}
            >
                {props.children}
            </TypographyLink>
        ),
        link: (props) => (
            <TypographyLink
                href={props.href!}
                target={'_blank'}
            >
                {props.children}
            </TypographyLink>
        ),
    }
}
