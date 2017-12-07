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

		$.ajax({
			url: URL,
			method: "POST",
			data: {
				text: newTodo
			}
		})
			.done(function(newTodo) {
				var listItem = template({
					text: newTodo.text
				});

				$listGroup.append(listItem);
			})
			.fail(function() {
				//errr
			});
	});

	//READ
	$.ajax({
		url: URL,
		method: "GET"
	})
		.done(function(data) {
			data.forEach(function(dataitem) {
				var listItem = template({
					text: dataitem.text
				});

				$listGroup.append(listItem);
			});
		})
		.fail(function() {
			//err
		});


	
});
