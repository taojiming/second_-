window.addEventListener('load',function() {
    var arrow_l = document.querySelector('.arrow_l');
    var arrow_r = document.querySelector('.arrow_r');
    var focus = document.querySelector('.focus');
    // 图片本身宽度
    var focusWidth = focus.offsetWidth;
    // 1.鼠标移入箭头显示，鼠标移出箭头隐藏
    focus.addEventListener('mouseenter',function() {
        arrow_l.style.display = 'block'
        arrow_r.style.display = 'block'
        clearInterval(timer);
        timer = null;
    })
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none'
        arrow_r.style.display = 'none'
        timer = setInterval(function () {
            arrow_r.click();
        }, 2000)
    })
    // 2.动态生成小圆点的数目 有几张图片，我就生成几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle')
   
    for (let i = 0; i < ul.children.length; i++){
        let li = document.createElement('li');
        // 为每个li添加自定义属性 index
        li.setAttribute('index',i);
        ol.appendChild(li);
        // 3.小圆点的排他思想
        li.addEventListener('click',function() {
            for (let i = 0; i < ol.children.length; i++){
                ol.children[i].className = '';
            }
            this.className = 'current';
            // 4.点击小圆点切换图片 ul移动不是li 移动距离 图片本身的宽度
            var index = li.getAttribute('index');
            // 将当前小圆点的索引值 index 赋值给 num
            num = index;
            // 将当前小圆点的索引值 index 赋值给 circle
            circle = index
            animate(ul, -index * focusWidth);
        })
    }
    // 5.克隆第一张li 我放在for循环生成小圆点的下面 所有小圆点数目为4 
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 6. 点击箭头切换图片 无缝滚动
    // 7.点击箭头切换时，小圆点也同时切换
    var num = 0;
    // 记录当前切换的小圆点
    var circle = 0;
    // flag 节流阀
    var flag = true;
    arrow_r.addEventListener('click',function() {
        if(flag){
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            circle++;
            animate(ul, -num * focusWidth,function() {
                flag = true;
            });
            if (circle == 4) {
                circle = 0;
            }
            // 排他思想
            circleChange();
        }
    })

    // 8. 点击左侧按钮
    arrow_l.addEventListener('click', function () {
        if (num == 0) {
            num = ul.children.length -1;
            ul.style.left = (ul.children.length - 1) * ul.offsetWidth;
        }
        num--;
        circle--;
        animate(ul, -num * focusWidth);
        if (circle < 0) {
            circle = ol.children.length - 1;
        }
        circleChange();
    })
    ol.children[0].className = 'current';

    // 9. 开启定时器
    var timer = setInterval(function() {
        arrow_r.click();
    }, 2000)

    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }

})

// jQuery显示隐藏电梯导航 
// 当我们点击了小li 此时不需要执行 页面滚动事件里面的小li 的背景选择 添加current
// 解决方法： 节流阀 互斥锁
$(function() {
    var flag = true;
    var toolTop = $('.recommend').offset().top;
    var jiadianTop = $('.jiadian').offset().top;
    var shoujiTop = $('.shouji').offset().top;
    var diannaoTop = $('.diannao').offset().top;
    // console.log(postop);
    // console.log($('html,body').scrollTop());
    toggleTool();
    // 显示侧边栏函数
    function toggleTool() {
        if ($('html,body').scrollTop() >= toolTop) {
            $('.fixedtool').fadeIn();
        } else {
            $('.fixedtool').fadeOut();
        }
    }
    
    $(window).scroll(function() {
        toggleTool();
        if(flag){
            $('.jiadian,.shouji,.diannao').each(function (i, ele) {
                // console.log($(ele).offset().top);
                if ($('html,body').scrollTop() >= $(ele).offset().top) {
                    $('.fixedtool li').eq(i).addClass('current').siblings().removeClass('current');
                }
            })
        }
    })
    $('.fixedtool li').eq(0).click(function() {
        flag = false;
        $('html,body').stop().animate({
            scrollTop: jiadianTop
        }, function () {
            flag = true;
        })
        $(this).addClass('current').siblings().removeClass('current');
    })
    $('.fixedtool li').eq(1).click(function () {
        flag = false;
        $('html,body').stop().animate({
            scrollTop: shoujiTop
        }, function () {
            flag = true;
        })
        $(this).addClass('current').siblings().removeClass('current');
    })
    $('.fixedtool li').eq(2).click(function () {
        flag = false;
        $('html,body').stop().animate({
            scrollTop: diannaoTop
        },function() {
            flag = true;
        })
        $(this).addClass('current').siblings().removeClass('current');
    })
})

