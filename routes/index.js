let express = require('express');
let router = express.Router();

let API =  require('./request');

router.get('/', function(req, res) {
    API.getToday().then(response => {
        if(!response.data.error){
            let r = response.data.results
            let list = [];
            list.push(r['Android'], r['iOS'], r['前端'], r['拓展资源'])
            res.render('./pages/index/index', {list: list});
        }
    })
});

router.get('/all', function(req, res) {
    API.getAll('Android', 1).then(response => {
        if(!response.data.error){
            res.render('./pages/all/index', {cate: response.data.results});
        }
    })
});

let mapping = {
    Android: 'Android',
    iOS: 'iOS',
    web: '前端',
    expend: '拓展资源'
}

router.get('/data', function(req, res) {
    API.getAll(mapping[req.query.category], req.query.pageNo).then(response => {
        if(!response.data.error){
            res.json(response.data.results);
        }
    })
});

module.exports = router;