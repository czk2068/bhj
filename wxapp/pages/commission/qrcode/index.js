var e = getApp().requirejs("core");

Page({
    data: {
        showimage: !1,
        imgarr:{}
    },
    onLoad: function(e) {},
    onShow: function() {
        this.getData();
    },
    getData: function() {
        var o = this;
        e.get("commission/qrcode", {}, function(e) {
            70001 != e.error ? (e.show = !0, o.setData(e), o.getImage()) : wx.redirectTo({
                url: "/pages/member/info/index"
            });
        });
    },
    getImage: function() {
        var o = this;
        e.post("commission/qrcode", {}, function(e) {
            70001 != e.error ? (e.showimage = !0, o.setData(e)) : wx.redirectTo({
                url: "/pages/member/info/index"
            });
        });
    },
    


    //点击开始时的时间
    timestart: function (e) {
      　　var _this = this;
      　　_this.setData({ timestart: e.timeStamp });
    },

    //点击结束的时间
    timeend: function (e) {
      　　var _this = this;
      　　_this.setData({ timeend: e.timeStamp });
    },


    //保存图片
    saveImg: function (e) {
        var _this = this;
        var times = _this.data.timeend - _this.data.timestart;
        if (times > 300) {
            wx.showModal({
                title: '提示',
                content: '是否保存图片',
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定');
                        wx.getSetting({
                            success: function (res) {
                                wx.authorize({
                                    scope: 'scope.writePhotosAlbum',
                                    success: function (res) {
                                        console.log("授权成功");
                                        var imgUrl = e.target.dataset.url;//图片地址
                                        wx.downloadFile({
                                            //下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径
                                            url: imgUrl,
                                            success: function (res) {
                                                console.log(res);
                                                // 下载成功后再保存到本地
                                                wx.saveImageToPhotosAlbum({
                                                    filePath: res.tempFilePath,//返回的临时文件路径，下载后的文件会存储到一个临时文件
                                                    success: function (res) {

                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
            
        }
    },
});