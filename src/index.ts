import "reflect-metadata";
import { App } from "./application";

const PORT = process.env.PORT || 3000;

const app = new App();

app.listen(PORT, () => {
  console.log(`Server is listening on :${PORT}`);
});
