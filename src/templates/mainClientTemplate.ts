export const mainClientTemplate = (): string => {
  return `import React from "react";
import provideComponents from "@visualteams/plugin-engine/client/provideComponents";

const Settings: React.FC = () => <div>Your settings component</div>

provideComponents([
  { route: "settings", component: <Settings /> },
]);`;
};
