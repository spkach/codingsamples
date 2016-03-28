$(function(){
	folder = $(".folder"),
	front = folder.find('.front'),
	droppedCount = 0;
	$("#tmptxt").css("display", "none");
	$("#preview").css("display", "none");
	
	$('#txt1').bind('input propertychange',function(){
		var txtVal = $('#txt1').val();
		if(txtVal.length > 0){
		   $("#moveitButton").removeClass("btn btn-primary disabled");
		   $("#moveitButton").addClass("btn btn-primary active");
		}else{
			$("#moveitButton").removeClass("btn btn-primary active");
			$("#moveitButton").addClass("btn btn-primary disabled");
		}
    });

	$("#moveitButton").click(function() {
		var txtVal = $('#txt1').val();
		$('#tmptxt').val(txtVal);
		folder.addClass('open');
		doit(txtVal);
		$("#moveitButton").removeClass("btn btn-primary active");
		$("#moveitButton").addClass("btn btn-primary disabled");
	});
});

function doit(txtVal) {
	var div2Pos = $("#targetFolder").position();
	var div2Width = $("#targetFolder").css("width");
	var div2Height = $("#targetFolder").css("height");
	
	$("#tmptxt").css("display", "block");
	$("#txt1").val("");
	$("#tmptxt").animate({left:'350px',top:'160px'}, 800,function(){
		$("#preview").css("display", "block");
		$("#tmptxt").animate({left:'30px',top:'130px'},function(){
			$("#tmptxt").css("display", "none");
		}); 
		$("#preview").animate({left:div2Pos.left-20,top:div2Pos.top-90}, 1800,function(){
			$("#preview").fadeOut();
			front.text(++droppedCount);
			folder.removeClass('open');
			$("#preview").animate({left:'350px',top:'160px'},function(){
				$("#preview").css("display", "none");
				
			}); 
	}); 
	});  
	$("#tmptxt").hide("explode", {pieces: 8 },600 );
}