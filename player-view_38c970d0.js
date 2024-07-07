/*! ablejs - v0.2.0 - Wednesday, July 3rd, 2024, 3:46:01 PM
* http://www.ablesky.com
* Copyright (c) 2024 frontend@ablesky.com; Licensed  */
define(["module", "jquery", "https://cdn1.100cdw.com.cn/common/grtPlayer.1.1.1.js", "common/base64", "ceat/sensors/sensorsdata.min"], function(e, t, a) {
    function i(e) {
        t.extend(w, e),
        S = e.isShowDot,
        A = e.isRecordTime,
        k = e.courseContentId,
        "undefined" != typeof accountId && (N = "TIME_" + accountId + "_" + k),
        $ = e.isThird,
        "undefined" != typeof accountId && "undefined" != typeof courseId_jsp && "undefined" != typeof jsp_circleId && (O = "COUNT_" + accountId + "_" + courseId_jsp + "_" + jsp_circleId,
        n(O)),
        $ && (O = "THIRD_COUNT_" + userId + "_" + courseId_jsp,
        n(O)),
        x = w.playEndautoPlay,
        I = w.url,
        L = e.isTrial,
        b = e.trialTime,
        F = 0 == e.isRest ? !1 : !0,
        void 0 != e.restTime && (M = e.restTime),
        v(),
        window.addEventListener("beforeunload", function() {
            y("play", "end", k)
        })
    }
    function n(e) {
        try {
            J = Base64.decode(localStorage.getItem(e)),
            J = parseInt(J)
        } catch (t) {
            console.log("get count error!"),
            J = 0
        }
        console.log(">>>>init count=" + J),
        J || (J = 0)
    }
    function o() {
        s(),
        D = a(P),
        D.emit("resourceReady", T),
        D.onTimeUpdate = function() {
            if (null != N && localStorage.setItem(N, parseInt(D.currentTime)),
            A && !_[k]) {
                J++,
                console.log(">>count=" + J);
                var e = J % 60;
                localStorage.setItem(O, Base64.encode(J.toString())),
                J >= 20 && 0 == e && (console.log(">>>record count=" + J),
                u(k, !1));
                var t = J % G;
                0 == t && y("heartbeat", "", k)
            }
        }
        ,
        D.on("play", function() {
            t(".video-on-tips").show(),
            ("answer" == z || "signin" == z) && (y(z, "end", k),
            z = ""),
            y("play", "start", k),
            H || (H = window.setInterval(function() {
                W++,
                0 == W % G && y("heartbeat", "", k)
            }, 1e3))
        }),
        D.on("pause", function() {
            y("play", "pause", k),
            ("answer" == z || "signin" == z) && y(z, "start", k)
        }),
        D.on("ended", function() {
            t(".video-on-tips").hide(),
            y("play", "end", k),
            localStorage.setItem(N, 0),
            exitFullscreen(),
            x && "function" == typeof x && x(),
            clearInterval(H)
        })
    }
    function s() {
        d(k),
        S && h();
        var e = !1;
        t.ajax({
            url: "course.do?action=getCourseContentInfo&courseContentId=" + k,
            dataType: "json",
            type: "get",
            async: !1,
            success: function(t) {
                null != t.videoType && 1 == t.videoType && (e = !0)
            }
        }),
        j = null == localStorage.getItem(N) ? 0 : parseInt(localStorage.getItem(N)),
        P = {
            id: "J_CC_videoPlayerDiv",
            url: I,
            width: "100%",
            height: "100%",
            autoplay: !0,
            closeVideoClick: !1,
            countTime: {
                interval: 60,
                cb: function(t) {
                    if (t.end)
                        console.log(">>>record count=" + J),
                        A && !_[k] && u(k, !0);
                    else {
                        R++;
                        var a = !1;
                        if (void 0 != C[k] && C[k].length > 0)
                            for (var i = 0; i < C[k].length; i++)
                                C[k][i].timeSlot == t.time && (a = !0);
                        !a && F && M > 0 && 0 == 20 * R % M && !e && (console.log(">>>touch restTime; playCount=" + R),
                        exitFullscreen(),
                        Q("您已学习" + Math.round(M / 60) + "分钟了，让眼睛休息一下吧"),
                        videoPause(),
                        z = "signin")
                    }
                }
            },
            dotList: E,
            lastPlayTime: j,
            lastPlayTimeHideDelay: 5,
            lastPlayTimeTips: '您上次学习到<span class="xgplayer-lasttime">' + f(j) + "</span>,欢迎继续学习",
            trying2Watch: {
                maxTime: b,
                cb: l
            },
            videoBackground: {
                isCustom: e,
                background: "url(" + IMG_PATH + "/player/download_9adcd2a2.png) center center/40% no-repeat, #000"
            }
        }
    }
    function r() {
        return D.currentTime
    }
    function l(e) {
        exitFullscreen(),
        K("试听结束"),
        e.player.currentTime = 0,
        videoPause()
    }
    function c(e) {
        R = 0,
        k = e,
        N = "TIME_" + accountId + "_" + k,
        s(),
        D.switchVideo(P, function(e) {
            D = e,
            D.emit("resourceReady", T),
            D.onTimeUpdate = function() {
                if (null != N && localStorage.setItem(N, parseInt(D.currentTime)),
                A && !_[k]) {
                    J++,
                    console.log(">>count=" + J);
                    var e = J % 60;
                    localStorage.setItem(O, Base64.encode(J.toString())),
                    J >= 20 && 0 == e && (console.log(">>>record count=" + J),
                    u(k, !1))
                }
            }
            ,
            D.on("play", function() {
                t(".video-on-tips").show(),
                ("answer" == z || "signin" == z) && (y(z, "end", k),
                z = ""),
                y("play", "start", k),
                H || (H = window.setInterval(function() {
                    W++,
                    0 == W % G && y("heartbeat", "", k)
                }, 1e3))
            }),
            D.on("pause", function() {
                t(".video-on-tips").show(),
                y("play", "pause", k),
                ("answer" == z || "signin" == z) && y(z, "start", k)
            }),
            D.on("ended", function() {
                y("play", "end", k),
                localStorage.setItem(N, 0),
                exitFullscreen(),
                x && "function" == typeof x && x(),
                clearInterval(H)
            }),
            D.once("complete", function() {
                D.root.classList.remove("xgplayer-is-fullscreen")
            })
        }),
        H = window.setInterval(function() {
            W++;
            var e = W % G;
            0 == e && y("heartbeat", "", k)
        }, 1e4)
    }
    function d(e) {
        T = [];
        var a = "#contentListId" + e + " li"
          , i = !1;
        t(a).each(function() {
            var e = new Object
              , a = t(this).attr("quality");
            "FLUENT" == a ? (e.name = "流畅",
            i || (I = t(this).text())) : "SD" == a ? (e.name = "标清",
            i = !0,
            I = t(this).text()) : "HD" == a ? e.name = "高清" : "FULL_HD" == a && (e.name = "超清"),
            e.url = t(this).text(),
            T.push(e)
        }),
        t(a).length < 2 && (T = [])
    }
    function u(e, a) {
        if (console.log(">>>>>currPlayCoursecontentId=" + e + "  finishIds[currPlayCoursecontentId]=" + _[e]),
        "undefined" == typeof _[e] && (_[e] = !1),
        _[e])
            return console.log(">>>finish! courseContentId=" + e),
            J = 0,
            localStorage.setItem(O, Base64.encode("0")),
            void 0;
        var i = Math.floor(J / 60);
        i = i *20
        i = 1 > i ? 1 : i,
        console.log(">>>>>>>studyMins=" + i);
        var n = {}
          , o = "studyLog.do";
        $ ? (n = {
            platformId: platformId,
            code: code,
            localUserId: userId,
            id: e,
            finish: a,
            ct: t.now()
        },
        o = "thirdPlatform/record") : n = 1 == i ? {
            id: e,
            circleId: jsp_circleId,
            finish: a,
            ct: t.now()
        } : {
            id: e,
            circleId: jsp_circleId,
            finish: a,
            studyMins: i,
            ct: t.now()
        },
        t.ajax({
            url: o,
            data: n,
            dataType: "json",
            type: "post",
            success: function(n) {
                n.success ? (n.progress >= 100 ? (_[e] = !0,
                t("#J_studyProgress_" + e).html("100%")) : (_[e] = !1,
                t("#J_studyProgress_" + e).html(n.progress + "%")),
                a || (J -= 20 * i,
                J = 0 > J ? 0 : J),
                B = 0,
                q = 0) : ("nologin" == n.message && (videoPause(),
                p("请注意! 您的帐号已退出或已在其它地点登录！", 1e3)),
                "double" == n.message ? 2 > q ? q++ : (videoPause(),
                count = 0,
                localStorage.setItem(O, Base64.encode("0")),
                q = 0,
                g("系统检测到您正在同时观看多门课程，仅一门课程计时")) : 4 > B ? B++ : (videoPause(),
                B = 0,
                localStorage.setItem(O, Base64.encode("0")),
                g("学时记录出现异常请检查网络")))
            }
        })
    }
    function p(e, a) {
        var i = a || 1e3
          , n = e || ""
          , o = t.dialog({
            title: "提示",
            content: "<center>" + n + "</center>",
            width: 400,
            modal: !0,
            buttons: [{
                text: "确定",
                css: {
                    backgroundColor: "#cb1812"
                },
                click: function() {
                    o.close()
                }
            }],
            close: function() {
                setTimeout(function() {
                    window.location.reload()
                }, i)
            }
        })
    }
    function h() {
        return null == k ? (console.log("courseContentId is null"),
        void 0) : C[k] ? (console.log("testTime has load courseQueTime[" + k + "]=" + JSON.stringify(C[k])),
        void 0) : (t.ajax({
            url: "course.do?action=getTestDuringCourse",
            data: {
                id: k
            },
            async: !1,
            dataType: "json"
        }).done(function(e) {
            if (e.success)
                if (e.result && e.result.list && e.result.list.length > 0) {
                    C[k] = e.result.list;
                    for (var t = 0; t < e.result.list.length; t++) {
                        var a = {};
                        a.time = e.result.list[t].timeSlot,
                        a.cb = m,
                        E.push(a)
                    }
                } else
                    C[k] = [];
            else
                g(e.message)
        }),
        void 0)
    }
    function m(e) {
        if (void 0 != C[k] && C[k].length > 0)
            for (var t = 0; t < C[k].length; t++)
                C[k][t].timeSlot == e.time && (z = "answer",
                exitFullscreen(),
                veiwExamStart(C[k][t].id, e.time))
    }
    function f(e, t) {
        var a = {};
        a.H = parseInt(e / 3600),
        a.i = parseInt((e - 3600 * a.H) / 60),
        a.s = parseInt(e - 3600 * a.H - 20 * a.i),
        t = "H:i:s",
        0 == a.H ? t = "i:s" : a.H < 10 && (a.H = "0" + a.H),
        a.i < 10 && (a.i = "0" + a.i),
        a.s < 10 && (a.s = "0" + a.s);
        var i = null;
        return i = "00" == a.H ? t.replace("i", a.i).replace("s", a.s) : t.replace("H", a.H).replace("i", a.i).replace("s", a.s)
    }
    function g(e) {
        var a = t.dialog({
            boxid: "showMessage_boxid",
            title: "提示",
            headStyle: {
                backgroundColor: "#c0130d"
            },
            bodyStyle: {
                backgroundColor: "#F7F7F7"
            },
            footStyle: {
                backgroundColor: "#F7F7F7"
            },
            content: "<center>" + e + "</center>",
            modal: !0,
            width: 370,
            buttons: [{
                text: "知道了",
                css: {
                    backgroundColor: "#c0130d"
                },
                click: function() {
                    a.close(),
                    -1 != navigator.userAgent.indexOf("Firefox") || -1 != navigator.userAgent.indexOf("Chrome") ? (window.location.href = "about:blank",
                    window.close()) : (window.opener = null,
                    window.open("", "_self"),
                    window.close())
                }
            }]
        });
        t(".dialog-close").hide()
    }
    function v() {
        var e = ""
          , a = "";
        t.ajax({
            url: "course.do?action=getSensorsInfo&courseContentId=" + k,
            dataType: "json",
            type: "get",
            async: !1,
            success: function(t) {
                e = t.pointDomain,
                a = t.accountId,
                V = t.courseId
            }
        }),
        $ && (a = userId),
        U.init({
            server_url: e + "/p/dc/sa.gif?project=grt_point&point_type=video_point",
            is_track_single_page: !0,
            use_client_time: !0,
            send_type: "beacon",
            heatmap: {
                clickmap: "not_collect",
                scroll_notice_map: "not_collect"
            }
        }),
        window.sensors = U,
        U.registerPage({
            uid: a,
            org_id: 7,
            platform_id: 200,
            client_type: "web"
        })
    }
    function y() {}
    var x, b, w = e.config(), k = null, _ = [], C = [], T = [], E = [], I = "", S = !1, A = !1, P = {}, D = null, j = 0, N = null, B = 0, L = !1, F = !0, M = 1200, R = 0, O = null, J = 0, $ = !1, q = 0, V = null, U = window.sensorsDataAnalytic201505, z = "", H = null, W = 0, G = 30;
    window.videoPause = function() {
        D.pause()
    }
    ,
    window.videoPlay = function() {
        D.play()
    }
    ,
    window.exitFullscreen = function() {
        D.fullscreen && D.exitFullscreen(D.root)
    }
    ;
    var Q = function(e) {
        var a = t.dialog({
            boxid: "rest_tip",
            title: "提示",
            width: 380,
            modal: !0,
            content: '<span style="display:block;text-align: center;">' + e + "</span>",
            buttons: [{
                text: "继续学习",
                css: {
                    backgroundColor: "#c0130d"
                },
                click: function() {
                    videoPlay(),
                    a.close()
                }
            }]
        })
    }
      , K = function(e) {
        var a = t.dialog({
            boxid: "message_tip",
            title: "提示",
            width: 280,
            content: '<span style="display:block;text-align: center;">' + (e ? e : "额，出错啦~~") + "</span>",
            buttons: [{
                text: "确定",
                css: {
                    backgroundColor: "#c0130d"
                },
                click: function() {
                    videoPlay(),
                    a.close()
                }
            }]
        })
    };
    return {
        init: i,
        switchVideo: c,
        getVideoPostion: r,
        loadingPlayer: o,
        initSensors: v
    }
});
