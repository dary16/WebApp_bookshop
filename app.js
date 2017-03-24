var koa=require('koa');
var controller=require('koa-route');
var app=koa();

var views=require('co-views');
var render=views('./view',{
    map:{ html: 'ejs' }
});

var koa_static=require('koa-static-server');
var service=require('./service/webAppService.js');
app.use(koa_static({
    rootDir:'./static/',
    rootPath:'/static/',
    maxage:0
}));

app.use(controller.get('/route_test',function* () {
    this.set('Cache-Control','no-cache');
    this.body='hello koa!';
}));

app.use(controller.get('/ejs_test',function* () {
    this.set('Cache-Control','no-cache');
    this.body= yield render('test',{title:'title_test'});
}));

app.use(controller.get('/api_test',function* () {
    this.set('Cache-Control','no-cache');
    this.body= service.get_test_data();
}));
/!*各个页面*!/

app.use(controller.get('/',function* () {
    this.set('Cache-Control','no-cache');
    this.body= yield render('index');
}));

app.use(controller.get('/backet',function* () {
    this.set('Cache-Control','no-cache');
    this.body= yield render('backet');
}));

app.use(controller.get('/search',function* () {
    this.set('Cache-Control','no-cache');
    this.body= yield render('search',{nav:'搜索页面'});
}));

app.use(controller.get('/reader',function* () {
    this.set('Cache-Control','no-cache');
    this.body= yield render('reader');
}));

app.use(controller.get('/female',function* () {
    this.set('Cache-Control','no-cache');
    this.body= yield render('female',{nav:'男生排行'});
}));

app.use(controller.get('/rank',function* () {
    this.set('Cache-Control','no-cache');
    this.body= yield render('rank',{nav:'排行'});
}));

app.use(controller.get('/category',function* () {
    this.set('Cache-Control','no-cache');
    this.body= yield render('category',{nav:'分类'});
}));

app.use(controller.get('/male',function* () {
    this.set('Cache-Control','no-cache');
    this.body= yield render('male',{nav:'女生排行'});
}));

var querystring=require('querystring');
app.use(controller.get('/book',function* () {
    this.set('Cache-Control','no-cache');
    var params=querystring.parse(this.req._parsedUrl.query);
    var bookId=params.id
    this.body= yield render('book',{nav:'书籍详情',bookId:bookId});
}));

/!*任务代码*!/

app.use(controller.get('/ajax/female',function* () {
    this.set('Cache-Control','no-cache');
    this.body= service.get_female_data();
}));

app.use(controller.get('/ajax/male',function* () {
    this.set('Cache-Control','no-cache');
    this.body= service.get_male_data();
}));

app.use(controller.get('/ajax/index',function* () {
    this.set('Cache-Control','no-cache');
    this.body= service.get_index_data();
}));

app.use(controller.get('/ajax/chapter',function* () {
    this.set('Cache-Control','no-cache');
    this.body= service.get_chapter_data();
}));

app.use(controller.get('/ajax/rank',function* () {
    this.set('Cache-Control','no-cache');
    this.body= service.get_rank_data();
}));

app.use(controller.get('/ajax/bookbacket',function* () {
    this.set('Cache-Control','no-cache');
    this.body= service.get_bookbacket_data();
}));

app.use(controller.get('/ajax/category',function* () {
    this.set('Cache-Control','no-cache');
    this.body= service.get_category_data();
}));

var querystring=require('querystring');
app.use(controller.get('/ajax/book',function* () {
    this.set('Cache-Control','no-cache');
    var params=querystring.parse(this.req._parsedUrl.query);
    var id=params.id;
    if(!id){
        id="";
    }
    this.body= service.get_book_data(id);
}));

app.use(controller.get('/ajax/chapter_data',function* () {
    this.set('Cache-Control','no-cache');
    var params=querystring.parse(this.req._parsedUrl.query);
    var id=params.id;
    if(!id){
        id="";
    }
    this.body= service.get_chapter_content_data(id);
}));


app.use(controller.get('/ajax/search',function* () {
    this.set('Cache-Control','no-cache');
    var _this=this;
    var querystring=require('querystring');
    var params=querystring.parse(this.req._parsedUrl.query);
    var start=params.start;
    var end=params.end;
    var keyword=params.keyword;
    this.body= yield service.get_search_data(start,end,keyword);
}));


app.listen(3000);
console.log('koa server is start!');



