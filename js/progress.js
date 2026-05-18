/* ============================================
   PROGRESS.JS - Sistema de gamificación
   ============================================ */

const STORAGE_KEY = 'redacademia_progress_v1';

// Estado global del progreso
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
    savedTopologies: []
};

function loadProgress() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            userProgress = { ...userProgress, ...JSON.parse(saved) };
        }
    } catch (e) {
        console.warn('No se pudo cargar el progreso:', e);
    }
    updateUI();
}

function saveProgress() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userProgress));
    } catch (e) {
        console.warn('No se pudo guardar el progreso:', e);
    }
}

function addXP(amount, reason = '') {
    const oldLevel = getCurrentLevel();
    userProgress.xp += amount;
    saveProgress();
    updateUI();
    showNotification('⭐', `+${amount} XP`, reason);

    const newLevel = getCurrentLevel();
    if (newLevel.name !== oldLevel.name) {
        setTimeout(() => {
            showNotification('🎖️', '¡Nivel desbloqueado!', `Ahora eres ${newLevel.name}`);
            launchConfetti();
        }, 1200);
    }

    // Comprobar recompensas
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

function getNextLevel() {
    const current = getCurrentLevel();
    const idx = LEVELS.indexOf(current);
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
    const total = MODULES.length;
    let sum = 0;
    MODULES.forEach(m => {
        sum += getModuleProgress(m.id);
    });
    return Math.round(sum / total);
}

function updateUI() {
    // Navbar
    const navXP = document.getElementById('navXP');
    const navLevel = document.getElementById('navLevel');
    if (navXP) navXP.textContent = userProgress.xp;
    if (navLevel) navLevel.textContent = getCurrentLevel().name;

    // Progreso global home
    const globalPercent = document.getElementById('globalProgressPercent');
    const globalBar = document.getElementById('globalProgressBar');
    if (globalPercent && globalBar) {
        const p = getGlobalProgress();
        globalPercent.textContent = p + '%';
        globalBar.style.width = p + '%';
    }
}

function showNotification(icon, title, desc) {
    const notif = document.getElementById('notification');
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
                <div class="stat-card-value" style="font-size:1.6em;">${level.name}</div>
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
        </div>

        ${next ? `
        <div class="global-progress">
            <div class="global-progress-header">
                <div class="global-progress-title">🚀 Progreso hacia ${next.name}</div>
                <div class="global-progress-percent">${levelProgress}%</div>
            </div>
            <div class="progress-bar-large">
                <div class="progress-bar-large-fill" style="width:${levelProgress}%"></div>
            </div>
            <p style="margin-top:12px; color:var(--texto-secundario); font-size:0.95em;">
                Te faltan <strong>${next.xp - userProgress.xp} XP</strong> para subir.
            </p>
        </div>
        ` : `
        <div class="highlight-box">
            <div class="highlight-box-title">🏆 ¡Has alcanzado el nivel máximo!</div>
            <p>Eres la <strong>Pirámide Aristotélica</strong>. Felicidades, sabio del networking.</p>
        </div>
        `}

        <h3 class="section-title" style="margin-top:64px; font-size:1.8em;">🎖️ Sistema de Niveles</h3>
        <p class="section-subtitle">Tu evolución como aprendiz de redes.</p>
        <div style="display:flex; flex-direction:column; gap:14px; margin-bottom:80px;">
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

        <h3 class="section-title" style="font-size:1.8em;">🎁 Recompensas absurdas</h3>
        <p class="section-subtitle">Las recompensas más importantes de tu vida. Estudia para desbloquearlas.</p>
        <div class="rewards-grid" style="margin-bottom:80px;">
            ${REWARDS.map(r => {
                const unlocked = userProgress.unlockedRewards.includes(r.id);
                return `
                    <div class="reward-card ${unlocked ? 'unlocked' : 'locked'}">
                        <div class="reward-icon">${r.icon}</div>
                        <div class="reward-title">${r.title}</div>
                        <div class="reward-desc">${r.desc}</div>
                        <div class="reward-status">
                            ${unlocked ? '✅ Desbloqueada' : `🔒 ${r.xp} XP`}
                        </div>
                    </div>
                `;
            }).join('')}
        </div>

        <h3 class="section-title" style="font-size:1.8em;">📚 Progreso por módulo</h3>
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

        <div style="text-align:center; margin-top:64px;">
            <button class="btn btn-secondary" onclick="resetProgress()">🗑️ Reiniciar progreso</button>
        </div>
    `;
}

function resetProgress() {
    if (!confirm('¿Seguro que quieres reiniciar TODO tu progreso? No tiene vuelta atrás.')) return;
    localStorage.removeItem(STORAGE_KEY);
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
        savedTopologies: []
    };
    saveProgress();
    updateUI();
    renderProgressPage();
    showNotification('🔄', 'Progreso reiniciado', 'Empezamos de cero, máquina');
}
