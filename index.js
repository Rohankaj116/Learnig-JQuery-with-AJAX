$(function() {
	var $addTodoForm = $("#addTodo");
	var $listGroup = $(".list-group");

	var URL = "http://localhost:3000/todos";

	//Template
	var source = $("#listitemtemplate").html();
	var template = Handlebars.compile(source);

	//Add TodoList
	$addTodoForm.on("submit", function(event) {
		event.preventDefault();

		var newTodo = $addTodoForm.find("input").val();

		$addTodoForm.find("input").val("");

		var listItem = template({
			text: newTodo
		});

		$listGroup.append(listItem);

		$.ajax({
			url: URL,
			method: "POST",
			data: {
				text: newTodo
			}
		});
	});
});
