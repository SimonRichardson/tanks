var daggy = require('daggy'),

    Size = daggy.tagged('width', 'height');

Size.prototype.positionedAt = function(x) {
    return Rectangle(x.x, x.y, x.x + this.width, x.y + this.height);
};

Size.prototype.centeredAt = function(x) {
    var w = this.width / 2,
        h = this.height / 2;
    return Rectangle(x.x - w, x.y - h, x.x + w, x.y + h);
};

// Export
if (typeof module != 'undefined')
    module.exports = Size;