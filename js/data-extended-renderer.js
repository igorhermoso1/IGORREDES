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

        // Si combinamos los dos sets, dividimos visualmente con banner llamativo
        if (coreMods.length > 0 && extMods.length > 0) {
            container.innerHTML = `
                <div class="modules-category-banner">
                    <h4>✨ Esta categoría tiene módulos ampliados nuevos</h4>
                    <p>${coreMods.length} del temario base + <strong>${extMods.length} nuevos ampliados</strong> con teoría profunda, vídeos curados y libros de referencia.</p>
                </div>
                <div style="margin-bottom: 24px;">
                    <h3 style="color: var(--azul-oscuro); border-bottom: 2px solid var(--azul-medio); padding-bottom: 6px; margin-bottom: 14px;">
                        🧠 Temario base (${coreMods.length})
                    </h3>
                    <div class="modules-grid">${coreMods.map(m => renderModuleCard(m)).join('')}</div>
                </div>
                <div>
                    <h3 style="color: var(--azul-oscuro); border-bottom: 2px solid var(--azul-medio); padding-bottom: 6px; margin-bottom: 14px;">
                        ✨ Módulos ampliados (${extMods.length})
                    </h3>
                    <div class="modules-grid">${extMods.map(m => renderModuleCard(m)).join('')}</div>
                </div>
            `;
        } else if (extMods.length > 0) {
            // Solo extendidos
            container.innerHTML = `
                <div class="modules-category-banner">
                    <h4>✨ ${extMods.length} módulos nuevos ampliados</h4>
                    <p>Teoría profunda, vídeos curados de YouTube y libros de referencia profesionales.</p>
                </div>
                <div class="modules-grid">${extMods.map(m => renderModuleCard(m)).join('')}</div>
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

    // Separar secciones por tipo
    const theorySections = sections.filter(s => !s.title.includes('🎥') && !s.title.includes('📚'));
    const videoSection = sections.find(s => s.title.includes('🎥'));
    const bookSection = sections.find(s => s.title.includes('📚'));

    // Construir cada bloque por separado
    const theoryHtml = theorySections.map((sec, i) => `
        <div class="module-section module-section-theory">
            <div class="section-step-badge">Tema ${i + 1} de ${theorySections.length}</div>
            <h3>${sec.title}</h3>
            ${sec.content}
        </div>
    `).join('');

    let videosHtml = '';
    if (videoSection) {
        const videos = (typeof EXTENDED_VIDEOS !== 'undefined') ? (EXTENDED_VIDEOS[moduleId] || []) : [];
        videosHtml = `
            <div class="module-section module-section-full">
                <h3>${videoSection.title}</h3>
                <p style="margin-bottom:14px;">Selección curada de vídeos en YouTube. Pulsa para abrir resultados actualizados:</p>
                ${renderVideoGrid(videos)}
            </div>
        `;
    }

    let booksHtml = '';
    if (bookSection) {
        const books = (typeof EXTENDED_BOOKS !== 'undefined') ? (EXTENDED_BOOKS[moduleId] || []) : [];
        booksHtml = `
            <div class="module-section module-section-full">
                <h3>${bookSection.title}</h3>
                <p style="margin-bottom:14px;">Recursos profesionales y académicos:</p>
                ${renderBookList(books)}
            </div>
        `;
    }

    // Módulos relacionados (misma categoría)
    const related = (typeof EXTENDED_MODULES !== 'undefined')
        ? EXTENDED_MODULES.filter(x => x.category === m.category && x.id !== moduleId).slice(0, 4)
        : [];
    const relatedHtml = related.length > 0 ? `
        <div class="module-section module-section-full" style="background: var(--blanco-azulado);">
            <h3>🔗 Otros módulos de la misma categoría</h3>
            <div class="related-modules-grid">
                ${related.map(r => `
                    <div class="related-module-card" onclick="openModule('${r.id}')">
                        <div class="related-module-icon">${r.icon}</div>
                        <div class="related-module-info">
                            <div class="related-module-title">${escapeForHtml(r.title)}</div>
                            <div class="related-module-subtitle">${escapeForHtml(r.subtitle)}</div>
                        </div>
                        <div class="related-module-arrow">→</div>
                    </div>
                `).join('')}
            </div>
        </div>
    ` : '';

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

        <!-- TUTORIAL / NAVEGACIÓN INTERNA -->
        <div class="module-tutorial-panel">
            <div class="tutorial-step" onclick="document.querySelector('.module-section-theory')?.scrollIntoView({behavior:'smooth', block:'start'})">
                <div class="tutorial-step-num">1</div>
                <div class="tutorial-step-content">
                    <div class="tutorial-step-title">📖 Leer teoría</div>
                    <div class="tutorial-step-desc">${theorySections.length} temas</div>
                </div>
            </div>
            <div class="tutorial-step" onclick="document.querySelectorAll('.module-section-full')[0]?.scrollIntoView({behavior:'smooth', block:'start'})">
                <div class="tutorial-step-num">2</div>
                <div class="tutorial-step-content">
                    <div class="tutorial-step-title">🎥 Ver vídeos</div>
                    <div class="tutorial-step-desc">${(EXTENDED_VIDEOS[moduleId] || []).length} vídeos curados</div>
                </div>
            </div>
            <div class="tutorial-step" onclick="document.querySelectorAll('.module-section-full')[1]?.scrollIntoView({behavior:'smooth', block:'start'})">
                <div class="tutorial-step-num">3</div>
                <div class="tutorial-step-content">
                    <div class="tutorial-step-title">📚 Profundizar</div>
                    <div class="tutorial-step-desc">${(EXTENDED_BOOKS[moduleId] || []).length} libros</div>
                </div>
            </div>
            <div class="tutorial-step tutorial-step-complete" onclick="markExtendedModuleComplete('${moduleId}')">
                <div class="tutorial-step-num">✓</div>
                <div class="tutorial-step-content">
                    <div class="tutorial-step-title">✅ Completar</div>
                    <div class="tutorial-step-desc">+50 XP</div>
                </div>
            </div>
        </div>

        <!-- TEORÍA EN GRID HORIZONTAL -->
        <h2 class="section-title" style="margin-top:32px; font-size:1.5em;">📖 Teoría del módulo</h2>
        <div class="module-theory-grid">
            ${theoryHtml}
        </div>

        <!-- VÍDEOS -->
        ${videosHtml}

        <!-- LIBROS -->
        ${booksHtml}

        <!-- MÓDULOS RELACIONADOS -->
        ${relatedHtml}

        <!-- BOTÓN FINAL -->
        <div style="margin-top: 32px; padding: 28px; background: linear-gradient(135deg, var(--blanco-azulado), white); border-radius: 16px; border: 2px solid var(--borde); text-align:center; box-shadow: 0 4px 14px var(--sombra-azul);">
            <p style="margin: 0 0 14px; font-weight: 700; color: var(--azul-oscuro); font-size: 1.15em;">¿Has terminado este módulo?</p>
            <button class="btn btn-primary btn-large" onclick="markExtendedModuleComplete('${moduleId}')">
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
