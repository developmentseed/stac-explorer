import { Button, FormControl, FormErrorMessage, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useForm, Controller, SubmitHandler } from "react-hook-form"

import { SelectProps } from "./types";

type FormValues = {
  renderOption: string;
  timestep: string;
}

function RendersOptionSelect({ collection, addLayer }: SelectProps) {
  const { stac } = collection;
  const cubeVariables = stac['cube:variables'];
  const variableOptions = cubeVariables ? Object.keys(cubeVariables) : null;
  const renderOptions = Object.keys(stac.renders);
  // layer options are cube variables if they exist, otherwise renderOpions
  const layerOptions = variableOptions || renderOptions;

  // Simplified time determination logic
  const timeInfo = stac['cube:dimensions']?.time || stac.extent.temporal;
  const timeMin = stac['cube:dimensions'] ? timeInfo.extent[0] : timeInfo.interval[0][0];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = ({ renderOption }) =>{
    const variable = cubeVariables && renderOption in cubeVariables ? renderOption : undefined;
    let renderConfig = {
      renderOption,
      timestep: timeMin || '1970-01-01T00:00:00Z',
      collection: collection.id,
      variable
    }
    addLayer({
      id: crypto.randomUUID(),
      name: collection.id,
      isVisible: true,
      renderConfig
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.renderOption}>
        <legend>Select a layer option</legend>
        <Controller
          name="renderOption"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field}>
              <Stack direction="column">
                {layerOptions.map(option => (
                  <Radio
                    key={option}
                    value={option}
                    isDisabled={!renderOptions.includes(option)}
                  >
                    {option}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          )}
          rules={{ required: 'Select a layer option.' }}
        />
        {errors.renderOption && <FormErrorMessage>{errors.renderOption.message}</FormErrorMessage>}
      </FormControl>
      <Button type="submit">Add layer</Button>
    </form>
  );
}

export default RendersOptionSelect;
