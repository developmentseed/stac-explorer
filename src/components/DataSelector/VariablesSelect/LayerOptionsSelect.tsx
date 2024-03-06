import { Button, FormControl, FormErrorMessage, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useForm, Controller, SubmitHandler } from "react-hook-form"

import { SelectProps } from "./types";

type FormValues = {
  layerOption: string;
  timestep: string;
}

function LayerOptionsSelect({ collection, addLayer }: SelectProps) {
  const { stac } = collection;
  const cubeVariables = stac['cube:variables'];
  const layerOptions = cubeVariables ? Object.keys(cubeVariables) : Object.keys(stac.renders);

  // Simplified time determination logic
  const timeInfo = stac['cube:dimensions']?.time || stac.extent.temporal;
  const timeMin = stac['cube:dimensions'] ? timeInfo.extent[0] : timeInfo.interval[0][0];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = ({ variable }) =>{
    addLayer({
      id: crypto.randomUUID(),
      name: collection.id,
      isVisible: true,
      renderConfig: {
        variable,
        timestep: timeMin || '1970-01-01T00:00:00Z',
        collection: collection.id
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.variable}>
        <legend>Select a layer option</legend>
        <Controller
          name="layerOption"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field}>
              <Stack direction="column">
                {layerOptions.map(option => (
                  <Radio
                    key={option}
                    value={option}
                    isDisabled={!layerOptions.includes(option)}
                  >
                    {option}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          )}
          rules={{ required: 'Select a layer option.' }}
        />
        {errors.layerOption && <FormErrorMessage>{errors.layerOption.message}</FormErrorMessage>}
      </FormControl>
      <Button type="submit">Add layer</Button>
    </form>
  );
}

export default LayerOptionsSelect;
