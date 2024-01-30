import { useState } from "react";
import { Button, FormControl, FormLabel, Radio, RadioGroup, Stack } from "@chakra-ui/react";

import DateTimeSlider from "../../generic/DateTimeSlider";
import { renderConfigToUrlParams } from "../../../utils";
import { SelectProps } from "./types";

function CubeVariablesSelect({ config, collection, addLayer }: SelectProps) {
  const [ selectedVar, setSelectedVar ] = useState<string>();
  const [ selectedTime, setSelectedTime ] = useState<string>();

  const cubeVariables = collection['cube:variables'];
  const { time } = collection['cube:dimensions'];
  const [ timeMin, timeMax ] = time.extent;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const renderConfig = {
      variable: selectedVar,
      timestep: selectedTime,
      concept_id: collection.collection_concept_id,
      ...collection.renders[selectedVar!]
    }

    addLayer({
      id: crypto.randomUUID(),
      name: collection.id,
      tileUrl: `${config.tiler}/tiles/{z}/{x}/{y}/?${renderConfigToUrlParams(renderConfig)}`,
      config: {
        variable: selectedVar,
        timestep: selectedTime,
        collection: collection.id
      }
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <FormControl as="fieldset">
        <legend>Select variable</legend>
        <RadioGroup name="variable" onChange={setSelectedVar} value={selectedVar}>
          <Stack direction="column">
            {Object.keys(cubeVariables).map((variable) => (
              <Radio value={variable} key={variable}>{ variable }</Radio>
            ))}
          </Stack>
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel as="div" id="time-slider-label">Select time</FormLabel>
        <DateTimeSlider
          min={timeMin}
          max={timeMax}
          step={time.step}
          aria-labelledby="time-slider-label"
          setSelectedTime={setSelectedTime}
        />
      </FormControl>
      <Button type="submit">Add layer</Button>
    </form>
  );
}

export default CubeVariablesSelect;
