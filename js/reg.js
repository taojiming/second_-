window.onload = function() {
    // 手机号码的正则表达式
    var regtel = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
    var tel = document.querySelector('#mobile');
    var email = document.querySelector('#email');
    var loginpwd = document.querySelector('#login');
    var surepwd = document.querySelector('#sure')
    var regemail = /^\d{6}$/; //短信验证码的正则表达式
    var regpwd = /^[a-zA-Z0-9_-]{6,16}$/;
    regexp(tel,regtel); //手机号码
    regexp(email,regemail);  //短信验证码
    regexp(loginpwd,regpwd);   //登录密码
    function regexp(ele,reg) {
        ele.onblur = function () {
            if (reg.test(ele.value)) {
                ele.nextElementSibling.className = 'success';
                ele.nextElementSibling.innerHTML = '恭喜输入正确';
            } else {
                ele.nextElementSibling.className = 'error';
                ele.nextElementSibling.innerHTML = '<span class="error"><i class="error_ico"></i>格式不正确，请重新输入</span>';
            }
        }
    }
    surepwd.onblur = function() {
        if (this.value === loginpwd.value){
            this.nextElementSibling.className = 'success';
            this.nextElementSibling.innerHTML = '恭喜输入正确';
        }else{
            this.nextElementSibling.className = 'error';
            this.nextElementSibling.innerHTML = '两次密码输入不正确';
        }
    }
}