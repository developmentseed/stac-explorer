import { FormControl, FormLabel } from "@chakra-ui/react";
import { StacCollection, LayerConfig } from "../../types";
import DateTimeSlider from "../generic/DateTimeSlider";
import { useState } from "react";

type Props = {
  config: LayerConfig;
  collection: StacCollection;
  updateLayer: (config: LayerConfig) => void;
}

function StacLayerForm({ config, collection, updateLayer }: Props) {
  const time = collection['cube:dimensions']?.time || collection.extent.temporal;
  const [ timeMin, timeMax ] = time.extent ? time.extent : time.interval[0];
  const labelId = `time-slider-label-${config.id}`;

  const [ selectedTime, setSelectedTime ] = useState<string>();
  console.log(`Selected time is ${selectedTime}`);
  const submit = () => {
    updateLayer({
      ...config,
      renderConfig: {
        ...config.renderConfig,
        datetime: selectedTime
      }
    })
  }

  return (
    <FormControl>
      <FormLabel as="div" id={labelId}>Select time</FormLabel>
      <DateTimeSlider
        min={timeMin}
        max={timeMax}
        step={time.step}
        datetime_range="P7D"
        aria-labelledby={labelId}
        value={selectedTime || config.renderConfig.datetime || timeMin}
        onChange={setSelectedTime}
        onChangeEnd={submit}
      />
    </FormControl>
  );
}

export default StacLayerForm;
