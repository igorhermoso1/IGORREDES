/* ============================================
   CONTENT.JS - Renderizado de módulos y home
   ============================================ */

function renderHomeFeatured() {
    const container = document.getElementById('featuredModules');
    if (!container) return;
    const featured = MODULES.filter(m => m.featured);
    container.innerHTML = featured.map(m => renderModuleCard(m)).join('');
}

function renderAllModules() {
    const container = document.getElementById('allModules');
    if (!container) return;
    container.innerHTML = MODULES.map(m => renderModuleCard(m)).join('');
}

function renderModuleCard(m) {
    const progress = getModuleProgress(m.id);
    const stars = '⭐'.repeat(m.difficulty || 1);
    return `
        <div class="module-card" onclick="openModule('${m.id}')">
            <div class="module-icon">${m.icon}</div>
            <div class="module-title">${m.title}</div>
            <div class="module-desc">${m.desc}</div>
            <div class="module-meta">
                <div class="module-progress">
                    <div class="module-progress-bar" style="width:${progress}%"></div>
                </div>
                <div class="module-tag">${m.tag}</div>
            </div>
            <div style="margin-top:10px; font-size:0.85em; color:var(--texto-suave);">
                Dificultad: ${stars} &nbsp;·&nbsp; ${progress}% completado
            </div>
        </div>
    `;
}

function openModule(moduleId) {
    const module = MODULES.find(m => m.id === moduleId);
    if (!module) return;
    showPage('module-detail');
    renderModuleDetail(moduleId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderModuleDetail(moduleId) {
    const module = MODULES.find(m => m.id === moduleId);
    const content = MODULE_CONTENT[moduleId];
    const container = document.getElementById('moduleDetailContent');
    if (!container || !module) return;

    if (!content) {
        container.innerHTML = `
            <div class="module-detail-header">
                <div class="module-detail-icon">${module.icon}</div>
                <div class="module-detail-title">${module.title}</div>
                <div class="module-detail-subtitle">${module.desc}</div>
            </div>
            <div class="lesson-section">
                <p>📚 Este módulo está en construcción. Vuelve pronto.</p>
            </div>
        `;
        return;
    }

    const sectionsHtml = content.sections.map((sec, idx) => `
        <div class="lesson-section">
            <h3 class="lesson-section-title">
                <span class="lesson-section-icon">${sec.icon || '📖'}</span>
                <span>${sec.title}</span>
            </h3>
            <div class="lesson-content">${sec.content}</div>
        </div>
    `).join('');

    const exercises = (typeof EXERCISES !== 'undefined' && EXERCISES[moduleId]) || [];
    const progress = getModuleProgress(moduleId);

    container.innerHTML = `
        <div class="module-detail-header">
            <div class="module-detail-icon">${module.icon}</div>
            <div class="module-detail-title">${content.title}</div>
            <div class="module-detail-subtitle">${content.subtitle}</div>
            <div style="margin-top: 28px; max-width:400px; margin-left:auto; margin-right:auto;">
                <div class="progress-bar-large" style="background:rgba(255,255,255,0.3);">
                    <div class="progress-bar-large-fill" style="width:${progress}%; background:white;"></div>
                </div>
                <p style="margin-top:10px; font-size:0.95em; opacity:0.95;">
                    ${progress}% completado
                </p>
            </div>
        </div>

        ${sectionsHtml}

        ${exercises.length > 0 ? `
            <div class="exercises-section">
                <h3 class="section-title" style="margin-top:0; font-size:1.8em;">🎯 Ejercicios del módulo</h3>
                <p class="section-subtitle">Pon a prueba lo aprendido. Cada acierto te da XP.</p>
                <div id="exercises-${moduleId}"></div>
            </div>
        ` : ''}
    `;

    if (exercises.length > 0 && typeof renderExercises === 'function') {
        renderExercises(moduleId);
    }
}

// ============================================
// REPRODUCTOR DE VÍDEOS YOUTUBE EMBEBIDO
// ============================================
function openVideo(videoId, title) {
    let overlay = document.getElementById('videoPlayerOverlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'videoPlayerOverlay';
        overlay.className = 'video-player-overlay';
        overlay.innerHTML = `
            <div class="video-player-container">
                <button class="video-player-close" onclick="closeVideo()" title="Cerrar (Esc)">✕</button>
                <iframe id="videoPlayerFrame" allowfullscreen
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
            </div>
        `;
        overlay.onclick = (e) => { if (e.target === overlay) closeVideo(); };
        document.body.appendChild(overlay);
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeVideo(); });
    }
    const frame = document.getElementById('videoPlayerFrame');
    frame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    overlay.classList.add('active');
    if (typeof addXP === 'function') addXP(5, `Vídeo visto: ${title}`);
}

function closeVideo() {
    const overlay = document.getElementById('videoPlayerOverlay');
    const frame = document.getElementById('videoPlayerFrame');
    if (frame) frame.src = '';
    if (overlay) overlay.classList.remove('active');
}

// Helper para renderizar grids de vídeos a partir de datos
function renderVideoGrid(videos) {
    if (!videos || videos.length === 0) return '';
    return `<div class="video-grid">${videos.map(v => {
        // Modo 1: id de YouTube confirmado → embed click-y-ver
        if (v.id) {
            return `
                <div class="video-card" onclick="openVideo('${v.id}', '${escapeForJsAttr(v.title)}')">
                    <div class="video-thumb">
                        <img src="https://img.youtube.com/vi/${v.id}/mqdefault.jpg" alt="${escapeForHtml(v.title)}"
                             onerror="this.style.display='none'">
                    </div>
                    <div class="video-info">
                        <div class="video-title">${escapeForHtml(v.title)}</div>
                        <div class="video-channel">${escapeForHtml(v.channel || '')}</div>
                        ${v.duration ? `<span class="video-duration">⏱️ ${v.duration}</span>` : ''}
                    </div>
                </div>
            `;
        }
        // Modo 2: búsqueda curada en YouTube → abre lista de resultados
        const query = encodeURIComponent(v.search || v.title || '');
        const searchUrl = `https://www.youtube.com/results?search_query=${query}`;
        return `
            <a class="video-card video-card-search" href="${searchUrl}" target="_blank" rel="noopener" onclick="addXP(2, 'Búsqueda de vídeo abierta')">
                <div class="video-thumb video-thumb-search">
                    <div class="video-thumb-search-icon">🔎</div>
                    <div class="video-thumb-search-label">Buscar en YouTube</div>
                </div>
                <div class="video-info">
                    <div class="video-title">${escapeForHtml(v.title)}</div>
                    <div class="video-channel">${escapeForHtml(v.channel || 'Resultados actualizados')}</div>
                    ${v.duration ? `<span class="video-duration">⏱️ ${v.duration}</span>` : ''}
                </div>
            </a>
        `;
    }).join('')}</div>`;
}

function renderBookList(books) {
    if (!books || books.length === 0) return '';
    return `<div class="book-list">${books.map(b => `
        <div class="book-card">
            <div class="book-title">📖 ${escapeForHtml(b.title)}</div>
            <div class="book-author">${escapeForHtml(b.author || '')}</div>
            <div class="book-desc">${escapeForHtml(b.desc || '')}</div>
            ${b.url ? `<a href="${b.url}" target="_blank" rel="noopener" class="book-link">📥 Abrir / Descargar</a>` : ''}
            ${b.license ? `<span style="font-size:0.75em; color:var(--texto-suave); margin-left:8px;">${b.license}</span>` : ''}
        </div>
    `).join('')}</div>`;
}

function renderToolGrid(tools) {
    if (!tools || tools.length === 0) return '';
    return `<div class="tool-grid">${tools.map(t => `
        <div class="tool-card">
            <div class="tool-name">${t.icon || '🛠️'} ${escapeForHtml(t.name)}</div>
            <div class="tool-desc">${escapeForHtml(t.desc)}</div>
        </div>
    `).join('')}</div>`;
}

function escapeForHtml(s) {
    if (s === null || s === undefined) return '';
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function escapeForJsAttr(s) {
    if (s === null || s === undefined) return '';
    return String(s).replace(/'/g, "\\'").replace(/"/g, '\\"');
}
