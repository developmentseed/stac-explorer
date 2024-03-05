import { Button, FormControl, FormErrorMessage, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useForm, Controller, SubmitHandler } from "react-hook-form"

import { SelectProps } from "./types";

type FormValues = {
  variable: string;
  timestep: string;
}

function LayerOptionsSelect({ collection, addLayer }: SelectProps) {
  let cubeVariables;
  if (collection.stac.hasOwnProperty('cube:variables')) {
    cubeVariables = collection.stac['cube:variables'];
  }
  let time;
  let timeMin: any;
  if (collection.stac.hasOwnProperty('cube:dimensions')) {
    time = collection.stac['cube:dimensions'].time;
    timeMin = time.extent[0];
  } else {
    time = collection.stac.extent.temporal;
    [ timeMin ] = time.interval[0];
  }
  const renderOptions = Object.keys(collection.stac['renders'])
  const layerOptions = cubeVariables ? Object.keys(cubeVariables) : renderOptions;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = ({ variable }) => {
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
                {layerOptions.map((layerOption) => (
                  <Radio
                    value={layerOption}
                    key={layerOption}
                    isDisabled={!renderOptions.includes(layerOption)}
                  >
                    { layerOption }
                  </Radio>
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

      <Button type="submit">Add layer</Button>
    </form>
  );
}

export default LayerOptionsSelect;
