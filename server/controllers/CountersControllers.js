
var mongojs = require('mongojs');
var db = mongojs(global.dbConfigUrl);
var counterCache = {};


function getNextSequence(sequenceName, insertedObject, next) {
    var ret = db.counters.findAndModify(
        {
            query: { _id: sequenceName },
            update: { $inc: { seq: 1 } },
            new: true
        }, function (err, ret, lastErrorObject) {
            if (err) {
                console.log(err);
                return;
            }
            insertedObject._id = ret.seq;
            console.log("ret:" + ret.seq); 
            next();
        }
    );
}

module.exports = function initAndGetNextSequence(sequenceName, insertedObject, next) {

    if (counterCache[sequenceName] != null) {
        console.log("directly calling");
        return getNextSequence(sequenceName, insertedObject, next);
    }

    db.counters.findOne({
        _id: sequenceName
    }, function (err, requestSequence) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(JSON.stringify(requestSequence, null, 2));
        // requestSequence not initialized
        if (requestSequence == null) {
            db.counters.insert(
                {
                    _id: sequenceName,
                    seq: 0
                }
            )
        }
        counterCache[sequenceName] = true;
        console.log(sequenceName + " CACHED");

        return getNextSequence(sequenceName, insertedObject, next);
    }
    );
}