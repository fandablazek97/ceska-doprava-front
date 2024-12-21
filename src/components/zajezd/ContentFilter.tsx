import Button from "@components/bricks/Button";

type Props = {
  content: string;
  setContent: any;
  otherImages?: any;
};

export default function ContentFilter({ content, setContent, otherImages }: Props) {
  return (
    <div className={`mb-20 grid gap-2 overflow-hidden rounded-xl bg-body-100 p-1.5 md:rounded-full ${otherImages ? "md:grid-cols-4 grid-cols-2" : "md:grid-cols-3"}`}>
      <Button
        color={content === "informace" ? "primary" : "gray"}
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
      {otherImages &&
        <Button
          color={content === "galerie" ? "primary" : "gray"}
          shape="pill"
          onClick={() => setContent("galerie")}
        >
          Galerie
        </Button>
      }
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
