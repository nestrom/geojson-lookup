const PolygonLookup = require('polygon-lookup');
var _ = require('lodash');

var geojs, indexTable;
function buildIndex(properties, geoJson)
{
    geojs = geoJson;
    properties = properties || [];
    indexTable = properties.reduce((acc, val) => {
        acc[val] = {};
        return acc;
    }, {});

    properties.map((prop) => {
        geojs.features.map((feature, key) => {
            indexTable[prop][feature.properties[prop]] = indexTable[prop][feature.properties[prop]] || [];
            indexTable[prop][feature.properties[prop]].push(key);
        });
    });

    indexTable['_geoLookup'] = new PolygonLookup(geojs);
}

class Queries {
    constructor() {
        this._geojs = geojs;
        this._currentCollection = {};
        this._indexTable = indexTable;
    }

    _baseQuery(property, operator, value, operation) {
        /////Build the query for the current set for chaining
        var currentCollection = {};
        if (operator == "=") {
            try {
                currentCollection = this._indexTable[property][value];
            } catch (e) {
                currentCollection = {};
            }
        }
        else if (operator == "!=") {
            try {
                currentCollection = _.omit(this._indexTable[property], [value])
                currentCollection = _.reduce(currentCollection, (res, val, key)=>{
                    return _.union(res, val);
                });
            } catch (e) {
                currentCollection = {};
            }
        }
        else {
            throw new Error("Invalid operator, use '=' or '!=' ")
        }




        if (operation == 'get') {
            this._currentCollection = currentCollection
        }
        else if (operation == 'and') {
            this._currentCollection = _.intersection(currentCollection, this._currentCollection)
        }
        else if (operation == 'or') {
            this._currentCollection = _.union(currentCollection, this._currentCollection)
        }
        else {
        }
        return this;
    }

    query(property, operator, value) {
        this._baseQuery(property, operator, value, "get");
        return this;
    }

    and(property, operator, value) {
        this._baseQuery(property, operator, value, "and");
        return this;
    }

    or(property, operator, value) {
        this._baseQuery(property, operator, value, "or");
        return this;
    }

    get() {
        var _currentCollection = this._currentCollection;
        var result = _.filter(this._geojs.features, function (o, i) {
            return (_currentCollection.indexOf(i) != -1);
        });
        return result;
    }

    getKeys() {
        return this._currentCollection;
    }

    getByPoint (lat, long) {
        return this._indexTable._geoLookup.searchForMultiplePolygons(long, lat, -1).features;
    }
}

module.exports.buildIndex = buildIndex;
module.exports.Queries = Queries;

