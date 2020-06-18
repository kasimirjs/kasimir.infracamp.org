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
/**
 * Build a query string from an object
 *
 * <example>
 *     ka_build_query_str({var1: "val1", var2: "val2"});
 *
 *     Will return: "var1=val1&var2=val2"
 * </example>
 *
 * @param {object} input
 * @return String
 */
function ka_build_query_str(input) {
    let esc = encodeURIComponent;
    return Object.keys(input)
        .map(key => esc(key) + "=" + esc(input[key]))
        .join("&");
}
/**
 * Decode a query string (abc=val&var2=val2) into an object
 *
 * <example>
 * </example>
 *
 * @param {String} query
 * @return {Object}
 */
function ka_parse_query_str(query) {
    let vars = query.split("&");
    let ret = {};
    for (let comp of vars) {
        if (comp === "")
            continue;
        let pair = comp.split("=");
        ret[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return ret;
}
/**
 * Check if parameter 1 is undefined, null, empty string or empty array
 *
 * @param val
 * @return {boolean}
 */
function ka_empty (val) {
    return typeof val === "undefined" || val === null || val === "" || (Array.isArray(val) && val.length === 0);
}



function ka_interval(name, fn, interval) {

}


class KaInterval {

    setActive(active) {

    }

    isActive() {

    }
}


class KaRoute {

    constructor() {
        this.__options = {};
    }



    /**
     *
     * @return {{}}
     */
    static get options () {
        if (typeof this.prototype.__options === "undefined")
            this.prototype.__options = ka_parse_query_str(location.hash.slice(1));

        let timeout = null;
        let handler = {
            set: (target, property, value, receiver) => {
                target[property] = value;

                // Debounce updates (allow multiple updates before route change)
                if (timeout !== null) {
                    window.clearTimeout(timeout);
                    timeout = null;
                }

                timeout = window.setTimeout(e => {
                    location.hash = ka_build_query_str(this.prototype.__options);
                }, 10);

                return true;
            },
            get: (target, key) => {
                if (typeof target[key] === "object" && target[key] !== null)
                    return new Proxy(target[key], handler);
                return target[key];
            }

        };
        return new Proxy(this.prototype.__options, handler);
    }

    static set options (value) {
        this.prototype.__options = value;
        location.hash = ka_build_query_str(this.prototype.__options);
    }


    /**
     * Register callback on hash options change
     *
     * @param name
     * @param callback
     */
    static onOptionChange(name, callback) {
        if (typeof this.prototype.callbacks === "undefined") {
            this.prototype.callbacks = {};
            window.addEventListener("hashchange", e => {
                this.prototype.__options = ka_parse_query_str(location.hash.slice(1));
                for (let curName in this.prototype.callbacks) {
                    if ( ! this.prototype.callbacks.hasOwnProperty(curName))
                        continue;
                    this.prototype.callbacks[curName](this.options);
                }
            })
        }
        this.prototype.callbacks[name] = callback;
    }

}





/**
 * Select a element by id
 *
 * @param selector
 * @return {HTMLElement}
 */
function ka(selector) {
    let el = document.getElementById(selector);
    if (el === null)
        throw `Element id '${selector}' not found`;
    return el;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUva2FfYnVpbGRfcXVlcnlfc3RyLmpzIiwiY29yZS9rYV9wYXJzZV9xdWVyeV9zdHIuanMiLCJrYS1lbXB0eS5qcyIsImthLWludGVydmFsLmpzIiwia2Etcm91dGUuanMiLCJrYS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Imthc2ltaXItdG9vbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEJ1aWxkIGEgcXVlcnkgc3RyaW5nIGZyb20gYW4gb2JqZWN0XG4gKlxuICogPGV4YW1wbGU+XG4gKiAgICAga2FfYnVpbGRfcXVlcnlfc3RyKHt2YXIxOiBcInZhbDFcIiwgdmFyMjogXCJ2YWwyXCJ9KTtcbiAqXG4gKiAgICAgV2lsbCByZXR1cm46IFwidmFyMT12YWwxJnZhcjI9dmFsMlwiXG4gKiA8L2V4YW1wbGU+XG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGlucHV0XG4gKiBAcmV0dXJuIFN0cmluZ1xuICovXG5mdW5jdGlvbiBrYV9idWlsZF9xdWVyeV9zdHIoaW5wdXQpIHtcbiAgICBsZXQgZXNjID0gZW5jb2RlVVJJQ29tcG9uZW50O1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhpbnB1dClcbiAgICAgICAgLm1hcChrZXkgPT4gZXNjKGtleSkgKyBcIj1cIiArIGVzYyhpbnB1dFtrZXldKSlcbiAgICAgICAgLmpvaW4oXCImXCIpO1xufSIsIi8qKlxuICogRGVjb2RlIGEgcXVlcnkgc3RyaW5nIChhYmM9dmFsJnZhcjI9dmFsMikgaW50byBhbiBvYmplY3RcbiAqXG4gKiA8ZXhhbXBsZT5cbiAqIDwvZXhhbXBsZT5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcXVlcnlcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZnVuY3Rpb24ga2FfcGFyc2VfcXVlcnlfc3RyKHF1ZXJ5KSB7XG4gICAgbGV0IHZhcnMgPSBxdWVyeS5zcGxpdChcIiZcIik7XG4gICAgbGV0IHJldCA9IHt9O1xuICAgIGZvciAobGV0IGNvbXAgb2YgdmFycykge1xuICAgICAgICBpZiAoY29tcCA9PT0gXCJcIilcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICBsZXQgcGFpciA9IGNvbXAuc3BsaXQoXCI9XCIpO1xuICAgICAgICByZXRbZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMF0pXSA9IGRlY29kZVVSSUNvbXBvbmVudChwYWlyWzFdKTtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbn0iLCIvKipcbiAqIENoZWNrIGlmIHBhcmFtZXRlciAxIGlzIHVuZGVmaW5lZCwgbnVsbCwgZW1wdHkgc3RyaW5nIG9yIGVtcHR5IGFycmF5XG4gKlxuICogQHBhcmFtIHZhbFxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24ga2FfZW1wdHkgKHZhbCkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsID09PSBcInVuZGVmaW5lZFwiIHx8IHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IFwiXCIgfHwgKEFycmF5LmlzQXJyYXkodmFsKSAmJiB2YWwubGVuZ3RoID09PSAwKTtcbn1cbiIsIlxuXG5mdW5jdGlvbiBrYV9pbnRlcnZhbChuYW1lLCBmbiwgaW50ZXJ2YWwpIHtcblxufVxuXG5cbmNsYXNzIEthSW50ZXJ2YWwge1xuXG4gICAgc2V0QWN0aXZlKGFjdGl2ZSkge1xuXG4gICAgfVxuXG4gICAgaXNBY3RpdmUoKSB7XG5cbiAgICB9XG59IiwiXG5cbmNsYXNzIEthUm91dGUge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX19vcHRpb25zID0ge307XG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHJldHVybiB7e319XG4gICAgICovXG4gICAgc3RhdGljIGdldCBvcHRpb25zICgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3RvdHlwZS5fX29wdGlvbnMgPT09IFwidW5kZWZpbmVkXCIpXG4gICAgICAgICAgICB0aGlzLnByb3RvdHlwZS5fX29wdGlvbnMgPSBrYV9wYXJzZV9xdWVyeV9zdHIobG9jYXRpb24uaGFzaC5zbGljZSgxKSk7XG5cbiAgICAgICAgbGV0IHRpbWVvdXQgPSBudWxsO1xuICAgICAgICBsZXQgaGFuZGxlciA9IHtcbiAgICAgICAgICAgIHNldDogKHRhcmdldCwgcHJvcGVydHksIHZhbHVlLCByZWNlaXZlcikgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldFtwcm9wZXJ0eV0gPSB2YWx1ZTtcblxuICAgICAgICAgICAgICAgIC8vIERlYm91bmNlIHVwZGF0ZXMgKGFsbG93IG11bHRpcGxlIHVwZGF0ZXMgYmVmb3JlIHJvdXRlIGNoYW5nZSlcbiAgICAgICAgICAgICAgICBpZiAodGltZW91dCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQoZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLmhhc2ggPSBrYV9idWlsZF9xdWVyeV9zdHIodGhpcy5wcm90b3R5cGUuX19vcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9LCAxMCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQ6ICh0YXJnZXQsIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0W2tleV0gPT09IFwib2JqZWN0XCIgJiYgdGFyZ2V0W2tleV0gIT09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJveHkodGFyZ2V0W2tleV0sIGhhbmRsZXIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXRba2V5XTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IFByb3h5KHRoaXMucHJvdG90eXBlLl9fb3B0aW9ucywgaGFuZGxlcik7XG4gICAgfVxuXG4gICAgc3RhdGljIHNldCBvcHRpb25zICh2YWx1ZSkge1xuICAgICAgICB0aGlzLnByb3RvdHlwZS5fX29wdGlvbnMgPSB2YWx1ZTtcbiAgICAgICAgbG9jYXRpb24uaGFzaCA9IGthX2J1aWxkX3F1ZXJ5X3N0cih0aGlzLnByb3RvdHlwZS5fX29wdGlvbnMpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXIgY2FsbGJhY2sgb24gaGFzaCBvcHRpb25zIGNoYW5nZVxuICAgICAqXG4gICAgICogQHBhcmFtIG5hbWVcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICAgKi9cbiAgICBzdGF0aWMgb25PcHRpb25DaGFuZ2UobmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3RvdHlwZS5jYWxsYmFja3MgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHRoaXMucHJvdG90eXBlLmNhbGxiYWNrcyA9IHt9O1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJoYXNoY2hhbmdlXCIsIGUgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvdG90eXBlLl9fb3B0aW9ucyA9IGthX3BhcnNlX3F1ZXJ5X3N0cihsb2NhdGlvbi5oYXNoLnNsaWNlKDEpKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBjdXJOYW1lIGluIHRoaXMucHJvdG90eXBlLmNhbGxiYWNrcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoICEgdGhpcy5wcm90b3R5cGUuY2FsbGJhY2tzLmhhc093blByb3BlcnR5KGN1ck5hbWUpKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvdG90eXBlLmNhbGxiYWNrc1tjdXJOYW1lXSh0aGlzLm9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcm90b3R5cGUuY2FsbGJhY2tzW25hbWVdID0gY2FsbGJhY2s7XG4gICAgfVxuXG59XG5cblxuXG5cbiIsIi8qKlxuICogU2VsZWN0IGEgZWxlbWVudCBieSBpZFxuICpcbiAqIEBwYXJhbSBzZWxlY3RvclxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gKi9cbmZ1bmN0aW9uIGthKHNlbGVjdG9yKSB7XG4gICAgbGV0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VsZWN0b3IpO1xuICAgIGlmIChlbCA9PT0gbnVsbClcbiAgICAgICAgdGhyb3cgYEVsZW1lbnQgaWQgJyR7c2VsZWN0b3J9JyBub3QgZm91bmRgO1xuICAgIHJldHVybiBlbDtcbn1cbiJdfQ==
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUva2FfYnVpbGRfcXVlcnlfc3RyLmpzIiwiY29yZS9rYV9wYXJzZV9xdWVyeV9zdHIuanMiLCJrYS1lbXB0eS5qcyIsImthLWludGVydmFsLmpzIiwia2Etcm91dGUuanMiLCJrYS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Imthc2ltaXItdG9vbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEJ1aWxkIGEgcXVlcnkgc3RyaW5nIGZyb20gYW4gb2JqZWN0XG4gKlxuICogPGV4YW1wbGU+XG4gKiAgICAga2FfYnVpbGRfcXVlcnlfc3RyKHt2YXIxOiBcInZhbDFcIiwgdmFyMjogXCJ2YWwyXCJ9KTtcbiAqXG4gKiAgICAgV2lsbCByZXR1cm46IFwidmFyMT12YWwxJnZhcjI9dmFsMlwiXG4gKiA8L2V4YW1wbGU+XG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGlucHV0XG4gKiBAcmV0dXJuIFN0cmluZ1xuICovXG5mdW5jdGlvbiBrYV9idWlsZF9xdWVyeV9zdHIoaW5wdXQpIHtcbiAgICBsZXQgZXNjID0gZW5jb2RlVVJJQ29tcG9uZW50O1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhpbnB1dClcbiAgICAgICAgLm1hcChrZXkgPT4gZXNjKGtleSkgKyBcIj1cIiArIGVzYyhpbnB1dFtrZXldKSlcbiAgICAgICAgLmpvaW4oXCImXCIpO1xufSIsIi8qKlxuICogRGVjb2RlIGEgcXVlcnkgc3RyaW5nIChhYmM9dmFsJnZhcjI9dmFsMikgaW50byBhbiBvYmplY3RcbiAqXG4gKiA8ZXhhbXBsZT5cbiAqIDwvZXhhbXBsZT5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcXVlcnlcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZnVuY3Rpb24ga2FfcGFyc2VfcXVlcnlfc3RyKHF1ZXJ5KSB7XG4gICAgbGV0IHZhcnMgPSBxdWVyeS5zcGxpdChcIiZcIik7XG4gICAgbGV0IHJldCA9IHt9O1xuICAgIGZvciAobGV0IGNvbXAgb2YgdmFycykge1xuICAgICAgICBpZiAoY29tcCA9PT0gXCJcIilcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICBsZXQgcGFpciA9IGNvbXAuc3BsaXQoXCI9XCIpO1xuICAgICAgICByZXRbZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMF0pXSA9IGRlY29kZVVSSUNvbXBvbmVudChwYWlyWzFdKTtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbn0iLCIvKipcbiAqIENoZWNrIGlmIHBhcmFtZXRlciAxIGlzIHVuZGVmaW5lZCwgbnVsbCwgZW1wdHkgc3RyaW5nIG9yIGVtcHR5IGFycmF5XG4gKlxuICogQHBhcmFtIHZhbFxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24ga2FfZW1wdHkgKHZhbCkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsID09PSBcInVuZGVmaW5lZFwiIHx8IHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IFwiXCIgfHwgKEFycmF5LmlzQXJyYXkodmFsKSAmJiB2YWwubGVuZ3RoID09PSAwKTtcbn1cbiIsIlxuXG5mdW5jdGlvbiBrYV9pbnRlcnZhbChuYW1lLCBmbiwgaW50ZXJ2YWwpIHtcblxufVxuXG5cbmNsYXNzIEthSW50ZXJ2YWwge1xuXG4gICAgc2V0QWN0aXZlKGFjdGl2ZSkge1xuXG4gICAgfVxuXG4gICAgaXNBY3RpdmUoKSB7XG5cbiAgICB9XG59IiwiXG5cbmNsYXNzIEthUm91dGUge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX19vcHRpb25zID0ge307XG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHJldHVybiB7e319XG4gICAgICovXG4gICAgc3RhdGljIGdldCBvcHRpb25zICgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3RvdHlwZS5fX29wdGlvbnMgPT09IFwidW5kZWZpbmVkXCIpXG4gICAgICAgICAgICB0aGlzLnByb3RvdHlwZS5fX29wdGlvbnMgPSBrYV9wYXJzZV9xdWVyeV9zdHIobG9jYXRpb24uaGFzaC5zbGljZSgxKSk7XG5cbiAgICAgICAgbGV0IHRpbWVvdXQgPSBudWxsO1xuICAgICAgICBsZXQgaGFuZGxlciA9IHtcbiAgICAgICAgICAgIHNldDogKHRhcmdldCwgcHJvcGVydHksIHZhbHVlLCByZWNlaXZlcikgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldFtwcm9wZXJ0eV0gPSB2YWx1ZTtcblxuICAgICAgICAgICAgICAgIC8vIERlYm91bmNlIHVwZGF0ZXMgKGFsbG93IG11bHRpcGxlIHVwZGF0ZXMgYmVmb3JlIHJvdXRlIGNoYW5nZSlcbiAgICAgICAgICAgICAgICBpZiAodGltZW91dCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQoZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLmhhc2ggPSBrYV9idWlsZF9xdWVyeV9zdHIodGhpcy5wcm90b3R5cGUuX19vcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9LCAxMCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQ6ICh0YXJnZXQsIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0W2tleV0gPT09IFwib2JqZWN0XCIgJiYgdGFyZ2V0W2tleV0gIT09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJveHkodGFyZ2V0W2tleV0sIGhhbmRsZXIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXRba2V5XTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IFByb3h5KHRoaXMucHJvdG90eXBlLl9fb3B0aW9ucywgaGFuZGxlcik7XG4gICAgfVxuXG4gICAgc3RhdGljIHNldCBvcHRpb25zICh2YWx1ZSkge1xuICAgICAgICB0aGlzLnByb3RvdHlwZS5fX29wdGlvbnMgPSB2YWx1ZTtcbiAgICAgICAgbG9jYXRpb24uaGFzaCA9IGthX2J1aWxkX3F1ZXJ5X3N0cih0aGlzLnByb3RvdHlwZS5fX29wdGlvbnMpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXIgY2FsbGJhY2sgb24gaGFzaCBvcHRpb25zIGNoYW5nZVxuICAgICAqXG4gICAgICogQHBhcmFtIG5hbWVcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICAgKi9cbiAgICBzdGF0aWMgb25PcHRpb25DaGFuZ2UobmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3RvdHlwZS5jYWxsYmFja3MgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHRoaXMucHJvdG90eXBlLmNhbGxiYWNrcyA9IHt9O1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJoYXNoY2hhbmdlXCIsIGUgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvdG90eXBlLl9fb3B0aW9ucyA9IGthX3BhcnNlX3F1ZXJ5X3N0cihsb2NhdGlvbi5oYXNoLnNsaWNlKDEpKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBjdXJOYW1lIGluIHRoaXMucHJvdG90eXBlLmNhbGxiYWNrcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoICEgdGhpcy5wcm90b3R5cGUuY2FsbGJhY2tzLmhhc093blByb3BlcnR5KGN1ck5hbWUpKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvdG90eXBlLmNhbGxiYWNrc1tjdXJOYW1lXSh0aGlzLm9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcm90b3R5cGUuY2FsbGJhY2tzW25hbWVdID0gY2FsbGJhY2s7XG4gICAgfVxuXG59XG5cblxuXG5cbiIsIi8qKlxuICogU2VsZWN0IGEgZWxlbWVudCBieSBpZFxuICpcbiAqIEBwYXJhbSBzZWxlY3RvclxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gKi9cbmZ1bmN0aW9uIGthKHNlbGVjdG9yKSB7XG4gICAgbGV0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VsZWN0b3IpO1xuICAgIGlmIChlbCA9PT0gbnVsbClcbiAgICAgICAgdGhyb3cgYEVsZW1lbnQgaWQgJyR7c2VsZWN0b3J9JyBub3QgZm91bmRgO1xuICAgIHJldHVybiBlbDtcbn1cbiJdfQ==
