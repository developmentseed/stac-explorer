import { useCallback, useMemo, useState } from "react";
import { LayerConfig, StacCollection } from "../../types";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import { RangeDatepicker } from "chakra-dayzed-datepicker";
import { durationToMs } from "../../utils";

type Props = {
  config: LayerConfig;
  collection: StacCollection;
  updateLayer: (config: LayerConfig) => void;
}

function LayerFormWithDatePicker({ config, collection, updateLayer }: Props) {
  const { datetime_range } = config;
  const [ timeMin, timeMax ] = collection.extent.temporal.interval[0];
  const minDate = useMemo(() => new Date(timeMin ? Date.parse(timeMin) : 0), [timeMin]);
  const maxDate = useMemo(() => new Date(timeMax ? Date.parse(timeMax) : Date.now()), [timeMax]);

  const [ selectedRange, setSelectedRange ] = useState<string | undefined>(config.renderConfig.datetime);
  const [ rangeError, setRangeError ] = useState<string>('');

  const selectedDates = useMemo(() => {
    if (!selectedRange) {
      return [minDate, maxDate];
    }
    const dates = selectedRange.split('/')
      .filter((d) => d !== '..')
      .map((d) => new Date(Date.parse(d)));
    return dates;
  }, [maxDate, minDate, selectedRange]);

  const onChange = useCallback((dates: Date[]) => {
    const selected = dates.map((d) => d.toISOString()).join('/');
    setSelectedRange(selected);

    let isValid = true;
    if (dates.length === 2 && datetime_range) {
      const minRangeMs = durationToMs(datetime_range[0]);
      const maxRangeMs = durationToMs(datetime_range[1]);
      const selectedRangeMs = dates[1].getTime() - dates[0].getTime();

      if (selectedRangeMs < minRangeMs || selectedRangeMs > maxRangeMs) {
        isValid = false;
      }
    }

    if (dates.length === 2 && isValid) {
      setRangeError('');
      updateLayer({
        ...config,
        renderConfig: {
          ...config.renderConfig,
          datetime: selected
        }
      });
    } else {
      setRangeError('The selected date range must be greater than 7 days and smaller than 14.');
    }
  }, [config, datetime_range, updateLayer]);

  return (
    <FormControl isInvalid={!!rangeError}>
      <FormLabel as="div">Date range</FormLabel>
      <RangeDatepicker
        selectedDates={selectedDates}
        onDateChange={onChange}
        minDate={minDate}
        maxDate={maxDate}
        usePortal
      />
      <FormErrorMessage>{ rangeError }</FormErrorMessage>
    </FormControl>
  );
}

export default LayerFormWithDatePicker;
