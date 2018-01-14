/**
 * Created by Dell on 2018/1/13.
 */
$(function(){
    var page =1;
    var pageSize = 3;


    function render(){
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(info){
                $('tbody').html( template('temp1',info) );
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:page,
                    totalPages:Math.ceil(info.total/pageSize),
                    onPageClicked:function(a,b,c,p){
                        page = p;
                        render();
                    }
                })
            }
        })
    }

    render();

    $('.btn_add').on('click',function(){
        console.log(1);
        $('#add_modal').modal('show');
    })

    //开启表单验证
    $form = $('form');
    console.log($form);
    $form.bootstrapValidator({
        //验证图标
        feedbackIcons:{
            valid:'glyphicon glyphicon-ok',
            invalid:'glyphicon glyphicon-remove',
            validating:'glyphicon glyphicon-refresh'
        },
        //验证规则   这里验证的是name属性
        fields:{
            categoryName:{
                    validators:{
                        notEmpty:{
                            message:'请输入一个分类名称'
                        }
                    }
                }
        }
    })

    //表单校验成功事件
    $form.on('success.form.bv',function(e){
        //租住默认跳转
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/category/addTopCategory',
            data:$form.serialize(),
            success:function(info){
                console.log(info);
                if(info.success){
                    $('#add_modal').modal('hide');
                    page = 1;
                    render();

                    //重置样式
                    $form.data('bootstrapValidator').resetForm();
                    $form[0].reset();

                }
            }
        })
    })


});