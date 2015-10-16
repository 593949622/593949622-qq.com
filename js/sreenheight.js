$(function(){
    window.onload=function(){
        var height = Math.max(document.documentElement.clientHeight, document.body.offsetHeight);
        document.getElementById('sec').style.height=height+'px';
    };
});