// --------------------------extention function----------------------------------
interface String {
  toProperCase(): string;
  EncodeHtml(): string;
  bool(): boolean;
  endsWith(pattern:string): boolean;
  isNullOrEmpty(): boolean;
  _htmlDecode(html:any): any;
  EncodeHtml(html:any): any;
}
// --------------------------extention function----------------------------------
String.prototype.toProperCase = function (): string {
  return this.toLowerCase().replace(/\b\w/g, (c: string) => c.toUpperCase())
}
String.prototype.bool = function (): boolean {
  return this.toLowerCase() == 'true';
};
String.prototype.endsWith = function (pattern:string): boolean {
      //return this.match(pattern+'$') == null ? true : false;
      var d = this.length - pattern.length;
      return d >= 0 && this.lastIndexOf(pattern) === d;
};
String.prototype.isNullOrEmpty = function (): boolean {
  return (!this || this == undefined || this.length === 0 );
}
String.prototype.EncodeHtml = function (): string {
  return this
      // .replace(/\\/g, "\\\\")
      // //.replace(/{/g, '\\{')
      // //.replace(/}/g, '\\}')
      // //.replace(/:/g, '\\:')
      // .replace(/"/g, '\\"')
      // .replace(/'/g, "\\'")
      // .replace(/\//g, "\\/")
      // .replace(/\f/g, "\\f")
      // //.replace(/\b/g, "\\b")
      // .replace(/\t/g, "\\t")
      // .replace(/\r/g, "\\r")
      // .replace(/\n/g, "\\n")
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/:/g, '&colon;')
      .replace(/{{/g, '{ { ')
      .replace(/}}/g, ' } }')
      .replace(/\[\[/g, '[ [ ')
      .replace(/\]\]/g, ' ] ]')
      ////.replace(/&/g, "\\&")
      ;

}
String.prototype._htmlDecode = function(html:any) {
	
	// return $('<div/>').html(html).text();

	return html
		//.replace(/\\&/g, "&")

		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&colon;/g, ':')

		.replace(/{ { /g, '{{')
		.replace(/ } }/g, '}}')

		.replace(/\[ \[ /g, '[[')
		.replace(/ \] \]/g, ']]')

		// .replace(/&#91;/g, '[')
		// .replace(/&#93;/g, ']')
		
		// .replace(/\\n/g, "\n")
		// .replace(/\\r/g, "\r")
		// .replace(/\\t/g, "\t")
		
		// //.replace(/\\b/g, "\b")
		// .replace(/\\f/g, "\f")
		// .replace(/\\\//g, "/")
		// .replace(/\\'/g, "'")
		// .replace(/\\"/g, '"')

		// // .replace(/\\:/g, ':')
		// //.replace(/\\{/g, '{')
		// //.replace(/\\}/g, '}')

		// .replace(/\\\\/g, "\\");
		;		
		
}


