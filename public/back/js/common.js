/**
 * Created by Dell on 2018/1/11.
 */
$(function(){

    //禁用进度条的光环
    NProgress.configure({showSpinner:false});

    //当页面有ajax请求的时候   就开始进度条功能
    $(document).ajaxStart(function(){
        NProgress.start();
    })

    //当ajax请求结束之后  就会关闭进度条
    $(document).ajaxSend(function(){
        setInterval(function(){
            NProgress.done();
        },500)
    })


    //二级导航显示与隐藏
    $('.lt_nav').prev().on('click',function(){
        $(this).next().stop(true).slideToggle();
    })

    //左侧隐藏与显示
    $('.btn-menu').on('click',function(){
        $('.lt_left').toggleClass('now');
        $('.lt_right').toggleClass('now');
    })

    //退出功能
    $('.btn-out').on('click',function(){

    })




})