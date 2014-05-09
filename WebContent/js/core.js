var cerestiTodo = angular.module('cerestiTodo', ['ui.bootstrap']);
/*Messages*/
var infoMsg = "Please wait while we contact the server....";
var taskLoadMsg = "Tasks loaded successfully.";
var taskAddMsg = "Task added successfully.";
var taskUpdateMsg = "Task updated successfully.";
var taskDeleteMsg = "Task(s) deleted successfully.";
var errorMsg = "Some error occured while processing the request. Please contact your server administrator.";
/*Alerts*/
var dropdownNotSelectedAlert = "Please choose either 'Yes' or 'No' to indicate whether task is completed or not.";
var yesNotAllowedForCreateTaskAlert = "A task cannot be completed while creating the task. Please choose 'No' for creating a new task.";
var emptyDescriptionAlert = "Task description cannot be empty. Please enter task description.";
var emptyDueDateAlert = "Task Due Date cannot be empty. Please enter task due date.";

function toggleButtons(flag) {
	document.getElementById("deleteAllTODOBtn").disabled = flag;
	document.getElementById("addTODOBtn").disabled = flag;
	document.getElementById("clearTODOBtn").disabled = flag;
}

function mainController($scope, $http) {
	$scope.formData = {};
	
	// Date specific settings start
	$scope.showWeeks = true;
	$scope.toggleWeeks = function () {
		$scope.showWeeks = ! $scope.showWeeks;
	};

	$scope.clear = function () {
		$scope.formData.DueDate = null;
	};
	
	// Disable weekend selection
	$scope.disabled = function(date, mode) {
		return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
	};

	$scope.toggleMin = function() {
		$scope.minDate = ( $scope.minDate ) ? null : new Date();
	};
	$scope.toggleMin();
	
	$scope.open = function($event) {
		$event.preventDefault();
		$event.stopPropagation();

		$scope.opened = true;
	};

	$scope.dateOptions = {
		'year-format': "'yy'",
		'starting-day': 1
	};

	$scope.formats = ['yyyy/MM/dd'];
	$scope.format = $scope.formats[0];
	
	// Date specific settings ends

	// when landing on the page, get all todos and show them
	//$http.get('http://todo.ceresti.com:8080/task/list')
	$("#infoMsgSpan").html(infoMsg);
	$http.get('http://localhost:9100/TODOAPI/TODOAPIServlet?actionCode=GETALLTODOS')
		.success(function(data) {
			$scope.todos = data;
			$("#infoMsgDiv").hide();
			$("#successMsgSpan").html(taskLoadMsg);
			$("#successMsgDiv").show();
			setTimeout(function() {
				$("#successMsgDiv").fadeOut(1500);
			}, 3000);
		})
		.error(function(data) {
			$("#infoMsgDiv").hide();
			$("#dangerMsgSpan").html(errorMsg);
			$("#dangerMsgDiv").show();
			setTimeout(function() {
				$("#dangerMsgDiv").fadeOut(1500);
			}, 3000);
		});

	// when submitting the form, send the data to the node API
	$scope.createTodo = function() {
		var todoIdEl = document.getElementById("todoId");
		if(todoIdEl.value == "") { // create todo
			$scope.formData.Description = document.getElementById("todoDescription").value;
			$scope.formData.DueDate = document.getElementById("todoDueDate").value;
			if(document.getElementById("todoDescription").value == "") {
				alert(emptyDescriptionAlert);
				return;
			}
			if(document.getElementById("todoDueDate").value == "") {
				alert(emptyDueDateAlert);
				return;
			}			
			if(document.getElementById("todoCompleted").value == "") {
				alert(dropdownNotSelectedAlert);
				return;
			}
			if(document.getElementById("todoCompleted").value == "Yes") {
				alert(yesNotAllowedForCreateTaskAlert);
				return;
			}
			$scope.formData.Completed = false; // it will be always false while creating the task
			
			toggleButtons(true); // disable
			
			$("#infoMsgSpan").html(infoMsg);
			
			
			$http({
	            		method : 'POST',
	            		url : 'http://localhost:9100/TODOAPI/TODOAPIServlet?actionCode=CREATETODO',
	            		//url : 'http://todo.ceresti.com:8080/task/add',
	            		data : $scope.formData
	        	})
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.todos = data;
				toggleButtons(false); // enable
				$("#infoMsgDiv").hide();
				$("#successMsgSpan").html(taskAddMsg);
				$("#successMsgDiv").show();
				setTimeout(function() {
					$("#successMsgDiv").fadeOut(1500);
				}, 3000);
				
			})
			.error(function(data) {
				toggleButtons(false); // enable
				$("#infoMsgDiv").hide();
				$("#dangerMsgSpan").html(errorMsg);
				$("#dangerMsgDiv").show();
				setTimeout(function() {
					$("#dangerMsgDiv").fadeOut(1500);
				}, 3000);
				
			});
		} else { // update todo
			$scope.formData.Description = document.getElementById("todoDescription").value;
			$scope.formData.DueDate = document.getElementById("todoDueDate").value;
			$scope.formData.id = todoIdEl.value;
			if(document.getElementById("todoDescription").value == "") {
				alert(emptyDescriptionAlert);
				return;
			}
			if(document.getElementById("todoDueDate").value == "") {
				alert(emptyDueDateAlert);
				return;
			}			
			if(document.getElementById("todoCompleted").value == "") {
				alert(dropdownNotSelectedAlert);
				return;
			}
			if(document.getElementById("todoCompleted").value == "Yes") {
				$scope.formData.Completed = true;
			} else {
				$scope.formData.Completed = false;
			}
			
			toggleButtons(true); // disable
			
			$("#infoMsgSpan").html(infoMsg);
			
			
			
			$http({
	            		method : 'POST',
	            		url : 'http://localhost:9100/TODOAPI/TODOAPIServlet?actionCode=UPDATETODO',
	            		//url : 'http://todo.ceresti.com:8080/task/'+todoIdEl.value',
	            		data : $scope.formData
	        	})
	        	.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				document.getElementById("addTODOBtn").firstChild.data = "Add";
				todoIdEl.value = "";
				$scope.todos = data;
				toggleButtons(false); // enable
				$("#infoMsgDiv").hide();
				$("#successMsgSpan").html(taskUpdateMsg);
				$("#successMsgDiv").show();
				setTimeout(function() {
					$("#successMsgDiv").fadeOut(1500);
				}, 3000);
				
			})
			.error(function(data) {
				toggleButtons(false); // enable 
				$("#infoMsgDiv").hide();
				$("#dangerMsgSpan").html(errorMsg);
				$("#dangerMsgDiv").show();
				setTimeout(function() {
					$("#dangerMsgDiv").fadeOut(1500);
				}, 3000);
				
			});
		}
	};

	// delete a todo after checking it
	$scope.deleteTodo = function() {
		$scope.formData.id = document.getElementById("todoId").value;
		
		toggleButtons(true); // disable
		
		$("#infoMsgSpan").html(infoMsg);
		
		$http({
            		method : 'POST',
            		//method : 'DELETE',
            		url : 'http://localhost:9100/TODOAPI/TODOAPIServlet?actionCode=DELETETODO',
            		//url : 'http://todo.ceresti.com:8080/task/delete/' + document.getElementById("todoId").value),
            		data : $scope.formData
        	})
		.success(function(data) {
			document.getElementById("todoId").value = "";
			document.getElementById("todoDescription").value = "";
			document.getElementById("todoDueDate").value = "";
			document.getElementById('todoCompleted').value = "";
			document.getElementById("addTODOBtn").firstChild.data = "Add";
			$scope.todos = data;
			toggleButtons(false); // enable
			$("#infoMsgDiv").hide();
			$("#successMsgSpan").html(taskDeleteMsg);
			$("#successMsgDiv").show();
			setTimeout(function() {
				$("#successMsgDiv").fadeOut(1500);
			}, 3000);
			
		})
		.error(function(data) {
			toggleButtons(false); // enable
			$("#infoMsgDiv").hide();
			$("#dangerMsgSpan").html(errorMsg);
			$("#dangerMsgDiv").show();
			setTimeout(function() {
				$("#dangerMsgDiv").fadeOut(1500);
			}, 3000);
		});
	};
	
	// delete all todos
	$scope.deleteAllTodos = function() {
		
		toggleButtons(true); // disable
		var successFlag = true;
		$("#infoMsgSpan").html(infoMsg);
		for(var i = 0; i < $scope.todos.length; i++) {
		    	var todo = $scope.todos[i];
		    	$scope.formData.id = todo.Id;

			
		    
		    	$http({
	            		method : 'POST',
	            		//method : 'DELETE',
	            		url : 'http://localhost:9100/TODOAPI/TODOAPIServlet?actionCode=DELETETODO',
	            		//url : 'http://todo.ceresti.com:8080/task/delete/' + document.getElementById("todoId").value),
	            		data : $scope.formData
	        	})
			.success(function(data) {
				document.getElementById("todoId").value = "";
				document.getElementById("todoDescription").value = "";
				document.getElementById("todoDueDate").value = "";
				document.getElementById('todoCompleted').value = "";
				document.getElementById("addTODOBtn").firstChild.data = "Add";
				$scope.todos = data;
				
			})
			.error(function(data) {
				
				successFlag = false;
			});
		}
		if(successFlag) {
			$("#infoMsgDiv").hide();
			$("#successMsgSpan").html(taskDeleteMsg);
			$("#successMsgDiv").show();
			setTimeout(function() {
				$("#successMsgDiv").fadeOut(1500);
			}, 3000);
		} else {
			$("#infoMsgDiv").hide();
			$("#dangerMsgSpan").html(errorMsg);
			$("#dangerMsgDiv").show();
			setTimeout(function() {
				$("#dangerMsgDiv").fadeOut(1500);
			}, 3000);
		}
		toggleButtons(false); // enable
	};
	
	$scope.toggleTODO = function(todoId,todoDescription,todoDueDate,todoCompleted) {
			document.getElementById("todoId").value = todoId;
			document.getElementById("todoDescription").value = todoDescription;
			document.getElementById("todoDueDate").value = todoDueDate;
			if(todoCompleted==true) {
				document.getElementById('todoCompleted').value="Yes";
			} else {
				document.getElementById('todoCompleted').value="No";
			}
			
			document.getElementById("addTODOBtn").firstChild.data = "Update";
			document.getElementById("deleteTODOBtn").disabled = false;
	};
	
	$scope.clearTodo = function() {
		document.getElementById("todoId").value = "";
		document.getElementById("todoDescription").value = "";
		document.getElementById("todoDueDate").value = "";
		document.getElementById('todoCompleted').value = "";
		
		document.getElementById("addTODOBtn").firstChild.data = "Add";
		document.getElementById("deleteTODOBtn").disabled = true;
	};
	
	$scope.whatPanelClassIsIt = function (isCompleted) {
		if(isCompleted==true) {
			return "panel panel-success";
		} else {
			return "panel panel-danger";
		}
	};
}
