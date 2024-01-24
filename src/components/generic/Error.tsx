import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

function Error({ children }: React.PropsWithChildren) {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>{ children }</AlertTitle>
    </Alert>
  )
}

export default Error;
