/**
 *
 * You can write your JS code here, DO NOT touch the default style file
 * because it will make it harder for you to update.
 *
 */

"use strict";
(function (root) {
    /**
     * 全局变量
     * 1.后端请求地址包装
     * 2.Noties对象
     * @type {string}
     */
    // 后端请求路径
    root.BaseUrl = 'http://localhost:8888';

    /**
     * 全局Nav信息加载
     * 若通过浏览器返回按钮返回到页面,该函数执行时会根据后端传来的code跳转到登录页.
     */
    root.navInfo = function () {
        $.ajax({
            url: BaseUrl + '/global/getLoginUserInfo',
            type: 'get',
            //解决session不共享
            crossDomain: true,
            xhrFields: {withCredentials: true},
            success: function (data) {
                switch (data.code) {
                    case 101:
                        window.location.href = "auth-login.html";
                        break;
                    default:
                        $.each(data.data, function (key, val) {
                            switch (key) {
                                case "znName":
                                    $("#current_znName").html(val);
                                    break;
                                case "lastLogin":
                                    $("#current_lastLogin").html(val);
                                default:
                                    break;
                            }
                        });
                        break;
                }

            }
        })
    }

    /**
     * 退出登录,后端移除Session
     */
    root.loginOut = function () {
        $.ajax({
            url: BaseUrl + '/loginOut',
            type: 'get',
            //解决session不共享
            crossDomain: true,
            xhrFields: {withCredentials: true},
            success: function (data) {
                swal({
                    title: data.message,
                    icon: "success"
                }).then((willTrue) => {
                    window.location.href = "auth-login.html";
                })
            },
        })
    }


    /**
     * 下拉列表加载
     * @param result可放入需要加载数据的下拉列表的ID,如:var Json = {"roleId":roleId,"groupId":groupId}
     */
    root.dropListLoad = function (result) {
        //1.Json中放入需要初始化的TagID
        if (result != null) {
            $.each(result, function (key, val) {
                //判断key值执行相应的初始化函数
                if (key == "roleId") {
                    roleList(val);
                } else if (key == "groupId") {
                    groupList(val);
                } else if (key == "placeId") {
                    palceList(val);
                }
            });
        } else {
            //结束
            return false;
        }
    }

    //角色下拉列表
    root.roleList = function (val) {
        $.ajax({
            url: BaseUrl + '/global/getRoleList',
            type: 'get',
            //解决session不共享
            crossDomain: true,
            xhrFields: {withCredentials: true},
            success: function (data) {
                //动态生成下拉列表框
                for (var i in data.data) {
                    $("#" + val).append("<option value='" + data[i].roleId + "'>" + data[i].roleName + "</option>");
                }
            },
        });
    }

    //部门下拉列表
    root.groupList = function (val) {
        $.ajax({
            url: BaseUrl + '/global/getGroupList',
            type: 'get',
            //解决session不共享
            crossDomain: true,
            xhrFields: {withCredentials: true},
            success: function (data) {
                //动态生成下拉列表框
                for (var i in data.data) {
                    $("#" + val).append("<option value='" + data[i].groupId + "'>" + data[i].groupName + "</option>");
                }
            },
        });
    }

    //场地下拉列表
    root.palceList = function (val) {
        $.ajax({
            url: BaseUrl + '/global/getPlaceList',
            type: 'get',
            //解决session不共享
            crossDomain: true,
            xhrFields: {withCredentials: true},
            success: function (data) {
                //动态生成下拉列表框
                for (var i in data.data) {
                    $("#" + val).append("<option value='" + data[i].placeId + "'>" + data[i].placeName + "</option>");
                }
            },
        });
    }


    /**
     * 设置各类标签函数
     */
    //用户身份标签
    root.identityTag = function (val) {
        if (val == null) {
            return '<div class="badge badge-warning"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">未分配</font></font></div>'
        } else {
            return '<div class="badge badge-light"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">' + val + '</font></font></div>'
        }
    };

    //有效状态标签
    root.isEffTag = function (val) {
        switch (val) {
            case "1":
                return '<div class="badge badge-danger"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">无效</font></font></div>'
            default:
                return '<div class="badge badge-success"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">有效</font></font></div>'
        }
    };

    // 系统日志标签
    root.modifyColor = function (val, color) {
        return '<strong><p class="text-' + color + '">' + val + '</p></strong>'
    };

    // 场地类型标签
    root.PlaceType = function (val) {
        switch (val) {
            case "1":
                return '<strong><p class="text-primary">室外</p></strong>'
            default:
                return '<strong><p class="text-warning">室内</p></strong>'
        }
    };

    root.offTag = function (val) {
        switch (val) {
            case "1":
                return '<div class="badge badge-primary"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">已关闭</font></font></div>'
            default:
                return '<div class="badge badge-danger"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">未关闭</font></font></div>'
        }
    }
    root.verifyTag = function (val) {
        switch (val) {

            // <span class="badge badge-primary"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">小学</font></font></span>

            case "1":
                return '<span class="badge badge-success"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">已通过</font></font></span>'
            case "2":
                return '<div class="badge badge-warning"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">未通过</font></font></div>'
            default:
                return '<div class="badge badge-primary"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">待审</font></font></div>'
        }
    }

    //编辑状态验证
    root.editStatus = function (val, data) {
        if (val == 1) {
            //将所有输入框或下拉列表添加禁用标记
            $.each(data, function (key, val1) {
                $("#" + key).attr("disabled", true);
            })
            $("#placeId").attr("disabled", true);
            $("#btn-submit").attr("disabled", true);
        } else {
            //取消禁用标记
            $.each(data, function (key, val) {
                if (key == "placeId") {
                    $("#" + key).removeAttr("disabled");
                } else {
                    $("#" + key).attr("disabled", false);
                }
            })
            $("#btn-submit").attr("disabled", false);
        }
    }

    //空值Null值替换
    root.NullValueTag = function (val) {
        switch (val) {
            case null:
                return '<strong><p class="text-danger">暂无</p></strong>'
            default :
                return '<strong><p class="text-primary">' + val + '</p></strong>'
        }
    }

    root.checkNullValue = function (data) {
        $.each(data, function (key, val) {
            if (val == null || val == '') {
                swal({
                    title: key + "不能为空",
                    icon: "error"
                })
            }
        })
    }


}(this));