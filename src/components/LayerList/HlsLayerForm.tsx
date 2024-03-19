import { useCallback, useEffect, useMemo, useState } from "react";
import { LayerConfig, StacCollection } from "../../types";
import { FormControl, FormLabel } from "@chakra-ui/react";
// import DateRangeSlider from "../generic/DateRangeSlider";
import { RangeDatepicker } from "chakra-dayzed-datepicker";
import { durationToMs } from "../../utils";

type Props = {
  config: LayerConfig;
  collection: StacCollection;
  updateLayer: (config: LayerConfig) => void;
}

function HlsLayerForm({ config, collection, updateLayer }: Props) {
  const { datetime_range } = config;
  const [ timeMin, timeMax ] = collection.extent.temporal.interval[0];

  const [ selectedRange, setSelectedRange ] = useState<string | undefined>(config.renderConfig.datetime);

  const [minDate, maxDate] = useMemo(() => {
    const extentMinMs = timeMin ? Date.parse(timeMin) : 0;
    const extentMaxMs = timeMax ? Date.parse(timeMax) : Date.now();

    let minMs = extentMinMs;
    let maxMs = extentMaxMs;

    const selectedDates = selectedRange ? selectedRange.split('/') : [];
    if (selectedDates.length === 1) {
      const interval = datetime_range ? durationToMs(datetime_range[1]) : 0;
      minMs = interval > 0 ? Date.parse(selectedDates[0]) - interval : minMs;
      maxMs = interval > 0 ? Date.parse(selectedDates[0]) + interval : maxMs;
    }

    return [new Date(minMs), new Date(maxMs)];
  }, [datetime_range, selectedRange, timeMax, timeMin])

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
    setSelectedRange(dates.map((d) => d.toISOString()).join('/'));
  }, []);

  useEffect(() => {
    if(selectedRange) {
      updateLayer({
        ...config,
        renderConfig: {
          ...config.renderConfig,
          datetime: selectedRange
        }
      });
    }
  }, [config, selectedRange, updateLayer]);


  return (
    <FormControl>
      <FormLabel as="div">Date range</FormLabel>
      <RangeDatepicker
        selectedDates={selectedDates}
        onDateChange={onChange}
        minDate={minDate}
        maxDate={maxDate}
        usePortal
      />
    </FormControl>
  );
}

export default HlsLayerForm;
