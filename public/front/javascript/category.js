/**
 * Created by Dell on 2018/1/15.
 */

mui('.mui-scroll-wrapper').scroll({
    indicators:false
});


$(function(){
    //获取一级分类 并渲染
    $.ajax({
        type:'get',
        url:'/category/queryTopCategory',
        success:function(info){
            console.log(info);
            $('.main_left .mui-scroll').html( template('temp1',info) );
            //默认渲染第0一页
            render(info.rows[0].id)
        }
    })

    //渲染二级分类
    function render(id){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategory',
            data:{
                id:id
            },
            success:function(info){
                console.log(info);
                $('.main_right .mui-scroll').html( template('temp2',info) );
            }
        })

    }

    //给一级分类 的li注册点击事件
    $('.main_left .mui-scroll').on('click','li',function(){
        $(this).addClass('now').siblings().removeClass('now');
        var id = $(this).data('id');
        render(id);
    })
})