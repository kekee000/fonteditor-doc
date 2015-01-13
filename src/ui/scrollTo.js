/**
 * @file scrollTo.js
 * @author mengke01
 * @date
 * @description
 * 页面滚动到指定元素
 */

define(
    function(require) {

        /**
         * 页面滚动到指定元素
         *
         * @param {HTMLElement} toElement 滚动到的元素
         * @param {Object} options 参数选项
         * @param {HTMLElement} options.container 需要滚动的元素，默认document
         * @param {number} options.top 矫正的top像素
         * @param {number} options.duration 持续时间，默认200ms
         * @param {string} options.easing 动画算子，默认`swing`
         * @param {Function} options.onFinish 结束时的事件
         * @param {boolean} options.noAnim 禁用动画
         * @return {Promise} 动画的promise对象
         */
        function scrollTo(toElement, options) {

            options = $.extend({
                top: 0,
                duration: 200,
                easing: 'swing'
            }, options);

            var container = options.container ||
                (
                    //这里chrome使用document.body滚动
                    // IE和火狐document.documentElement不明觉厉
                    navigator.userAgent.match(/\bAppleWebKit\b/)
                    ? document.body
                    : document.documentElement
                );

            if(options.noAnim) {
                $(container).get(0).scrollTop = $(toElement).offset().top + options.top;
            }
            else {
                return $(container).animate(
                    {
                        scrollTop: $(toElement).offset().top + options.top
                    },
                    options.duration,
                    options.easing,
                    options.onFinish
                );
            }
        }

        return scrollTo;
    }
);