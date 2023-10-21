//  var fs = require('fs');
//  fs.appendFile('index.txt','hello word',
//         function(err){
//             if (err) throw err;
//             console.log('seved');
//         });
// const fs = require('fs');
// fs.readFile('index.txt',(err,date)=>{
//     if (err) throw err;
//     console.log(date.toString());
// });
// const fs = require('fs');
// fs.unlink('index.txt',function(err){
//     if (err) throw err;
//     console.log('file deleted')

// });
const readline = require('readline');
// const todo = require("./todo");
const { add, deleted, read,update,display} = require('./todo.js');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

 

rl.question("Enter The Action Do You Want Like (add, readtodos,  update, delete)? : ", (input) => {
    switch (input.toLowerCase()) {
      case 'read':
        read();
        break;
        case 'display':
          display();
          break;
      case 'add':
        add();
        break;
      case 'update':
        update();
        break;
      case 'delete':
        deleted(); 
        break;
      default:
        console.log('out of the case');
    }
  });
