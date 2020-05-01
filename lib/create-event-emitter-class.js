/**
 * @module isomitter/create-event-emitter-class
 */

/**
 * @typedef EventTarget The native browser EventTarget class, or a class implementing its interface.
 * 
 * @external
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget}
 */

 /**
 * @typedef CustomEvent The native browser CustomEvent class, or a class implementing its interface.
 * 
 * @external
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent}
 */

 /**
 * Given EventTarget and CustomEvent classes, returns an EventEmitter class. 
 * @function
 * 
 * @param {Object} opts 
 * @param {EventTarget} opts.EventTarget
 * @param {CustomEvent} opts.CustomEvent A CustomEvent implementation.
 * 
 * @return {function(new:EventEmitter)}
 * @alias isomitter/create-event-emitter-class
 */
export default ({EventTarget, CustomEvent}={}) => {
    class EventObject extends CustomEvent {
        constructor(evtName, evtObj) {
            super(evtName, evtObj)
            this.eventName = this.type
            Object.assign(this, evtObj.detail || null);
        }
    }

    /**
     * EventEmitter class. Implements a subset of the browser {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget EventTarget} interface.
     */
    class EventEmitter extends EventTarget {

        once(evtName, callback) {            
            return this.on(evtName, function newCb(evt) {
                this.off(evtName, newCb);
                callback(evt);                
            });
        }

        /**
         * Emits an event. Extends the functionality of the native browser method. Supports both browser dispatchEvent signature and Node.js EventEmitter.emit signature. 
         * 
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent}
         * 
         * @param {String|CustomEvent} evtName Either an event name, or an Event object (consistent with the browser signature).
         * @param {Object} [detail] Event payload. In order to preserve consistency with browser interface, non-object values are not supported.
         */
        
        dispatchEvent(evtName, detail) {
            return super.dispatchEvent(evtName instanceof EventObject ? evtName : new EventObject(evtName, {detail}));
        }

        /**
         * @name addEventListener
         * Implements {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener addEventListener} method of the browser EventTarget interface.
         * 
         * 
         * 
         */


    }
    var p = EventEmitter.prototype;
    [['dispatchEvent',['emit']], ['removeEventListener',['off', 'removeListener']], ['addEventListener', ['on', 'addListener']]]
        .forEach(([k, als]) => als.forEach(al => p[al] = p[k]));

    return EventEmitter;
}