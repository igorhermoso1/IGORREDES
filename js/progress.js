/* ============================================
   PROGRESS.JS - Sistema de gamificación v2
   ============================================ */

const STORAGE_KEY = 'redacademia_progress_v1';

let userProgress = {
    xp: 0,
    completedExercises: {},
    completedModules: {},
    moduleProgress: {},
    streak: 0,
    lastActivity: null,
    totalExercises: 0,
    correctExercises: 0,
    unlockedRewards: [],
    savedTopologies: [],
    flashcardsSeen: {}
};

function loadProgress() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            userProgress = { ...userProgress, ...parsed };
        }
        // Calcular racha en función de la última actividad
        updateStreak();
    } catch (e) {
        console.warn('No se pudo cargar el progreso:', e);
    }
    updateUI();
}

function saveProgress() {
    try {
        userProgress.lastActivity = Date.now();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userProgress));
    } catch (e) {
        console.warn('No se pudo guardar el progreso:', e);
    }
}

function updateStreak() {
    if (!userProgress.lastActivity) {
        userProgress.streak = 0;
        return;
    }
    const last = new Date(userProgress.lastActivity);
    const today = new Date();
    last.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const diff = Math.floor((today - last) / (1000 * 60 * 60 * 24));
    if (diff > 1) {
        userProgress.streak = 0;
    } else if (diff === 0 && userProgress.streak === 0) {
        userProgress.streak = 1;
    }
}

function incrementStreakIfNeeded() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const last = userProgress.lastActivity ? new Date(userProgress.lastActivity) : null;
    if (last) last.setHours(0, 0, 0, 0);
    if (!last || (today - last) > 0) {
        userProgress.streak = (userProgress.streak || 0) + 1;
    }
}

function addXP(amount, reason = '') {
    const oldLevel = getCurrentLevel();
    userProgress.xp += amount;
    incrementStreakIfNeeded();
    saveProgress();
    updateUI();
    if (reason) showNotification('⭐', `+${amount} XP`, reason);

    const newLevel = getCurrentLevel();
    if (newLevel.name !== oldLevel.name) {
        setTimeout(() => {
            showNotification('🎖️', '¡Nivel desbloqueado!', `Ahora eres ${newLevel.name}`);
            launchConfetti();
        }, 1200);
    }

    REWARDS.forEach(r => {
        if (userProgress.xp >= r.xp && !userProgress.unlockedRewards.includes(r.id)) {
            userProgress.unlockedRewards.push(r.id);
            saveProgress();
            setTimeout(() => {
                showNotification(r.icon, '¡Recompensa desbloqueada!', r.title);
                launchConfetti();
            }, 2200);
        }
    });
}

function getCurrentLevel() {
    let current = LEVELS[0];
    for (const lvl of LEVELS) {
        if (userProgress.xp >= lvl.xp) {
            current = lvl;
        } else {
            break;
        }
    }
    return current;
}

function getCurrentLevelIndex() {
    return LEVELS.indexOf(getCurrentLevel());
}

function getNextLevel() {
    const idx = getCurrentLevelIndex();
    return idx < LEVELS.length - 1 ? LEVELS[idx + 1] : null;
}

function getLevelProgress() {
    const current = getCurrentLevel();
    const next = getNextLevel();
    if (!next) return 100;
    const range = next.xp - current.xp;
    const earned = userProgress.xp - current.xp;
    return Math.min(100, Math.round((earned / range) * 100));
}

function markExerciseCompleted(moduleId, exerciseId, correct) {
    const key = `${moduleId}::${exerciseId}`;
    if (!userProgress.completedExercises[key]) {
        userProgress.completedExercises[key] = { correct, timestamp: Date.now() };
        userProgress.totalExercises++;
        if (correct) userProgress.correctExercises++;
        updateModuleProgress(moduleId);
        saveProgress();
    }
}

function updateModuleProgress(moduleId) {
    const exercises = (typeof EXERCISES !== 'undefined' && EXERCISES[moduleId]) || [];
    if (exercises.length === 0) return;
    const completed = exercises.filter(ex => {
        const key = `${moduleId}::${ex.id}`;
        return userProgress.completedExercises[key];
    }).length;
    const percent = Math.round((completed / exercises.length) * 100);
    userProgress.moduleProgress[moduleId] = percent;
    if (percent === 100 && !userProgress.completedModules[moduleId]) {
        userProgress.completedModules[moduleId] = true;
        addXP(50, `Módulo completado: ${MODULES.find(m => m.id === moduleId)?.title || moduleId}`);
    }
}

function getModuleProgress(moduleId) {
    return userProgress.moduleProgress[moduleId] || 0;
}

function getGlobalProgress() {
    if (MODULES.length === 0) return 0;
    let sum = 0;
    MODULES.forEach(m => {
        sum += getModuleProgress(m.id);
    });
    return Math.round(sum / MODULES.length);
}

function updateUI() {
    // Sidebar stats
    const elXP = document.getElementById('navXP');
    const elLvl = document.getElementById('navLevel');
    const elLvlNum = document.getElementById('navLevelNum');
    const elLvlIcon = document.getElementById('navLevelIcon');
    const elDone = document.getElementById('navDone');
    const elStreak = document.getElementById('navStreak');
    const level = getCurrentLevel();
    const idx = getCurrentLevelIndex();

    if (elXP) elXP.textContent = userProgress.xp;
    if (elLvl) elLvl.textContent = level.name;
    if (elLvlNum) elLvlNum.textContent = idx + 1;
    if (elLvlIcon) elLvlIcon.textContent = level.icon;
    if (elDone) elDone.textContent = userProgress.totalExercises;
    if (elStreak) elStreak.textContent = userProgress.streak || 0;

    // Progreso global
    const gPct = document.getElementById('navGlobalPct');
    const gBar = document.getElementById('navGlobalBar');
    if (gPct && gBar) {
        const p = getGlobalProgress();
        gPct.textContent = p + '%';
        gBar.style.width = p + '%';
    }

    // Si la página home está visible, actualizar también su dashboard
    const homePage = document.getElementById('page-home');
    if (homePage && homePage.style.display !== 'none' && typeof renderHomeDashboard === 'function') {
        renderHomeDashboard();
    }
}

function showNotification(icon, title, desc) {
    const notif = document.getElementById('notification');
    if (!notif) return;
    document.getElementById('notifIcon').textContent = icon;
    document.getElementById('notifTitle').textContent = title;
    document.getElementById('notifDesc').textContent = desc;
    notif.classList.add('show');
    clearTimeout(window._notifTimeout);
    window._notifTimeout = setTimeout(() => {
        notif.classList.remove('show');
    }, 3800);
}

function launchConfetti() {
    const container = document.getElementById('confettiContainer');
    if (!container) return;
    const colors = ['#5DADE2', '#48D1CC', '#87CEEB', '#FFE066', '#FFC9DE', '#B0E0E6'];
    for (let i = 0; i < 50; i++) {
        const conf = document.createElement('div');
        conf.className = 'confetti';
        conf.style.left = Math.random() * 100 + '%';
        conf.style.background = colors[Math.floor(Math.random() * colors.length)];
        conf.style.animationDelay = (Math.random() * 0.5) + 's';
        conf.style.animationDuration = (2 + Math.random() * 1.5) + 's';
        conf.style.width = (6 + Math.random() * 10) + 'px';
        conf.style.height = conf.style.width;
        conf.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        container.appendChild(conf);
        setTimeout(() => conf.remove(), 3500);
    }
}

function renderProgressPage() {
    const container = document.getElementById('progressContent');
    if (!container) return;

    const level = getCurrentLevel();
    const next = getNextLevel();
    const levelProgress = getLevelProgress();
    const accuracy = userProgress.totalExercises > 0
        ? Math.round((userProgress.correctExercises / userProgress.totalExercises) * 100)
        : 0;

    container.innerHTML = `
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-card-icon">⭐</div>
                <div class="stat-card-value">${userProgress.xp}</div>
                <div class="stat-card-label">Puntos XP</div>
            </div>
            <div class="stat-card">
                <div class="stat-card-icon">${level.icon}</div>
                <div class="stat-card-value" style="font-size:1.4em;">${level.name}</div>
                <div class="stat-card-label">Nivel actual</div>
            </div>
            <div class="stat-card">
                <div class="stat-card-icon">✅</div>
                <div class="stat-card-value">${userProgress.correctExercises}</div>
                <div class="stat-card-label">Ejercicios acertados</div>
            </div>
            <div class="stat-card">
                <div class="stat-card-icon">🎯</div>
                <div class="stat-card-value">${accuracy}%</div>
                <div class="stat-card-label">Precisión</div>
            </div>
            <div class="stat-card">
                <div class="stat-card-icon">🔥</div>
                <div class="stat-card-value">${userProgress.streak || 0}</div>
                <div class="stat-card-label">Racha (días)</div>
            </div>
            <div class="stat-card">
                <div class="stat-card-icon">🏆</div>
                <div class="stat-card-value">${userProgress.unlockedRewards.length}/${REWARDS.length}</div>
                <div class="stat-card-label">Recompensas</div>
            </div>
        </div>

        ${next ? `
        <div class="lesson-section">
            <h3 class="lesson-section-title">
                <span class="lesson-section-icon">🚀</span>
                <span>Progreso hacia ${next.name}</span>
            </h3>
            <div style="display:flex; align-items:center; gap:16px; margin-bottom:14px;">
                <div style="font-size:3em;">${level.icon}</div>
                <div style="flex:1;">
                    <div style="height:14px; background:var(--borde-suave); border-radius:10px; overflow:hidden;">
                        <div style="height:100%; background:linear-gradient(90deg, var(--azul-medio), var(--turquesa)); border-radius:10px; width:${levelProgress}%; transition:width 0.8s ease;"></div>
                    </div>
                    <div style="margin-top:8px; font-size:0.9em; color:var(--texto-secundario);">
                        Te faltan <strong>${next.xp - userProgress.xp} XP</strong> para subir.
                    </div>
                </div>
                <div style="font-size:3em;">${next.icon}</div>
            </div>
        </div>
        ` : `
        <div class="highlight-box">
            <div class="highlight-box-title">🏆 ¡Has alcanzado el nivel máximo!</div>
            <p>Eres la <strong>Pirámide Aristotélica</strong>. Felicidades, sabio del networking.</p>
        </div>
        `}

        <h3 class="section-title" style="font-size:1.6em;">🎖️ Sistema de Niveles</h3>
        <div style="margin-bottom:48px;">
            ${LEVELS.map((lvl, idx) => {
                const isCurrent = lvl.name === level.name;
                const isLocked = userProgress.xp < lvl.xp;
                return `
                    <div class="level-card ${isCurrent ? 'current' : ''} ${isLocked ? 'locked' : ''}">
                        <div class="level-icon">${lvl.icon}</div>
                        <div class="level-info">
                            <div class="level-name">${idx + 1}. ${lvl.name}</div>
                            <div class="level-desc">${lvl.desc}</div>
                            <div class="level-xp">${isLocked ? `🔒 ${lvl.xp} XP requeridos` : `✅ Desbloqueado a ${lvl.xp} XP`}</div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>

        <h3 class="section-title" style="font-size:1.6em;">📚 Progreso por módulo</h3>
        <div class="modules-grid">
            ${MODULES.map(m => {
                const p = getModuleProgress(m.id);
                return `
                    <div class="module-card" onclick="openModule('${m.id}')">
                        <div class="module-icon">${m.icon}</div>
                        <div class="module-title">${m.title}</div>
                        <div class="module-meta">
                            <div class="module-progress">
                                <div class="module-progress-bar" style="width:${p}%"></div>
                            </div>
                            <div class="module-tag">${p}%</div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function resetProgress() {
    if (!confirm('¿Seguro que quieres reiniciar TODO tu progreso? No tiene vuelta atrás.')) return;
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('redacademia_canvas');
    userProgress = {
        xp: 0,
        completedExercises: {},
        completedModules: {},
        moduleProgress: {},
        streak: 0,
        lastActivity: null,
        totalExercises: 0,
        correctExercises: 0,
        unlockedRewards: [],
        savedTopologies: [],
        flashcardsSeen: {}
    };
    saveProgress();
    updateUI();
    showPage('home');
    showNotification('🔄', 'Progreso reiniciado', 'Empezamos de cero, máquina');
}
