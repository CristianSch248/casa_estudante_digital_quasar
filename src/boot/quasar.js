// src/boot/quasar.js

import { Quasar } from "quasar";
import quasarUserOptions from "src/quasar-user-options";

export default ({ app }) => {
  app.use(Quasar, quasarUserOptions);
};
