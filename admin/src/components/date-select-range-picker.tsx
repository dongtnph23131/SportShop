import {
  DateRangePicker,
  DateRangePickerItem,
  DateRangePickerValue,
} from "@tremor/react";
import { addDays, format } from "date-fns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

export const DateSelect = ({ dayCount }: { dayCount: number }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [from, to] = React.useMemo(() => {
    let fromDay: Date | undefined;
    let toDay: Date | undefined;

    if (dayCount) {
      toDay = new Date();
      fromDay = addDays(toDay, -dayCount);
    }

    return [fromDay, toDay];
  }, [dayCount]);

  const [value, setValue] = useState<DateRangePickerValue>({
    from,
    to,
  });

  // Create query string
  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams]
  );

  // Update query string
  React.useEffect(() => {
    router.push(
      `${pathname}?${createQueryString({
        from: value?.from ? format(value.from, "yyyy-MM-dd") : null,
        to: value?.to ? format(value.to, "yyyy-MM-dd") : null,
      })}`,
      {
        scroll: false,
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value?.from, value?.to]);

  return (
    <DateRangePicker
      value={value}
      onValueChange={setValue}
      defaultValue={{ from, to }}
      enableSelect
      enableYearNavigation
      selectPlaceholder="Select a date range"
      color="gray"
    ></DateRangePicker>
  );
};
