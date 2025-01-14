import Heading from "@components/bricks/Heading";
import Wrapper from "@components/bricks/Wrapper";

export default function Info() {
    return (
        <Wrapper size="base" className="space-y-8 text-black">
            <Heading level={2} size="base">
                Zajistíme
            </Heading>
            <ul className="font-semibold text-black list-disc list-inside">
                <li>Odborné a tematické exkurz</li>
                <li>Návštěvy divadelních představení a dalších kulturních akcí</li>
                <li>Turistické výlety</li>
                <li>Tematicky zaměřené jednodenní i vícedenní akce v ČR i v zahraničí</li>
                <li>Návštěvy adventních trhů</li>
            </ul>
            <p>Dopravu zajišťujeme vlastními autobusy s plnou zájezdovou výbavou. Podle přání vás může doprovodit technický delegát nebo odborný
                průvodce. Ceny přizpůsobujeme tomu, že se jedná o školní a studentské akce tak, aby zůstali dostupné pro všechny.</p>

            <p>Fantazii se meze nekladou. Kontaktujte nás a sdělte nám vaše požadavky a představy. O zbytek se už postaráme. Zdarma vám vytvoříme
                cenovou kalkulaci a návrh programu. Domluvíme se na termínu a vše potřebné zajistíme. Vám už pak nezbývá, než se těšit na nové zážitky!</p>
        </Wrapper>
    );
}
