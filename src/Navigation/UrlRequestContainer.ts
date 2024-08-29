
export class UrlRequestContainer {
    Selector: any;

    constructor() {
        this.Tabs = false;
        this.Overlay = false;
        this.ClearContent = true;
        this.Type = UrlRequestContainerTypes.SideBar;
        // this.Method = NavOptionsMethods.Get;
        this.ZIndex = 100;
        this.Size = '';
        this.ModalCssClass = ''
        this.ModalId = ''
        this.event = ''
    }
    public ct: any;
    public Type: UrlRequestContainerTypes;
    public ParentSelector?: JQuery<HTMLElement>;

    // public Method : NavOptionsMethods;
    public Title?: string;
    public Url?: string;
    public Tabs: boolean;
    public Overlay: boolean;
    public ZIndex: Number;
    public ClearContent: boolean;
    public Size: any;
    public ModalCssClass:any
    public ModalId:any
    public event:any


    // ...
}

export enum UrlRequestContainerTypes {
    SideBar = 1,
    Content,
    PostContent,
    ContentSideBar,
    Popup,
    TopHeader
}

