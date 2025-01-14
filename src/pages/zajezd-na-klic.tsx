import Seo from "@components/root/seo/Seo";
import Form from "@components/zajezd-na-klic/Form";
import Hero from "@components/zajezd-na-klic/Hero";
import Info from "@components/zajezd-na-klic/Info";

export default function Page() {
    return (
        <>
            <Seo
                title="Zájezd na klíč – Zájezdy na míru pro vaši skupinu"
                description="Zájezd na klíč je služba, která vám umožní si zvolit destinaci, termín, délku pobytu a další služby přesně podle vašich představ."
            />
            <Hero />
            <Info />
            <Form />
        </>
    );
}
