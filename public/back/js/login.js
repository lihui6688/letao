/**
 * Created by Dell on 2018/1/11.
 */

//  表单验证  获取表单  初始化插件   传参数是传一个对象
$(function(){
    $form = $('form');

    $form.bootstrapValidator({


        //验证后面的图标  bootstrap里面自带的字体图标
        feedbackIcons:{
            valid:'glyphicon glyphicon-ok',
            invalid:'glyphicon glyphicon-remove',
            validating:'glyphicon glyphicon-refresh'
        },


        //配置验证的规则   里面传入对应的表单的name属性  字段
        fields:{
            username:{
                //username的规则
                validators:{
                    notEmpty:{
                        message:'用户名不能为空'
                    },
                    callback:{
                        message:'用户名不存在'
                    }
                }
            },
            password:{
                validators:{
                    notEmpty:{
                        message:'用户密码不能为空'
                    },
                    stringLength:{
                        min:6,
                        max:12,
                        message:'密码长度是6-12位'
                    },
                    callback:{
                        message:'密码错误'
                    }
                }
            }
        }

    })

    //需要给表单注册一个  验证成功的事件
    $form.on('success.form.bv',function(e){
        //阻止表单提交的默认跳转行为
        e.preventDefault();

        //发送ajax请求
        $.ajax({
            type:'post',
            url:'/employee/employeeLogin',
            data:$form.serialize(),
            dataType:'json',
            success:function(info){
                if(info.success){
                    location.href = 'index.html';
                }
                //说明用户名不存在
                if(info.error === 1000){
                //手动调用方法 让验证失败

                    //updatastatus 方法 可以改变某个字段的效验
                    $form.data('bootstrapValidator').updateStatus('username','INVALID','callback')
                }
                if(info.error === 1001){
                    $form.data('bootstrapValidator').updateStatus('password','INVALID','callback')
                }
            }
        })
    })

    //给重置注册点击事件   清除所有的样式
    $('[type = reset]').on('click',function(){
        $form.data('bootstrapValidator').resetForm();
    })
})
