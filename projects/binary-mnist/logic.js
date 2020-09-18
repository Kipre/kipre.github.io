import*as ui from './ui.js';
import*as io from './io.js';
import*as viz from './viz.js';

var model = createDenseModel();
var examplesArray;
var labelsArray;
var stopRequested = false;

async function loadData() {
    const arrays = await io.readDataset();
    examplesArray = arrays.examples
    labelsArray = arrays.labels
}

async function getData() {
    if (examplesArray == undefined) {
        throw "Data not loaded yet!";
    }
    return {
        examples: tf.tensor2d(examplesArray),
        labels: tf.tensor2d(labelsArray)
    }
}

function createDenseModel() {
    const model = tf.sequential();
    model.add(tf.layers.dense({
        inputShape: [400],
        units: 64,
        activation: 'relu'
    }));
    model.add(tf.layers.dense({
        units: 32,
        activation: 'relu'
    }));
    model.add(tf.layers.dense({
        units: 2
    }));
    return model;
}

async function train(model, onIteration) {
    ui.log('Training model...');
    const optimizer = 'rmsprop';

    model.compile({
        optimizer,
        loss: 'meanSquaredError',
        metrics: ['accuracy'],
    });

    const batchSize = 128;
    const validationSplit = 0.15;
    const trainEpochs = 20;
    let trainBatchCount = 0;

    const trainData = await getData();

    const totalNumBatches = Math.ceil(trainData.examples.shape[0] * (1 - validationSplit) / batchSize) * trainEpochs;

    let valAcc;

    await model.fit(trainData.examples, trainData.labels, {
        batchSize,
        validationSplit,
        epochs: trainEpochs,
        callbacks: {
            onBatchEnd: async(batch,logs)=>{
                if (stopRequested) {
                    model.stopTraining = true;
                } else {

                    trainBatchCount++;
                    const percentage = (trainBatchCount / totalNumBatches * 100).toFixed(1)
                    ui.log(`Training... (` + `${percentage}%` + ` complete). To stop training, refresh or close page.`);
                    ui.showTrainingProgress(percentage);

                    await plot();
                }
                await tf.nextFrame();
            }
            ,
            onEpochEnd: async(epoch,logs)=>{
                valAcc = logs.val_acc;
                await tf.nextFrame();
            }
        }
    });

    const finalValAccPercent = valAcc * 100;

    ui.log(`Final validation accuracy: ${finalValAccPercent.toFixed(1)}%; `);
}

async function plot() {
    const currentLabels = await model.predict(tf.tensor2d(examplesArray)).array()
    await viz.plot(examplesArray, currentLabels);
}

function toTensor(rawImg) {
    var tensor = tf.tensor3d(Array.prototype.slice.call(rawImg.data), [rawImg.height, rawImg.width, 4]);
    tensor = tf.div(tensor.slice([0, 0, 3]), 255);
    tensor = tf.image.resizeNearestNeighbor(tensor, [20, 20]).squeeze();
    return tensor;
}

ui.setValidationCallback(async ()=>{
    const raw = ui.getRawImage();
    const tensor = toTensor(raw);
    if (tf.any(tf.cast(tensor, 'bool')).arraySync()) {
        await io.saveImage(tensor.flatten().squeeze().arraySync(), ui.getCurrentLabel(),
        (id) => ui.log("Document written successfully with ID: " + id));
        ui.clearCanvas();
        tf.browser.toPixels(tensor, ui.printingCanvas);
    } else {
        ui.log('Please draw something on the canvas before committing.');
    }
}
);

ui.setEvaluationCallback(async()=>{
    const image = toTensor(ui.getRawImage()).flatten().squeeze();
    const result = await model.predict(image.reshape([1, 400]))
    ui.log(`Model output: ${result.toString()}`);
    viz.addExampleToPlot(await image.array(), await result.squeeze().array());
}
);

ui.setTrainingCallback(async()=>{
    stopRequested = false;
    ui.showTrainingProgress(1);
    await train(model, ()=>true);
}
);

ui.setResetCallback(()=>{
    stopRequested = true;
    model = createDenseModel();
    plot();
    ui.showTrainingProgress(0);
    ui.log('Model reset.')
}
);

loadData().then(()=>{

    // Show examples
    const localCopy = examplesArray.slice(0, examplesArray.length)
    const examples = localCopy.sort(()=>.5 - Math.random()).slice(0, 16);
    ui.showExamples(examples);

    // Plot first guess
    plot();
}
);

// Update example counters
io.getCount().then(res=>ui.setCounters(res));
