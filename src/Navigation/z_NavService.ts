import { UrlRequestContainer } from "./UrlRequestContainer.js";
import { UrlRequestOptions } from "./UrlRequestOptions.js";

export class NavService {
    constructor() {
    }
    // ajaxService = new UrlRequestService()
    ajaxOptions = new UrlRequestOptions()
    public Load(options: UrlRequestContainer):void {
        console.log(options);
        // this.ajaxService.Request(this.ajaxOptions)
        // ... ertaqy ajax code here
    }
}