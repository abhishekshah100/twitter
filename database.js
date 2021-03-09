const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);

class Database {
    constructor(){
        this.connect();
    }
    connect()
    {
        mongoose.connect("mongodb+srv://admin:dbUserPassword@twittercluster.q33bm.mongodb.net/Twitter?retryWrites=true&w=majority")
        .then(()=>{ console.log('Database Connection successful')})
        .catch((err) => { console.log('Database Connection error '+err)})
    }
}
module.exports = new Database();