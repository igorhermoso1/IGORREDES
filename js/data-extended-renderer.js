/* ============================================
   DATA-EXTENDED-RENDERER.JS
   Integra los módulos extendidos con la app existente.
   No modifica funciones originales: las extiende.
   Carga DESPUÉS de content.js y data-extended-*.js
   ============================================ */

(function() {

// ---------------------------------------------------------------
// 1. Catálogo unificado de módulos y categorías
// ---------------------------------------------------------------
function getAllModulesList() {
    const base = (typeof MODULES !== 'undefined') ? MODULES : [];
    const extra = (typeof EXTENDED_MODULES !== 'undefined') ? EXTENDED_MODULES : [];
    // Normalizamos los EXTENDED_MODULES al formato de tarjeta clásica
    const extraNormalized = extra.map(m => ({
        id: m.id,
        icon: m.icon,
        title: m.title,
        desc: m.subtitle,
        tag: m.level,
        difficulty: m.level === 'avanzado' ? 3 : (m.level === 'intermedio' ? 2 : 1),
        category: m.category,
        extended: true,        // bandera para diferenciar
        duration: m.duration
    }));
    return base.concat(extraNormalized);
}

function findModule(moduleId) {
    return getAllModulesList().find(m => m.id === moduleId);
}

window.findModule = findModule;
window.getAllModulesList = getAllModulesList;

// ---------------------------------------------------------------
// 2. Re-renderizado del home y de la lista de módulos
// ---------------------------------------------------------------
const originalRenderAll = window.renderAllModules;

window.renderAllModules = function(category) {
    const container = document.getElementById('allModules');
    const titleEl = document.getElementById('modulesTitle');
    const subEl = document.getElementById('modulesSubtitle');
    if (!container) return;

    // Mapa entre categorías del core y categorías extendidas que comparten temática
    const categoryBridge = {
        'diseno': 'diseno',
        'fisico': 'capa-fisica',
        'wireless': 'inalambricas'
    };

    if (category) {
        // Modo filtrado por categoría: combinar originales + extendidos cuando comparten tema
        const coreIds = (typeof MODULE_CATEGORIES !== 'undefined' && MODULE_CATEGORIES[category])
            ? MODULE_CATEGORIES[category]
            : [];
        const coreMods = MODULES.filter(m => coreIds.includes(m.id));

        const extCatId = categoryBridge[category] || category;
        const extMods = (typeof EXTENDED_MODULES !== 'undefined')
            ? EXTENDED_MODULES.filter(m => m.category === extCatId).map(m => ({
                id: m.id, icon: m.icon, title: m.title, desc: m.subtitle,
                tag: m.level, difficulty: m.level === 'avanzado' ? 3 : (m.level === 'intermedio' ? 2 : 1),
                category: m.category, extended: true, duration: m.duration
            }))
            : [];

        const allMods = coreMods.concat(extMods);
        if (allMods.length === 0) {
            container.innerHTML = '<p style="text-align:center; color: var(--texto-suave); padding: 40px;">No hay módulos en esta categoría todavía.</p>';
            return;
        }

        // Título: usar el del core si existe, si no el de extendidas
        if (titleEl) {
            if (typeof CATEGORY_TITLES !== 'undefined' && CATEGORY_TITLES[category]) {
                titleEl.textContent = CATEGORY_TITLES[category].title;
                subEl.textContent = CATEGORY_TITLES[category].subtitle;
            } else if (typeof EXTENDED_CATEGORIES !== 'undefined' && EXTENDED_CATEGORIES[category]) {
                titleEl.textContent = EXTENDED_CATEGORIES[category].label;
                subEl.textContent = EXTENDED_CATEGORIES[category].desc;
            }
        }

        // Si combinamos los dos sets, dividimos visualmente
        if (coreMods.length > 0 && extMods.length > 0) {
            container.innerHTML = `
                <div style="margin-bottom: 24px;">
                    <h3 style="color: var(--azul-oscuro); border-bottom: 2px solid var(--azul-medio); padding-bottom: 6px; margin-bottom: 14px;">
                        🧠 Temario base
                    </h3>
                    <div class="modules-grid">${coreMods.map(m => renderModuleCard(m)).join('')}</div>
                </div>
                <div>
                    <h3 style="color: var(--azul-oscuro); border-bottom: 2px solid var(--azul-medio); padding-bottom: 6px; margin-bottom: 14px;">
                        📚 Módulos ampliados
                    </h3>
                    <div class="modules-grid">${extMods.map(m => renderModuleCard(m)).join('')}</div>
                </div>
            `;
        } else {
            container.innerHTML = `<div class="modules-grid">${allMods.map(m => renderModuleCard(m)).join('')}</div>`;
        }
        return;
    }

    // Sin categoría: vista global agrupada por bloques temáticos.
    if (titleEl) {
        titleEl.textContent = '📚 Todos los módulos';
        subEl.textContent = '34 módulos: 18 del temario base + 16 ampliados con teoría profunda, vídeos y libros.';
    }

    const all = getAllModulesList();
    const categoriesOrder = [
        { id: '__core__', label: '🧠 Fundamentos y diagnóstico', filter: m => !m.extended },
        { id: 'capa-fisica', label: '🔌 Capa física' },
        { id: 'diseno', label: '🏗️ Diseño de red' },
        { id: 'seguridad', label: '🛡️ Seguridad' },
        { id: 'cloud-moderno', label: '☁️ Cloud y moderno' },
        { id: 'inalambricas', label: '📶 Inalámbricas' }
    ];

    let html = '';
    categoriesOrder.forEach(cat => {
        const items = cat.filter
            ? all.filter(cat.filter)
            : all.filter(m => m.category === cat.id);
        if (items.length === 0) return;
        html += `
            <div class="category-block" style="margin-bottom: 36px;">
                <h2 class="category-title" style="color: var(--azul-oscuro); border-bottom: 3px solid var(--azul-medio); padding-bottom: 8px; margin-bottom: 16px;">
                    ${cat.label}
                    <span style="font-size: 0.6em; color: var(--texto-suave); font-weight: 500;">${items.length} módulos</span>
                </h2>
                <div class="modules-grid">
                    ${items.map(m => renderModuleCard(m)).join('')}
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
};

// ---------------------------------------------------------------
// 3. openModule: redirige a renderExtendedDetail si es extendido
// ---------------------------------------------------------------
const originalOpenModule = window.openModule;

window.openModule = function(moduleId) {
    const m = findModule(moduleId);
    if (!m) return;
    if (m.extended) {
        showPage('module-detail');
        renderExtendedModule(moduleId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    return originalOpenModule.call(this, moduleId);
};

// ---------------------------------------------------------------
// 4. Renderer de módulo extendido
// ---------------------------------------------------------------
function renderExtendedModule(moduleId) {
    const m = (typeof EXTENDED_MODULES !== 'undefined')
        ? EXTENDED_MODULES.find(x => x.id === moduleId)
        : null;
    const sections = (typeof EXTENDED_CONTENT !== 'undefined')
        ? EXTENDED_CONTENT[moduleId]
        : null;

    const container = document.getElementById('moduleDetailContent');
    if (!container || !m) return;

    if (!sections) {
        container.innerHTML = `
            <div class="module-detail-header">
                <div class="module-detail-icon">${m.icon}</div>
                <div class="module-detail-title">${m.title}</div>
                <div class="module-detail-subtitle">${m.subtitle}</div>
            </div>
            <div class="lesson-section">
                <p>📚 Este módulo está en construcción. Vuelve pronto.</p>
            </div>
        `;
        return;
    }

    const progress = (typeof getModuleProgress === 'function') ? getModuleProgress(moduleId) : 0;

    // Renderizamos cada sección, inyectando vídeos y libros donde toca
    const sectionsHtml = sections.map(sec => {
        let body = sec.content;

        // Detección por título (la convención que adoptamos)
        if (sec.title.includes('🎥 Vídeos')) {
            const videos = (typeof EXTENDED_VIDEOS !== 'undefined') ? (EXTENDED_VIDEOS[moduleId] || []) : [];
            body = `
                <p style="margin-bottom:14px;">Selección curada de vídeos de YouTube. Pulsa sobre la miniatura para abrir el reproductor:</p>
                ${renderVideoGrid(videos)}
            `;
        } else if (sec.title.includes('📚 Libros')) {
            const books = (typeof EXTENDED_BOOKS !== 'undefined') ? (EXTENDED_BOOKS[moduleId] || []) : [];
            body = `
                <p style="margin-bottom:14px;">Recursos profesionales y académicos. La mayoría son libres o de licencia abierta:</p>
                ${renderBookList(books)}
            `;
        }

        return `
            <div class="module-section">
                <h3>${sec.title}</h3>
                ${body}
            </div>
        `;
    }).join('');

    // Categoría humana
    const catLabel = (typeof EXTENDED_CATEGORIES !== 'undefined' && EXTENDED_CATEGORIES[m.category])
        ? EXTENDED_CATEGORIES[m.category].label
        : '';

    container.innerHTML = `
        <div class="module-detail-header">
            <div class="module-detail-icon">${m.icon}</div>
            <div class="module-detail-title">${m.title}</div>
            <div class="module-detail-subtitle">${m.subtitle}</div>
            <div style="display:flex; gap:14px; justify-content:center; margin-top:12px; flex-wrap:wrap;">
                <span style="background:rgba(255,255,255,0.25); padding:6px 14px; border-radius:20px; color:white; font-size:0.88em;">
                    ${catLabel}
                </span>
                <span style="background:rgba(255,255,255,0.25); padding:6px 14px; border-radius:20px; color:white; font-size:0.88em;">
                    📊 Nivel: ${m.level}
                </span>
                <span style="background:rgba(255,255,255,0.25); padding:6px 14px; border-radius:20px; color:white; font-size:0.88em;">
                    ⏱️ ${m.duration}
                </span>
            </div>
            <div style="margin-top: 22px; max-width:400px; margin-left:auto; margin-right:auto;">
                <div class="progress-bar-large" style="background:rgba(255,255,255,0.3);">
                    <div class="progress-bar-large-fill" style="width:${progress}%; background:white;"></div>
                </div>
                <p style="margin-top:10px; font-size:0.95em; opacity:0.95;">
                    ${progress}% completado
                </p>
            </div>
        </div>

        ${sectionsHtml}

        <div style="margin-top: 32px; padding: 20px; background: var(--blanco-azulado); border-radius: 14px; border: 2px solid var(--borde); text-align:center;">
            <p style="margin: 0 0 12px; font-weight: 700; color: var(--azul-oscuro);">¿Has terminado este módulo?</p>
            <button class="btn btn-primary" onclick="markExtendedModuleComplete('${moduleId}')">
                ✅ Marcar como completado (+50 XP)
            </button>
        </div>
    `;
}

window.renderExtendedModule = renderExtendedModule;

// Marca un módulo extendido como completado
window.markExtendedModuleComplete = function(moduleId) {
    // Escribimos directamente en userProgress (existente en progress.js)
    if (typeof userProgress !== 'undefined') {
        if (!userProgress.completedModules[moduleId]) {
            userProgress.completedModules[moduleId] = true;
            userProgress.moduleProgress[moduleId] = 100;
            if (typeof saveProgress === 'function') saveProgress();
            if (typeof addXP === 'function') {
                const m = findModule(moduleId);
                addXP(50, `Módulo completado: ${m ? m.title : moduleId}`);
            }
            if (typeof updateUI === 'function') updateUI();
            if (typeof showNotification === 'function') {
                showNotification('🎉', '¡Módulo completado!', '+50 XP');
            }
            if (typeof launchConfetti === 'function') launchConfetti();
        } else {
            if (typeof showNotification === 'function') {
                showNotification('✅', 'Ya completado', 'Este módulo ya estaba marcado.');
            }
        }
    }
    // Re-render para que la barra de progreso del módulo se actualice
    renderExtendedModule(moduleId);
};

// ---------------------------------------------------------------
// 5. Featured: añadir uno extendido para destacarlo en home
// ---------------------------------------------------------------
const originalRenderHomeFeatured = window.renderHomeFeatured;

window.renderHomeFeatured = function() {
    const container = document.getElementById('featuredModules');
    if (!container) return;
    const featuredOriginal = (typeof MODULES !== 'undefined') ? MODULES.filter(m => m.featured) : [];
    // Sumamos un par de extendidos destacados
    const extendedFeatured = (typeof EXTENDED_MODULES !== 'undefined')
        ? EXTENDED_MODULES.filter(m => ['cableado-estructurado-pro', 'switch-capa3', 'wifi6-7'].includes(m.id))
        : [];
    const all = getAllModulesList().filter(m =>
        featuredOriginal.some(o => o.id === m.id)
        || extendedFeatured.some(o => o.id === m.id)
    );
    container.innerHTML = all.map(m => renderModuleCard(m)).join('');
};

})();
