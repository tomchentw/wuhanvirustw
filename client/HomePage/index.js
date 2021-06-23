import * as Chakra from "@chakra-ui/react";
import * as React from "react";
import Loading from "../Loading";
import Store from "../Store";
import CompanyGrid from "../CompanyGrid";
import { getSortedCompanyNameCountPairList } from "../companyUtil";

export default function Home({ defaultSortedCompanyNameCountPairList }) {
  const { q5Y5hWData } = React.useContext(Store);
  const lastEntryDatetime = React.useMemo(() => {
    if (!q5Y5hWData || q5Y5hWData.length === 0) {
      return false;
    }
    return q5Y5hWData[q5Y5hWData.length - 1][0];
  }, [q5Y5hWData]);
  const sortedCompanyNameCountPairList = React.useMemo(() => {
    if (!q5Y5hWData || q5Y5hWData.length === 0) {
      return defaultSortedCompanyNameCountPairList;
    }
    return getSortedCompanyNameCountPairList(q5Y5hWData);
  }, [q5Y5hWData]);

  return (
    <React.Fragment>
      <Chakra.Container as="header">
        <Chakra.Heading size="4xl" textAlign="center" py={20}>
          武漢肺炎資訊鏡像站
        </Chakra.Heading>
      </Chakra.Container>

      <Chakra.Container as="main" maxW="container.lg">
        <CompanyGrid
          lastEntryDatetime={lastEntryDatetime}
          sortedCompanyNameCountPairList={sortedCompanyNameCountPairList}
        />
      </Chakra.Container>

      <Chakra.Container as="footer" py={4} textAlign="right">
        <Chakra.Link
          isExternal
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        >
          Powered by VERCEL
        </Chakra.Link>
        .{" "}
        <Chakra.Link isExternal href="https://github.com/tomchentw">
          Author: @tomchentw
        </Chakra.Link>
      </Chakra.Container>
    </React.Fragment>
  );
}

export async function getStaticProps() {
  const rawData = require("../../public/data/raw/1q5Y5hWgQJPfIk9VhSYnSZ3ENZz9UIF03NzSusgpg6F4.json");
  const defaultSortedCompanyNameCountPairList =
    getSortedCompanyNameCountPairList(rawData);

  return {
    props: {
      defaultSortedCompanyNameCountPairList,
    },
  };
}
