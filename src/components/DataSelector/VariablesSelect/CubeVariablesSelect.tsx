import { Button, FormControl, FormErrorMessage, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useForm, Controller, SubmitHandler } from "react-hook-form"

import { SelectProps } from "./types";

type FormValues = {
  variable: string;
  timestep: string;
}

function CubeVariablesSelect({ config, collection, addLayer }: SelectProps) {
  const cubeVariables = collection['cube:variables'];
  const { time } = collection['cube:dimensions'];
  const [ timeMin ] = time.extent;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = ({ variable }) => {
    addLayer({
      id: crypto.randomUUID(),
      name: collection.id,
      config: {
        variable,
        timestep: timeMin || '1970-01-01T00:00:00Z',
        collection: config.id
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

      <Button type="submit">Add layer</Button>
    </form>
  );
}

export default CubeVariablesSelect;
