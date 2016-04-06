$(function() {

		var img = $(".clearfix.circle-card");
		var dropped = false;
		
		var small_folder = $("#s_main .small-folder");
		var s_front = small_folder.find('.s_front');
		
		var medium_folder = $("#m_main .medium-folder");
		var m_front = medium_folder.find('.m_front');
		
		var large_folder = $("#l_main .large-folder");
		var l_front = large_folder.find('.l_front');
		
		var extra_large_folder = $("#xl_main .extra-large-folder");
		var xl_front = extra_large_folder.find('.xl_front');
		
        var smallStories=[];
		var mediumStories=[];
		var largeStories=[];
		var xlargeStories=[];
		
		$.session.set("small",smallStories);
		$.session.set("medium",mediumStories);
		$.session.set("large",largeStories);
		$.session.set("xlarge",xlargeStories);
		
		s_front.text('S');
		m_front.text('M');
		l_front.text('L');
		xl_front.text('XL');
		
		var selectedClass = 'ui-state-highlight',
        clickDelay = 600,
        // click time (milliseconds)
        lastClick, diffClick; // timestamps
		
		/*Session Management*/
		 var storys=$.session.get("storyPoints");
		 var storypoints =[];
		 if(storys.indexOf(",")>=0){
			 storypoints = storys.split(',');
		 }
		 else{
			 storypoints.push(storys);
		 }
	     var count=0;
		 var length=0;
		 length=storypoints.length;
		 
		 var cardsArray =[];
	     var imgSrc = "img/photo.png";
		 $.each(storypoints, function(key,val) {

            var str="<li class='col-md-5 circle-card'><div class='circle-bdr'><div class='circle-list-item'><span class='fa fa-times close-btn'></span><div class='list-row'><span class='item-cell' href='#'><img src='"+imgSrc+"' alt='' width='100%' height='100%'></span><div class='item-cell item-dec'><h5>"+val+"</h5></div></div></div></div></li>";
			cardsArray.push(str);        
		 });
		 $.each(cardsArray,function(index,card){
		   $('#circle-list-ul').append(card).children("li:last");
	     });
		
		/*Session Management*/
		
		$( ".close-btn" ).click(function() {
			$(this).parents("li").fadeOut();
		});
		
		var clickFunction = function() {  
			$(".circle-list-ul > .circle-card")
			.on('mousedown mouseup', function(e) {
				if (e.type == "mousedown") {
					lastClick = e.timeStamp; // get mousedown time
				
				} else {
					diffClick = e.timeStamp - lastClick;
					if (diffClick < clickDelay) {
						// add selected class to group draggable objects
						$(this).toggleClass(selectedClass);
					}
				}
			})
		 };
		 
		 $(".circle-list-ul > .circle-card").draggable({ 
			cursor: "move",
			helper: 'clone',
			distance: 15,
			grid: [ 50, 20 ],
			scroll:false,
			iframeFix: true,
			 start: function(e, ui) {
			   ui.helper.addClass(selectedClass);
			},
			stop: function(e, ui) {
				// reset group positions
				$('.' + selectedClass).css({
					top: 0,
					left: 0
				}).removeClass(selectedClass);
				if(!dropped){
					$(this).css({display: 'block'});
				}
			},
			drag: function(e, ui) {
				// set selected group position to main dragged object
				// this works because the position is relative to the starting position
				$('.' + selectedClass).css({
					top: ui.position.top,
					left: ui.position.left
				});
				$(this).css({display: 'none'});
			}
			
		});

	small_folder.droppable({
		drop : function(event, ui) {
			
			// Remove the dragged icon
			dropped = true;
			ui.draggable.remove();
			smallStories.push(ui.draggable.text());
			count++;
			if(count>=length){
				showCards();
			}
			small_folder.removeClass('open');
			$('body').css('cursor', 'auto');
		},
		
		over : function(){
			// When the user starts draggin an icon
			small_folder.addClass('open');
		},
		
		out : function(){
			// Close the small-folder
			small_folder.removeClass('open');
			dropped = false;
		}
	});

	medium_folder.droppable({
		drop : function(event, ui) {
			
			// Remove the dragged icon
			ui.draggable.remove();	
			mediumStories.push(ui.draggable.text());
			count++;
			if(count>=length){
				showCards();
			}
			medium_folder.removeClass('open');
			$('body').css('cursor', 'auto');
		},
		
		over : function(){
			// When the user starts draggin an icon
			medium_folder.addClass('open');
		},
		
		out : function(){
			// Close the medium_folder
			medium_folder.removeClass('open');
			dropped = false;
		}
	});

	large_folder.droppable({
		drop : function(event, ui) {
			
			// Remove the dragged icon
			ui.draggable.remove();	
			largeStories.push(ui.draggable.text());
			count++;
			if(count>=length){
				showCards();
			}
			large_folder.removeClass('open');
			$('body').css('cursor', 'auto');
		},
		
		over : function(){
			// When the user starts draggin an icon
			large_folder.addClass('open');
		},
		
		out : function(){
			// Close the large_folder
			large_folder.removeClass('open');
			dropped = false;
		}
	});

	extra_large_folder.droppable({
		drop : function(event, ui) {
			
			// Remove the dragged icon
			ui.draggable.remove();
			xlargeStories.push(ui.draggable.text());
			count++;
			if(count>=length){
				showCards();
			}
			extra_large_folder.removeClass('open');
			$('body').css('cursor', 'auto');
		},
		
		over : function(){
			// When the user starts draggin an icon
			extra_large_folder.addClass('open');
		},
		
		out : function(){
			// Close the extra_large_folder
			extra_large_folder.removeClass('open');
			dropped = false;
		}
	});
	function showCards(){
		var cardsArray1 =fetchCards(); 
		 $.each(cardsArray1,function(index,card){
		    $('#circle-list-ul-Est').append(card).children("li:last");
			 $("#storyPoints").hide();
			 $("#storyPointsWithEstimation").show();
	     });
		 
		 $("#macro").click(function(){
			 $(this).next().css( 'font-size','17px' );
		 });
		 $(".toggler").click( function() {
			$me = $(this);
			$me.toggleClass('off');
			
			if($me.is(".off")){
				 $(this).next().css( 'font-size','17px' );
				  $(this).next().css( 'background-color','#eed5b7' );
				   $(this).next().css( 'color','#0000ee' );
				   
			}else {
				 $(this).next().css( 'font-size','14px' );
				 $(this).next().css( 'background-color','#fff' );
				  $(this).next().css( 'color','black' );
			}
		});
		
		$(".circle-bdr").click(function(){
           var cardd=$(this).find("h5").text();	
		   var color=['estimationRed','estimationGreen','estimationBlue','estimationYellow'];
		   var c=$(this).html();
           var col=$(this).find("p").text();			   
		   $.session.set("cardd",cardd);
		   $.session.set("color",col);
		  
		   
		   
			$("#myModal").modal({
				backdrop: 'static',
				keyboard: true
			});
	    });
	
		$(".show-text").click(function(){
			$('#myModal').find(".lots-of-text").toggle();
			$('#myModal').modal('handleUpdate');
		});
		
		$('#myModal').on('show.bs.modal', function () {
			$('.modal-content').css('height',$( window ).height()*0.8);
			$('.modal-body').css('height',$( window ).height()*0.6);
		});
	}
	function fetchCards(){
			var cardsArray =[];
			 var small=$.session.get("small");
			 var meduim=$.session.get("medium");
			 var large=$.session.get("large");
			 var xlarge=$.session.get("xlarge");
			
			 var s=[];
			 var m=[];
			 var l=[];
			 var xl=[];
			 
		      
			 
			  var cardsArray =[];
			  
			var imgSrc = "img/photo.png";
			var estimationRed  = "estimateShadeRed";
			var estimationGreen  = "estimateShadeGreen";
			var estimationBlue  = "estimateShadeBlue";
			var estimationYellow  = "estimateShadeYellow";
			
				$.each(small, function(key,val) {
					var str="<li class='col-md-6 circle-card'><div class='circle-bdr'><div class='circle-list-item'><span class='fa fa-times close-btn'></span><div class='list-row'><span class='item-cell' href='#'><img src='"+imgSrc+"' width='100%' height='100%'></span><div class='"+estimationRed+"'></div><div class='item-cell item-dec'><input type='button' class='toggler' id='macro' style='margin-top:-17px;margin-left:120px' value='M'><h5>"+val+"</h5><p style='display:none'>1</p></div></div></div></div></div></div></li>";
					cardsArray.push(str);        
			    });
			
			
				$.each(meduim, function(key,val) {
					var str="<li class='col-md-6 circle-card' ><div class='circle-bdr'><div class='circle-list-item' ><span class='fa fa-times close-btn'></span><div class='list-row'><span class='item-cell' href='#'><img src='"+imgSrc+"' width='100%' height='100%'></span><div class='"+estimationGreen+"'></div><div class='item-cell item-dec'><input type='button' class='toggler' id='macro' style='margin-top:-17px;margin-left:120px' value='M'><h5>"+val+"</h5><p style='display:none'>2</p></div></div></div></div></div></div></li>";
					cardsArray.push(str);        
			    });
			
			
				$.each(large, function(key,val) {
					var str="<li class='col-md-6 circle-card' ><div class='circle-bdr'><div class='circle-list-item' ><span class='fa fa-times close-btn'></span><div class='list-row'><span class='item-cell' href='#'><img src='"+imgSrc+"' width='100%' height='100%'></span><div class='"+estimationBlue+"'></div><div class='item-cell item-dec'><input type='button' class='toggler' id='macro' style='margin-top:-17px;margin-left:120px' value='M'><h5>"+val+"</h5><p style='display:none'>3</p></div></div></div></div></div></div></li>";
					cardsArray.push(str);        
			    });
			
			
			  $.each(xlarge, function(key,val) {
					var str="<li class='col-md-6 circle-card' ><div class='circle-bdr'><div class='circle-list-item' ><span class='fa fa-times close-btn'></span><div class='list-row'><span class='item-cell' href='#'><img src='"+imgSrc+"' width='100%' height='100%'></span><div class='"+estimationYellow+"'></div><div class='item-cell item-dec'><input type='button' class='toggler' id='macro' style='margin-top:-17px;margin-left:120px' value='M'><h5>"+val+"</h5><p style='display:none'>4</p></div></div></div></div></div></div></li>";
					cardsArray.push(str);        
			    });
		
			    $.each(cardsArray,function(index,card){
			      $('#circle-list-ul').append(card).children("li:last");
			    });
			return cardsArray;
      }
	  function checkDel(value){
		 
	  }
	 
});