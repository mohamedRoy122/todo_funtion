const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
const ran_Id = Math.floor(Math.random() * 50)
const filePath = 'tasks.json';
 
function read() { 
    if (fs.existsSync(filePath)) {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                if (!data) {
                    console.log('isEmpty');
                } else {
                    rl.question("Enter task_Id ? : ", (taskId) => {
                        const todos = JSON.parse(data);
                        const todo = todos.find(todo => {
                            return todo.id == Number(taskId);
                        })
                        console.log('task', todo);
                    })
                }
            }
        })
    } else {
        console.log('faild ');
    }
}
function display() { 
    if (fs.existsSync(filePath)) {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                if (!data) {
                    console.log('isEmpty');
                } else {
                    
                        const todos = JSON.parse(data);
                         
                        console.log('task', todos);
                    
                }
            }
        })
    } else {
        console.log('faild ');
    }
}

function add(){
    if (fs.existsSync(filePath)) {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.log('Error reading', err);
            } else {
                if (!data) {
                    console.log('Opps ');
                } else {
                    rl.question('Enter task: ', (task) => {
                        
                        const todo_date = [{ id: ran_Id, task: task }];
                      
                        fs.readFile(filePath, 'utf8', (readErr, fileData) => {
                          if (readErr) {
                            console.log('Error reading file:', readErr);
                            rl.close();
                            return;
                          }
                      
                          let existingData = [];
                          if (fileData) {
                            try {
                              existingData = JSON.parse(fileData);
                            } catch (parseError) {
                              console.log('Error parsing JSON data:', parseError);
                              rl.close();
                              return;
                            }
                          }
                      
                          const updatedData = [...existingData, ...todo_date];
                          fs.writeFile(filePath, JSON.stringify(updatedData,null,2), 'utf8', (writeErr) => {
                            if (writeErr) {
                              console.log('Error writing to file:', writeErr);
                            } else {
                              console.log('Task added successfully.');
                            }
                            rl.close();
                          });
                        });
                      });
                }
            }
        })
    } else {
        console.log(' error');
    }
}
function deleted() {
    if (fs.existsSync(filePath)) {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.log('Error ', err);
            } else {
                if (!data) {
                    console.log('isEmty');
                } else {
                    const todos = JSON.parse(data);
                    rl.question('Enter taskId  ? : ', (taskId) => {
                        const taskdate = todos.filter(task => task.id != Number(taskId))
                        if (todos.length === taskdate.length) {
                            console.log('is empty ! ', todos.length);
                        } else {
                            fs.writeFile(filePath, JSON.stringify(taskdate, null, 2), (err) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log('task deleted ', taskdate);
                                }
                            })
                        }
                    })
                }
            }
        })
    } else {
        console.log(' failed');
    }
}
function update() {
    if (fs.existsSync(filePath)) {

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                if (!data) {
                    console.log('isEmpty');
                } else {
                    rl.question('Enter taskId ? : ', (taskId) => {

                        rl.question('Enter taskName ? : ', (taskName) => {

                            const todos = JSON.parse(data);

                            const update_todos = todos.map(todo => {
                                if (todo.id == Number(taskId)) {
                                    return {
                                        ...todo,
                                        task: taskName
                                    }
                                }
                                return todo;
                            });
                            fs.writeFile(filePath, JSON.stringify(update_todos, null, 2), (err) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log('task updated  ');
                                }
                            })
                            console.log('update_todos', update_todos);
                        })

                    })
                }
            }
        })

    } else {
        console.log(' feild ');
    }
}
module.exports = {
    read,add,deleted,update,display
}