import { useMemo } from "react";
import { useImmer } from "use-immer";
import DatePicker from "react-datepicker";
import { VStack, FormLabel, Input, FormControl } from "@chakra-ui/react";

export const useDatepickerRange = () => {
  const [selectedDate, produceSelectedDate] = useImmer(() => {
    return {
      startDate: null as Date | null,
      endDate: null as Date | null,
    };
  });

  const datepicker = useMemo(() => {
    return (
      <VStack align="center" justify="center">
        <FormControl>
          <FormLabel>Start</FormLabel>

          <DatePicker
            selected={selectedDate.startDate}
            onChange={(dates) => {
              if (!Array.isArray(dates)) {
                produceSelectedDate((draft) => {
                  draft.startDate = dates;
                });
              }
            }}
            startDate={selectedDate.startDate}
            endDate={selectedDate.endDate}
            timeIntervals={30}
            showTimeSelect
            timeFormat="p"
            dateFormat="PPpp z"
            isClearable
            customInput={<Input />}
            selectsStart
            maxDate={selectedDate.endDate}
            calendarStartDay={1}
            placeholderText="Set start time"
          />
        </FormControl>

        <FormControl>
          <FormLabel>End</FormLabel>
          <DatePicker
            selected={selectedDate.endDate}
            onChange={(dates) => {
              if (!Array.isArray(dates)) {
                produceSelectedDate((draft) => {
                  draft.endDate = dates;
                });
              }
            }}
            isClearable
            timeIntervals={30}
            showTimeSelect
            timeFormat="p"
            dateFormat="PPpp z"
            customInput={<Input />}
            selectsEnd
            minDate={selectedDate.startDate}
            calendarStartDay={1}
            placeholderText="Set end time"
          />
        </FormControl>
      </VStack>
    );
  }, [selectedDate, produceSelectedDate]);

  return {
    selectedDate,
    datepicker,
  };
};
