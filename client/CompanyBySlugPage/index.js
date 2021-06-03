import * as Chakra from "@chakra-ui/react";
import * as React from "react";
import { useRouter } from "next/router";
import Loading from "../Loading";
import Store from "../Store";
import SheetTable from "../SheetTable";

export default function CompanyBySlugPage({ initialData }) {
  const {
    query: { encodedSlug },
  } = useRouter();
  const slug = decodeURIComponent(encodedSlug);
  const { q5Y5hWData } = React.useContext(Store);
  const [lastEntryDatetime, filteredData] = React.useMemo(() => {
    if (!q5Y5hWData || q5Y5hWData.length === 0) {
      return [false];
    }
    return [
      q5Y5hWData[q5Y5hWData.length - 1][0],
      filterDataCompanyBySlug(q5Y5hWData, slug),
    ];
  }, [q5Y5hWData, slug]);
  try {
    if (typeof (filteredData || initialData) === "undefined") {
      console.error(slug, initialData);
    }
  } catch {}

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

function filterDataCompanyBySlug(rawData, slug) {
  return rawData.filter(([, company]) => company.match(new RegExp(slug, "i")));
}

export async function getStaticPaths() {
  const rawData = require("../../public/data/raw/1q5Y5hWgQJPfIk9VhSYnSZ3ENZz9UIF03NzSusgpg6F4.json");
  const countBySlugName = new Map();
  rawData.forEach(([, company], index) => {
    if (index < 2 || !company || !company.trim()) {
      return;
    }
    const encodedSlug = encodeURIComponent(company.toLowerCase());
    if (encodedSlug.length > 100) {
      return;
    }
    try {
      new RegExp(encodedSlug);
    } catch {
      return;
    }
    countBySlugName.set(
      encodedSlug,
      1 + (countBySlugName.get(encodedSlug) || 0)
    );
  });
  return {
    paths: [...countBySlugName.entries()]
      .sort((a, b) => a[1] - b[1])
      .slice(0, 300)
      .map(([encodedSlug, count]) => ({
        params: { encodedSlug },
      })),
    fallback: false,
  };
}

export async function getStaticProps({ params: { encodedSlug } }) {
  const slug = decodeURIComponent(encodedSlug);
  const rawData = require("../../public/data/raw/1q5Y5hWgQJPfIk9VhSYnSZ3ENZz9UIF03NzSusgpg6F4.json");
  /**
   * Return a subset of data
   */
  const initialData = filterDataCompanyBySlug(rawData, slug);
  const props = {
    initialData,
  };
  return { props };
}
