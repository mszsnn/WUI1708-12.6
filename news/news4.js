
//加载过渡动画
$(document).ajaxSend(function(){
    $('.content,#add').hide();
    $("#gd").show();
});
$(document).ajaxSuccess(function(){
    $('.content,#add').show();
    $("#gd").hide();
});


    //点击返回历史记录
    $('#fh').click(function () {
        history.back();
    })
  /*  $('.search > input').click(function () {
        location.href="xinwen2.html";
    })*/

//获取数据
/*$(function () {
    let indexs = localStorage.indexs;
    let channel=localStorage.channel;
    $.ajax({
        url:"https://api.jisuapi.com/news/get?channel="+channel+"&start="+indexs+"&num=1&appkey=6b54d90d60aab77d",
        dataType:'jsonp',
        success:function (res) {
            let bts=$('#bt');
            bts.text(channel);
            let arr = res.result.list;
            let str = "";
            arr.forEach(val=> {
                str += ` <h4 id="wzbt">${val.title}</h4>
                    <i id="ik"><span id="time">${val.time}</span><span id="urls">${val.src}</span></i>
                    <img id="xqtu" src="${val.pic}" alt="">
                    ${val.content}`
             })

            $('.content').html(str);

        }
    })
})*/


$(function () {
    let nrtitle= localStorage.nrtitle;
    let nrpic= localStorage.nrpic;
    let nrcontent= localStorage.nrcontent;
    let nrtime= localStorage.nrtime;
    let nrsrc =localStorage.nrsrc;
            let str="";
                str += ` <h4 id="wzbt">${nrtitle}</h4>
                    <i id="ik"><span id="time">${nrtime}</span><span id="urls">${nrsrc}</span></i>
                    <img id="xqtu" src="${nrpic}" alt="">
                    ${nrcontent}`;
            $('.content').html(str);
})














