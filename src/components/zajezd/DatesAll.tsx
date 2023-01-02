import Heading from "@components/bricks/Heading";
import Wrapper from "@components/bricks/Wrapper";

type Props = {
  dateAndPrice: [
    {
      datumOd: string;
      datumDo: string;
      cena: number;
      pocetDni: number;
      pocetNoci: number;
    }
  ];
};

export default function DatesAll({ dateAndPrice }: Props) {
  // Sort dates
  dateAndPrice.sort(function (a, b) {
    return new Date(a.datumOd).getTime() - new Date(b.datumOd).getTime();
  });

  // Changes date to dd.mm.yyyy format
  function changeDateType(date: string) {
    var newDate =
      date.split("-")[2] + "." + date.split("-")[1] + "." + date.split("-")[0];
    return newDate;
  }

  // Returns first 2 letters of a day
  function getDayName(date: string) {
    var d = new Date(date);

    switch (d.getDay()) {
      case 0:
        return "Ne";
      case 1:
        return "Po";
      case 2:
        return "Út";
      case 3:
        return "St";
      case 4:
        return "Čt";
      case 5:
        return "Pá";
      case 6:
        return "So";
    }
  }

  // Create function to convert price to number with spaces every thousand
  function numberWithSpaces(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  return (
    <Wrapper size="base" as={"section"} className="mb-10">
      <Heading level={2} size={"base"}>
        Termíny a ceny
      </Heading>
      <div className="mt-12 overflow-x-auto">
        <table className="w-full">
          <thead className="hidden border-b-2 border-gray-200 pb-4 text-left md:table-header-group">
            <tr>
              <th className="py-4">Odjezd</th>
              <th>Návrat</th>
              <th className="text-center">Počet dní/nocí</th>
              <th className="w-40 text-left">Cena</th>
            </tr>
          </thead>
          <tbody>
            {dateAndPrice.map((entry, key) => {
              /* if(entry.datumOd > new Date().toISOString().slice(0, 10)){ */
              return (
                <tr
                  className={`mt-5 block w-full rounded-md border-gray-200 px-5 py-2 md:mt-0 md:table-row md:border-b md:py-0 ${
                    key % 2 === 0 && "bg-gray-100 md:bg-white"
                  }`}
                  key={key}
                >
                  <td
                    data-label="Odjezd"
                    className="block text-right font-medium text-gray-500 before:float-left before:font-bold before:content-[attr(data-label)] md:table-cell md:py-3 md:text-left md:before:content-none"
                  >
                    {getDayName(entry.datumOd) +
                      " " +
                      changeDateType(entry.datumOd).slice(0, 6)}
                  </td>
                  <td
                    data-label="Návrat"
                    className="block text-right font-medium text-gray-500 before:float-left before:font-bold before:content-[attr(data-label)] md:table-cell md:py-3 md:text-left md:before:content-none"
                  >
                    {entry.datumDo
                      ? getDayName(entry.datumDo) +
                        " " +
                        changeDateType(entry.datumDo)
                      : getDayName(entry.datumOd) +
                        " " +
                        changeDateType(entry.datumOd)}
                  </td>
                  <td
                    data-label="Počet dní/nocí"
                    className="block text-right font-medium text-gray-500 before:float-left before:font-bold before:content-[attr(data-label)] md:table-cell md:py-3 md:text-center md:before:content-none"
                  >
                    {entry.pocetDni} / {entry.pocetNoci}
                  </td>
                  <td
                    data-label="Cena"
                    className="block text-right font-medium text-gray-500 before:float-left before:font-bold before:content-[attr(data-label)] md:table-cell md:py-3 md:pr-5 md:text-left md:before:content-none"
                  >
                    {numberWithSpaces(entry.cena)} Kč / osoba
                  </td>
                </tr>
              );
              /* } */
            })}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
}
