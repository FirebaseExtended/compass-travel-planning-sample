// import { createPlace } from '@compass/backend';
// import dataConnect from '../src/lib/data-connect';
// import { readFileSync } from 'fs';
const { createPlace, createActivity } = require('@compass/backend');
const { readFileSync } = require('fs');
const { initializeApp } = require('firebase/app');
const {getDataConnect, connectDataConnectEmulator} = require('firebase/data-connect')
const { connectorConfig } = require('@compass/backend');

const firebaseApp = initializeApp({});
const dc = getDataConnect(firebaseApp, connectorConfig)

connectDataConnectEmulator(
    dc, 
    'localhost', 
    9399, 
    false
);

const activityFile = "activity.json";
const placeFile = "place.json";

async function uploadActivities() {

    const data = readFileSync(
        activityFile,
        { encoding: 'utf-8' },
    )

    const activities = JSON.parse(data);

    for (const activity of activities) {
        activity.embedding = activity.embedding._values;
        activity.destinationRef = activity.destination;
        activity.place = activity.destination;
        delete(activity.destination);
        try {
        const r = await createActivity(dc, activity);
        console.log(r);
        } catch {
            console.log("likely existing activity duplicate entry");
        }
    }
}

async function uploadPlaces() {

    const data = readFileSync(
        placeFile,
        { encoding: 'utf-8' },
    )

    const places = JSON.parse(data);

    for (const place of places) {
        place.embedding = place.embedding._values;
        // console.log(place.embedding);
        try {
            const r = await createPlace(dc, place);
            console.log(r);
        } catch {
            console.log("likely existing place duplicate entry");
        }
    }
}

async function main() {
    await uploadPlaces();
    await uploadActivities();
}

main();