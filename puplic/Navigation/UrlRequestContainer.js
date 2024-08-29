export class UrlRequestContainer {
    constructor() {
        this.Tabs = false;
        this.Overlay = false;
        this.ClearContent = true;
        this.Type = UrlRequestContainerTypes.SideBar;
        // this.Method = NavOptionsMethods.Get;
        this.ZIndex = 100;
        this.Size = '';
        this.ModalCssClass = '';
        this.ModalId = '';
        this.event = '';
    }
}
export var UrlRequestContainerTypes;
(function (UrlRequestContainerTypes) {
    UrlRequestContainerTypes[UrlRequestContainerTypes["SideBar"] = 1] = "SideBar";
    UrlRequestContainerTypes[UrlRequestContainerTypes["Content"] = 2] = "Content";
    UrlRequestContainerTypes[UrlRequestContainerTypes["PostContent"] = 3] = "PostContent";
    UrlRequestContainerTypes[UrlRequestContainerTypes["ContentSideBar"] = 4] = "ContentSideBar";
    UrlRequestContainerTypes[UrlRequestContainerTypes["Popup"] = 5] = "Popup";
    UrlRequestContainerTypes[UrlRequestContainerTypes["TopHeader"] = 6] = "TopHeader";
})(UrlRequestContainerTypes || (UrlRequestContainerTypes = {}));
