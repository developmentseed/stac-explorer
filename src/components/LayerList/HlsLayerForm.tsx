import { useState } from "react";
import { LayerConfig, StacCollection } from "../../types";
import { FormControl, FormLabel } from "@chakra-ui/react";
import DateRangeSlider from "../generic/DateRangeSlider";

type Props = {
  config: LayerConfig;
  collection: StacCollection;
  updateLayer: (config: LayerConfig) => void;
}

function HlsLayerForm({ config, collection, updateLayer }: Props) {
  const { datetime_range } = config;
  const [ timeMin, timeMax ] = collection.extent.temporal.interval[0];

  const [ selectedRange, setSelectedRange ] = useState<string | undefined>(config.renderConfig.datetime);

  const submit = () => {
    updateLayer({
      ...config,
      renderConfig: {
        ...config.renderConfig,
        datetime: selectedRange
      }
    })
  }

  return (
    <FormControl>
      <FormLabel as="div">Date range</FormLabel>
      <DateRangeSlider
        min={timeMin}
        max={timeMax}
        aria-label="Date range"
        value={selectedRange}
        rangeBoundary={datetime_range}
        onChange={setSelectedRange}
        onChangeEnd={submit}
      />
    </FormControl>
  );
}

export default HlsLayerForm;
