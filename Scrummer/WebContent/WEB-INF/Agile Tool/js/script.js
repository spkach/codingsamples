$(document).ready(function(){
	
	$("#doneBtn").click(function(){
		//$(this).find('.ui-dialog-content').dialog('close');
		//window.parent.jQuery('#sprintDialog').dialog('close');
		parent.closeIframe();
	});
	// Frame cards to be shown in UI
	var cardsArray = fetchCards();
	
	$.each(cardsArray,function(index,card){
		$('#circle-list-ul').append(card).children("li:last");
	});

	//Initialise Drop down menu
	// The select element to be replaced:
	var selectArray  = $('select.makeMeFancy');
	$.each(selectArray,function(index,item){
		var selectId = item.id;
		var select = $('select[id ='+selectId+']');
		initializeUserDropDown(select);
	});
});

function initializeUserDropDown(select){
	openDropDownObject = {};
	openDropDownCount = 0;
	var selectBoxContainer = $('<div>',{
		width		: select.outerWidth(),
		className	: 'tzSelect',
		html		: '<div class="selectBox"></div>'
	});

	var dropDown = $('<ul>',{className:'dropDown'});
	var selectBox = selectBoxContainer.find('.selectBox');
	
	$("#makeMeFancy option[value='']").attr('selected', true);

	// Looping though the options of the original select element
	
	select.find('option').each(function(i){
		var option = $(this);
		
		if(i==select.attr('selectedIndex')){
			selectBox.html(option.text());
		}
		
		// As of jQuery 1.4.3 we can access HTML5 
		// data attributes with the data() method.
		
		if(option.data('skip')){
			return true;
		}
		
		// Creating a dropdown item according to the
		// data-icon and data-html-text HTML5 attributes:
		
		var li = $('<li>',{
			html:	'<img src="'+option.data('icon')+'" /><span>'+
					option.data('html-text')+'</span>'
		});
				
		li.click(function(){
			$(this).parent().parent().parent().parent().find('.item-cell')[0].innerHTML = "<img src='"+option.attr("data-icon")+"' width='100%' height='100%'>";
			selectBox.html(option.text());
			dropDown.trigger('hide');
			
			// When a click occurs, we are also reflecting
			// the change on the original select element:
			select.val();
			
			return false;
		});
		
		dropDown.append(li);
	});
	
	selectBoxContainer.append(dropDown.hide());
	select.hide().after(selectBoxContainer);
	
	// Binding custom show and hide events on the dropDown:
	
	dropDown.bind('show',function(){
		
		if(dropDown.is(':animated')){
			return false;
		}
		
		selectBox.addClass('expanded');
		dropDown.slideDown();
		
	}).bind('hide',function(){
		
		if(dropDown.is(':animated')){
			return false;
		}
		
		selectBox.removeClass('expanded');
		dropDown.slideUp();
		
	}).bind('toggle',function(){
		if(selectBox.hasClass('expanded')){
			openDropDownCount = 0;
			dropDown.trigger('hide');
		}
		else if (openDropDownCount == 1){
			openDropDownObject.trigger('hide');
			dropDown.trigger('show');
			openDropDownObject = dropDown;
		}
		else {
		  openDropDownObject = dropDown;
		  openDropDownCount = 1;
		  dropDown.trigger('show');
		}
	});
	
	selectBox.click(function(){	
		dropDown.trigger('toggle');
		return false;
	});

	// If we click anywhere on the page, while the
	// dropdown is shown, it is going to be hidden:
	
	$(document).click(function(){
		dropDown.trigger('hide');
	});
}

function fetchCards(){
	var cardsArray =[];
	var tasks=[];
	var tasksNames=[];
	var tasksValues=[];
	var imgSrc = "img/photo.png";
	var estimationRed  = "estimateShadeRed";
	var estimationGreen  = "estimateShadeGreen";
	var estimationBlue  = "estimateShadeBlue";
	var estimationYellow  = "estimateShadeYellow";
	var taskValue=$.session.get("taskValue");
	var taskName=$.session.get("taskName");
	var task=$.session.get("tasks");
	if(task.indexOf(",")>=0){
	  tasks=task.split(",");	
	}
	else{
		tasks.push(task);
	}
	if(taskName.indexOf(",")>=0){
	  tasksNames=taskName.split(",");	
	}
	else{
		tasksNames.push(taskName);
	}
	if(taskValue.indexOf(",")>=0){
	  tasksValues=taskValue.split(",");	
	}
	else{
		tasksValues.push(taskValue);
	}
    for(i=0;i<tasks.length;i++){
		if(tasksValues[i]==="1"){
		  var card="<li class='col-md-5 circle-card'><div class='circle-bdr'><div class='circle-list-item'><span class='fa fa-times close-btn'></span><div class='list-row'><span class='item-cell' href='#'><img src='"+imgSrc+"' width='100%' height='100%'></span><div class='"+estimationRed+"'></div><div class='item-cell item-dec'><h5>"+tasksNames[i]+"</h5></div><span class='user-list' id='userList'><select id='fancySelect"+i+"' class='makeMeFancy'><option value='1' data-icon='img/chris.png' data-html-text='US&lt;i&gt;Chris&lt;/i&gt;'>&#9660;</option><option value='2' data-icon='img/bob.png' data-html-text='Singapore &lt;i&gt;Bob&lt;/i&gt;'>&#9660;</option><option value='3' data-icon='img/claira.png' data-html-text='US&lt;i&gt;Claira&lt;/i&gt;'>&#9660;</option><option value='4' data-icon='img/rishi.png' data-html-text='India&lt;i&gt;Rishi&lt;/i&gt;'>&#9660;</option></select></span></div></div></div></li>";	
          cardsArray.push(card);		
		}
		else if(tasksValues[i]==="2"){
			alert(tasksValues[i]);
			var card="<li class='col-md-5 circle-card'><div class='circle-bdr'><div class='circle-list-item'><span class='fa fa-times close-btn'></span><div class='list-row'><span class='item-cell' href='#'><img src='"+imgSrc+"' width='100%' height='100%'></span><div class='"+estimationGreen+"'></div><div class='item-cell item-dec'><h5>"+tasksNames[i]+"</h5></div><span class='user-list' id='userList'><select id='fancySelect"+i+"' class='makeMeFancy'><option value='1' data-icon='img/chris.png' data-html-text='US&lt;i&gt;Chris&lt;/i&gt;'>&#9660;</option><option value='2' data-icon='img/bob.png' data-html-text='Singapore &lt;i&gt;Bob&lt;/i&gt;'>&#9660;</option><option value='3' data-icon='img/claira.png' data-html-text='US&lt;i&gt;Claira&lt;/i&gt;'>&#9660;</option><option value='4' data-icon='img/rishi.png' data-html-text='India&lt;i&gt;Rishi&lt;/i&gt;'>&#9660;</option></select></span></div></div></div></li>";	
            cardsArray.push(card);
		}
		else if(tasksValues[i]==="3"){
			alert(tasksValues[i]);
			var card="<li class='col-md-5 circle-card'><div class='circle-bdr'><div class='circle-list-item'><span class='fa fa-times close-btn'></span><div class='list-row'><span class='item-cell' href='#'><img src='"+imgSrc+"' width='100%' height='100%'></span><div class='"+estimationBlue+"'></div><div class='item-cell item-dec'><h5>"+tasksNames[i]+"</h5></div><span class='user-list' id='userList'><select id='fancySelect"+i+"' class='makeMeFancy'><option value='1' data-icon='img/chris.png' data-html-text='US&lt;i&gt;Chris&lt;/i&gt;'>&#9660;</option><option value='2' data-icon='img/bob.png' data-html-text='Singapore &lt;i&gt;Bob&lt;/i&gt;'>&#9660;</option><option value='3' data-icon='img/claira.png' data-html-text='US&lt;i&gt;Claira&lt;/i&gt;'>&#9660;</option><option value='4' data-icon='img/rishi.png' data-html-text='India&lt;i&gt;Rishi&lt;/i&gt;'>&#9660;</option></select></span></div></div></div></li>";	
            cardsArray.push(card);
		}
		else if(tasksValues[i]==="4"){
			alert(tasksValues[i]);
			var card="<li class='col-md-5 circle-card'><div class='circle-bdr'><div class='circle-list-item'><span class='fa fa-times close-btn'></span><div class='list-row'><span class='item-cell' href='#'><img src='"+imgSrc+"' width='100%' height='100%'></span><div class='"+estimationYellow+"'></div><div class='item-cell item-dec'><h5>"+tasksNames[i]+"</h5></div><span class='user-list' id='userList'><select id='fancySelect"+i+"' class='makeMeFancy'><option value='1' data-icon='img/chris.png' data-html-text='US&lt;i&gt;Chris&lt;/i&gt;'>&#9660;</option><option value='2' data-icon='img/bob.png' data-html-text='Singapore &lt;i&gt;Bob&lt;/i&gt;'>&#9660;</option><option value='3' data-icon='img/claira.png' data-html-text='US&lt;i&gt;Claira&lt;/i&gt;'>&#9660;</option><option value='4' data-icon='img/rishi.png' data-html-text='India&lt;i&gt;Rishi&lt;/i&gt;'>&#9660;</option></select></span></div></div></div></li>";	
            cardsArray.push(card);
		}
	}
	return cardsArray;
}