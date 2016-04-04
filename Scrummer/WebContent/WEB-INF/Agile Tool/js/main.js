jQuery(document).ready(function($){
	
	/* toggle 3d navigation */
	var selectedTab = $('.cd-3d-nav li.cd-selected');
	var index = $( ".cd-3d-nav li" ).index( selectedTab );
	var leftIndex = index*272+'px';
	$( ".cd-marker" ).css( "left",leftIndex);
	
	$('#projectForm').submit(function(event) {
		var form = this;
		toggle3dBlock(!$('.cd-header').hasClass('nav-is-visible'));
		event.preventDefault();
		setTimeout(function(){
			var selectedTab = $('.cd-3d-nav li.cd-selected');
			var nextTab = selectedTab.next();
			nextTab.addClass('cd-selected').siblings('li').removeClass('cd-selected');
			updateSelectedNav('close');
			setTimeout(function(){
				var href = nextTab.attr('data-link');
				$('#projectForm').attr('action',href);
				form.submit();
			},900);
		},900);
	});
	
	/* Multi Select Tag Field */
	var $activate_selectator6 = $('#activate_participants');
	$activate_selectator6.click(function () {
		var $select6 = $('#select6');
		if ($select6.data('selectator') === undefined) {
			$select6.selectator({
				showAllOptionsOnFocus: true,
				keepOpen: true
			});
			$activate_selectator6.val('destroy selectator');
		} else {
			$select6.selectator('destroy');
			$activate_selectator6.val('activate selectator');
		}
	});
	$activate_selectator6.trigger('click');
	/* Multi Select Tag Field ends*/

	/*Bouncing Menu*/
	var is_bouncy_nav_animating = false;
	//open bouncy navigation
	$('.cd-3d-nav-trigger').on('click', function(){
		$('#cardContainer').removeClass('card-z-index');
		triggerBouncyNav(true);
	});
	//close bouncy navigation
	$('.cd-bouncy-nav-modal .cd-close').on('click', function(){
		triggerBouncyNav(false);
	});
	$('.cd-bouncy-nav-modal').on('click', function(event){
		if($(event.target).is('.cd-bouncy-nav-modal')) {
			triggerBouncyNav(false);
		}
	});

	$(window).on('resize', function(){
		window.requestAnimationFrame(updateSelectedNav);
	});
	/*Bouncing Menu ends*/
	
	function toggle3dBlock(addOrRemove) {
		if(typeof(addOrRemove)==='undefined') addOrRemove = true;	
		$('.cd-header').toggleClass('nav-is-visible', addOrRemove);
		$('.cd-3d-nav-container').toggleClass('nav-is-visible', addOrRemove);
		$('main').toggleClass('nav-is-visible', addOrRemove).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			//fix marker position when opening the menu (after a window resize)
			addOrRemove && updateSelectedNav();
		});
	}

	//this function update the .cd-marker position
	function updateSelectedNav(type) {
		var selectedItem = $('.cd-selected'),
			selectedItemPosition = selectedItem.index() + 1, 
			leftPosition = selectedItem.offset().left,
			backgroundColor = selectedItem.data('color'),
			marker = $('.cd-marker');

		marker.removeClassPrefix('color').addClass('color-'+ selectedItemPosition).css({
			'left': leftPosition,
		});
		if( type == 'close') {
			marker.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				toggle3dBlock(false);
			});
		}
	}

	$.fn.removeClassPrefix = function(prefix) {
	    this.each(function(i, el) {
	        var classes = el.className.split(" ").filter(function(c) {
	            return c.lastIndexOf(prefix, 0) !== 0;
	        });
	        el.className = $.trim(classes.join(" "));
	    });
	    return this;
	};
	
	function triggerBouncyNav($bool) {
		//check if no nav animation is ongoing
		if( !is_bouncy_nav_animating) {
			is_bouncy_nav_animating = true;
			
			//toggle list items animation
			$('.cd-bouncy-nav-modal').toggleClass('fade-in', $bool).toggleClass('fade-out', !$bool).find('li:last-child').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
				$('.cd-bouncy-nav-modal').toggleClass('is-visible', $bool);
				if(!$bool) $('.cd-bouncy-nav-modal').removeClass('fade-out');
				is_bouncy_nav_animating = false;
			});
			
			//check if CSS animations are supported... 
			if($('.cd-bouncy-nav-trigger').parents('.no-csstransitions').length > 0 ) {
				$('.cd-bouncy-nav-modal').toggleClass('is-visible', $bool);
				is_bouncy_nav_animating = false;
			}
		}
	}
});