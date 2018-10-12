const Tracking = {

    electron: electron = require("electron"),

    init: () => {

        const storeName = "DataStorage";          // Name of the JSON Storage.
        const reportName = "HPS Tracking Report";    // Name of the Tracking Report.
 
        const {app, ipcMain} = electron;
        const fs = require("fs");

        const storePath = `${app.getAppPath()}/${storeName}.json`;  // Path to store the 
        const userReportPath = `${app.getPath("desktop")}/${reportName}.txt`;
        
        let file;
        let currentContent = [];
        let userReport;
            
        ipcMain.on("trackingrequest", (event, itemToSave, kind) => {
            readFile(itemToSave, kind);
        });
            
        function readFile(itemToSave, kind){
            file = fs.readFile(storePath, 'utf8',  (err, data) => {
                if (err){
                    storeTrackingData();
                }else{
                    currentContent = JSON.parse(data);                    
                    trackItem(itemToSave, kind);
                }
            })
        }
            
        function storeTrackingData(){
            fs.writeFile(storePath, JSON.stringify(currentContent), err => {
                err ? console.log(err) : console.log('Tracking Data Saved!');
            });
        }

        function trackItem(itemToSave, kind){

            let obj = currentContent.find(elem => elem.name === itemToSave);

            if(obj !== undefined){
                obj.count += 1;
            }else{
                currentContent.push( {name: itemToSave, kind, count: 1} );
            }

            console.log(currentContent);
            storeTrackingData();
            generateUserReport();
        }

        function generateUserReport(){
            userReport = `${reportName}:\r\n\r\n`;

            currentContent.forEach( (elem)=> {
                userReport += `${elem.name} [kind: ${elem.kind}]:  ${elem.count} views.\r\n`;
            })

            fs.writeFile(userReportPath, userReport, err => {
                err ? console.log(err) : console.log("User Report created");
            });
        }

    }, 

    trackRequest: (name, kind) => {
        const {ipcRenderer} = electron;
        ipcRenderer.send("trackingrequest", name, kind);
    }
    
}

module.exports = Tracking;