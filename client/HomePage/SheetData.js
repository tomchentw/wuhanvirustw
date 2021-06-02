import * as Chakra from "@chakra-ui/react";
import * as React from "react";
import useSWR from "swr";
import { dateTimeFullFormat } from "../format";
import Loading from "./Loading";

function fetcherText(...args) {
  return fetch(...args).then((r) => r.text());
}

export default function SheetData() {
  const { data, error } = useSWR(
    `/wuhanvirustw/data/raw/1q5Y5hWgQJPfIk9VhSYnSZ3ENZz9UIF03NzSusgpg6F4.csv`,
    fetcherText,
    {
      refreshInterval: 5 * 60 * 1000,
    }
  );

  if (error) return <div>failed to load</div>;
  if (!data) {
    return <Loading />;
  }
  return (
    <React.Fragment>
      <Chakra.Heading as="h4" size="md" textAlign="right">
        現時 {dateTimeFullFormat.format(new Date())}
        <br />
        <Chakra.Text as="i" fontSize="sm">
          資料來源每五分鐘自動更新
        </Chakra.Text>
      </Chakra.Heading>
      <Chakra.Box as="pre" py={4}>
        <Chakra.Code width="full">{data}</Chakra.Code>
      </Chakra.Box>
    </React.Fragment>
  );
}
