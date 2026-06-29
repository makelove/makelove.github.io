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
    if (!data || Object.keys(data).length === 0) {
        list.innerHTML = '<div class="empty">列表为空</div>';
        return;
    }
    list.innerHTML = Object.entries(data).map(([ytid, item]) => {
        const thumb = thumbUrl(item.url);
        return `<div class="item">
            <a href="${item.url}" target="_blank" rel="noopener" style="flex:1;display:flex;align-items:center;gap:12px;">
                ${thumb ? `<img class="thumb" src="${thumb}" loading="lazy">` : '<div class="thumb"></div>'}
                <div class="title">${item.title}</div>
            </a>
            <button class="btn-delete" data-ytid="${ytid}">删除</button>
        </div>`;
    }).join('');

    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', handleDelete);
    });
}

async function handleDelete(e) {
    e.stopPropagation();
    const btn = e.target;
    const ytid = btn.dataset.ytid;
    if (!ytid) return;
    btn.disabled = true;
    btn.textContent = '删除中...';
    try {
        const res = await fetch(API + '/queue_remove?ytid=' + encodeURIComponent(ytid));
        const json = await res.json();
        if (json.data) {
            toast('删除成功');
        } else {
            toast('删除失败', false);
        }
        fetchList();
    } catch (e) {
        toast('删除失败: ' + e.message, false);
        btn.disabled = false;
        btn.textContent = '删除';
    }
}

async function fetchList() {
    try {
        const res = await fetch(API + '/queue_list');
        const json = await res.json();
        renderList(json.data || {});
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
        const res = await fetch(API + '/queue_add', {
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
        const res = await fetch(API + '/queue_pop');
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
