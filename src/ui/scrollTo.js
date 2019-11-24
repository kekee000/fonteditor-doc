/**
 * @file scrollTo.js
 * @author mengke01
 * @date
 * @description
 * 页面滚动到指定元素
 */

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
export default function scrollTo(toElement, options) {

    options = Object.assign({
        top: 0,
        duration: 200,
        easing: 'swing'
    }, options);

    const container = window.chrome ? document.documentElement : document.body;
    if (options.noAnim) {
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
