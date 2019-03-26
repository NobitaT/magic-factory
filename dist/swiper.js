"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var timer = null;
var defaultSetting = {
    "width": 600,
    "height": 400
};

var Swiper = function () {
    function Swiper(options) {
        var _this = this;

        _classCallCheck(this, Swiper);

        this.setting = Object.assign(defaultSetting, options);
        this.container = document.getElementById('swiperContainer');
        this.list = this.container.getElementsByTagName('ul')[0];
        this.swiperItem = this.container.getElementsByClassName('swiper-item');
        this.length = this.swiperItem.length;
        this.prev = document.getElementById('swiperPrev');
        this.next = document.getElementById('swiperNext');

        this.pagination = document.getElementsByClassName('pagination')[0];

        this.left = 0;
        this.offsetX = this.setting.width;
        this.initLeft = -this.offsetX;
        this.index = 0;

        this.init();

        this.prev.addEventListener('click', function () {
            _this.stopPlay();
            _this.movePrev();
        }, false);

        this.next.addEventListener('click', function () {
            _this.stopPlay();
            _this.moveNext();
        }, false);

        // this.container.addEventListener('click', (e) => {
        //     console.log(e);
        //     if (e.target === '') {

        //     }
        // })

        this.list.addEventListener('mouseover', function () {
            _this.stopPlay();
        }, false);
        this.list.addEventListener('mouseout', function () {
            _this.autoPlay();
        }, false);
    }

    _createClass(Swiper, [{
        key: "init",
        value: function init() {
            var copyFirstItem = this.swiperItem[0].cloneNode(true);
            var copyLastItem = this.swiperItem[this.length - 1].cloneNode(true);
            this.list.appendChild(copyFirstItem);
            this.list.insertBefore(copyLastItem, this.swiperItem[0]);
            this.initNum = 1;
            this.left = this.initNum * this.offsetX;
            this.list.style.left = -this.left + 'px';
            this.autoPlay();
        }
    }, {
        key: "moveNext",
        value: function moveNext() {
            this.moveStep(1);
            var num = this.initNum === this.length + 1 ? 1 : this.initNum;
            this.highlightBullet(num);
        }
    }, {
        key: "movePrev",
        value: function movePrev() {
            this.moveStep(-1);
            var num = this.initNum === 0 ? this.length : this.initNum;
            this.highlightBullet(num);
        }
    }, {
        key: "moveStep",
        value: function moveStep(num) {
            var _this2 = this;

            if (this.initNum === this.length + 1 || this.initNum === 0) {
                if (this.initNum === this.length + 1) {
                    this.initNum = 1;
                } else {
                    this.initNum = this.length;
                }
                this.list.style.transition = "none";
                this.list.style.left = -this.initNum * this.offsetX + 'px';
            }
            this.initNum = this.initNum + num;
            this.left = this.initNum * this.offsetX;
            setTimeout(function () {
                _this2.list.style.transition = "all 1s ease-in-out";
                _this2.list.style.left = -_this2.left + 'px';
            }, 20);
        }
    }, {
        key: "highlightBullet",
        value: function highlightBullet(num) {
            this.pagination.getElementsByClassName('active')[0].classList.remove('active');
            this.pagination.children[num - 1].classList.add('active');
        }
    }, {
        key: "autoPlay",
        value: function autoPlay() {
            var _this3 = this;

            timer = setInterval(function () {
                _this3.moveNext();
            }, 3000);
        }
    }, {
        key: "stopPlay",
        value: function stopPlay() {
            clearInterval(timer);
        }
    }]);

    return Swiper;
}();
