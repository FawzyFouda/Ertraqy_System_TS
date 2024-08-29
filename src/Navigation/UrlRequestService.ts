import { UrlRequestContainer, UrlRequestContainerTypes } from "./UrlRequestContainer.js";
import { UrlRequestMethods, UrlRequestOptions } from "./UrlRequestOptions.js";

var urlRequestOptions = new UrlRequestOptions()
//import { UtilityHelper } from "./z_UtilityHelper.js";
//import $ from 'jquery'
//import 'jquery'
//import 'jquery-validation'
//import jqueryValidate from "jquery-validation";
//const jqueryValidation = require('jquery-validation');
//import * as $ from 'jquery';
//import * as slick from 'jquery-validation';
export class UrlRequestService {
    static btn: any;
    constructor() {
    }
    private static _ertaqyModalsOpened: any = {};
    private static _ertaqyAjaxRequests: any = {}
    private static _ertaqyAjaxCounts: any = 0
    private static _ertaqyAjaxAlertSlowMsg: any = null
    private static openModalSidebarModals: any = {};
    private static _sideBarsOpenedArray: any = [];
    private static _signalrHub1: any
    private static _signalrLogging: any = false
    private static _signalrConnGroups: any = []
    private static addEditItem_InProgress: boolean = false;
    private static dataSplitCheck: any = false;
    private static _tableFixedHeaderSets: any = {};




    // ___________________________________________________________
    private static do_nothing() {

        //alert('click-twice');
        return false;
    }
    // ___________________________________________________________
    private static _urlWithHash() {

        var paths = window.location.pathname.split('/');
        if (paths[0] == '') paths.splice(0, 1);

        //var url = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.hash.slice(1);
        var hash = window.location.hash.slice(1);
        if (hash.match(/^\//))
            hash = hash.slice(1);
        var url;
        if (window.location.href.indexOf('http://app.feasibiliti.com/') > -1)
            url = window.location.protocol + "//" + window.location.host + "/" + paths[0] + "/" + hash;
        else
            url = window.location.protocol + "//" + window.location.host + "/" + paths[0] + "/" + paths[1] + "/" + paths[2] + "/" + paths[3] + "/" + hash;
        if (url.match(/\/$/)) // end with ? will remove it
            url = url.slice(0, -1);
        return url.split('?')[0];
    }
    // ___________________________________________________________
    private static addEditItem_Enable() {
        // setTimeout( function() {
        this.addEditItem_InProgress = false;
        $('.code-input').removeAttr('readonly');
        $('.itemList .tt-input').removeAttr('readonly');
        // }  , 300 );
    };
    // ___________________________________________________________
    private static _urlPathWithHash() {

        var paths = window.location.pathname.split('/');
        if (paths[0] == '') paths.splice(0, 1);

        // window.location.protocol + "//" + window.location.host + 
        // var url = window.location.pathname + window.location.hash.slice(1);
        var hash = window.location.hash.slice(1);
        if (hash.match(/^\//))	// start with / will remove it
            hash = hash.slice(1);
        var url = paths[0] + "/" + paths[1] + "/" + paths[2] + "/" + paths[3] + "/" + hash;
        if (url.match(/\/$/)) // end with ? will remove it
            url = url.slice(0, -1);
        return url.split('?')[0];
    }
    // ___________________________________________________________
    public static _uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    // ___________________________________________________________
    private static contentDrawPostForm(contentDrawPostFormOptions: any) {
        var modalsOpened: any = {};
        if (contentDrawPostFormOptions.modalKey)
            modalsOpened[contentDrawPostFormOptions.modalKey] = contentDrawPostFormOptions;

        var btn = null;
        document.addEventListener('click', (event: Event) => {
            if (contentDrawPostFormOptions.btn == null && event != undefined && event != null) {
                btn = $(event.currentTarget!);
            }
        }); //edit

        if (btn == null && contentDrawPostFormOptions.btn != null)
            btn = $(contentDrawPostFormOptions.btn);

        if (btn == null)
            alert("Form Post Button is null");

        var options: any = {};
        options.modalKey = contentDrawPostFormOptions.modalKey;
        options.url = contentDrawPostFormOptions.resultsUrl;
        options.formBtn = contentDrawPostFormOptions.btn;
        options.type = "POST";
        if (contentDrawPostFormOptions.requestKey)
            options.requestKey = contentDrawPostFormOptions.requestKey;

        if (contentDrawPostFormOptions.btn && $.type(contentDrawPostFormOptions.btn) === "string") // fix btn send as selector instead of object
            contentDrawPostFormOptions.btn = $(contentDrawPostFormOptions.btn);

        if (contentDrawPostFormOptions.btn && contentDrawPostFormOptions.btn.hasClass('pagingSearch'))
            options.formValidate = false;

        options.done = function (options: any) {
            if (contentDrawPostFormOptions.SuccessFunction)
                contentDrawPostFormOptions.SuccessFunction(contentDrawPostFormOptions, options.paramData);

            if (contentDrawPostFormOptions.resultsContainerSelector)
                $(contentDrawPostFormOptions.resultsContainerSelector).replaceWith(options.paramData); // replace specific row

            if (contentDrawPostFormOptions.resultsContainerSelectorAdd) {
                $(contentDrawPostFormOptions.resultsContainerSelectorAdd).append(options.paramData); // add specific row
            }

            if (contentDrawPostFormOptions.resultsContainerSelectorClearAndAppend) {
                $(contentDrawPostFormOptions.resultsContainerSelectorClearAndAppend).html('');
                $(contentDrawPostFormOptions.resultsContainerSelectorClearAndAppend).append(options.paramData); // add specific row
            }

            // remove html (post result) to body
            if (contentDrawPostFormOptions.deleteResultSelector)
                $(contentDrawPostFormOptions.deleteResultSelector).replaceWith('');

            // Add click event to new dynamically added triggers
            if (contentDrawPostFormOptions.SuccessTriggerEvent)
                contentDrawPostFormOptions.SuccessTriggerEvent();
        };
        options.always = function () {
            if (contentDrawPostFormOptions.alwaysFunction)
                contentDrawPostFormOptions.alwaysFunction();

            if (contentDrawPostFormOptions.alwaysFunction1)
                contentDrawPostFormOptions.alwaysFunction1(contentDrawPostFormOptions);
        };
        this.Request(options);
    };
    // ___________________________________________________________
    private static getOrderStatusOnLoad() {
        var invoiced = $('.orderDetails-container').attr('invoiced');
        if (invoiced == "True") invoiced = '1'; else invoiced = '0';
        var delivered = $('.orderDetails-container').attr('delivered');
        if (delivered == "True") delivered = '1'; else delivered = '0';
        var paid = $('.orderDetails-container').attr('paid');
        if (paid == "True") paid = '1'; else paid = '0';
        var returned = $('.orderDetails-container').attr('returned');
        if (returned == "True") returned = '1'; else returned = '0';

        var itemsCount = parseFloat($('.orderDetails-container').attr('items-count')!);
        if (!itemsCount/*  || isNaN(itemsQuantity) */)
            itemsCount = 0;

        var itemsQuantity = parseFloat($('.orderDetails-container').attr('items-quantity')!);
        if (!itemsQuantity || isNaN(itemsQuantity))
            itemsQuantity = 0;

        var itemsQuantityMin = parseFloat($('.orderDetails-container').attr('items-quantity-min')!);
        if (!itemsQuantityMin || isNaN(itemsQuantityMin))
            itemsQuantityMin = 0;

        // var pending = $('.orderDetails-container').attr('status') == '00000000-0000-0000-2245-000000000101' ? true : false;

        $('.orderDetails-container').attr({ 'invoiced': invoiced, 'delivered': delivered, 'paid': paid, 'returned': returned, 'items-count': itemsCount, 'items-quantity': itemsQuantity, 'items-quantity-min': itemsQuantityMin });

        // dis0Items disOrdDel disOrdInv disQtyMin disOrdPaid disOrdRet
        if (itemsCount == 0)
            $('.dis0Items').prop('disabled', true);
        else {

            $('.dis0Items').prop('disabled', false);

            if (itemsQuantity < itemsQuantityMin)
                $('.disQtyMin').prop('disabled', true);
            else {
                $('.disQtyMin').prop('disabled', false);

                if (delivered == '1')
                    $('.disOrdDel').prop('disabled', true);
                else
                    $('.disOrdDel').prop('disabled', false);

                if (invoiced == '1')
                    $('.disOrdInv').prop('disabled', true);
                else
                    $('.disOrdInv').prop('disabled', false);

                if (paid == '1')
                    $('.disOrdPaid').prop('disabled', true);
                else
                    $('.disOrdPaid').prop('disabled', false);

                if (returned == '1')
                    $('.disOrdRet').prop('disabled', true);
                else
                    $('.disOrdRet').prop('disabled', false);
            }
        }
    };
    // ___________________________________________________________
    private static _tableFixedHeaderSet(options: any) {
        // console.log(options)
        if (options == undefined)
            options = {};
        if (options.divParentSelector == undefined) options.divParentSelector = 'div.table-fixed-header';
        if (options.tableSelector == undefined) options.tableSelector = options.divParentSelector + ' > table:visible'; // table.fixed-header:visible
        if (options.clearWidth == undefined) options.clearWidth = true;
        if (options.mainHeight == undefined || options.mainHeight <= 0) options.mainHeight = $(window).height();
        var tableVertical = $(options.divParentSelector).hasClass('table-vertical');


        var colWidths: any = {};
        if (options.tableName != undefined && options.tableName != '')
            colWidths = this._tableFixedHeaderSets[options.tableName]
        if (colWidths == undefined) colWidths = {};

        $(options.tableSelector).each(function () {

            var thead = $(this).find(' > thead');
            var tbody = $(this).find(' > tbody');
            // Clear
            /* COMMENTED BY MHMD
            thead.removeClass('fixed-element');
            thead.css('width', 'inherit');
            tbody.css('width', 'inherit');
            tbody.css('display', 'table-row-group');
            thead.find('tr th:not(.hidden)').css('width', 'inherit');
            tbody.find('tr td:not(.hidden)').css('width', 'inherit');
            // if(options.clearWidth) {
                // if(options.tableName != undefined && options.tableName != '')
                    // _tableFixedHeaderSets[options.tableName] = {};
            // }
            */

            // Calc After Clear
            var twidth = thead.outerWidth();

            var maxWidth: any;
            var maxHeight: any;
            var widthInRow = 0;
            var heightInRow = 0;
            var cell;
            var columns = thead.find('tr th.col-sticky').length;
            var stickyFound = false;
            var stickyStopTh = false;
            var stickyStopTd = false;
            // console.log('Columns:' + columns);
            if (columns > 0) {
                for (let i = 1; i <= columns; i++) {
                    stickyFound = false;
                    maxWidth = 0;
                    maxHeight = 0;

                    tbody.find('tr td:not(.hidden):nth-child(' + i + ')').each(function () {
                        maxWidth = Math.max($(this).outerWidth()!, maxWidth);
                        if (tableVertical) maxHeight = Math.max($(this).outerHeight()!, maxHeight);
                    });
                    if (maxWidth != 0) colWidths[i] = maxWidth;

                    cell = tbody.find('tr td:not(.hidden):nth-child(' + i + ')');
                    if (tableVertical) cell.css('height', maxHeight); else cell.css('width', maxWidth);
                    if (cell.hasClass('col-sticky')) { if (tableVertical) cell.css('top', heightInRow); else cell.css('right', widthInRow); stickyFound = true; }
                    cell = thead.find('tr th:not(.hidden):nth-child(' + i + ')')
                    if (tableVertical) cell.css('height', maxHeight); else cell.css('width', maxWidth);
                    if (cell.hasClass('col-sticky')) { if (tableVertical) cell.css('top', heightInRow); else cell.css('right', widthInRow); stickyFound = true; }

                    if (stickyFound) {
                        widthInRow += maxWidth;
                        if (tableVertical) heightInRow += maxHeight;
                    }

                }
            }


            if (tableVertical) {
                var bodyWidth: any = 0;
                thead.find('tr').each(function () {
                    $(this).css('right', bodyWidth);
                    bodyWidth += $(this).outerWidth()!;
                });
                if (thead.outerWidth()! < bodyWidth)
                    thead.css('width', bodyWidth);
                else
                    bodyWidth = thead.outerWidth();

                tbody.find('tr').each(function () {
                    bodyWidth += $(this).outerWidth();
                });
                if (tbody.outerWidth()! < bodyWidth)
                    tbody.css('width', bodyWidth);
            }

            /* COMMENTED BY MHMD
            if(widthInRow > 0)
                $(this).closest('div.table-responsive').css('margin-right', widthInRow);
            
            if(options.tableName != undefined && options.tableName != '')
                _tableFixedHeaderSets[options.tableName] = colWidths;
            
            thead.addClass('fixed-element');
            thead.css('width', twidth+'px');
            tbody.css('width', twidth+'px');
            tbody.css('display', 'inline-block');
            */


            // Margin Top
            var otherFixedElementsTop = 0;
            if ($(this).attr('fixed-elements') != undefined) {
                var fixedElements = $(this).attr('fixed-elements')!.split(',');
                $.each(fixedElements, function (index, elmSelector) {
                    // Clear
                    let elm: any = $(elmSelector);
                    if (elm.length > 0) {
                        /* COMMENTED BY MHMD
                        elm.removeClass('fixed-element');
                        elm.css('width', 'inherit'); // when calculate get inherit
                        elm.css('width', elm.outerWidth()+'px'); // before set fixed again
                        elm.css('margin-top', otherFixedElementsTop+'px');
                        elm.addClass('fixed-element');
                        */
                        otherFixedElementsTop = otherFixedElementsTop + elm.outerHeight();
                        // console.log(elmSelector + ' Height: ' + elm.outerHeight());
                    }
                });

                /* COMMENTED BY MHMD
                // thead.css('margin-top', otherFixedElementsTop+'px');	// thead position is fixed
                thead.css('top', otherFixedElementsTop); // form height & thead position is sticky
                tbody.css('margin-top', otherFixedElementsTop); // form height & thead position is sticky
                // otherFixedElementsTop = otherFixedElementsTop + thead.outerHeight();
                // tbody.css('margin-top', otherFixedElementsTop + 'px'); 	// thead position is fixed
                */

            }
            // console.log(options.mainHeight);
            // console.log(otherFixedElementsTop);

            // var windowHeight = window.outerHeight
            var topbarAndpageTitle = 0; //87;
            var offsetTopScreen = $(this).offset()!.top;
            // console.log(offsetTopScreen);
            // console.log(options.mainHeight +', '+ offsetTopScreen +', '+ otherFixedElementsTop)
            var tbodyHeight = options.mainHeight - offsetTopScreen - otherFixedElementsTop - 8; // - 83;
            var tbodyWidth = $('.postcontent').width();
            $(this).closest(options.divParentSelector).css('height', tbodyHeight + 'px');
            if ($(this).closest('td').hasClass('print-content-cell'))	// report
                $(this).closest(options.divParentSelector).css('width', tbodyWidth + 'px');
        });
    }
    // ___________________________________________________________
    private static staticorderCalculateWidths(addNew: any) {
        if (!$('#order-data .products tbody tr').hasClass('noDataRow')) {
            /* var rowCount = $('#order-data .products tbody tr').length;
            var height = '455';
            if(rowCount == 1){
                if(addNew)	height = '358';
                else 	height = '335';
            }
            else if(rowCount == 2)
                height = '365';
            else if(rowCount == 3)
                height = '395';
            else if(rowCount == 4)
                height = '425'; */
            var rowsHeight = 0;
            if ($('#order-data .products tbody tr').length <= 5) {
                $('#order-data .products tbody tr').each(() => {
                    rowsHeight += $(this).height()!;
                });
            }
            else
                rowsHeight = 195; // 39 * 5
            var tableTopOffset = 305;
            if ($('#order-data').hasClass('down'))
                tableTopOffset += 2;
            /* if(addNew){
                if($('#order-data .products tbody tr').length >= 1)
                    tableTopOffset = 305;
            } */
            if ($('.bill-head .popUpContainer form').is(':visible'))
                tableTopOffset += $('.bill-head .popUpContainer form:visible').outerHeight()!;
            // var tableHeight = $('#order-data .table-fixed-header').height() == 0 ? '335' : $('#order-data .table-fixed-header').height();
            this._tableFixedHeaderSet({ 'mainHeight': rowsHeight + tableTopOffset });
        }

        var url = location.hash;
        var urlHash = '';
        if (url != '') {
            urlHash = url.split('/')[1];
            if (urlHash == 'callcenter')
                $('.sellContainer.blk2 .sellCont p:first-child .edit-cust').attr('temp-id', '8d0124c0-84cd-4ad2-ba61-8334b5a62a63');
        }
    }
    // ___________________________________________________________
    private static addEditItem_Success(options: any, data: any) {
        $('.print').removeAttr('disabled');
        $('.print-receipt').prop('disabled', false);
        $('.table-columns-icon').removeClass('disabled');

        var dataHeader, dataRow: any, dataFooter, dataSave = null;

        // return error delete case
        if (data.indexOf('<div class="style-msg errormsg delete-error">') > -1) {
            // $('.alertFailureMsgContainer').fadeIn();
            $('.alertMsgsContainer').append(data);
            $('.itemdeleteCancel').click();
            $('#delete-loader').replaceWith('');
        }
        // return error add-edit case
        else if (data.indexOf('<div class="style-msg errormsg">') > -1) {
            if ($('#order-data table tbody tr').length == 1 && $('.noDataRow')) 			//if noDataRow exist
                $('#order-data table tbody tr').replaceWith('<tr class="noDataRow"><td colspan="14" style="text-align:center;padding-top:30px;padding-bottom:30px;">لم يتم إضافة أصناف بعد</td></tr>');
            else {
                // $('.newTR').replaceWith('');
                $(options.SuccessRowContainerSelector).replaceWith('');
            }

            // $('.alertFailureMsgContainer').fadeIn();
            $('.alertMsgsContainer').append(data);

            setTimeout(() => {
                this.addEditItem_Enable();
                // $('.code-input').removeAttr('readonly');
                // $('.itemList .tt-input').removeAttr('readonly');
            }, 300);

        }
        //return data
        else if ($(data).find('#split')) {					// split data only if item code is right
            this.dataSplitCheck = true;
            var divs = data.split('<div id="split"></div>');
            dataRow = divs[0];
            dataHeader = divs[1];
            dataFooter = divs[2];
            dataSave = divs[3];
            var dataDeliveryCheck = divs[4];
            // console.log('dataRow: ' + dataRow);
            // console.log('dataHeader: ' + dataHeader);
            // console.log('dataFooter: ' + dataFooter);
            // console.log('dataSave: ' + dataSave);
        }

        setTimeout(function () {
            $('.alertMsgsContainer').html('');
        }, 2000);

        if (options.actionType == 'delete' && options.SuccessRowContainerSelector) {
            $(options.SuccessRowContainerSelector).replaceWith('');
            if ($('#order-data table tbody tr').length == 0) { 			//if noDataRow exist
                $('#order-data table tbody').append('<tr class="noDataRow"><td colspan="14" style="text-align:center;padding-top:30px;padding-bottom:30px;">لم يتم إضافة أصناف بعد</td></tr>');
                $('#order-data .table-responsive').attr('style', '');
            }
        }

        if (dataRow) {
            var rowIdNew: any; var rowIsNew = true;
            if ($('#order-data table tbody tr').length == 1 && $(dataRow).html() == undefined) {			// delete case: if last row append noDataRow
                if (options.SuccessRowContainerSelector)
                    $(options.SuccessRowContainerSelector).replaceWith('<tr class="noDataRow"><td colspan="14" style="text-align:center;padding-top:30px;padding-bottom:30px;">لم يتم إضافة أصناف بعد</td></tr>');
            }
            else {
                rowIdNew = $(dataRow).closest('tr').attr('row-id');
                //var rowIsNew = true;

                if (options.ProductId == '')
                    options.ProductId = $(dataRow).closest('tr').find('.product-id').text();

                // check if item exists in the order by row-id
                $('.products tbody tr').each(function () {
                    var rowId = $(this).attr('row-id');

                    if (rowId == rowIdNew) {
                        $(this).replaceWith(dataRow);
                        if (options.SuccessRowContainerSelector) {		// loader
                            $(options.SuccessRowContainerSelector).replaceWith('');
                        }
                        rowIsNew = false;
                    }
                });



                /* if($('.quantities').hasClass('opened'))
                    $('.quantities').removeClass('opened');
                $('.quantities').hide(); */

                // var tr = $(dataRow).closest('tr');
                // var itemName = tr.find('td.product-name').html();
                // var itemQty = tr.find('td.product-qty a').html();
                // var itemId = tr.find('td.product-name .product-id').text();
                // var rowId = tr.attr('row-id');
                $('.quantities span.product-name').html('');
                $('.quantities span.product-id').html('');
                $('.quantities span.row-id').html('');
                $('.quantities .qty-input').val('');
                $('.quantities .qty-input').removeAttr('disabled');
                $('.quantities .price-input').val('');
                // $('.quantities .price-input').hide(''); commented
                // $('.sidemenu-tabs .defaultQuantities a').text('');

            }

            // Add html (post result) to body
            if (options.SuccessRowContainerSelector)
                $(options.SuccessRowContainerSelector).replaceWith(dataRow); 		// replace specific row

        }

        //if(dataSplitCheck == true)
        if ($('#order-data table tbody tr').length == 1 && $('.noDataRow') && dataHeader && options.SuccessHeaderContainerSelector) {
            $(options.SuccessHeaderContainerSelector).replaceWith(dataHeader); 		// replace specific row
            $('.receiptHeader .barcode').html('*' + $(dataHeader).find('.order-num span:nth-child(2)').text().replace('#', '') + '*');
        }

        var invoiced = $(dataHeader).attr('invoiced');
        if (invoiced == 'False' || invoiced == '') invoiced = '0'; else invoiced = '1';
        var delivered = $(dataHeader).attr('delivered');
        if (delivered == 'False' || delivered == '') delivered = '0'; else delivered = '1';
        var paid = $(dataHeader).attr('paid');
        if (paid == 'False' || paid == '') paid = '0'; else paid = '1';
        var returned = $(dataHeader).attr('paid');
        if (returned == 'False' || returned == '') returned = '0'; else returned = '1';
        var itemsCount = $(dataHeader).attr('items-count');
        if (itemsCount == '') itemsCount = '0';
        var itemsQuantity = $(dataHeader).attr('items-quantity');
        if (itemsQuantity == '') itemsQuantity = '0';
        var itemsQuantityMin = $(dataHeader).attr('items-quantity-min');
        if (itemsQuantityMin == '') itemsQuantityMin = '0';
        $('.orderDetails-container').attr({ 'invoiced': invoiced, 'delivered': delivered, 'paid': paid, 'returned': returned, 'items-count': itemsCount, 'items-quantity': itemsQuantity, 'items-quantity-min': itemsQuantityMin });


        //if(dataSplitCheck == true)
        if (dataFooter && options.SuccessFooterContainerSelector) {
            $(options.SuccessFooterContainerSelector).replaceWith(dataFooter); 		// replace specific row
        }
        if (dataSave && $('.saveCancel-order').length == 0) {
            $(".footer-bottom-actions").addClass('d-flex');
            $(dataSave).prependTo(".footer-bottom-actions");	// add save and cancel buttons
            $(".footer-bottom-actions .clear").remove();
        }

        if (dataDeliveryCheck && $('.bill-footer form .bill-footer-options .delivery-check').length == 1) {
            if ($(dataDeliveryCheck).text() == 'True') {
                $('.bill-footer form .bill-footer-options .delivery-check input').prop('checked', true);
                $('.bill-footer form .bill-footer-options .delivery-check input').attr('checked', 'checked');
            }
            if ($(dataDeliveryCheck).text() == 'False') {
                $('.bill-footer form .bill-footer-options .delivery-check input').prop('checked', false);
                $('.bill-footer form .bill-footer-options .delivery-check input').removeAttr('checked');
            }
        }

        // console.log("Loading: " + $('#order-data table tbody tr.newTR').length);

        if (!$('#order-data table tbody tr.newTR').length) { // if multiple items still in progress to be added
            // check if total returned not equal total calculated from table || order num = ##
            var priceTotalInTable: any = 0.00;
            if ($('#order-data table tbody tr td.price-total').length) {
                $('#order-data table tbody tr').each(function () {
                    // if ($(this).find('td.price-total') )
                    priceTotalInTable = (parseFloat(priceTotalInTable) + parseFloat($(this).find('td.price-total').attr('value')!));
                });
                // console.log('priceTotalInTable :' + priceTotalInTable.toFixed(6));
            }

            if (!priceTotalInTable || isNaN(priceTotalInTable))
                priceTotalInTable = 0.00;

            var priceTotalInFooter = 0.00;
            if ($('#bill-footer .bill-general-info span.totalFirst').length) {
                var priceTotalInFooter = parseFloat($('#bill-footer .bill-general-info span.totalFirst').attr('value')!);
                // console.log('priceTotalInFooter :' + priceTotalInFooter.toFixed(6));
            }

            var orderNumInHeader = $('.bill-head .generalInfoFirstCol .order-num span:nth-child(2)').text();
            // console.log('priceTotalInFooter :' + (priceTotalInTable - priceTotalInFooter).toFixed(2));
            console.log(priceTotalInTable.toFixed(6))
            console.log(priceTotalInFooter.toFixed(6))
            console.log(orderNumInHeader)
            // .toFixed(6) as in database
            if (priceTotalInTable.toFixed(6) != priceTotalInFooter.toFixed(6) || orderNumInHeader == '#####') {
                // $('.alertFailureMsgContainer').addClass('connection-error').fadeIn();
                $('.alertMsgsContainer').append('<div class="style-msg errormsg"><div class="sb-msg">خطأ فى الاتصال .. <br> الرجاء الانتظار سيتم اعاده تحميل الصفحة تلقائيا</div></div>');
                $('#bill-footer form .paymentGenerate button, #bill-footer form .newBill button, #bill-footer form .holdBtn button, .bill-head .help-btns .print-receipt').prop('disabled', true);
                setTimeout(() => {
                    // $('.alertFailureMsgContainer').removeClass('connection-error').fadeOut();
                    $('.alertMsgsContainer').html('');
                    // window.location.reload(true);
                    this.createNewBillClick('error', '');
                }, 3000);
            }
        }

        // add quantities to sidebar items
        if (options.ProductId) {
            var productQty: any = 0;

            $('.products tbody tr .product-id').each(function () {
                if ($(this).text() == options.ProductId)
                    productQty = parseFloat(productQty) + parseFloat($(this).closest('tr').find('.productQty').text());
            });

            $('.side-menu .sidemenu-tabs .tab-content .item-id').each(function () {
                var clickedItemCT = $(this);
                var sideMenuProductId = clickedItemCT.text();

                if (sideMenuProductId == options.ProductId) {
                    if (productQty != 0) {			// add quantity to sidemenu item
                        if (clickedItemCT.closest('a').find('span').hasClass('qty-count'))
                            clickedItemCT.closest('a').find('.qty-count').html(productQty);
                        else
                            clickedItemCT.closest('a').append('<span class="qty-count">' + productQty + '</span>');
                    }
                    else {				// delete quantity from sidemenu item
                        clickedItemCT.closest('a').find('.qty-count').replaceWith('');
                    }
                }
            });
        }

        this.getOrderStatusOnLoad();
        // this.orderCalculateWidths(true); commented
    }
    // ___________________________________________________________
    private static formReset = function () {
        (document.getElementById('a79a2cdd-4e9c-4187-acbc-1e1d2ac397bf') as HTMLFormElement).reset();
        //$('.tt-input').val('');
        $('.code-input').focus();
    };
    // ___________________________________________________________
    private static setBillFooterTotalInput = function () {
        var parentContainer = $('.postcontent');
        if ($('.modal-sidebar').css('display') == 'block')
            parentContainer = $('.modal-sidebar');
        parentContainer.find('.bill-footer .total-input').attr('placeholder', $('.totalPricePending').text());
        parentContainer.find('.bill-footer .total-input').val(parentContainer.find('.totalPricePending').text());
    }
    // ___________________________________________________________
    private static excuteAfterAddEditItemsInOrder() {
        this.formReset;
        //_tableFixedHeaderSet();
        // scroll to bottom of table
        $('#order-data table tbody').stop().animate({
            scrollTop: $("#order-data table tbody")[0].scrollHeight
        }, 800);

        $('.appendedStyle').remove();
        $('#ajax-loader').attr('style', 'display:none');

        if ($('.deliveryGenerate').hasClass('opened') || $('.returns').hasClass('opened'))
            $('.toggleCol').removeClass('hidden');

        var transId = $('.products tbody tr:first-child').find('.trans-id').text();
        //console.log('transId: ' + transId);
        var urlPathArray = this._urlPathWithHash().split('/');
        if (urlPathArray[0] == '')
            urlPathArray.splice(0, 1);
        if ($('.sideBarLeftL2').length == 0 || ($('.sideBarLeftL2').length == 1 && $('.sideBarLeftL2').hasClass('modal-sidebar')))
            var lastUrlPath = urlPathArray[6];
        else
            var lastUrlPath = urlPathArray[5];
        // console.log('lastUrlPath');
        // console.log(lastUrlPath);
        /* if(lastUrlPath == undefined){
            lastUrlPath = transId;
        } */
        //var lastUrlPath = urlPathArray[urlPathArray.length - 1];

        var fromTask = this._getUrlQueryStrings()["fromtask"]; // window.location.href.indexOf('fromtask=1');
        var qsContact = this._getUrlQueryStrings()["contact"]; // window.location.href.indexOf('fromtask=1');
        var qsAddress = this._getUrlQueryStrings()["address"]; // window.location.href.indexOf('fromtask=1');
        var qsTel = this._getUrlQueryStrings()["tel"]; // window.location.href.indexOf('fromtask=1');
        var qsPerson = this._getUrlQueryStrings()["person"]; // window.location.href.indexOf('fromtask=1');

        if (this.dataSplitCheck == true) {
            if (lastUrlPath != transId || fromTask == "1" || (qsContact != undefined && qsContact != '')) {
                var newUrlPath = window.location.href.replace(lastUrlPath, transId).replace("fromtask=1", "");
                if (qsContact != undefined && qsContact != '')
                    newUrlPath = newUrlPath.replace("contact=" + qsContact, "");
                // if(qsAddress != undefined && qsAddress != '')
                newUrlPath = newUrlPath.replace("&address=" + qsAddress, "");
                // if(qsTel != undefined && qsTel != '')
                newUrlPath = newUrlPath.replace("&tel=" + qsTel, "");
                // if(qsPerson != undefined && qsPerson != '')
                newUrlPath = newUrlPath.replace("&person=" + qsPerson, "");

                if (newUrlPath.match(/\&$/)) // end with & will remove it
                    newUrlPath = newUrlPath.slice(0, -1);
                if (newUrlPath.match(/\?$/)) // end with ? will remove it
                    newUrlPath = newUrlPath.slice(0, -1);

                // newUrlPath = newUrlPath.split('?')[0];

                window.history.pushState("", "", newUrlPath);
                //console.log(window.location.href.replace(lastUrlPath, transId).replace("fromtask=1", ""));

                this.addEditItem_Enable();
                // $('.code-input').removeAttr('readonly');
                // $('.itemList .tt-input').removeAttr('readonly');

                // add button for new order in page-title
                var newUrlPathArray = this._urlPathWithHash().split('/');
                var transIdFromUrl = newUrlPathArray[newUrlPathArray.length - 1];
                var transIds: any = [];
                $('#page-title .prevOrdersList li:not(first-child)').each(function () {
                    var transId = $(this).find('button').attr('trans-id');
                    if (transId != '')
                        transIds.push(transId);
                });

                var orderNum = $('.orderDetails-container .bill-head .generalInfoBlk .order-num span:not(.receiptTitle)').text();
                if (transIds.indexOf(transIdFromUrl) > -1)
                    console.log('exist');
                else
                    $('#page-title .prevOrdersList').append('<li><button class="btn btn-default btn-xs" trans-id=' + transIdFromUrl + ' type="button"><span>' + orderNum + '</span></button></li>');
                $('#page-title .prevOrdersList li button[trans-id="' + transIdFromUrl + '"]').addClass('active');

            }
        }


        setTimeout(function () {
            $('.alertFailureMsgContainer').fadeOut();
            $('.errormsg').replaceWith('');
        }, 3000);

        this.setBillFooterTotalInput();
    };
    // ___________________________________________________________
    private static addItemsClickRev2(product_id_rev2: any) {
        $('.print-receipt').prop('disabled', true);

        if (this.addEditItem_InProgress)
            return false;

        this.addEditItem_InProgress = true;
        $('.code-input').attr('readonly', 'readonly');
        $('.itemList .tt-input').attr('readonly', 'readonly');

        var fromTask = this._getUrlQueryStrings()["fromtask"] == "1" ? '&fromtask=1' : '';
        var urlPathArray = this._urlPathWithHash().split('/');
        var lastUrlPath = urlPathArray[urlPathArray.length - 1];
        console.log('lastUrlPath2: ' + lastUrlPath);

        // Production Products Elements
        if (lastUrlPath == 'products') {
            var orderTransId = $('.tasksListContainer .content .make-product .product-rowId').text();
            console.log('orderTransId: ' + orderTransId);
            lastUrlPath = orderTransId;
            fromTask = '&trans-id=' + orderTransId;
            if ($('.tasksListContainer #order-data table tbody tr').length == 1) { // Is New
                fromTask = fromTask + '&fromtask=1';
            }
        }


        if (lastUrlPath != 'new') {
            setTimeout(() => {
                this.addEditItem_Enable();
                //$('.code-input').removeAttr('readonly');
                //$('.itemList .tt-input').removeAttr('readonly');
            }, 300);
        }

        if (product_id_rev2 == undefined)
            product_id_rev2 = '';

        var selectedQty: any = $('.qty-input').val();
        if (selectedQty == undefined)
            selectedQty = '';

        //get values to send in save btn
        var newItemCode = $('.code-input').val();
        $('.code-input').val('');
        var newItemName = $('.tt-input').val();
        //var newItemPrice = $('.price-input').val();
        //var newItemQuantity = $('.quantity-input').val();

        var style = "<div class='appendedStyle'><style>#ajax-loader{display:none !important;}</style></div>";
        $('body').append(style);

        var uuid: any = this._uuidv4();
        //console.log('<tr id="'+uuid+'" class="newTR"></tr>');

        var newRow = $('<tr id="' + uuid + '" class="newTR"></tr>');
        if ($('.products tbody tr').hasClass('noDataRow'))
            $('.noDataRow').replaceWith(newRow);
        else
            newRow.appendTo('.products tbody');

        $('<td colspan="13" id="item-loader"></td>').appendTo(newRow);

        var contact: any = this._getUrlQueryStrings()["contact"];
        contact = (contact == undefined || contact == '') ? '' : "&contact=" + contact;
        var address = this._getUrlQueryStrings()["address"];
        address = (address == undefined || address == '') ? '' : "&address=" + address;
        var tel = this._getUrlQueryStrings()["tel"];
        tel = (tel == undefined || tel == '') ? '' : "&tel=" + tel;

        var delivery = '';
        if ($('.bill-footer form .bill-footer-options .delivery-check').length == 1)
            delivery = '&delivery=' + ($('.bill-footer form .bill-footer-options .delivery-check input').is(':checked') ? 1 : 0);

        var urlPrefix: any = this._urlWithHash();
        if (newRow.closest('.modal-sidebar').length == 1)
            urlPrefix = newRow.closest('.modal-sidebar').find('.content .add-edit-url').attr('data-url');

        var contentOptions: any = {};
        contentOptions.btn = '.add-items';
        //contentOptions.resultsUrl = getUrlWithPath() + "/item?_wa=edit-lite" + '&item_id=' + '' + '&product_id=' + product_id + '&product_code=' + newItemCode + '&price_unit=' + newItemPrice + '&product_qty=' + newItemQuantity;
        contentOptions.resultsUrl = urlPrefix + "/item?_wa=edit-lite" + '&item_id=' + '' + '&product_id=' + product_id_rev2 + '&product_code=' + newItemCode + '&product_qty=' + selectedQty + fromTask + contact + address + tel + delivery;
        contentOptions.SuccessRowContainerSelector = '#' + uuid + '.newTR';
        contentOptions.SuccessFooterContainerSelector = '.bill-general-info';
        contentOptions.SuccessHeaderContainerSelector = '.generalInfoFirstCol';
        contentOptions.SuccessFunction = this.addEditItem_Success;
        // contentOptions.SuccessTriggerEvent = this.salesOrderSuccessTriggers; commented
        contentOptions.alwaysFunction = this.excuteAfterAddEditItemsInOrder;

        contentOptions.ProductId = product_id_rev2;			// will used in addEditItem_Success

        this.contentDrawPostForm(contentOptions);
        return false;
    };
    // ___________________________________________________________
    private static sideBarLeftLoad(options: any) {

        var sidebarOptions = $.extend({}, options);
        sidebarOptions.Title = options.title;
        sidebarOptions.Size = options.cssClass.split(' ')[0].slice(8);
        sidebarOptions.ModalCssClass = options.cssClass + ' sideBarLeftL1';
        sidebarOptions.SetOverlay = true;
        sidebarOptions.ModalId = 'sideBarLeftL1';
        sidebarOptions.alwaysFunction11 = options.afterOpenSidebar;

        this.openModalSidebar(sidebarOptions);
    };
    // ___________________________________________________________
    private static getPnlUrlPrefix() {
        var paths = window.location.pathname.split('/');
        if (paths[0] == '')
            paths.splice(0, 1);
        if (window.location.href.indexOf('http://app.feasibiliti.com/') > -1)
            var prefix = window.location.protocol + "//" + window.location.host + "/" + paths[0] + "/";
        else
            var prefix = window.location.protocol + "//" + window.location.host + "/" + paths[0] + "/" + paths[1] + "/" + paths[2] + "/" + paths[3] + "/";
        return prefix;
    };
    // ___________________________________________________________
    private static afterLoadPaymentsOrDuesListSideBar = function (options: any) {
        $('.tab-container .tab-content:first-child').addClass('active');
        $('ul.tab-nav li a').unbind('click');
        $('ul.tab-nav li a').click(function (e) {
            e.preventDefault();
            var href = $(this).attr('href')!.replace('#', '');
            $('.tab-container .tab-content').each(function () {
                $('.tab-container .tab-content').removeClass('active');
                $('.tab-container .tab-content[id=' + href + ']').addClass('active');
            })

        })
    }
    // ___________________________________________________________
    private static contentDraw(contentOptions: any) {

        // contentOptions.Url
        // contentOptions.PostData
        // contentOptions.Action
        // contentOptions.ContainerSelector
        // contentOptions.TriggerButton1Selector
        // contentOptions.TriggerButton1ClickHandler
        // contentOptions.TriggerButton2Selector
        // contentOptions.TriggerButton2ClickHandler

        $('#ajax-loader').fadeIn();

        if (contentOptions.Debug) {
            console.log(contentOptions.Url);
            console.log(contentOptions.PostData);
        }
        $.post(contentOptions.Url, contentOptions.PostData, function (data) {
        })
            .done((data: any) => {
                switch (contentOptions.Action) {
                    case 'appendJson':
                        var dataString = JSON.stringify(data);
                        $(contentOptions.ContainerSelector).html('');
                        $(contentOptions.ContainerSelector).append(dataString);  // add data to table	
                        break;
                    case 'clearANDappend':
                        $(contentOptions.ContainerSelector).html('');
                        $(contentOptions.ContainerSelector).append(data);
                        break;
                    case 'replace':
                        $(contentOptions.ContainerSelector).replaceWith(data); // replace specific row
                        break;
                    case 'appendBefore':
                        $(contentOptions.ContainerSelector).before(data); // replace specific row
                        break;
                    case 'appendAfter':
                        $(contentOptions.ContainerSelector).after(data); // replace specific row
                        break;
                    default:
                    case 'append':
                        $(contentOptions.ContainerSelector).append(data);  // add data to table
                        break;
                }


                var $form = $(contentOptions.ContainerSelector).find('form');
                if ($form.find('.input-html-group').length > 0) {
                    $form.find('.input-html-group input, .input-html-group textarea').each(() => {
                        if ($(this).val() != '')
                            $(this).val(String($(this).val())._htmlDecode($(this).val()));

                    })
                }

                /* if(contentOptions.TriggerButton1Selector) {
                    $(contentOptions.TriggerButton1Selector).unbind('click');
                    $(contentOptions.TriggerButton1Selector).click(contentOptions.TriggerButton1ClickHandler);
                }
                if(contentOptions.TriggerButton2Selector) {
                    $(contentOptions.TriggerButton2Selector).unbind('click');
                    $(contentOptions.TriggerButton2Selector).click(contentOptions.TriggerButton2ClickHandler);
                }
                if(contentOptions.TriggerButton3Selector) {
                    $(contentOptions.TriggerButton3Selector).unbind('click');
                    $(contentOptions.TriggerButton3Selector).click(contentOptions.TriggerButton3ClickHandler);
                } */

                if (contentOptions.SuccessTriggerEvent)
                    contentOptions.SuccessTriggerEvent();

                if (contentOptions.SuccessFunction)
                    contentOptions.SuccessFunction(contentOptions, data);

                if ($(contentOptions.ContainerSelector).find('.tabs').length == 1) {
                    if ($(contentOptions.ContainerSelector).find('.tabs .nav li')) {
                        if ($(contentOptions.ContainerSelector).find('.tabs .nav li').filter(function () { return $(this).hasClass('active') }).length == 0 && $(contentOptions.ContainerSelector).find('.tabs .tab-content .tab-pane').filter(function () { return $(this).hasClass('active') }).length == 0)
                            $(contentOptions.ContainerSelector).find('.tabs .nav li:first-child, .tabs .tab-content .tab-pane:first-child').addClass('active');
                        $(contentOptions.ContainerSelector).find('.tabs .nav li').click(function () {
                            if (!$(this).hasClass('disabled')) {
                                $(contentOptions.ContainerSelector).find('.tabs ul li.active').removeClass('active');
                                $(contentOptions.ContainerSelector).find('.tabs .tab-content .tab-pane.active').removeClass('active');
                                $(this).addClass('active');
                                $(contentOptions.ContainerSelector).find('.tabs .tab-content .tab-pane[id=tabs-' + $(this).attr('type') + ']').addClass('active');
                            }
                        });
                    }
                }

            })
            .fail(function (xhr: any, status: any, error: any) {
                console.log(xhr);
                console.log(status);
                console.log(error);
            })
            .always(function () {
                $('#ajax-loader').fadeOut();

                if (contentOptions.alwaysFunction)
                    contentOptions.alwaysFunction();

                if (contentOptions.alwaysFunction1)
                    contentOptions.alwaysFunction1(contentOptions);

                /* if(contentOptions.alwaysFunctionExist == true){
                    if(contentOptions.formButtonAlwaysSelector){
                        $(contentOptions.formButtonAlwaysSelector).click(contentOptions.formButtonAlwaysClickHandler);
                    }
                    else{
                        if (contentOptions.formButtonAlwaysClickHandler)
                            contentOptions.formButtonAlwaysClickHandler();
                    }
                    console.log('alwaysFunctionExist '+contentOptions.alwaysFunctionExist);
                } 
                else{
                    console.log('alwaysFunctionExist '+contentOptions.alwaysFunctionExist);
                } */
            });
    }
    // ___________________________________________________________
    private static loadPaymentsOrDuesListSideBar(event: any) {
        var ct = $(event.currentTarget);
        var orderId = $('#order-data table tbody > tr:first-child >.trans-id').text();
        var orderType = $('.orderDetails-container .order-type').text();
        var _url;
        if (ct.hasClass('Payments')) {
            _url = this.getPnlUrlPrefix() + "acc/payments?trans-id=" + orderId + '&trans-type=' + orderType + '&type=pay&mode=erp';
        } else if (ct.hasClass('dues')) {
            _url = this.getPnlUrlPrefix() + "acc/dues?trans-id=" + orderId + '&trans-type=' + orderType + '&type=invoice&mode=erp';
        }
        var contentOptions: any = {};
        contentOptions.Url =
            contentOptions.Url = _url;
        contentOptions.PostData = null;
        contentOptions.ContainerSelector = '.sideBarLeftL1 .content';
        contentOptions.Action = 'add';
        contentOptions.alwaysFunction1 = this.afterLoadPaymentsOrDuesListSideBar;

        this.contentDraw(contentOptions);
    }
    // ___________________________________________________________
    private static _getDynamicUrlQueryStrings(_url: any) {
        var vars = [], hash;
        if (_url != undefined && _url != '') {
            var hashes = _url.slice(_url.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        }
        else
            console.log('Error: Url is undefined or not found ...');
    };
    // ___________________________________________________________
    private static createNewBillClick(clickStatus: any, transId: any) {
        /* var urlPathArray  = window.location.pathname.split('/');
        var transId = urlPathArray[urlPathArray.length - 1];
        
        var newUrlPath = window.location.href.replace(transId, 'new');
        window.location.href = newUrlPath;
        $('.code-input').focus(); */

        $('.orderDetails-container, .side-menu').addClass('disabled');
        var urlPathArray = this._urlWithHash().split('/');
        var lastUrlPath: any = urlPathArray[urlPathArray.length - 1];

        // if(this.orderTransIdArray.indexOf(lastUrlPath) > -1 || lastUrlPath =='new')
        //     console.log('');
        //     else{
        //     // arr.splice(index, 0, item); will insert item into arr at the specified index (deleting 0 items first, that is, it's just an insert).
        //     // this.orderTransIdArray.splice(0, 0, lastUrlPath); commented

        //     var orderTransIdArrayLength = this.orderTransIdArray.length;
        //     // console.log('orderTransIdArrayLength: ' + orderTransIdArrayLength);
        //     if(orderTransIdArrayLength > 30){
        //         // arr.splice(indexValueOfArray,1); This removes 1 item from the array starting at indexValueOfArray.
        //         this.orderTransIdArray.splice(30, 1);
        //     }
        // }	
        // console.log('orderTransIdArray: ' + orderTransIdArray);

        var urlWithHash = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.hash;
        var newUrl, newUrlToPush;
        if (clickStatus == 'new') {
            newUrl = this._urlWithHash().replace(lastUrlPath, 'new');
            newUrlToPush = urlWithHash.replace(lastUrlPath, 'new');
        }
        else if (clickStatus == 'error' || clickStatus == 'back' || clickStatus == 'reload') {
            newUrl = this._urlWithHash();
            newUrlToPush = urlWithHash;
        }
        else if (clickStatus == 'next-prev') {
            newUrl = this._urlWithHash().replace(lastUrlPath, transId);
            newUrlToPush = urlWithHash.replace(lastUrlPath, transId);
            $('.side-menu .sidemenu-tabs .tab-content .add-item .qty-count').remove();
            $('.side-menu .quantities .product-name, .side-menu .quantities .product-id').html('');
            $('.side-menu .quantities .qty-input, .side-menu .quantities .price-input').val('');
        }
        else if (clickStatus == 'newFromPageTitle') {
            newUrl = this._urlWithHash().replace(lastUrlPath, 'new');
            newUrlToPush = urlWithHash.replace(lastUrlPath, 'new');
            var orderNum = $('.orderDetails-container .bill-head .generalInfoBlk .order-num span:not(.receiptTitle)').text();

            var transIds: any = [];
            $('#page-title .prevOrdersList li:not(first-child)').each(function () {
                var transId = $(this).find('button').attr('trans-id');
                if (transId != '')
                    transIds.push(transId);
            });
            if (transIds.indexOf(lastUrlPath) > -1)
                console.log('exist');
            else
                $('#page-title .prevOrdersList').append('<li><button class="btn btn-default btn-xs" trans-id=' + lastUrlPath + ' type="button"><span>' + orderNum + '</span></button></li>');

            var listLength = $('#page-title .prevOrdersList li').length;
            if (listLength > 11)		// 10 + first-child
                $('#page-title .prevOrdersList li:nth-child(2)').remove();
        }

        var contentOptions: any = {};
        contentOptions.Url = newUrl + "/new";
        contentOptions.clickStatus = clickStatus;
        contentOptions.PostData = null;
        contentOptions.ContainerSelector = $('.orderDetails-container');
        contentOptions.Action = 'replace';
        // contentOptions.SuccessFunction = salesOrderSuccessTriggers;commented
        // contentOptions.alwaysFunction1 = exceuteAfterCreateNewBillClick; commented

        this.contentDraw(contentOptions);
        window.history.pushState("", "", newUrlToPush);
    };
    // ___________________________________________________________
    public static modalSidebarClose(selector: any) {
        var dir = $('body').attr('dir') == 'rtl' ? 'left' : 'right';
        if (selector.parent().attr('remove-content') == 'false' && selector.parent().attr('list') == 'true') {
            $('.modal-sidebar').hide(300, "slide", () => { return { direction: dir } });
            $('.sideBars-opened-list').hide(300, "slide", () => { return { direction: dir } });
        }
        else
            selector.closest('.modal-sidebar').hide("slide", { direction: dir }, 300);

        if (selector.parent().attr('remove-content') == 'true' && selector.parent().attr('list') == 'false') {
            setTimeout(function () {
                selector.parent().find('.modal-sidebar-content, .modal-sidebar-title span').html('');
            }, 350);
        }
        setTimeout(() => {
            if (selector.parent().attr('list') == 'false')
                selector.parent().attr('class', 'modal-sidebar');
            if ($('.modal-sidebar[list="false"]:not(.sideBar-chat)').filter(function () { return $(this).css('display') == 'block'; }).length == 0) {
                $('.body-overlay').removeClass('appear sidebar');
            }

            // order
            if ($('.modal-sidebar').hasClass('sideBarLeftL1') && $('.orderDetails-container').length == 1)
                this.createNewBillClick('reload', '');

            // operator live chat
            // if($('.modal-sidebar').filter(function() {return $(this).css('display') == 'block'; }).length == 0)
            if ($('.ertaqy-comms-popup[type="livechat"]').css('display') == 'block' && $('.modal-sidebar').filter(function () { return $(this).css('display') == 'block'; }).length == 0)
                $('.app .app-one').removeClass('side-by-side');
        }, 350);
        if ($('.employee-payroll-tabs').length == 1) {
            $('.employee-payroll-tabs').hide(300, "slide", () => { return { direction: dir } });

            setTimeout(function () { $('.employee-payroll-tabs').remove(); }, 350);
        }
        if ($('#cms-page-add-edit-modal').length == 1 && selector.parent().attr('id').indexOf('paragraph-') != -1 && selector.parent().attr('id').indexOf('-ctrls') != -1)
            $('#cms-page-add-edit-modal').hide(300, "slide", () => { return { direction: dir } });
        if ($('#cms-page-add-edit-modal').length == 1 && selector.parent().attr('id').indexOf('paragraph-') != -1 && selector.parent().attr('id').indexOf('-security') != -1)
            $('#cms-page-add-edit-modal').show(300, "slide", () => { return { direction: dir } });

        if ($('.top-social .ertaqy-comms-icon').hasClass('active'))
            $('.top-social .ertaqy-comms-icon').removeClass('active');
        if ($('.top-social .kb').hasClass('active'))
            $('.top-social .kb').removeClass('active');
    };
    // ___________________________________________________________
    // private static sideBarLeftClose(){
    //     this.modalSidebarClose($('.modal-sidebar:last-of-type .modal-sidebar-close'));
    // };
    // ___________________________________________________________
    public static ertaqyLiveChatPopupHide() {
        // $('#wrapper .livechat-popup').slideUp();
        if ($('.sideBar-chat').css('display') == 'block')
            $('.sideBar-chat').hide();
        $('.top-social .ertaqy-comms-icon').removeClass('active')
        $('.ertaqy-comms-popup').hide();
    }
    // ___________________________________________________________
    private static _getUrlQueryStrings(): any {
        let vars: String[] = [],
            hash: any;
        let hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (let i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }
    private static getFormData($form: any) {		// Get form inputs as json array
        var unindexed_array = $form.serializeArray();
        //console.log(unindexed_array);
        //return unindexed_array;

        var indexed_array: any;

        $.map(unindexed_array, function (n, i) {
            indexed_array[n['name']] = n['value'];
        });

        //console.log(indexed_array);

        return indexed_array;
    }
    // ___________________________________________________________
    private static recaptcha_check(frm: any) {
        if (frm.find('#g-recaptcha-response').length != 0) {
            var recaptchaContainer = frm.find('.form-recaptcha-container');
            var txtDanger = recaptchaContainer.find('.text-danger');
            txtDanger.removeClass('field-validation-error').text('');
            var res = frm.find('#g-recaptcha-response').val();
            // console.log('form submit - recaptcha');
            // console.log(res);
            if (res == "" || res == undefined || res.length == 0) {
                txtDanger.removeClass('field-validation-valid');
                if (!txtDanger.hasClass('field-validation-error'))
                    txtDanger.addClass('field-validation-error').text(recaptchaContainer.find('.g-recaptcha').attr('data-val-required'));
                return false;
            }
        }
        return true;
    };
    // ___________________________________________________________
    private static getUrlForPushState(url: any, title: any) {
        // current url
        var paths = window.location.pathname.split('/');
        if (paths[0] == '') paths.splice(0, 1);
        var prefix = window.location.protocol + "//" + window.location.host + "/" + paths[0] + "/" + paths[1] + "/" + paths[2] + "/" + paths[3] + "/" + paths[4] + "#";

        // clicked url
        console.log(url)
        var paths2 = url.split('/');
        if (paths2[0] == '')
            paths2.splice(0, 1);

        var newPathname = '', index;

        if (window.location.href.indexOf('http://app.feasibiliti.com/') > -1)
            index = 4;
        else
            index = 7;

        var orderChk = false;
        for (let i = index; i < paths2.length; i++) {
            switch (paths2[i]) {
                case "pos":
                case "sales":
                case "purchases":
                case "production":
                    {
                        orderChk = true;
                        break;
                    }
                default: break;
            }
            newPathname += "/";
            newPathname += paths2[i];
        }


        prefix = window.location.protocol + "//" + window.location.host + window.location.pathname;

        // if(orderChk && paths2.length > 8) {
        if (orderChk) {
            var currentHash = window.location.hash.slice(1);
            if (currentHash != '') {
                if (currentHash.match(/^\//))	// start with / will remove it
                    currentHash = currentHash.slice(1);
                var currentPaths = currentHash.split('/');
                //if (paths2[8].split('?')[0] != 'new')
                if (currentPaths.length > 2 && currentPaths[2].split('?')[0] != 'new')
                    newPathname = newPathname.split('?')[0]; // remove querystring
            }
        }

        var prefix2 = prefix + '#' + newPathname;
        if (title) {
            document.title = title;
            var newTitle = { "pageTitle": document.title }
            window.history.pushState(newTitle, "", prefix2);
        }


        // updateHeaderActionsSalesLinks('.apps .popover-content .quickaddmnu .quickaddmnu-shortcut', false);
    };
    // ___________________________________________________________
    private static getCookie(name: string): string | undefined {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
        return undefined;
    };
    // ___________________________________________________________
    public static Request = async (options: UrlRequestOptions) => {
        console.log("-------------------------------------Start Request Function-------------------------------------------------")

        // Need Revision: Where will be used
        // if(options.event) {
        //     $(options.event.currentTarget).click(this.do_nothing); 
        //     setTimeout(()=>{ $(options.event.currentTarget).unbind('click', this.do_nothing); }, 700);
        // }

        // Handle Options Values
        if (!options) alert("_ertaqyAjax options is not defined");
        if (options.url.isNullOrEmpty()) {
            console.error("_ertaqyAjax options have no url");
            return;
        }
        if (options.url.endsWith('?'))
            options.url = options.url.substring(0, options.url.length - 1)
        if (this._getUrlQueryStrings()['sqltrace'] == '1' && options.url.indexOf('sqltrace=') == -1)
            options.url += (options.url.indexOf('?') == -1 ? '?' : '&') + 'sqltrace=1';

        if (options.success == undefined) options.success = options.done; // till change all done to success

        if (options.resultFuncAwait == undefined) options.resultFuncAwait = true;

        if (options.data == undefined) options.data = null;
        if (options.requestKey == undefined) options.requestKey = 'global-request';
        // if (options.Method == undefined) options.Method = "GET";
        if (options.cache == undefined) options.cache = false;
        if (options.async == undefined) options.async = true;
        if (options.crossDomain == undefined) options.crossDomain = false;
        if (options.withCredentials == undefined) options.withCredentials = false;
        if (options.dataType == undefined) options.dataType = "html"; //"json";
        if (options.contentType == undefined) options.contentType = "application/x-www-form-urlencoded; charset=UTF-8"; //"application/json"
        if (options.formValidate == undefined) options.formValidate = true;
        // Need Revision: Where will be used
        if (options.modalKey && options.modalKey != null && options.modalKey != undefined && options.modalKey != '')
            this._ertaqyModalsOpened[options.modalKey] = options;
        // Cookies for CrossDomains
        if (options.crossDomain && options.crossDomain && options.crossDomainErtaqy && options.beforeSend === undefined) {
            options.beforeSend = (xhr: any) => {
                const auiCookie = this.getCookie('_AUI');
                if (auiCookie !== undefined) {
                    xhr.setRequestHeader("ertaqy-aui", auiCookie);
                }
                const aufCookie = this.getCookie('_AUF');
                if (aufCookie !== undefined) {
                    xhr.setRequestHeader("ertaqy-auf", aufCookie);
                }
                const islCookie = this.getCookie('_ISL');
                if (islCookie !== undefined) {
                    xhr.setRequestHeader("ertaqy-token", islCookie);
                }
                const usrCookie = this.getCookie('_USR');
                if (usrCookie !== undefined) {
                    xhr.setRequestHeader("ertaqy-username", usrCookie);
                }
            };
        }
        // Loader Appear, Need Revision
        if ($('#ajax-loader').length == 0)
            $('body').append('<div id="ajax-loader"></div>');
        $('#ertaqy-chat-loader').length == 1 ? $('#ertaqy-chat-loader').fadeIn() : $('#ajax-loader').fadeIn();

        // Validate, Handle (html) & Generate FormData Object
        if (options.Method == UrlRequestMethods.Post && options.formBtn) {
            var jsonData: any;

            // if(options.data) {
            //	alert ('data can not be set in post form');
            //	return false;
            // }

            var btn = $(options.formBtn);
            if (btn.length > 0) {
                var $form: any = btn.parents('form:first'); //$("#"+formId);

                if ($form && $form != undefined && $form.length > 0) {
                    alert('form not found'); return false;
                }

                // Encoding Html Inputs (ERTAQY CMS)
                if ($form.find('.input-html-group').length > 0) {
                    $form.find('.input-html-group input, .input-html-group textarea').each(() => {
                        if ($(this).val() != '') {
                            //console.log('Encoding -------------------------');
                            //console.log(_htmlEncode($(this).val()));
                            $(this).val(String($(this).val()).EncodeHtml());

                        }
                    })
                }

                let jsonData = this.getFormData($form);
                btn.attr("disabled", "true");

                // Reinitialize Validation because form added dynamically
                $form.removeData('validator');
                $form.removeData('unobtrusiveValidation');
                $.validator.unobtrusive.parse($form);


                var formIsValid = true;
                if (options.formValidate) {
                    try {

                        // set required to dynmaic checkBoxList
                        $form.find('.form-control-cbl[required]').each(() => {
                            var ct = $(this);
                            if ((ct.parent().css('display') == 'block' || !ct.hasClass('hidden')) && ct.find('input[type="checkbox"]:checked').length == 0) {
                                if (ct.next().find('span').length == 0)
                                    ct.next().append('<span id="' + ct.next().attr('data-valmsg-for') + '-error" class="">' + ct.attr('data-val-required') + '</span>');
                            }
                        });

                        // Fix inputs without name attribute, avoid form error
                        $form.find('input:not([name])').each(() => {
                            $(this).attr('name', () => $(this).attr('id'));
                        });

                        // if($form && $form != undefined && $form.length > 0) // commented no need to check again
                        formIsValid = $form.valid();

                        if (!this.recaptcha_check($form))
                            formIsValid = false;


                    }
                    catch (err: any) {
                        formIsValid = false; // changed
                        console.log("Error in form: " + err.message);
                    }
                }

                // Check Form is valid	
                if (options.formValidate && $form && $form != undefined && $form.length > 0 && !formIsValid) { // !$form.valid()
                    btn.attr("disabled", "false");
                    if ($form.hasClass('loading')) {
                        $form.removeClass('loading');
                        btn.find('i.fa-spinner').remove();
                    }
                    // console.log('validation error');
                    $('#ertaqy-chat-loader').length == 1 ? $('#ertaqy-chat-loader').fadeOut() : $('#ajax-loader').fadeOut();
                    if ($form.find('.validSummery').length > 0) {
                        $form.find('.validSummery').html('');
                        $form.find('.field-validation-error').each(() => {
                            if ($(this).find('span').length > 0) {
                                var inputValidTxt = $(this).parent().find('label').text().replace(':', '')
                                $form.find('.validSummery').append('<div>* الرجاء ادخال ' + inputValidTxt + '</div>')
                            }
                        });
                    }
                    return false;
                }

                // recaptcha is clicked
                if ($form.find('.g-recaptcha').length == 1) {
                    var recaptcha = $form.find("#g-recaptcha-response").val();
                    if (recaptcha === "") {
                        btn.attr("disabled", "false");
                        return false;
                    }
                }

                // Push Button Value as submited as normal from mvc
                jsonData[btn.attr("name")!] = btn.attr("value");
            }

            // Add button name to do post action according to this button
            if (options.formBtnName && options.formBtnValue)
                jsonData[options.formBtnName] = options.formBtnValue;

            // Add FormData to Options.data
            if (!options.data) options.data = {};
            $.each(jsonData, function (key, value) {
                options.data[key] = value;
            });

        }

        if (options.log)
            console.log(options);


        // ________________________________________________________________________________________________________________
        var ajaxReqPrev;
        if (options.requestKey) ajaxReqPrev = this._ertaqyAjaxRequests[options.requestKey];

        var ajaxType: string;
        switch (options.Method) {
            case UrlRequestMethods.Get: { ajaxType = "GET"; break; }
            case UrlRequestMethods.Post: { ajaxType = "POST"; break; }
        }
        var ajaxReqNew = $.ajax({
            type: ajaxType,
            cache: options.cache,
            async: options.async,
            crossDomain: options.crossDomain,
            url: options.url,
            xhrFields: {
                withCredentials: options.withCredentials
            },
            headers: {
                "Accept": "*/*"
                // "application/json",
                // "Access-Control-Allow-Origin": "*" // '"' + _getUrlHost() + '"'// 
                // "Access-Control-Allow-Credentials": "true"
            },
            data: options.data,
            dataType: options.dataType,  // نوع البيانات المتوقع استلامها من السيرفر
            contentType: options.contentType, // نوع البيانات المتوقع ارسالها الى السيرفر
            beforeSend: function (xhr) {

                // if(this._ertaqyAjaxCounts == 0) { //  || _ertaqyAjaxAlertSlowMsg == null
                //     // _ertaqyAjaxAlertSlowMsg = setTimeout(function(){$('.ertaqyAjaxSlowMsg').removeClass('hidden');}, 10000);
                // }
                // this._ertaqyAjaxCounts++;

                if (btn) setTimeout(() => { btn.attr("disabled", "false"); }, 2000); // allow button again if loading takes time

                // Stop Previous Request with same requestKey
                if (this.ajaxReqPrev != undefined && this.ajaxReqPrev.readyState < 4) {
                    this.ajaxReqPrev.abort();
                    $('#ertaqy-chat-loader').length == 1 ? $('#ertaqy-chat-loader').fadeIn() : $('#ajax-loader').fadeIn();
                }

                if (options.beforeSend)
                    options.beforeSend(xhr);
            }
        })
            .done(function (data) {

                // Same Form Server Side Validation: form not cleared
                if (options.formBtn && data.indexOf("<form ") != -1 && $('form') != undefined && data.indexOf("id=\"" + $('form').attr("id") + "\" ") != -1) {
                    console.log("4--fourth if(options.formBtn) ____________get data from .done")
                    if (options.log) console.log('done but failed, modalKey: ' + options.modalKey);
                    if (options.notValid && options.notValid != null) {
                        options.paramData = data;
                        //if(options.resultFuncAwait && _isAsyncFunction(options.notValid))
                        //	await options.notValid(options);
                        //else
                        options.notValid(options);
                    }
                    return false;
                }
                else {
                    console.log("4--fourth if(options.success) ____________get data from .done  and put it inside options.paramData")
                    if (options.success && options.success != null) {
                        options.paramData = data;
                        //if(options.resultFuncAwait && _isAsyncFunction(options.success))
                        //	await options.success(options);
                        //else
                        options.success(options);
                    }

                    if (options.downloadFile && options.downloadFile != '') {
                        var blob = new Blob([data]);
                        var link = document.createElement('a');
                        link.href = window.URL.createObjectURL(blob);
                        link.download = options.downloadFile;
                        link.click();
                    }

                }
            })
            .fail(function (xhr, status, error) {
                if (options.fail && options.fail != null) {
                    options.paramXhr = xhr;
                    options.paramStatus = status;
                    options.paramError = error;
                    //if(options.resultFuncAwait && _isAsyncFunction(options.fail))
                    //	await options.fail(options);
                    //else
                    options.fail(options);
                }
                console.log("connection fail")
                console.log(error)
            })
            .always(() => {

                // _ertaqyAjaxCounts--;
                // if (_ertaqyAjaxCounts == 0) { // lastone
                //     $('.ertaqyAjaxSlowMsg').addClass('hidden');
                //     clearTimeout(_ertaqyAjaxAlertSlowMsg);
                //     _ertaqyAjaxAlertSlowMsg = null;
                // }

                $('#ertaqy-chat-loader').length == 1 ? $('#ertaqy-chat-loader').fadeOut() : $('#ajax-loader').fadeOut();

                if (btn) btn.attr("disabled", "false");
                if (options.always && options.always != null) {
                    //if(options.resultFuncAwait && _isAsyncFunction(options.always))
                    //	await options.always(options);
                    //else
                    options.always(options);
                }

                if (options.requestKey) delete this._ertaqyAjaxRequests[options.requestKey]; // no need to call to abort again

            });
        // current request, to be checked next request if doublicated, before await when
        if (options.requestKey) this._ertaqyAjaxRequests[options.requestKey] = ajaxReqNew; // set current new ajaxRequest to allow abort in next call

        // await here instead of await ajax, to check dublicates in beforeStart
        await $.when(ajaxReqNew).promise(); //.done();
        console.log("5--fifth await $.when(ajaxReqNew).promise()")
        console.log("-------------------------------------End Request Function-------------------------------------------------")
    }
    // ____________________________________________________________________________
    // public static request_sidebar = async (options:any) => {
    //     var ajaxReqPrev;
    //     if (options.requestKey) ajaxReqPrev = this._ertaqyAjaxRequests[options.requestKey];   
    //     switch (options.Method) {
    //         case UrlRequestMethods.Get: { this.ajaxType = "GET"; break; }
    //         case UrlRequestMethods.Post: { this.ajaxType = "POST"; break; }
    //     }
    //     var ajaxReqNew = $.ajax({
    //         type: this.ajaxType,
    //         cache: options.cache,
    //         async: options.async,
    //         crossDomain: options.crossDomain,
    //         url: options.url,
    //         xhrFields: {
    //             withCredentials: options.withCredentials
    //         },
    //         headers: {
    //             "Accept": "*/*"
    //             // "application/json",
    //             // "Access-Control-Allow-Origin": "*" // '"' + _getUrlHost() + '"'// 
    //             // "Access-Control-Allow-Credentials": "true"
    //         },
    //         data: options.data,
    //         dataType: options.dataType,  // نوع البيانات المتوقع استلامها من السيرفر
    //         contentType: options.contentType, // نوع البيانات المتوقع ارسالها الى السيرفر
    //         beforeSend: function (xhr) {

    //             // if(this._ertaqyAjaxCounts == 0) { //  || _ertaqyAjaxAlertSlowMsg == null
    //             //     // _ertaqyAjaxAlertSlowMsg = setTimeout(function(){$('.ertaqyAjaxSlowMsg').removeClass('hidden');}, 10000);
    //             // }
    //             // this._ertaqyAjaxCounts++;

    //             if (this.btn) setTimeout(() => { this.btn.attr("disabled", "false"); }, 2000); // allow button again if loading takes time

    //             // Stop Previous Request with same requestKey
    //             if (this.ajaxReqPrev != undefined && this.ajaxReqPrev.readyState < 4) {
    //                 this.ajaxReqPrev.abort();
    //                 $('#ertaqy-chat-loader').length == 1 ? $('#ertaqy-chat-loader').fadeIn() : $('#ajax-loader').fadeIn();
    //             }

    //             if (options.beforeSend)
    //                 options.beforeSend(xhr);
    //         }
    //     })
    //     .done(function (data) {
    //         if (options.log)
    //             console.log('data= ' + data);

    //         // Same Form Server Side Validation: form not cleared
    //         if (options.formBtn && data.indexOf("<form ") != -1 && $('form') != undefined && data.indexOf("id=\"" + $('form').attr("id") + "\" ") != -1) {
    //             if (options.log) console.log('done but failed, modalKey: ' + options.modalKey);
    //             if (options.notValid && options.notValid != null) {
    //                 options.paramData = data;
    //                 //if(options.resultFuncAwait && _isAsyncFunction(options.notValid))
    //                 //	await options.notValid(options);
    //                 //else
    //                 options.notValid(options);
    //             }
    //             return false;
    //         }
    //         else {

    //             if (options.log) console.log('done success, modalKey: ' + options.modalKey);
    //             if (options.success && options.success != null) {
    //                 options.paramData = data;
    //                                     if(options.SetOverlay == true)
    //                         $('.body-overlay').addClass('appear sidebar');
    //                     let mydiv = document.createElement('div')

    //                     mydiv.appendChild(data)
    //                     $('.wrapper').append(mydiv)
    //                 //if(options.resultFuncAwait && _isAsyncFunction(options.success))
    //                 //	await options.success(options);
    //                 //else
    //                 // if(options.SetOverlay == true)
    //                 //     $('.body-overlay').addClass('appear sidebar');
    //                 // $('.modal-sidebar').append(data)
    //                 options.success(options);
    //             }

    //             if (options.downloadFile && options.downloadFile != '') {
    //                 var blob = new Blob([data]);
    //                 var link = document.createElement('a');
    //                 link.href = window.URL.createObjectURL(blob);
    //                 link.download = options.downloadFile;
    //                 link.click();
    //             }

    //         }
    //     })
    //     .fail(function (xhr, status, error) {
    //         if (options.fail && options.fail != null) {
    //             options.paramXhr = xhr;
    //             options.paramStatus = status;
    //             options.paramError = error;
    //             //if(options.resultFuncAwait && _isAsyncFunction(options.fail))
    //             //	await options.fail(options);
    //             //else
    //             options.fail(options);
    //         }
    //         console.log("connection fail")
    //         console.log(error)
    //     })
    //     .always(() => {

    //         // _ertaqyAjaxCounts--;
    //         // if (_ertaqyAjaxCounts == 0) { // lastone
    //         //     $('.ertaqyAjaxSlowMsg').addClass('hidden');
    //         //     clearTimeout(_ertaqyAjaxAlertSlowMsg);
    //         //     _ertaqyAjaxAlertSlowMsg = null;
    //         // }

    //         $('#ertaqy-chat-loader').length == 1 ? $('#ertaqy-chat-loader').fadeOut() : $('#ajax-loader').fadeOut();

    //         if (this.btn) this.btn.attr("disabled", "false");
    //         if (options.always && options.always != null) {
    //             //if(options.resultFuncAwait && _isAsyncFunction(options.always))
    //             //	await options.always(options);
    //             //else
    //             options.always(options);
    //         }

    //         if (options.requestKey) delete this._ertaqyAjaxRequests[options.requestKey]; // no need to call to abort again

    //     });
    //     // current request, to be checked next request if doublicated, before await when
    //     if (options.requestKey) this._ertaqyAjaxRequests[options.requestKey] = ajaxReqNew; // set current new ajaxRequest to allow abort in next call
    //     // await here instead of await ajax, to check dublicates in beforeStart
    //     await $.when(ajaxReqNew).promise(); //.done();

    // }
    // ____________________________________________________________________________
    public static _signalrSrvSendJson(json: any) {
        if (this._signalrHub1) {

            try {

                if (json.userLang == null || json.userLang == undefined) {
                    json.userLang = $('body').attr('lang');
                }

                if (json.await == true) {
                    this._signalrHub1.server.send(JSON.stringify(json))
                        .done(() => {
                            if (json.callback != null && json.callback != undefined) { json.callback(json); }
                            if (this._signalrLogging) console.log("signalR Sent: " + JSON.stringify(json));
                        })
                        .fail(() => {
                            if (json.callback != null && json.callback != undefined) { json.callback(json); }
                            if (this._signalrLogging) console.log("signalR Failed: " + JSON.stringify(json));
                        });
                } else {
                    this._signalrHub1.server.send(JSON.stringify(json))
                        .done(() => {
                            if (json.callback != null && json.callback != undefined) { json.callback(json); }
                            if (this._signalrLogging) console.log("signalR Sent: " + JSON.stringify(json));
                        })
                        .fail(() => {
                            if (json.callback != null && json.callback != undefined) { json.callback(json); }
                            if (this._signalrLogging) console.log("signalR Failed: " + JSON.stringify(json));
                        });
                }
            }
            catch (err) {  //We can also throw from try block and catch it here
                alert("signalR Err: " + err);
                console.log(err);
            }
            finally {

            }
        } else {
            if (this._signalrLogging) console.log('signalr Hub is null');
        }
    }
    // ____________________________________________________________________________
    public static async _ertaqyAjax(options: any) {


        if (options.event) {
            $(options.event.currentTarget).on("click", this.do_nothing);
            setTimeout(() => { $(options.event.currentTarget).unbind('click', this.do_nothing); }, 700);
        }

        if ($('#ajax-loader').length == 0)
            $('body').append('<div id="ajax-loader"></div>');
        $('#ertaqy-chat-loader').length == 1 ? $('#ertaqy-chat-loader').fadeIn() : $('#ajax-loader').fadeIn();

        if (!options) alert("_ertaqyAjax options is not defined");
        if (options.url == undefined) {
            console.error("_ertaqyAjax options have no url");
            return;
        }
        else {
            if (options.url.endsWith('?'))
                options.url = options.url.substring(0, options.url.length - 1)
            if (this._getUrlQueryStrings()['sqltrace'] == '1' && options.url.indexOf('sqltrace=') == -1)
                options.url += (options.url.indexOf('?') == -1 ? '?' : '&') + 'sqltrace=1';
        }
        if (options.success == undefined) options.success = options.done; // till change all done to success

        if (options.resultFuncAwait == undefined) options.resultFuncAwait = true;

        if (options.data == undefined) options.data = null;
        if (options.requestKey == undefined) options.requestKey = 'global-request';

        if (options.type == undefined) options.type = "GET";
        if (options.cache == undefined) options.cache = false;
        if (options.async == undefined) options.async = true;
        if (options.crossDomain == undefined) options.crossDomain = false;
        if (options.withCredentials == undefined) options.withCredentials = false;
        if (options.dataType == undefined) options.dataType = "html"; //"json";
        if (options.contentType == undefined) options.contentType = "application/x-www-form-urlencoded; charset=UTF-8"; //"application/json"
        if (options.formValidate == undefined) options.formValidate = true;

        if (options.modalKey && options.modalKey != null && options.modalKey != undefined && options.modalKey != '')
            this._ertaqyModalsOpened[options.modalKey] = options;

        // if(options.crossDomain && options.crossDomain && options.crossDomainErtaqy && options.beforeSend == undefined) {
        //     options.beforeSend = function(xhr) {
        //         if($.cookie('_AUI') != undefined)
        //             xhr.setRequestHeader("ertaqy-aui", $.cookie('_AUI'));
        //         if($.cookie('_AUF') != undefined)
        //             xhr.setRequestHeader("ertaqy-auf", $.cookie('_AUF'));
        //         if($.cookie('_ISL') != undefined)
        //             xhr.setRequestHeader("ertaqy-token", $.cookie('_ISL'));
        //         if($.cookie('_USR') != undefined)
        //             xhr.setRequestHeader("ertaqy-username", $.cookie('_USR'));
        //     }
        // } commented

        if (options.log)
            console.log(options);

        if (options.type == 'POST' && options.formBtn) {

            var jsonData: any;

            // if(options.data) {
            //	alert ('data can not be set in post form');
            //	return false;
            // }

            var btn = $(options.formBtn);
            if (btn.length > 0) {
                var $form = btn.parents('form:first'); //$("#"+formId);
                if (!$form) {
                    alert('form not found'); return false;
                }

                if ($form.find('.input-html-group').length > 0) {
                    $form.find('.input-html-group input, .input-html-group textarea').each(() => {
                        if ($(this).val() != '') {
                            //console.log('Encoding -------------------------');
                            //console.log(_htmlEncode($(this).val()));
                            $(this).val(String($(this).val()).EncodeHtml());


                        }
                    })
                }

                jsonData = this.getFormData($form);
                btn.attr("disabled", "true");

                // Reinitialize Validation because form added dynamically
                $form.removeData('validator');
                $form.removeData('unobtrusiveValidation');
                $.validator.unobtrusive.parse($form);


                var formIsValid = true;
                if (options.formValidate) {
                    try {

                        // set required to dynmaic checkBoxList
                        $form.find('.form-control-cbl[required]').each(() => {
                            var ct = $(this);
                            if ((ct.parent().css('display') == 'block' || !ct.hasClass('hidden')) && ct.find('input[type="checkbox"]:checked').length == 0) {
                                if (ct.next().find('span').length == 0)
                                    ct.next().append('<span id="' + ct.next().attr('data-valmsg-for') + '-error" class="">' + ct.attr('data-val-required') + '</span>');
                            }
                        });

                        // Fix inputs without name attribute, avoid form error
                        $form.find('input:not([name])').each(() => {
                            $(this).attr('name', $(this).attr('id')!);
                        });

                        if ($form && $form != undefined && $form.length > 0)
                            // formIsValid = $form.valid();

                            if (!this.recaptcha_check($form))
                                formIsValid = false;


                    }
                    catch (err: any) {
                        formIsValid = true;
                        console.log("Error in form: " + err.message);
                    }
                }

                // Check Form is valid	
                if (options.formValidate && $form && $form != undefined && $form.length > 0 && !formIsValid) { // !$form.valid()
                    btn.attr("disabled", "false");
                    if ($form.hasClass('loading')) {
                        $form.removeClass('loading');
                        btn.find('i.fa-spinner').remove();
                    }
                    // console.log('validation error');
                    $('#ertaqy-chat-loader').length == 1 ? $('#ertaqy-chat-loader').fadeOut() : $('#ajax-loader').fadeOut();
                    if ($form.find('.validSummery').length > 0) {
                        $form.find('.validSummery').html('');
                        $form.find('.field-validation-error').each(function () {
                            if ($(this).find('span').length > 0) {
                                var inputValidTxt = $(this).parent().find('label').text().replace(':', '')
                                $form.find('.validSummery').append('<div>* الرجاء ادخال ' + inputValidTxt + '</div>')
                            }
                        });
                    }
                    return false;
                }

                // recaptcha is clicked
                if ($form.find('.g-recaptcha').length == 1) {
                    var recaptcha = $form.find("#g-recaptcha-response").val();
                    if (recaptcha === "") {
                        btn.attr("disabled", "false");
                        return false;
                    }
                }

                // Push Button Value as submited as normal from mvc
                jsonData[btn.attr("name")!] = btn.attr("value");


                if (options.formBtnName && options.formBtnValue)
                    jsonData[options.formBtnName] = options.formBtnValue;


                if (!options.data) options.data = {};
                $.each(jsonData, function (key, value) {
                    options.data[key] = value;
                });
                // options.data = jsonData;

            }

            var ajaxReqNew;
            var ajaxReqPrev: any;
            if (options.requestKey) ajaxReqPrev = this._ertaqyAjaxRequests[options.requestKey];

            ajaxReqNew = $.ajax({
                type: options.type,
                cache: options.cache,
                async: options.async,
                crossDomain: options.crossDomain,
                url: options.url,
                xhrFields: {
                    withCredentials: options.withCredentials
                },
                headers: {
                    "Accept": "*/*"
                    // "application/json",
                    // "Access-Control-Allow-Origin": "*" // '"' + _getUrlHost() + '"'// 
                    // "Access-Control-Allow-Credentials": "true"
                },
                data: options.data,
                dataType: options.dataType,
                contentType: options.contentType,
                beforeSend: function (xhr) {

                    if (this._ertaqyAjaxCounts == 0) { //  || _ertaqyAjaxAlertSlowMsg == null
                        // _ertaqyAjaxAlertSlowMsg = setTimeout(function(){$('.ertaqyAjaxSlowMsg').removeClass('hidden');}, 10000);
                    }
                    this._ertaqyAjaxCounts++;

                    if (btn) setTimeout(function () { btn.attr("disabled", "false"); }, 2000); // allow button again if loading takes time

                    // Stop Previous Request with same requestKey
                    if (ajaxReqPrev != undefined && ajaxReqPrev.readyState < 4) {
                        ajaxReqPrev.abort();
                        $('#ertaqy-chat-loader').length == 1 ? $('#ertaqy-chat-loader').fadeIn() : $('#ajax-loader').fadeIn();
                    }

                    if (options.beforeSend)
                        options.beforeSend(xhr);
                }
            })
                .done(function (data) {

                    if (options.log)
                        console.log('data= ' + data);

                    // Same Form Server Side Validation: form not cleared
                    if (options.formBtn && data.indexOf("<form ") != -1 && $form != undefined && data.indexOf("id=\"" + $form.attr("id") + "\" ") != -1) {
                        if (options.log) console.log('done but failed, modalKey: ' + options.modalKey);
                        if (options.notValid && options.notValid != null) {
                            options.paramData = data;
                            //if(options.resultFuncAwait && _isAsyncFunction(options.notValid))
                            //	await options.notValid(options);
                            //else
                            options.notValid(options);
                        }
                        return false;
                    }
                    else {

                        if (options.log) console.log('done success, modalKey: ' + options.modalKey);
                        if (options.success && options.success != null) {
                            options.paramData = data;
                            //if(options.resultFuncAwait && _isAsyncFunction(options.success))
                            //	await options.success(options);
                            //else
                            options.success(options);
                        }

                        if (options.downloadFile && options.downloadFile != '') {
                            var blob = new Blob([data]);
                            var link = document.createElement('a');
                            link.href = window.URL.createObjectURL(blob);
                            link.download = options.downloadFile;
                            link.click();
                        }

                    }
                })
                .fail(function (xhr, status, error) {
                    if (options.fail && options.fail != null) {
                        options.paramXhr = xhr;
                        options.paramStatus = status;
                        options.paramError = error;
                        //if(options.resultFuncAwait && _isAsyncFunction(options.fail))
                        //	await options.fail(options);
                        //else
                        options.fail(options);
                    }
                })
                .always(() => {

                    this._ertaqyAjaxCounts--;
                    if (this._ertaqyAjaxCounts == 0) { // lastone
                        $('.ertaqyAjaxSlowMsg').addClass('hidden');
                        clearTimeout(this._ertaqyAjaxAlertSlowMsg);
                        this._ertaqyAjaxAlertSlowMsg = null;
                    }

                    $('#ertaqy-chat-loader').length == 1 ? $('#ertaqy-chat-loader').fadeOut() : $('#ajax-loader').fadeOut();

                    if (btn) btn.attr("disabled", "false");
                    if (options.always && options.always != null) {
                        //if(options.resultFuncAwait && _isAsyncFunction(options.always))
                        //	await options.always(options);
                        //else
                        options.always(options);
                    }

                    if (options.requestKey) delete this._ertaqyAjaxRequests[options.requestKey]; // no need to call to abort again

                });


            // current request, to be checked next request if doublicated, before await when
            if (options.requestKey) this._ertaqyAjaxRequests[options.requestKey] = ajaxReqNew; // set current new ajaxRequest to allow abort in next call

            // await here instead of await ajax, to check dublicates in beforeStart
            await $.when(ajaxReqNew)
        }
    }
    // ____________________________________________________________________________
    public static _signalrSrvRemoveGroup = (groupName: any, type: any) => {
        console.log('_signalrSrvRemoveGroup --------------------' + groupName);
        if (this._signalrHub1) {
            var result = this._signalrHub1.server.removeGroup(groupName, type);
            delete this._signalrConnGroups[groupName];

            if (this._signalrLogging) console.log(result);
        } else {
            if (this._signalrLogging) console.log('signalr Hub is null');
        }
        // if(typeof(this.mobileCallback) != 'undefined' && mobileCallback.srGroupUnJoin != undefined)
        //     mobileCallback.srGroupUnJoin(groupName, type);
    }
    // _______________________________close all --- click Arrow_____________________________________________
    public static sideBarsclose(selector: any) {
        $('#modal_Sidebar_Container').remove()
        $('.sideBars-opened-list').css({
            left: '0px',
            display: 'none'
        });
        $('.sideBars-opened-list li:not(:first-child)').remove()
        $('.sideBars-opened').css('display',"none")
    }
    // ____________________________________________________________________________
    public static setActiveToLink(selector: any, container: any) {
        console.log(selector)
        console.log(container)
        var _parent = container == 'header' ? $('#header #primary-menu') : $('.sidebar #content-list');
        var _ct = container == 'header' ? selector : selector.parent();
        _parent.find('ul > li').each(function () {
            var ct2 = $(this);
            if (!ct2.hasClass('sub-menu')) {
                if (ct2.hasClass('opened')) {
                    ct2.removeClass('opened');
                    ct2.find('ul').slideUp();
                    ct2.find('ul li').removeClass('active');
                }
            }
        });
        _parent.find('ul li.active').removeClass('active');
        if (_ct.closest('li').hasClass('sub-menu')) {
            _ct.closest('li').addClass('opened');
            _ct.closest('li').find('ul').slideDown();
        }
        _ct.addClass('active');
    };
    // ____________________________________________________________________________ 
    public static calculateWidths() {
        var windowHeight = window.innerHeight;
        // var windowWidth = window.innerWidth;
        var windowWidth = document.documentElement.clientWidth || document.body.clientWidth;
        var scrollWidth = window.innerWidth - document.documentElement.clientWidth;

        var headerWidth = $("#header").outerWidth();
        var rtlOpenedHeaderWidth = 250;
        var ltrOpenedHeaderWidth = 260;
        var closedHeaderWidth = 43;

        if ($('#header').hasClass('openHeader'))
            headerWidth = $('body').hasClass('rtl') ? rtlOpenedHeaderWidth : ltrOpenedHeaderWidth;
        else
            headerWidth = window.innerWidth < 480 ? 0 : closedHeaderWidth;

        var topBarHeight = $(".top-bar").outerHeight();
        var pgTitHeight = $("#page-title").outerHeight();
        var topBarHeightAndpageTitleHeight = topBarHeight! + pgTitHeight!;
        var topBarHeightAndpageTitleHeightMinusFullHeight = windowHeight - topBarHeightAndpageTitleHeight;

        var sideMenuWidth = $(".side-menu").outerWidth();
        if ($('.side-menu').hasClass('operator-sidemenu'))
            sideMenuWidth = 220;
        else if ($('.side-menu').hasClass('deliver-sidemenu'))
            sideMenuWidth = 330;
        else if ($('.side-menu').hasClass('order-sidemenu'))
            sideMenuWidth = $('.side-menu').hasClass('opened') ? 500 : 0;

        var headerWidthMinusFullWidth = windowWidth - headerWidth;
        var headerWidthPlussideMenu = headerWidth + sideMenuWidth!;
        var fullWidthMinusHeaderWidthMinusSideMenuWidthMinusScrollWidth = windowWidth - sideMenuWidth! - headerWidth - scrollWidth;
        var fullWidthMinusHeaderWidthMinusScrollWidth = windowWidth - headerWidth - scrollWidth;

        $('#trigger-menu-sideMenu').css('top', topBarHeightAndpageTitleHeight);

        if (window.innerWidth < 992) {
            if ($('body').hasClass('rtl'))
                $('#content').css({ 'width': fullWidthMinusHeaderWidthMinusScrollWidth, 'margin-right': headerWidth });
            else
                $('#content').css({ 'width': fullWidthMinusHeaderWidthMinusScrollWidth, 'margin-left': headerWidth });
            $('.side-header:not(.open-header) #wrapper').css({ 'margin-left': '0', 'margin-right': '0' });
        }
        if (window.innerWidth > 991) {
            $('#content').css({ 'width': 'auto', 'margin-right': '0' });
            $('.ltr.side-header:not(.open-header) #wrapper').attr('style', 'margin-left: ' + headerWidth + 'px !important');
            $('.rtl.side-header:not(.open-header) #wrapper').attr('style', 'margin-right: ' + headerWidth + 'px !important');
        }
        if (window.innerWidth < 768) {
            $('#trigger-menu-sideMenu').removeClass('openedSidebar').addClass('closedSidebar');
            $('.side-menu').removeClass('opened').addClass('closed');
            $('.ltr #trigger-menu-sideMenu i').removeClass('fa-arrow-left').addClass('fa-arrow-right');
            $('.rtl #trigger-menu-sideMenu i').removeClass('fa-arrow-right').addClass('fa-arrow-left');
            $('.ltr #trigger-menu-sideMenu').css({ 'border-radius': '0 2px 2px 0', 'left': headerWidth });
            $('.rtl #trigger-menu-sideMenu').css({ 'border-radius': '2px 0 0 2px', 'right': headerWidth });
            $('.ltr .side-menu').css('left', '0');
            $('.rtl .side-menu').css('right', '0');

            var fullWidthMinusHeaderWidthMinusScrollWidth = windowWidth - headerWidth - scrollWidth;			//sideMenuWidth = 0
            $('.postcontent').css('width', fullWidthMinusHeaderWidthMinusScrollWidth);
            $('.ertaqy-comms-popup').css('width', windowWidth);
        }
    }
    public static showTickets(this: any){
        var ticketNum = $(this).closest('tr').find('td.col-request .request-details .ticketNo').text();
        console.log(ticketNum + "ticketNum ticketNum ticketNum")
        var ticketId = $(this).attr('id');
        var contactId = $(this).closest('tr').attr('contact-id');
        var contactName = $(this).closest('tr').find('.col-contact-details .contact-info span').text();
        var taskId = UrlRequestService._uuidv4();
        var templateId = $(this).closest('tr').attr('template-id');
        var typeparentId = $(this).closest('tr').attr('type-id');
        UrlRequestService.openTicketDetailsSideBar(ticketNum, ticketId, contactId, contactName, taskId, templateId, typeparentId);
}
    // ____________________________________________________________________________ 
    public static Create_Layout_Sidebar(options:any){
        if ($('#' + options.ModalId).length == 0) {
            if ($('#modal_Sidebar_Container').length === 0){
                $('#wrapper').append('<div id="modal_Sidebar_Container"></div>')
            }
            $('#modal_Sidebar_Container').append(`${options.modalSidebar(options.ModalId)}`);
        }
    }
    // ____________________________________________________________________________ 
    public static openModalSidebar(options: any) {
        if (options.modalKey)
            this.openModalSidebarModals[options.modalKey] = options;
        if (options.event && $(options.event.currentTarget)) {
            $(options.event.currentTarget).on('click',this.do_nothing);
            setTimeout(() => {
                $(options.event.currentTarget).off('click', this.do_nothing);
            }, 700);
        }
        //---------------------Create Layout Of SideBar----------------------------
        this.Create_Layout_Sidebar(options)
        //-------------------------------------------------
        if (options.title)
            $('#' + options.ModalId + ' .modal-sidebar-title span').html(options.title);
        if (options.size)
            $('#' + options.ModalId).attr('size', options.size);
        if ($('.employee-payroll-tabs').length == 1)
            $('.employee-payroll-tabs').css('left', $('#sidebar-emp-payroll').width()!);
        if (options.ModalCssClass)
            $('#' + options.ModalId).addClass(options.ModalCssClass);
        if (options.RemoveContent == undefined)
            options.RemoveContent = true;
        $('#' + options.ModalId).attr('remove-content', options.RemoveContent);
        if (options.sideBarsList == undefined)
            options.sideBarsList = false;
        $('#' + options.ModalId).attr('list', options.sideBarsList);
        if (options.SetOverlay == undefined)
            options.SetOverlay = true;
            $('.sideBars-opened-list').css('display','none')
        if (options.tabs == undefined)
            options.tabs = true;
        if (options.alwaysFunctionExcute == undefined)
            options.alwaysFunctionExcute = true;
        if ($('#' + options.ModalId + ' .modal-sidebar-content').html() != '') {
            if (options.alwaysFunction1 && options.alwaysFunctionExcute == true)
                options.alwaysFunction1(options);

    // ------------------------------------------------------Show Tickits------------------------------------------------------
            // ---------------------(old tickits) after get tickets from server ---------------------------
            if (options.sideBarsList) {
                console.log(" ifififififififififififififif")
                //after get tickits from server(second click)  when click eye btn 
                //ModalId_Selecteor filter array _sideBarsOpenedArray contains modal-id of <a> tickit    
                var ModalId_Selecteor = this._sideBarsOpenedArray.filter((e: any) => $(`a[modal-id="${e}"]`)?.text() === options.ModalName)
                //get parent of <a> tickit (li) and set its class to active
                $(`a[modal-id="${ModalId_Selecteor}"]`).parent().addClass("active")
                let Not_ModalId_Selecteor = this._sideBarsOpenedArray.filter((e: any) => $(`a[modal-id="${e}"]`)?.text() !== options.ModalName)
                Not_ModalId_Selecteor.forEach((element: any) => {
                    $(`a[modal-id="${element}"]`).parent().removeClass("active")
                });
                Not_ModalId_Selecteor.forEach((element: any) => {
                    $(`#${element}`).css('display', "none");
                });
                $(`a[modal-id="${ModalId_Selecteor}"]`).parent().addClass('shadow');
                $('#modal_Sidebar_Container').css('display','block')
                $('.sideBars-opened-list').css('display','block')
            }
        } else {
            // ---------------------get new tickets from server ---------------------------
            
            if(options.selecElement!.attr('action-mode') !== "sidebar1" || options.selecElement.attr('action-mode') == undefined){
                this._sideBarsOpenedArray.push(options.ModalId);
                this._sideBarsOpenedArray = this._sideBarsOpenedArray.filter((value: any, index: any, self: any) => {
                    return self.indexOf(value) === index;
                });
                console.log("elseelseelseelseelseelseelseelseelseelseelse")
                // var newDiv = $('<div></div>');
                // newDiv.attr('class', 'sideBars-opened-list');
                // $('#').append(newDiv);
                $('.sideBars-opened-list li').not(':first').removeClass('active')
                $('.sideBars-opened-list').append('<li class="active"><a href="javascript:void(0);" modal-id="' + options.ModalId + '">' + options.ModalName + '</a><a href="javascript:void(0);" class="_close">x</a></li>');
                if(`$(${options.ModalId})` === 'header-mode-sidebar' && options.SetOverlay == true){
                    $('.sideBars-opened-list').css('display', 'none');   
                }else{
                    $('.sideBars-opened-list').css({
                        'display': 'block',
                        'left': '1008px'
                    });   
                }

                let Not_ModalId_Selecteor = this._sideBarsOpenedArray.filter((e: any) => $(`a[modal-id="${e}"]`)?.text() !== options.ModalName)
                Not_ModalId_Selecteor.forEach((element: any) => {
                    $(`#${element}`).css('display', "none");
                });
                Not_ModalId_Selecteor.forEach((element: any) => {
                    $(`a[modal-id="${element}"]`).parent().removeClass('shadow');
                });
                $('.sideBars-opened-list').attr('sideBars-opened-ids', this._sideBarsOpenedArray);
                $('#modal_Sidebar_Container').css('display','block')
            }
    // ------------------------------------------------------Get data From Server------------------------------------------------------
    if (options.url) {
        options.type = "POST";
        options.requestKey = options.ModalId;
        this.Request(options);

        options.done()
        options.always = function (alwaysOptions: any) {
            if (options.alwaysFunction1)
                options.alwaysFunction1(options);

            if (options.tabs) {
                if ($('.tabs .nav li')) {
                    $('.tabs .nav li').off('click');
                    $('#' + options.ModalId + ' .tabs .nav li').click(function () {
                        if ($(this).hasClass('disabled'))
                            return false;
                        var tabsId = $(this).closest('.tabs').attr('id');
                        $('#' + options.ModalId + ' .tabs[id="' + tabsId + '"] ul li.active').removeClass('active');
                        $('#' + options.ModalId + ' .tabs[id="' + tabsId + '"] .tab-content .tab-pane.active').removeClass('active');
                        $(this).addClass('active');
                        $('#' + options.ModalId + ' .tabs[id="' + tabsId + '"] .tab-content .tab-pane[id=tabs-' + $(this).attr('type') + ']').addClass('active');
                    });
                }
            }
        };
        // ____________________________
        // ____________________________
    }
    else {
        if (options.alwaysFunction11)
            options.alwaysFunction11(options)
    }   
        }
    // ------------------------------------------------------Zindex------------------------------------------------------
        // $('#' + options.ModalId + ' .modal-sidebar-close i').unbind('click');
        // $('#' + options.ModalId + ' .modal-sidebar-close i').click(() => {
        //     this.modalSidebarClose($(this));
        // });

        // get z-index value of prev modals before append new modal
        var modalZindex, modalZindexArray: any = [];
        $('.modal-sidebar').each(function () {
            modalZindexArray.push($(this).css('z-index'))
        });
        modalZindex = Math.max.apply(Math, modalZindexArray);
        // $('#' + options.ModalId).show('slide', { direction: dir }, 500);
        $('#' + options.ModalId).show();
        $('#' + options.ModalId).css('z-index', modalZindex + 1);
        if (options.SetOverlay == true)
            $('.body-overlay').addClass('appear sidebar');
        // if tabs allowed
       
    }
    // ____________________________________________________________________________
    public static _drawInContentSidebar(options: any) {
        options.type = "POST";
        options.done = (options: any) => {
            //             if(options.title){
            //                 $('#page-title h1').text(options.title);
            //                 $('#page-title .breadcrumb li.active').text(options.title);
            //             }

            //             if(options.afterDone)
            //                 options.afterDone(options);
            //             else{
            //                 /* if(drawOptions.orderStatus)
            //                     getUrlForPushState(drawOptions.action, drawOptions.title, drawOptions.orderStatus);
            //                 else */
            //                 this.getUrlForPushState(options.url, options.title);
            //             }

            $('.content-wrap .sidebar .sidebar-widgets-wrap').html('').append(options.paramData);
            $('.content-wrap .postcontent > div').html('');
            $('.content-wrap').attr('current-page-url', options.action);
            // this.ertaqyLiveChatPopupHide();
            // this.setActiveToLink(options.selecElement, options.ParentSelector);
            // linkQueryStrEdit('.sidebar #content-list');

            //             if($('.orderDetails-container').length == 0){
            //                 $('#page-title .prevOrdersList').remove();
            //                 $('#page-title h1').css('position','unset');
            //             }

            //             if($('.sidebar #content-list').length == 1){
            //                 $('.sidebar #content-list ul li').each(function(){
            //                     var ct = $(this);
            //                     if(ct.find('a').attr('action') == '')	
            //                         ct.addClass('disabled');
            //                 });
            // // ___________________________WHEN CLICK SIDE-MENU LINKS___________________________
            //                 $('.sidebar #content-list ul li a').unbind('click');
            //                 $('.sidebar #content-list ul li a').on("click", (event) =>{
            //                     var ct = $(this);
            //                     if(!ct.parent().hasClass('disabled') && ct.attr('action') != ''){
            //                         ct.closest('ul').find('li.active').removeClass('active');
            //                         ct.parent().addClass('active');
            //                         // loadReportContent(event);
            //                         urlRequestOptions.LoadFromElement(ct);
            //                     }
            //                 });
            // // ___________________________ADD DISABLED SIDE-MENU LINKS___________________________
            //                 $('.sidebar #content-list ul li').each(() =>{
            //                     var ct = $(this);
            //                     ct.find('i.disabled').closest('li').addClass('disabled');
            //                     ct.find('i.disabled').removeClass('disabled');
            //                 });

            urlRequestOptions.LoadFromElement($('.sidebar #content-list ul li:first-child a'));
            // $('.sidebar #content-list ul li:first-child a').click();



            /* if($('#content-list').length > 0 && $('#content-list').hasClass('side-menu')){
                $('#content-list li a i.disabled').closest('li').addClass('disabled');
            } */
            // calculatesForSalesBillOrder();
            this.calculateWidths();
            // if($(' .sideBarLeftL1').css('display') == 'block') 
            //     this.sideBarLeftClose(); commented
            // if(drawOptions.parentType == 'header')
            // setActiveToLink(drawOptions.ct, drawOptions.parentType);
        }
        this.Request(options)
    }
    // ____________________________________________________________________________

    // ____________________________________________________________________________
    public static openTicketDetailsSideBar(ticketNum: any, ticketId: any, contactId: any, contactName: any, taskId: any, templateId: any, typeparentId: any) {
        urlRequestOptions.title = ($('body').hasClass('rtl') ? 'تذكرة ' : 'Ticket') + ticketNum;
        urlRequestOptions.size = 'xlg';
        urlRequestOptions.ModalCssClass = 'sideBarLeftL1';
        urlRequestOptions.RemoveContent = false;
        urlRequestOptions.ModalId = 'sidebar-ticket-' + ticketId;
        urlRequestOptions.ModalName = ticketNum;
        urlRequestOptions.SetOverlay = false;
        urlRequestOptions.sideBarsList = true;
        urlRequestOptions.url = this.getPnlUrlPrefix() + "tickets/search/details?details-id=" + ticketId;
        urlRequestOptions.TicketId = ticketId;
        urlRequestOptions.contactId = contactId;
        urlRequestOptions.contactName = contactName;
        urlRequestOptions.taskId = taskId;
        urlRequestOptions.templateId = templateId;
        urlRequestOptions.typeparentId = typeparentId;
        // urlRequestOptions.SuccessTriggerEvent = this.loadCallcenterAssistantSuccessTrigger;
        // urlRequestOptions.alwaysFunction1 = this.afterLoadTicketDetailsInSideBar;		// function in cms_custom.js
        urlRequestOptions.done = function () {
            // Container Selector
            console.log(" urlReqOptions.done good")
            urlRequestOptions.Container = new UrlRequestContainer();
            urlRequestOptions.Container.ParentSelector = $('#' + urlRequestOptions.ModalId + ' .modal-sidebar-content')
            urlRequestOptions.Container.Type = UrlRequestContainerTypes.SideBar;
            urlRequestOptions.Container?.ParentSelector?.html('').append(urlRequestOptions.paramData);
            $('.content-wrap').attr('current-page-url', urlRequestOptions.url);

        }
        this.openModalSidebar(urlRequestOptions);
    }
}








