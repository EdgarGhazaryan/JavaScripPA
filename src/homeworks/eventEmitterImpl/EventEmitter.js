class EventEmitter {
    constructor() {
        this._events = new Map();
        this._maxListeners = 10; //default
    }

    emit(eventName, ...args) {
        if(!this._events.has(eventName)) {
            return false;
        }
        this._events.get(eventName).forEach(f => f(...args));
        return true;
    }

    on(eventName, func) {
        if(this._events.has(eventName)) {
            let events = this._events.get(eventName);
            if(this._maxListeners && this._maxListeners === events.length) {
                return;
            }
            events.push(func);
        } else {
            if(this._maxListeners !== 0) {
                this._events.set(eventName, [func]);
            }
        }
    }

    off(eventName, func) {
        if(this._events.has(eventName)) {
            this._events.get(eventName).pop(func);
        }
    }

    listenersCount(eventName) {
        return this._events.has(eventName) ? this._events.get(eventName).length : 0;
    }

    listeners(eventName) {
        return this._events.has(eventName) ? this._events.get(eventName) : [];
    }

    eventNames() {
        let result = [];
        for(const event of this._events.keys()) {
            result.push(event)
        }
        return result;
    }

    setMaxListeners(n) {
        if(n < 0) {
            return;
        }
        this._maxListeners = n;
    }

    getMaxListeners() {
        return this._maxListeners;
    }
}

module.exports = EventEmitter;