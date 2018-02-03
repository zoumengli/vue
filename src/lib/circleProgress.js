/**
 * 调用示例
 * <canvas id="circle-progress-custom" width="200" height="200"></canvas>
 * circleProgress({
        id: 'circle-progress-custom',
        progress: 70, // default: 100
        duration: 2000, // default: 1000
        color: 'red', // default: 'rgb(52, 145, 204)'
        bgColor: 'green', // default: 'rgb(230, 230, 230)'
        textColor: 'blue', // default: 'black'
        progressWidth: 0.15, // default: 0.25 (r)
        fontScale: 0.5, // default: 0.4 (r)
        toFixed: 1  // default: 0
    });
 */
const requestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
            function (cb) {
                return window.setTimeout(cb, 1000 / 60);
            };
})();

const cancelAnimationFrame = (function () {
    return window.cancelAnimationFrame ||
            window.clearTimeout;
})();

export function circleProgress(options) {
    if (options.progress !== 0) {
        options.progress = options.progress || 100;
    }
    if (options.duration !== 0) {
        options.duration = options.duration || 1000;
    }
    options.fps = 60;    // requestAnimationFrame / cancelAnimationFrame
    options.color = options.color || 'rgb(52, 145, 204)';
    options.bgColor = options.bgColor || 'rgb(230, 230, 230)';
    options.textColor = options.textColor || 'black';
    options.progressWidth = options.progressWidth || 0.25; //r
    options.fontScale = options.fontScale || 0.4; //r

    options.toFixed = options.toFixed || 0;
    let canvas = document.getElementById(options.id);
    if (canvas == null || canvas.getContext == null) {
        return;
    }
    options.width = canvas.width;
    options.height = canvas.height;
    options.context = canvas.getContext('2d');

    const step = function () {
        if (options.current < options.progress && options.duration > 0) {
            drawCircleProgress(options);
            options.current += options.progress * (1000 / options.fps) / options.duration;
            canvas.setAttribute('data-requestID', requestAnimationFrame(step));
        } else {
            options.current = options.progress;
            drawCircleProgress(options);
            canvas.removeAttribute('data-requestID');
        }
    };

    cancelAnimationFrame(canvas.getAttribute('data-requestID'));
    options.current = 0;
    step();
};

const drawCircleProgress = function (options) {
    let ctx = options.context;
    let width = options.width;
    let height = options.height;
    let current = options.current;
    let color = options.color;
    let bgColor = options.bgColor;
    let textColor = options.textColor;
    let progressWidth = options.progressWidth;
    let fontScale = options.fontScale;

    let x = width / 2;
    let y = height / 2;
    let r1 = Math.floor(Math.min(width, height) / 2);
    let r2 = Math.floor(r1 * (1 - progressWidth));
    let startAngle = -Math.PI / 2;
    let endAngle = startAngle + Math.PI * 2 * current / 100;
    let fontSize = Math.floor(r1 * fontScale);
    
    ctx.save();
    ctx.clearRect(0, 0, width, height);

    ctx.beginPath();
    if (current > 0) {
        ctx.arc(x, y, r1, startAngle, endAngle, true);
        ctx.arc(x, y, r2, endAngle, startAngle, false);
    } else {
        ctx.arc(x, y, r1, 0, Math.PI * 2, true);
        ctx.arc(x, y, r2, Math.PI * 2, 0, false);
    }
    ctx.closePath();
    ctx.fillStyle = bgColor;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, r1, startAngle, endAngle, false);
    ctx.arc(x, y, r2, endAngle, startAngle, true);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();

    ctx.fillStyle = textColor;
    ctx.font = '' + fontSize + 'px arial';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText('' + current.toFixed(options.toFixed) + '%', x, y);
    ctx.restore();
};
