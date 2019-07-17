const util = {
    iframeDownload(src) {
        const frame = document.querySelector('#iframeDownload');
        if (frame) {
            frame.src = src;
            return;
        }
        const body = document.querySelector('body');
        const wrap = document.createElement('div');
        wrap.innerHTML = `<iframe src="${src}" height="0" id="iframeDownload"></iframe>`;
        body.appendChild(wrap);
        setTimeout(()=>{
            body.removeChild(wrap);
        },10000);
    }
}

export default util;