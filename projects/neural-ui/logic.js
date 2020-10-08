const imgSize = 32;
const apparentSize = 400;
const zoom = apparentSize / imgSize;
const resc = 255 / imgSize;
const radius = 3;



clip = (x, a, b) => Math.min(Math.max(x, a), b);
project = (x, a, b, c, d) => {
    const slope = (d-c)/(b-a);
    const intercept = c - a*slope;
    return x*slope + intercept;
}


async function init() {
    let isClicked = false;
    const logger = document.getElementById('log');
    const canvas = document.getElementById('drawing-canvas');
    const ctx = canvas.getContext('2d');

    let currentPosition = [Math.random() * imgSize, Math.random() * imgSize]
    let fileH;
    let drag = false;
    const observations = 100000;
    let observation = 0;
    const bytesPerRow = 7 + imgSize ** 2 + 2 + 1;
    const buffer = new Uint8ClampedArray(observations * bytesPerRow);

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function getRawImage() {
        return ctx.getImageData(0, 0, canvas.width, canvas.height);
    }

    const render = ()=>{
        clearCanvas();
        for (let i = -radius; i < radius; i++) {
            for (let j = -radius; j < radius; j++) {
                const [a,b] = [i + Math.round(currentPosition[0]), j + Math.round(currentPosition[1])];
                if (touches(a, b))
                    ctx.fillRect(a, b, 1, 1);
            }
        }
        //         ctx.beginPath();
        //         ctx.arc(...currentPosition, radius, 0, 2 * Math.PI);
        //         ctx.fill();
    }

    function touches(a, b) {
        return Math.sqrt((a - currentPosition[0]) ** 2 + (b - currentPosition[1]) ** 2) < radius;
    }

    canvas.onmousedown = (e)=>isClicked = true;

    canvas.onmouseup = (e)=>isClicked = false;

    document.onmousemove = (e)=>{
        if (e.target === canvas) {
            const state = getState(e);
//             console.log(state);
            if (isClicked && touches(e.offsetX / zoom, e.offsetY / zoom)) {
                currentPosition = [currentPosition[0] += (e.movementX / zoom) * 0.79, 
                                   currentPosition[1] += (e.movementY / zoom) * 0.79]
                render();
                drag = true;
            }
            const pos = currentPosition.map((e) => project(e, 0, 32, 0, 255));
//             console.log([...state, ...pos, (drag) ? 255 : 0, ...getOutput()]);
            if (observation < observations) {
                for (const [i,e] of [...state, ...pos, (drag) ? 255 : 0, ...getOutput()].entries()) {
                    buffer[i + observation * bytesPerRow] = e;
                }
                observation++;
                log(observation);
            }
            drag = false;
        }
    }

    render()

    function getState(e) {
        const mousePosition = [e.offsetX, e.offsetY].map((e) => project(e, 0, 400, 0, 255));
        const mouseMovement = [e.movementX , e.movementY].map((e) => project(e, -50, 50, 0, 255));
        const pos = currentPosition.map((e) => project(e, 0, 32, 0, 255));
        const click = (isClicked) ? 255 : 0
        return Uint8ClampedArray.of(...pos, ...mousePosition, ...mouseMovement, click);
    }

    function getOutput() {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        return imgData.data.filter((e,i)=>(i + 1) % 4 == 0);
    }

    async function getNewFileHandle() {
        const opts = {
            type: 'save-file',
            accepts: [{
                description: 'Text file',
                extensions: ['txt'],
                mimeTypes: ['application/octet-stream'],
            }],
        };
        return await window.chooseFileSystemEntries(opts);
    }

    async function writeFile(fileHandle, contents) {
        // Create a FileSystemWritableFileStream to write to.
        const writable = await fileHandle.createWritable();
        // Write the contents of the file to the stream.
        await writable.write(contents);
        // Close the file and write the contents to disk.
        await writable.close();
    }

    document.getElementById('savefile').onclick = async()=>{
        fileH = await getNewFileHandle();
        if (fileH)
            writeFile(fileH, buffer);
    }

    function log(text) {
        logger.innerText = text;
    }
}

async function neuralUI() {
    let currentPosition = [Math.random(), Math.random()];
    const renderModel = await tf.loadLayersModel('render_model/model.json');
    const dragModel = await tf.loadLayersModel('drag_model/model.json');
    const posModel = await tf.loadLayersModel('pos_model/model.json');
    let isClicked = false;
    const canvas = document.getElementById('testing-canvas');

    canvas.onmousedown = (e)=>isClicked = true;

    canvas.onmouseup = (e)=>isClicked = false;

    async function draw(state) {
        const input = tf.tensor2d(state, [1, 7]);
        const drag = dragModel.predict(input);
        drag.slice([0, 1], [1, 1]).print();
//         const pos = posModel.predict(tf.concat([input, drag.slice([0, 1], [1, 1])], 1));
        const d_pos = posModel.predict(tf.concat([input, drag.slice([0, 1], [1, 1])], 1));

        const pos = tf.tensor2d(currentPosition, [1, 2]).mul(0.9).add(d_pos);
        pos.print();
        const img = renderModel.predict(pos);
        const img1 = tf.reshape(img, [32, 32]);
        const img2 = img1.sub(tf.min(img1));
        const img3 = img2.div(tf.max(img2));
        await tf.browser.toPixels(img3, canvas);
        return pos;
    }

    canvas.onmousemove = async(e)=>{
        if (e.target === canvas) {
            const state = getState(e);
//             console.log(state);
            const res = await draw(state);
            const [[a, b]] = res.arraySync();
            currentPosition = [clip(a, 0.01, 0.99), clip(b, 0.01, 0.99)];
        }
    }

    function getState(e) {
        const mousePosition = [e.offsetX, e.offsetY].map((e) => project(e, 0, 400, 0, 1));
        const mouseMovement = [e.movementX , e.movementY].map((e) => project(e, -50, 50, -1, 1));
        console.log(mouseMovement)
        const pos = [clip(currentPosition[0], 0, 1), clip(currentPosition[1], 0, 1)];
        const click = (isClicked) ? 1 : 0;
        return [...pos, ...mousePosition, ...mouseMovement, click];;
    }

    draw([...currentPosition, 0, 0, 0, 0, 0]);
}

window.onload = async () => {
    init();
    neuralUI();
}
