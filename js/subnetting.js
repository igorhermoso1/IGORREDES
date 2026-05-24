/* ============================================
   SUBNETTING.JS - Calculadora, generador, visualizador (v2)
   ============================================ */

function renderSubnettingPage() {
    const container = document.getElementById('subnettingContent');
    if (!container) return;

    container.innerHTML = `
        <div class="sim-tabs">
            <button class="sim-tab active" data-subtab="theory" onclick="switchSubTab(event, 'theory')">📚 Teoría</button>
            <button class="sim-tab" data-subtab="calc" onclick="switchSubTab(event, 'calc')">🧮 Calculadora</button>
            <button class="sim-tab" data-subtab="divide" onclick="switchSubTab(event, 'divide')">📐 Dividir red</button>
            <button class="sim-tab" data-subtab="solved" onclick="switchSubTab(event, 'solved')">✅ Resueltos</button>
            <button class="sim-tab" data-subtab="practice" onclick="switchSubTab(event, 'practice')">🎯 Práctica</button>
            <button class="sim-tab" data-subtab="table" onclick="switchSubTab(event, 'table')">📋 Tabla rápida</button>
        </div>

        <!-- TAB 0: TEORÍA -->
        <div id="sub-tab-theory" class="sim-tab-content active">
            <div id="theoryContent"></div>
        </div>

        <!-- TAB 1: CALCULADORA -->
        <div id="sub-tab-calc" class="sim-tab-content">
            <div class="info-box" style="margin-bottom:24px;">
                💡 Introduce una IP y una máscara (en /prefijo). Calculará todo lo importante: dirección de red, broadcast, hosts útiles, primera y última IP, y representación binaria.
            </div>

            <div class="calc-grid">
                <div class="calc-input-group">
                    <h3 style="color:var(--azul-oscuro); margin-bottom:16px;">📥 Entrada</h3>

                    <div class="sim-config-group">
                        <label class="sim-config-label">Dirección IP</label>
                        <input type="text" class="sim-config-input" id="calcIP" value="192.168.1.50" placeholder="Ej: 192.168.1.50" oninput="calculateSubnet()">
                    </div>

                    <div class="sim-config-group">
                        <label class="sim-config-label">Prefijo (formato /N)</label>
                        <input type="range" min="1" max="32" value="24" id="calcPrefix" oninput="updatePrefixDisplay(); calculateSubnet()" style="width:100%;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:6px;">
                            <span style="font-size:0.85em; color:var(--texto-suave);">/1</span>
                            <strong id="prefixDisplay" style="color:var(--azul-medio); font-size:1.3em;">/24</strong>
                            <span style="font-size:0.85em; color:var(--texto-suave);">/32</span>
                        </div>
                    </div>

                    <div class="sim-config-group">
                        <label class="sim-config-label">Máscara decimal</label>
                        <input type="text" class="sim-config-input" id="calcMaskDecimal" readonly value="255.255.255.0">
                    </div>

                    <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:14px;">
                        <button class="sim-action-btn" style="flex:0; padding:6px 12px;" onclick="setPrefix(8)">/8</button>
                        <button class="sim-action-btn" style="flex:0; padding:6px 12px;" onclick="setPrefix(16)">/16</button>
                        <button class="sim-action-btn" style="flex:0; padding:6px 12px;" onclick="setPrefix(24)">/24</button>
                        <button class="sim-action-btn" style="flex:0; padding:6px 12px;" onclick="setPrefix(25)">/25</button>
                        <button class="sim-action-btn" style="flex:0; padding:6px 12px;" onclick="setPrefix(26)">/26</button>
                        <button class="sim-action-btn" style="flex:0; padding:6px 12px;" onclick="setPrefix(27)">/27</button>
                        <button class="sim-action-btn" style="flex:0; padding:6px 12px;" onclick="setPrefix(28)">/28</button>
                        <button class="sim-action-btn" style="flex:0; padding:6px 12px;" onclick="setPrefix(30)">/30</button>
                    </div>
                </div>

                <div class="calc-result">
                    <h3 style="color:var(--azul-oscuro); margin-bottom:16px;">📤 Resultado</h3>
                    <div id="calcResults"></div>
                </div>
            </div>

            <div class="lesson-section" style="margin-top:32px;">
                <h3 class="lesson-section-title">
                    <span class="lesson-section-icon">🔬</span>
                    <span>Visualización binaria</span>
                </h3>
                <div id="binaryViz"></div>
            </div>
        </div>

        <!-- TAB 2: DIVIDIR RED -->
        <div id="sub-tab-divide" class="sim-tab-content">
            <div class="info-box" style="margin-bottom:24px;">
                📐 Introduce una red y el número de subredes que necesitas. Te muestra el procedimiento paso a paso, igual que se hace en clase.
            </div>

            <div class="calc-grid">
                <div class="calc-input-group">
                    <h3 style="color:var(--azul-oscuro); margin-bottom:16px;">📥 Entrada</h3>

                    <div class="sim-config-group">
                        <label class="sim-config-label">Red base</label>
                        <input type="text" class="sim-config-input" id="divIP" value="192.168.10.0" oninput="divideNetwork()">
                    </div>

                    <div class="sim-config-group">
                        <label class="sim-config-label">Prefijo original</label>
                        <input type="number" class="sim-config-input" id="divPrefix" value="24" min="1" max="30" oninput="divideNetwork()">
                    </div>

                    <div class="sim-config-group">
                        <label class="sim-config-label">Nº de subredes</label>
                        <input type="number" class="sim-config-input" id="divCount" value="4" min="2" max="256" oninput="divideNetwork()">
                    </div>
                </div>

                <div class="calc-result">
                    <h3 style="color:var(--azul-oscuro); margin-bottom:16px;">📋 Paso a paso</h3>
                    <div id="divideSteps"></div>
                </div>
            </div>

            <div class="lesson-section" style="margin-top:32px;">
                <h3 class="lesson-section-title">
                    <span class="lesson-section-icon">🗂️</span>
                    <span>Subredes generadas</span>
                </h3>
                <div id="subnetsList"></div>
            </div>
        </div>

        <!-- TAB 3.5: EJERCICIOS RESUELTOS PASO A PASO -->
        <div id="sub-tab-solved" class="sim-tab-content">
            <div class="info-box" style="margin-bottom:24px;">
                ✅ Aquí tienes <strong>11 ejercicios resueltos paso a paso</strong>, sacados directamente de los apuntes. Despliega "Ver solución" cuando quieras verla.
            </div>
            <div id="solvedExercisesList"></div>
        </div>

        <!-- TAB 3: EJERCICIOS PRÁCTICOS -->
        <div id="sub-tab-practice" class="sim-tab-content">
            <div class="info-box" style="margin-bottom:24px;">
                🎯 Resuelve ejercicios aleatorios. Cada acierto te da XP. Si fallas, mira la solución y dale a "Otro".
            </div>

            <div id="practiceArea"></div>

            <div style="text-align:center; margin-top:24px;">
                <button class="btn btn-large" onclick="generatePracticeExercise()">🎲 Generar nuevo ejercicio</button>
            </div>
        </div>

        <!-- TAB 4: TABLA -->
        <div id="sub-tab-table" class="sim-tab-content">
            <div class="info-box" style="margin-bottom:24px;">
                📋 La tabla esencial de subnetting. Memorízala y serás más rápido que la luz.
            </div>

            <div style="overflow-x:auto;">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Prefijo</th>
                            <th>Máscara decimal</th>
                            <th>Wildcard</th>
                            <th>Hosts útiles</th>
                            <th>Subredes /24</th>
                            <th>Incremento</th>
                        </tr>
                    </thead>
                    <tbody id="quickRefTable"></tbody>
                </table>
            </div>
        </div>
    `;

    updatePrefixDisplay();
    calculateSubnet();
    divideNetwork();
    generatePracticeExercise();
    renderQuickRefTable();
    renderTheoryContent();
    renderSolvedExercises();
}

function renderTheoryContent() {
    const el = document.getElementById('theoryContent');
    if (!el || typeof SUBNETTING_THEORY === 'undefined') return;

    // Sub-navegación
    const sections = [
        { key: 'intro', title: '📖 Introducción' },
        { key: 'fundamentals', title: '🧱 Fundamentos' },
        { key: 'caso_practico_1', title: '🎯 Caso práctico paso a paso' },
        { key: 'rewind', title: '🔄 Enfoque inverso' },
        { key: 'resumen', title: '✨ Resumen 10 pasos' },
        { key: 'nat_resumen', title: '🔁 NAT y conversación' }
    ];

    el.innerHTML = `
        <div class="info-box" style="margin-bottom:20px;">
            📚 Teoría completa de subnetting paso a paso, sacada directamente de los apuntes. Léela en orden la primera vez.
        </div>
        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:24px;">
            ${sections.map((s, idx) => `
                <button class="theory-subnav-btn ${idx === 0 ? 'active' : ''}"
                        onclick="switchTheorySection('${s.key}', event)"
                        style="background:white; border:2px solid var(--borde); border-radius:14px; padding:10px 16px; cursor:pointer; font-weight:700; color:var(--azul-oscuro); font-family:inherit; transition:all 0.25s ease;">
                    ${s.title}
                </button>
            `).join('')}
        </div>
        <div id="theorySection" class="theory-section"></div>
    `;

    // Pintar primera sección por defecto
    switchTheorySection('intro', null);
}

function switchTheorySection(key, evt) {
    document.querySelectorAll('.theory-subnav-btn').forEach(b => {
        b.classList.remove('active');
        b.style.background = 'white';
        b.style.color = 'var(--azul-oscuro)';
    });
    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.add('active');
        evt.currentTarget.style.background = 'linear-gradient(135deg, var(--azul-medio), var(--turquesa))';
        evt.currentTarget.style.color = 'white';
    } else {
        const first = document.querySelector('.theory-subnav-btn');
        if (first) {
            first.style.background = 'linear-gradient(135deg, var(--azul-medio), var(--turquesa))';
            first.style.color = 'white';
        }
    }
    const sec = document.getElementById('theorySection');
    if (sec && SUBNETTING_THEORY[key]) {
        sec.innerHTML = SUBNETTING_THEORY[key];
        sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function renderSolvedExercises() {
    const el = document.getElementById('solvedExercisesList');
    if (!el || typeof SUBNETTING_EXERCISES === 'undefined') return;

    const diffStyles = {
        'fácil': { bg: '#D4EDDA', color: '#155724', icon: '🟢' },
        'medio': { bg: '#FFF3CD', color: '#856404', icon: '🟡' },
        'difícil': { bg: '#F8D7DA', color: '#721C24', icon: '🔴' },
        'experto': { bg: '#D6D8F0', color: '#1F2A60', icon: '🟣' }
    };

    el.innerHTML = SUBNETTING_EXERCISES.map((ex, idx) => {
        const diff = diffStyles[ex.difficulty] || diffStyles['medio'];
        const stepsHtml = (ex.steps || []).map((s, i) =>
            `<div style="display:flex; gap:10px; margin-bottom:10px;">
                <div style="background:var(--azul-medio); color:white; min-width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:0.85em; flex-shrink:0;">${i + 1}</div>
                <div style="flex:1; padding-top:3px;">${s}</div>
            </div>`
        ).join('');
        return `
            <div class="solved-exercise-card" style="background:white; border:2px solid var(--borde); border-radius:18px; padding:20px; margin-bottom:18px; box-shadow:0 4px 14px var(--sombra-azul);">
                <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap; margin-bottom:12px;">
                    <span style="font-weight:800; color:var(--azul-oscuro); font-size:1.05em;">Ejercicio ${idx + 1}</span>
                    <span style="background:${diff.bg}; color:${diff.color}; padding:3px 10px; border-radius:10px; font-size:0.8em; font-weight:700;">${diff.icon} ${ex.difficulty}</span>
                </div>
                <div style="background:var(--celeste); border-radius:12px; padding:14px; margin-bottom:14px; color:var(--azul-oscuro); line-height:1.6;">
                    <strong>📋 Enunciado:</strong><br>${ex.question}
                </div>
                <button class="btn btn-secondary" onclick="toggleSolvedSolution(${idx})" id="toggle-sol-${idx}" style="width:100%;">
                    👁️ Ver solución paso a paso
                </button>
                <div id="solved-sol-${idx}" style="display:none; margin-top:14px;">
                    <div style="background:var(--blanco-azulado); border-radius:12px; padding:16px; border-left:4px solid var(--turquesa); line-height:1.7; color:var(--texto-principal);">
                        ${stepsHtml}
                        <div style="margin-top:14px; padding:12px; background:#E8F8E8; border-radius:10px; border:2px solid #28A745; color:#155724;">
                            <strong>✅ Respuesta:</strong> ${ex.answer}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function toggleSolvedSolution(idx) {
    const sol = document.getElementById(`solved-sol-${idx}`);
    const btn = document.getElementById(`toggle-sol-${idx}`);
    if (!sol || !btn) return;
    if (sol.style.display === 'none') {
        sol.style.display = 'block';
        btn.textContent = '🙈 Ocultar solución';
        addXP(5, `Ejercicio resuelto ${idx + 1} consultado`);
    } else {
        sol.style.display = 'none';
        btn.textContent = '👁️ Ver solución paso a paso';
    }
}

function switchSubTab(evt, tab) {
    document.querySelectorAll('.sim-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.sim-tab-content').forEach(t => t.classList.remove('active'));
    if (evt && evt.currentTarget) evt.currentTarget.classList.add('active');
    document.getElementById(`sub-tab-${tab}`).classList.add('active');
}

function setPrefix(p) {
    const el = document.getElementById('calcPrefix');
    if (el) el.value = p;
    updatePrefixDisplay();
    calculateSubnet();
}

function updatePrefixDisplay() {
    const el = document.getElementById('calcPrefix');
    if (!el) return;
    const p = parseInt(el.value);
    document.getElementById('prefixDisplay').textContent = `/${p}`;
    document.getElementById('calcMaskDecimal').value = prefixToMask(p);
}

// ===== Utilidades IP =====

function ipToInt(ip) {
    if (!ip || typeof ip !== 'string') return null;
    const parts = ip.split('.');
    if (parts.length !== 4) return null;
    const nums = parts.map(p => {
        const n = parseInt(p);
        if (isNaN(n) || n < 0 || n > 255 || String(n) !== p.trim()) return NaN;
        return n;
    });
    if (nums.some(n => isNaN(n))) return null;
    return ((nums[0] << 24) >>> 0) + (nums[1] << 16) + (nums[2] << 8) + nums[3];
}

function intToIp(n) {
    return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.');
}

function prefixToMask(p) {
    if (p === 0) return '0.0.0.0';
    if (p < 0 || p > 32) return '0.0.0.0';
    const mask = (0xFFFFFFFF << (32 - p)) >>> 0;
    return intToIp(mask);
}

function maskToPrefix(mask) {
    const n = ipToInt(mask);
    if (n === null) return null;
    let count = 0;
    let m = n;
    while (m & 0x80000000) {
        count++;
        m = (m << 1) >>> 0;
    }
    return count;
}

function intToBinary32(n) {
    return n.toString(2).padStart(32, '0');
}

function getIPClass(firstOctet) {
    if (firstOctet >= 1 && firstOctet <= 126) return 'A';
    if (firstOctet === 127) return 'A (loopback)';
    if (firstOctet >= 128 && firstOctet <= 191) return 'B';
    if (firstOctet >= 192 && firstOctet <= 223) return 'C';
    if (firstOctet >= 224 && firstOctet <= 239) return 'D (Multicast)';
    if (firstOctet >= 240 && firstOctet <= 255) return 'E (Reservada)';
    return '?';
}

function isPrivate(ip) {
    const parts = ip.split('.').map(Number);
    if (parts[0] === 10) return true;
    if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;
    if (parts[0] === 192 && parts[1] === 168) return true;
    return false;
}

// ===== Calculadora principal =====

function calculateSubnet() {
    const ipStr = document.getElementById('calcIP').value.trim();
    const prefix = parseInt(document.getElementById('calcPrefix').value);
    const ipInt = ipToInt(ipStr);
    const results = document.getElementById('calcResults');
    const viz = document.getElementById('binaryViz');

    if (ipInt === null || isNaN(prefix) || prefix < 0 || prefix > 32) {
        results.innerHTML = `<div class="exercise-feedback wrong">❌ La IP o el prefijo no son válidos.</div>`;
        viz.innerHTML = '';
        return;
    }

    const maskInt = prefix === 0 ? 0 : (0xFFFFFFFF << (32 - prefix)) >>> 0;
    const networkInt = (ipInt & maskInt) >>> 0;
    const broadcastInt = (networkInt | (~maskInt >>> 0)) >>> 0;
    const totalHosts = Math.pow(2, 32 - prefix);
    let usableHosts;
    if (prefix === 32) usableHosts = 1;
    else if (prefix === 31) usableHosts = 2;
    else usableHosts = Math.max(0, totalHosts - 2);

    const firstUsable = prefix >= 31 ? networkInt : networkInt + 1;
    const lastUsable = prefix >= 31 ? broadcastInt : broadcastInt - 1;

    const firstOctet = parseInt(ipStr.split('.')[0]);
    const klass = getIPClass(firstOctet);
    const priv = isPrivate(ipStr);

    results.innerHTML = `
        <div class="calc-result-row">
            <span class="calc-result-label">📍 IP introducida</span>
            <span class="calc-result-value">${ipStr}/${prefix}</span>
        </div>
        <div class="calc-result-row">
            <span class="calc-result-label">🌐 Dirección de red</span>
            <span class="calc-result-value">${intToIp(networkInt)}</span>
        </div>
        <div class="calc-result-row">
            <span class="calc-result-label">📡 Broadcast</span>
            <span class="calc-result-value">${intToIp(broadcastInt)}</span>
        </div>
        <div class="calc-result-row">
            <span class="calc-result-label">🎯 Máscara</span>
            <span class="calc-result-value">${prefixToMask(prefix)}</span>
        </div>
        <div class="calc-result-row">
            <span class="calc-result-label">🧮 Hosts útiles</span>
            <span class="calc-result-value">${usableHosts.toLocaleString()}</span>
        </div>
        <div class="calc-result-row">
            <span class="calc-result-label">🥇 Primera IP útil</span>
            <span class="calc-result-value">${intToIp(firstUsable)}</span>
        </div>
        <div class="calc-result-row">
            <span class="calc-result-label">🏁 Última IP útil</span>
            <span class="calc-result-value">${intToIp(lastUsable)}</span>
        </div>
        <div class="calc-result-row">
            <span class="calc-result-label">🏷️ Clase</span>
            <span class="calc-result-value">${klass}</span>
        </div>
        <div class="calc-result-row">
            <span class="calc-result-label">🔒 Tipo</span>
            <span class="calc-result-value">${priv ? '🏠 Privada' : '🌍 Pública'}</span>
        </div>
    `;

    // Visualización binaria CORRECTA
    renderBinaryViz(viz, ipInt, maskInt, networkInt, broadcastInt, prefix);
}

// === Visualización binaria FIXED ===
// El bug anterior: al insertar el "." entre red y host, dividía mal los octetos.
// Solución: pintamos octeto por octeto, marcando cada bit individual como "red" o "host" según su posición global.
function renderBinaryViz(container, ipInt, maskInt, networkInt, broadcastInt, prefix) {
    const ipBin = intToBinary32(ipInt);
    const maskBin = intToBinary32(maskInt);
    const netBin = intToBinary32(networkInt);
    const bcBin = intToBinary32(broadcastInt);

    function renderBinaryLine(bin, prefix, useColors = true) {
        let html = '';
        for (let octet = 0; octet < 4; octet++) {
            if (octet > 0) html += '<span class="binary-dot">.</span>';
            html += '<span class="binary-viz-octet">';
            for (let b = 0; b < 8; b++) {
                const globalBit = octet * 8 + b;
                const bit = bin[globalBit];
                if (useColors) {
                    const cls = globalBit < prefix ? 'binary-net-bit' : 'binary-host-bit';
                    html += `<span class="${cls}">${bit}</span>`;
                } else {
                    html += bit;
                }
            }
            html += '</span>';
        }
        return html;
    }

    container.innerHTML = `
        <div class="binary-viz-row">
            <div class="binary-viz-label">IP (${intToIp(ipInt)})</div>
            <div class="binary-viz-value">${renderBinaryLine(ipBin, prefix)}</div>
        </div>
        <div class="binary-viz-row">
            <div class="binary-viz-label">Máscara (${intToIp(maskInt)})</div>
            <div class="binary-viz-value">${renderBinaryLine(maskBin, prefix)}</div>
        </div>
        <div class="binary-viz-row">
            <div class="binary-viz-label">Red (${intToIp(networkInt)})</div>
            <div class="binary-viz-value">${renderBinaryLine(netBin, prefix)}</div>
        </div>
        <div class="binary-viz-row">
            <div class="binary-viz-label">Broadcast (${intToIp(broadcastInt)})</div>
            <div class="binary-viz-value">${renderBinaryLine(bcBin, prefix)}</div>
        </div>
        <div class="binary-legend">
            <span><span class="binary-legend-dot" style="background:rgba(93, 173, 226, 0.4); border:1px solid #2874A6;"></span> ${prefix} bits de red</span>
            <span><span class="binary-legend-dot" style="background:rgba(255, 184, 140, 0.4); border:1px solid #E67E22;"></span> ${32 - prefix} bits de host</span>
        </div>
    `;
}

// ===== Dividir red en subredes =====

function divideNetwork() {
    const ipStr = document.getElementById('divIP').value.trim();
    const origPrefix = parseInt(document.getElementById('divPrefix').value);
    const count = parseInt(document.getElementById('divCount').value);
    const stepsEl = document.getElementById('divideSteps');
    const listEl = document.getElementById('subnetsList');

    const ipInt = ipToInt(ipStr);
    if (ipInt === null || isNaN(origPrefix) || isNaN(count) || origPrefix < 1 || origPrefix > 30 || count < 2) {
        stepsEl.innerHTML = `<div class="exercise-feedback wrong">❌ Comprueba los valores (IP válida, prefijo 1-30, al menos 2 subredes).</div>`;
        listEl.innerHTML = '';
        return;
    }

    let bitsNeeded = 1;
    let subnetsPossible = 2;
    while (subnetsPossible < count) {
        bitsNeeded++;
        subnetsPossible *= 2;
    }
    const newPrefix = origPrefix + bitsNeeded;

    if (newPrefix > 30) {
        stepsEl.innerHTML = `<div class="exercise-feedback wrong">❌ No es posible dividir tanto: necesitarías /${newPrefix}, que ya no deja hosts útiles.</div>`;
        listEl.innerHTML = '';
        return;
    }

    const hostBits = 32 - newPrefix;
    const blockSize = Math.pow(2, hostBits);
    const usableHosts = blockSize - 2;
    const firstOctet = parseInt(ipStr.split('.')[0]);
    const klass = getIPClass(firstOctet);

    stepsEl.innerHTML = `
        <ol style="padding-left:24px; line-height:2;">
            <li><strong>Red base:</strong> ${ipStr}/${origPrefix} (clase ${klass})</li>
            <li><strong>Subredes pedidas:</strong> ${count}</li>
            <li><strong>Bits necesarios:</strong> ⌈log₂(${count})⌉ = ${bitsNeeded} bits (cubren ${subnetsPossible})</li>
            <li><strong>Nuevo prefijo:</strong> ${origPrefix} + ${bitsNeeded} = <strong style="color:var(--azul-medio);">/${newPrefix}</strong></li>
            <li><strong>Nueva máscara:</strong> ${prefixToMask(newPrefix)}</li>
            <li><strong>Tamaño de cada subred:</strong> 2^${hostBits} = ${blockSize} direcciones</li>
            <li><strong>Hosts útiles por subred:</strong> ${blockSize} - 2 = <strong style="color:var(--azul-medio);">${usableHosts}</strong></li>
        </ol>
    `;

    let html = '<div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:12px;">';
    const origMask = origPrefix === 0 ? 0 : (0xFFFFFFFF << (32 - origPrefix)) >>> 0;
    const base = (ipInt & origMask) >>> 0;
    for (let i = 0; i < subnetsPossible; i++) {
        const netInt = (base + i * blockSize) >>> 0;
        const bcInt = (netInt + blockSize - 1) >>> 0;
        const firstUsable = newPrefix >= 31 ? netInt : netInt + 1;
        const lastUsable = newPrefix >= 31 ? bcInt : bcInt - 1;
        const isWithinReq = i < count;
        const highlight = isWithinReq ? 'border-color:var(--turquesa); background:#F0FCFB;' : 'opacity:0.55;';
        html += `
            <div style="background:white; padding:14px; border-radius:14px; border:2px solid var(--borde); ${highlight}">
                <div style="font-weight:800; color:var(--azul-oscuro); margin-bottom:6px;">
                    ${isWithinReq ? '✅' : '📦'} Subred ${i + 1}
                </div>
                <div style="font-family:'Courier New', monospace; font-size:0.85em; line-height:1.7;">
                    <strong>Red:</strong> ${intToIp(netInt)}/${newPrefix}<br>
                    <strong>Rango útil:</strong> ${intToIp(firstUsable)} → ${intToIp(lastUsable)}<br>
                    <strong>Broadcast:</strong> ${intToIp(bcInt)}
                </div>
            </div>
        `;
    }
    html += '</div>';
    listEl.innerHTML = html;
}

// ===== Ejercicios de práctica (FIXED) =====

let currentPractice = null;

function generatePracticeExercise() {
    const types = ['findNetwork', 'findBroadcast', 'countHosts', 'findMask', 'divideNet'];
    const type = types[Math.floor(Math.random() * types.length)];
    const ip1 = `192.168.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
    const prefix = [24, 25, 26, 27, 28, 29, 30][Math.floor(Math.random() * 7)];
    const ipInt = ipToInt(ip1);
    const maskInt = (0xFFFFFFFF << (32 - prefix)) >>> 0;
    const netInt = (ipInt & maskInt) >>> 0;
    const bcInt = (netInt | (~maskInt >>> 0)) >>> 0;
    const totalHosts = Math.pow(2, 32 - prefix);
    const usable = prefix === 32 ? 1 : prefix === 31 ? 2 : totalHosts - 2;

    let question, answer, explanation, hint, acceptable;

    if (type === 'findNetwork') {
        question = `¿Cuál es la dirección de red de ${ip1}/${prefix}?`;
        answer = intToIp(netInt);
        acceptable = [answer];
        explanation = `Aplica la máscara ${prefixToMask(prefix)} a ${ip1} con AND binario → ${answer}`;
        const lastOctetMask = parseInt(prefixToMask(prefix).split('.')[3]);
        const inc = lastOctetMask ? (256 - lastOctetMask) : 256;
        hint = `Pista: el incremento es ${inc} en el último octeto`;
    } else if (type === 'findBroadcast') {
        question = `¿Cuál es el broadcast de la red de ${ip1}/${prefix}?`;
        answer = intToIp(bcInt);
        acceptable = [answer];
        explanation = `Es la última IP del bloque. Red ${intToIp(netInt)} + tamaño (${totalHosts}) - 1 = ${answer}`;
        hint = `Pista: dirección de red (${intToIp(netInt)}) + ${totalHosts - 1}`;
    } else if (type === 'countHosts') {
        question = `¿Cuántos hosts útiles tiene una subred /${prefix}?`;
        answer = String(usable);
        acceptable = [answer];
        explanation = `2^(32-${prefix}) - 2 = ${totalHosts} - 2 = ${usable}`;
        hint = `Pista: 2 elevado a los bits de host (${32 - prefix}), menos 2`;
    } else if (type === 'findMask') {
        question = `¿Cuál es la máscara decimal de /${prefix}?`;
        answer = prefixToMask(prefix);
        acceptable = [answer];
        explanation = `${prefix} unos seguidos a la izquierda, ${32 - prefix} ceros a la derecha → ${answer}`;
        hint = `Pista: los valores típicos del último octeto son 128, 192, 224, 240, 248, 252...`;
    } else {
        // FIXED: ahora usamos el prefix aleatorio en la pregunta también
        const subnetsCount = [2, 4, 8, 16][Math.floor(Math.random() * 4)];
        const baseIP = `192.168.${Math.floor(Math.random() * 256)}.0`;
        const basePrefix = 24;
        const bitsNeed = Math.log2(subnetsCount);
        const newP = basePrefix + bitsNeed;
        question = `Tengo la red ${baseIP}/${basePrefix} y necesito ${subnetsCount} subredes. ¿Qué prefijo nuevo necesito?`;
        answer = '/' + newP;
        acceptable = ['/' + newP, String(newP)];
        explanation = `Para ${subnetsCount} subredes necesito ${bitsNeed} bits (2^${bitsNeed} = ${subnetsCount}). ${basePrefix} + ${bitsNeed} = /${newP}`;
        hint = `Pista: log₂(${subnetsCount}) = bits a añadir al prefijo`;
    }

    currentPractice = { question, answer, acceptable, explanation, type };

    const area = document.getElementById('practiceArea');
    area.innerHTML = `
        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-type">🧮 Subnetting</span>
                <span class="exercise-xp">+20 XP</span>
            </div>
            <div class="exercise-question">${question}</div>
            <input type="text" class="exercise-input" id="practiceAnswer" placeholder="Tu respuesta..." onkeypress="if(event.key==='Enter') checkPractice()">
            <div style="display:flex; gap:10px; margin-top:12px; flex-wrap:wrap;">
                <button class="btn" onclick="checkPractice()">✅ Comprobar</button>
                <button class="btn btn-secondary" onclick="showHint()">💡 Pista</button>
            </div>
            <div id="practiceFeedback"></div>
        </div>
    `;
    setTimeout(() => {
        const i = document.getElementById('practiceAnswer');
        if (i) i.focus();
    }, 100);
}

function showHint() {
    if (!currentPractice) return;
    const fb = document.getElementById('practiceFeedback');
    if (fb) fb.innerHTML = `<div class="info-box">${currentPractice.explanation.split('=')[0] ? 'Pista: piensa con calma...' : ''} ${currentPractice.explanation.substring(0, 80)}...</div>`;
    // Mejor mostrar el hint real almacenado
    fb.innerHTML = `<div class="info-box">💡 ${currentPractice.explanation}</div>`;
}

function checkPractice() {
    if (!currentPractice) return;
    const input = document.getElementById('practiceAnswer');
    const val = input.value.trim();
    if (!val) return;

    const normalize = (s) => String(s).replace(/\s/g, '').toLowerCase().replace(/^\//, '');
    const userAns = normalize(val);
    const isCorrect = currentPractice.acceptable.some(a => normalize(a) === userAns);

    const fb = document.getElementById('practiceFeedback');

    if (isCorrect) {
        addXP(20, '¡Subnetting acertado!');
        fb.innerHTML = `<div class="exercise-feedback correct">✅ ¡Correcto! ${currentPractice.explanation}</div>`;
        input.disabled = true;
        userProgress.totalExercises++;
        userProgress.correctExercises++;
        saveProgress();
    } else {
        fb.innerHTML = `<div class="exercise-feedback wrong">❌ Casi. La respuesta correcta era <strong>${currentPractice.answer}</strong>. ${currentPractice.explanation}</div>`;
        userProgress.totalExercises++;
        saveProgress();
    }
    updateUI();
}

// ===== Tabla rápida =====

function renderQuickRefTable() {
    const tbody = document.getElementById('quickRefTable');
    if (!tbody) return;
    let html = '';
    for (let p = 8; p <= 32; p++) {
        const mask = prefixToMask(p);
        const wcInt = (~((0xFFFFFFFF << (32 - p)) >>> 0)) >>> 0;
        const wildcard = intToIp(wcInt);
        const hostBits = 32 - p;
        let hosts;
        if (p === 32) hosts = 1;
        else if (p === 31) hosts = 2;
        else hosts = Math.pow(2, hostBits) - 2;
        const subnets24 = p >= 24 ? Math.pow(2, p - 24) : '';

        const maskOctets = mask.split('.').map(Number);
        let increment;
        if (p === 32) increment = '1 (última IP)';
        else if (p > 24) increment = `${256 - maskOctets[3]} (octeto 4)`;
        else if (p === 24) increment = '1 (octeto 3)';
        else if (p > 16) increment = `${256 - maskOctets[2]} (octeto 3)`;
        else if (p === 16) increment = '1 (octeto 2)';
        else if (p > 8) increment = `${256 - maskOctets[1]} (octeto 2)`;
        else if (p === 8) increment = '1 (octeto 1)';
        else increment = '—';

        html += `
            <tr>
                <td><strong>/${p}</strong></td>
                <td><code>${mask}</code></td>
                <td><code>${wildcard}</code></td>
                <td>${typeof hosts === 'number' ? hosts.toLocaleString() : hosts}</td>
                <td>${subnets24}</td>
                <td>${increment}</td>
            </tr>
        `;
    }
    tbody.innerHTML = html;
}
