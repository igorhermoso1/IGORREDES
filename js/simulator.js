/* ============================================
   SIMULATOR.JS - Simulador de red tipo Packet Tracer
   ============================================ */

let simState = {
    devices: [],       // {id, type, x, y, name, config}
    connections: [],   // {id, from, to, type}
    mode: 'select',    // select | connect | delete
    selectedDevice: null,
    connectingFrom: null,
    deviceCounter: 0,
    connCounter: 0,
    consoleLog: []
};

// ===== INICIALIZACIÓN =====

function renderSimulator() {
    renderSimToolbox();
    renderScenarios();
    setupCanvasListeners();
    loadLastTopology();
}

function renderSimToolbox() {
    const tb = document.getElementById('simToolbox');
    if (!tb) return;

    const cats = {};
    Object.entries(SIM_DEVICE_TYPES).forEach(([key, dev]) => {
        if (!cats[dev.category]) cats[dev.category] = [];
        cats[dev.category].push({ key, ...dev });
    });

    let html = `<div class="sim-toolbox-title">🧰 Dispositivos</div>`;
    Object.entries(cats).forEach(([catName, items]) => {
        html += `<div class="sim-device-category">
            <div class="sim-device-category-title">${catName}</div>`;
        items.forEach(it => {
            html += `
                <button class="sim-device-btn" draggable="true"
                        data-device-type="${it.key}"
                        ondragstart="onDeviceDragStart(event, '${it.key}')"
                        onclick="addDeviceToCanvas('${it.key}', null, null)">
                    <span style="font-size:1.8em;">${it.icon}</span>
                    <span class="sim-device-btn-label">${it.label}</span>
                </button>
            `;
        });
        html += `</div>`;
    });

    tb.innerHTML = html;
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
    const x = e.clientX - rect.left - 45;
    const y = e.clientY - rect.top - 45;
    addDeviceToCanvas(draggingDeviceType, x, y);
    draggingDeviceType = null;
}

// ===== AÑADIR DISPOSITIVO =====

function addDeviceToCanvas(type, x, y) {
    const devType = SIM_DEVICE_TYPES[type];
    if (!devType) return;

    simState.deviceCounter++;
    const canvas = document.getElementById('simCanvas');
    const rect = canvas.getBoundingClientRect();

    if (x === null) x = 50 + Math.random() * (rect.width - 200);
    if (y === null) y = 60 + Math.random() * (rect.height - 200);

    x = Math.max(0, Math.min(rect.width - 90, x));
    y = Math.max(0, Math.min(rect.height - 100, y));

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
    dragging = {
        id: deviceId,
        offsetX: e.clientX - rect.left - device.x,
        offsetY: e.clientY - rect.top - device.y
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
    let newX = e.clientX - rect.left - dragging.offsetX;
    let newY = e.clientY - rect.top - dragging.offsetY;
    newX = Math.max(0, Math.min(rect.width - 90, newX));
    newY = Math.max(0, Math.min(rect.height - 100, newY));
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
            addDeviceToCanvas('router', 400, 100);
            addDeviceToCanvas('ap', 400, 230);
            addDeviceToCanvas('pc', 200, 350);
            addDeviceToCanvas('laptop', 350, 380);
            addDeviceToCanvas('smartphone', 500, 380);
            createConnection(simState.devices[0].id, simState.devices[1].id);
            createConnection(simState.devices[1].id, simState.devices[2].id);
            createConnection(simState.devices[1].id, simState.devices[3].id);
            createConnection(simState.devices[1].id, simState.devices[4].id);
            logToConsole(`🏠 Cargado: Red Doméstica. Configura las IPs de cada equipo (192.168.1.x) con gateway 192.168.1.1.`, 'system');
        },
        oficina: () => {
            addDeviceToCanvas('router', 400, 80);
            addDeviceToCanvas('switch', 400, 200);
            for (let i = 0; i < 5; i++) {
                addDeviceToCanvas('pc', 100 + i * 130, 350);
            }
            addDeviceToCanvas('printer', 750, 200);
            const dev = simState.devices;
            createConnection(dev[0].id, dev[1].id);
            for (let i = 2; i < 7; i++) createConnection(dev[1].id, dev[i].id);
            createConnection(dev[1].id, dev[7].id);
            logToConsole(`🏢 Cargado: Pequeña Oficina. Configura subred 192.168.1.0/24 con gateway en el router.`, 'system');
        },
        instituto: () => {
            addDeviceToCanvas('cloud', 400, 50);
            addDeviceToCanvas('router', 400, 150);
            addDeviceToCanvas('switch', 200, 280);
            addDeviceToCanvas('switch', 600, 280);
            addDeviceToCanvas('pc', 100, 400);
            addDeviceToCanvas('pc', 250, 400);
            addDeviceToCanvas('pc', 550, 400);
            addDeviceToCanvas('pc', 700, 400);
            const dev = simState.devices;
            createConnection(dev[0].id, dev[1].id);
            createConnection(dev[1].id, dev[2].id);
            createConnection(dev[1].id, dev[3].id);
            createConnection(dev[2].id, dev[4].id);
            createConnection(dev[2].id, dev[5].id);
            createConnection(dev[3].id, dev[6].id);
            createConnection(dev[3].id, dev[7].id);
            logToConsole(`🏫 Cargado: Instituto. Aula A en VLAN 10 (192.168.10.0/24), Aula B en VLAN 20 (192.168.20.0/24).`, 'system');
        },
        biblioteca: () => {
            addDeviceToCanvas('cloud', 400, 50);
            addDeviceToCanvas('firewall', 400, 140);
            addDeviceToCanvas('router', 400, 230);
            addDeviceToCanvas('switch', 400, 320);
            addDeviceToCanvas('server', 150, 420);
            addDeviceToCanvas('ap', 650, 420);
            addDeviceToCanvas('laptop', 700, 540);
            addDeviceToCanvas('smartphone', 600, 540);
            const dev = simState.devices;
            createConnection(dev[0].id, dev[1].id);
            createConnection(dev[1].id, dev[2].id);
            createConnection(dev[2].id, dev[3].id);
            createConnection(dev[3].id, dev[4].id);
            createConnection(dev[3].id, dev[5].id);
            createConnection(dev[5].id, dev[6].id);
            createConnection(dev[5].id, dev[7].id);
            logToConsole(`📚 Cargado: Biblioteca. Servidor en 192.168.50.10, WiFi para usuarios en VLAN 20.`, 'system');
        },
        empresa: () => {
            addDeviceToCanvas('cloud', 400, 30);
            addDeviceToCanvas('firewall', 400, 110);
            addDeviceToCanvas('router', 400, 190);
            addDeviceToCanvas('switch', 400, 280);
            // Servidores
            addDeviceToCanvas('server', 200, 380);
            addDeviceToCanvas('server', 320, 380);
            // RRHH (5 PCs)
            addDeviceToCanvas('switch', 100, 480);
            addDeviceToCanvas('pc', 50, 580);
            addDeviceToCanvas('pc', 150, 580);
            // Ventas (3 PCs)
            addDeviceToCanvas('switch', 450, 480);
            addDeviceToCanvas('pc', 400, 580);
            addDeviceToCanvas('pc', 500, 580);
            // Gerencia
            addDeviceToCanvas('switch', 750, 480);
            addDeviceToCanvas('pc', 700, 580);
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
            logToConsole(`🏭 Empresa cargada: VLANs RRHH(10), Ventas(20), Gerencia(30), Servidores(40).`, 'system');
        },
        'centro-comercial': () => {
            addDeviceToCanvas('cloud', 400, 30);
            addDeviceToCanvas('firewall', 400, 110);
            addDeviceToCanvas('router', 400, 190);
            // P1
            addDeviceToCanvas('switch', 200, 290);
            addDeviceToCanvas('ap', 100, 380);
            addDeviceToCanvas('pc', 250, 380);
            // P2
            addDeviceToCanvas('switch', 600, 290);
            addDeviceToCanvas('ap', 700, 380);
            addDeviceToCanvas('pc', 550, 380);
            // CPD
            addDeviceToCanvas('server', 400, 500);
            const dev = simState.devices;
            createConnection(dev[0].id, dev[1].id);
            createConnection(dev[1].id, dev[2].id);
            createConnection(dev[2].id, dev[3].id);
            createConnection(dev[3].id, dev[4].id);
            createConnection(dev[3].id, dev[5].id);
            createConnection(dev[2].id, dev[6].id);
            createConnection(dev[6].id, dev[7].id);
            createConnection(dev[6].id, dev[8].id);
            createConnection(dev[2].id, dev[9].id);
            logToConsole(`🛍️ Centro comercial: Planta 1 (192.168.10.0/24), Planta 2 (192.168.20.0/24), Servidor en VLAN gestión.`, 'system');
        }
    };

    if (builders[id]) {
        builders[id]();
        addXP(15, `Escenario cargado: ${SCENARIOS.find(s => s.id === id).title}`);
    }
}
