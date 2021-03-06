/**
 * Created by zhanglei on 2017/5/21.
 */
const http=require('http');
const querystring=require('querystring');
const url=require('url');
const server=http.createServer((req,res)=>{
    var str='';
    //就相当于接收我们大块数据被拆分成的每个小块数据；
    //data事件，会执行很多次；
    var n=0;
    req.on('data',(data)=>{
        console.log(`这是第${n++}次传输`)
        str+=data;
    });
    //end事件只会出发一次；在数据被运输完成的时候；
    req.on('end',()=>{
        var postData=querystring.parse(str);
        //我们的get数据必须写在end里面；
        var getData=url.parse(req.url,true).query;
        console.log(getData)//打印的是对象
        res.end(url.parse(req.url).query)//展现的字符串；
    });
});
server.listen(8080);