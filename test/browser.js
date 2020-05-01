import createEventEmitterClass from '../lib/create-event-emitter-class.js';
import { EventTarget } from 'event-target-shim';
import { CustomEvent } from '../lib/node';
import runEventEmitterTests from './run-event-emitter-tests.js';

const EventEmitter = createEventEmitterClass({EventTarget, CustomEvent});
runEventEmitterTests(EventEmitter);