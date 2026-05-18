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
