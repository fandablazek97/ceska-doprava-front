import BasicContact from "@components/bricks/BasicContact"
import Heading from "@components/bricks/Heading"
import Wrapper from "@components/bricks/Wrapper"
import Seo from "@components/root/seo/Seo"
import { ipToFetch } from "@configs/globalConfig"
import { GetStaticProps } from 'next'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

interface Position {
    id: number
    attributes: {
        Nazev: string
        popis: string
        slug: string
        kategorie: {
            data: Array<{
                id: number
                attributes: {
                    nazev: string
                }
            }>
        }
    }
}

interface PoziceProps {
    position: Position | null
}

export default function Pozice({ position }: PoziceProps) {
    if (!position) {
        return (
            <Wrapper
                as="article"
                paddedContent="base"
                className="flex items-start justify-start"
            >
                <div className="flex flex-col pt-10">
                    <Link
                        href="/kariera"
                        className="text-red-600 hover:text-red-700 mb-4 flex items-center"
                    >
                        ← Zpět na všechny pozice
                    </Link>
                    <Heading level={1} size="xl" className="mb-8">
                        Pozice nenalezena
                    </Heading>
                </div>
            </Wrapper>
        )
    }

    return (
        <>
            <Seo title={`Pracovní pozice | Česká Doprava`} description={position.attributes.popis} />
            <Wrapper
                paddedContent="base"
                size="base"
                className="flex items-start justify-start"
            >
                <div className="flex flex-col pt-10 max-w-4xl">
                    <Link
                        href="/kariera"
                        className="text-red-600 hover:text-red-700 mb-4 flex items-center"
                    >
                        ← Zpět na všechny pozice
                    </Link>

                    <Heading level={1} size="xl" className="mb-8">
                        {position.attributes.Nazev}
                    </Heading>

                    {position.attributes.kategorie?.data?.length > 0 && (
                        <div className="mb-8">
                            <ul className="flex gap-2 flex-wrap">
                                {position.attributes.kategorie.data.map((category) => (
                                    <li
                                        key={category.id}
                                        className="rounded-full bg-red-500/20 font-bold text-red-600 text-xs px-3 py-1"
                                    >
                                        {category.attributes.nazev}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="prose prose-lg max-w-none">
                        <ReactMarkdown>
                            {position.attributes.popis}
                        </ReactMarkdown>
                    </div>
                </div>
            </Wrapper>
            <BasicContact
                heading="Máte zájem o tuto pozici?"
                text="Pro více informací nebo zaslání životopisu jsme vám k dispozici na níže uvedených kontaktech. Neváhejte se na nás obrátit."
            />
        </>
    )
}

export async function getStaticPaths() {
    try {
        const response = await fetch(`${ipToFetch}/api/pracovni-pozices?populate=*`)
        const { data } = await response.json()

        const paths = data
            .filter((position: Position) => position.attributes.slug)
            .map((position: Position) => ({
                params: { slug: position.attributes.slug }
            }))

        return {
            paths,
            fallback: true,
        }
    } catch (error) {
        console.error('Error in getStaticPaths:', error)
        return {
            paths: [],
            fallback: true
        }
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
        const response = await fetch(
            `${ipToFetch}/api/pracovni-pozices?populate=*&filters[slug][$eq]=${params?.slug}`
        )

        const { data } = await response.json()


        return {
            props: {
                position: data?.[0] || null
            },
            revalidate: 60
        }
    } catch (error) {
        console.error('Error fetching position:', error)
        return {
            props: {
                position: null
            },
            revalidate: 60
        }
    }
}