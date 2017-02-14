const assert = require('assert');
const fs = require("fs");
const geoIndex = require("./geojson-lookup");


function loadGeoJson()
{
    return  JSON.parse(fs.readFileSync("./testdata.geojson", 'utf8'));
}

var geojs = loadGeoJson();


var geo = new geoIndex.Collection(["areaType","parentId"],geojs);

//Test Polygon lookup by point////
var resByPoint = geo.getByPoint(28.98066, 36.25222);
assert.equal(resByPoint.length, 2);
assert.equal(resByPoint[0].properties.areaId, 'a5-14');
assert.equal(resByPoint[1].properties.areaId, 'a5-0');


var resByProp = (geo.query("areaType", "!=" ,'1','get').and("parentId", "=", "null").or("areaType","=","3").get());
assert.equal(resByProp.length, 2 );
assert.equal(resByProp[0].properties.areaId, "a5-0" );
assert.equal(resByProp[1].properties.areaId, "a5-5" );

console.log("Passed..");