
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
function ka_build_query_str(t){let o=encodeURIComponent;return Object.keys(t).map(e=>o(e)+"="+o(t[e])).join("&")}function ka_parse_query_str(t){let o=t.split("&"),e={};for(let t of o){if(""===t)continue;let o=t.split("=");e[decodeURIComponent(o[0])]=decodeURIComponent(o[1])}return e}function ka_empty(t){return null==t||""===t||Array.isArray(t)&&0===t.length}function ka_interval(t,o,e){}class KaInterval{setActive(t){}isActive(){}}class KaRoute{constructor(){this.__options={}}static get options(){void 0===this.prototype.__options&&(this.prototype.__options=ka_parse_query_str(location.hash.slice(1)));let t=null,o={set:(o,e,n,s)=>(o[e]=n,null!==t&&(window.clearTimeout(t),t=null),t=window.setTimeout(t=>{location.hash=ka_build_query_str(this.prototype.__options)},10),!0),get:(t,e)=>"object"==typeof t[e]&&null!==t[e]?new Proxy(t[e],o):t[e]};return new Proxy(this.prototype.__options,o)}static set options(t){this.prototype.__options=t,location.hash=ka_build_query_str(this.prototype.__options)}static onOptionChange(t,o){void 0===this.prototype.callbacks&&(this.prototype.callbacks={},window.addEventListener("hashchange",t=>{this.prototype.__options=ka_parse_query_str(location.hash.slice(1));for(let t in this.prototype.callbacks)this.prototype.callbacks.hasOwnProperty(t)&&this.prototype.callbacks[t](this.options)})),this.prototype.callbacks[t]=o}}function ka(t){let o=document.getElementById(t);if(null===o)throw`Element id '${t}' not found`;return o}/**
 * Infracamp's Kasimir Templates
 *
 * A no-dependency render on request
 *
 * @licence
 * @see https://infracamp.org/project/kasimir
 * @author Matthias Leuffen <m@tth.es>
 */
class KtHelper{keval(stmt,__scope,e,__refs){const reserved=["var","null","let","const","function","class","in","of","for","true","false","await","$this"];let r="var $this = e;";for(let e in __scope)-1===reserved.indexOf(e)&&(r+=`var ${e} = __scope['${e}'];`);void 0===__scope.$scope&&(r+="var $scope = __scope;");try{return eval(r+stmt)}catch(t){throw console.error("cannot eval() stmt: '"+stmt+"': "+t+" on element ",e,"(context:",__scope,")"),"eval('"+stmt+"') failed: "+t}}scopeEval($scope,selector,elem){const reserved=["var","null","let","const","function","class","in","of","for","true","false","await","$this"];let r="var $this = elem;";for(let e in $scope)-1===reserved.indexOf(e)&&(r+=`var ${e} = $scope['${e}'];`);var __val=null;let s=`__val = ${selector};`;try{eval(r+s)}catch(e){throw console.error(`scopeEval('${s}') failed: ${e} on`,elem),`eval('${s}') failed: ${e}`}return __val}unindentText(e){let t=e.match(/\n(\s*)/m)[1];return e=(e=e.replace(new RegExp(`\n${t}`,"g"),"\n")).trim()}}var _KT_ELEMENT_ID=0;class KtRenderable extends HTMLTemplateElement{constructor(){super(),this._hlpr=new KtHelper,this._els=null,this._attrs={debug:!1},this._ktId=++_KT_ELEMENT_ID}attributeChangedCallback(e,t,s){this._attrs[e]=s}_log(e,t,s){let n=[this.constructor.name+"#"+this.id+"["+this._ktId+"]:"];for(let e of arguments)n.push(e);!1!==this._attrs.debug&&console.log.apply(this,n)}renderRecursive(e,t){if(e.hasOwnProperty("_kaMb")&&e._kaMb!==this._ktId)return;let s=null;if(e instanceof HTMLElement&&e.hasAttribute("*ref")){let n=e.getAttribute("*ref");s=t.$ref[n],t.$ref[n]=e}if(e instanceof HTMLElement&&e.hasAttribute("*id")&&(e.id=e.getAttribute("*id")),"function"!=typeof e.render){for(let s of e.childNodes){if(!0===e.ktSkipRender)return;this.renderRecursive(s,t)}null!=s&&"function"==typeof s.resolve&&s.resolve(e)}else e.render(t)}_removeNodes(){if(null!==this._els){for(let e of this._els)"function"==typeof e._removeNodes&&e._removeNodes(),null!==this.parentElement&&this.parentElement.removeChild(e);this._els=null}}_appendElementsToParent(e){void 0===e&&(e=this.nextSibling);let t=this.content.cloneNode(!0);this._els=[];for(let e of t.children)e._kaMb=this._ktId,this._els.push(e);this.parentElement.insertBefore(t,e)}}class KtTemplateParser{_parseTextNode(e,t){let s=e.split(/(\{\{|\}\})/);for(;s.length>0&&(t.appendChild(new Text(s.shift())),0!==s.length);){s.shift();let e=new KaVal;e.setAttribute("stmt",s.shift().trim()),s.shift(),t.appendChild(e)}}parseRecursive(e){if(e instanceof DocumentFragment){for(let t of e.children)this.parseRecursive(t);return}if("SCRIPT"===e.tagName)return;if("function"!=typeof e.getAttribute)return;if(!0===e.ktParsed)return;e.ktParsed=!0;for(let t of e.childNodes){if(void 0===t.data)continue;let e=new DocumentFragment;this._parseTextNode(t.data,e),t.replaceWith(e)}if(e.hasAttribute("*for")){let t=document.createElement("template",{is:"ka-loop"}),s=e.getAttribute("*for"),n=e.cloneNode(!0);t.content.appendChild(n);let r=s.match(/let\s+(\S*)\s+(in|of|repeat)\s+(\S*)(\s+indexby\s+(\S*))?/);if(null===r)throw"Cannot parse *for='"+s+"' for element "+e.outerHTML;t.setAttribute("formode",r[2]),t.setAttribute("forselect",r[3]),t.setAttribute("fordata",r[1]),void 0!==r[5]&&t.setAttribute("foridx",r[5]),e.hasAttribute("*foreval")&&t.setAttribute("foreval",e.getAttribute("*foreval")),e.replaceWith(t),e=n}if(e.hasAttribute("*if")){let t=document.createElement("template",{is:"kt-if"}),s=e.getAttribute("*if"),n=e.cloneNode(!0);t.content.appendChild(n),t.setAttribute("stmt",s),e.replaceWith(t),e=n}let t=[],s=null,n=[],r={},i=[],o=new RegExp("^\\[(.+)\\]$");for(let l of e.getAttributeNames()){let a=o.exec(l);if(null===a)continue;let h=a[1].split(".");if(1===h.length)n.push(`'${h[0]}': `+e.getAttribute(l));else switch(h[0]){case"classlist":if(""===h[1]){s=e.getAttribute(l);continue}t.push(`'${h[1]}': `+e.getAttribute(l));break;case"on":r[h[1]]=e.getAttribute(l);break;case"style":i.push(`'${h[1]}': `+e.getAttribute(l));break;default:console.warn("Invalid attribute '"+l+"'")}}if(n.length>0||t.length>0||null!==s||Object.keys(r).length>0||i.length>0){let o=document.createElement("template",{is:"kt-maintain"}),l=e.cloneNode(!0);o.content.appendChild(l),n.length>0&&l.setAttribute("kt-attrs","{"+n.join(",")+"}"),i.length>0&&l.setAttribute("kt-styles","{"+i.join(",")+"}"),null!==s?l.setAttribute("kt-classes",s):t.length>0&&l.setAttribute("kt-classes","{"+t.join(",")+"}"),Object.keys(r).length>0&&l.setAttribute("kt-on",JSON.stringify(r)),e.replaceWith(o),e=l}for(let t of e.children)this.parseRecursive(t)}}function ka_tpl(e){if(e instanceof KaTpl)return e;let t=document.getElementById(e);if(t instanceof KaTpl)return t;throw`Selector '${e}' is not a <template is="ka-tpl"> element`}var KT_FN={"kt-classes":function(e,t,s){"use strict";let n=(new KtHelper).scopeEval(s,t,e);for(let t in n)n.hasOwnProperty(t)&&(!0===n[t]?e.classList.add(t):e.classList.remove(t))},"kt-styles":function(e,t,s){"use strict";let n=(new KtHelper).scopeEval(s,t,e);for(let t in n)n.hasOwnProperty(t)&&(null===n[t]?e.style.removeProperty(t):e.style.setProperty(t,n[t]))},"kt-attrs":function(e,t,s){let n=(new KtHelper).scopeEval(s,t,e);for(let t in n)n.hasOwnProperty(t)&&(null!==n[t]&&!1!==n[t]?e.setAttribute(t,n[t]):e.removeAttribute(t))},"kt-on":function(e,t,s){let n=new KtHelper,r={...s};r.$scope=s;let i=JSON.parse(t);for(let t in i)e["on"+t]=(s=>(n.keval(i[t],r,e),!1))}};class KaInclude extends KtRenderable{constructor(){super(),this._attrs={src:null,auto:null,raw:null,debug:!1}}static get observedAttributes(){return["src","debug","auto","raw"]}_importScritpRecursive(e){let t=e instanceof HTMLTemplateElement?e.content.childNodes:e.childNodes;for(let e of t){if("SCRIPT"!==e.tagName){this._importScritpRecursive(e);continue}let t=document.createElement("script");t.innerHTML=e.innerHTML,e.replaceWith(t)}}_loadDataRemote(){let e=new XMLHttpRequest;e.open("GET",this._attrs.src),e.onreadystatechange=(()=>{if(4!==e.readyState);else{if(e.status>=400)return void console.warn("Can't load '"+this.params.src+"': "+e.responseText);if(this.innerHTML=e.responseText,null!==this._attrs.raw){(new KtTemplateParser).parseRecursive(this.content)}this._importScritpRecursive(this.content),this._appendElementsToParent();for(let e of this._els)this._log("trigger DOMContentLoaded event on",e),e.dispatchEvent(new Event("DOMContentLoaded"))}}),e.send()}disconnectedCallback(){for(let e of this._els)this.parentElement.removeChild(e)}connectedCallback(){null!==this.getAttribute("auto")&&("loading"===document.readyState?document.addEventListener("DOMContentLoaded",()=>{this._loadDataRemote()}):this._loadDataRemote())}render(e){null===this._els&&this._appendElementsToParent()}}customElements.define("ka-include",KaInclude,{extends:"template"});class KaLoop extends KtRenderable{constructor(){super(),this._origSibling=!1,this._attrs={forselect:null,formode:null,foridx:null,fordata:null,foreval:null},this._els=[]}static get observedAttributes(){return["forselect","foridx","fordata","foreval","formode"]}_appendElem(){let e=this.content.cloneNode(!0),t=[];for(let s of e.children)s._kaMb=this._ktId,t.push(s);for(let e=0;e<t.length;e++)this.parentElement.insertBefore(t[e],this._origSibling);this._els.push({node:t})}_maintainNode(e,t){this._els.length<e+1&&this._appendElem(),null!==this._attrs.foridx&&(t[this._attrs.foridx]=e),null!==this._attrs.foreval&&this._hlpr.keval(this._attrs.foreval,t,this);for(let s of this._els[e].node)this.renderRecursive(s,t)}render(e){let t=this._attrs.forselect,s=this._hlpr.scopeEval(e,t,this);if("repeat"!==this._attrs.formode){if("object"!=typeof s)throw console.warn(`Invalid forSelect="${t}" returned:`,s,"on context",context,"(Element: ",this,")"),"Invalid forSelect selector. see waring.";if(null===s||"function"!=typeof s[Symbol.iterator]&&"object"!=typeof s)return this._log(`Selector '${t}' in for statement is not iterable. Returned value: `,s,"in",this),void console.warn(`Selector '${t}' in for statement is not iterable. Returned value: `,s,"in",this)}else if("number"!=typeof s)return this._log(`Selector '${t}' in for statement is a number. Returned value: `,s,"in",this),void console.warn(`Selector '${t}' in for statement is a number. Returned value: `,s,"in",this);!1===this._origSibling&&(this._origSibling=this.nextSibling);let n=0;switch(this._attrs.formode){case"in":n=0;for(let t in s)e[this._attrs.fordata]=t,this._maintainNode(n,e),n++;break;case"of":n=0;for(let t of s)e[this._attrs.fordata]=t,this._maintainNode(n,e),n++;break;case"repeat":for(n=0;n<s;n++)e[this._attrs.fordata]=n,this._maintainNode(n,e);break;default:throw"Invalid for type '"+this._attrs.formode+"' in ".this.outerHTML}for(let e=n;s.length<this._els.length;e++){let e=this._els.pop();for(let t of e.node)"function"==typeof t._removeNodes&&t._removeNodes(),this.parentElement.removeChild(t)}}}customElements.define("ka-loop",KaLoop,{extends:"template"});var KASELF=null;class KaTpl extends KtRenderable{constructor(){super(),this._attrs={debug:!1,stmt:null,afterrender:null,nodebounce:!1},this._isInitializing=!1,this._isRendering=!1,this._refs={},this._on={},this._fn={},this._scope={$ref:this._refs,$on:this._on,$fn:this._fn},this.__debounceTimeout=null,this._handler={}}static get self(){return KaTpl.prototype.self}static get observedAttributes(){return["stmt","debug"]}disconnectedCallback(){this._runTriggerFunction(this.$on.onBeforeDisconnect);for(let e of this._els)this.parentElement.removeChild(e)}connectedCallback(){this._log("connectedCallback()",this);let auto=this.getAttribute("auto");if(null!==auto){this._log("autostart: _init()","document.readyState: ",document.readyState);let init=()=>{this._init(),""===auto?this.render(this.$scope):eval(auto)};"loading"===document.readyState?document.addEventListener("DOMContentLoaded",()=>{init()}):init()}}set $scope(e){this._scope=e,this._scope.$ref=this._refs,this._scope.$on=this._on,this._scope.$fn=this._fn,this._isInitializing||this.render(this._scope)}get $scope(){let e={set:(e,t,s,n)=>(e[t]=s,this._isRendering||(!1===this._attrs.nodebounce?(null!==this.__debounceTimeout&&(window.clearTimeout(this.__debounceTimeout),this.__debounceTimeout=null),this.__debounceTimeout=window.setTimeout(()=>{this.render(this.$scope)},10)):this.render(this.$scope)),!0),get:(t,s)=>{switch(s){case"$ref":return this._refs;case"$on":return this._on;case"$fn":return this._fn}return"object"==typeof t[s]&&null!==t[s]?new Proxy(t[s],e):t[s]}};return new Proxy(this._scope,e)}get $fn(){return this.$scope.$fn}get $on(){return this.$scope.$on}scopeInit(e){return void 0!==e.$fn&&(this._fn=e.$fn),void 0!==e.$on&&(this._on=e.$on),this.$scope=e,this.$scope}waitRef(e){if(void 0===this.$scope.$ref[e]){var t;let s=new Promise(e=>{t=e});return s.resolve=function(e){t(e)},this.$scope.$ref[e]=s,s}return Promise.resolve(this.$scope.$ref[e])}_init(){if(null!==this._els)return!1;this._isInitializing=!0,null!==this.nextElementSibling&&this.nextElementSibling.hasAttribute("ka-loader")&&this.parentElement.removeChild(this.nextElementSibling);this.nextSibling;return(new KtTemplateParser).parseRecursive(this.content),KASELF=this,KaTpl.prototype.self=this,null===this._els&&this._appendElementsToParent(),this._isInitializing=!1,!0}_runTriggerFunction(e){"function"==typeof e&&e(this.$scope,this)}render(e){void 0===e&&(e=this.$scope),this._log("render($scope= ",e,")");let t=this._init();this._isRendering=!0,this._runTriggerFunction(this.$on.onBeforeRender);for(let t of this._els)this.renderRecursive(t,e);t&&this._runTriggerFunction(this.$on.onAfterFirstRender),this._runTriggerFunction(this.$on.onAfterRender),this._isRendering=!1}}customElements.define("ka-tpl",KaTpl,{extends:"template"});class KaVal extends HTMLElement{constructor(){super(),this._ktHlpr=new KtHelper,this._attrs={debug:!1,stmt:null,afterrender:null}}static get observedAttributes(){return["stmt","afterrender","debug"]}attributeChangedCallback(e,t,s){this._attrs[e]=s}connectedCallback(){this.hasAttribute("auto")&&this.render({})}_log(){!1!==this._attrs.debug&&console.log.apply(this,arguments)}render($scope){this._log("render(",$scope,`) on '${this.outerHTML}'`);try{let v=this._ktHlpr.scopeEval($scope,this._attrs.stmt);"object"==typeof v&&(v=JSON.stringify(v)),this.hasAttribute("unindent")&&(v=this._ktHlpr.unindentText(v)),this.hasAttribute("html")?this.innerHTML=v:this.innerText=v,null!==this._attrs.afterrender&&eval(this._attrs.afterrender)}catch(e){this.innerText=e}}}customElements.define("ka-val",KaVal);class KtIf extends KtRenderable{constructor(){super(),this._attrs={stmt:null}}static get observedAttributes(){return["stmt"]}render(e){if(this._hlpr.scopeEval(e,this._attrs.stmt)){null===this._els&&this._appendElementsToParent();for(let t of this._els)this.renderRecursive(t,e)}else this._removeNodes()}}customElements.define("kt-if",KtIf,{extends:"template"});class KtMaintain extends KtRenderable{constructor(){super(),this._attrs={stmt:null,debug:!1}}static get observedAttributes(){return["stmt","debug"]}disconnectedCallback(){this._removeNodes()}render(e){null===this._els&&this._appendElementsToParent();for(let t of this._els)if("function"==typeof t.hasAttribute){for(let s in KT_FN)t.hasAttribute(s)&&KT_FN[s](t,t.getAttribute(s),e);this.renderRecursive(t,e,!0)}}}customElements.define("kt-maintain",KtMaintain,{extends:"template"});/**
 * Infracamp's Kasimir Http Request
 *
 * Ajax Request library
 *
 * Repository: https://github.com/kasimirjs/kasmimir-http-request
 *
 * @see https://infracamp.org/project/kasimir
 * @author Matthias Leuffen <m@tth.es>
 */
function ka_http_req(t,e={}){return new KasimirHttpRequest(t,e)}class KasimirHttpRequest{constructor(t,e={}){t=t.replace(/(\{|\:)([a-zA-Z0-9_\-]+)/g,(s,r,i)=>{if(!e.hasOwnProperty(i))throw"parameter '"+i+"' missing in url '"+t+"'";return encodeURI(e[i])}),this.request={url:t,method:"GET",body:null,headers:{},dataType:"text",onError:null,debug:!1,data:null}}withParams(t){-1===this.request.url.indexOf("?")?this.request.url+="?":this.request.url+="&";let e=[];for(let s in t)t.hasOwnProperty(s)&&e.push(encodeURIComponent(s)+"="+encodeURIComponent(t[s]));return this.request.url+=e.join("&"),this}withMethod(t){return this.request.method=t,this}withBearerToken(t){return this.withHeaders({authorization:"bearer "+t}),this}withHeaders(t){return Object.assign(this.request.headers,t),this}withBody(t){return"GET"===this.request.method&&(this.request.method="POST"),(Array.isArray(t)||"object"==typeof t)&&(t=JSON.stringify(t),this.withHeaders({"content-type":"application/json"})),this.request.body=t,this}withOnError(t){return this.request.onError=t,this}withDebug(){return this.request.debug=!0,this}set json(t){this.send(e=>{t(e.getBodyJson())})}set plain(t){this.send(e=>{t(e.getBody())})}send(t){let e=new XMLHttpRequest;e.open(this.request.method,this.request.url);for(let t in this.request.headers)e.setRequestHeader(t,this.request.headers[t]);e.onreadystatechange=(()=>{if(4!==e.readyState);else{if(parseInt(e.status)>=400){let t=`𝗥𝗲𝗾𝘂𝗲𝘀𝘁 𝗳𝗮𝗶𝗹𝗲𝗱 '${e.status} ${e.statusText}':`,s=e.response;try{t+="\n\n𝗠𝘀𝗴: '"+(s=JSON.parse(s)).error.msg+"'\n\n"}catch(e){t+=s}return console.warn(t,s),this.request.debug&&alert(t+"\n𝘴𝘦𝘦 𝘤𝘰𝘯𝘴𝘰𝘭𝘦 𝘧𝘰𝘳 𝘥𝘦𝘵𝘢𝘪𝘭𝘴. (𝘥𝘦𝘣𝘶𝘨 𝘮𝘰𝘥𝘦 𝘰𝘯)"),void("function"==typeof this.request.onError&&this.request.onError(new KasimirHttpResponse(e.response,e.status,this)))}if(this.request.debug){let t=e.response;try{t=JSON.parse(t)}catch(t){}console.debug(`𝗥𝗲𝗾𝘂𝗲𝘀𝘁: ${e.status} ${e.statusText}':\n`,t)}t(new KasimirHttpResponse(e.response,e.status,this))}}),e.send(this.request.body)}}class KasimirHttpResponse{constructor(t,e,s){this.body=t,this.status=e,this.request=s}getBodyJson(){return JSON.parse(this.body)}getBody(){return this.body}isOk(){return 200===this.status}}/**
 * Infracamp's Kasimir Templates
 *
 * A no-dependency render on request
 *
 * @author Matthias Leuffen <m@tth.es>
 */
function ka_form(e){if(e instanceof KasimirForm)return e;let t=document.getElementById(e);if(null===t)throw`Selector '${e}' not found (no element mit id)`;if(t instanceof KasimirForm)return t;throw`Selector '${e}' is not a <form is="ka-form"> element`}class KasimirForm extends HTMLFormElement{constructor(){super(),this._data={},this.params={debounce:200},this._debounder=null,this._formEls=[],this.$event=null,this._skipSendChangeEvt=!1;this.addEventListener("submit",e=>{e.stopPropagation(),e.preventDefault()})}_updateElCon(){for(let e of this.querySelectorAll("input,select,textarea"))this._formEls.push(e),!0!==e._kasiFormI&&(e._kasiFormI=!0,e instanceof HTMLSelectElement||e instanceof HTMLInputElement&&"checkbox"===e.type?e.addEventListener("change",e=>{this._skipSendChangeEvt||(this.$event=e,this.dispatchEvent(new Event("change")))}):e.addEventListener("keyup",e=>{window.clearTimeout(this._debounder),"Enter"!==e.key&&(this._debounder=window.setTimeout(()=>{this.$event=e,this.dispatchEvent(new Event("change"))},this.params.debounce))}))}get $data(){let e=e=>{switch(e.tagName){case"INPUT":switch(e.type){case"checkbox":case"radio":return 1==e.checked?e.value:null}case"SELECT":case"TEXTAREA":return e.value}};for(let t of this._formEls)""!==t.name&&(this._data[t.name]=e(t));return this._data}set $data(e){this._skipSendChangeEvt=!0,this._data=e;for(let t of this._formEls){let i=e[t.name];void 0===i&&(i=""),"INPUT"===t.tagName&&"checkbox"===t.type||"radio"===t.type?i===t.value?t.checked=!0:t.checked=!1:t.value=i}this._skipSendChangeEvt=!1}disconnectedCallback(){this._observer.disconnect()}connectedCallback(){if(this._observer=new MutationObserver(e=>{this._updateElCon()}),this._observer.observe(this,{childList:!0,subtree:!0}),this._updateElCon(),this.hasAttribute("init")){let code=this.getAttribute("init");try{eval(code)}catch(e){throw console.error(e,this),new Error(`eval("${code}") failed: ${e}`)}}}}customElements.define("ka-form",KasimirForm,{extends:"form"});class KasimirSelect extends HTMLSelectElement{constructor(){super(),this.__$options=[]}_updateOptions(){let e="value",t="text";this.hasAttribute("value_key")&&(e=this.getAttribute("value_key")),this.hasAttribute("text_key")&&(t=this.getAttribute("text_key")),this.innerHTML="";for(let i of this.__$options){let s=document.createElement("option");"object"==typeof i?(s.value=i[e],s.innerText=i[t]):(s.value=i,s.innerText=i),this.appendChild(s)}}connectedCallback(){let iniOptions=this.$options,value=this.$value;if(Object.defineProperty(this,"$options",{set:e=>{this.__$options=e,this._updateOptions()},get:e=>this.__$options}),Object.defineProperty(this,"$value",{set:e=>{this.value=e},get:e=>this.value}),void 0!==iniOptions&&(this.$options=iniOptions),void 0!==value&&(this.$value=value),this.hasAttribute("init")){let code=this.getAttribute("init");try{eval(code)}catch(e){throw console.error(e,this),new Error(`eval("${code}") failed: ${e}`)}}}}customElements.define("ka-select",KasimirSelect,{extends:"select"});