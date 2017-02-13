# geojson-lookup
ITS ALL ABOUT SPEED and no alteration to your GEOJSONs 

Lookup Geojson feature collections by indexing them by feature properties (INDEX TABLES) and by a Geometry (R-TREE) all in memory.

###Usage 

1) Install through npm

`npm install geojson-lookup`

2) Require the module 

`var geoIndex = require("geojson-lookup");`

3) Identify properties you want to index by under the features.properties of a geojson.
Build your index accordingly

` indexTable = geoIndex.buildIndex([ ARRAY_OF_FEATURE_PROPERTY_KEYS_TO_INDEXBY],GEOJSON_OBJECT);`

Returns IndexTable

4) Query by propertyId

`geoIndex.getCollection.byProperty(FEATURE_PROPERTY, PROPERTY_VALUE_TO_MATCH, GEOJSON_OBJECT, INDEX_TABLE);`

Returns Feature Collection Array

4) Query by Lat Long Point

`geoIndex.getCollection.byPoint(LATTITUDE, LONGITUDE, INDEX_TABLE)`

Returns Feature Collection Array


###Example Usage

`
var fs = require("fs");
var geoIndex = require("geojson-lookup");

function loadGeoJson()
{
    var contents = fs.readFileSync("./astra.geojson", 'utf8');
    return  JSON.parse(contents);
}

var geojs = loadGeoJson();
var indexTable = geoIndex.buildIndex(["areaType","parentId"],geojs);
var res = geoIndex.getCollection.byProperty("parentId", "123", geojs, indexTable);



console.log(res);
console.log(geoIndex.getCollection.byPoint(28.98066, 36.25222, indexTable));
`