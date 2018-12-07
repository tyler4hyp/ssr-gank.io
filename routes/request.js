const fly = require('flyio');
fly.config.baseURL = 'http://gank.io/api'

const config = {
    pageSize: 10
}

const API = {
    getToday() {
        return fly.get('/today')
    },

    getAll(category, pageNo) {
        return fly.get(`/data/${category}/${config.pageSize}/${pageNo}`)
    }
}

module.exports = API;