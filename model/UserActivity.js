const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserActivitySchema = new Schema({
    user : {
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    ip : {
        type:String
    },
    uaString : {
        type:String
    },
    date : {
        type:Date,
        default:Date.now
    }
});

module.exports = UserActivity = mongoose.model('userActivities',
                        UserActivitySchema);
