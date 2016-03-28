$(document).ready(function(){
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
		afterText(txtVal);
		$("#moveitButton").removeClass("btn btn-primary active");
		$("#moveitButton").addClass("btn btn-primary disabled");
	});
});


function afterText(txtVal) {
	if(txtVal.length > 14){
		txtVal = txtVal.substring(0,12)+'...';
	}
	var $card = $('<li style="opacity:0;margin-left:300px;" class="col-lg-4 col-md-4 circle-card left-drop-card" id="card1"><div class="circle-bdr"><div class="circle-list-item drag-cursor personPopupTrigger" rel="4218,a17bee64-8593-436e-a2f8-599a626370df"><span class="fa fa-times  close-btn"></span><div class="list-row"><span class="item-cell" href="#"><img src="img/photo.png" alt="" width="100%" height="100%"></span><div class="item-cell item-dec"><h5>'+txtVal+'</h5></div></div></div></div></li>');
	$('#circle-list-ul').append($card).children("li:last").animate({
		opacity:1,
        marginLeft:'0px'
      },1000,"easeOutElastic");
}