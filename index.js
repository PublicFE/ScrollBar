export default class CustomBar {
    constructor() {
        this.initDom();
        this.initFunc();
        document.body.addEventListener("scroll", this.scrollSpecail.bind(this));
    }

    trackDom = null
    thumbDom = null
    timer = null

    initDom() {
        this.trackDom = document.getElementById('scrollDebounce-id');
        const trackId = 'scrollDebounce-id';
        const thumbId = 'scrollDebounceBar-id';
        if (!this.trackDom) {
            const dom = document.createElement('div');
            dom.innerHTML = `<div id="${thumbId}" style="width: 8px;border-radius: 50px;height: 80px;
                        position: fixed;transition: all 0.1s ease 0s;
                        visibility: hidden;top: 0px;right: 0px;background: rgba(0, 0, 0, 0.8);">  
                      </div>`;
            dom.style.width = '8px';
            dom.style.borderRadius = '50px';
            dom.style.position = 'fixed';
            dom.style.opacity = '0.5';
            dom.style.transition = 'all 0.1s';
            dom.style.visibility = 'visible';
            dom.id = trackId;
            dom.style.top = '0px';
            dom.style.right = '0px';
            dom.style.bottom = '0px';
            dom.style.background = 'rgba(0, 0, 0, 0)';
            dom.style.boxShadow = 'rgba(0, 0, 0, 0.5)';
            document.body.append(dom);
            this.trackDom = dom;
        } else {
            this.trackDom.style.top = `0px`;
        }
        this.thumbDom = document.getElementById(thumbId);
    }

    showBarFunc = (e)=> {
        this.thumbDom.style.visibility = 'visible';
    }

    initFunc() {
        this.trackDom.addEventListener("mousemove", this.showBarFunc);

        this.thumbDom.onmousedown = function (e) {
            e.stopPropagation();
            e.preventDefault();
            let startY = e.target.offsetTop;
            document.body.style.transition = 'all 0.1s'
            document.body.onmousemove = function (event) {
                event.stopPropagation();
                event.preventDefault();
                const diff = event.clientY - startY;
                if (startY === e.target.offsetTop) {
                    startY = event.clientY;
                    return;
                }
                const size = (document.body.scrollHeight - document.body.offsetHeight) / (document.body.offsetHeight - 80);
                const scrollTopOff = diff * size + document.body.scrollTop;
                document.body.scrollTop = scrollTopOff;
                startY = event.clientY;
            }
        };

        document.body.onmouseleave = function (e) {
            if (e.clientX > (document.body.clientWidth + 30)) {
                document.body.onmousemove = null;
            }
        };

        this.thumbDom.onmouseup = function (e) {
            e.stopPropagation();
            e.preventDefault();
            document.body.onmousemove = null;
        };

        document.body.onmouseup = function (e) {
            e.stopPropagation();
            e.preventDefault();
            document.body.onmousemove = null;
        };
    }

    scrollSpecail(e){
        if (!this.thumbDom) {
            return;
        }
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.thumbDom.style.visibility = 'visible';
        this.thumbDom.style.top = `${(e.target.offsetHeight - 80) * (e.target.scrollTop / (e.target.scrollHeight - e.target.offsetHeight))}px`;
        this.timer = setTimeout(() => {
            this.thumbDom.style.visibility = 'hidden';
        }, 100)
    }

    destroyListener() {
        document.body.removeEventListener("scroll", this.scrollSpecail);
        this.trackDom.removeEventListener("mousemove", this.showBarFunc);
    }
}
