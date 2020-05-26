/**
 * Infracamp's Kasimir Http Request
 *
 * Ajax Request library
 *
 * Repository: https://github.com/kasimirjs/kasmimir-http-request
 *
 * @see https://infracamp.org/project/kasimir
 * @author Matthias Leuffen <m@tth.es>
 */
function ka_build_query_str(t){let o=encodeURIComponent;return Object.keys(t).map(e=>o(e)+"="+o(t[e])).join("&")}function ka_parse_query_str(t){let o=t.split("&"),e={};for(let t of o){if(""===t)continue;let o=t.split("=");e[decodeURIComponent(o[0])]=decodeURIComponent(o[1])}return e}function ka_interval(t,o,e){}class KaInterval{setActive(t){}isActive(){}}class KaRoute{constructor(){this.__options={}}static get options(){void 0===this.prototype.__options&&(this.prototype.__options=ka_parse_query_str(location.hash.slice(1)));let t=null,o={set:(o,e,s,i)=>(o[e]=s,null!==t&&(window.clearTimeout(t),t=null),t=window.setTimeout(t=>{location.hash=ka_build_query_str(this.prototype.__options)},10),!0),get:(t,e)=>"object"==typeof t[e]&&null!==t[e]?new Proxy(t[e],o):t[e]};return new Proxy(this.prototype.__options,o)}static set options(t){this.prototype.__options=t,location.hash=ka_build_query_str(this.prototype.__options)}static onOptionChange(t,o){void 0===this.prototype.callbacks&&(this.prototype.callbacks={},window.addEventListener("hashchange",t=>{this.prototype.__options=ka_parse_query_str(location.hash.slice(1));for(let t in this.prototype.callbacks)this.prototype.callbacks.hasOwnProperty(t)&&this.prototype.callbacks[t](this.options)})),this.prototype.callbacks[t]=o}}function ka(t){return document.getElementById(t)}