import { FormControl, FormLabel } from "@chakra-ui/react";
import { DataCubeCollection, LayerConfig } from "../../types";
import DateTimeSlider from "../generic/DateTimeSlider";
import { useState } from "react";

type Props = {
  config: LayerConfig;
  collection: DataCubeCollection;
  updateLayer: (config: LayerConfig) => void;
}

function CubeLayerForm({ config, collection, updateLayer }: Props) {
  const { time } = collection['cube:dimensions'];
  const [ timeMin, timeMax ] = time.extent;
  const labelId = `time-slider-label-${config.id}`;

  const [ selectedTime, setSelectedTime ] = useState<string>();

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
        aria-labelledby={labelId}
        value={selectedTime || config.renderConfig.datetime || timeMin}
        onChange={setSelectedTime}
        onChangeEnd={submit}
      />
    </FormControl>
  );
}

export default CubeLayerForm;
