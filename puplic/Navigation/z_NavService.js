import { UrlRequestOptions } from "./UrlRequestOptions.js";
export class NavService {
    constructor() {
        // ajaxService = new UrlRequestService()
        this.ajaxOptions = new UrlRequestOptions();
    }
    Load(options) {
        console.log(options);
        // this.ajaxService.Request(this.ajaxOptions)
        // ... ertaqy ajax code here
    }
}
