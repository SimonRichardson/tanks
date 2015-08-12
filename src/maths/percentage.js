var daggy = require('daggy'),
    Lens  = require('fantasy-lenses').Lens,

    lenses = {
        x: Lens.objectLens('x')
    },

    Percentage = daggy.tagged('x');

Percentage.One = Percentage(1.0);
Percentage.Zero = Percentage(0.0);

Percentage.prototype.add = function(x) {
    var l = lenses.x.run(this);
    return l.set(normalize(l.get() + x.x));
};

Percentage.prototype.multiply = function(x) {
    var l = lenses.x.run(this);
    return l.set(normalize(l.get() * x.x));
};

Percentage.prototype.complement = function() {
    var l = lenses.x.run(this);
    return l.set(normalize(1.0 - l.get()));
}

function normalize(x) {
    return x < 0 ? 0 : x > 1 ? 1 : x;
}

// Export
if (typeof module != 'undefined')
    module.exports = Size;