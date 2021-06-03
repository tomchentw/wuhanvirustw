import * as Chakra from "@chakra-ui/react";
import * as React from "react";
import useSWR from "swr";
import { dateTimeFullFormat } from "../format";
import Loading from "./Loading";

function fetcherJson(...args) {
  return fetch(...args).then((r) => r.json());
}

export default function SheetData() {
  const { data, error } = useSWR(
    `/wuhanvirustw/data/raw/1q5Y5hWgQJPfIk9VhSYnSZ3ENZz9UIF03NzSusgpg6F4.json`,
    fetcherJson,
    {
      refreshInterval: 5 * 60 * 1000,
    }
  );
  const lastEntryDatetime = React.useMemo(() => {
    if (!data || data.length === 0) {
      return false;
    }
    return data[data.length - 1][0];
  }, [data]);

  if (error) return <div>failed to load</div>;
  if (!data) {
    return <Loading />;
  }
  return (
    <React.Fragment>
      <Chakra.Heading as="h4" size="md" textAlign="right">
        最新資料 {lastEntryDatetime}
        <br />
        <Chakra.Text as="i" fontSize="sm">
          資料來源每五分鐘自動更新
        </Chakra.Text>
      </Chakra.Heading>
      <Chakra.Table variant="striped">
        <Chakra.TableCaption />
        <Chakra.Thead>
          {data.slice(0, 2).map((list, index) => (
            <Chakra.Tr key={index}>
              {list.map((text, index) => (
                <Chakra.Th key={index}>{text}</Chakra.Th>
              ))}
            </Chakra.Tr>
          ))}
        </Chakra.Thead>
        <Chakra.Tbody>
          {data.slice(2).map((list, index) => (
            <Chakra.Tr key={index}>
              {list.map((text, index) => (
                <Chakra.Td key={index}>{text}</Chakra.Td>
              ))}
            </Chakra.Tr>
          ))}
        </Chakra.Tbody>
        <Chakra.Tfoot />
      </Chakra.Table>
      <Chakra.Box as="pre" py={4} display="none">
        <Chakra.Code width="full">{data}</Chakra.Code>
      </Chakra.Box>
    </React.Fragment>
  );
}
