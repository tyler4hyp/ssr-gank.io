require('../base/index.scss');
require('../base/index.js');

require('../../components/header/index.scss');

require('../../components/content-tab/index.scss');

require('../../components/news-item/index.scss');

require('./index.scss');

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
        $('#index .main-content .category.show').removeClass('show');
        let list = $('.content-tab .tab-item');
        $(list[index]).addClass('active');
        list = $('#index .main-content .category');
        $(list[index]).addClass('show');
    }
})

$(document).ready(function(){
    let list = $('#common-header .navbar-nav .nav-item');
    $(list[0]).addClass('active');

    list = $('#index .main-content .category');
    $(list[0]).addClass('show');
})