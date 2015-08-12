var daggy = require('daggy'),
    Lens  = require('fantasy-lenses').Lens,

    lenses = {
        x: Lens.objectLens('x')
    },

    Angle = daggy.tagged('x');

Angle.Pi      = Math.PI;
Angle.TwoPi   = Angle.Pi * 2;
Angle.PiOver2 = Angle.Pi / 2;

Angle.Zero         = Angle(0);
Angle.Quater       = Angle(Angle.PiOver2);
Angle.Half         = Angle(Angle.Pi);
Angle.ThreeQuaters = Angle(Angle.PiOver2 * 3);
Angle.Full         = Angle(Angle.TwoPi);

Angle.degrees = function(degrees) {
    return Angle(normalize((degrees * Angle.Pi) / 180));
};

Angle.prototype.sin = function() {
    return Math.sin(this.x);
};

Angle.prototype.cos = function() {
    return Math.cos(this.x);
};

Angle.prototype.tan = function() {
    return Math.tan(this.x);
};

Angle.prototype.degrees = function() {
    return Angle.degrees(this.x);
};

Angle.prototype.opposite = function() {
    var l = lenses.x.run(this);
    return l.set(normalize(l.get() + Angle.Pi));
};

Angle.prototype.add = function(x) {
    var l = lenses.x.run(this);
    return l.set(normalize(l.get() + x.x));
};

Angle.prototype.minus = function(x) {
    var l = lenses.x.run(this);
    return l.set(normalize(l.get() - x.x));
};

Angle.prototype.multiply = function(x) {
    var l = lenses.x.run(this);
    return l.set(normalize(l.get() * x));
};

Angle.prototype.divide = function(x) {
    var l = lenses.x.run(this);
    return l.set(normalize(l.get() / x));
};

Angle.prototype.isLeftOf = function(x) {
    return !!(x === this.opposite() || (x != this && shiftSin(this.x, x.x)) < 0)
};

Angle.prototype.isRightOf = function(x) {
    return !!(x === this.opposite() || (x != this && shiftSin(this.x, x.x)) > 0)
};

Angle.prototype.distanceTo = function(x) {
    var diff = a.x - this.x;
    return diff < Angle.Half ? diff : -diff;
};

Angle.prototype.addUpTo = function(x, y) {
    var added = this.add(x);
    return this.isLeftOf(y) != added.isLeftOf(y) ? y : x;
};

function normalize(radians) {
    var x = (radians / Angle.TwoPi) | 0,
        y = radians - Angle.TwoPi * x;

    return y < 0 ? y + Angle.TwoPi : y;
}

function shiftSin(x, y) {
    return Math.sin(y - x - Angle.Pi);
}

// Export
if (typeof module != 'undefined')
    module.exports = Angle;