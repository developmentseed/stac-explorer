import { useState } from "react";
import { FormControl, FormLabel, Radio, RadioGroup, Stack } from "@chakra-ui/react";

import { Collection } from "../../../types";
import DateTimeSlider from "../../generic/DateTimeSlider";

type Props = {
  collection: Collection;
}

function CubeVariablesSelect({ collection }: Props) {
  const [ selectedVar, setSelectedVar ] = useState<string>();
  const [ selectedTime, setSelectedTime ] = useState<string>();

  const cubeVariables = collection['cube:variables'];
  const { time } = collection['cube:dimensions'];
  const [ timeMin, timeMax ] = time.extent;

  return (
    <>
      <FormControl as="fieldset">
        <legend>Select variable</legend>
        <RadioGroup name="variable" onChange={setSelectedVar} value={selectedVar}>
          {Object.keys(cubeVariables).map((variable) => (
            <Stack direction="column">
              <Radio value={variable} key={variable}>{ variable }</Radio>
            </Stack>
          ))}
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
    </>
  );
}

export default CubeVariablesSelect;
