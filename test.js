const assert = require('assert');
const fs = require("fs");
const geoIndex = require("./geojson-lookup");

function loadGeoJson()
{
    return  JSON.parse(fs.readFileSync("./testdata.geojson", 'utf8'));
}

var geojs = loadGeoJson();
var indexTable = geoIndex.buildIndex(["areaType","parentId"],geojs);
var res = geoIndex.getCollection.byProperty("areaType", "2", geojs, indexTable);


assert.deepEqual(res[0], geojs.features[39]);