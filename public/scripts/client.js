var doLog = true;
var noLog = false;
if (noLog) console.log('Sourced client.js');

// https://www.w3schools.com/bootstrap/bootstrap_tables.asp
// add if else to apply contextual classes to table rows based on task being completed or not

function onReady( ) {
    if (noLog) console.log('Document Ready!');
    
    // event listener for addTaskButton
    $('#addTaskButton').on('click', addTask);

    // GETs tasks and Displays them
    getTasks();
}

// POST a new task to Server
function addTask( ) {
    if (doLog) console.log('in addTask');
    var taskToSend = buildTaskObject();
    $.ajax({
        method: 'POST',
        url: '/task',
        data: taskToSend,
        success: function( res ) {
            if(doLog) console.log('addTask success response ->', res);
            // getTasks(); func call
        } // end success
    }); // end ajax
} // end addTask func

// Builds an object for addTask func
function buildTaskObject( ) {
    if (doLog) console.log('in BuildTaskObject');
    
    var name = $('#nameInput').val();
    var description = $('#descriptionInput').val();
    var due = $('#dueInput').val();

    var task = {
        name: name,
        description: description,
        due: due
    };
    if (noLog) console.log('buildTaskObject var=task ->', task);
    return task;
} // end buildTaskObject func

// clears input fields
function emptyInputs( ) {
    // this could be put inside buildTaskObject func I think
} // end emptyInputs func

// GET all tasks from Server
function getTasks( ) {
    if (doLog) console.log('in getTasks');
    $.ajax({
        method: 'GET',
        url: '/task',
        success: function( ) { 

        } // end success
    }); // end ajax
    
    // sets value to current date and time (goes with borrowed code) only works for date not time
    // $('#dueInput').val(new Date().toDateInputValue());
} // end getTasks func

// borrowed this code from
// https://stackoverflow.com/questions/6982692/html5-input-type-date-default-value-to-today
// Date.prototype.toDateInputValue = (function () {
//     var local = new Date(this);
//     local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
//     return local.toJSON().slice(0, 10);
// });

$(document).ready(onReady);
