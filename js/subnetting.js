/* ============================================
   SUBNETTING.JS - Calculadora, generador, visualizador
   ============================================ */

function renderSubnettingPage() {
    const container = document.getElementById('subnettingContent');
    if (!container) return;

    container.innerHTML = `
        <!-- Pestañas -->
        <div class="sim-tabs">
            <button class="sim-tab active" onclick="switchSubTab('calc')">🧮 Calculadora</button>
            <button class="sim-tab" onclick="switchSubTab('divide')">📐 Dividir red</button>
            <button class="sim-tab" onclick="switchSubTab('practice')">🎯 Ejercicios</button>
            <button class="sim-tab" onclick="switchSubTab('table')">📋 Tabla rápida</button>
        </div>

        <!-- TAB 1: CALCULADORA -->
        <div id="sub-tab-calc" class="sim-tab-content active">
            <div class="info-box" style="margin-bottom:24px;">
                💡 Introduce una IP y una máscara (en /prefijo o decimal). Calculará todo lo importante: dirección de red, broadcast, hosts útiles, primera y última IP, y representación binaria.
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
                        <input type="range" min="0" max="32" value="24" id="calcPrefix" oninput="updatePrefixDisplay(); calculateSubnet()" style="width:100%;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:6px;">
                            <span style="font-size:0.85em; color:var(--texto-suave);">/0</span>
                            <strong id="prefixDisplay" style="color:var(--azul-medio); font-size:1.3em;">/24</strong>
                            <span style="font-size:0.85em; color:var(--texto-suave);">/32</span>
                        </div>
                    </div>

                    <div class="sim-config-group">
                        <label class="sim-config-label">Máscara decimal</label>
                        <input type="text" class="sim-config-input" id="calcMaskDecimal" readonly value="255.255.255.0">
                    </div>

                    <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:14px;">
                        <button class="sim-action-btn" onclick="setPrefix(8)">/8</button>
                        <button class="sim-action-btn" onclick="setPrefix(16)">/16</button>
                        <button class="sim-action-btn" onclick="setPrefix(24)">/24</button>
                        <button class="sim-action-btn" onclick="setPrefix(25)">/25</button>
                        <button class="sim-action-btn" onclick="setPrefix(26)">/26</button>
                        <button class="sim-action-btn" onclick="setPrefix(27)">/27</button>
                        <button class="sim-action-btn" onclick="setPrefix(28)">/28</button>
                        <button class="sim-action-btn" onclick="setPrefix(30)">/30</button>
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
                <div id="binaryViz" style="font-family:'Courier New', monospace; font-size:0.95em; line-height:2;"></div>
            </div>
        </div>

        <!-- TAB 2: DIVIDIR RED -->
        <div id="sub-tab-divide" class="sim-tab-content">
            <div class="info-box" style="margin-bottom:24px;">
                📐 Introduce una red y el número de subredes que necesitas. Te muestra paso a paso cómo dividirla, igual que se hace en clase.
            </div>

            <div class="calc-grid">
                <div class="calc-input-group">
                    <h3 style="color:var(--azul-oscuro); margin-bottom:16px;">📥 Entrada</h3>

                    <div class="sim-config-group">
                        <label class="sim-config-label">Red base (con su prefijo)</label>
                        <input type="text" class="sim-config-input" id="divIP" value="192.168.10.0" oninput="divideNetwork()">
                    </div>

                    <div class="sim-config-group">
                        <label class="sim-config-label">Prefijo original</label>
                        <input type="number" class="sim-config-input" id="divPrefix" value="24" min="1" max="30" oninput="divideNetwork()">
                    </div>

                    <div class="sim-config-group">
                        <label class="sim-config-label">Nº de subredes necesarias</label>
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

        <!-- TAB 3: EJERCICIOS PRÁCTICOS -->
        <div id="sub-tab-practice" class="sim-tab-content">
            <div class="info-box" style="margin-bottom:24px;">
                🎯 Resuelve ejercicios generados aleatoriamente. Cada acierto te da XP. Si fallas, mira la solución, aprende, y dale a "Otro".
            </div>

            <div id="practiceArea"></div>

            <div style="text-align:center; margin-top:24px;">
                <button class="btn btn-large" onclick="generatePracticeExercise()">🎲 Generar nuevo ejercicio</button>
            </div>
        </div>

        <!-- TAB 4: TABLA DE REFERENCIA -->
        <div id="sub-tab-table" class="sim-tab-content">
            <div class="info-box" style="margin-bottom:24px;">
                📋 La tabla esencial de subnetting. Memorízala y serás más rápido que la luz.
            </div>

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
    `;

    updatePrefixDisplay();
    calculateSubnet();
    divideNetwork();
    generatePracticeExercise();
    renderQuickRefTable();
}

function switchSubTab(tab) {
    document.querySelectorAll('.sim-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.sim-tab-content').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    document.getElementById(`sub-tab-${tab}`).classList.add('active');
}

function setPrefix(p) {
    document.getElementById('calcPrefix').value = p;
    updatePrefixDisplay();
    calculateSubnet();
}

function updatePrefixDisplay() {
    const p = parseInt(document.getElementById('calcPrefix').value);
    document.getElementById('prefixDisplay').textContent = `/${p}`;
    document.getElementById('calcMaskDecimal').value = prefixToMask(p);
}

// ===== Utilidades de cálculo IP =====

function ipToInt(ip) {
    const parts = ip.split('.').map(Number);
    if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) return null;
    return ((parts[0] << 24) >>> 0) + (parts[1] << 16) + (parts[2] << 8) + parts[3];
}

function intToIp(n) {
    return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.');
}

function prefixToMask(p) {
    if (p === 0) return '0.0.0.0';
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

function binaryToDottedIP(bin) {
    return [
        bin.slice(0, 8),
        bin.slice(8, 16),
        bin.slice(16, 24),
        bin.slice(24, 32)
    ].join('.');
}

function getIPClass(firstOctet) {
    if (firstOctet >= 1 && firstOctet <= 126) return 'A';
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
    if (parts[0] === 127) return false;
    return false;
}

// ===== Calculadora principal =====

function calculateSubnet() {
    const ipStr = document.getElementById('calcIP').value.trim();
    const prefix = parseInt(document.getElementById('calcPrefix').value);
    const ipInt = ipToInt(ipStr);
    const results = document.getElementById('calcResults');
    const viz = document.getElementById('binaryViz');

    if (ipInt === null) {
        results.innerHTML = `<div class="exercise-feedback wrong">❌ La IP no es válida.</div>`;
        viz.innerHTML = '';
        return;
    }

    const maskInt = prefix === 0 ? 0 : (0xFFFFFFFF << (32 - prefix)) >>> 0;
    const networkInt = (ipInt & maskInt) >>> 0;
    const broadcastInt = (networkInt | (~maskInt >>> 0)) >>> 0;
    const totalHosts = Math.pow(2, 32 - prefix);
    const usableHosts = prefix === 32 ? 1 : prefix === 31 ? 2 : Math.max(0, totalHosts - 2);
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

    // Visualización binaria
    const ipBin = intToBinary32(ipInt);
    const maskBin = intToBinary32(maskInt);
    const netBin = intToBinary32(networkInt);
    const bcBin = intToBinary32(broadcastInt);

    function colorizeBinary(bin, prefix) {
        const netPart = bin.slice(0, prefix);
        const hostPart = bin.slice(prefix);
        const octetize = (s) => {
            const out = [];
            for (let i = 0; i < s.length; i += 8) {
                out.push(s.slice(i, i + 8));
            }
            return out.join('.');
        };
        return `<span style="color:#5DADE2; font-weight:800;">${octetize(netPart)}</span>${prefix < 32 ? '.' : ''}<span style="color:#FB8C00;">${octetize(hostPart)}</span>`;
    }

    viz.innerHTML = `
        <div style="margin-bottom:12px;"><strong style="color:var(--azul-oscuro);">IP:</strong><br>${colorizeBinary(ipBin, prefix)}</div>
        <div style="margin-bottom:12px;"><strong style="color:var(--azul-oscuro);">Máscara:</strong><br><span style="color:#5DADE2; font-weight:800;">${binaryToDottedIP(maskBin)}</span></div>
        <div style="margin-bottom:12px;"><strong style="color:var(--azul-oscuro);">Red:</strong><br>${colorizeBinary(netBin, prefix)}</div>
        <div style="margin-bottom:12px;"><strong style="color:var(--azul-oscuro);">Broadcast:</strong><br>${colorizeBinary(bcBin, prefix)}</div>
        <div style="margin-top:14px; font-size:0.88em; color:var(--texto-secundario);">
            <span style="color:#5DADE2;">■</span> bits de red (${prefix})  &nbsp;·&nbsp;
            <span style="color:#FB8C00;">■</span> bits de host (${32 - prefix})
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
    if (ipInt === null || !origPrefix || !count) {
        stepsEl.innerHTML = `<div class="exercise-feedback wrong">❌ Comprueba los valores.</div>`;
        listEl.innerHTML = '';
        return;
    }

    // Bits necesarios
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

    // Generar lista de subredes
    let html = '<div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:12px;">';
    const base = (ipInt & ((0xFFFFFFFF << (32 - origPrefix)) >>> 0)) >>> 0;
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

// ===== Ejercicios de práctica =====

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
    const usable = prefix >= 31 ? totalHosts : totalHosts - 2;

    let question, answer, explanation, hint;

    if (type === 'findNetwork') {
        question = `¿Cuál es la dirección de red de ${ip1}/${prefix}?`;
        answer = intToIp(netInt);
        explanation = `Aplica la máscara ${prefixToMask(prefix)} a ${ip1} con AND binario.`;
        hint = `Pista: el incremento es ${256 - parseInt(prefixToMask(prefix).split('.').pop()) || 256}`;
    } else if (type === 'findBroadcast') {
        question = `¿Cuál es el broadcast de la red de ${ip1}/${prefix}?`;
        answer = intToIp(bcInt);
        explanation = `Es la última IP del bloque. Red ${intToIp(netInt)} + tamaño - 1.`;
        hint = `Pista: dirección de red + ${totalHosts - 1}`;
    } else if (type === 'countHosts') {
        question = `¿Cuántos hosts útiles tiene una subred /${prefix}?`;
        answer = String(usable);
        explanation = `2^(32-${prefix}) - 2 = ${totalHosts} - 2 = ${usable}`;
        hint = `Pista: 2 elevado a los bits de host, menos 2`;
    } else if (type === 'findMask') {
        question = `¿Cuál es la máscara decimal de /${prefix}?`;
        answer = prefixToMask(prefix);
        explanation = `${prefix} unos seguidos a la izquierda, ${32 - prefix} ceros a la derecha.`;
        hint = `Pista: los valores típicos son 128, 192, 224, 240, 248, 252...`;
    } else {
        const subnetsCount = [2, 4, 8, 16][Math.floor(Math.random() * 4)];
        const newP = prefix + Math.log2(subnetsCount);
        question = `Tengo la red 192.168.10.0/24 y necesito ${subnetsCount} subredes. ¿Qué prefijo nuevo necesito?`;
        answer = '/' + newP;
        explanation = `Para ${subnetsCount} subredes necesito ${Math.log2(subnetsCount)} bits. 24 + ${Math.log2(subnetsCount)} = /${newP}`;
        hint = `Pista: log₂(nº subredes) = bits a añadir`;
    }

    currentPractice = { question, answer, explanation, type };

    const area = document.getElementById('practiceArea');
    area.innerHTML = `
        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-type">🧮 Subnetting</span>
                <span class="exercise-xp">+20 XP</span>
            </div>
            <div class="exercise-question">${question}</div>
            <input type="text" class="exercise-input" id="practiceAnswer" placeholder="Tu respuesta..." onkeypress="if(event.key==='Enter') checkPractice()">
            <div style="display:flex; gap:10px; margin-top:12px;">
                <button class="btn" onclick="checkPractice()">✅ Comprobar</button>
                <button class="btn btn-secondary" onclick="showHint('${hint.replace(/'/g, "\\'")}')">💡 Pista</button>
            </div>
            <div id="practiceFeedback"></div>
        </div>
    `;
}

function showHint(hint) {
    document.getElementById('practiceFeedback').innerHTML = `<div class="info-box">${hint}</div>`;
}

function checkPractice() {
    if (!currentPractice) return;
    const input = document.getElementById('practiceAnswer');
    const val = input.value.trim();
    if (!val) return;

    const normalize = (s) => s.replace(/\s/g, '').toLowerCase();
    const isCorrect = normalize(val) === normalize(currentPractice.answer);
    const fb = document.getElementById('practiceFeedback');

    if (isCorrect) {
        addXP(20, '¡Ejercicio de subnetting acertado!');
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
}

// ===== Tabla rápida =====

function renderQuickRefTable() {
    const tbody = document.getElementById('quickRefTable');
    if (!tbody) return;
    let html = '';
    for (let p = 8; p <= 32; p++) {
        const mask = prefixToMask(p);
        const wildcard = intToIp((~((0xFFFFFFFF << (32 - p)) >>> 0)) >>> 0);
        const hostBits = 32 - p;
        const hosts = p >= 31 ? (p === 31 ? 2 : 1) : Math.pow(2, hostBits) - 2;
        const subnets24 = p >= 24 ? Math.pow(2, p - 24) : '';
        const lastOctet = parseInt(mask.split('.')[3]);
        const lastOctetMask = parseInt(mask.split('.')[2]);
        let increment;
        if (p === 32) increment = 1;
        else if (p > 24) increment = 256 - lastOctet;
        else if (p === 24) increment = '256 (octeto 4)';
        else if (p > 16) increment = `${256 - lastOctetMask} (octeto 3)`;
        else if (p === 16) increment = '256 (octeto 3)';
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
