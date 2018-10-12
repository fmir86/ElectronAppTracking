const electron = require("electron");
const fs = require("fs");
const {app, BrowserWindow} = electron;
const Tracking = require("./Tracking");

// Required for Tracking Purposes
let mainWindow;

app.on("ready", () => {
    Tracking.init();
    mainWindow = new BrowserWindow({ width:800, height:600 });
    mainWindow.loadURL(`file://${__dirname}/src/index.html`);
})