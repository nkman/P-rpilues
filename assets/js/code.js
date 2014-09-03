function submitCode(){
	var code = document.forms["form-code-submit"]["code"].value;
	var input = document.forms["form-code-submit"]["stdin"].value;
	var notes = document.forms["form-code-submit"]["note"].value;
	var url = "/code/submit";
	$.post(url, {"code": code, "notes": notes, "stdin": input}).done(function(data){
		$(".Error").remove();
		$(".output").remove();

		if(data.error){
			var err = document.createElement('div');
			err.setAttribute("class", "Error");
			$(".msg-serv").append(err);

			var err_msg = document.createElement('span');
			err_msg.setAttribute("class", "msg")
			err_msg.innerHTML = "Compilation Error";
			$(".Error").append(err_msg);

			var err_sp = document.createElement('span');
			err_sp.innerHTML = data.error;
			$(".Error").append(err_sp);

		}

		if(data.output){
			var output = document.createElement('div');
			output.setAttribute("class", "output");
			$(".msg-serv").append(output);

			var out_msg = document.createElement('span');
			out_msg.setAttribute("class", "msg")
			out_msg.innerHTML = "Output";
			$(".output").append(out_msg);

			var sp = document.createElement('span');
			sp.setAttribute("id", "compilation-log");
			sp.innerHTML = data.output;
			$(".output").append(sp);
		}
	});
}