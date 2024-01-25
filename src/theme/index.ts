import { extendTheme } from "@chakra-ui/react";
import Form from "./Form";

export default extendTheme({
  styles: {
    global: {
      legend: {
        fontWeight: "500",
        marginBottom: "2"
      }
    }
  },
  components: {
    Form
  },
});
