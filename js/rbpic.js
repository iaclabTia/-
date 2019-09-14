var box = document.getElementById('rb_box');
var inner = box.children[0];
rb_func(inner,true);
var box2 = document.getElementById('mid2_rb_box');
var inner2 = box2.children[0];
rb_func(inner2,false)
function rb_func(inner,flag){
    var pic_w = inner.offsetWidth;//轮播图的宽度

    var pic_ul = inner.children[0];//轮播图的图片容器

    if(flag){
        var rb_button = inner.children[1];//轮播图每张图的按钮容器
        var button_list = rb_button.children;//每张图按钮列表
        var lr=inner.children[2];//轮播图左右按钮容器
    }
    else{
        var lr=inner.children[1];//轮播图左右按钮容器
    }

    var pic_list = pic_ul.children;//图片列表
    var p_left = lr.children[0];//左按钮
    var p_right = lr.children[1];//右按钮

    var index=0;//记录轮播图到了哪个图

    for (var i = 0; i < pic_list.length; i++) {
        if(flag){//是否需要每张图片定义按钮
            var liobj = document.createElement('li');//根据轮播图的图片数动态创建对应按钮
            rb_button.appendChild(liobj);//根据轮播图的图片数动态创建对应按钮
            //liobj.innerHTML = (i+1);//根据轮播图的图片数动态创建对应按钮
            liobj.setAttribute('index', i);//根据轮播图的图片数动态创建对应按钮
            liobj.onmouseover = function () {//每个按钮绑定事件
                for (var j = 0; j < button_list.length; j++) {
                    button_list[j].removeAttribute("class");
                }
                this.className = 'current';
                index = this.getAttribute('index');
                animate(pic_ul, -index * pic_w);
            };
        }
    }
    if(flag)
        button_list[0].className='current';//默认起始播放按钮
    pic_ul.appendChild(pic_ul.children[0].cloneNode(true));//把第一个图放到最后，使得轮播图在开头结尾处也能播放流畅
    var timeId = setInterval(animate0,2000);//轮播图自动播放
//左右按钮的显示与隐藏
    inner.onmouseout = function(){
        lr.style.display ='none';
        timeId = setInterval(animate0,2000);
    };
    inner.onmouseover = function(){
        lr.style.display = 'block';
        clearInterval(timeId);
    };
    function animate0() {
        if(index==pic_ul.children.length-1){
            index=0;
            pic_ul.style.left=0+'px';
        }
        index++;
        animate(pic_ul, -index * pic_w);
        if(flag){
            if(index==pic_ul.children.length-1){
                button_list[button_list.length-1].className='';
                button_list[0].className='current';
            }else{
                for (var j = 0; j < button_list.length; j++) {
                    button_list[j].removeAttribute("class");
                }
                button_list[index].className='current';
            }
        }
    }

    p_right.onclick = animate0;

    function animate(ele, target){
        clearInterval(ele.timeId);
        ele.timeId = setInterval(function () {
            var step = 10;
            var current = ele.offsetLeft;
            step = current < target ? step : -step;
            current+=step;
            if(Math.abs(current-target)>step){
                ele.style.left = current+'px';
            }else{
                clearInterval(ele.timeId);
                ele.style.left = target+'px';
            }
        }, 10)
    }
    p_left.onclick = function(){
        if(flag){
            if(index==0){
                index=button_list.length;
                pic_ul.style.left = -index*pic_w +'px';
            }
            index--;
            animate(pic_ul,-index*pic_w);
            var current = rb_button.getElementsByClassName('current')[0];
            current.removeAttribute('class');
            button_list[index].className = 'current';
        }
        else
        {
            if(index==0){
                index=pic_list.length-1;
                pic_ul.style.left = -index*pic_w +'px';
            }
            index--;
            animate(pic_ul,-index*pic_w);
        }
    };
}

