export const mainServerTemplate = (): string => {
  return `import Plugin from "@visualteams/plugin-engine";

class MainClass extends Plugin {
  constructor() {
    super();
  }
}

const MAIN_CLASS = new MainClass();

export default MAIN_CLASS;
`;
};
