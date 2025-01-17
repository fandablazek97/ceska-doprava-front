import Heading from "@components/bricks/Heading"
import Wrapper from "@components/bricks/Wrapper"
import Seo from "@components/root/seo/Seo"
import { ipToFetch } from "@configs/globalConfig"
import { GetStaticProps } from 'next'
import Link from "next/link"

type Category = {
    id: number
    kategorie: string
}

type Position = {
    id: number
    attributes: {
        Nazev: string
        slug: string
        kategorie: Category[]
    }
}

type KarieraProps = {
    positions: Position[]
}

function kariera({ positions }: KarieraProps) {


    return (
        <><Seo title={`Kariéra | Česká Doprava`} description={`Otevřené pracovní pozice v České Dopravě.`} />
            <Wrapper
                as="header"
                paddedContent="base"
                className="flex items-center justify-start"
            >
                <div className="flex flex-col pt-10">
                    <Heading level={1} size="xl" className="mb-8 max-w-xl">
                        Volná pracovní místa
                    </Heading>
                    <p className="text-lg font-medium">
                        Baví nás posouvat dopravu na vyšší úroveň a oceňujeme schopnosti našich řidičů. Ať už hledáte stabilní práci, nové výzvy, nebo tým, který vás podpoří, u nás najdete vše. Navíc na
                        vás čekají skvělé benefity, podpora v profesním růstu a přátelská atmosféra! Staňte se součástí našeho týmu a vydejte se na cestu za skvělou kariérou!
                    </p>
                    <div className="grid lg:grid-cols-2 gap-8 mt-10 grid-cols-1">
                        {positions.map((position) => (
                            <OpenPosition
                                key={position.id}
                                title={position.attributes.Nazev}
                                tags={position.attributes.kategorie?.map(cat => ({
                                    tag: cat.kategorie
                                })) || []}
                                href={`/${position.attributes.slug}`}
                            />
                        ))}
                    </div>
                </div>
            </Wrapper>
        </>
    )
}

type PositionProps = {
    title: string
    tags: { tag: string }[]
    href: string
}

function OpenPosition({ title, tags, href }: PositionProps) {
    return (
        <Link
            className="bg-gray-200 rounded-xl px-8 pt-8 pb-12 lg:hover:scale-105 transition-transform duration-300 ease-in-out"
            href={"/kariera" + href}
        >
            <Heading level={2} size="base" className="mb-8 max-w-xl">
                {title}
            </Heading>
            <ul className="flex gap-2 flex-wrap">
                {tags.map((tag, index) => (
                    <li
                        key={index}
                        className="rounded-full bg-red-500/20 font-bold text-red-600 text-xs px-3 py-1"
                    >
                        {tag.tag}
                    </li>
                ))}
            </ul>
        </Link>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    try {
        const response = await fetch(`${ipToFetch}/api/pracovni-pozices?populate=*`)
        const { data } = await response.json()



        return {
            props: {
                positions: data || []
            },
            revalidate: 60
        }
    } catch (error) {
        console.error('Error fetching positions:', error)
        return {
            props: {
                positions: []
            },
            revalidate: 60
        }
    }
}

export default kariera