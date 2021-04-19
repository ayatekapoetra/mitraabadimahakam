// Generated by CoffeeScript 1.10.0
'use strict';
(function() {
  var JsNetworkMonitor;
  JsNetworkMonitor = (function() {
    function JsNetworkMonitor(options) {
      var k;
      this._options = {
        url: '/favicon.ico',
        timeout: 3000,
        sleep_delay: 5000
      };
      if (options) {
        for (k in options) {
          this._options[k] = options[k];
        }
      }
      this._events = {};
      this.status = '';
    }

    JsNetworkMonitor.prototype.start = function() {
      this._xhttpCreate();
      this.stop();
      this.interval = setInterval(((function(_this) {
        return function() {
          return _this._check();
        };
      })(this)), this._options.sleep_delay);
      return this;
    };

    JsNetworkMonitor.prototype.stop = function() {
      if (this.interval) {
        clearInterval(this.interval);
      }
      return this;
    };

    JsNetworkMonitor.prototype.on = function(type, callback) {
      return this._events[type] = callback;
    };

    JsNetworkMonitor.prototype.isOnline = function() {
      return this.status === 'online';
    };

    JsNetworkMonitor.prototype._xhttpCreate = function() {
      this.xhttp = new XMLHttpRequest();
      this.xhttp.timeout = this._options.timeout;
      this.xhttp.onload = (function(_this) {
        return function() {
          return _this._checkEnd('online');
        };
      })(this);
      this.xhttp.onerror = this.xhttp.ontimeout = (function(_this) {
        return function() {
          return _this._checkEnd('offline');
        };
      })(this);
      if (typeof addEventListener === 'function') {
        addEventListener('offline', this.xhttp.onerror, false);
      }
      return this.xhttp;
    };

    JsNetworkMonitor.prototype._check = function() {
      this.xhttp.open('OPTIONS', this._options.url + "?t=" + (Date.now()));
      return this.xhttp.send();
    };

    JsNetworkMonitor.prototype._checkEnd = function(status) {
      var changed;
      changed = status !== this.status;
      this.status = status;
      if (this.status && changed) {
        if (this._events[status]) {
          this._events[status]();
        }
      }
    };

    return JsNetworkMonitor;

  })();
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = JsNetworkMonitor;
  } else {
    this.JsNetworkMonitor = JsNetworkMonitor;
  }
}).call(this);