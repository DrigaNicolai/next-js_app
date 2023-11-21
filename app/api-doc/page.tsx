import { getApiDocs } from "@lib/swagger";
import ReactSwagger from "@app/api-doc/react-swagger";
import React from "react";

const IndexPage = async () => {
  const spec = await getApiDocs();

  return (
    <section className="container bg-transparent">
      <ReactSwagger spec={spec} />
    </section>
  )
}

export default IndexPage;
