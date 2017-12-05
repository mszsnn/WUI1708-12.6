/*$(function () {
    myScroll = new IScroll('#wrapper', { scrollX: true, scrollY: false, click:true});
})*/
//加载过渡动画
$(document).ajaxSend(function(){
    $('.content,#add').hide();
    $("#gd").show();
});
$(document).ajaxSuccess(function(){
    $('.content,#add').show();
    $("#gd").hide();
});



let search = "";
    if(localStorage.history){
        search=localStorage.history;
        var arr=search.split(",");
        arr.shift();
        let str="";
        arr.slice(-5).forEach(val=> {
           str+=`<span class="lijl">${val}</span>`;
        })
        $('.history').html(str);
    }
    //点击返回历史记录
    $('#fh').click(function () {
        history.back();
    })
    //失去焦点促发事件blur
$(".search>input").focus();
    $(".search>input").blur(function () {

        let values=$(this).val();
        if(values==''){
            return;
        }
        if(localStorage.history){
            if(!arr.includes(values)){
                search += "," + values;
                localStorage.history = search;
                arr.shift();
            }
        }else {
            search += "," + values;
            localStorage.history = search;
            arr.shift();

        }
        $.ajax({
            url:"https://api.jisuapi.com/news/search?keyword="+$(this).val()+"&appkey=6b54d90d60aab77d",
            dataType:'jsonp',
            //加载中
            beforeSend:function () {

            },
            success:function (res) {

                let arr = res.result.list;
                let str = "";
                arr.forEach(val=>{
                    if(val.pic ==""){
                    str += `<li class="list">
                                <a>
                                    ${val.title}
                                    <i>${val.time}</i>
                                    <i>${val.src}</i>
                                </a>
                            </li>`;
                }else
                {
                    str += `<li class="list">
                                <a>
                                    <div class="left">
                                        <img src="${val.pic}" alt="">
                                    </div>
                                    <div class="con">${val.title}
                                        <i>${val.time}</i>
                                        <i>${val.src}</i>
                                    </div>
                                </a>
                            </li>`;
                }
            })
                //存储数据到本地
                $('.content').on('click','.list',function () {
                    let nr=arr[$(this).index()];
                    let nrtitle=nr.title;
                    let nrpic=nr.pic;
                    let nrcontent=nr.content;
                    let nrtime=nr.time;
                    let nrsrc=nr.src;


                    localStorage.nrtitle=nrtitle;
                    localStorage.nrpic=nrpic;
                    localStorage.nrcontent=nrcontent;
                    localStorage.nrtime=nrtime;
                    localStorage.nrsrc=nrsrc;

                    location.href="xinwen4.html";

                })
                $('.content').html(str);
            }
        })
    })
$('.lijl').click(function () {
    // console.log($(this).text())

    $.ajax({
        url:"https://api.jisuapi.com/news/search?keyword="+$(this).text()+"&appkey=6b54d90d60aab77d",
        dataType:'jsonp',
        //加载中
        beforeSend:function () {

        },
        success: function (res) {

            let arr = res.result.list;
            let str = "";
            arr.forEach(val => {
                if(val.pic == ""){
                str += `<li class="list">
                                <a>
                                    ${val.title}
                                    <i>${val.time}</i>
                                    <i>${val.src}</i>
                                </a>
                            </li>`;
                }
                 else{
                str += `<li class="list">
                                <a>
                                    <div class="left">
                                        <img src="${val.pic}" alt="">
                                    </div>
                                    <div class="con">${val.title}
                                        <i>${val.time}</i>
                                        <i>${val.src}</i>
                                    </div>
                                </a>
                            </li>`;
                }


            })
            //存储数据到本地
            $('.content').on('click','.list',function () {
                let nr=arr[$(this).index()];
                let nrtitle=nr.title;
                let nrpic=nr.pic;
                let nrcontent=nr.content;
                let nrtime=nr.time;
                let nrsrc=nr.src;
// console.log(nr)

                localStorage.nrtitle=nrtitle;
                localStorage.nrpic=nrpic;
                localStorage.nrcontent=nrcontent;
                localStorage.nrtime=nrtime;
                localStorage.nrsrc=nrsrc;

                location.href="xinwen4.html";

            })
            $('.content').html(str);
        }
    })
})
$('.search > input').click(function () {
    location.href="xinwen2.html";
})












