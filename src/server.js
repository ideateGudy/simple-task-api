import { logger } from "./config/winston.js";
const log = logger.child({ file: "server.js" });
import app from "./app.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  log.info(`✅ Server is running on port http://localhost:${PORT}`);
});
