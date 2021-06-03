import * as Chakra from "@chakra-ui/react";
import * as React from "react";
import useSWR from "swr";
import SheetTable from "../SheetTable";
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
    <SheetTable
      lastEntryDatetime={lastEntryDatetime}
      header={data.slice(0, 2)}
      data={data.slice(2)}
    />
  );
}
