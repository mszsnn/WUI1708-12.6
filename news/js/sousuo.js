$(function(){
    $(".history").click(function(){

        history.back();
    });

    let search='';
    let arrsearch;
    if(localStorage.search){
        arrsearch=localStorage.search.split(",").slice(-6);
        // console.log(arrsearch);
        let str="";
            arrsearch.forEach((val)=>{
                str+=`
            <p>${val}</p>
            `;
            });

        $(".span").html(function(index,val){
            return val+str;
        });
    }
    // console.log(localStorage.search)
    function LookFor(obj){
        let val=obj.val;
        $.ajax({
            url:"https://api.jisuapi.com/news/search?keyword="+val+"&appkey=d844b0839ff12da9",
            dataType: "jsonp",
            beforeSend: function(){
                $(".load").show();
                $("ul.content").html("");
                $("div.span").html("");
            },
            complete:function(){
                $(".load").hide();
            },
            success: function(val){
                if($("input.lookfor").val()===""){
                    return;
                }
               //无历史记录的存储
                if(!arrsearch){
                    localStorage.search=$("input.lookfor").val();
                    let arr0=val.result.list;
                    let str0="";
                    arr0.forEach((val)=>{
                        if(val.pic===""){
                            str0+=`
                                <a >
                            <li class="list" style="height: 0.5rem;">
                               
                                <div class="right noimg" style="height: 100%;">
                                     <p>
                                        ${val.title}
                                     </p>
                                     <section class="time">
                                        时间: ${val.time}
                                        来源: ${val.src}
                                     </section>
                                </div>
                            </li>
                         </a>`;
                        }else{
                            str0+=`
                        <a  >
                            <li class="list">
                                <div class="left">
                                     <img src="${val.pic}" alt="">
                                </div>
                                <div class="right">
                                     <p>
                                        ${val.title}
                                     </p>
                                     <section class="time">
                                        时间: ${val.time}
                                        来源: ${val.src}
                                     </section>
                                </div>
                            </li>
                         </a>`;
                        }
                    });
                    $("ul.content").html(str0);
                    $("ul.content").on("click","a",function(){
                        localStorage.index=JSON.stringify(val.result.list.splice($(this).index(),1)[0]);
                        localStorage.channel=val.result.channel;
                        // console.log(localStorage.index)
                        // return;
                        location.href="detail.html";

                    })
                    return;
                }


                //有历史记录  且去重复
                if(!arrsearch.includes($("input.lookfor").val())){
                    localStorage.search+=","+$("input.lookfor").val();
                }
                let arr=val.result.list;
                let str="";
                arr.forEach((val)=>{
                    if(val.pic===""){
                        str+=`
                                <a >
                            <li class="list" style="height: 0.5rem;">
                               
                                <div class="right noimg" style="height: 100%;">
                                     <p>
                                        ${val.title}
                                     </p>
                                     <section class="time">
                                        时间: ${val.time}
                                        来源: ${val.src}
                                     </section>
                                </div>
                            </li>
                         </a>`;
                    }else{
                        str+=`
                        <a  >
                            <li class="list">
                                <div class="left">
                                     <img src="${val.pic}" alt="">
                                </div>
                                <div class="right">
                                     <p>
                                        ${val.title}
                                     </p>
                                     <section class="time">
                                        时间: ${val.time}
                                        来源: ${val.src}
                                     </section>
                                </div>
                            </li>
                         </a>`;
                    }
                });
                $("ul.content").html(str);
                $("ul.content").on("click","a",function(){
                    localStorage.index=JSON.stringify(val.result.list.splice($(this).index(),1)[0]);
                    localStorage.channel=val.result.channel;
                    // console.log(localStorage.index)
                    // return;
                    location.href="detail.html";

                })
            }
        })
    }


    $("input.lookfor").focus();

    $("header .for").on("click",function(){
        // console.log($("input.lookfor").val())]
        LookFor({
            val: $("input.lookfor").val()
        })
    })
    $("input.lookfor").keyup(function(e){
        if(e.which==13){
            LookFor({
                val: $(this).val()
            })
        }
    })

    $("div.span").on("click","p",function(){
        console.log($(this).text());
        $.ajax({
            url:"https://api.jisuapi.com/news/search?keyword="+$(this).text()+"&appkey=d844b0839ff12da9",
            dataType: "jsonp",
            beforeSend: function(){
                $(".load").show();
                $("ul.content").html("");
                $("div.span").html("");
            },
            complete:function(){
                $(".load").hide();
            },
            success: function(val){
                let arr=val.result.list;
                let str="";
                arr.forEach((val)=>{
                    if(val.pic===""){
                        str+=`
                                <a>
                            <li class="list" style="height: 0.5rem;">
                               
                                <div class="right noimg" style="height: 100%;">
                                     <p>
                                        ${val.title}
                                     </p>
                                     <section class="time">
                                        时间: ${val.time}
                                        来源: ${val.src}
                                     </section>
                                </div>
                            </li>
                         </a>`;
                    }else{
                        str+=`
                        <a >
                            <li class="list">
                                <div class="left">
                                     <img src="${val.pic}" alt="">
                                </div>
                                <div class="right">
                                     <p>
                                        ${val.title}
                                     </p>
                                     <section class="time">
                                        时间: ${val.time}
                                        来源: ${val.src}
                                     </section>
                                </div>
                            </li>
                         </a>`;
                    }
                });
                $("ul.content").html(str);
                $("ul.content").on("click","a",function(){
                    localStorage.index=JSON.stringify(val.result.list.splice($(this).index(),1)[0]);
                    localStorage.channel=val.result.channel;
                    // console.log(localStorage.index)
                    // return;
                    location.href="detail.html";

                })

            }
        })
    })

})

