var freeboardCreator = function(config)
{
	this.boardName = "New Freeboard";
	this.boardConfig = [config]
}


freeboardCreator.prototype.createPane = function(row, col, title)
{
	var pane = {
		"title": title,
		"width": 1,
		"row": {
			"3": row || 1
		},
		"col": {
			"3": col || 1
		},
		"col_width": 1,
		"widgets": []
	};

	this.boardConfig.panes.push(pane);

	return pane;
}

freeboardCreator.prototype.createInNewWindow = function()
{
	var fbForm = $("#fb_create_form");
	var fbName = $("#fb_board_name");
	var fbConfig = $("#fb_board_config");

	if(fbForm.length === 0)
	{
		fbForm = $('<form id="fb_create_form" action="https://freeboard.io/board/new" method="post" target="_blank"></form>');
		$("body").append(fbForm);
	}

	if(fbName.length === 0)
	{
		fbName = $('<input type="hidden" id="fb_board_name" name="board_name">');
		fbForm.append(fbName);
	}

	if(fbConfig.length === 0)
	{
		fbConfig = $('<input type="hidden" id="fb_board_config" name="board_config">');
		fbForm.append(fbConfig);
	}

	fbName.attr("value", this.boardName);
	fbConfig.attr("value", JSON.stringify(this.boardConfig));

	fbForm.submit();
}

freeboardCreator.prototype.getCreateLink = function()
{
	return "https://freeboard.io/board/new" + "?board_name=" + encodeURIComponent(this.boardName) + "&board_config=" + encodeURIComponent(JSON.stringify(this.boardConfig));
}

freeboardCreator.prototype.createAndGetLink = function(callback)
{
	$.post( "https://freeboard.io/board/new", { board_name: this.boardName, board_config: JSON.stringify(this.boardConfig), no_redirect: true })
		.done(function( data ) {

			if(data && data.board_url)
			{
				callback(null, data.board_url);
			}
			else
			{
				callback("error");
			}
		}).fail(function() {
			callback("error");
		});
}
