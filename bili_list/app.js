// const host ='play4fun.pythonanywhere.com'
const host = '127.0.0.1:5000' //http://127.0.0.1:5000/ytbl/bili_dynamic_list
const API = 'http://' + host + '/ytbl/bili_dynamic_list';

function toast(msg, ok = true) {
    const el = document.createElement('div');
    el.className = 'toast ' + (ok ? 'toast-ok' : 'toast-err');
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2200);
}

function proxyUrl(imgUrl) {
    if (!imgUrl) return '';
    return 'http://' + host + '/ytbl/bili_proxy_images?img_url=' + encodeURIComponent(imgUrl);
}

function renderList(data) {
    const list = document.getElementById('list');
    if (!data || !data.length) {
        list.innerHTML = '<div class="empty">暂无动态</div>';
        return;
    }
    list.innerHTML = data.map(item => {
        const author = item.modules?.module_author;
        const archive = item.modules?.module_dynamic?.major?.archive;
        const stat = item.modules?.module_stat;
        if (!author || !archive) return '';
        return `<div class="item">
            <div class="author">
                <img class="avatar" src="${proxyUrl(author.face)}" alt="${author.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 40 40\'%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'18\' fill=\'%23e0e0e0\'/%3E%3Ctext x=\'20\' y=\'25\' text-anchor=\'middle\' font-size=\'16\' fill=\'%23999\'%3E\u4EBA%3C/text%3E%3C/svg%3E'">
                <div class="info">
                    <div class="name">${author.name}</div>
                    <div class="time">${author.pub_action || ''} · ${author.pub_time}</div>
                </div>
            </div>
            <a class="content" href="https:${archive.jump_url}" target="_blank" rel="noopener">
                <img class="cover" src="${proxyUrl(archive.cover)}" loading="lazy" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 160 90\'%3E%3Crect width=\'160\' height=\'90\' fill=\'%23f0f0f0\'/%3E%3Ctext x=\'80\' y=\'50\' text-anchor=\'middle\' font-size=\'12\' fill=\'%23ccc\'%3E\u89C6\u9891\u5C01\u9762%3C/text%3E%3C/svg%3E'">
                <div class="video-info">
                    <div class="title">${archive.title}</div>
                    <div class="desc">${archive.desc}</div>
                    <div class="meta">
                        <div class="stat">播放 ${archive.stat?.play || 0}</div>
                        <div class="stat">弹幕 ${archive.stat?.danmaku || 0}</div>
                        ${stat?.comment && `<div class="stat">评论 ${stat.comment.count}</div>`}
                        ${stat?.like && `<div class="stat">点赞 ${stat.like.count}</div>`}
                    </div>
                </div>
            </a>
        </div>`;
    }).join('');
}

async function fetchDynamic() {
    try {
        const res = await fetch(API);
        const json = await res.json();
        renderList(json.data || []);
    } catch (e) {
        toast('获取动态失败: ' + e.message, false);
    }
}

document.getElementById('btnRefresh').addEventListener('click', fetchDynamic);

fetchDynamic();
