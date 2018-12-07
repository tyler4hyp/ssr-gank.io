require('../base/index.scss');
require('../base/index.js');

require('../../components/header/index.scss');

require('../../components/content-tab/index.scss');

require('../../components/news-item/index.scss');

require('./index.scss');

const newItem = require('../../components/news-item/index.njk');

let config = {
    category: 'Android',
    pageNo: 1
};

$('#all .load-more').on('click', function(){
    config.pageNo++;
    fetch(`/data?category=${config.category}&pageNo=${config.pageNo}`).then(
        res => res.json()
    ).then(data => {
        let df = document.createDocumentFragment();
        for(let i=0; i < data.length; i++){
            let html = newItem.render({item: data[i]});
            df.appendChild($(html)[0]);
        }
        $('#all .main-content .list-wrap')[0].appendChild(df);
        console.log(data);
    })
})

let mapping = ['Android', 'iOS', 'web', 'expend']

$('.content-tab').delegate('.tab-item', 'click', function(e){
    let $target = $(e.target);
    let index = '';
    if($target.hasClass('tab-item')){
        index = $target.data('index')
    }else{
        index = $target.parent('.tab-item').data('index')
    }
    if(index !== ''){
        $('.content-tab .tab-item.active').removeClass('active');
        let list = $('.content-tab .tab-item');
        $(list[index]).addClass('active');
        config.category = mapping[index];
        config.pageNo = 1;
        fetch(`/data?category=${config.category}&pageNo=${config.pageNo}`).then(
            res => res.json()
        ).then(data => {
            let html = '';
            for(let i=0; i < data.length; i++){
                let temp = newItem.render({item: data[i]});
                html += temp;
            }
            $('#all .main-content .list-wrap')[0].innerHTML = html;
        })
    }
})


$(document).ready(function(){
    let list = $('#common-header .navbar-nav .nav-item');
    $(list[1]).addClass('active');

    let tabs = $('.content-tab .tab-item')
    $(tabs[4]).css('display', 'none');
    $(tabs[3]).css('display', 'none');
    $(tabs[2]).css('display', 'none');
})