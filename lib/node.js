import { EventEmitter } from 'events';
import createEventEmitterClass from './create-event-emitter-class.js';

export class EventTarget extends EventEmitter {
    get addEventListener() { return super.addListener }
    get removeEventListener() { return super.removeListener }

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

const IsoMitter = createEventEmitterClass({EventTarget, CustomEvent});

export default IsoMitter;
