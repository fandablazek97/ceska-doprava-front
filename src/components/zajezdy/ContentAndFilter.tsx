import { useState } from "react";
import Cookies from 'universal-cookie';


import ContentCreator from "./ContentCreator";
import Filter from "./Filter";

import Wrapper from "@components/bricks/Wrapper";

export default function ContentAndFilter() {
  const cookies = new Cookies();
  const [category, setCategory] = useState<string>(cookies.get("category") ? cookies.get("category") : "Vse");
  const [dateFrom, setDateFrom] = useState<string>(cookies.get("dateFrom") ? cookies.get("dateFrom") :
    new Date().toISOString().slice(0, 10)
  );
  const [dateTo, setDateTo] = useState<string>(cookies.get("dateTo") ? cookies.get("dateTo") : "2032-12-31");

  cookies.set("category", category);
  cookies.set("dateFrom", dateFrom);
  cookies.set("dateTo", dateTo);

  return (
    <Wrapper as={"section"} size="lg">
      <Filter
        category={category}
        setCategory={setCategory}
        dateFrom={dateFrom}
        setDateFrom={setDateFrom}
        dateTo={dateTo}
        setDateTo={setDateTo}
      />
      <ContentCreator category={category} dateTo={dateTo} dateFrom={dateFrom} />
    </Wrapper>
  );
}
