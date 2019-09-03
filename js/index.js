var ewm = document.getElementById('erweima');
var syewm = document.getElementById('syheader-ewm');
ewm.onmouseover = function(){
    syewm.className = 'erweima show';
};
ewm.onmouseout = function(){
    syewm.className = 'erweima hide';
};