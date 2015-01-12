/**
 * @file AnchorDetect.js
 * @author mengke01 hushicai02
 * @date 
 * @description
 * 滚动检测组件，用来检测滚动事件
 * 
 */


define(
    function(require) {

        /**
         * 绑定方法到原始对象
         * 
         * @param {Object} object 原始对象
         * @param {string} method 方法名
         * @return {Object} 原始对象
         */
        function bind(object, method) {
            var fn = object[method];
            object[method] = function() {
                fn.apply(object, arguments);
            }
            return object;
        }


        /**
         * 获取滚动高度
         * 
         * @return {number} 高度值
         */
        function getScrollTop() {
            return window.pageYOffset 
                    || document.body.scrollTop 
                    || document.documentElement.scrollTop;
        }


        /**
         * 锚点检测组件
         * 
         * @constructor
         * @param {HTMLElement} main 需要检测的对象
         * @param {Object} options 参数集合
         * @param {number} options.throttle 截流时间
         * @param {string} options.selector 锚点选择器
         * @param {number} options.anchorOffset 锚点偏移
         * @param {Function} options.onScrollChange 滚动改变事件，
         *   参数e：e.top 当前位置，e.target 当前对象
         * @param {Function} options.onAnchorChange 锚点改变事件
         *   参数e：e.top 当前位置，e.target 当前对象，e.anchor 当前对象的`data-anchor`属性
         * 
         */
        function AnchorDetect(main, options) {
            this.main = main || window;
            this.throttle = options.throttle || 50; //设置截流时间
            this.selector = options.selector || '[data-anchor]'; //设置锚点选择器
            this.anchorOffset = options.anchorOffset || 0; //锚点的偏移量

            $.extend(this, options);
            //绑定事件到本对象
            bind(this, '_onScroll');
            bind(this, '_scrollChange');
            this.init();
        }

        /**
         * 获取window的scrollTop属性
         * 
         * @type {Function}
         */
        AnchorDetect.getScrollTop = getScrollTop;

        $.extend(AnchorDetect.prototype, {

            /**
             * 锚点位置检查
             * 
             * @private
             */
            _scrollChange: function() {
                var top = 0;

                //这里检查对象是否为window
                if(this.main === window) {
                    top = getScrollTop();
                }
                else {
                    top = this.main.scrollTop;
                }

                this.onScrollChange && this.onScrollChange({
                    top: top,
                    target: this.main
                });

                var anchorPos = this.anchorPos;
                var i = anchorPos.length;

                while (--i && top < anchorPos[i][0]);

                var index = anchorPos[i][1];
                var current = this.anchors[index];

                this.onAnchorChange && this.onAnchorChange({
                    top: top,
                    target: current,
                    anchor: current.attr('data-anchor')
                });

            },

            /**
             * 滚动检查
             * 
             * @private
             */
            _onScroll: function() {
                clearTimeout(this.scrollTimer);
                this.scrollTimer = setTimeout(this._scrollChange, this.throttle);
            },

            /**
             * 初始化
             */
            init: function() {
                //查找锚点
                var anchors = [];
                //如果是window对象，则从document.body查找节点
                var main = this.main === window ? document.body : this.main;
                $(main).find(this.selector).each(function(index, item) {
                    anchors[index] = $(item);
                });
                this.anchors = anchors;

                //如果有锚点，则自动开始
                if(this.anchors.length) {
                    this.refresh();
                    this.start();
                }
            },

            /**
             * 滚动改变时候的事件
             * 
             * @type {Function}
             */
            onScrollChange: null,

            /**
             * 锚点改变时候的事件
             * 
             * @type {Function}
             */
            onAnchorChange: null,

            /**
             * 获得锚点的相对坐标，
             * 
             * @param {Jquery} anchor jquery对象
             * @return {number} 锚点的坐标值
             */
            getAnchorPos: function(anchor) {
                return anchor.offset().top + this.anchorOffset;
            },

            /**
             * 刷新锚点纵坐标
             * 
             * @return {AnchorDetect} 本对象
             */
            refresh: function() {
                var me = this;
                var anchorPos = [], i = 0;
                $(this.anchors).each(function(index, item) {
                    //如果锚点元素可视，则检测，否则不检测
                    if( 'none' !== item.css('display')) {
                        anchorPos[i++] = [me.getAnchorPos(item), index];
                    }
                });

                //这里为了加速检测，对坐标从小到大进行排序
                this.anchorPos = anchorPos.sort(function(a, b) {
                    return a[0] - b[0];
                });
            },

            /**
             * 开始检测
             * 
             * @return {AnchorDetect} 本对象
             */
            start: function() {
                if(!this._binded) {
                    $(this.main).on('scroll', this._onScroll);
                    this._binded = true;
                }
                return this;
            },

            /**
             * 停止检测
             * 
             * @return {AnchorDetect} 本对象
             */
            stop: function() {
                clearTimeout(this.scrollTimer);
                if(this._binded) {
                    $(this.main).off('scroll', this._onScroll);
                    this._binded = false;
                }
                return this;
            },

            /**
             * 页面刷新时，检测锚点位置
             * 
             * @public
             */
            check: function() {
                this._scrollChange();
            },

            /**
             * 注销本对象
             */
            dispose: function() {
                clearTimeout(this.scrollTimer);
                $(this.main).off('scroll', this._onScroll);
                this.anchors = null;
                this.anchorPos = null;
                this.main = null;
            }

        });

        return AnchorDetect;
    }
);
