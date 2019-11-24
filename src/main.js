/**
 * @file main.js
 * @author mengke01
 * @description
 * 帮助文档入口
 */
import './main.less';
import AnchorDetect from './ui/AnchorDetect';
import scrollTo from './ui/scrollTo';
function main() {
    const sidebar = $('#sidebar');
    const anchorDetect = new AnchorDetect(window, {
        selector: 'section[data-anchor]',
        anchorOffset: -71,
        onAnchorChange(e) {
            sidebar.find('.active').removeClass('active');
            sidebar.find('[href*="#' + e.anchor + '"]').addClass('active');
        }
    });

    const scrollToAnchor = function (anchor) {
        let ctlAnchor;
        if (anchor && (ctlAnchor = $('[data-anchor="' + anchor + '"]')).length) {
            anchorDetect.stop();
            scrollTo(ctlAnchor, {
                top: -70,
                onFinish() {
                    location.hash = anchor;
                    sidebar.find('.active').removeClass('active');
                    sidebar.find('[href*="#' + anchor + '"]').addClass('active');
                    anchorDetect.start();
                }
            });
        }
    };

    sidebar.on('click', '[href]', function (e) {
        e.preventDefault();
        let hash = this.href.slice(this.href.lastIndexOf('#') + 1);
        hash && scrollToAnchor(hash);
    });

    $(window).on('load', function () {
        anchorDetect.refresh();
        if (location.hash) {
            scrollToAnchor(location.hash.slice(1));
        }
    });
}

main();
