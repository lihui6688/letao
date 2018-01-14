/**
 * Created by Dell on 2018/1/13.
 */
$(function(){


    var page = 1; //记录当前页码
    var pageSize = 5;  //记录一页两条数据
    //渲染数据
    function render(){
        $.ajax({
            type:'get',
            url:'/user/queryUser',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(info){
                $('tbody').html( template('tem',info) );

                //初始化分页 是在请求数据成功之后渲染分页
                $('#paginator').bootstrapPaginator({
                    //页面显示一共几个分页
                    bootstrapMajorVersion:3,
                    currentPage:page,
                    totalPages:Math.ceil(info.total/pageSize),
                    onPageClicked:function(a,b,c,p){
                        page = p;
                        render();
                    }
                });
            }
        })
    }
    render();

//    禁用跟启用模态框显示
    $('tbody').on('click','.btn',function(){
        $('#jyandqy').modal('show');
        var id = $(this).parent().data('id');
        var isDelete = $(this).hasClass('btn-danger')?0:1;
        //    给确认注册点击事件   修改状态
        $('.btn-user').off().on('click',function(){
            $.ajax({
                type:'post',
                url:'/user/updateUser',
                data:{
                    id:id,
                    isDelete:isDelete
                },
                success:function(info){
                    if(info.success){
                        $('#jyandqy').modal('hide');
                        render();
                    }
                }
            })
        })

    })

});