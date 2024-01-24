import { useState } from "react";
import { FormControl, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { Collection } from "../../../types";

type Props = {
  collection: Collection;
}

function CubeVariablesSelect({ collection }: Props) {
  const [ selectedVar, setSelectedVar ] = useState<string>();

  const cubeVariables = collection['cube:variables'];

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
    </>
  );
}

export default CubeVariablesSelect;
