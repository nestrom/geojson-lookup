var PolygonLookup = require( 'polygon-lookup' );

function buildIndex(properties, geojs)
{
    var indexTable = {};
    for(z in properties)
    {
        //console.log(indexTable);
        if(!indexTable.hasOwnProperty(properties[z]))
            indexTable[properties[z]] = {};

        for(x in geojs.features)
        {
            if(!indexTable[properties[z]].hasOwnProperty(geojs.features[x].properties[properties[z]])) {
                indexTable[properties[z]][geojs.features[x].properties[properties[z]]] = []
            }

            indexTable[properties[z]][geojs.features[x].properties[properties[z]]].push(x);
        }

    }
    indexTable['_geoLookup'] = new PolygonLookup( geojs );


    return indexTable;
}

var getCollection = {

    byProperty: (property, value, geojs, indexTable) => {
        var ids = indexTable[property][value];
        var result = [];
        for(x in ids)
        {
            result.push(geojs.features[ids[x]]);
        }
        return result;
    },
    byPoint: (lat, long, indexTable)=>{
        return indexTable._geoLookup.searchForMultiplePolygons(long, lat, -1);
    }
}


module.exports.buildIndex = buildIndex;
module.exports.getCollection = getCollection;
