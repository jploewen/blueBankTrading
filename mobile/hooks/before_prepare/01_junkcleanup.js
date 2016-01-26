#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

var foldersToProcess = [
    "node_modules"
];

foldersToProcess.forEach(function(folder) {
    deleteFolderRecursive("www/" + folder);
});

function deleteFolderRecursive(path){
    if( fs.existsSync(path) ) {
         fs.readdirSync(path).forEach(function(file,index){
             var curPath = path + "/" + file;
             if(fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
             } else { // delete file
                fs.unlinkSync(curPath);
             }
         });
         fs.rmdirSync(path);
    }
}
function processFiles(dir) {
    fs.readdir(dir, function(err, list) {
        if(err) {
            console.log('processFiles err: ' + err);
            return;
        }
        list.forEach(function(file) {
            file = dir + '/' + file;
            fs.stat(file, function(err, stat) {
                if(!stat.isDirectory()) {
                    switch(path.basename(file)) {
                        case ".DS_Store":
                            fs.unlink(file, function(error) {
                                console.log("Removed file " + file);
                            });
                            break;
                        case "Thumbs.db":
                            fs.unlink(file, function(error) {
                                console.log("Removed file " + file);
                            });
                            break;
                        default:
                            console.log("Skipping file " + file);
                            break;
                    }
                }
            });
        });
    });
}
