window.addEventListener('load',function() {
    let preview_img = document.querySelector('.preview_img');
    let mask = document.querySelector('.mask');
    let big = document.querySelector('.big');

    // 1.鼠标移入图片遮罩层，大图显示，移出隐藏
    preview_img.addEventListener('mousemove',function() {
        mask.style.display = 'block';
        big.style.display = 'block';
    })
    preview_img.addEventListener('mouseout', function () {
        mask.style.display = 'none';
        big.style.display = 'none';
    })
    // 2. 遮罩层跟随鼠标
    preview_img.addEventListener('mousemove',function(e) {
        // 获取鼠标在盒子内的坐标
        let x = e.pageX - this.offsetLeft;
        let y = e.pageY - this.offsetTop;

        let maskx = x - mask.offsetWidth / 2;
        let masky = y - mask.offsetHeight / 2
        // 将鼠标位置赋值给mask left top
        mask.style.left = maskx + 'px';
        mask.style.top = masky + 'px';
        // 3. 将遮罩层限制在盒子内
        let maskMax = preview_img.offsetWidth - mask.offsetWidth
        if(maskx <= 0){
            mask.style.left = 0;
        } else if (maskx >= maskMax){
            mask.style.left = maskMax + 'px';
        }

        if(masky <=0){
            mask.style.top = 0;
        } else if (masky >= maskMax){
            mask.style.top = maskMax + 'px';
        }
        // 4. 移动大图片
        // 公式：大图片的移动距离 = 遮挡层移动距离 * 大图片最大移动距离 / 遮挡层的最大移动距离
        //        bigX                  maskx               bigMax                maskMax
        let bigImg = document.querySelector('.bigImg');
        // 大图最大移动距离
        bigMax = bigImg.offsetWidth - big.offsetWidth ;
        // 大图片的移动距离 X Y 
        let bigX = maskx * bigMax / maskMax;
        let bigY = masky * bigMax / maskMax;
        // if (bigX <=0){
        //     bigImg.style.left = 0;
        // } else if (bigX > bigMax){
        //     bigImg.style.left = bigMax;
        // }

        // if (bigY <= 0) {
        //     bigImg.style.top = 0;
        // } else if (bigX > bigMax) {
        //     bigImg.style.top = bigMax;
        // }

        bigImg.style.left = -bigX + 'px';
        bigImg.style.top = -bigY + 'px';
    })
})