declare namespace JQueryValidation {
    interface ValidatorStatic {
        unobtrusive: {
            parse(element: JQuery | Element): void;
        };
    }
}

interface JQueryStatic {
    validator: JQueryValidation.ValidatorStatic;
}
