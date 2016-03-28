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

		s_front.text('S');
		m_front.text('M');
		l_front.text('L');
		xl_front.text('XL');
		
		var selectedClass = 'ui-state-highlight',
        clickDelay = 600,
        // click time (milliseconds)
        lastClick, diffClick; // timestamps
		
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
});