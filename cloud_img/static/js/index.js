layui.use(['layer','upload'], function(){
    var $ = layui.jquery;
    var layer = layui.layer;
    var upload = layui.upload;
    var preview_url = "";

    //执行实例
    var uploadInst = upload.render({
        elem: '#upload' //绑定元素
        ,url: '/upload/qiniu/' //上传接口
        ,accept: 'images' //允许上传的文件类型
        ,size: 10240 //最大允许上传的文件大小
        ,done: function(res){
            // 上传完毕回调
            if (res.code == 200) {
                layer.msg(res.msg, {icon: 1});
                $('#url').val(res.url);  // res.url为上传后的文件url
                preview_url = '<img src="'+res.url+'">'
                $('#html-url').val(preview_url);
                mkd_url = '![avatar]('+ res.url +')'
                $('#mkd-url').val(mkd_url);
                $("#notice").html(res.msg);
                $("#res-box").show();
            } else {
                layer.msg(res.msg, {icon: 2});
            }
        },
        error: function () {  // 请求异常回调
            layer.msg('上传失败', {icon: 2});
        }
    });
    $("#copy").click(function(){
        var url = $("#url").select();
        // 与其说是被禁用，不如说是不想写 哈哈哈哈 ^--^
        $("#notice").html("您的浏览器禁用了复制功能，请使用Ctrl+C复制！");
    });
    $("#html-copy").click(function(){
        var url = $("#html-url").select();
        $("#notice").html("您的浏览器禁用了复制功能，请使用Ctrl+C复制！");
    });
    $("#mkd-copy").click(function(){
        var url = $("#mkd-url").select();
        $("#notice").html("您的浏览器禁用了复制功能，请使用Ctrl+C复制！");
    });
    $("#preview").click(function(){
         layer.open({
             title: '图片预览',
             offset: '100px',
             area: ['1000px', '700px'],
             content: preview_url
         });
    });
});