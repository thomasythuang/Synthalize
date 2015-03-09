$(document).ready(function() {

	$('#searchbox').keypress(function() {
		console.log($(this).val());
	});
});