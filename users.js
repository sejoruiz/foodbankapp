/*
guardar usuarios en un archivo de txt y recuperarlos
 */
var FS = require('fs');
var filePath = "users.txt";
var userManager = {


    getAllListeners : function () {
        FS.readFile(filePath, function (err, data) {
            if (err) throw err;
            return (data.match(/([0-9.:]\/n\/r)/gi) || []);
        });
    },
    addListener : function (ipAddress) {
        fs.writeFile(filePath, ipAddress+"\r\n", function (err) {
            if (err) throw err;
        });
    },
    //public API
}
module.exports.users=userManager;