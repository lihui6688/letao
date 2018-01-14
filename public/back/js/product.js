/**
 * Created by Dell on 2018/1/14.
 */
$(function(){
    var page = 1;
    var pageSize = 3;

    var imgarr = [];
    //首页渲染完成
    function render(){
        $.ajax({
            type:'get',
            url:'/product/queryProductDetailList',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(info){
                $('tbody').html( template('temp2',info) );
                $('#paginator').bootstrapPaginator({
                    currentPage : page,
                    bootstrapMajorVersion:3,
                    totalPages : Math.ceil(info.total/pageSize),
                    onPageClicked:function(a,b,c,p){
                        page = p;
                        render();
                    }
                });
            }
        })
    }
    render();

//    点击显示模态框
    $('.btn_add').on('click',function(){
        $('#add_moda3').modal('show');
        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:1,
                pageSize:100
            },
            success:function(info){
                console.log(info);
                $('.dropdown-menu').html( template('secondfenlei',info) )
            }
        })
    })

    //给下拉里面的A注册点击事件
    $('.dropdown-menu').on('click','a',function(e){
        e.preventDefault();
        $('.second-text').text($(this).text());

        //记录id给隐藏域
        $("[name='brandId']").val($(this).data('id'));

        //手动设置为成功状态
        $form.data('bootstrapValidator').updateStatus('brandId','VALID');
    })

    //验证表单
    $form = $('form');
    $form.bootstrapValidator({
        //默认隐藏域不验证  写一个空数组 是验证所有的  包括隐藏域
        excluded:[],
        //验证图标
        feedbackIcons:{
            valid:'glyphicon glyphicon-ok',
            invalid:'glyphicon glyphicon-remove',
            validating:'glyphicon glyphicon-refresh'
        },
        fields:{
            brandId:{
                validators:{
                    notEmpty:{
                        message:'请选择二级分类'
                    }
                }
            },
            proName:{
                validators:{
                    notEmpty:{
                        message:'请输入商品名称'
                    }
                }
            },
            proDesc:{
                validators:{
                    notEmpty:{
                        message:'请输入产品描述'
                    }
                }
            },
            num:{
                validators:{
                    notEmpty:{
                        message:'请输入库存'
                    },
                    regexp:{
                        //不能以0开头  要纯数字
                        regexp:/^[1-9]\d*$/,
                        message:'请输入合法的数字'
                    }
                }
            },
            size:{
                validators:{
                    notEmpty:{
                        message:'请输入商品尺码'
                    },
                    regexp:{
                        regexp:/^\d{2}-\d{2}$/,
                        message:'请输入合法的尺码 例如（32-46）'
                    }
                }
            },
            oldPrice:{
                validators:{
                    notEmpty:{
                        message:'请输入原价'
                    }
                }
            },
            price:{
                validators:{
                    notEmpty:{
                        message:'请输入现价'
                    }
                }
            },
            productLogo:{
                validators:{
                    notEmpty:{
                        message:'最少上传3张图片'
                    }
                }
            }

        }
    })


    //上传图片  插件  可以预览
    $('#fileupload').fileupload({
        dataType:'json',
        done:function(e,data){
            if(imgarr.length>=3){
                return false;
            }
            //在下面的盒子中添加img标签  显示图片
            $('.img_box').append('<img src="'+data.result.picAddr+'" width="100" height="100" alt="">')
            //在数组中记录相片的地址
            imgarr.push(data.result);

            if(imgarr.length===3){
                $form.data('bootstrapValidator').updateStatus('productLogo','VALID')
            }else {
                $form.data('bootstrapValidator').updateStatus('productLogo','INVALID')
            }
        }
    })

    //给表单注册验证成功事件
    $form.on('success.form.bv',function(e){
        e.preventDefault();
        var temp = $form.serialize();

        temp +="&picName1=" + imgarr[0].picName + "&picAddr1="+ imgarr[0].picAddr;
        temp +="&picName2=" + imgarr[1].picName + "&picAddr2="+ imgarr[1].picAddr;
        temp +="&picName3=" + imgarr[2].picName + "&picAddr3="+ imgarr[2].picAddr;
        console.log(temp);
        $.ajax({
            type:'post',
            url:'/product/addProduct',
            data:temp,
            success:function(info){
                console.log(info);
                $('#add_moda3').modal('hide');
                page=1;
                render();

                //重置表单的样式
                $form[0].reset();
                //重置插件的样式
                $form.data('bootstrapValidator').resetForm();

                //重置下拉菜单
                $('second-text').text('请选择二级分类');
                $('[name="brandId"]').val('');

                //重置图片
                $('.img_box img').remove();
                imgarr = [];
            }
        })
    })
})