import { KuusiConfig } from "@kuusi/kuusi/types";

const config = new KuusiConfig({
  dotenv: {
    path: "my.env",
  },
});

export default config;
