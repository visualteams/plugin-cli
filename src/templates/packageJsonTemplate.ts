export const packageJsonTemplate = ({
  name,
  displayName,
  version,
  description,
}): string => {
  return `{
    "name": "${name}",
    "version": "${version}",
    "description": "${description}",
    "scripts": {
      "build": "npm run build:server && npm run build:client",
      "build:client": "react-scripts build",
      "build:server": "tsc -p tsconfig.server.json"
    },
    "homepage": "plugins/${name}",
    "dependencies": {
      "@material-ui/core": "^4.11.0",
      "@visualteams/plugin-engine": "1.1.0",
      "react": "^16.13.1",
      "react-dom": "^16.13.1",
      "react-scripts": "3.4.3"
    },
    "devDependencies": {
        "@types/node": "^10.12.14",
        "@types/react": "^16.9.50",
        "typescript": "^4.0.3"
    },
    "browserslist": {
      "production": [
        ">0.2%",
        "not dead",
        "not op_mini all"
      ],
      "development": [
        "last 1 chrome version",
        "last 1 firefox version",
        "last 1 safari version"
      ]
    },
    "visualteams": {
      "displayName": "${displayName}",
      "icon": ""
    }
}`;
};
