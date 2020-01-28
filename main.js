// Not sure if this (fs) is required but I tend to include it anyway.
const fs = require("fs");
const MKD = require("mkdcolor");
const Readline = require("readline");

// TODO: Add some sort of version system.
var App = {
  
}

App.Put = (string) => {
  console.log(MKD.read(string));
}

// define globally
const Put = App.Put;

App.AwaitInput = function(question = "", cb = () => {App.ShowLang("error_NoAWICallback")}) {
  // TODO: Test if this is better within self function or externally.
  var Interface = Readline.createInterface({input: process.stdin,output: process.stdout});
  Interface.question(question, (response) => {
    cb(response);
    Interface.close();
  });
}

// prints a MKD color coded file to the console. /data/lang/
// naming format is <class>_<nickname> ; for example: menu_main, menu_help, error_timedout, error_fileread
App.ShowLang = function(name) {
  // Wrapping in try catch for now to prevent unexpected problems.
  // TODO: Fool'proof this.
  try {
    let TargetFile = `./data/lang/${name}.lang`;
    // validate if that lang file exists else summon error.
    if(!fs.exists(TargetFile)) {
      Put(`[#-r]INTERNAL ERROR -- App.ShowLang CANNOT FIND ${name} (${TargetFile})`);
      return;
    }
    // TODO: check if async or sync is best
    Put(fs.readFile(TargetFile));
    return;
  } catch (err) {
    // Just using console.log for now since im lazy.
    console.log(err);
  }
}

// prints pre programmed menu to console.
App.ShowMenu = function(name) {
  switch(name) {
    case "Main":
      App.ShowLang("menu_main");
      
      break;
    default: 
      App.ShowLang("error_NoNamedMenu");
      break;
  }
}

// Start it all
App.ShowMenu("main");