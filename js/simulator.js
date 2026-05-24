/* ============================================
   SIMULATOR.JS - Simulador de red v3 (canvas grande + zoom + tutorial)
   ============================================ */

let simState = {
    devices: [],
    connections: [],
    mode: 'select',
    selectedDevice: null,
    connectingFrom: null,
    deviceCounter: 0,
    connCounter: 0,
    consoleLog: [],
    zoom: 1,
    toolboxCollapsed: false
};

const SIM_ZOOM_MIN = 0.4;
const SIM_ZOOM_MAX = 2.0;
const SIM_ZOOM_STEP = 0.1;
const SIM_CANVAS_W = 2000;
const SIM_CANVAS_H = 1400;

// ===== INICIALIZACIÓN =====

function renderSimulator() {
    renderSimToolbox();
    renderScenarios();
    setupCanvasListeners();
    loadLastTopology();
    applyZoom();
    // Mostrar tutorial la primera vez
    if (typeof maybeShowTutorial === 'function') {
        maybeShowTutorial('simulator');
    }
}

function renderSimToolbox() {
    const tb = document.getElementById('simToolbox');
    if (!tb) return;

    const cats = {};
    Object.entries(SIM_DEVICE_TYPES).forEach(([key, dev]) => {
        if (!cats[dev.category]) cats[dev.category] = [];
        cats[dev.category].push({ key, ...dev });
    });

    let html = `
        <div class="sim-toolbox-title">
            <span class="sim-toolbox-title-text">🧰 Dispositivos</span>
            <button class="sim-toolbox-toggle" onclick="toggleToolbox()" title="Plegar/desplegar">${simState.toolboxCollapsed ? '▶' : '◀'}</button>
        </div>
    `;
    Object.entries(cats).forEach(([catName, items]) => {
        html += `<div class="sim-device-category">
            <div class="sim-device-category-title">${catName}</div>`;
        items.forEach(it => {
            html += `
                <button class="sim-device-btn" draggable="true"
                        data-device-type="${it.key}"
                        ondragstart="onDeviceDragStart(event, '${it.key}')"
                        onclick="addDeviceToCanvas('${it.key}', null, null)"
                        title="${it.label}">
                    <span style="font-size:1.6em;">${it.icon}</span>
                    <span class="sim-device-btn-label">${it.label}</span>
                </button>
            `;
        });
        html += `</div>`;
    });

    tb.innerHTML = html;
    if (simState.toolboxCollapsed) tb.classList.add('collapsed');
}

function toggleToolbox() {
    simState.toolboxCollapsed = !simState.toolboxCollapsed;
    renderSimToolbox();
}

// ===== ZOOM =====

function applyZoom() {
    const canvas = document.getElementById('simCanvas');
    if (!canvas) return;
    canvas.style.transform = `scale(${simState.zoom})`;
    const zl = document.getElementById('zoomLevel');
    if (zl) zl.textContent = Math.round(simState.zoom * 100) + '%';
}

function zoomIn() {
    simState.zoom = Math.min(SIM_ZOOM_MAX, simState.zoom + SIM_ZOOM_STEP);
    applyZoom();
}

function zoomOut() {
    simState.zoom = Math.max(SIM_ZOOM_MIN, simState.zoom - SIM_ZOOM_STEP);
    applyZoom();
}

function zoomReset() {
    simState.zoom = 1;
    applyZoom();
    centerCanvas();
}

function centerCanvas() {
    const scroll = document.getElementById('simCanvasScroll');
    if (!scroll) return;
    // Centra en el medio del canvas
    scroll.scrollLeft = (SIM_CANVAS_W * simState.zoom - scroll.clientWidth) / 2;
    scroll.scrollTop = (SIM_CANVAS_H * simState.zoom - scroll.clientHeight) / 2;
}

function renderScenarios() {
    const grid = document.getElementById('scenariosGrid');
    if (!grid) return;
    grid.innerHTML = SCENARIOS.map(s => `
        <div class="scenario-card" onclick="loadScenario('${s.id}')">
            <div class="scenario-icon">${s.icon}</div>
            <div class="scenario-title">${s.title}</div>
            <div class="scenario-desc">${s.desc}</div>
            <div class="scenario-difficulty ${s.difficulty}">
                ${s.difficulty === 'easy' ? '🟢 Fácil' : s.difficulty === 'medium' ? '🟡 Medio' : '🔴 Difícil'}
            </div>
        </div>
    `).join('');
}

function setupCanvasListeners() {
    const canvas = document.getElementById('simCanvas');
    if (!canvas) return;
    canvas.addEventListener('dragover', e => e.preventDefault());
    canvas.addEventListener('drop', onCanvasDrop);
}

// ===== DRAG & DROP DESDE TOOLBOX =====

let draggingDeviceType = null;
function onDeviceDragStart(e, type) {
    draggingDeviceType = type;
    e.dataTransfer.effectAllowed = 'copy';
}

function onCanvasDrop(e) {
    e.preventDefault();
    if (!draggingDeviceType) return;
    const canvas = document.getElementById('simCanvas');
    const rect = canvas.getBoundingClientRect();
    // El canvas tiene transform: scale(zoom), rect.width refleja eso. Dividimos para obtener coords lógicas.
    const x = (e.clientX - rect.left) / simState.zoom - 45;
    const y = (e.clientY - rect.top) / simState.zoom - 45;
    addDeviceToCanvas(draggingDeviceType, x, y);
    draggingDeviceType = null;
}

// ===== AÑADIR DISPOSITIVO =====

function addDeviceToCanvas(type, x, y) {
    const devType = SIM_DEVICE_TYPES[type];
    if (!devType) return;

    simState.deviceCounter++;

    // Usamos las constantes del canvas, no rect (porque rect se altera con el zoom)
    if (x === null || x === undefined) x = 100 + Math.random() * (SIM_CANVAS_W - 300);
    if (y === null || y === undefined) y = 100 + Math.random() * (SIM_CANVAS_H - 300);

    x = Math.max(0, Math.min(SIM_CANVAS_W - 110, x));
    y = Math.max(0, Math.min(SIM_CANVAS_H - 130, y));

    const id = `dev-${simState.deviceCounter}`;
    const name = `${devType.label}${simState.deviceCounter}`;

    const device = {
        id, type, name, x, y,
        config: {
            ip: '',
            mask: devType.defaultMask || '',
            gateway: '',
            dns: '',
            ssid: devType.defaultSSID || '',
            wifiPass: '',
            band: '2.4',
            vlan: ''
        },
        interfaces: type === 'router' ? [
            { id: 'g0/0', ip: '', mask: '' },
            { id: 'g0/1', ip: '', mask: '' }
        ] : null
    };

    simState.devices.push(device);
    renderDevice(device);
    logToConsole(`✅ Añadido ${name} (${devType.label})`, 'success');
    saveCanvasState();
}

function renderDevice(device) {
    const canvas = document.getElementById('simCanvas');
    const devType = SIM_DEVICE_TYPES[device.type];
    const el = document.createElement('div');
    el.className = 'sim-device';
    el.id = device.id;
    el.style.left = device.x + 'px';
    el.style.top = device.y + 'px';

    el.innerHTML = `
        <div class="sim-device-body">
            <span style="font-size:2em;">${devType.icon}</span>
            <div class="sim-device-led ${device.config.ip ? 'on' : ''}"></div>
        </div>
        <div class="sim-device-label">${device.name}</div>
        ${device.config.ip ? `<div class="sim-device-ip">${device.config.ip}</div>` : ''}
    `;
    el.addEventListener('mousedown', (e) => onDeviceMouseDown(e, device.id));
    el.addEventListener('click', (e) => {
        e.stopPropagation();
        onDeviceClick(device.id);
    });
    canvas.appendChild(el);
}

function updateDeviceVisual(deviceId) {
    const device = simState.devices.find(d => d.id === deviceId);
    if (!device) return;
    const el = document.getElementById(deviceId);
    if (!el) return;
    const devType = SIM_DEVICE_TYPES[device.type];

    el.style.left = device.x + 'px';
    el.style.top = device.y + 'px';
    el.innerHTML = `
        <div class="sim-device-body">
            <span style="font-size:2em;">${devType.icon}</span>
            <div class="sim-device-led ${device.config.ip || !devType.configurable ? 'on' : ''}"></div>
        </div>
        <div class="sim-device-label">${device.name}</div>
        ${device.config.ip ? `<div class="sim-device-ip">${device.config.ip}</div>` : ''}
    `;
    el.addEventListener('mousedown', (e) => onDeviceMouseDown(e, deviceId));
    el.addEventListener('click', (e) => {
        e.stopPropagation();
        onDeviceClick(deviceId);
    });
    if (simState.selectedDevice === deviceId) {
        el.classList.add('selected');
    }
}

// ===== MOVER DISPOSITIVOS =====

let dragging = null;
function onDeviceMouseDown(e, deviceId) {
    if (simState.mode !== 'select') return;
    e.preventDefault();
    const device = simState.devices.find(d => d.id === deviceId);
    if (!device) return;
    const canvas = document.getElementById('simCanvas');
    const rect = canvas.getBoundingClientRect();
    // Coordenadas lógicas teniendo en cuenta el zoom
    const z = simState.zoom || 1;
    dragging = {
        id: deviceId,
        offsetX: (e.clientX - rect.left) / z - device.x,
        offsetY: (e.clientY - rect.top) / z - device.y
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}

function onMouseMove(e) {
    if (!dragging) return;
    const canvas = document.getElementById('simCanvas');
    const rect = canvas.getBoundingClientRect();
    const device = simState.devices.find(d => d.id === dragging.id);
    if (!device) return;
    const z = simState.zoom || 1;
    let newX = (e.clientX - rect.left) / z - dragging.offsetX;
    let newY = (e.clientY - rect.top) / z - dragging.offsetY;
    newX = Math.max(0, Math.min(SIM_CANVAS_W - 110, newX));
    newY = Math.max(0, Math.min(SIM_CANVAS_H - 130, newY));
    device.x = newX;
    device.y = newY;
    const el = document.getElementById(device.id);
    el.style.left = newX + 'px';
    el.style.top = newY + 'px';
    redrawConnections();
}

function onMouseUp() {
    if (dragging) {
        dragging = null;
        saveCanvasState();
    }
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
}

// ===== CLICK SOBRE DISPOSITIVO =====

function onDeviceClick(deviceId) {
    if (simState.mode === 'delete') {
        deleteDevice(deviceId);
        return;
    }
    if (simState.mode === 'connect') {
        if (!simState.connectingFrom) {
            simState.connectingFrom = deviceId;
            document.getElementById(deviceId)?.classList.add('selected');
            logToConsole(`🔗 Selecciona el segundo dispositivo para conectar...`, 'info');
        } else if (simState.connectingFrom === deviceId) {
            document.getElementById(deviceId)?.classList.remove('selected');
            simState.connectingFrom = null;
            logToConsole(`Conexión cancelada.`, 'warn');
        } else {
            createConnection(simState.connectingFrom, deviceId);
            document.getElementById(simState.connectingFrom)?.classList.remove('selected');
            simState.connectingFrom = null;
        }
        return;
    }
    // Modo select: abrir panel
    selectDevice(deviceId);
}

function selectDevice(deviceId) {
    if (simState.selectedDevice) {
        document.getElementById(simState.selectedDevice)?.classList.remove('selected');
    }
    simState.selectedDevice = deviceId;
    document.getElementById(deviceId)?.classList.add('selected');
    renderConfigPanel(deviceId);
}

// ===== MODO =====

function setSimMode(mode) {
    simState.mode = mode;
    if (simState.connectingFrom) {
        document.getElementById(simState.connectingFrom)?.classList.remove('selected');
        simState.connectingFrom = null;
    }
    document.querySelectorAll('.sim-toolbar-btn').forEach(b => b.classList.remove('active'));
    if (mode === 'select') document.getElementById('modeSelect')?.classList.add('active');
    if (mode === 'connect') document.getElementById('modeConnect')?.classList.add('active');
    if (mode === 'delete') document.getElementById('modeDelete')?.classList.add('active');

    const canvas = document.getElementById('simCanvas');
    canvas.classList.remove('connecting', 'deleting');
    if (mode === 'connect') canvas.classList.add('connecting');
    if (mode === 'delete') canvas.classList.add('deleting');
}

// ===== CONEXIONES =====

function createConnection(fromId, toId) {
    // Comprobar si ya existe
    const exists = simState.connections.some(c =>
        (c.from === fromId && c.to === toId) || (c.from === toId && c.to === fromId));
    if (exists) {
        logToConsole(`⚠️ Ya existen una conexión entre esos dispositivos.`, 'warn');
        return;
    }

    const fromDev = simState.devices.find(d => d.id === fromId);
    const toDev = simState.devices.find(d => d.id === toId);
    if (!fromDev || !toDev) return;

    const fromType = SIM_DEVICE_TYPES[fromDev.type];
    const toType = SIM_DEVICE_TYPES[toDev.type];

    // Determinar tipo de conexión
    let connType = 'normal';
    if (fromType.wireless && toType.wireless) connType = 'wireless';
    else if (fromType.wireless || toType.wireless) {
        // Solo wireless si uno de los dos es smartphone/laptop+AP
        if ((fromDev.type === 'ap' && (toDev.type === 'laptop' || toDev.type === 'smartphone')) ||
            (toDev.type === 'ap' && (fromDev.type === 'laptop' || fromDev.type === 'smartphone'))) {
            connType = 'wireless';
        }
    }

    // Detectar si necesita cable cruzado
    const sameType = (fromDev.type === 'pc' && toDev.type === 'pc') ||
                     (fromDev.type === 'switch' && toDev.type === 'switch') ||
                     (fromDev.type === 'router' && toDev.type === 'router');
    if (sameType && connType !== 'wireless') connType = 'crossover';

    simState.connCounter++;
    const conn = {
        id: `conn-${simState.connCounter}`,
        from: fromId,
        to: toId,
        type: connType
    };
    simState.connections.push(conn);
    redrawConnections();
    logToConsole(`🔌 Conectado ${fromDev.name} ↔ ${toDev.name} (${connType === 'wireless' ? 'inalámbrico' : connType === 'crossover' ? 'cable cruzado' : 'cable directo'})`, 'success');
    saveCanvasState();
}

function redrawConnections() {
    const svg = document.getElementById('simConnections');
    if (!svg) return;
    svg.innerHTML = '';
    simState.connections.forEach(c => {
        const from = simState.devices.find(d => d.id === c.from);
        const to = simState.devices.find(d => d.id === c.to);
        if (!from || !to) return;
        const x1 = from.x + 45;
        const y1 = from.y + 35;
        const x2 = to.x + 45;
        const y2 = to.y + 35;
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('class', `sim-connection ${c.type === 'wireless' ? 'wireless' : c.type === 'crossover' ? 'crossover' : ''}`);
        line.setAttribute('data-conn-id', c.id);
        line.addEventListener('click', () => {
            if (simState.mode === 'delete') deleteConnection(c.id);
        });
        svg.appendChild(line);
    });
}

function deleteConnection(connId) {
    simState.connections = simState.connections.filter(c => c.id !== connId);
    redrawConnections();
    logToConsole(`🗑️ Conexión eliminada.`, 'warn');
    saveCanvasState();
}

function deleteDevice(deviceId) {
    const dev = simState.devices.find(d => d.id === deviceId);
    if (!dev) return;
    simState.devices = simState.devices.filter(d => d.id !== deviceId);
    simState.connections = simState.connections.filter(c => c.from !== deviceId && c.to !== deviceId);
    document.getElementById(deviceId)?.remove();
    redrawConnections();
    if (simState.selectedDevice === deviceId) {
        simState.selectedDevice = null;
        renderConfigPanel(null);
    }
    logToConsole(`🗑️ Eliminado ${dev.name}.`, 'warn');
    saveCanvasState();
}

// ===== PANEL DE CONFIGURACIÓN =====

function renderConfigPanel(deviceId) {
    const panel = document.getElementById('simConfigPanel');
    if (!panel) return;

    if (!deviceId) {
        panel.innerHTML = `
            <div class="sim-config-empty">
                <div class="sim-config-empty-icon">🖱️</div>
                <p>Selecciona un dispositivo para configurarlo</p>
            </div>
        `;
        return;
    }

    const device = simState.devices.find(d => d.id === deviceId);
    if (!device) return;
    const devType = SIM_DEVICE_TYPES[device.type];

    let configHtml = '';

    if (!devType.configurable && device.type !== 'switch' && device.type !== 'hub') {
        configHtml = `<div class="info-box">Este dispositivo no necesita configuración IP.</div>`;
    } else if (device.type === 'switch' || device.type === 'hub') {
        configHtml = `
            <div class="info-box">📌 Los ${devType.label}s tradicionales (L2) no necesitan configuración IP. Funcionan en capa de enlace usando MACs.</div>
            <div class="sim-config-group">
                <label class="sim-config-label">Puertos</label>
                <input type="text" class="sim-config-input" value="${devType.ports} puertos" readonly>
            </div>
        `;
    } else if (device.type === 'ap') {
        configHtml = `
            <div class="sim-config-group">
                <label class="sim-config-label">SSID (nombre WiFi)</label>
                <input type="text" class="sim-config-input" id="cfg-ssid" value="${device.config.ssid}" oninput="updateConfig('${deviceId}', 'ssid', this.value)">
            </div>
            <div class="sim-config-group">
                <label class="sim-config-label">Contraseña</label>
                <input type="text" class="sim-config-input" id="cfg-pass" value="${device.config.wifiPass}" placeholder="Mínimo 8 caracteres" oninput="updateConfig('${deviceId}', 'wifiPass', this.value)">
            </div>
            <div class="sim-config-group">
                <label class="sim-config-label">Banda</label>
                <div class="sim-config-radio-group">
                    <button class="sim-config-radio ${device.config.band === '2.4' ? 'active' : ''}" onclick="updateConfig('${deviceId}', 'band', '2.4')">2.4 GHz</button>
                    <button class="sim-config-radio ${device.config.band === '5' ? 'active' : ''}" onclick="updateConfig('${deviceId}', 'band', '5')">5 GHz</button>
                </div>
            </div>
            <div class="sim-config-group">
                <label class="sim-config-label">IP de gestión</label>
                <input type="text" class="sim-config-input" id="cfg-ip" value="${device.config.ip}" placeholder="Ej: 192.168.1.2" oninput="updateConfig('${deviceId}', 'ip', this.value)">
                <div id="ipMsg-${deviceId}" class="sim-validation-msg" style="display:none;"></div>
            </div>
        `;
    } else if (device.type === 'router') {
        configHtml = `
            <div class="info-box">🛜 Configura las interfaces del router. LAN va a tu red interna; WAN a internet.</div>
            ${device.interfaces.map((iface, idx) => `
                <div class="sim-config-group" style="border-left:3px solid var(--azul-medio); padding-left:12px;">
                    <label class="sim-config-label">${iface.id} — ${idx === 0 ? '🏠 LAN' : '🌐 WAN'}</label>
                    <input type="text" class="sim-config-input" value="${iface.ip}" placeholder="IP de interfaz" oninput="updateRouterIface('${deviceId}', ${idx}, 'ip', this.value)" style="margin-bottom:6px;">
                    <input type="text" class="sim-config-input" value="${iface.mask}" placeholder="Máscara" oninput="updateRouterIface('${deviceId}', ${idx}, 'mask', this.value)">
                </div>
            `).join('')}
            <div class="sim-config-group">
                <label class="sim-config-label">DNS</label>
                <input type="text" class="sim-config-input" value="${device.config.dns}" placeholder="Ej: 8.8.8.8" oninput="updateConfig('${deviceId}', 'dns', this.value)">
            </div>
        `;
    } else if (device.type === 'firewall') {
        configHtml = `
            <div class="info-box">🛡️ Firewall: filtra tráfico según reglas. En este simulador es decorativo, pero indica seguridad en tu diseño.</div>
            <div class="sim-config-group">
                <label class="sim-config-label">IP de gestión</label>
                <input type="text" class="sim-config-input" value="${device.config.ip}" placeholder="Ej: 192.168.1.254" oninput="updateConfig('${deviceId}', 'ip', this.value)">
            </div>
        `;
    } else {
        // PC, laptop, server, printer, smartphone
        configHtml = `
            <div class="sim-config-group">
                <label class="sim-config-label">Dirección IP</label>
                <input type="text" class="sim-config-input" id="cfg-ip" value="${device.config.ip}" placeholder="Ej: 192.168.1.10" oninput="updateConfig('${deviceId}', 'ip', this.value)">
                <div id="ipMsg-${deviceId}" class="sim-validation-msg" style="display:none;"></div>
            </div>
            <div class="sim-config-group">
                <label class="sim-config-label">Máscara de subred</label>
                <input type="text" class="sim-config-input" value="${device.config.mask}" placeholder="Ej: 255.255.255.0" oninput="updateConfig('${deviceId}', 'mask', this.value)">
            </div>
            <div class="sim-config-group">
                <label class="sim-config-label">Puerta de enlace</label>
                <input type="text" class="sim-config-input" value="${device.config.gateway}" placeholder="Ej: 192.168.1.1" oninput="updateConfig('${deviceId}', 'gateway', this.value)">
            </div>
            <div class="sim-config-group">
                <label class="sim-config-label">DNS</label>
                <input type="text" class="sim-config-input" value="${device.config.dns}" placeholder="Ej: 8.8.8.8" oninput="updateConfig('${deviceId}', 'dns', this.value)">
            </div>
            <div class="sim-config-group">
                <label class="sim-config-label">VLAN (opcional)</label>
                <input type="text" class="sim-config-input" value="${device.config.vlan}" placeholder="Ej: 10" oninput="updateConfig('${deviceId}', 'vlan', this.value)">
            </div>
        `;
    }

    panel.innerHTML = `
        <div class="sim-config-title">
            <span style="font-size:1.4em;">${devType.icon}</span>
            <span>${device.name}</span>
        </div>
        <div class="sim-config-group">
            <label class="sim-config-label">Nombre</label>
            <input type="text" class="sim-config-input" value="${device.name}" oninput="updateDeviceName('${deviceId}', this.value)">
        </div>
        ${configHtml}
        <div class="sim-config-actions">
            ${devType.canPing ? `<button class="sim-action-btn primary" onclick="pingFrom('${deviceId}')">📡 Ping desde aquí</button>` : ''}
            <button class="sim-action-btn danger" onclick="deleteDevice('${deviceId}')">🗑️ Eliminar dispositivo</button>
        </div>
        <div class="sim-console" id="simConsole">
            ${simState.consoleLog.slice(-12).map(l => `<div class="sim-console-line ${l.type}">${l.msg}</div>`).join('')}
        </div>
    `;

    validateIPField(deviceId);
}

function updateConfig(deviceId, key, value) {
    const device = simState.devices.find(d => d.id === deviceId);
    if (!device) return;
    device.config[key] = value;
    if (key === 'ip') {
        validateIPField(deviceId);
        updateDeviceVisual(deviceId);
    }
    saveCanvasState();
}

function updateRouterIface(deviceId, idx, key, value) {
    const device = simState.devices.find(d => d.id === deviceId);
    if (!device || !device.interfaces) return;
    device.interfaces[idx][key] = value;
    // La IP "principal" del router es la de la primera interfaz (LAN)
    if (idx === 0 && key === 'ip') {
        device.config.ip = value;
        updateDeviceVisual(deviceId);
    }
    saveCanvasState();
}

function updateDeviceName(deviceId, name) {
    const device = simState.devices.find(d => d.id === deviceId);
    if (!device) return;
    device.name = name || device.name;
    updateDeviceVisual(deviceId);
    saveCanvasState();
}

function validateIPField(deviceId) {
    const device = simState.devices.find(d => d.id === deviceId);
    const msgEl = document.getElementById(`ipMsg-${deviceId}`);
    if (!device || !msgEl) return;
    if (!device.config.ip) {
        msgEl.style.display = 'none';
        return;
    }
    const valid = isValidIP(device.config.ip);
    if (!valid) {
        msgEl.style.display = 'block';
        msgEl.className = 'sim-validation-msg error';
        msgEl.textContent = '❌ Formato de IP inválido';
        return;
    }
    // Comprobar conflictos
    const conflict = simState.devices.find(d => d.id !== deviceId && d.config.ip === device.config.ip);
    if (conflict) {
        msgEl.style.display = 'block';
        msgEl.className = 'sim-validation-msg error';
        msgEl.textContent = `❌ IP duplicada (también en ${conflict.name})`;
        return;
    }
    msgEl.style.display = 'block';
    msgEl.className = 'sim-validation-msg success';
    msgEl.textContent = '✅ IP válida y única';
}

function isValidIP(ip) {
    if (!ip) return false;
    const parts = ip.split('.');
    if (parts.length !== 4) return false;
    return parts.every(p => {
        const n = parseInt(p);
        return !isNaN(n) && n >= 0 && n <= 255 && String(n) === p;
    });
}

// ===== PING (con modal bonito) =====

let pingModalState = { from: null, to: null, step: 'from' };

function pingFrom(deviceId) {
    pingModalState = { from: deviceId, to: null, step: 'to' };
    openPingModal();
}

function openPingModal() {
    const pingable = simState.devices.filter(d =>
        SIM_DEVICE_TYPES[d.type].canPing && d.config.ip
    );
    if (pingable.length < 2) {
        logToConsole(`❌ Necesitas al menos 2 dispositivos con IP configurada.`, 'error');
        if (simState.selectedDevice) renderConfigPanel(simState.selectedDevice);
        return;
    }

    // Si no hay 'from' preseleccionado, empezar por elegir origen
    if (!pingModalState.from) pingModalState.step = 'from';

    renderPingModalBody();
    document.getElementById('pingModal').classList.add('active');
}

function renderPingModalBody() {
    const body = document.getElementById('pingModalBody');
    const pingable = simState.devices.filter(d =>
        SIM_DEVICE_TYPES[d.type].canPing && d.config.ip
    );

    if (pingModalState.step === 'from') {
        body.innerHTML = `
            <div class="modal-step">Paso 1 de 2 — Selecciona el ORIGEN del ping</div>
            <div class="modal-device-list">
                ${pingable.map(d => {
                    const devType = SIM_DEVICE_TYPES[d.type];
                    return `
                        <button class="modal-device-option" onclick="selectPingFrom('${d.id}')">
                            <span class="device-icon-mini">${devType.icon}</span>
                            <div class="device-info-mini">
                                <div class="device-name-mini">${d.name}</div>
                                <div class="device-ip-mini">${d.config.ip}</div>
                            </div>
                        </button>
                    `;
                }).join('')}
            </div>
        `;
    } else {
        const from = simState.devices.find(d => d.id === pingModalState.from);
        const targets = pingable.filter(d => d.id !== pingModalState.from);
        body.innerHTML = `
            <div class="modal-step">Paso 2 de 2 — Origen: <strong>${from?.name}</strong>. Selecciona el DESTINO</div>
            <div class="modal-device-list">
                ${targets.map(d => {
                    const devType = SIM_DEVICE_TYPES[d.type];
                    return `
                        <button class="modal-device-option" onclick="selectPingTo('${d.id}')">
                            <span class="device-icon-mini">${devType.icon}</span>
                            <div class="device-info-mini">
                                <div class="device-name-mini">${d.name}</div>
                                <div class="device-ip-mini">${d.config.ip}</div>
                            </div>
                        </button>
                    `;
                }).join('')}
            </div>
            <button class="btn btn-secondary" onclick="resetPingModalToFrom()">← Cambiar origen</button>
        `;
    }
}

function selectPingFrom(deviceId) {
    pingModalState.from = deviceId;
    pingModalState.step = 'to';
    renderPingModalBody();
}

function selectPingTo(deviceId) {
    pingModalState.to = deviceId;
    closePingModal();
    sendPingBetween(pingModalState.from, deviceId);
}

function resetPingModalToFrom() {
    pingModalState.from = null;
    pingModalState.step = 'from';
    renderPingModalBody();
}

function closePingModal() {
    const m = document.getElementById('pingModal');
    if (m) m.classList.remove('active');
    pingModalState = { from: null, to: null, step: 'from' };
}

function closePingModalOnOverlay(e) {
    if (e.target.id === 'pingModal') closePingModal();
}

function sendPing() {
    pingModalState = { from: null, to: null, step: 'from' };
    openPingModal();
}

function sendPingBetween(fromId, toId) {
    const from = simState.devices.find(d => d.id === fromId);
    const to = simState.devices.find(d => d.id === toId);
    if (!from || !to) return;

    logToConsole(`📡 Ping desde ${from.name} (${from.config.ip}) → ${to.name} (${to.config.ip})...`, 'system');

    // Validaciones
    if (!from.config.ip || !to.config.ip) {
        logToConsole(`❌ Uno de los dispositivos no tiene IP configurada.`, 'error');
        if (simState.selectedDevice) renderConfigPanel(simState.selectedDevice);
        return;
    }

    if (!isValidIP(from.config.ip) || !isValidIP(to.config.ip)) {
        logToConsole(`❌ Una de las IPs tiene formato inválido.`, 'error');
        if (simState.selectedDevice) renderConfigPanel(simState.selectedDevice);
        return;
    }

    // Comprobar si hay camino físico
    const path = findPath(fromId, toId);
    if (!path) {
        logToConsole(`❌ No hay conexión física entre ${from.name} y ${to.name}.`, 'error');
        if (simState.selectedDevice) renderConfigPanel(simState.selectedDevice);
        return;
    }

    // Comprobar misma subred
    const sameNet = isSameSubnet(from.config.ip, from.config.mask, to.config.ip);
    if (!sameNet) {
        // Necesitaría enrutar: comprobar gateway
        if (!from.config.gateway) {
            logToConsole(`❌ ${from.name} no tiene puerta de enlace y los equipos están en subredes distintas.`, 'error');
            if (simState.selectedDevice) renderConfigPanel(simState.selectedDevice);
            return;
        }
        // En este simulador básico, asumimos que si hay gateway y hay router en el path, va bien
        const hasRouter = path.some(id => simState.devices.find(d => d.id === id)?.type === 'router');
        if (!hasRouter) {
            logToConsole(`❌ Equipos en subredes distintas pero sin router en el camino.`, 'error');
            if (simState.selectedDevice) renderConfigPanel(simState.selectedDevice);
            return;
        }
    }

    // Comprobar VLANs si están definidas
    if (from.config.vlan && to.config.vlan && from.config.vlan !== to.config.vlan) {
        logToConsole(`❌ Los equipos están en VLANs distintas (${from.config.vlan} ≠ ${to.config.vlan}) y no hay routing inter-VLAN configurado.`, 'error');
        if (simState.selectedDevice) renderConfigPanel(simState.selectedDevice);
        return;
    }

    // ¡Éxito!
    animatePacket(from, to, () => {
        const latency = 5 + Math.floor(Math.random() * 30);
        logToConsole(`✅ Respuesta de ${to.config.ip}: bytes=32 tiempo=${latency}ms TTL=64`, 'success');
        logToConsole(`✅ Respuesta de ${to.config.ip}: bytes=32 tiempo=${latency + 2}ms TTL=64`, 'success');
        logToConsole(`✅ Respuesta de ${to.config.ip}: bytes=32 tiempo=${latency - 1}ms TTL=64`, 'success');
        logToConsole(`📊 Estadísticas: 4 enviados, 4 recibidos, 0% pérdida`, 'system');
        if (simState.selectedDevice) renderConfigPanel(simState.selectedDevice);
        addXP(15, '¡Ping exitoso! Tu red funciona');
    });
}

function findPath(fromId, toId) {
    // BFS sobre las conexiones
    const visited = new Set([fromId]);
    const queue = [[fromId]];
    while (queue.length > 0) {
        const path = queue.shift();
        const last = path[path.length - 1];
        if (last === toId) return path;
        const neighbors = simState.connections
            .filter(c => c.from === last || c.to === last)
            .map(c => c.from === last ? c.to : c.from);
        for (const n of neighbors) {
            if (!visited.has(n)) {
                visited.add(n);
                queue.push([...path, n]);
            }
        }
    }
    return null;
}

function isSameSubnet(ip1, mask, ip2) {
    if (!isValidIP(ip1) || !isValidIP(ip2) || !isValidIP(mask)) return false;
    const i1 = ipToInt(ip1);
    const i2 = ipToInt(ip2);
    const m = ipToInt(mask);
    return ((i1 & m) >>> 0) === ((i2 & m) >>> 0);
}

function animatePacket(from, to, callback) {
    const svg = document.getElementById('simConnections');
    const path = findPath(from.id, to.id);
    if (!path || path.length < 2) {
        callback();
        return;
    }

    let stepIdx = 0;
    function animateStep() {
        if (stepIdx >= path.length - 1) {
            callback();
            return;
        }
        const f = simState.devices.find(d => d.id === path[stepIdx]);
        const t = simState.devices.find(d => d.id === path[stepIdx + 1]);
        const packet = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        packet.setAttribute('r', 7);
        packet.setAttribute('class', 'sim-packet');
        packet.setAttribute('cx', f.x + 45);
        packet.setAttribute('cy', f.y + 35);
        svg.appendChild(packet);
        const start = performance.now();
        const duration = 400;
        function frame(now) {
            const t01 = Math.min(1, (now - start) / duration);
            packet.setAttribute('cx', f.x + 45 + (t.x - f.x) * t01);
            packet.setAttribute('cy', f.y + 35 + (t.y - f.y) * t01);
            if (t01 < 1) {
                requestAnimationFrame(frame);
            } else {
                packet.remove();
                stepIdx++;
                animateStep();
            }
        }
        requestAnimationFrame(frame);
    }
    animateStep();
}

// ===== CONSOLA =====

function logToConsole(msg, type = 'info') {
    simState.consoleLog.push({ msg, type });
    if (simState.consoleLog.length > 100) simState.consoleLog.shift();
    const cons = document.getElementById('simConsole');
    if (cons) {
        cons.innerHTML = simState.consoleLog.slice(-12).map(l =>
            `<div class="sim-console-line ${l.type}">${l.msg}</div>`
        ).join('');
        cons.scrollTop = cons.scrollHeight;
    }
}

// ===== GUARDADO / CARGA =====

function saveCanvasState() {
    localStorage.setItem('redacademia_canvas', JSON.stringify({
        devices: simState.devices,
        connections: simState.connections,
        deviceCounter: simState.deviceCounter,
        connCounter: simState.connCounter
    }));
}

function loadLastTopology() {
    try {
        const s = localStorage.getItem('redacademia_canvas');
        if (!s) return;
        const data = JSON.parse(s);
        simState.devices = data.devices || [];
        simState.connections = data.connections || [];
        simState.deviceCounter = data.deviceCounter || 0;
        simState.connCounter = data.connCounter || 0;
        const canvas = document.getElementById('simCanvas');
        // Limpiar dispositivos anteriores del DOM
        canvas.querySelectorAll('.sim-device').forEach(el => el.remove());
        simState.devices.forEach(d => renderDevice(d));
        redrawConnections();
    } catch (e) {
        console.warn('No se pudo cargar la topología:', e);
    }
}

function saveTopology() {
    const modal = document.getElementById('saveModal');
    const input = document.getElementById('saveTopologyName');
    if (modal && input) {
        input.value = `Topología ${new Date().toLocaleString()}`;
        modal.classList.add('active');
        setTimeout(() => input.focus(), 100);
    }
}

function confirmSaveTopology() {
    const input = document.getElementById('saveTopologyName');
    const name = input?.value.trim();
    if (!name) return;
    const topology = {
        name,
        timestamp: Date.now(),
        devices: simState.devices,
        connections: simState.connections,
        deviceCounter: simState.deviceCounter,
        connCounter: simState.connCounter
    };
    userProgress.savedTopologies = userProgress.savedTopologies || [];
    userProgress.savedTopologies.push(topology);
    saveProgress();
    addXP(30, `Topología "${name}" guardada`);
    logToConsole(`💾 Topología guardada: ${name}`, 'success');
    closeSaveModal();
}

function closeSaveModal() {
    const m = document.getElementById('saveModal');
    if (m) m.classList.remove('active');
}

function closeSaveModalOnOverlay(e) {
    if (e.target.id === 'saveModal') closeSaveModal();
}

function clearCanvas() {
    if (!confirm('¿Borrar todo el canvas?')) return;
    simState.devices = [];
    simState.connections = [];
    simState.selectedDevice = null;
    simState.deviceCounter = 0;
    simState.connCounter = 0;
    simState.consoleLog = [];
    const canvas = document.getElementById('simCanvas');
    canvas.querySelectorAll('.sim-device').forEach(el => el.remove());
    redrawConnections();
    renderConfigPanel(null);
    saveCanvasState();
    logToConsole(`🧹 Canvas limpio.`, 'system');
}

// ===== ESCENARIOS PRE-CARGADOS =====

function loadScenario(id) {
    if (!confirm(`¿Cargar el escenario? Borrará el canvas actual.`)) return;
    clearCanvas();

    const builders = {
        casa: () => {
            addDeviceToCanvas('router', 900, 200);
            addDeviceToCanvas('ap', 900, 380);
            addDeviceToCanvas('pc', 600, 580);
            addDeviceToCanvas('laptop', 850, 620);
            addDeviceToCanvas('smartphone', 1100, 620);
            addDeviceToCanvas('tv', 1300, 580);
            const dev = simState.devices;
            createConnection(dev[0].id, dev[1].id);
            createConnection(dev[1].id, dev[2].id);
            createConnection(dev[1].id, dev[3].id);
            createConnection(dev[1].id, dev[4].id);
            createConnection(dev[1].id, dev[5].id);
            logToConsole(`🏠 Cargado: Red Doméstica. Configura las IPs de cada equipo (192.168.1.x) con gateway 192.168.1.1.`, 'system');
        },
        oficina: () => {
            addDeviceToCanvas('router', 900, 150);
            addDeviceToCanvas('switch', 900, 320);
            for (let i = 0; i < 5; i++) {
                addDeviceToCanvas('pc', 400 + i * 220, 580);
            }
            addDeviceToCanvas('printer', 1550, 320);
            addDeviceToCanvas('server', 1550, 580);
            const dev = simState.devices;
            createConnection(dev[0].id, dev[1].id);
            for (let i = 2; i < 7; i++) createConnection(dev[1].id, dev[i].id);
            createConnection(dev[1].id, dev[7].id);
            createConnection(dev[1].id, dev[8].id);
            logToConsole(`🏢 Cargado: Pequeña Oficina. Configura subred 192.168.1.0/24 con gateway en el router.`, 'system');
        },
        instituto: () => {
            addDeviceToCanvas('cloud', 900, 80);
            addDeviceToCanvas('router', 900, 240);
            addDeviceToCanvas('switch', 400, 420);
            addDeviceToCanvas('switch', 1400, 420);
            // Aula A
            addDeviceToCanvas('pc', 200, 620);
            addDeviceToCanvas('pc', 400, 620);
            addDeviceToCanvas('pc', 600, 620);
            // Aula B
            addDeviceToCanvas('pc', 1200, 620);
            addDeviceToCanvas('pc', 1400, 620);
            addDeviceToCanvas('pc', 1600, 620);
            // Profesores
            addDeviceToCanvas('ap', 900, 420);
            addDeviceToCanvas('laptop', 900, 580);
            const dev = simState.devices;
            createConnection(dev[0].id, dev[1].id);
            createConnection(dev[1].id, dev[2].id);
            createConnection(dev[1].id, dev[3].id);
            createConnection(dev[2].id, dev[4].id);
            createConnection(dev[2].id, dev[5].id);
            createConnection(dev[2].id, dev[6].id);
            createConnection(dev[3].id, dev[7].id);
            createConnection(dev[3].id, dev[8].id);
            createConnection(dev[3].id, dev[9].id);
            createConnection(dev[1].id, dev[10].id);
            createConnection(dev[10].id, dev[11].id);
            logToConsole(`🏫 Cargado: Instituto. Aula A en VLAN 10 (192.168.10.0/24), Aula B en VLAN 20 (192.168.20.0/24), WiFi profes en VLAN 30.`, 'system');
        },
        biblioteca: () => {
            addDeviceToCanvas('cloud', 900, 60);
            addDeviceToCanvas('firewall', 900, 200);
            addDeviceToCanvas('router', 900, 340);
            addDeviceToCanvas('switch', 900, 480);
            addDeviceToCanvas('server', 500, 620);
            addDeviceToCanvas('printer', 300, 620);
            addDeviceToCanvas('ap', 1300, 620);
            addDeviceToCanvas('laptop', 1500, 780);
            addDeviceToCanvas('smartphone', 1300, 780);
            addDeviceToCanvas('tablet', 1100, 780);
            const dev = simState.devices;
            createConnection(dev[0].id, dev[1].id);
            createConnection(dev[1].id, dev[2].id);
            createConnection(dev[2].id, dev[3].id);
            createConnection(dev[3].id, dev[4].id);
            createConnection(dev[3].id, dev[5].id);
            createConnection(dev[3].id, dev[6].id);
            createConnection(dev[6].id, dev[7].id);
            createConnection(dev[6].id, dev[8].id);
            createConnection(dev[6].id, dev[9].id);
            logToConsole(`📚 Cargado: Biblioteca. Servidor en 192.168.50.10, WiFi usuarios en VLAN 20 (192.168.20.0/24).`, 'system');
        },
        empresa: () => {
            addDeviceToCanvas('cloud', 900, 60);
            addDeviceToCanvas('firewall', 900, 180);
            addDeviceToCanvas('router', 900, 300);
            addDeviceToCanvas('switch', 900, 420);
            // Servidores
            addDeviceToCanvas('server', 500, 560);
            addDeviceToCanvas('server', 700, 560);
            // RRHH
            addDeviceToCanvas('switch', 300, 720);
            addDeviceToCanvas('pc', 150, 880);
            addDeviceToCanvas('pc', 350, 880);
            // Ventas
            addDeviceToCanvas('switch', 900, 720);
            addDeviceToCanvas('pc', 800, 880);
            addDeviceToCanvas('pc', 1000, 880);
            // Gerencia
            addDeviceToCanvas('switch', 1500, 720);
            addDeviceToCanvas('pc', 1400, 880);
            addDeviceToCanvas('pc', 1600, 880);
            const dev = simState.devices;
            createConnection(dev[0].id, dev[1].id);
            createConnection(dev[1].id, dev[2].id);
            createConnection(dev[2].id, dev[3].id);
            createConnection(dev[3].id, dev[4].id);
            createConnection(dev[3].id, dev[5].id);
            createConnection(dev[3].id, dev[6].id);
            createConnection(dev[6].id, dev[7].id);
            createConnection(dev[6].id, dev[8].id);
            createConnection(dev[3].id, dev[9].id);
            createConnection(dev[9].id, dev[10].id);
            createConnection(dev[9].id, dev[11].id);
            createConnection(dev[3].id, dev[12].id);
            createConnection(dev[12].id, dev[13].id);
            createConnection(dev[12].id, dev[14].id);
            logToConsole(`🏭 Empresa cargada: VLANs RRHH(10), Ventas(20), Gerencia(30), Servidores(40).`, 'system');
        },
        'centro-comercial': () => {
            addDeviceToCanvas('cloud', 900, 60);
            addDeviceToCanvas('firewall', 900, 180);
            addDeviceToCanvas('router', 900, 300);
            // Planta 1
            addDeviceToCanvas('switch', 400, 480);
            addDeviceToCanvas('ap', 200, 640);
            addDeviceToCanvas('pc', 500, 640);
            addDeviceToCanvas('printer', 700, 640);
            // Planta 2
            addDeviceToCanvas('switch', 1400, 480);
            addDeviceToCanvas('ap', 1600, 640);
            addDeviceToCanvas('pc', 1300, 640);
            addDeviceToCanvas('printer', 1100, 640);
            // CPD
            addDeviceToCanvas('server', 700, 880);
            addDeviceToCanvas('server', 1100, 880);
            const dev = simState.devices;
            createConnection(dev[0].id, dev[1].id);
            createConnection(dev[1].id, dev[2].id);
            createConnection(dev[2].id, dev[3].id);
            createConnection(dev[3].id, dev[4].id);
            createConnection(dev[3].id, dev[5].id);
            createConnection(dev[3].id, dev[6].id);
            createConnection(dev[2].id, dev[7].id);
            createConnection(dev[7].id, dev[8].id);
            createConnection(dev[7].id, dev[9].id);
            createConnection(dev[7].id, dev[10].id);
            createConnection(dev[2].id, dev[11].id);
            createConnection(dev[2].id, dev[12].id);
            logToConsole(`🛍️ Centro comercial: P1 (192.168.10.0/24), P2 (192.168.20.0/24), servidores VLAN 40.`, 'system');
        },
        colegio: () => {
            // Internet → Firewall → Router → Switch principal
            addDeviceToCanvas('cloud', 900, 60);
            addDeviceToCanvas('firewall', 900, 180);
            addDeviceToCanvas('router', 900, 300);
            addDeviceToCanvas('switch', 900, 420);
            // Servidor
            addDeviceToCanvas('server', 500, 560);
            // Aula informática
            addDeviceToCanvas('switch', 200, 580);
            addDeviceToCanvas('pc', 100, 760);
            addDeviceToCanvas('pc', 250, 760);
            addDeviceToCanvas('pc', 400, 760);
            // Sala profesores
            addDeviceToCanvas('switch', 900, 580);
            addDeviceToCanvas('laptop', 800, 760);
            addDeviceToCanvas('laptop', 950, 760);
            addDeviceToCanvas('printer', 1100, 760);
            // WiFi alumnos
            addDeviceToCanvas('ap', 1500, 580);
            addDeviceToCanvas('tablet', 1400, 760);
            addDeviceToCanvas('tablet', 1550, 760);
            addDeviceToCanvas('smartphone', 1700, 760);
            const dev = simState.devices;
            createConnection(dev[0].id, dev[1].id);
            createConnection(dev[1].id, dev[2].id);
            createConnection(dev[2].id, dev[3].id);
            createConnection(dev[3].id, dev[4].id);
            createConnection(dev[3].id, dev[5].id);
            createConnection(dev[5].id, dev[6].id);
            createConnection(dev[5].id, dev[7].id);
            createConnection(dev[5].id, dev[8].id);
            createConnection(dev[3].id, dev[9].id);
            createConnection(dev[9].id, dev[10].id);
            createConnection(dev[9].id, dev[11].id);
            createConnection(dev[9].id, dev[12].id);
            createConnection(dev[3].id, dev[13].id);
            createConnection(dev[13].id, dev[14].id);
            createConnection(dev[13].id, dev[15].id);
            createConnection(dev[13].id, dev[16].id);
            logToConsole(`🎒 Colegio: Aula informática (VLAN 10), Profesores (VLAN 20), Servidor (VLAN 30), WiFi alumnos (VLAN 40, capada).`, 'system');
        },
        estadio: () => {
            // Internet → Firewall → Router CPD → core switch
            addDeviceToCanvas('cloud', 900, 60);
            addDeviceToCanvas('firewall', 900, 180);
            addDeviceToCanvas('router', 900, 300);
            addDeviceToCanvas('switch', 900, 420);
            // Servidores (control de accesos + streaming)
            addDeviceToCanvas('server', 500, 560);
            addDeviceToCanvas('server', 700, 560);
            // 4 APs en gradas (3 grandes + 1 vip)
            addDeviceToCanvas('ap', 200, 720);
            addDeviceToCanvas('ap', 700, 720);
            addDeviceToCanvas('ap', 1200, 720);
            addDeviceToCanvas('ap', 1700, 720);
            // Cámaras CCTV
            addDeviceToCanvas('camera', 200, 920);
            addDeviceToCanvas('camera', 700, 920);
            addDeviceToCanvas('camera', 1200, 920);
            addDeviceToCanvas('camera', 1700, 920);
            // Pantallas IPTV
            addDeviceToCanvas('iptv', 450, 920);
            addDeviceToCanvas('iptv', 950, 920);
            addDeviceToCanvas('iptv', 1450, 920);
            // Tornos accesos
            addDeviceToCanvas('iot', 100, 1100);
            addDeviceToCanvas('iot', 350, 1100);
            const dev = simState.devices;
            createConnection(dev[0].id, dev[1].id);
            createConnection(dev[1].id, dev[2].id);
            createConnection(dev[2].id, dev[3].id);
            createConnection(dev[3].id, dev[4].id);
            createConnection(dev[3].id, dev[5].id);
            for (let i = 6; i <= 9; i++) createConnection(dev[3].id, dev[i].id);
            for (let i = 10; i <= 13; i++) createConnection(dev[3].id, dev[i].id);
            for (let i = 14; i <= 16; i++) createConnection(dev[3].id, dev[i].id);
            for (let i = 17; i <= 18; i++) createConnection(dev[3].id, dev[i].id);
            logToConsole(`⚽ Estadio de fútbol: WiFi gradas (VLAN 10), cámaras CCTV (VLAN 20 aislada), IPTV (VLAN 30), accesos IoT (VLAN 40), servidores (VLAN 99).`, 'system');
        },
        plaza: () => {
            // Plaza pública con WiFi municipal + locales
            addDeviceToCanvas('cloud', 900, 60);
            addDeviceToCanvas('router', 900, 200);
            addDeviceToCanvas('firewall', 900, 320);
            addDeviceToCanvas('switch', 900, 440);
            // 4 APs municipales
            addDeviceToCanvas('ap', 200, 580);
            addDeviceToCanvas('ap', 700, 580);
            addDeviceToCanvas('ap', 1200, 580);
            addDeviceToCanvas('ap', 1700, 580);
            // Usuarios
            addDeviceToCanvas('smartphone', 100, 780);
            addDeviceToCanvas('laptop', 350, 780);
            addDeviceToCanvas('smartphone', 700, 780);
            addDeviceToCanvas('tablet', 1200, 780);
            addDeviceToCanvas('smartphone', 1700, 780);
            // Cámaras municipales
            addDeviceToCanvas('camera', 1500, 200);
            addDeviceToCanvas('camera', 300, 200);
            // Pantalla informativa
            addDeviceToCanvas('iptv', 1500, 920);
            const dev = simState.devices;
            createConnection(dev[0].id, dev[1].id);
            createConnection(dev[1].id, dev[2].id);
            createConnection(dev[2].id, dev[3].id);
            for (let i = 4; i <= 7; i++) createConnection(dev[3].id, dev[i].id);
            createConnection(dev[4].id, dev[8].id);
            createConnection(dev[4].id, dev[9].id);
            createConnection(dev[5].id, dev[10].id);
            createConnection(dev[6].id, dev[11].id);
            createConnection(dev[7].id, dev[12].id);
            createConnection(dev[3].id, dev[13].id);
            createConnection(dev[3].id, dev[14].id);
            createConnection(dev[3].id, dev[15].id);
            logToConsole(`🏛️ Plaza pública: WiFi municipal abierto con portal cautivo (VLAN 100, /22 para muchos clientes). Cámaras y pantalla informativa en VLAN gestión aislada.`, 'system');
        },
        hospital: () => {
            addDeviceToCanvas('cloud', 900, 60);
            addDeviceToCanvas('firewall', 900, 180);
            addDeviceToCanvas('router', 900, 300);
            addDeviceToCanvas('switch', 900, 420);
            // Servidores
            addDeviceToCanvas('server', 500, 560);
            addDeviceToCanvas('server', 700, 560);
            addDeviceToCanvas('nas', 900, 560);
            // Administración
            addDeviceToCanvas('switch', 200, 620);
            addDeviceToCanvas('pc', 100, 780);
            addDeviceToCanvas('pc', 300, 780);
            addDeviceToCanvas('printer', 200, 940);
            // Consultas
            addDeviceToCanvas('switch', 700, 720);
            addDeviceToCanvas('pc', 600, 880);
            addDeviceToCanvas('pc', 800, 880);
            addDeviceToCanvas('pc', 700, 1040);
            // Equipos médicos IoT (UCI)
            addDeviceToCanvas('switch', 1300, 620);
            addDeviceToCanvas('iot', 1200, 780);
            addDeviceToCanvas('iot', 1400, 780);
            addDeviceToCanvas('iot', 1300, 940);
            // WiFi pacientes/visitas
            addDeviceToCanvas('ap', 1700, 620);
            addDeviceToCanvas('smartphone', 1700, 800);
            const dev = simState.devices;
            createConnection(dev[0].id, dev[1].id);
            createConnection(dev[1].id, dev[2].id);
            createConnection(dev[2].id, dev[3].id);
            createConnection(dev[3].id, dev[4].id);
            createConnection(dev[3].id, dev[5].id);
            createConnection(dev[3].id, dev[6].id);
            createConnection(dev[3].id, dev[7].id);
            createConnection(dev[7].id, dev[8].id);
            createConnection(dev[7].id, dev[9].id);
            createConnection(dev[7].id, dev[10].id);
            createConnection(dev[3].id, dev[11].id);
            createConnection(dev[11].id, dev[12].id);
            createConnection(dev[11].id, dev[13].id);
            createConnection(dev[11].id, dev[14].id);
            createConnection(dev[3].id, dev[15].id);
            createConnection(dev[15].id, dev[16].id);
            createConnection(dev[15].id, dev[17].id);
            createConnection(dev[15].id, dev[18].id);
            createConnection(dev[3].id, dev[19].id);
            createConnection(dev[19].id, dev[20].id);
            logToConsole(`🏥 Hospital: Administración (VLAN 10, datos sanitarios CRÍTICOS), Consultas (VLAN 20), IoT médico UCI (VLAN 30 totalmente aislada), WiFi pacientes (VLAN 40, capada y separada).`, 'system');
        },
        restaurante: () => {
            addDeviceToCanvas('cloud', 900, 100);
            addDeviceToCanvas('router', 900, 260);
            addDeviceToCanvas('switch', 900, 420);
            // TPV terminal punto de venta
            addDeviceToCanvas('pc', 400, 600);
            addDeviceToCanvas('printer', 250, 600);
            // Cocina KDS (Kitchen Display)
            addDeviceToCanvas('tablet', 700, 600);
            // WiFi clientes
            addDeviceToCanvas('ap', 1100, 600);
            addDeviceToCanvas('smartphone', 1000, 800);
            addDeviceToCanvas('smartphone', 1200, 800);
            addDeviceToCanvas('laptop', 1400, 800);
            // Cámaras
            addDeviceToCanvas('camera', 600, 200);
            addDeviceToCanvas('camera', 1300, 200);
            const dev = simState.devices;
            createConnection(dev[0].id, dev[1].id);
            createConnection(dev[1].id, dev[2].id);
            createConnection(dev[2].id, dev[3].id);
            createConnection(dev[3].id, dev[4].id);
            createConnection(dev[2].id, dev[5].id);
            createConnection(dev[2].id, dev[6].id);
            createConnection(dev[6].id, dev[7].id);
            createConnection(dev[6].id, dev[8].id);
            createConnection(dev[6].id, dev[9].id);
            createConnection(dev[2].id, dev[10].id);
            createConnection(dev[2].id, dev[11].id);
            logToConsole(`🍽️ Restaurante: TPV+impresora cocina (VLAN 10, importante: NUNCA debe perder conexión), KDS cocina (VLAN 20), WiFi clientes (VLAN 30 con portal cautivo), Cámaras (VLAN 99).`, 'system');
        },
        examen: () => {
            // Replica del Ejercicio_Examen.docx
            // CPD (zona noroeste)
            addDeviceToCanvas('cloud', 200, 80);
            addDeviceToCanvas('firewall', 200, 220);
            addDeviceToCanvas('router', 200, 360);
            addDeviceToCanvas('switch', 200, 500);
            addDeviceToCanvas('server', 50, 640);
            addDeviceToCanvas('server', 350, 640);
            // RRHH (5 PCs + impresora)
            addDeviceToCanvas('switch', 700, 280);
            addDeviceToCanvas('pc', 550, 440);
            addDeviceToCanvas('pc', 700, 440);
            addDeviceToCanvas('pc', 850, 440);
            addDeviceToCanvas('pc', 550, 580);
            addDeviceToCanvas('pc', 700, 580);
            addDeviceToCanvas('printer', 850, 580);
            // Ventas (10 PCs + impresora)
            addDeviceToCanvas('switch', 1200, 280);
            addDeviceToCanvas('pc', 1050, 440);
            addDeviceToCanvas('pc', 1200, 440);
            addDeviceToCanvas('pc', 1350, 440);
            addDeviceToCanvas('pc', 1050, 580);
            addDeviceToCanvas('pc', 1200, 580);
            addDeviceToCanvas('pc', 1350, 580);
            addDeviceToCanvas('pc', 1050, 720);
            addDeviceToCanvas('pc', 1200, 720);
            addDeviceToCanvas('pc', 1350, 720);
            addDeviceToCanvas('pc', 1500, 580);
            addDeviceToCanvas('printer', 1500, 720);
            // Gerencia (3 PCs + impresora + portátil DHCP encargado)
            addDeviceToCanvas('switch', 1750, 280);
            addDeviceToCanvas('pc', 1650, 440);
            addDeviceToCanvas('pc', 1750, 440);
            addDeviceToCanvas('pc', 1850, 440);
            addDeviceToCanvas('printer', 1750, 580);
            addDeviceToCanvas('laptop', 1850, 580);
            // 4 APs (3 empleados + 1 invitados)
            addDeviceToCanvas('ap', 700, 850);
            addDeviceToCanvas('ap', 1200, 850);
            addDeviceToCanvas('ap', 1750, 850);
            addDeviceToCanvas('ap', 200, 1000);
            // Vigilante seguridad entrada
            addDeviceToCanvas('pc', 700, 1100);
            const dev = simState.devices;
            // Backbone CPD
            createConnection(dev[0].id, dev[1].id);
            createConnection(dev[1].id, dev[2].id);
            createConnection(dev[2].id, dev[3].id);
            createConnection(dev[3].id, dev[4].id);
            createConnection(dev[3].id, dev[5].id);
            // RRHH
            createConnection(dev[3].id, dev[6].id);
            for (let i = 7; i <= 12; i++) createConnection(dev[6].id, dev[i].id);
            // Ventas
            createConnection(dev[3].id, dev[13].id);
            for (let i = 14; i <= 24; i++) createConnection(dev[13].id, dev[i].id);
            // Gerencia
            createConnection(dev[3].id, dev[25].id);
            for (let i = 26; i <= 30; i++) createConnection(dev[25].id, dev[i].id);
            // APs (3 empleados a switches de cada depto, 1 invitados al core)
            createConnection(dev[6].id, dev[31].id);
            createConnection(dev[13].id, dev[32].id);
            createConnection(dev[25].id, dev[33].id);
            createConnection(dev[3].id, dev[34].id);
            // Vigilante
            createConnection(dev[3].id, dev[35].id);
            logToConsole(`📝 EJERCICIO EXAMEN cargado. Crea: VLAN10=RRHH(192.168.10.0/24), VLAN20=Ventas(/24), VLAN30=Gerencia(/24), VLAN40=Invitados(/24), VLAN50=Servidores(/24), VLAN99=Gestión(/24). El encargado se debe configurar por DHCP. Marca y modelo orientativos: switches Cisco Catalyst 2960, router Cisco ISR 1100, firewall FortiGate 60F.`, 'system');
        }
    };

    if (builders[id]) {
        builders[id]();
        addXP(15, `Escenario cargado: ${SCENARIOS.find(s => s.id === id).title}`);
        // Centrar canvas tras cargar
        setTimeout(() => centerCanvas(), 100);
    }
}

// ============================================
// PLEGAR PANELES DEL SIMULADOR (más espacio canvas)
// ============================================
let simPanelState = { left: true, right: true };

function simTogglePanel(which) {
    if (which === 'both') {
        const anyHidden = !simPanelState.left || !simPanelState.right;
        simPanelState.left = anyHidden;
        simPanelState.right = anyHidden;
    } else if (which === 'left') {
        simPanelState.left = !simPanelState.left;
    } else if (which === 'right') {
        simPanelState.right = !simPanelState.right;
    }
    simApplyPanelState();
    setTimeout(() => centerCanvas(), 320);
}

function simApplyPanelState() {
    const layout = document.querySelector('.simulator-layout');
    if (!layout) return;
    layout.classList.remove('toolbox-hidden', 'panel-hidden', 'both-hidden');
    if (!simPanelState.left && !simPanelState.right) layout.classList.add('both-hidden');
    else if (!simPanelState.left) layout.classList.add('toolbox-hidden');
    else if (!simPanelState.right) layout.classList.add('panel-hidden');

    const lb = document.getElementById('simToggleLeft');
    const rb = document.getElementById('simToggleRight');
    const bb = document.getElementById('simToggleBoth');
    if (lb) lb.textContent = simPanelState.left ? '◀ Panel' : '▶ Panel';
    if (rb) rb.textContent = simPanelState.right ? 'Panel ▶' : 'Panel ◀';
    if (bb) bb.textContent = (!simPanelState.left && !simPanelState.right) ? '⛶ Restaurar' : '⛶ Max';
}
