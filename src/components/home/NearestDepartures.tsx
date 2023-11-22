import Heading from "@components/bricks/Heading";
import Wrapper from "@components/bricks/Wrapper";
import NearestDeparturesCard from "./NearestDeparturesCard";

export default function NearestDepartures({ data }: { data: any }) {
  return (
    <Wrapper className="pb-28 md:pb-36">
      <Heading level={2} size="sm" className="mb-12">
        Vybrané zájezdy
      </Heading>
      {data ? (
        <div className="grid grid-cols-1 gap-6 xs:grid-cols-2 md:gap-10 lg:grid-cols-4">
          {data.map((trip: any) => (
            <NearestDeparturesCard
              tripId={trip.id}
              key={trip.id}
              imageSrc={trip.attributes.uvodniFoto.data.attributes.url}
              imageAlt={trip.attributes.nazev}
              country={trip.attributes.stat}
              name={trip.attributes.nazev}
              dateAndPrice={trip.attributes.terminACena}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 xs:grid-cols-2 md:gap-10 lg:grid-cols-4">
          <NearestDeparturesCard fake={true} />
          <NearestDeparturesCard fake={true} />
          <NearestDeparturesCard fake={true} />
          <NearestDeparturesCard fake={true} />
        </div>
      )}
    </Wrapper>
  );
}
