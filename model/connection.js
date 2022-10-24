const mysql = require('mysql')

class Connection {
    configMysql = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'demo2006',
        charset: 'utf8_general_ci'
    }

    getConnection() {
        return mysql.createConnection(this.configMysql)
    }

    connecting() {
        this.getConnection().connect(err => {
            if (err) {
                console.log(err)
            }
            else console.log("connection done")
        })
    }
}

module.exports = new Connection()
//done