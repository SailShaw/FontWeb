/**
 *
 * You can write your JS code here, DO NOT touch the default style file
 * because it will make it harder for you to update.
 * 
 */

"use strict";
(function(root){
    /**
     * 全局变量
     * 1.后端请求地址包装
     * 2.Noties对象
     * @type {string}
     */
    // 后端请求路径
    root.BaseUrl = 'http://localhost:8888/';

    // 全局通知插件初始化
    // root.noties = new Notyf({
    //     delay:2000,//延时
    //     alertIcon: 'fa fa-exclamation-circle',//警告提示图标
    //     confirmIcon:'fa fa-check-circle'//成功提示图标
    // });

    //全局Nav信息
    root.navInfo = function (){
        $.ajax({
            url: BaseUrl + 'global/getLoginUserInfo',
            type: 'get',
            dataType: 'json',
            //解决session不共享
            crossDomain: true,
            xhrFields: {withCredentials: true},
            success: function (data) {
                $.each(data, function (key, val) {
                    $('#' + key).html(val);
                });
            }
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
            url: BaseUrl + 'global/getRoleList',
            type: 'get',
            dataType: 'json',
            //解决session不共享
            crossDomain: true,
            xhrFields: {withCredentials: true},
            success: function (data) {
                //动态生成下拉列表框
                for (var i in data) {
                    $("#"+val).append("<option value='" + data[i].roleId + "'>" + data[i].roleName + "</option>");
                }
            },
        });
    }

    //部门下拉列表
    root.groupList = function (val) {
        $.ajax({
            url: BaseUrl + 'global/getGroupList',
            type: 'get',
            dataType: 'json',
            //解决session不共享
            crossDomain: true,
            xhrFields: {withCredentials: true},
            success: function (data) {
                //动态生成下拉列表框
                for (var i in data) {
                    $("#"+val).append("<option value='" + data[i].groupId + "'>" + data[i].groupName + "</option>");
                }
            },
        });
    }
    
    //场地下拉列表
    root.palceList = function (val) {
        $.ajax({
            url: BaseUrl + 'global/getPlaceList',
            type: 'get',
            dataType: 'json',
            //解决session不共享
            crossDomain: true,
            xhrFields: {withCredentials: true},
            success: function (data) {
                //动态生成下拉列表框
                for (var i in data) {
                    $("#"+val).append("<option value='" + data[i].placeId + "'>" + data[i].placeName + "</option>");
                }
            },
        });
    }


    /**
     * 设置各类标签函数
     */
    //用户身份标签
    root.identityTag = function (val) {
        if (val == null){
            return '<div class="badge badge-warning"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">未分配</font></font></div>'
        }else{
            return '<div class="badge badge-light"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">'+val+'</font></font></div>'
        }
    };

    //有效状态标签
    root.isEffTag = function (str) {
        switch (str) {
            case "1":
                return '<div class="badge badge-danger"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">无效</font></font></div>'
            default:
                return '<div class="badge badge-success"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">有效</font></font></div>'
        }
    };

    // 系统日志标签
    root.modifyColor = function (str,color) {
        return '<strong><p class="text-'+color+'">'+str+'</p></strong>'
    };

    // 场地类型标签
    root.setPlaceType = function (str) {
        switch (str) {
            case "1":
                return '<strong><p class="text-primary">室外</p></strong>'
            default:
                return '<strong><p class="text-warning">室内</p></strong>'
        }
    };






}(this));