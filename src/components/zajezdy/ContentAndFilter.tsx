import { useState } from "react";
import Cookies from 'universal-cookie';


import ContentCreator from "./ContentCreator";
import Filter from "./Filter";

import Wrapper from "@components/bricks/Wrapper";

export default function ContentAndFilter({category, zajezdData} : {category: string, zajezdData:any}) {
  return (
    <Wrapper as={"section"} size="lg">
      <Filter
        category={category}
      />
      <ContentCreator category={category} zajezdData={zajezdData} />
    </Wrapper>
  );
}
