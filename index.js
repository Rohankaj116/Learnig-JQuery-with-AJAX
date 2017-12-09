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
					text: newTodo.text,
					id: newTodo.id
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
					text: dataitem.text,
					id: dataitem.id
				});

				$listGroup.append(listItem);
			});
		})
		.fail(function() {
			//err
		});

	//DELETE TODO

	$listGroup.on("click", ".deletebtn", function(event) {
		//Closest li
		var listItem = $(event.target).closest("li.list-group-item");

		var id = listItem.attr("id");

		listItem.remove();

		console.log("id", id);

		$.ajax({
			url: URL + "/" + id,
			method: "DELETE"
		});
	});

});
