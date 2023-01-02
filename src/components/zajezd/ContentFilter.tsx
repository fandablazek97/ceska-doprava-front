import Button from "@components/bricks/Button";

type Props = {
  content: string;
  setContent: any;
};

export default function ContentFilter({ content, setContent }: Props) {
  return (
    <div className="mb-20 grid grid-cols-2 gap-2 overflow-hidden rounded-xl bg-body-100 p-1.5 md:grid-cols-4 md:rounded-full">
      <Button
        color={content == "informace" ? "primary" : "gray"}
        shape="pill"
        onClick={() => setContent("informace")}
      >
        Informace
      </Button>
      <Button
        color={content === "termin" ? "primary" : "gray"}
        shape="pill"
        onClick={() => setContent("termin")}
      >
        Termín a ceny
      </Button>
      <Button
        color={content === "galerie" ? "primary" : "gray"}
        shape="pill"
        onClick={() => setContent("galerie")}
      >
        Galerie
      </Button>
      <Button
        color={content === "objednavka" ? "primary" : "gray"}
        shape="pill"
        onClick={() => setContent("objednavka")}
      >
        Objednávka
      </Button>
    </div>
  );
}
