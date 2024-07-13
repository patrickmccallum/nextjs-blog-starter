import {
    TypographyH1,
    TypographyH2,
    TypographyLead,
    TypographyLink,
    TypographyP,
} from '@/components/typography'
import { workExperience } from '@/data/work-experience'
import { format } from 'date-fns/format'
import Image from 'next/image'

// Chad profits!
const linkedInUrl = 'https://www.linkedin.com/in/chad-profitz-977536159/'

export default function WorkPage() {
    const currentJob = workExperience[0]

    return (
        <div>
            <TypographyH1>Work</TypographyH1>
            <TypographyLead className={'mt-2 leading-relaxed'}>
                Currently I&apos;m working at {currentJob.company} as a{' '}
                {currentJob.title}. You can learn more about it below and on my{' '}
                <TypographyLink
                    href={linkedInUrl}
                    target={'_blank'}
                >
                    LinkedIn
                </TypographyLink>
                .
            </TypographyLead>
            <div>
                <ol>
                    {workExperience.map((job, index) => (
                        <li
                            key={index}
                            className={
                                'border-neutral-200 pb-4 pt-5 [&:not(:first-child)]:border-t'
                            }
                        >
                            <Image
                                src={`https://logo.clearbit.com/${job.url.replaceAll('https://', '')}`}
                                className={'mt-1 rounded'}
                                alt={`${job.company} logo`}
                                width={25}
                                height={25}
                            />
                            <TypographyH2>{job.company}</TypographyH2>
                            <TypographyLead>{job.title}</TypographyLead>
                            <TypographyP
                                className={'mt-0 text-sm text-neutral-500'}
                            >
                                {format(job.start, 'do MMM yy')} -{' '}
                                {job.end
                                    ? format(job.end, 'do MMM yy')
                                    : 'Present'}
                            </TypographyP>
                            <TypographyP>{job.description}</TypographyP>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}
