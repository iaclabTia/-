var box = document.getElementById('rb_box');
var inner = box.children[0];
rb_func(inner,true);
var box2 = document.getElementById('mid2_rb_box');
var inner2 = box2.children[0];
rb_func(inner2,false)
function rb_func(inner,flag){
    var pic_w = inner.offsetWidth;//�ֲ�ͼ�Ŀ��

    var pic_ul = inner.children[0];//�ֲ�ͼ��ͼƬ����

    if(flag){
        var rb_button = inner.children[1];//�ֲ�ͼÿ��ͼ�İ�ť����
        var button_list = rb_button.children;//ÿ��ͼ��ť�б�
        var lr=inner.children[2];//�ֲ�ͼ���Ұ�ť����
    }
    else{
        var lr=inner.children[1];//�ֲ�ͼ���Ұ�ť����
    }

    var pic_list = pic_ul.children;//ͼƬ�б�
    var p_left = lr.children[0];//��ť
    var p_right = lr.children[1];//�Ұ�ť

    var index=0;//��¼�ֲ�ͼ�����ĸ�ͼ

    for (var i = 0; i < pic_list.length; i++) {
        if(flag){//�Ƿ���Ҫÿ��ͼƬ���尴ť
            var liobj = document.createElement('li');//�����ֲ�ͼ��ͼƬ����̬������Ӧ��ť
            rb_button.appendChild(liobj);//�����ֲ�ͼ��ͼƬ����̬������Ӧ��ť
            //liobj.innerHTML = (i+1);//�����ֲ�ͼ��ͼƬ����̬������Ӧ��ť
            liobj.setAttribute('index', i);//�����ֲ�ͼ��ͼƬ����̬������Ӧ��ť
            liobj.onmouseover = function () {//ÿ����ť���¼�
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
        button_list[0].className='current';//Ĭ����ʼ���Ű�ť
    pic_ul.appendChild(pic_ul.children[0].cloneNode(true));//�ѵ�һ��ͼ�ŵ����ʹ���ֲ�ͼ�ڿ�ͷ��β��Ҳ�ܲ�������
    var timeId = setInterval(animate0,2000);//�ֲ�ͼ�Զ�����
//���Ұ�ť����ʾ������
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

