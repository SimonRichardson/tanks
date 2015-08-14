var daggy  = require('daggy'),
    tuples = require('fantasy-tuples'),

    Rectangle = require('rectangle'),

    Size = daggy.tagged('x');

Size.Zero = Size([0, 0]);

Size.prototype.width = function() {
    return this.x[0];
};

Size.prototype.height = function() {
    return this.x[1];
};

Size.prototype.map = function(f) {
    function go(x, y, z) {
        var i = x.length - y;
        return y < 1 ? z : go(x, y - 1, y[i](f(x[i])));
    }
    return Size(go(this.x, this.x.length, []));
};

Size.prototype.positionedAt = function(x) {
    return Rectangle(x.x, x.y, x.x + this.x[0], x.y + this.x[1]);
};

Size.prototype.centeredAt = function(x) {
    var w = this.x[0] / 2,
        h = this.x[1] / 2;
    return Rectangle(x.x - w, x.y - h, x.x + w, x.y + h);
};

Size.prototype.toTuple = function() {
    return tuples.Tuple2(this.x[0], this.x[1]);
};

// Export
if (typeof module != 'undefined')
    module.exports = Size;