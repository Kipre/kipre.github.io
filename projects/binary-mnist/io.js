const firebaseConfig = {
    apiKey: "AIzaSyDwxI4I-bofCFOATLhGPUUS2nFVa9KBJIU",
    authDomain: "surf-16cf2.firebaseapp.com",
    databaseURL: "https://surf-16cf2.firebaseio.com",
    projectId: "surf-16cf2",
    storageBucket: "surf-16cf2.appspot.com",
    messagingSenderId: "969093632326",
    appId: "1:969093632326:web:f31539998a7a8446d19547",
    measurementId: "G-KSEHC2L0VZ"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const counter = db.collection('metadata').doc('dataset-counter');
const dataset = db.collection("dataset");

export async function readDataset() {
    // var examples = [];
    // var targets = [];
    // await dataset.where("validated", "==", true).get().then((querySnapshot)=>{
    //     querySnapshot.forEach((doc)=>{
    //         let example = doc.data()
    //         examples.push(example.data);
    //         targets.push((example.label == "0") ? [1, 0] : [0, 1])
    //     }
    //     );
    // }
    // ).catch(function(error) {
    //     console.log("Error getting documents: ", error);
    // });
    // return {
    //     examples,
    //     targets
    // }
    const response = await fetch('digits_dataset.json');
    const json = await response.json();
    return json;
}

export async function getCount() {
    const result = await counter.get()
    return result.data();
}

export function saveImage(image, currentLabel, successCallback = id => console.log("Document written successfully with ID: ", id)) {
    dataset.add({
        data: image,
        validated: true,
        label: currentLabel
    }).then((docRef) => {
        let newCount = null;
        if (currentLabel == '0') {
            newCount = {
                zero: firebase.firestore.FieldValue.increment(1)
            }
        } else {
            newCount = {
                one: firebase.firestore.FieldValue.increment(1)
            }
        }
        counter.update(newCount).then(successCallback(docRef.id));
    }).catch((error) => {
        console.error("Error adding document: ", error);
    });
}