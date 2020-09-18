var isDrawing = false;
const rectSize = 30;
const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');
const labelSelector = document.getElementById("label");
const logger = document.getElementById("log");
const progress = document.getElementById("progress");
var validationCallback = null;

export const printingCanvas = document.getElementById("printing-canvas");

export function setCounters(numbers) {
    document.getElementById('counter-0').innerText = numbers.zero.toString();
    document.getElementById('counter-1').innerText = numbers.one.toString();
}

export async function showExamples(examples) {
    const parent = document.getElementById('examples');
    for (let i=0; i<examples.length; i++) {
        const cvs = document.createElement('canvas');
        cvs.classList.add('digit-cvs');
        parent.appendChild(cvs);
        tf.browser.toPixels(tf.tensor2d(examples[i], [20, 20]), cvs);
    }
}


export function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export function getRawImage() {
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

export function setEvaluationCallback(callback) {
    document.getElementById('evaluate').onclick = callback
}

export function setTrainingCallback(callback) {
    document.getElementById('train').onclick = callback
}

export function setResetCallback(callback) {
    document.getElementById('reset').onclick = callback
}

export function setValidationCallback(callback) {
    validationCallback = callback
    document.getElementById('commit').onclick = callback
}

export function showTrainingProgress(percentage) {
    progress.style.width = percentage.toString() + '%';
}

export function getCurrentLabel() {
    return (labelSelector.checked == true) ? 1 : 0;
}

export function log(text) {
    logger.innerText = text
    printingCanvas.height = 0;
    printingCanvas.width = 0;
}

const paint = e => {
    ctx.beginPath();
    ctx.arc(e.offsetX, e.offsetY, rectSize / 1.8, 0, 2 * Math.PI);
    ctx.fill();
}

document.getElementById('clear').onclick = clearCanvas

window.onmousedown = (e) => {
    if (e.srcElement == canvas) {
        isDrawing = true;
        paint(e);
    }
}

window.onmouseup = (e) => {
    isDrawing = false;
}

window.onmousemove = (e) => {
    if (isDrawing & e.srcElement == canvas) {
        paint(e);
    }
}

document.addEventListener('keypress', function(e) {
    if (e.ctrlKey && e.key === 'Tab') {
        validationCallback();
    }
});
