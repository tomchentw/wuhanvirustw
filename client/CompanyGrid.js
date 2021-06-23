import * as Chakra from "@chakra-ui/react";
import * as React from "react";
import Link from "next/link";
import { isValidName, toSlug } from "./companyUtil";

export default function CompanyGrid({
  lastEntryDatetime,
  sortedCompanyNameCountPairList,
}) {
  return (
    <React.Fragment>
      <Chakra.Heading as="h4" size="md" textAlign="right">
        最新資料 {lastEntryDatetime}
        <br />
        <Chakra.Text as="i" fontSize="sm">
          資料來源每五分鐘自動更新
        </Chakra.Text>
      </Chakra.Heading>
      <Chakra.SimpleGrid py={4} columns={[1, 2, 3, 4, 6]} spacing={[2, 6]}>
        {sortedCompanyNameCountPairList.map(([company, count]) => (
          <Link
            key={company}
            href={{
              pathname: "/company/[company]",
              query: { company: toSlug(company) },
            }}
            passHref
          >
            <Chakra.Link
              borderRadius="md"
              borderWidth="1px"
              py={[4, 6]}
              px={4}
              textAlign="center"
              fontSize={["md", "lg"]}
            >
              {company} ({count})
            </Chakra.Link>
          </Link>
        ))}
      </Chakra.SimpleGrid>
    </React.Fragment>
  );
}
