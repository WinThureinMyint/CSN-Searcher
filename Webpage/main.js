var $pagination = $('#pagination'),
	totalRecords = 0,
	records = [],
	displayRecords = [],
	recPerPage = 8,
	page = 1,
	totalPages = 0;
$(document).ready(function () {

	if (!inCodePenEditor()) {
		$("#search-input").focus();
	}

	// mode of form elements changes on input
	$("#search-input").on('input', function () {
		if (isEmpty($("#search-input").val())) {
			inputInactive();
		} else {
			inputActive();
		}
	});

	// update button tooltip on hover
	$("#search-btn").hover(function () {
		if (isEmpty($("#search-input").val())) {
			$(this).attr("title", "Open a random Wikipedia article.");
		} else {
			$(this).attr("title", "Search Wikipedia for '" + $("#search-input").val() + "'.");
		}
	});

	// main search functionality
	$("#search-btn").on("click", function (e) {
		e.preventDefault();
		clearCurrentCards();
		searchWikipedia($("#search-input").val());
		$("#search-clear").focus();
	});

	// bind input cancel functionality to click
	$("#search-clear").on("click", function () {
		cancelInput();
	});

	// bind input cancel functionality to escape key press
	$("#search-form").keyup(function (e) {
		if (e.keyCode == 27) {
			cancelInput();
		}
	});

	// bind window resize to manually adjust card image height, in order to maintain required aspect ratio of card images
	$(window).resize(function () {
		setCardImgHeight();
	});

});

function inCodePenEditor() {
	return !/full|debug/.test(window.location.pathname);
}

// initialise site view
function cancelInput() {
	clearInputField();
	showViewInitial();
	inputInactive();
	$("#search-input").focus();
}

function isEmpty(value) {
	return 0 === value.length;
}

function inputInactive() {
	$("#search-form").removeClass("hasInput");
}

function inputActive() {
	$("#search-form").addClass("hasInput");
}

function clearCurrentCards() {
	$("#cards").empty();
}

function clearInputField() {
	$("#search-input").val('');
}

function showViewInitial() {
	$("#container").removeClass("view-results");
	$("#container").addClass("view-initial");
}

function showViewResults() {
	$("#container").removeClass("view-initial");
	$("#container").addClass("view-results");
}

function searchWikipedia(searchTerm) {
	if (isEmpty(searchTerm)) {
		
	} else {
		getSearchResults(searchTerm);
		showViewResults();
	}
}

// Query api for search term
function getSearchResults(searchTerm) {

	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var myObject = JSON.parse(this.responseText);
			console.log(myObject)
			records = myObject
			totalRecords = myObject.length;
			console.log("totalRecords : " + totalRecords);
			totalPages = Math.ceil(totalRecords / recPerPage);
			apply_pagination();
		}
	};
	url = "http://52.200.38.94/model/?inputText=" + searchTerm;
	console.log(url)
	xhttp.open("GET", url);

	xhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xhttp.send();
}

// Build cards elements from array
function resultCardHtml(arr) {
	var html = "";
	var i;
	for (i = 0; i < arr.length; i++) {
		title = arr[i].article_title;
		url = arr[i].url;
		sec_title = arr[i].section_title;
		score = arr[i].similarity_score;
		body = arr[i].body[0];
		var cardTitle = encapsulate(title, "h5", " class='card-title text-truncate'");
		var cardUrl = encapsulate(cardTitle, "a", " href=" + url);
		var collapse = encapsulate(body, "div", "class='comment more'")
		var module = encapsulate(collapse, "div", "id='module'")
		var cardBody = encapsulate(module, "p", " class='card-text'");
		html = html + encapsulate(cardUrl + cardBody, "div", "class='card w-auto card-body'")
	}
	return html;
}
// wrap content in given html tags, with given attributes
function encapsulate(content, tag, attr) {
	if (false === content) {
		return "<" + tag + " " + attr + " />";
	} else {
		return '<' + tag + " " + attr + '>' + content + '</' + tag + '>';
	}
}

// Manually set height of card image element
function setCardImgHeight() {
	$(".card-image img", "#cards").css('height', function () {
		return Math.round($(this).width() * 0.75);
	});
}


function apply_pagination() {
	$pagination.twbsPagination({
		totalPages: totalPages,
		visiblePages: 6,
		onPageClick: function (event, page) {

			displayRecordsIndex = Math.max(page - 1, 0) * recPerPage;
			endRec = (displayRecordsIndex) + recPerPage;

			displayRecords = records.slice(displayRecordsIndex, endRec);
			$("#cards").html("");
			$("#cards").append(resultCardHtml(displayRecords));
			coll();
		}
	});
}