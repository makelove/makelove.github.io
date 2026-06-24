const API = 'https://play4fun.pythonanywhere.com/ytbl';

function toast(msg, ok = true) {
    const el = document.createElement('div');
    el.className = 'toast ' + (ok ? 'toast-ok' : 'toast-err');
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2200);
}

function videoId(url) {
    try { return new URL(url).searchParams.get('v'); } catch { return ''; }
}

function thumbUrl(url) {
    const id = videoId(url);
    return id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : '';
}

function renderList(data) {
    const list = document.getElementById('list');
    if (!data.length) {
        list.innerHTML = '<div class="empty">列表为空</div>';
        return;
    }
    list.innerHTML = data.map(item => {
        const thumb = thumbUrl(item.url);
        return `<a class="item" href="${item.url}" target="_blank" rel="noopener">
            ${thumb ? `<img class="thumb" src="${thumb}" loading="lazy">` : '<div class="thumb"></div>'}
            <div class="title">${item.title}</div>
        </a>`;
    }).join('');
}

async function fetchList() {
    try {
        const res = await fetch(API + '/quere_list');
        const json = await res.json();
        renderList(json.data || []);
    } catch (e) {
        toast('获取列表失败: ' + e.message, false);
    }
}

document.getElementById('addForm').addEventListener('submit', async e => {
    e.preventDefault();
    const title = document.getElementById('inputTitle').value.trim();
    const url = document.getElementById('inputUrl').value.trim();
    if (!title || !url) return;
    try {
        const res = await fetch(API + '/quere_add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, url })
        });
        const json = await res.json();
        toast(json.message || '添加成功');
        document.getElementById('inputTitle').value = '';
        document.getElementById('inputUrl').value = '';
        fetchList();
    } catch (e) {
        toast('添加失败: ' + e.message, false);
    }
});

document.getElementById('btnPop').addEventListener('click', async () => {
    try {
        const res = await fetch(API + '/quere_pop');
        const json = await res.json();
        if (json.data) {
            toast(`已取出: ${json.data.title}`);
        } else {
            toast('列表为空', false);
        }
        fetchList();
    } catch (e) {
        toast('取出失败: ' + e.message, false);
    }
});

document.getElementById('btnRefresh').addEventListener('click', fetchList);

fetchList();
