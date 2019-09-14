var ewm = document.getElementById('erweima');
var syewm = document.getElementById('syheader-ewm');
ewm.onmouseover = function(){
    syewm.className = 'erweima show';
};
ewm.onmouseout = function(){
    syewm.className = 'erweima hide';
};
var J_event = document.getElementsByClassName('J_event')[0];
var X =J_event.getElementsByTagName('i')[0];
X.onclick = function(){
    J_event.style.display = 'none';
}
