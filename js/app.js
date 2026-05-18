/* ============================================
   APP.JS - Orquestador principal
   ============================================ */

const PAGES = ['home', 'modules', 'module-detail', 'simulator', 'subnetting', 'lab', 'progress'];
let currentPage = 'home';

function showPage(pageName) {
    if (!PAGES.includes(pageName)) return;
    currentPage = pageName;

    // Ocultar todas las páginas
    PAGES.forEach(p => {
        const el = document.getElementById('page-' + p);
        if (el) el.style.display = 'none';
    });

    // Mostrar la actual
    const target = document.getElementById('page-' + pageName);
    if (target) target.style.display = 'block';

    // Actualizar nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === pageName ||
            (pageName === 'module-detail' && link.dataset.page === 'modules')) {
            link.classList.add('active');
        }
    });

    // Inicializar contenido específico
    if (pageName === 'home') {
        renderHomeFeatured();
    } else if (pageName === 'modules') {
        renderAllModules();
    } else if (pageName === 'simulator') {
        renderSimulator();
    } else if (pageName === 'subnetting') {
        renderSubnettingPage();
    } else if (pageName === 'lab') {
        renderLabPage();
    } else if (pageName === 'progress') {
        renderProgressPage();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== INICIALIZACIÓN =====

document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    showPage('home');

    // Mensaje de bienvenida si es nuevo usuario
    if (userProgress.xp === 0 && userProgress.totalExercises === 0) {
        setTimeout(() => {
            showNotification('🌊', '¡Bienvenido a REDACADEMIA!', 'Empieza tu aventura: dale a un módulo y a por XP.');
        }, 1000);
    } else if (userProgress.xp > 0) {
        setTimeout(() => {
            const level = getCurrentLevel();
            showNotification(level.icon, `Hola de nuevo, ${level.name}`, `Vas con ${userProgress.xp} XP. ¡A por más!`);
        }, 600);
    }
});
