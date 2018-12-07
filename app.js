const express = require('express');
const nunjucks  = require('nunjucks');
const path = require('path');
const router = require('./routes/index');
const compression = require('compression');
const app = express();

app.locals.reload = true;
app.set('view engine','njk'); 

let dev = process.env.NODE_ENV === 'development' ? true : false ;

if(dev){
    app.set('views',path.resolve(__dirname,'./src'));
    nunjucks.configure('./src',{autoescape:true,express:app});

    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddlewara = require('webpack-hot-middleware');
    const config = require('./webpack.config.js');
    const compiler = webpack(config);

    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath
    }));
    app.use(webpackHotMiddlewara(compiler, {
        log: console.log, 
        path: '/__webpack_hmr', 
        heartbeat: 10 * 1000
    }));
}else{
    app.set('views',path.resolve(__dirname,'./dist/views'));
    nunjucks.configure('./dist/views',{autoescape:true,express:app});
}

app.use(compression());

app.use(express.static('./dist/assets'));
app.use(express.static('static'));

app.use('/', router);
app.listen(3000, function(){
    console.log('Server is running...');
});