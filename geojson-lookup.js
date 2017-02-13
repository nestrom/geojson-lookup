const PolygonLookup = require( 'polygon-lookup' );

function buildIndex(properties, geojs)
{
    properties = properties || [];
    var indexTable = properties.reduce((acc, val) => {
        acc[val] = {};
        return acc;
    }, {});

    properties.map((prop) => {
        geojs.features.map((feature, key) => {
            indexTable[prop][feature.properties[prop]] = indexTable[prop][feature.properties[prop]] || [];
            indexTable[prop][feature.properties[prop]].push(key);
        });
    });

    indexTable['_geoLookup'] = new PolygonLookup( geojs );
    return indexTable;
}

var getCollection = {

    byProperty: (property, value, geojs, indexTable) => {
        try {
            return indexTable[property][value].map((id) => geojs.features[id])
        }catch(e){
            return [];
        }
    },
    byPoint: (lat, long, indexTable) => {
        return indexTable._geoLookup.searchForMultiplePolygons(long, lat, -1);
    }
}

module.exports.buildIndex = buildIndex;
module.exports.getCollection = getCollection;
