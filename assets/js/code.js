function submitCode(){
	var code = document.getElementById("code-input-area").value;
	var input = document.getElementById("stdin-input-area").value;
	var notes = document.getElementById("note-input-area").value;
	var url = "code/submit";
	$.post(url, {code: code, notes: notes, stdin: input}, function(data){
		console.log(data);
	});
}