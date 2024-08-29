import { UrlRequestContainer, UrlRequestContainerTypes } from "./UrlRequestContainer.js";
export class UrlRequestOptions {
    constructor() {
        this.LoadFromElement = (selector) => {
            this.selecElement = $(selector);
            this.ParentSelector = $(selector).parent();
            this.url = $(selector).attr('action');
            this.Container = new UrlRequestContainer();
            this.placeHolder = $(selector).attr('action-mode');
            this.title = $(selector).find('span.title').text();
            switch (this.placeHolder) {
                case "draw-main-content":
                    {
                        this.Container.ParentSelector = $('.content-wrap .postcontent > div');
                        this.Container.Type = UrlRequestContainerTypes.PostContent;
                        break;
                    }
                case "sidebar1":
                    {
                        this.ModalId = 'header-mode-sidebar'; // 'sideBarLeftL1';
                        this.Container.ParentSelector = $('#' + this.ModalId + ' .modal-sidebar-content');
                        this.Container.Type = UrlRequestContainerTypes.SideBar;
                        this.size = 'lg';
                        this.ModalCssClass = 'sideBarLeftL1';
                        break;
                    }
                case "draw-in-sidebar":
                    {
                        this.Container.ParentSelector = $('#content');
                        this.Container.Type = UrlRequestContainerTypes.ContentSideBar;
                        break;
                    }
                // case "draw-content-with-sidebar":
                // 	{
                // 		this.Container.ParentSelector = $('#content'); 
                // 		this.Container.Type = UrlRequestContainerTypes.ContentSideBar;
                // 		break;
                // 	}
                // case "draw-in-operator":
                // 	{
                // 		this.Container.ParentSelector = $('#content'); 
                // 		this.Container.Type = UrlRequestContainerTypes.ContentSideBar;
                // 		break;
                // 	}
                // case "draw-in-header":
                // 	{
                // 		this.Container.ParentSelector = $('#content'); 
                // 		this.Container.Type = UrlRequestContainerTypes.ContentSideBar;
                // 		break;
                // 	}
                // case "draw-in-custom-selector":
                // 	{
                // 		this.Container.ParentSelector = $('#content'); 
                // 		this.Container.Type = UrlRequestContainerTypes.ContentSideBar;
                // 		break;
                // 	}
                // case "popup":
                // 	{
                // 		this.Container.ParentSelector = $('#content'); 
                // 		this.Container.Type = UrlRequestContainerTypes.ContentSideBar;
                // 		break;
                // 	}
                default:
                    {
                        console.log('undefined placeholder ' + this.placeHolder);
                        break;
                    }
            }
            // this.Selector = selector;
        };
        this.selecElement;
        this.title = '';
        this.size;
        this.ModalCssClass;
        this.ModalId;
        this.url;
        this.RemoveContent;
        this.sideBarsList;
        this.SetOverlay;
        this.tabs;
        this.alwaysFunctionExcute;
        this.alwaysFunction1;
        this.SuccessTriggerEvent;
        this.placeHolder;
        // to get options again after open the modal
        this.modalKey;
        //POST, GET
        this.Method = UrlRequestMethods.Get;
        //If simulate submit form
        this.formBtn;
        //If simulate submit form
        this.formBtnName;
        //If simulate submit form
        this.formBtnValue;
        //ex. JSON.stringify( { "key":"value1" } ) only if json
        this.data = null;
        //default false
        this.cache = false;
        //default true
        this.async = true;
        //default false
        this.crossDomain = false;
        //default false
        this.crossDomainErtaqy;
        //default false	
        this.withCredentials = false;
        //default html
        this.dataType = "html"; //"json";
        //application/x-www-form-urlencoded; charset=UTF-8
        this.contentType = "application/x-www-form-urlencoded; charset=UTF-8"; //"application/json"
        //function(xhr)
        this.beforeSend;
        //will abort previous request if found, default 'global-request'
        this.requestKey = 'global-request';
        //event call this function
        this.event;
        //default true	
        this.formValidate = true;
        //use await in results function
        this.resultFuncAwait;
        //function(options) 	result
        this.done;
        //function(options)		
        this.success;
        //function(options)
        this.notValid;
        //function(options)	xhr, status, error) {
        this.error;
        //function(options)	xhr, status, error ) {
        this.fail;
        //function(options)
        this.always;
        this.log = false;
        this.paramData;
        this.downloadFile;
        this.paramXhr;
        this.paramStatus;
        this.paramError;
        this.ModalName;
        this.contactId;
        this.contactName;
        this.taskId;
        this.templateId;
        this.typeparentId;
        this.placeHolder;
        this.modalSidebar = function (ModalId) {
            return `<div class="modal-sidebar" id="${ModalId}">
					<a href="javascript:void(0);" class="modal-sidebar-close"><i class="fa fa-arrow-left"></i></a>
					<div class="modal-sidebar-title"><span></span></div>
					<div class="modal-sidebar-content content"></div>
					</div>`;
        };
    }
}
export var UrlRequestMethods;
(function (UrlRequestMethods) {
    UrlRequestMethods[UrlRequestMethods["Get"] = 0] = "Get";
    UrlRequestMethods[UrlRequestMethods["Post"] = 1] = "Post";
})(UrlRequestMethods || (UrlRequestMethods = {}));
