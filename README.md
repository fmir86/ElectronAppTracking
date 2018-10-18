# ElectronAppTracking
A simple utility that allows to track actions, items, whatever you need, on Electron based desktop apps

## How to use it?

1. Put the Tracking.js file into your proyect folder, ideally into the root.

2. Import it into your main index.js file:

```javascript
const Tracking = require("./Tracking");
```

3. Init the component:

```javascript
app.on("ready", () => {
    Tracking.init();
    // YOUR CODE HERE
})
```

4. Finally import Tracking.js on your front-end js script and make tracking requests as follows:

```javascript
const Tracking = require("../Tracking");

Tracking.trackRequest("slide", "default");
```

The 2 parameter that thsi method receives are: The name of the item you want to track, and the kind/type.

## How it works

It creates a JSON storage file in the root of the app. And based on it, generates a human-readable tracking report in the user's desktop.
