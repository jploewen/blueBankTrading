var program = require('commander');
var exec = require('child_process').exec;

var run = function(cmd, options){
  var child = exec(cmd, options, function (error, stdout, stderr) {
    if (stderr !== null) {
      console.log('' + stderr);
    }
    if (stdout !== null) {
      console.log('' + stdout);
    }
    if (error !== null) {
      console.log('' + error);
    }
  });
};

program
  .version('0.1.3')
  .option('i, --install ', 'install packages')
  .parse(process.argv);



if (program.install) {
  console.log('Installing dependencies from commander');
  run('npm install', {'cwd':'./server'});
  run('npm install && bower install',{'cwd':'./mobile'});
  //run('bower install',{'cwd':'./mobile'});
  //run('cd mobile/www');
  run('npm install',{'cwd':'./mobile/www'});
  console.log('finished installing dependencies');
}


var count = 0;


// If parameter is missing or not supported, display help
program.options.filter(function (option) {
  if(!(option.short == process.argv[2]))
    count++
});

if(count == program.options.length)
  program.help();
