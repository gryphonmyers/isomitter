import createEventEmitterClass from "./create-event-emitter-class.js";

const { EventTarget, CustomEvent } = window;

const EventEmitter = createEventEmitterClass({EventTarget, CustomEvent});

export default EventEmitter;
export { EventEmitter };