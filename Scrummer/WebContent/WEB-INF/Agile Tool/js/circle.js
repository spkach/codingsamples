var windowWidth = $(window).width(),
	windowHeight = $(window).height(),
	
 	circleLeft = $('.circle-left-ctn').outerWidth(),
	circleright = $('.circle-right-ctn').outerWidth(),
	circleWidth = windowWidth - circleLeft - 22 +"px";
	circleHeight = windowHeight - 52 +"px";
	var dropped = false;
var selectedClass = 'ui-state-highlight',
        clickDelay = 600,
        // click time (milliseconds)
        lastClick, diffClick; // timestamps
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
  clickFunction()
 $(function() {
    var availableTags = [	
      "ActionScript",
      "AppleScript",
      "Asp",
      "BASIC",
      "C",
      "C++",
      "Clojure",
      "COBOL",
      "ColdFusion",
      "Erlang",
      "Fortran",
      "Groovy",
      "Haskell",
      "Java",
      "JavaScript",
      "Lisp",
      "Perl",
      "PHP",
      "Python",
      "Ruby",
      "Scala",
      "Scheme"
    ];
    $( "#tags" ).autocomplete({
      source: availableTags
    });
  });

$(document).ready(function(e) {
	$( ".close-btn" ).click(function() {
		$(this).parents("li").fadeOut();
	});
	$('#affixCircles').css({
		 "width": circleWidth,
		"height":circleHeight
	});
	
	// Frame cards to be shown in UI
	var cardsArray = fetchCards();
	
	$.each(cardsArray,function(index,card){
		$('#circle-list-ul').append(card).children("li:last");
	});
	
	$("#sprintDialog").dialog({
		autoOpen: false,
		modal: true,
		height: window.screen.height,
		width : window.screen.width-50,
		resizable:true,
		title:'Sprint Estimation',
		open: function(ev, ui){
			$('#myIframe').attr('src','\sprintestimation.html');
		},
		 hide: {
            effect: "scale",
            easing: "easeInBack"
        },
        show: {
            effect: "scale",
            easing: "easeOutBack"
        }
	}).siblings('.ui-dialog-titlebar').css("background","blue");
	
	$('.circle-drop').click(function(){
		$('#sprintDialog').dialog('open');
	});
});
 
jQuery( document ).ready(function( $ ) {
	
	//var windowWidth = $(window).width();

/*$(".circle-drop-item .circle-card").mouseenter(function(){
	alert("dddd")
	 var $this = $(this);
                    move($this,2000,1);
	
})*/var outside = 0;
var outsideCircle = 0;
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
			$('#cardContainer').removeClass('card-z-index');
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
			
			$('#cardContainer').addClass('card-z-index');
			
            $('.' + selectedClass).css({
                top: ui.position.top,
                left: ui.position.left
            });
			$(this).css({display: 'none'});
        }
		
	});
   $(".circle-list-ul").droppable({
		greedy: true,
		hoverClass: "data-hover",
		accept: ".circle-drop-item > .circle-card",
		
over: function (event, ui) {

    var folderName = $(event.target).attr('id');
    var targetFolder = $(event.target).attr('id');
 var parentClass =  $(ui.helper).parents('li')
 $(ui.helper).find('.draggable-tooltip').remove();
 $(ui.helper).find('.circle-bdr').append($('<span class="draggable-tooltip"></span>'));

  },
   out: function(event,ui){
	 $(ui.helper).find('.draggable-tooltip').remove();
    $(ui.helper).find('.circle-bdr').append($('<span class="draggable-tooltip delete"></span>'));
 

  },
		drop: function( event, ui ) {
			 var cloneItem = $(ui.draggable).clone().on('mousedown mouseup', function(e) {
		
     	if (e.type == "mousedown") {
            lastClick = e.timeStamp; // get mousedown time
		
        } else {
            diffClick = e.timeStamp - lastClick;
            if (diffClick < clickDelay) {
		
                // add selected class to group draggable objects
                $(this).toggleClass(selectedClass);
            }
        }
    });
			recycleImage( cloneItem , this );
			outside = 1
		
		
			
		}
    });
	$(".circle-drop").droppable({
		greedy: true,
		tolerance: "pointer",
		hoverClass: "drop-hover",
		over: function (event, ui) {
			outsideCircle = 1;
    		$(ui.helper).find('.draggable-tooltip').remove();
		},
     	
		drop: function( event, ui ) {
			dropped = true;
			var cloneItem
						 
		$('#cardContainer').removeClass('card-z-index');
		var userImg = $(ui.helper).find('.estimate').remove();
			
		 if($('.' + selectedClass).length == 1){
               
         cloneItem = $('.' + selectedClass).removeClass('left-drop-card ui-draggable-dragging draggable' + selectedClass).addClass('dingdon').css({
                position:'',
                top: 0,
                left: 0
            }).clone()
           
            }else{
            cloneItem = $('.' + selectedClass + ':not(.ui-draggable-dragging)').removeClass('left-drop-card draggable' + selectedClass).addClass('dingdon').css({
                position:'',
                top: 0,
                left: 0
            }).clone()
           
            }
	 		deleteImage(cloneItem , this );
			var dropItmeList = $(this).find('.circle-drop-item li').length
			$(this).find('.members').text(dropItmeList)
			if(cloneItem.hasClass(selectedClass)){
			$(this).find(".dorp-action.add-new").text(cloneItem.length)
        		 $(this).find(".dorp-action.add-new").animate({"margin-top": "-25px","opacity" : "1"}, 450, function(){
					
					  $(this).animate({"margin-top": "0px","opacity" : "0" }, 450);
						dropped = false;
					 });
			}
		},	
		out: function (event, ui) {
		
			outsideCircle = 0;
			if(!$(ui.helper).hasClass('left-drop-card')){
				$(ui.helper).find('.draggable-tooltip').remove();
   				 $(ui.helper).find('.circle-bdr').append($('<span class="draggable-tooltip delete"></span>'));
			}
  		}
	});
	
	function recycleImage( $item, data ) {
		$item.fadeOut(function() {
        $item
          .appendTo( ".circle-list-ul" )
          .fadeIn(function() {
		   $item
          .removeAttr("style").addClass('left-drop-card').removeClass('dingdon')
		   .find( "img" )
            .removeAttr("style")
		  })
      });
	  $item.draggable({
       helper: 'clone',
      
        revertDuration: 10,
        // grouped items animate separately, so leave this number low
        containment: '.demo',
		
        start: function(e, ui) {
			outside = 0
           ui.helper.addClass(selectedClass);
        },
        stop: function(e, ui) {
            // reset group positions
            $('.' + selectedClass).css({
                top: 0,
                left: 0
            }).removeClass(selectedClass);
        },
        drag: function(e, ui) {
            // set selected group position to main dragged object
            // this works because the position is relative to the starting position
            $('.' + selectedClass).css({
                top: ui.position.top,
                left: ui.position.left
            });
        }
        
    })
    }

	function deleteImage($item , data ) {
		 var $trash = $( data );
		 var itemArray = []
		 $item.each(function(){
			 var subitem = $(this)
				subitem.fadeOut(function() {
				var $list = $( "ul", $trash ).length ?
				  $( "ul", $trash ) :
				  $( "<ul class='circle-drop-item ui-helper-reset clearfix'/>" ).appendTo( $trash );
		 
				console.log("list "+$list)
				subitem.appendTo( $list).fadeIn(function() {
					subitem.animate({ 
						width: "22px" ,
						position:"absolute"
						})
            			.find( "img" )
              			.animate({ height: "22px" });
					
				  });
				});
			
			  	subitem.draggable({ 
				appendTo:'.content',
				 helper: 'clone',
	   start: function(e, ui) {
		outside = 0
		var folderName = (ui.helper).data('id');
 		var parentClass =  $(ui.helper).parents('li.circle-popover')
		if(parentClass.has('#' + folderName)){
	 		$(ui.helper).find('.draggable-tooltip').remove();
 		}else{
			$(ui.helper).find('.draggable-tooltip').remove();
    		$(ui.helper).find('.circle-bdr').append($('<span class="draggable-tooltip"></span>'));
 			}
	   },
		drag: function(e, ui) {	
	    	outside = 0
	  	},
	
	  	stop: function(event, ui) {
		   	var folderName = (ui.helper).data('id');
 			var parentClass =  $(ui.helper).parents('li.circle-popover').attr('id');
			if(outside == 0 && outsideCircle == 0){
			  	
		$(this).parents('li.circle-popover').find(".dorp-action.delete").animate({"margin-top": "-25px","opacity" : "1"}, 450, function(){
						$(this).animate({"margin-top": "0px","opacity" : "0" }, 450);
					 });
        				var dropItmeList = $(this).parents('li.circle-popover').find('.circle-drop-item li').length
					
			$(this).parents('li.circle-popover').find('.members').text(dropItmeList - 1)
			
					$(this).remove();
					
				 
			}
		},
				cursorAt: { left: 25 }
				});
				var liLength = $trash.find("ul li").length
				
				if (liLength > 10){
					
					subitem.css({
						display:'none'
						})
				}
				move(liLength, subitem,1500,1);
					
			 subitem.attr('data-id',subitem.parents('li.circle-popover').attr('id'))
			 })
		 
      }
	 function move(count,$elem,speed,turns){
			 var $circle = $elem;
				
					/* make the circle appear in a circular movement */
                    var end = 180 - 360 * (turns-1);
					
                    $circle
                    .animate({
                        path : new $.path.arc({
                            center : [39,39],
                            radius : 40,
                            start	: 180,
                            end		: -180 + count * 35,
                            dir		: -1
                        }),
						
                        opacity: '1'
                    },speed);
					
                }

});

$(function(){
    $.contextMenu({
        selector: '.context-menu-one', 
		 className: 'data-title',
		 styleName: 'fdfdf',
        callback: function(key, options) {
            var m = "clicked: " + key;
            window.console && console.log(m) || alert(m); 
        },
        items: {
            "edit": {name: "Edit", icon: "edit"},
          	"delete": {name: "Delete", icon: "delete"},
           }
    });
    $('.context-menu-one').on('click', function(e){
        
    })
});

$('.circle-popover').popover({
    placement : 'left',
    title : 'SCRUMMER<p style="margin:0; font-weight:normal;">Sprints</p>',
	trigger: 'hover',
	html : true,
	container: 'body',
    content : 'Drag and Drop BackLogs to Sprints'
});
$(function()
{
	
  var hideDelay = 10;  
  var currentID = true;
  var hideTimer = null;
   var hideTimerc = null;
 var  cover_pic = "img/card-2.jpg";
                    var  profile_pic = "img/photo.png";
                    var  user_name = "BackLog";
					 var  volcare_center = "BackLog Desc....";
  // One instance that's reused to show info for the current person
  var container = $('<div id="personPopupContainer">'
      + '<img src= "' + cover_pic + '" id="cover"/>'
	  + '<img src= "' + profile_pic + '" id="profile"/>'
	  + '<div id="hoverbox_name"><p>' + user_name + '</p><p class="center-name">' + volcare_center + '</p>');

  $('body').append(container);

  $('.personPopupTrigger').on('mouseover', function()
  {
	  if (hideTimer)
	 
          clearTimeout(hideTimer);

      var pos = $(this).offset();
      var width = $(this).width();
      container.css({
          left: (pos.left + width) + 'px',
          top: pos.top - 5 + 'px'
      });
		container.css('display', 'block');
  });

  $('.personPopupTrigger').on('mouseout', function()
  {
      if (hideTimer)
          clearTimeout(hideTimer);
      hideTimer = setTimeout(function()
      {
          container.css('display', 'none');
      }, hideDelay);
  });

  // Allow mouse over of details without hiding details
  $('#personPopupContainer').mouseover(function()
  {		currentID = true
      if (hideTimer)
          clearTimeout(hideTimer);
		  
  });

  // Hide after mouseout
  $('#personPopupContainer').mouseout(function()
  {
      if (hideTimer)
          clearTimeout(hideTimer);
		
	if (currentID == true){	
	 
      hideTimer = setTimeout(function()
      { 
	
          container.css('display', 'none');
		 
      }, hideDelay);
	}
  });
  
  
   // One instance that's reused to show info for the current person
  var addContainer = $('<div id="circlePopUP"><ul>'
  + '<li><input type="checkbox" id="friends"> '
  + '<label class="check" for="friends"> Friends</label></li>'
  + '<li><input type="checkbox" id="family"> '
  + '<label class="check" for="family"> Family</label></li>'
  + '<li><input type="checkbox" id="following"> '
  + '<label class="check" for="following"> Following</label></li></ul>'
  +'<div class="popup-new-circel"><a href="#" id="new-circle-form"> Create new circles</a></div>'
  + '</div>');
 

  $('body').append(addContainer);


var circleform= $('<input type="text"/>');
var circlelink= $('<a href="#" id="new-circle-form"> Create new circles</a>');

$('#new-circle-form').on('click', function(){
	
	event.preventDefault()
	$(this).parents(".popup-new-circel").html(circleform);
})

  $('.add-to-circle').on('mouseover', function()
  { 
  currentID = true 
	  if (hideTimerc)
          clearTimeout(hideTimerc);

      var pos = $(this).offset();
      var width = $(this).outerWidth();
	  var addConWidth = addContainer.outerWidth();
	   var addConHieght = addContainer.outerHeight();
      addContainer.css({
          left: (pos.left + width  - addConWidth  ) + 'px',
          top: pos.top - addConHieght + 33 + 'px',
		  float:"right"
      });
	  
		addContainer.css('display', 'block');
  });

 $('.add-to-circle').on('mouseout', function()
  {currentID = false 

      if (hideTimerc){
          clearTimeout(hideTimerc);
		 
		 }
      hideTimerc = setTimeout(function()
      { 
		addContainer.css('display', 'none');
		  
      }, hideDelay);
  });

  // Allow mouse over of details without hiding details
  $('#circlePopUP').mouseover(function()
  {		currentID = false 
      if (hideTimerc)
          clearTimeout(hideTimerc);
  });

  // Hide after mouseout
  $('#circlePopUP').mouseout(function()
  {
	 if (hideTimerc)
          clearTimeout(hideTimerc);
      hideTimerc = setTimeout(function(){
  	if ( $("#personPopupContainer").is( ":hover" ) ) {
	
   addContainer.css('display', 'none');
   $(".popup-new-circel").html(circlelink);
   $('#new-circle-form').on('click', function(){
	
	event.preventDefault()
	$(this).parents(".popup-new-circel").html(circleform);
})
  }
  else{
	container.css('display', 'none');
  	addContainer.css('display', 'none');
	$(".popup-new-circel").html(circlelink);
	$('#new-circle-form').on('click', function(){
	
	event.preventDefault()
	$(this).parents(".popup-new-circel").html(circleform);
})
  }
      }, hideDelay);
  });
});

function fetchCards(){
	var cardsArray =[];
	var imgSrc1 = "img/bob.png";
	var imgSrc2 = "img/chris.png";
	var imgSrc3 = "img/claira.png";
	var imgSrc4 = "img/rishi.png";
	
	var estimationRed  = "estimateShadeRed";
	var estimationGreen  = "estimateShadeGreen";
	var estimationBlue  = "estimateShadeBlue";
	var estimationYellow  = "estimateShadeYellow";
	var card1 = "<li class='col-lg-4 col-md-4 circle-card left-drop-card'><div class='circle-bdr'><div class='circle-list-item'><span class='fa fa-times close-btn'></span><div class='list-row'><span class='item-cell' href='#'><img src='"+imgSrc1+"' width='100%' height='100%'></span><div class='estimate'><div class='"+estimationRed+"'></div></div><div class='item-cell item-dec cardDesc'><h5>Create Login Screen</h5></div></div></div></div></li>";
	var card2 = "<li class='col-lg-4 col-md-4 circle-card left-drop-card'><div class='circle-bdr'><div class='circle-list-item'><span class='fa fa-times close-btn'></span><div class='list-row'><span class='item-cell' href='#'><img src='"+imgSrc2+"' width='100%' height='100%'></span><div class='estimate'><div class='"+estimationGreen+"'></div></div><div class='item-cell item-dec cardDesc'><h5>Audit Screen</h5></div></div></div></div></li>";
	var card3 = "<li class='col-lg-4 col-md-4 circle-card left-drop-card'><div class='circle-bdr'><div class='circle-list-item'><span class='fa fa-times close-btn'></span><div class='list-row'><span class='item-cell' href='#'><img src='"+imgSrc3+"' width='100%' height='100%'></span><div class='estimate'><div class='"+estimationYellow+"'></div></div><div class='item-cell item-dec cardDesc'><h5>Session Management</h5></div></div></div></div></li>";
	var card4 = "<li class='col-lg-4 col-md-4 circle-card left-drop-card'><div class='circle-bdr'><div class='circle-list-item'><span class='fa fa-times close-btn'></span><div class='list-row'><span class='item-cell' href='#'><img src='"+imgSrc4+"' width='100%' height='100%'></span><div class='estimate'><div class='"+estimationRed+"'></div></div><div class='item-cell item-dec cardDesc'><h5>Database Integration</h5></div></div></div></div></li>";
	var card5 = "<li class='col-lg-4 col-md-4 circle-card left-drop-card'><div class='circle-bdr'><div class='circle-list-item'><span class='fa fa-times close-btn'></span><div class='list-row'><span class='item-cell' href='#'><img src='"+imgSrc1+"' width='100%' height='100%'></span><div class='estimate'><div class='"+estimationBlue+"'></div></div><div class='item-cell item-dec cardDesc'><h5>Web Services</h5></div></div></div></div></li>";
	var card6 = "<li class='col-lg-4 col-md-4 circle-card left-drop-card'><div class='circle-bdr'><div class='circle-list-item'><span class='fa fa-times close-btn'></span><div class='list-row'><span class='item-cell' href='#'><img src='"+imgSrc2+"' width='100%' height='100%'></span><div class='estimate'><div class='"+estimationGreen+"'></div></div><div class='item-cell item-dec cardDesc'><h5>Transformation Screen</h5></div></div></div></div></li>";
	var card7 = "<li class='col-lg-4 col-md-4 circle-card left-drop-card'><div class='circle-bdr'><div class='circle-list-item'><span class='fa fa-times close-btn'></span><div class='list-row'><span class='item-cell' href='#'><img src='"+imgSrc3+"' width='100%' height='100%'></span><div class='estimate'><div class='"+estimationYellow+"'></div></div><div class='item-cell item-dec cardDesc'><h5>DashBoard Functionality</h5></div></div></div></div></li>";
		 
			 
	cardsArray.push(card1);
	cardsArray.push(card2);
	cardsArray.push(card3);
	cardsArray.push(card4);
	cardsArray.push(card5);
	cardsArray.push(card6);
	cardsArray.push(card7);
	
	return cardsArray;
}