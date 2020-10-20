// tslint:disable:max-line-length

export const packageJsonSchema = {
  $schema: "http://json-schema.org/draft-04/schema#",
  title: "VisualTeams Plugin",
  description:
    "A VisualTeams Plugin declaration for usage inside of VisualTeams.",
  type: "object",
  properties: {
    name: {
      description: "The internal name of this Plugin.",
      type: "string",
    },
    version: {
      description:
        "The version of this Plugin which will be used for display publicly and letting users know there is an update. This uses the semver format.",
      type: "string",
      pattern:
        "\\bv?(?:0|[1-9]\\d*)\\.(?:0|[1-9]\\d*)\\.(?:0|[1-9]\\d*)(?:-[\\da-z\\-]+(?:\\.[\\da-z\\-]+)*)?(?:\\+[\\da-z\\-]+(?:\\.[\\da-z\\-]+)*)?\\b",
      minLength: 5,
    },
    homepage: {
      type: "string",
    },
    visualteams: {
      type: "object",
      properties: {
        displayName: {
          description: "The public name for this Plugin",
          type: "string",
        },
        icon: {
          description: "The  url of the icon",
          type: "string",
        },
        minTargetVersion: {
          description:
            "The required version of VisualTeams which this Plugin depends on. This uses the semver format.",
          type: "string",
          pattern:
            "\\bv?(?:0|[1-9]\\d*)\\.(?:0|[1-9]\\d*)\\.(?:0|[1-9]\\d*)(?:-[\\da-z\\-]+(?:\\.[\\da-z\\-]+)*)?(?:\\+[\\da-z\\-]+(?:\\.[\\da-z\\-]+)*)?\\b",
          minLength: 5,
        },
      },
    },
  },
  required: ["name", "homepage", "version", "description", "visualteams"],
};
