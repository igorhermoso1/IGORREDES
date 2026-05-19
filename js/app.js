/* ============================================
   APP.JS - Orquestador principal v2
   ============================================ */

const PAGES = [
    'home', 'modules', 'module-detail', 'simulator', 'subnetting',
    'lab', 'progress', 'rewards', 'flashcards'
];

let currentPage = 'home';
let currentCategory = null;

function showPage(pageName, category = null) {
    if (!PAGES.includes(pageName)) {
        console.warn('Página no encontrada:', pageName);
        return;
    }
    currentPage = pageName;
    currentCategory = category;

    // Ocultar todas
    PAGES.forEach(p => {
        const el = document.getElementById('page-' + p);
        if (el) el.style.display = 'none';
    });

    // Mostrar la actual
    const target = document.getElementById('page-' + pageName);
    if (target) target.style.display = 'block';

    // Actualizar nav links
    document.querySelectorAll('.sidebar-nav-link').forEach(link => {
        link.classList.remove('active');
        const linkPage = link.dataset.page;
        const linkCat = link.dataset.cat || null;
        const isPageMatch = linkPage === pageName ||
            (pageName === 'module-detail' && linkPage === 'modules' && !category);
        if (isPageMatch && linkCat === category) {
            link.classList.add('active');
        } else if (isPageMatch && !linkCat && !category) {
            link.classList.add('active');
        }
    });

    // Cerrar sidebar móvil tras navegar
    closeSidebarMobile();

    // Inicializar contenido
    try {
        if (pageName === 'home') {
            renderHomeFeatured();
            renderHomeDashboard();
            renderContinueSection();
        } else if (pageName === 'modules') {
            renderAllModules(category);
        } else if (pageName === 'simulator') {
            renderSimulator();
            if (typeof maybeShowTutorial === 'function') maybeShowTutorial('simulator');
        } else if (pageName === 'subnetting') {
            renderSubnettingPage();
            if (typeof maybeShowTutorial === 'function') maybeShowTutorial('subnetting');
        } else if (pageName === 'lab') {
            renderLabPage();
        } else if (pageName === 'progress') {
            renderProgressPage();
        } else if (pageName === 'rewards') {
            renderRewardsPage();
        } else if (pageName === 'flashcards') {
            renderFlashcardsPage();
        }
    } catch (e) {
        console.error('Error renderizando página:', e);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== SIDEBAR MÓVIL =====

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
}

function closeSidebarMobile() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
}

// ===== DASHBOARD HOME =====

function renderHomeDashboard() {
    const level = getCurrentLevel();
    const accuracy = userProgress.totalExercises > 0
        ? Math.round((userProgress.correctExercises / userProgress.totalExercises) * 100)
        : 0;

    const xpEl = document.getElementById('homeXP');
    const lvlEl = document.getElementById('homeLevel');
    const exEl = document.getElementById('homeExercises');
    const accEl = document.getElementById('homeAccuracy');

    if (xpEl) xpEl.textContent = userProgress.xp;
    if (lvlEl) lvlEl.textContent = level.name;
    if (exEl) exEl.textContent = userProgress.totalExercises;
    if (accEl) accEl.textContent = userProgress.totalExercises > 0 ? accuracy + '%' : '—';
}

function renderContinueSection() {
    const container = document.getElementById('continueSection');
    if (!container) return;

    // Encuentra el módulo más avanzado pero no completado
    let bestModule = null;
    let bestProgress = 0;
    MODULES.forEach(m => {
        const p = getModuleProgress(m.id);
        if (p > 0 && p < 100 && p > bestProgress) {
            bestProgress = p;
            bestModule = m;
        }
    });

    if (!bestModule) {
        container.innerHTML = '';
        return;
    }

    container.innerHTML = `
        <div class="continue-card" onclick="openModule('${bestModule.id}')">
            <div class="continue-card-icon">${bestModule.icon}</div>
            <div class="continue-card-info">
                <div class="continue-card-label">Continúa donde lo dejaste</div>
                <div class="continue-card-title">${bestModule.title}</div>
                <div class="continue-card-progress">
                    <div class="continue-card-progress-fill" style="width:${bestProgress}%"></div>
                </div>
                <div style="margin-top:6px; font-size:0.85em; color:var(--texto-secundario); font-weight:700;">
                    ${bestProgress}% completado
                </div>
            </div>
            <div class="continue-card-arrow">→</div>
        </div>
    `;
}

// ===== PÁGINA RECOMPENSAS =====

function renderRewardsPage() {
    const container = document.getElementById('rewardsContent');
    if (!container) return;
    container.innerHTML = `
        <div class="info-box" style="margin-bottom:24px;">
            <strong>🎁 ¿Cómo funciona?</strong> Acumula puntos XP completando ejercicios y módulos. Cada recompensa se desbloquea automáticamente al alcanzar el XP indicado.
        </div>
        <div class="rewards-grid">
            ${REWARDS.map(r => {
                const unlocked = userProgress.unlockedRewards.includes(r.id);
                const progress = Math.min(100, Math.round((userProgress.xp / r.xp) * 100));
                return `
                    <div class="reward-card ${unlocked ? 'unlocked' : 'locked'}">
                        <div class="reward-icon">${r.icon}</div>
                        <div class="reward-title">${r.title}</div>
                        <div class="reward-desc">${r.desc}</div>
                        <div class="reward-status">
                            ${unlocked ? '✅ Desbloqueada' : `🔒 ${userProgress.xp}/${r.xp} XP`}
                        </div>
                        ${!unlocked ? `
                            <div style="margin-top:10px; height:6px; background:rgba(0,0,0,0.07); border-radius:6px; overflow:hidden;">
                                <div style="height:100%; background:linear-gradient(90deg, var(--azul-medio), var(--turquesa)); width:${progress}%; border-radius:6px;"></div>
                            </div>
                        ` : ''}
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

// ===== MAPEO DE CATEGORÍAS PARA SIDEBAR =====

const MODULE_CATEGORIES = {
    'basico': ['intro', 'tipos-redes', 'modelos'],
    'diseno': ['topologias', 'diseno'],
    'fisico': ['cableado', 'dispositivos'],
    'ip': ['ip', 'binario'],
    'wireless': ['wifi'],
    'avanzado': ['vlans', 'servicios'],
    'practico': ['troubleshooting']
};

const CATEGORY_TITLES = {
    'basico': { title: '🧱 Módulos básicos', subtitle: 'Los fundamentos sobre los que se construye todo lo demás.' },
    'diseno': { title: '🎯 Diseño de red', subtitle: 'Topologías y cómo se planifica una red real.' },
    'fisico': { title: '🔌 Capa física', subtitle: 'Cableado, conectores y dispositivos físicos.' },
    'ip': { title: '📍 IP y direccionamiento', subtitle: 'Cómo se identifican los dispositivos en la red.' },
    'wireless': { title: '📶 Redes inalámbricas', subtitle: 'WiFi, antenas, bandas y seguridad inalámbrica.' },
    'avanzado': { title: '⚙️ VLAN y avanzado', subtitle: 'Segmentación, servicios y protocolos avanzados.' },
    'practico': { title: '🛠 Práctica', subtitle: 'Troubleshooting y diagnóstico de problemas reales.' }
};

// Override renderAllModules para soportar categorías
function renderAllModules(category = null) {
    const container = document.getElementById('allModules');
    const titleEl = document.getElementById('modulesTitle');
    const subEl = document.getElementById('modulesSubtitle');
    if (!container) return;

    let mods = MODULES;
    if (category && MODULE_CATEGORIES[category]) {
        const ids = MODULE_CATEGORIES[category];
        mods = MODULES.filter(m => ids.includes(m.id));
        if (titleEl && CATEGORY_TITLES[category]) {
            titleEl.textContent = CATEGORY_TITLES[category].title;
            subEl.textContent = CATEGORY_TITLES[category].subtitle;
        }
    } else {
        if (titleEl) {
            titleEl.textContent = '📚 Todos los módulos';
            subEl.textContent = 'Recorre los bloques temáticos a tu ritmo. Cada módulo combina teoría + ejercicios.';
        }
    }

    container.innerHTML = mods.map(m => renderModuleCard(m)).join('');
}

// ===== INICIALIZACIÓN =====

document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    showPage('home');

    if (userProgress.xp === 0 && userProgress.totalExercises === 0) {
        setTimeout(() => {
            showNotification('🌊', '¡Bienvenido a REDACADEMIA!', 'Empieza tu aventura: dale a un módulo y a por XP.');
        }, 800);
    } else if (userProgress.xp > 0) {
        setTimeout(() => {
            const level = getCurrentLevel();
            showNotification(level.icon, `Hola de nuevo, ${level.name}`, `Vas con ${userProgress.xp} XP. ¡A por más!`);
        }, 600);
    }

    // Esc cierra modales
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePingModal();
            closeSaveModal();
            closeSidebarMobile();
        }
    });
});
