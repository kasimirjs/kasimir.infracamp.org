/**
 * Infracamp's Kasimir Templates
 *
 * A no-dependency render on request
 *
 * @author Matthias Leuffen <m@tth.es>
 */
function ka_http_req(t,e={}){return new KasimirHttpRequest(t,e)}class KasimirHttpRequest{constructor(t,e={}){t=t.replace(/(\{|\:)([a-zA-Z0-9_\-]+)/,(s,r,i)=>{if(!e.hasOwnProperty(i))throw"parameter '"+i+"' missing in url '"+t+"'";return encodeURI(e[i])}),this.request={url:t,method:"GET",body:null,headers:{},dataType:"text",onError:null,data:null}}withParams(t){-1===this.request.url.indexOf("?")?this.request.url+="?":this.request.url+="&";let e=[];for(let s in t)t.hasOwnProperty(s)&&e.push(encodeURIComponent(s)+"="+encodeURIComponent(t[s]));return this.request.url+=e.join("&"),this}withMethod(t){return this.request.method=t,this}withBearerToken(t){return this.withHeaders({authorization:"bearer "+t}),this}withHeaders(t){return Object.assign(this.request.headers,t),this}withBody(t){return"GET"===this.request.method&&(this.request.method="POST"),(Array.isArray(t)||"object"==typeof t)&&(t=JSON.stringify(t),this.withHeaders({"content-type":"application/json"})),this.request.body=t,this}withOnError(t){return this.request.onError=t,this}set json(t){this.send(e=>{t(e.getBodyJson())})}set plain(t){this.send(e=>{t(e.getBody())})}send(t){let e=new XMLHttpRequest;e.open(this.request.method,this.request.url);for(let t in this.request.headers)e.setRequestHeader(t,this.request.headers[t]);e.onreadystatechange=(()=>{if(4===e.readyState)return console.log("ok",e),null!==this.request.onError&&e.status>=400?void this.request.onError(new KasimirHttpResponse(e.response,e.status,this)):void t(new KasimirHttpResponse(e.response,e.status,this))}),e.send(this.request.body)}}class KasimirHttpResponse{constructor(t,e,s){this.body=t,this.status=e,this.request=s}getBodyJson(){return JSON.parse(this.body)}getBody(){return this.body}isOk(){return 200===this.status}}