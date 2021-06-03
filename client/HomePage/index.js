import * as Chakra from "@chakra-ui/react";
import * as React from "react";
import Loading from "../Loading";
import Store from "../Store";
import SheetTable from "../SheetTable";

export default function Home() {
  const { q5Y5hWData } = React.useContext(Store);
  const lastEntryDatetime = React.useMemo(() => {
    if (!q5Y5hWData || q5Y5hWData.length === 0) {
      return false;
    }
    return q5Y5hWData[q5Y5hWData.length - 1][0];
  }, [q5Y5hWData]);

  return (
    <React.Fragment>
      <Chakra.Container as="header">
        <Chakra.Heading size="4xl" textAlign="center" py={20}>
          武漢肺炎資訊鏡像站
        </Chakra.Heading>
      </Chakra.Container>

      <Chakra.Container as="main" maxW="container.lg">
        {q5Y5hWData ? (
          <SheetTable
            lastEntryDatetime={lastEntryDatetime}
            header={q5Y5hWData.slice(0, 2)}
            data={q5Y5hWData.slice(2)}
          />
        ) : (
          <Loading />
        )}
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
