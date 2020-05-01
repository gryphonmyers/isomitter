const test = require('ava');

export default (EventEmitter) => {  
    
    test('Basic event handling works', t => {
        var em = new EventEmitter();

        var triggered;

        var onOn = evtObj => {
            triggered = evtObj;
        }
        em.on('hi', onOn);
        em.emit('hi', {foo: 'bar'});

        t.is(triggered.foo, 'bar');
        t.is(triggered.eventName, 'hi');
        t.is(triggered.type, 'hi');
        t.deepEqual(triggered.detail, {foo: 'bar'}); 
    });

    test('All event listener proxies work', t => {
        var em = new EventEmitter();

        var triggered = {};

        var onOn = evtObj => {
            triggered.on = evtObj;
        }
        em.on('hi', onOn)

        var onAddEventListener = evtObj => {
            triggered.addEventListener = evtObj;
        }

        em.addEventListener('hi', onAddEventListener)
        
        var onAddListener = evtObj => {
            triggered.addListener = evtObj;
        }
        em.addListener('hi', onAddListener)

        em.emit('hi', {foo: 'bar'});

        t.is(triggered.addListener, triggered.addEventListener);
        t.is(triggered.addListener, triggered.on); 
    });

    test('All dispatch proxies work as expected', t => {
        var em = new EventEmitter();
        var evts = [];
        var onOn = evtObj => {
            evts.push(evtObj);
        }
        em.on('hi', onOn);

        em.dispatchEvent('hi', {foo:'bi'});
        em.emit('hi', {foo:'bi2'});
        em.emit('hi', {foo:'bi3'});

        t.is(evts.length, 3);
        t.is(evts[0].foo, 'bi');
        t.is(evts[1].foo, 'bi2');
        t.is(evts[2].foo, 'bi3');
    })

    test('Remove listener working as expected', t => {
        var em = new EventEmitter();
        var evts = [];
        var onOn = evtObj => {
            evts.push(evtObj);
        }
        em.on('hi', onOn);

        em.emit('hi', {foo: 'bar'});

        em.removeEventListener('hi', onOn);

        em.emit('hi', {foo: 'bar2'});
        
        t.is(evts.length, 1);
        t.is(evts[0].foo, 'bar');
    });

    test('All remove listener proxies working as expected', t => {
        var em = new EventEmitter();
        var evts = [];
        var onOn = evtObj => {
            evts.push(evtObj);
        }
        em.on('hi', onOn);

        em.emit('hi', {foo: 'bar'});

        em.removeEventListener('hi', onOn);

        em.emit('hi', {foo: 'bar2'});

        em.on('hi', onOn);

        em.emit('hi', {foo: 'bar3'});

        em.removeListener('hi', onOn);

        em.emit('hi', {foo: 'bar4'});

        em.on('hi', onOn);

        em.emit('hi', {foo: 'bar5'});

        em.off('hi', onOn);

        em.emit('hi', {foo: 'bar6'});
        
        t.is(evts.length, 3);
        t.is(evts[0].foo, 'bar');
        t.is(evts[1].foo, 'bar3');
        t.is(evts[2].foo, 'bar5');
    });

    test('Once method triggers only once', t => {
        
        var em = new EventEmitter();
        var numTriggers = 0;
        em.once('hi', evtObj => {
            numTriggers++;
        });

        em.emit('hi', {});    
        em.emit('hi', {});

        t.is(numTriggers, 1);
    })

    test('Triggering with null event object yields object with null detail', t => {
        var em = new EventEmitter();

        var result;
        em.on('hi', evtObj => {
            result = evtObj;
        })
        result = 1;

        em.emit('hi', null);

        t.falsy(result.detail);
    })

    test('Triggering with no event object yields object with null detail', t => {
        var em = new EventEmitter();

        var result;
        em.on('hi', evtObj => {
            result = evtObj;
        })

        result = 1;
        em.emit('hi');
        
        t.falsy(result.detail);
    })
    
    test('Event order is correct', t => {
        var em = new EventEmitter();
        const evts = [];
        em.on('foo', (evt) => {
            evts.push(evt)
        })

        em.emit('foo', {bar: 1});
        em.emit('foo', {bar: 2});

        t.is(evts[0].bar, 1);
        t.is(evts[1].bar, 2);
    });

    test.todo('test dispatchEvent with event object passed in');
}