![Badge](https://img.shields.io/npm/dt/geojson-lookup.svg)
# geojson-lookup
ITS ALL ABOUT SPEED and no alteration to your GEOJSONs 

Lookup Geojson feature collections by indexing them by feature properties (INDEX TABLES) and by a Geometry (R-TREE) all in memory.

###Usage 

1) Install through npm

`npm install geojson-lookup`

2) Require the module 

`var geoIndex = require("geojson-lookup");`

3) Initialize by passing Properties to indexBy and by passing a geoJson
 
 `var geo = new geoIndex.Collection([ PROPERTIES_TO_INDEX ],GEOJSON_OBJECT);`
 
 example:  
 `var geo = new geoIndex.Collection(["areaType","parentId"],geojs);`
 
 4) Query your polygon by indexed property 
 
 - Start by calling the query method on the object as `.query(INDEXED_PROPERTY, OPERATOR("==" or "!="), VALUE_TO_QUERY)`
 - Now you can chain `.and()` , `or.()` to your query with the same parameter as `.query()` 
 - Once done call the method `.get()` to get your results as an `[ ARRAY_OF_FEATURES ]`  
 
 example:  
 `var resByProp = (geo.query("areaType", "!=" ,'1','get').and("parentId", "=", "null").or("areaType","=","3").get());`
 
 5) You can query by Lattitude and Longitude 
 
 `geo.getByPoint(LAT, LONG)`
 
 example:  
 `var resByPoint = geo.getByPoint(28.98066, 36.25222);`
 
 returns `[ ARRAY_OF_FEATURES ]`
