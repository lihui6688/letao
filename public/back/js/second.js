/**
 * Created by Dell on 2018/1/13.
 */
$(function(){
    var page = 1;
    var pageSize = 3;

    function render(){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(info){
                $('tbody').html( template('tem2',info) );

                //分页渲染
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
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
        $('#add_moda2').modal('show');

        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:1,
                pageSize:100
            },
            success:function(info){
                $('.dropdown-menu').html( template('tempfenlei',info) );
            }
        })
    })

    //给下拉列表注册点击事件
    $('.dropdown-menu').on('click','a',function(){
        $('.second-text').text($(this).text());

        //把A标签上面记录的id传到隐藏input的value值上面
        $("[name='categoryId']").val($(this).data('id'));

        //给下拉列表自动验证成功
        $form.data("bootstrapValidator").updateStatus("categoryId", "VALID");
    })

    //初始化图片上传
    //这个id input的id属性
    $('#fileupload').fileupload({
        dataType:'json', //指定响应的格式
        done:function(e,data){ //图片上传成功的回调函数 e是事件对象
            console.log(data);
            $('.img_box img').attr('src',data.result.picAddr);

            //把相片的地址复制给隐藏的input上
            $("[name=brandLogo]").val(data.result.picAddr);

            //把brandLogo改成成功
            $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");

        }

    })


    var $form = $('#form');
    //开启表单验证功能
    $form.bootstrapValidator({
        excluded:[],//校验所有的内容 包括隐藏的input
        //校验图标
        feedbackIcons:{
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //校验规则
        fields:{
            categoryId: {
                validators: {
                    notEmpty: {
                        message: "请选择一级分类"
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: "请输入二级分类的名称"
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: "请上传品牌图片"
                    }
                }
            }
        }


    })


    //注册表单验证成功事件
    $form.on('success.form.bv',function(e){
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/category/addSecondCategory',
            data:$form.serialize(),
            success:function(info){
                console.log(info);
                if(info.success){
                    $("#add_moda2").modal('hide');
                    page = 1;
                        render();
                    //

                    //重置样式
                    $form[0].reset();  //重置表单的样式
                    $form.data("bootstrapValidator").resetForm(); //重置插件的样式

                    //重置下拉框 跟相片的样式
                    //4. 重置下拉框组件和图片
                    $(".second-text").text("请选择一级分类");
                    $("[name='categoryId']").val('');
                    $(".img_box img").attr("src", "images/none.png");
                    $("[name='brandLogo']").val('');

                }
            }
        })
    })


})