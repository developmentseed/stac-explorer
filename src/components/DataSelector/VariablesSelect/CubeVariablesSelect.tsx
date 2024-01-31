import { Button, FormControl, FormErrorMessage, FormLabel, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useForm, Controller, SubmitHandler } from "react-hook-form"

import DateTimeSlider from "../../generic/DateTimeSlider";
import { renderConfigToUrlParams } from "../../../utils";
import { SelectProps } from "./types";

type FormValues = {
  variable: string;
  timestep: string;
}

function CubeVariablesSelect({ config, collection, addLayer }: SelectProps) {
  const cubeVariables = collection['cube:variables'];
  const { time } = collection['cube:dimensions'];
  const [ timeMin, timeMax ] = time.extent;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = ({ variable, timestep }) => {
    const renderConfig = {
      variable,
      timestep,
      concept_id: collection.collection_concept_id,
      ...collection.renders[variable]
    }

    addLayer({
      id: crypto.randomUUID(),
      name: collection.id,
      tileUrl: `${config.tiler}/tiles/{z}/{x}/{y}/?${renderConfigToUrlParams(renderConfig)}`,
      config: {
        variable,
        timestep,
        collection: collection.id
      }
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl as="fieldset" isInvalid={!!errors.variable}>
        <legend>Select variable</legend>
        <Controller
          name="variable"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field}>
              <Stack direction="column">
                {Object.keys(cubeVariables).map((variable) => (
                  <Radio value={variable} key={variable}>{ variable }</Radio>
                ))}
              </Stack>
            </RadioGroup>
          )}
          rules={{
            required: { value: true, message: "Select a variable." }
          }}
        />
        { errors.variable && (
          <FormErrorMessage>{ errors.variable.message }</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={!!errors.timestep}>
        <FormLabel as="div" id="time-slider-label">Select time</FormLabel>
        <Controller
          name="timestep"
          control={control}
          render={({ field }) => (
            <DateTimeSlider
              min={timeMin}
              max={timeMax}
              step={time.step}
              aria-labelledby="time-slider-label"
              {...field}
            />
          )}
          rules={{
            required: { value: true, message: "Select a time step." }
          }}
        />
        { errors.timestep && (
          <FormErrorMessage>{ errors.timestep.message }</FormErrorMessage>
        )}
      </FormControl>
      <Button type="submit">Add layer</Button>
    </form>
  );
}

export default CubeVariablesSelect;
