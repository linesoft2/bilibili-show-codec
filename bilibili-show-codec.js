// ==UserScript==
// @name         B站视频解码器显示
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  显示当前B站视频所用解码器
// @author       LineSoft
// @match        https://www.bilibili.com/video/*
// @match        https://www.bilibili.com/bangumi/play/*
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    var _player = window.player
    if(!_player){
        Object.defineProperty(window,'player',{
            set(p)
            {
                _player = p
                _player.on('Player_LoadedData',showCodec)
                showCodec()
                this._player = p
            },
            get(){
                return this._player
            }
        })
    }else{
        _player.on('Player_LoadedData',showCodec);
    }
    function showCodec(){
        var codec = _player.core().state.mediaInfo.videoCodec
        var codecName
        if(codec.indexOf('av01')!==-1){
            codecName = 'AV1'
        }else if(codec.indexOf('hev1')!==-1){
            codecName = 'HEVC'
        }else if(codec.indexOf('avc1')!==-1){
            codecName = 'AVC'
        }
        if(document.getElementById('show-codec')){
            document.getElementById('show-codec').innerHTML = codecName
        }else{
            var e = document.createElement("div");
        e.id = "show-codec"
        e.innerHTML = codecName
        e.style = `position: absolute;
                   top: 5px;
                   left: 5px;
                   color: #BCC2C5;
                   z-index: 1999999999999;`
        document.getElementById('bilibili-player').appendChild(e)
        }
    }
})();