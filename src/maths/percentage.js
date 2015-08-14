var daggy = require('daggy'),
    
    Percentage = daggy.tagged('x');

Percentage.One = Percentage(1.0);
Percentage.Zero = Percentage(0.0);

Percentage.prototype.chain = function(f) {
    return f(this.x);
};

Percentage.prototype.map = function(f) {
    return this.chain(function(x) {
        return Percentage(f(this.x));
    });
};

Percentage.prototype.add = function(x) {
    return modify(this, x, function(a, b) {
        return a + b;
    });
};

Percentage.prototype.minus = function(x) {
    return modify(this, x, function(a, b) {
        return a - b;
    });
};

Percentage.prototype.multiply = function(x) {
    return modify(this, x, function(a, b) {
        return a * b;
    });
};

Percentage.prototype.complement = function() {
    return this.map(function(x) {
        return 1.0 - x;
    });
};

function modify(x, y, f) {
    return x.chain(function(a) {
        return y.map(function(b) {
            return normalize(f(a, b));
        }); 
    });
}

function normalize(x) {
    return x < 0 ? 0 : x > 1 ? 1 : x;
}

// Export
if (typeof module != 'undefined')
    module.exports = Percentage;