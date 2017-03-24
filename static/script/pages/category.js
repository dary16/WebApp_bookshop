/**
 * Created by Dary on 2017/3/22.
 */
$.get('/ajax/category',function(d){
    new Vue({
        el: '#app',
        data: d
    });
},'json');