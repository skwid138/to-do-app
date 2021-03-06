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
    $('tbody').on('click', '.deleteButton', deleteDialog);

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
            $tr.append('<td><button class="finishedButton btn disabled">Completed</button></td>');
        } else {
            $tr.append('<td><button class="completeButton btn btn-warning">Complete</button></td>');
        }
        if (res[i].due === null || res[i].due === '') {
            $tr.append('<td>None</td>');
        } else {
            $tr.append('<td>' + res[i].due.slice(0,10));
        }
        $tr.append('<td>' + res[i].created.slice(0, 10));
        if (res[i].completed === null) {
            $tr.append('<td>Not Completed</td>');
        } else {
            $tr.append('<td>' + res[i].completed.slice(0, 10));
        }
        $tr.append('<td><button class="deleteButton btn btn-danger">Delete</button></td>');
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

// generates yyyy-mm-dd for task completion
function completeTaskDate( ) {
    if(doLog) console.log('in completeTask');
    var year = new Date().getFullYear();
    var day = new Date().getDate();
    var zero = '0';
    var month = (new Date().getMonth()) + 1;
    month = month.toString();
    if(month.length === 1) {
        month = zero.concat(month);
    }
    var date = year + '-' + month + '-' + day;
    return date;
} // end completeTask

// confirms user actions
function deleteDialog( ) {
    if(noLog) console.log('in deleteDialog');
    var taskId = $(this).parent().parent().data('id');
    if(noLog) console.log('deleteDialog id ->', taskId);
    BootstrapDialog.show({
        message: 'Are you sure you want to delete that task?',
        buttons: [{
            label: 'Delete',
            action: function (dialogItself) {
                if(noLog) console.log('action taskId ->', taskId);
                deleteTask(taskId); // deletes task
                dialogItself.close(); // closes dialog
            }, // end action
            cssClass: 'btn-warning'
        },{
            label: 'Cancel',
            action: function (dialogItself) {
                dialogItself.close();  // closes dialog
            }, // end action
            cssClass: 'btn-info'
        }] // end buttons
    }); // end BootstrapDialog
} // end deleteDialog

// removes row from DB and displays current DB rows
function deleteTask( taskId) {
    if(noLog) console.log('in deleteTask');
    // var taskId = $(this).parent().parent().data('id');
    $.ajax({
        method: 'DELETE',
        url: '/task/' + taskId,
        success: function(res) {
            if(doLog) console.log('DELETE success response ->', res);
            getTasks();
        } // end success
    }); // end ajax
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
            var tasks = sortTasks(res); 
            appendTasks(tasks);
        } // end success
    }); // end ajax
} // end getTasks func

// sorts tasks based on completion status
function sortTasks(tasks) {
    if(noLog) console.log('in sortTasks');
    if(noLog) console.log('tasks param', tasks);
    var completedTasks = []; // array for all completed tasks
    var toDoTasks = []; // array for all uncompleted tasks
    var sortedTasks = []; // array sorted with completed tasks last
    for (var i = 0; i < tasks.length; i++) {
        if(noLog) console.log('for tasks[i]', tasks[i]);
        if(tasks[i].status) {
            completedTasks.unshift(tasks[i]);
        } else {
            toDoTasks.unshift(tasks[i]);
        } // end else
    } // end for
    for (var j = 0; j < toDoTasks.length; j++) {
        sortedTasks.push(toDoTasks[j]); // sorts newest tasks first
    } // end for
    for (var l = 0; l < completedTasks.length; l++) {
        sortedTasks.push(completedTasks[l]);
    } // end for    
    if(noLog) console.log('sortedTasks', sortedTasks);
    return sortedTasks;
} // end sortTasks

// may add ability to edit all row data, which would require a refactor
// tells the server to change the status of the task to true and sets the completion date
function updateTask() {
    if(doLog) console.log('in updateTask');
    var taskId = $(this).parent().parent().data('id');
    var dateToSend = {
        completed: completeTaskDate()
    };
    if(noLog) console.log('taskId ->', taskId);
    $.ajax({
        method: 'PUT',
        url: '/task/' + taskId,
        data: dateToSend,
        success: function(res) {
            if(doLog) console.log('PUT success response ->', res);
            getTasks();
        } // end success
    }); // end ajax
} // end updateTask

$(document).ready(onReady);
