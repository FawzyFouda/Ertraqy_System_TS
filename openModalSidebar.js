setTimeout(function() {
    if( $('.postcontent #tickets-search .ticketDetails') ) {
        $('.postcontent #tickets-search .ticketDetails').unbind('click');
        $('.postcontent #tickets-search .ticketDetails').click(function(event) {
            
            var ct = $(this);
            var ticketNum = ct.closest('tr').find('td.col-request .request-details .ticketNo').text();    //رقم التذكرة
            var ticketId = ct.attr('id');   // tickt id
            var contactId = ct.closest('tr').attr('contact-id');  // // id for parent tr
            var contactName = ct.closest('tr').find('.col-contact-details .contact-info span').text();   //اسم العميل
            var taskId = _uuidv4();
            var templateId = ct.closest('tr').attr('template-id');
            var typeparentId = ct.closest('tr').attr('type-id');
            openTicketDetailsSideBar(ticketNum, ticketId, contactId, contactName, taskId, templateId, typeparentId);
        });
    }
}
)

// _____________________________________________________________________________________________
var openTicketDetailsSideBar = function(ticketNum, ticketId, contactId, contactName, taskId, templateId, typeparentId) {
		
    var options = {};
    // options.event = event;  // mhmd
    // options.clearBeforeAppend = true; // mhmd
    options.Title = ( $('body').hasClass('rtl') ? 'تذكرة ' : 'Ticket' ) + ticketNum;
    options.Size = 'xlg';
    options.ModalCssClass = 'sideBarLeftL1';
    options.RemoveContent = false;
    options.ModalId = 'sidebar-ticket-' + ticketId;
    options.ModalName = ticketNum;
    options.SetOverlay = false;
    options.sideBarsList = true;
    options.Url = getPnlUrlPrefix() + "tickets/search/details?details-id=" + ticketId;
    options.ticketId = ticketId;
    options.contactId = contactId;
    options.contactName = contactName;
    options.taskId = taskId;
    options.templateId = templateId;
    options.typeparentId = typeparentId;
    options.SuccessTriggerEvent = loadCallcenterAssistantSuccessTrigger;
    options.alwaysFunction1 = afterLoadTicketDetailsInSideBar;		// function in cms_custom.js
    
    openModalSidebar(options);
}
// ________________________________________openModalSidebar_____________________________________________________

function openModalSidebar(options) {

    options.Title
    options.Size
    options.ModalCssClass
    options.RemoveContent
    options.ModalId
    options.ModalName
    options.modalKey
    options.SetOverlay
    options.sideBarsList
    options.tabs
    options.Url
    options.SuccessTriggerEvent
    options.alwaysFunction1
    options.event
    options.clearBeforeAppend
    options.alwaysFunctionExcute
   
   if(options.modalKey)
       openModalSidebarModals[options.modalKey] = options;

    // avoid double click not verified
   if(options.event && $(options.event.currentTarget)) {
       $(options.event.currentTarget).click(_do_nothing); 
       setTimeout(function(){
           $(options.event.currentTarget).unbind('click', _do_nothing);
       }, 700);
   }

   if($('#' + options.ModalId).length == 0){
       var modalSidebar = 'div class=modal-sidebar id=' + options.ModalId + ''+
                               'a href=javascriptvoid(0); class=modal-sidebar-closei class=fa fa-arrow-leftia'+
                               'div class=modal-sidebar-titlespanspandiv'+
                               'div class=modal-sidebar-content contentdiv'+
                           'div';
       $('#wrapper').append(modalSidebar);
   }
   
   var dir = $('body').attr('dir') == 'rtl'  'left'  'right';
//   -------------------------------------------select ul by id = sidebar-ticket-(ticketId) (container of tabs then add attributes)----------------------------------------------------------------- 
   if(options.Title)
       $('#' + options.ModalId + ' .modal-sidebar-title span').html(options.Title);
   if(options.Size)
    // --------------add attr size-------------- 
       $('#' + options.ModalId).attr('size', options.Size);
   if($('.employee-payroll-tabs').length == 1)
       $('.employee-payroll-tabs').css('left', $('#sidebar-emp-payroll').width());
    // --------------add attr class sidebar1-------------- 
   if(options.ModalCssClass)
       $('#' + options.ModalId).addClass(options.ModalCssClass);
   if(options.RemoveContent == undefined)
       options.RemoveContent = true;
    // --------------add attr remove-content-------------- 
   $('#' + options.ModalId).attr('remove-content', options.RemoveContent);
   if(options.sideBarsList == undefined)
       options.sideBarsList = false;
    // --------------add attr list-------------- 
   $('#' + options.ModalId).attr('list', options.sideBarsList);
   if(options.SetOverlay == undefined)
       options.SetOverlay = true;
   if(options.tabs == undefined)
       options.tabs = true;
   if(options.alwaysFunctionExcute == undefined)
       options.alwaysFunctionExcute = true;
    // --------------add attr list-------------- 
   if($('#' + options.ModalId + ' .modal-sidebar-content').html() != ''){
       if(options.alwaysFunction1 && options.alwaysFunctionExcute == true)
           options.alwaysFunction1(options);

       if(options.sideBarsList){
           var prevModalId = $('.sideBars-opened-list li.active afirst').attr('modal-id');
           $('#' + prevModalId).hide();
           setTimeout( function(){ 
               $('.sideBars-opened-list').css(dir, $('#' + options.ModalId).width()).show();
           }, 200 );
           $('.sideBars-opened-list li.active').removeClass('active');
           $('.sideBars-opened-list li a[modal-id=' + options.ModalId +']').parent().addClass('active');
           $('#' + options.ModalId).addClass('shadow');
       }
   }
   else{
       if(options.Url){
           var options1 = {};
           options1.url = options.Url;
           options1.type = POST;
           options1.requestKey = options.ModalId;
           options1.done = function(doneOptions){				
               $('#' + options.ModalId + ' .modal-sidebar-content').append(doneOptions.paramData); 
               
               var $form = $('#' + options.ModalId).find('form');
               if($form && $form.find('.input-html-group').length  0){
                   $form.find('.input-html-group input, .input-html-group textarea').each(function(){
                       if($(this).val() != '')
                           $(this).val(_htmlDecode($(this).val()));
                   })
               }
               
               if (options.SuccessTriggerEvent)
                   options.SuccessTriggerEvent();
               
               if(options.sideBarsList){
                   $('#draggable-container .sideBars-opened').show();
                   $('.sideBars-opened-list').css(dir, $('#' + options.ModalId).width()).show();
                   $('.modal-sidebar.shadow').removeClass('shadow');
                   setTimeout( function(){ 
                       $('#' + options.ModalId).addClass('shadow');
                   }, 350 );
                   var prevModalId = $('.sideBars-opened-list li.active afirst').attr('modal-id');
                   $('#' + prevModalId).hide();
                   $('.sideBars-opened-list li.active').removeClass('active');
                   if(_sideBarsOpenedArray.indexOf(options.ModalId) == -1){
                       _sideBarsOpenedArray.push(options.ModalId);
                       $('.sideBars-opened-list').append('li class=activea href=javascriptvoid(0); modal-id=' + options.ModalId + '' + options.ModalName + 'aa href=javascriptvoid(0); class=_closexali');
                       $('.sideBars-opened-list').attr('sideBars-opened-ids', _sideBarsOpenedArray);
                   }
                   else
                       $('.sideBars-opened-list li a[modal-id=' + options.ModalId +']').parent().addClass('active');
                   
                   $('.sideBars-opened-list li a').unbind('click');
                   $('.sideBars-opened-list li a').click(function(){
                       sideBarsOpenedListClick($(this));
                   });
               }
               $('[data-toggle=tooltip]').tooltip();
           };
           options1.always = function(alwaysOptions){
               if (options.alwaysFunction1)
                   options.alwaysFunction1(options);
               
               if(options.tabs){
                   if($('.tabs .nav li')){
                       $('.tabs .nav li').unbind('click');
                       $('#' + options.ModalId + ' .tabs .nav li').click(function() {
                           if($(this).hasClass('disabled'))
                               return false;
                           var tabsId = $(this).closest('.tabs').attr('id');
                           $('#' + options.ModalId + ' .tabs[id=' + tabsId + '] ul li.active').removeClass('active');
                           $('#' + options.ModalId + ' .tabs[id=' + tabsId + '] .tab-content .tab-pane.active').removeClass('active');
                           $(this).addClass('active');
                           $('#' + options.ModalId + ' .tabs[id=' + tabsId + '] .tab-content .tab-pane[id=tabs-' + $(this).attr('type') + ']').addClass('active');
                       });
                   }
               }
           };
           _ertaqyAjax(options1);
       }
        if(options.Url){
           $('#ajax-loader').fadeIn();
           $.post(options.Url, null, function(data) {
           })
           .success(function(data){
               
                if(options.clearBeforeAppend == true)
                    $('#' + options.ModalId + ' .modal-sidebar-content').html('');
               
               $('#' + options.ModalId + ' .modal-sidebar-content').append(data); 
               
               var $form = $('#' + options.ModalId).find('form');
               if($form && $form.find('.input-html-group').length  0){
                   $form.find('.input-html-group input, .input-html-group textarea').each(function(){
                       if($(this).val() != '')
                           $(this).val(_htmlDecode($(this).val()));
                   })
               }
               
               if (options.SuccessTriggerEvent)
                   options.SuccessTriggerEvent();
               
               if(options.sideBarsList){
                   $('#draggable-container .sideBars-opened').show();
                   $('.sideBars-opened-list').css('left', $('#' + options.ModalId).width()).show();
                   $('.modal-sidebar.shadow').removeClass('shadow');
                   setTimeout( function(){ 
                       $('#' + options.ModalId).addClass('shadow');
                   }, 350 );
                   $('.sideBars-opened-list li.active').removeClass('active');
                   if(_sideBarsOpenedArray.indexOf(options.ModalId) == -1){
                       _sideBarsOpenedArray.push(options.ModalId);
                       $('.sideBars-opened-list').append('li class=activea href=javascriptvoid(0); modal-id=' + options.ModalId + '' + options.ModalName + 'aa href=javascriptvoid(0); class=_closexali');
                       $('.sideBars-opened-list').attr('sideBars-opened-ids', _sideBarsOpenedArray);
                   }
                   else
                       $('.sideBars-opened-list li a[modal-id=' + options.ModalId +']').parent().addClass('active');
                   
                   $('.sideBars-opened-list li a').unbind('click');
                   $('.sideBars-opened-list li a').click(function(){
                       sideBarsOpenedListClick($(this));
                   });
               }
           })
           .fail(function(xhr, status, error) {
               console.log(xhr);console.log(status);console.log(error);
           })
           .always(function() {
               $('#ajax-loader').fadeOut();
               if (options.alwaysFunction1)
                   options.alwaysFunction1(options);
               
               if(options.tabs){
                   if($('.tabs .nav li')){
                       $('.tabs .nav li').unbind('click');
                       $('.tabs .nav li').click(function() {
                           var tabsId = $(this).closest('.tabs').attr('id');
                           console.log('tabsId' + tabsId);
                           $('.tabs[id='+tabsId+'] ul li.active').removeClass('active');
                           $('.tabs[id='+tabsId+'] .tab-content .tab-pane.active').removeClass('active');
                           $(this).addClass('active');
                           $('.tabs[id='+tabsId+'] .tab-content .tab-pane[id=tabs-' + $(this).attr('type') + ']').addClass('active');
                       });
                   }
               }
           });
       } 
       else{
           if (options.alwaysFunction11)		
               options.alwaysFunction11(options)
       }	
   }
   
   $('#' + options.ModalId + ' .modal-sidebar-close').unbind('click');
   $('#' + options.ModalId + ' .modal-sidebar-close').click(function(){
       modalSidebarClose($(this));
   });
   
    // get z-index value of prev modals before append new modal
   var modalZindex, modalZindexArray = [];
   $('.modal-sidebar').each(function(){
       modalZindexArray.push($(this).css('z-index'))
   });
   modalZindex = Math.max.apply(Math, modalZindexArray);
   
    $('#' + options.ModalId).show('slide', { direction dir }, 500);
   $('#' + options.ModalId).show();
   $('#' + options.ModalId).css('z-index', modalZindex + 1);
   
   if(options.SetOverlay == true)
       $('.body-overlay').addClass('appear sidebar');
};
// ____________________________________sideBarsOpenedListClick_________________________________________________________

function sideBarsOpenedListClick(ct){
	if(ct.hasClass('_close')){
		var modalId = ct.parent().find('a:first').attr('modal-id');
		_sideBarsOpenedArray.splice(_sideBarsOpenedArray.indexOf(modalId), 1);
		$('#' + modalId).hide().remove();
		$('.sideBars-opened-list').attr('sideBars-opened-ids', _sideBarsOpenedArray);
		if(ct.parent().hasClass('active')){
			var newSideBar = ct.parent().is(':last-child') ? ct.parent().prev().find('a:first') : ct.parent().next().find('a:first');
			sideBarsOpenedListClick(newSideBar);
		}
		$('.sideBars-opened-list li a[modal-id="' + modalId +'"]').parent().remove();
		if($('.sideBars-opened-list li').length == 1)
			$('#draggable-container .sideBars-opened, .sideBars-opened-list').hide();
		
		if( modalId.indexOf('ticket-') != -1 ){
			// leave group
			var ticketId = modalId.split('ticket-')[1];
			/* var json = { toFunc: "_ertaqyTicketAccess", toType: 'group-others', toId: ticketId, toDb: 'interaction-access', accessType: 'end', interactionId: ticketId, interactionType: 1};
			_signalrSrvSendJson(json); */
			var json = { toFunc: "_ertaqyTicketAccess", toType: 'group', toId: 'tickets-list', toType2: 'group', toId2: ticketId, toDb: 'interaction-access', accessType: 'end', interactionId: ticketId, interactionType: 1 };
			_signalrSrvSendJson(json);
			_signalrSrvRemoveGroup(ticketId, 11);
		}else if( modalId.indexOf('contact-') != -1 ){
			// leave group
			var contactId = modalId.split('contact-')[1];
			/* var json = { toFunc: "_ertaqyContactAccess", toType: 'group-others', toId: contactId, toDb: 'contact-access', accessType: 'end', contactId: contactId};
			_signalrSrvSendJson(json); */
			var json = { toFunc: "_ertaqyContactAccess", toType: 'group', toId: 'contacts-list', toType2: 'group', toId2: contactId, toDb: 'contact-access', accessType: 'end', contactId: contactId };
			_signalrSrvSendJson(json);
			_signalrSrvRemoveGroup(contactId, 11);
		}
	}
	else if(ct.hasClass('closeAll')){
		var sideBarsOpened = $('.sideBars-opened-list').attr('sideBars-opened-ids').split(',');
		for(var i = 0; i < sideBarsOpened.length; i++){
			$('#' + sideBarsOpened[i]).remove();
			$('.sideBars-opened-list li a[modal-id="' + sideBarsOpened[i] + '"]').parent().remove();
			if( sideBarsOpened[i].indexOf('ticket-') != -1 ){
				// leave group
				var ticketId = sideBarsOpened[i].split('ticket-')[1];
				/* var json = { toFunc: "_ertaqyTicketAccess", toType: 'group-others', toId: ticketId, toDb: 'interaction-access', accessType: 'end', interactionId: ticketId, interactionType: 1};
				_signalrSrvSendJson(json); */
				var json = { toFunc: "_ertaqyTicketAccess", toType: 'group', toId: 'tickets-list', toType2: 'group', toId2: ticketId, toDb: 'interaction-access', accessType: 'end', interactionId: ticketId, interactionType: 1 };
				_signalrSrvRemoveGroup(ticketId, 11);
				_signalrSrvSendJson(json);
			}else if( sideBarsOpened[i].indexOf('contact-') != -1 ){
				// leave group
				var contactId = sideBarsOpened[i].split('contact-')[1];
				/* var json = { toFunc: "_ertaqyContactAccess", toType: 'group-others', toId: contactId, toDb: 'contact-access', accessType: 'end', contactId: contactId};
				_signalrSrvSendJson(json); */
				var json = { toFunc: "_ertaqyContactAccess", toType: 'group', toId: 'contacts-list', toType2: 'group', toId2: contactId, toDb: 'contact-access', accessType: 'end', contactId: contactId };
				_signalrSrvSendJson(json);
				_signalrSrvRemoveGroup(contactId, 11);
			}
		}
		_sideBarsOpenedArray = [];
		$('.sideBars-opened-list').attr('sideBars-opened-ids', _sideBarsOpenedArray);
		$('#draggable-container .sideBars-opened, .sideBars-opened-list').hide();
	}
	else{
		if(!ct.parent().hasClass('active')){
			var modalId = ct.parent().find('a:first').attr('modal-id');
			var modalZindex, modalZindexArray = [];
			$('.modal-sidebar').each(function(){
				modalZindexArray.push($(this).css('z-index'))
			});
			modalZindex = Math.max.apply(Math, modalZindexArray);
			
			if($('#' + modalId).css('display', 'none'))
				$('#' + modalId).show();
			$('.modal-sidebar').removeClass('shadow');
			$('#' + modalId).css('z-index', modalZindex + 1).addClass('shadow');
			var prevModalId = $('.sideBars-opened-list li.active a:first').attr('modal-id');
			$('#' + prevModalId).hide();
			$('.sideBars-opened-list li.active').removeClass('active');
			$('.sideBars-opened-list li a[modal-id="' + modalId +'"]').parent().addClass('active');
			
			var dir = $('body').attr('dir') == 'rtl' ? 'left' : 'right';
			$('.sideBars-opened-list').css(dir, $('#' + modalId).width());
		}
	}
}