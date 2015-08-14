var daggy = require('daggy'),
    tuples = require('fantasy-tuples'),

    Angle = require('angle'),

    Vector = daggy.tagged('x');

Vector.Zero = Vector([0, 0]);

Vector.fromAngle = function(x, y) {
    return Vector([y * x.cos(), y * x.sin()]);
};

Vector.prototype.px = function() {
    return this.x[0];
};

Vector.prototype.py = function() {
    return this.x[1];
};

Vector.prototype.map = function(f) {
    function go(x, y, z) {
        var i = x.length - y;
        return y < 1 ? z : go(x, y - 1, y[i](f(x[i])));
    }
    return Vector(go(this.x, this.x.length, []));
};

Vector.prototype.angle = function() {
    return this.x > 0 ? Angle(Math.atan(this.y / this.x)) :
           this.x < 0 ? Angle(Math.atan(this.y / this.x) + Angle.Pi) :
           this.y <= 0 ? Angle.Zero : Angle.Quarter;
};

Vector.prototype.length = function() {
    function go(x, y, z) {
        var i = x.length - y;
        return y < 1 ? z : go(x, y - 1, z + (x[i] * x[i]));
    }
    return Math.sqrt(go(this.x, this.x.length, 0));
};

Vector.prototype.add = function(x) {
    var a = this.x,
        b = x.x;
    return Vector(a[0] + b[0], a[1] + b[1]);
};

Vector.prototype.minus = function(x) {
    var a = this.x,
        b = x.x;
    return Vector(a[0] - b[0], a[1] - b[1]);
};

Vector.prototype.toTuple = function() {
    return tuples.Tuple2(this.x[0], this.x[1]);
};