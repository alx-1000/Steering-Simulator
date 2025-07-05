// VehicleKinematics.js
// 車両運動モデルクラス
class VehicleKinematics {
    constructor(x, y, angle, velocityVec) {
        this.x = x;
        this.y = y;
        this.velocity = velocityVec.copy();
        this.angle = angle; // 車両の向き
        this.angularVelocity = 0; // 角速度
        this.steering = 0; // ステアリング角
    }

    // 曲率半径を計算
    static calcCurvatureRadius(speed, steering) {
        if (steering === 0) return Infinity;
        let omega = steering * speed;
        let radius = Math.abs(speed / omega);
        return radius;
    }

    // 曲率中心を計算
    static calcCurvatureCenter(x, y, velocityVec, speed, steering) {
        let radius = VehicleKinematics.calcCurvatureRadius(speed, steering);
        if (!isFinite(radius)) return null; // 直進時は中心なし
        let normal = createVector(-velocityVec.y, velocityVec.x).normalize();
        let sign = Math.sign(steering);
        let centerX = x + normal.x * radius * sign;
        let centerY = y + normal.y * radius * sign;
        return createVector(centerX, centerY);
    }

    //向きを更新
    updateAngle(steering) {
        this.steering = steering;
        if (typeof speed !== 'undefined' && speed > 0) {
            this.angle += steering;
            this.angle = (this.angle + TWO_PI) % TWO_PI;
        }
    }

    // 速度ベクトルを更新
    updateVelocity(speed, steering) {
        this.velocity = p5.Vector.fromAngle(this.angle - HALF_PI).normalize();
        if (speed > 0) {
            this.velocity.set(this.velocity.x, this.velocity.y);
        } else {
            this.velocity.set(0, 0);
        }
    }

    // 位置を更新
    updatePosition(speed) {
        this.x += this.velocity.x * speed;
        this.y += this.velocity.y * speed;
    }
}
