/* No.1 登录验证
1. 进行表单校验配置
   校验要求:
       (1) 用户名不能为空, 长度为2-6位
        (2) 密码不能为空, 长度为6-12位
 * 
 * 
 *  */
$(function() {
    
    $('#form').bootstrapValidator({
        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        // 1,校验字段
        fields: {
            username: {
                // 校验规则
                validators:{
                    notEmpty: {
                        // 提示信息 {
                        message: "用户名不能为空"
                    },
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: "用户名必须在2~6位"
                    },
                    callback: {
                        message: "用户名不正确"
                    }
                }
            },
                    
            password: {
                validators: {
                    notEmpty: {
                        message:'密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '密码长度6~12位'
                    },
                    callback: {
                        message: '密码不正确'
                    }
                }
            }
        }

    });

    /**   2. 我们需要用到插件的校验功能, 所以要用 submit 按钮
     *    所以需要注册表单校验成功事件, 在事件中, 阻止默认的提交(防止跳转), 通过 ajax 提交即可  
     */
    $('#form').on('success.form.bv',function(e) {
        e.preventDefault();
        // console.log("没有提交");
        // console.log(e)
        $.ajax({
            type: 'post',
            url: '/employee/employeeLogin',
            data: $('#form').serialize(),
            datatype: 'json',
            success: function (info) {
                console.log(info);
                if ( info.error === 1000 ) {
                    // console.log ('用户名错误');
                    $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback');
                    return;
                }
                if ( info.error === 1001 ) {
                    // console.log ('密码错误');
                    $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback');
                    return;
                }
                if ( info.success) {
                    location.href = 'index.html';
                    return;
                }
                
            }
        });
    })


    /**
     * 重置 表单
     * 实例.方法
     * $('#form').data('bootstrapValidator').resetForm()
     * 不传参 默认false 就是只重置 状态  不清空内容
     * 
     */
    $('[type="reset"]').on('click',function() {
         $('#form').data('bootstrapValidator').resetForm(true);
    })    
})