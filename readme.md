# coastwards.org

## Localhost
npm run start --> 127.0.0.1:8888

## Office
npm run start office --> 134.245.149.30:8888


You will get an EPEERINVALID error on install:

Update node_modules/react-map-gl/package.json to accept the react ^15.0.0

  "peerDependencies": {
    "react": "0.14.x || ^15.0.0"
  },