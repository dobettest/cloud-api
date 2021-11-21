const { createCanvas } = require('canvas');
const fss = require('fs');
/**
 * 产生一个随机数 可设置随机数区间
 * @param {[Number]} min [随机数区间下限]
 * @param {[Number]} max [随机数区间上限]
 * @return {[Number]} [返回一个在此区间的随机数]
 */
function ranNum(min, max) {

    return Math.floor(Math.random() * (max - min) + min);

}

/**
 * 返回一个随机颜色 可设置颜色区间
 * @param {[Number]} min [颜色下限]
 * @param {[Number]} max [颜色上限]
 * @return {[String]} [随机颜色]
 */
function ranColor(min, max) {

    var r = ranNum(min, max);

    var g = ranNum(min, max);

    var b = ranNum(min, max);

    // return "rgb(" + r + "," + g + "," + b + ")";
    return `rgb(${r},${g},${b})`;

}

/**
 * 随机字符串数组
 * @return {[Array]} [随机数组]
 */
function ranStr() {

    var str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm0123456789";

    return str.split("").sort(function () {
        return Math.random() - 0.5
    });

}

/**
 * 绘制文本字符串
 * @param {[String]} canvasId [canvas的id]
 * @param {[Number]} canvasW [canvas的width]
 * @param {[Number]} canvasH [canvas的height]
 * @param {[Number]} num [绘制验证码的字数]
 * @param {[Number]} fsMin [字体大小下限]
 * @param {[Number]} fsMax [字体大小上限]
 * @param {[Number]} frMin [字体旋转偏移下限]
 * @param {[Number]} frMax [字体旋转偏移上限]
 * @param {[Number]} min [颜色下限]
 * @param {[Number]} max [颜色上限]
 * @return {[String]} [随机字符串]
 */
function drawText(canvasId, canvasW, canvasH, num, fsMin, fsMax, frMin, frMax, min, max) {

    var str = "";

    for (var i = 0; i < num; i++) {

        var char = ranStr()[Math.floor(0, ranStr().length)];

        var fs = ranNum(fsMin, fsMax);

        canvasId.font = fs + "px Verdana";
        let color = ranColor(min, max);
        canvasId.fillStyle = color;
        // 保存绘制的状态
        canvasId.save();

        // context.translate(x,y);
        // x 添加到水平坐标（x）上的值
        // y 添加到垂直坐标（y）上的值
        // 偏移
        canvasId.translate(canvasW / num * i + canvasW / 20, 0);

        // 变换角度
        canvasId.rotate(ranNum(frMin, frMax) * Math.PI / 180);

        // context.fillText(text,x,y,maxWidth);
        // text 规定在画布上输出的文本。
        // x 开始绘制文本的 x 坐标位置（相对于画布）。
        // y 开始绘制文本的 y 坐标位置（相对于画布）。
        // maxWidth 可选。允许的最大文本宽度，以像素计。
        canvasId.fillText(char, 0, (canvasH + fs) / 2.5, canvasW / num);

        // 返回之前保存过的路径状态和属性
        canvasId.restore();

        str += char;
    }
    // console.log(str);
    return str;

}

/**
 * 绘制背景
 * @param {[Object]} canvasId [canvas的id]
 * @param {[Number]} canvasW [canvas的width]
 * @param {[Number]} canvasH [canvas的height]
 * @param {[Number]} min [下限]
 * @param {[Number]} max [上限]
 */
function drawBg(canvasId, canvasW, canvasH, min, max) {

    // 绘制canvas背景
    canvasId.fillStyle = ranColor(min, max)
    // 填充颜色
    canvasId.fillRect(0, 0, canvasW, canvasH);

}

/**
 * 绘制干扰 圆点
 * @param {[String]} canvasId [canvas的id]
 * @param {[Number]} canvasW [canvas的width]
 * @param {[Number]} canvasH [canvas的height]
 * @param {[Number]} num [绘制的数量]
 * @param {[Number]} r [圆点半径]
 * @param {[Number]} min [下限]
 * @param {[Number]} max [上线]
 */
function drawCircle(canvasId, canvasW, canvasH, num, r, min, max) {

    for (var i = 0; i < num; i++) {

        // 开始绘制 （拿起笔）
        canvasId.beginPath();

        // context.arc(x,y,r,sAngle,eAngle,counterclockwise); （绘制）
        // x 圆的中心的 x 坐标。
        // y 圆的中心的 y 坐标。
        // r 圆的半径。
        // sAngle 起始角，以弧度计。（弧的圆形的三点钟位置是 0 度）。
        // eAngle 结束角，以弧度计。
        // counterclockwise 可选。规定应该逆时针还是顺时针绘图。False = 顺时针，true = 逆时针。
        canvasId.arc(ranNum(0, canvasW), ranNum(0, canvasH), r, 0, 2 * Math.PI);

        // 填充颜色
        canvasId.fillStyle = ranColor(min, max);

        // 填充
        canvasId.fill();

        // 闭合绘制 （放开笔）
        canvasId.closePath();

    }

}

/**
 * 绘制干扰 线段
 * @param {[String]} canvasId [canvas的id]
 * @param {[Number]} canvasW [canvas的width]
 * @param {[Number]} canvasH [canvas的height]
 * @param {[Number]} num [绘制的数量]
 * @param {[Number]} min [下限]
 * @param {[Number]} max [上线]
 */
function drawLine(canvasId, canvasW, canvasH, num, min, max) {

    for (let i = 0; i < num; i++) {

        // 开始绘制 （拿起笔）
        canvasId.beginPath();

        // 绘制开始点
        canvasId.moveTo(ranNum(0, canvasW), ranNum(0, canvasH));

        // 绘制结束点
        canvasId.lineTo(ranNum(0, canvasW), ranNum(0, canvasH));

        canvasId.strokeStyle = ranColor(min, max);

        canvasId.stroke();

        canvasId.closePath();

    }

}

// 绘制验证码
function drawCanvas(ctxW = 200, ctxH = 80) {
    const canvas = createCanvas(ctxW, ctxH);
    const ctx = canvas.getContext('2d')
    // 清空canvas
    ctx.clearRect(0, 0, 200, 60);

    // 绘制背景
    drawBg(ctx, ctxW, ctxH, 200, 255);

    // 绘制干扰圆点
    drawCircle(ctx, ctxW, ctxH, 20, 5, 200, 255);

    // 绘制干扰线段
    drawLine(ctx, ctxW, ctxH, 20, 0, 255);
    // 绘制验证码
    var str = drawText(ctx, ctxW, ctxH, 4, 30, 50, -30, 30, 0, 100);
    var img = canvas.toDataURL('image/base64')
    return {img,str};
}
module.exports = {
    drawCanvas
}