import { UrlRequestService } from "./Navigation/UrlRequestService.js";
import { UrlRequestOptions } from "./Navigation/UrlRequestOptions.js";
import "./Navigation/strings.js";
var urlReqOptions = new UrlRequestOptions();
//  ________________________________________ Chose Modes When Click______________________________________________________
// --------------------Remove old version click--------------------
$('#primary-menu li, #content-list ul li a').off('click');
// --------------------Add new version click--------------------
$('#primary-menu li, #content-list ul li a').on('click', function (event) {
    event.stopPropagation();
    var actionMode = $(this).attr('action-mode');
    urlReqOptions.log = true;
    urlReqOptions.LoadFromElement(this);
    urlReqOptions.done = function () {
        var _a, _b;
        // Container Selector
        console.log(" urlReqOptions.done good");
        (_b = (_a = urlReqOptions.Container) === null || _a === void 0 ? void 0 : _a.ParentSelector) === null || _b === void 0 ? void 0 : _b.html('').append(urlReqOptions.paramData);
        $('.content-wrap').attr('current-page-url', urlReqOptions.url);
    };
    // --------------------Chose Modes which function will trigger according to Modes--------------------
    if (urlReqOptions.url.isNullOrEmpty())
        return;
    if (actionMode == "draw-main-content") {
        UrlRequestService.Request(urlReqOptions);
    }
    if (actionMode == "sidebar1") {
        console.log("First ____________render app if actionMode == sidebar1");
        UrlRequestService.openModalSidebar(urlReqOptions);
    }
    if (actionMode == "draw-in-sidebar") {
        UrlRequestService._drawInContentSidebar(urlReqOptions);
    }
    setInterval(() => {
        event.stopPropagation();
        $('.postcontent #tickets-search .ticketDetails').off('click');
        $('.postcontent #tickets-search .ticketDetails').on('click', UrlRequestService.showTickets);
    }, 1000);
    setInterval(function () {
        $(".sideBars-opened").off("click");
        $(".sideBars-opened").on("click", () => {
            $('#modal_Sidebar_Container').css("display", "block");
            $('.sideBars-opened-list').css("display", "block");
        });
    }, 1000);
    //  ________________________________________ All close ______________________________________________________
    // -----------------close by arrow-----------------
    setInterval(function () {
        $('.modal-sidebar-close').off('click');
        $('.modal-sidebar-close').on("click", function () {
            $("#modal_Sidebar_Container").css("display", "none");
            $(".sideBars-opened-list").css("display", "none");
            $(".sideBars-opened").css("display", "block");
        });
    }, 1000);
    // -----------------close X mark-----------------
    if ($('.sideBars-opened-list li a').hasClass('closeAll')) {
        setInterval(() => {
            $('.closeAll').off('click');
            $(".closeAll").on("click", () => {
                UrlRequestService.sideBarsclose($(this));
            });
        }, 1000);
    }
    // -----------------Close by Overlay-----------------
    $('.body-overlay').off('click');
    $('.body-overlay').on("click", function () {
        var selector = $(this);
        if (selector.hasClass('sidebar')) {
            if ($('.modal-sidebar').filter(function () { return $(this).css('display') == 'block'; }).length == 1)
                UrlRequestService.modalSidebarClose($('.modal-sidebar[style*="display: block;"] .modal-sidebar-close'));
            else
                UrlRequestService.modalSidebarClose($('.modal-sidebar:last-of-type .modal-sidebar-close'));
        }
        if (selector.hasClass('header')) {
            $('#header').removeClass('openHeader').addClass('closeHeader');
            $('#header').css('width', '0');
            selector.attr('class', 'body-overlay');
        }
        console.log(selector);
    });
});
