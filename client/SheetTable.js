import * as Chakra from "@chakra-ui/react";
import * as React from "react";
import Link from "next/link";
import { isValidAsRegExp } from "./validator";

export default function SheetTable({ lastEntryDatetime, header, data }) {
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
          {header?.map((list, index) => (
            <Chakra.Tr key={index}>
              {list.map((text, index) => (
                <Chakra.Th key={index}>{text}</Chakra.Th>
              ))}
            </Chakra.Tr>
          ))}
        </Chakra.Thead>
        <Chakra.Tbody>
          {data?.map((list, index) => (
            <Chakra.Tr key={index}>
              {list.map((text, index) => (
                <Chakra.Td key={index}>
                  {index === 1 && isValidAsRegExp(text) ? (
                    <Link
                      href={{
                        pathname: "/company/[company]",
                        query: { company: text },
                      }}
                      passHref
                    >
                      <Chakra.Link>{text}</Chakra.Link>
                    </Link>
                  ) : (
                    text
                  )}
                </Chakra.Td>
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
