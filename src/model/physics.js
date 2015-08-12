var daggy = require('daggy'),
    Lens  = require('fantasy-lenses').Lens,

    lenses = {
        angle       : Lens.objectLens('angle'),
        position    : Lens.objectLens('position'),
        velocity    : Lens.objectLens('velocity'),
        acceleration: Lens.objectLens('acceleration')
    },

    Physics = daggy.tagged('position', 'size', 'angle', 'velocity', 'acceleration', 'friction', 'maxSpeed');

Physics.prototype.run = function(allowMove) {
    var fm = friction.complement,

        p = constrainPosition(allowMove, this.position, this.position.add(this.velocity)),
        v = constrainVelocity(this.velocity, this.velocity.multiply(fm.amount).add(acceleration), this.maxSpeed),

        x = lenses.position.run(this).set(p),
        y = lenses.velocity.run(x).set(v);

    return lenses.acceleration.run(y).set(Velocity.Zero);
};

Physics.prototype.nextFrameAllowed = function(allowMove) {
    return allowMove(this.position.add(this.velocity));
};

Physics.prototype.accelerateForward = function(x) {
    return this.accelerate(Vec.fromAngle(this.angle, x));
};

Physics.prototype.accelerate = function(x) {
    var l = lenses.acceleration.run(this); 
    return l.set(l.get().add(x));
};

Physics.prototype.rotateTo = function(x) {
    return lenses.angle.run(this).set(x);
};

Physics.prototype.rotateBy = function(x, y) {
    var l = lenses.angle.run(this);
    return l.set(y.fold(
        function(){
            return l.get().add(x);
        },
        function(){
            return l.get().addUpTo(x, ?);
        }
    ));
};

function constrainPosition(allowMove, a, b) {
    return allowMove(b) ? b : a;
}

function constrainVelocity(speed, a, b) {
    return b.length() > speed ? a.withLength(speed) : b;
}