## Modules

<dl>
<dt><a href="#module_isomitter/create-event-emitter-class">isomitter/create-event-emitter-class</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#isomitter/create-event-emitter-class">isomitter/create-event-emitter-class(opts)</a> ⇒ <code>function</code></dt>
<dd><p>Given EventTarget and CustomEvent classes, returns an EventEmitter class.</p>
</dd>
</dl>

<a name="module_isomitter/create-event-emitter-class"></a>

## isomitter/create-event-emitter-class

* [isomitter/create-event-emitter-class](#module_isomitter/create-event-emitter-class)
    * [~EventEmitter](#module_isomitter/create-event-emitter-class..EventEmitter)
        * [.dispatchEvent(evtName, [detail])](#module_isomitter/create-event-emitter-class..EventEmitter+dispatchEvent)

<a name="module_isomitter/create-event-emitter-class..EventEmitter"></a>

### isomitter/create-event-emitter-class~EventEmitter
EventEmitter class. Implements a subset of the browser [EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget) interface.

**Kind**: inner class of [<code>isomitter/create-event-emitter-class</code>](#module_isomitter/create-event-emitter-class)  
<a name="module_isomitter/create-event-emitter-class..EventEmitter+dispatchEvent"></a>

#### eventEmitter.dispatchEvent(evtName, [detail])
Emits an event. Extends the functionality of the native browser method. Supports both browser dispatchEvent signature and Node.js EventEmitter.emit signature.

**Kind**: instance method of [<code>EventEmitter</code>](#module_isomitter/create-event-emitter-class..EventEmitter)  
**See**: [https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent)  

| Param | Type | Description |
| --- | --- | --- |
| evtName | <code>String</code> \| <code>CustomEvent</code> | Either an event name, or an Event object (consistent with the browser signature). |
| [detail] | <code>Object</code> | Event payload. In order to preserve consistency with browser interface, non-object values are not supported. |

<a name="isomitter/create-event-emitter-class"></a>

## isomitter/create-event-emitter-class(opts) ⇒ <code>function</code>
Given EventTarget and CustomEvent classes, returns an EventEmitter class.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> |  |
| opts.EventTarget | <code>EventTarget</code> |  |
| opts.CustomEvent | <code>CustomEvent</code> | A CustomEvent implementation. |

