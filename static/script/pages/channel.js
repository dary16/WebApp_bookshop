/**
 * Created by Dary on 2017/3/22.
 */
var sex = location.href.split('/').pop();
$.get('/ajax/' + sex,function(d){
    new Vue({
        el: '#app',
        data: d
    });
},'json');