import { EventEmitter as NodeEventEmitter } from 'events';
import createEventEmitterClass from './create-event-emitter-class.js';


/**
 * EventTarget extending the native Node.js EventEmitter class. The class is normalized to support a subset of the browser EventTarget interface.
 * 
 */
export class EventTarget extends NodeEventEmitter {
    
    get addEventListener() { return super.addListener }
    get removeEventListener() { return super.removeListener }

    /**
     * 
     * @param {*} evtObj 
     */
    dispatchEvent(evtObj) {
        return super.emit(evtObj.type, evtObj);
    }
    
    constructor() {
        super(...arguments);
        Object.defineProperties(this, {
            _maxListeners: { enumerable: false },
            _eventsCount: { enumerable: false },
            _events: { enumerable: false },
            domain: { enumerable: false }
        })
    }
}

export class CustomEvent {
    constructor(evtName, evtObj) {
        this.type = evtName;
        this.detail = evtObj.detail
    }
}

export const EventEmitter = createEventEmitterClass({EventTarget, CustomEvent});

export default EventEmitter;
