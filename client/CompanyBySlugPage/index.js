import * as Chakra from "@chakra-ui/react";
import * as React from "react";
import { useRouter } from "next/router";
import Loading from "../Loading";
import Store from "../Store";
import SheetTable from "../SheetTable";
import {
  getSortedCompanyNameCountPairList,
  isValidName,
  toSlug,
} from "../companyUtil";

export default function CompanyBySlugPage({ initialData }) {
  const {
    query: { company },
  } = useRouter();
  const { q5Y5hWData } = React.useContext(Store);
  const [lastEntryDatetime, filteredData] = React.useMemo(() => {
    if (!q5Y5hWData || q5Y5hWData.length === 0) {
      return [false];
    }
    return [
      q5Y5hWData[q5Y5hWData.length - 1][0],
      filterDataCompanyBySlug(q5Y5hWData, company),
    ];
  }, [q5Y5hWData, company]);

  return (
    <React.Fragment>
      <Chakra.Container as="header">
        <Chakra.Heading size="4xl" textAlign="center" py={20}>
          企業防疫政策普查
        </Chakra.Heading>
      </Chakra.Container>

      <Chakra.Container as="main" maxW="container.lg">
        <SheetTable
          lastEntryDatetime={lastEntryDatetime}
          header={q5Y5hWData?.slice(0, 2)}
          data={filteredData || initialData}
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

function filterDataCompanyBySlug(rawData, company) {
  return rawData.filter((list) => list[1].match(new RegExp(company, "i")));
}

export async function getStaticPaths() {
  const rawData = require("../../public/data/raw/1q5Y5hWgQJPfIk9VhSYnSZ3ENZz9UIF03NzSusgpg6F4.json");
  const sortedCompanyNameCountPairList =
    getSortedCompanyNameCountPairList(rawData);

  return {
    paths: sortedCompanyNameCountPairList.map(([company, count]) => ({
      params: { company },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params: { company } }) {
  const rawData = require("../../public/data/raw/1q5Y5hWgQJPfIk9VhSYnSZ3ENZz9UIF03NzSusgpg6F4.json");
  /**
   * Return a subset of data
   */
  const initialData = filterDataCompanyBySlug(rawData, company);
  const props = {
    initialData,
  };
  return { props };
}
