var doLog = true;
var noLog = false;
if (noLog) console.log('Sourced client.js');

// https://www.w3schools.com/bootstrap/bootstrap_tables.asp
// add if else to apply contextual classes to table rows based on task being completed or not

function onReady( ) {
    if (noLog) console.log('Document Ready!');
    
    // listeners
    $('#addTaskButton').on('click', addTask);
    $('tbody').on('click', '.completeButton', updateTask);
    $('tbody').on('click', '.deleteButton', deleteTask);

    // GETs tasks and Displays them
    getTasks();
} // end onReady

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
            emptyInputs();
            getTasks();
        } // end success
    }); // end ajax
} // end addTask func

// run through GET response, clear the DOM and append data
function appendTasks(res) {
    if(noLog) console.log('In appendTasks');
    var $tbody = $('tbody');
    $tbody.empty();
    for (var i = 0; i < res.length; i++) {
        if(noLog) console.log('res[i] ->', res[i]);
        var $tr = $('<tr>');
        $tr.data('id', res[i].id); // sets primary key as data-id
        $tr.append('<td>' + res[i].name);
        $tr.append('<td>' + res[i].description);
        if (res[i].status) {
            $tr.append('<td><button class="finishedButton disabled btn-success">Complete</button></td>');
        } else {
            $tr.append('<td><button class="completeButton btn-warning">Complete</button></td>');
        }
        if (res[i].due === null) {
            $tr.append('<td> N/A </td>');
        } else {
            $tr.append('<td>' + res[i].due.slice(0,10));
        }
        $tr.append('<td>' + res[i].created.slice(0, 10));
        if (res[i].completed === null) {
            $tr.append('<td>Not Completed</td>');
        } else {
            $tr.append('<td>' + res[i].completed.slice(0, 10));
        }
        $tr.append('<td><button class="deleteButton btn-danger">Delete</button></td>');
        $tbody.append($tr); // appends row to table body
    } // end for
} // end appendTasks

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

// removes row from DB and displays current DB rows
function deleteTask( ) {
    if(doLog) console.log('in deleteTask');

} // end deleteTask

// clears input fields
function emptyInputs( ) {
    $('#nameInput').val('');
    $('#descriptionInput').val('');
    $('#dueInput').val('');
} // end emptyInputs func

// GET all tasks from Server
function getTasks( ) {
    if (doLog) console.log('in getTasks');
    $.ajax({
        method: 'GET',
        url: '/task',
        success: function(res) { 
            appendTasks(res);
        } // end success
    }); // end ajax
} // end getTasks func

// 
function updateTask( ) {
    if(doLog) console.log('in updateTask');
    
} // end updateTask

$(document).ready(onReady);
