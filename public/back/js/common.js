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
    $(document).ajaxStop(function(){
        setInterval(function(){
            NProgress.done();
        },500)
    })


    //判断用户是否登录  如果登录继续  没有登录跳转到登录页
    if(location.href.indexOf('login.html') == -1){
        $.ajax({
            type:'get',
            url:'/employee/checkRootLogin',
            success:function(info){
                if(data.error === 400){
                    //说明用户没有登录，跳转到登录页面
                    location.href = "login.html";
                }
            }
        })
    }

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
        $('#logoutModal').modal('show');
    })

    //用户退出功能
    $('.btn-getout').on('click',function(){
        $.ajax({
            type:'get',
            url:"/employee/employeeLogout",
            success:function(info){
                console.log(info);
                if(info.success){
                    location.href = 'login.html';
                }
            }
        })
    })


})