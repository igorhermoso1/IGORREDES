/* ============================================
   FLOORPLAN.JS — Editor de mapas lógicos
   Estilo draw.io: paredes, zonas, dispositivos de red sobre planos
   ============================================ */

const FP_CANVAS_W = 1800;
const FP_CANVAS_H = 1200;
const FP_GRID = 20;
const FP_SNAP = true;
const FP_ZOOM_MIN = 0.4;
const FP_ZOOM_MAX = 2.0;
const FP_ZOOM_STEP = 0.1;

const fpState = {
    mode: 'select',           // select | wall | zone | door | text | device | erase
    devicePending: null,      // tipo de dispositivo a colocar
    walls: [],                // [{ id, x1, y1, x2, y2, thickness }]
    zones: [],                // [{ id, x, y, w, h, label, color }]
    doors: [],                // [{ id, x, y, w, rot }]
    texts: [],                // [{ id, x, y, text, size }]
    devices: [],              // [{ id, type, x, y, label }]
    selectedId: null,
    selectedKind: null,
    counter: 1,
    zoom: 1,
    isDrawing: false,
    drawStart: null,
    tempEl: null,
    history: [],
    historyIdx: -1
};

const FP_ZONE_COLORS = [
    { name: 'Azul oficina', fill: '#D6EAF8', stroke: '#2874A6' },
    { name: 'Verde sala',   fill: '#D5F5E3', stroke: '#229954' },
    { name: 'Amarillo común', fill: '#FCF3CF', stroke: '#B7950B' },
    { name: 'Rosa zona', fill: '#FADBD8', stroke: '#A93226' },
    { name: 'Lila reunión', fill: '#E8DAEF', stroke: '#6C3483' },
    { name: 'Gris servidores', fill: '#E5E7E9', stroke: '#566573' },
    { name: 'Naranja almacén', fill: '#FAE5D3', stroke: '#BA4A00' }
];

let fpCurrentZoneColor = 0;

const FP_TEMPLATES = {
    blank: { name: 'En blanco', desc: 'Empieza desde cero' },
    home:  { name: '🏠 Vivienda', desc: 'Piso de 3 habitaciones, salón y cocina' },
    office: { name: '🏢 Oficina', desc: 'Open space, 2 despachos y sala de reuniones' },
    school: { name: '🎒 Colegio pequeño', desc: '2 aulas, sala profes y CPD' },
    restaurant: { name: '🍽️ Restaurante', desc: 'Sala, barra, cocina y aseos' }
};

// ============================================
// RENDER PRINCIPAL
// ============================================

function renderFloorplanPage() {
    const container = document.getElementById('floorplanContent');
    if (!container) return;

    container.innerHTML = `
        <div class="info-box" style="margin-bottom:18px;">
            🗺️ <strong>Editor de mapas lógicos.</strong> Dibuja el plano de un edificio (paredes, zonas) y arrastra elementos de red encima. Como draw.io pero centrado en redes. Tus mapas se guardan automáticamente.
            <button class="btn btn-secondary" onclick="openTutorial('floorplan')" style="margin-left:14px; padding:6px 14px;">📖 Ver tutorial</button>
        </div>

        <div class="fp-layout">
            <!-- TOOLBOX IZQUIERDA -->
            <div class="fp-toolbox" id="fpToolbox">
                <button class="fp-toolbox-toggle" onclick="fpToggleToolbox()" title="Plegar/Desplegar">◀</button>

                <div class="fp-tool-group">
                    <div class="fp-tool-group-title">🛠️ Herramientas</div>
                    <button class="fp-tool-btn active" data-mode="select" onclick="fpSetMode('select')">
                        <span>👆</span><div>Seleccionar</div>
                    </button>
                    <button class="fp-tool-btn" data-mode="wall" onclick="fpSetMode('wall')">
                        <span>🧱</span><div>Pared</div>
                    </button>
                    <button class="fp-tool-btn" data-mode="zone" onclick="fpSetMode('zone')">
                        <span>🟦</span><div>Zona / habitación</div>
                    </button>
                    <button class="fp-tool-btn" data-mode="door" onclick="fpSetMode('door')">
                        <span>🚪</span><div>Puerta</div>
                    </button>
                    <button class="fp-tool-btn" data-mode="text" onclick="fpSetMode('text')">
                        <span>🔤</span><div>Texto / etiqueta</div>
                    </button>
                    <button class="fp-tool-btn" data-mode="erase" onclick="fpSetMode('erase')">
                        <span>🗑️</span><div>Borrar</div>
                    </button>
                </div>

                <div class="fp-tool-group">
                    <div class="fp-tool-group-title">🎨 Color de zona</div>
                    <div class="fp-color-picker" id="fpColorPicker"></div>
                </div>

                <div class="fp-tool-group">
                    <div class="fp-tool-group-title">📡 Equipos de red</div>
                    <div class="fp-devices-grid" id="fpDevicesGrid"></div>
                </div>

                <div class="fp-tool-group">
                    <div class="fp-tool-group-title">📋 Plantillas</div>
                    <select class="fp-template-select" id="fpTemplate" onchange="fpLoadTemplate(this.value)">
                        ${Object.entries(FP_TEMPLATES).map(([key, t]) =>
                            `<option value="${key}">${t.name}</option>`
                        ).join('')}
                    </select>
                </div>

                <div class="fp-tool-group">
                    <div class="fp-tool-group-title">💾 Archivo</div>
                    <button class="fp-action-btn" onclick="fpNew()">📄 Nuevo</button>
                    <button class="fp-action-btn" onclick="fpSave()">💾 Guardar</button>
                    <button class="fp-action-btn" onclick="fpExportPNG()">🖼️ Exportar PNG</button>
                    <button class="fp-action-btn" onclick="fpExportJSON()">📥 Exportar JSON</button>
                </div>
            </div>

            <!-- CANVAS CENTRAL -->
            <div class="fp-canvas-wrapper">
                <div class="fp-toolbar">
                    <span class="fp-status" id="fpStatus">Modo: 👆 Seleccionar</span>
                    <div class="fp-toolbar-actions">
                        <button class="fp-action-btn" onclick="fpUndo()" title="Deshacer">↶ Deshacer</button>
                        <button class="fp-action-btn" onclick="fpRedo()" title="Rehacer">↷ Rehacer</button>
                        <button class="fp-action-btn" onclick="fpCenter()" title="Centrar vista">🎯 Centrar</button>
                    </div>
                </div>

                <div class="fp-canvas-scroll" id="fpCanvasScroll">
                    <svg class="fp-canvas" id="fpCanvas"
                         width="${FP_CANVAS_W}" height="${FP_CANVAS_H}"
                         viewBox="0 0 ${FP_CANVAS_W} ${FP_CANVAS_H}"
                         xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="fp-grid-pattern" width="${FP_GRID}" height="${FP_GRID}" patternUnits="userSpaceOnUse">
                                <path d="M ${FP_GRID} 0 L 0 0 0 ${FP_GRID}" fill="none" stroke="rgba(135,206,235,0.18)" stroke-width="1"/>
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#fp-grid-pattern)" id="fpGridBg"/>
                        <g id="fpLayerZones"></g>
                        <g id="fpLayerWalls"></g>
                        <g id="fpLayerDoors"></g>
                        <g id="fpLayerTexts"></g>
                        <g id="fpLayerDevices"></g>
                        <g id="fpLayerTemp"></g>
                    </svg>
                </div>

                <div class="fp-zoom-controls">
                    <button class="fp-zoom-btn" onclick="fpZoomIn()">+</button>
                    <div class="fp-zoom-level" id="fpZoomLevel">100%</div>
                    <button class="fp-zoom-btn" onclick="fpZoomOut()">−</button>
                    <button class="fp-zoom-btn" onclick="fpZoomReset()" style="font-size:0.85em;">⌂</button>
                </div>
            </div>

            <!-- PANEL DERECHA -->
            <div class="fp-panel" id="fpPanel">
                <div class="fp-panel-empty" id="fpPanelEmpty">
                    <div style="font-size:3em; margin-bottom:14px; opacity:0.45;">🖱️</div>
                    <div style="color:var(--texto-suave); font-weight:600;">Selecciona un elemento para editarlo</div>
                    <div style="margin-top:20px; padding:14px; background:var(--celeste); border-radius:12px; font-size:0.88em; color:var(--azul-oscuro); text-align:left; line-height:1.6;">
                        <strong>💡 Atajos rápidos:</strong><br>
                        • <strong>Esc</strong> → modo seleccionar<br>
                        • <strong>W</strong> → modo pared<br>
                        • <strong>Z</strong> → modo zona<br>
                        • <strong>D</strong> → modo borrar<br>
                        • <strong>Ctrl+Z</strong> → deshacer<br>
                        • <strong>Supr</strong> → eliminar selección
                    </div>
                </div>
                <div class="fp-panel-content" id="fpPanelContent" style="display:none;"></div>
            </div>
        </div>
    `;

    fpRenderColorPicker();
    fpRenderDevicesGrid();
    fpSetupCanvasEvents();
    fpSetupKeyboard();
    fpLoadFromStorage();
    setTimeout(() => fpCenter(), 100);
}

function fpRenderColorPicker() {
    const el = document.getElementById('fpColorPicker');
    if (!el) return;
    el.innerHTML = FP_ZONE_COLORS.map((c, idx) => `
        <button class="fp-color-swatch ${idx === fpCurrentZoneColor ? 'active' : ''}"
                style="background:${c.fill}; border-color:${c.stroke};"
                onclick="fpSelectZoneColor(${idx})"
                title="${c.name}"></button>
    `).join('');
}

function fpSelectZoneColor(idx) {
    fpCurrentZoneColor = idx;
    fpRenderColorPicker();
}

function fpRenderDevicesGrid() {
    const el = document.getElementById('fpDevicesGrid');
    if (!el || typeof SIM_DEVICE_TYPES === 'undefined') return;
    const order = ['router', 'switch', 'ap', 'firewall', 'server', 'pc', 'laptop', 'smartphone', 'tablet', 'printer', 'camera', 'iot', 'nas', 'cloud', 'tv', 'iptv', 'patchpanel', 'hub'];
    el.innerHTML = order.map(type => {
        const d = SIM_DEVICE_TYPES[type];
        if (!d) return '';
        return `
            <button class="fp-device-btn" onclick="fpStartPlacingDevice('${type}')" title="${d.label}">
                <span class="fp-device-icon">${d.icon}</span>
                <span class="fp-device-label">${d.label}</span>
            </button>
        `;
    }).join('');
}

// ============================================
// MODOS
// ============================================

function fpSetMode(mode) {
    fpState.mode = mode;
    fpState.devicePending = null;
    document.querySelectorAll('.fp-tool-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.mode === mode);
    });
    const labels = {
        select: '👆 Seleccionar / mover',
        wall: '🧱 Pared — clic y arrastra',
        zone: '🟦 Zona — clic y arrastra para crear rectángulo',
        door: '🚪 Puerta — clic donde quieras colocarla',
        text: '🔤 Texto — clic donde quieras escribir',
        erase: '🗑️ Borrar — clic en el elemento',
        device: '📡 Colocar dispositivo — clic donde quieras'
    };
    const st = document.getElementById('fpStatus');
    if (st) st.textContent = 'Modo: ' + (labels[mode] || mode);

    const canvas = document.getElementById('fpCanvas');
    if (canvas) {
        canvas.style.cursor = mode === 'select' ? 'default' :
                              mode === 'erase' ? 'not-allowed' :
                              mode === 'device' ? 'cell' :
                              'crosshair';
    }
    fpSelect(null, null);
}

function fpStartPlacingDevice(type) {
    fpState.mode = 'device';
    fpState.devicePending = type;
    document.querySelectorAll('.fp-tool-btn').forEach(b => b.classList.remove('active'));
    const d = SIM_DEVICE_TYPES[type];
    const st = document.getElementById('fpStatus');
    if (st) st.textContent = `Modo: 📡 Colocar ${d.label} — clic en el plano`;
    const canvas = document.getElementById('fpCanvas');
    if (canvas) canvas.style.cursor = 'cell';
}

// ============================================
// EVENTOS DEL CANVAS
// ============================================

function fpSetupCanvasEvents() {
    const canvas = document.getElementById('fpCanvas');
    if (!canvas) return;
    canvas.addEventListener('mousedown', fpOnMouseDown);
    canvas.addEventListener('mousemove', fpOnMouseMove);
    canvas.addEventListener('mouseup', fpOnMouseUp);
    canvas.addEventListener('mouseleave', fpOnMouseUp);
    canvas.addEventListener('click', fpOnCanvasClick);
}

function fpGetCanvasCoords(e) {
    const canvas = document.getElementById('fpCanvas');
    const rect = canvas.getBoundingClientRect();
    const z = fpState.zoom || 1;
    const x = (e.clientX - rect.left) / z;
    const y = (e.clientY - rect.top) / z;
    return FP_SNAP ? {
        x: Math.round(x / FP_GRID) * FP_GRID,
        y: Math.round(y / FP_GRID) * FP_GRID
    } : { x, y };
}

let fpDragging = null;

function fpOnMouseDown(e) {
    const { x, y } = fpGetCanvasCoords(e);
    if (fpState.mode === 'wall' || fpState.mode === 'zone') {
        fpState.isDrawing = true;
        fpState.drawStart = { x, y };
        e.preventDefault();
    } else if (fpState.mode === 'select') {
        // Si pulsa sobre un elemento ya seleccionado, lo arrastra
        const target = e.target;
        const kind = target.dataset.fpKind;
        const id = target.dataset.fpId;
        if (id && fpState.selectedId === id) {
            fpDragging = { id, kind, startX: x, startY: y, origin: fpGetElementOrigin(kind, id) };
            e.preventDefault();
        }
    }
}

function fpGetElementOrigin(kind, id) {
    const list = { wall: fpState.walls, zone: fpState.zones, door: fpState.doors, text: fpState.texts, device: fpState.devices }[kind];
    if (!list) return null;
    const el = list.find(x => x.id === id);
    if (!el) return null;
    if (kind === 'wall') return { x1: el.x1, y1: el.y1, x2: el.x2, y2: el.y2 };
    return { x: el.x, y: el.y };
}

function fpOnMouseMove(e) {
    const { x, y } = fpGetCanvasCoords(e);
    if (fpState.isDrawing && fpState.drawStart) {
        fpRenderTempShape(fpState.drawStart, { x, y });
    } else if (fpDragging) {
        const dx = x - fpDragging.startX;
        const dy = y - fpDragging.startY;
        const list = { wall: fpState.walls, zone: fpState.zones, door: fpState.doors, text: fpState.texts, device: fpState.devices }[fpDragging.kind];
        const el = list.find(x => x.id === fpDragging.id);
        if (el && fpDragging.kind === 'wall') {
            el.x1 = fpDragging.origin.x1 + dx;
            el.y1 = fpDragging.origin.y1 + dy;
            el.x2 = fpDragging.origin.x2 + dx;
            el.y2 = fpDragging.origin.y2 + dy;
        } else if (el) {
            el.x = fpDragging.origin.x + dx;
            el.y = fpDragging.origin.y + dy;
        }
        fpRedraw();
    }
}

function fpOnMouseUp(e) {
    if (fpState.isDrawing && fpState.drawStart) {
        const { x, y } = fpGetCanvasCoords(e);
        if (fpState.mode === 'wall') {
            const dx = Math.abs(x - fpState.drawStart.x);
            const dy = Math.abs(y - fpState.drawStart.y);
            if (dx + dy >= FP_GRID) {
                // Forzar pared horizontal o vertical (la dominante)
                const x2 = dx >= dy ? x : fpState.drawStart.x;
                const y2 = dx >= dy ? fpState.drawStart.y : y;
                fpAddWall(fpState.drawStart.x, fpState.drawStart.y, x2, y2);
            }
        } else if (fpState.mode === 'zone') {
            const w = Math.abs(x - fpState.drawStart.x);
            const h = Math.abs(y - fpState.drawStart.y);
            if (w >= FP_GRID * 2 && h >= FP_GRID * 2) {
                const zx = Math.min(x, fpState.drawStart.x);
                const zy = Math.min(y, fpState.drawStart.y);
                fpAddZone(zx, zy, w, h);
            }
        }
        fpState.isDrawing = false;
        fpState.drawStart = null;
        fpClearTempShape();
    }
    if (fpDragging) {
        fpDragging = null;
        fpSave();
    }
}

function fpOnCanvasClick(e) {
    const { x, y } = fpGetCanvasCoords(e);
    const target = e.target;
    const kind = target.dataset.fpKind;
    const id = target.dataset.fpId;

    if (fpState.mode === 'select') {
        if (id) {
            fpSelect(id, kind);
        } else {
            fpSelect(null, null);
        }
    } else if (fpState.mode === 'erase') {
        if (id) fpDeleteElement(id, kind);
    } else if (fpState.mode === 'door') {
        fpAddDoor(x, y);
        fpSetMode('select');
    } else if (fpState.mode === 'text') {
        const txt = prompt('Texto a colocar:', 'Etiqueta');
        if (txt && txt.trim()) {
            fpAddText(x, y, txt.trim());
        }
        fpSetMode('select');
    } else if (fpState.mode === 'device' && fpState.devicePending) {
        fpAddDevice(fpState.devicePending, x, y);
        // Permitir colocar varios sin cambiar de modo
    }
}

// ============================================
// AÑADIR ELEMENTOS
// ============================================

function fpAddWall(x1, y1, x2, y2, thickness = 6) {
    const id = 'wall-' + (fpState.counter++);
    fpState.walls.push({ id, x1, y1, x2, y2, thickness });
    fpRedraw();
    fpSave();
}

function fpAddZone(x, y, w, h) {
    const id = 'zone-' + (fpState.counter++);
    const color = FP_ZONE_COLORS[fpCurrentZoneColor];
    fpState.zones.push({
        id, x, y, w, h,
        label: 'Zona ' + fpState.zones.length,
        fill: color.fill,
        stroke: color.stroke
    });
    fpRedraw();
    fpSave();
}

function fpAddDoor(x, y) {
    const id = 'door-' + (fpState.counter++);
    fpState.doors.push({ id, x, y, w: 40, rot: 0 });
    fpRedraw();
    fpSave();
}

function fpAddText(x, y, text) {
    const id = 'text-' + (fpState.counter++);
    fpState.texts.push({ id, x, y, text, size: 16 });
    fpRedraw();
    fpSave();
}

function fpAddDevice(type, x, y) {
    const id = 'dev-' + (fpState.counter++);
    const devType = SIM_DEVICE_TYPES[type];
    fpState.devices.push({
        id, type, x, y,
        label: devType.label + (fpState.devices.filter(d => d.type === type).length + 1),
        ip: '',
        vlan: ''
    });
    fpRedraw();
    fpSave();
}

function fpDeleteElement(id, kind) {
    const lists = { wall: 'walls', zone: 'zones', door: 'doors', text: 'texts', device: 'devices' };
    const key = lists[kind];
    if (!key) return;
    fpState[key] = fpState[key].filter(x => x.id !== id);
    if (fpState.selectedId === id) fpSelect(null, null);
    fpRedraw();
    fpSave();
}

// ============================================
// RENDERIZADO
// ============================================

function fpRedraw() {
    fpRenderZones();
    fpRenderWalls();
    fpRenderDoors();
    fpRenderTexts();
    fpRenderDevices();
}

function fpRenderZones() {
    const layer = document.getElementById('fpLayerZones');
    if (!layer) return;
    layer.innerHTML = fpState.zones.map(z => {
        const selected = fpState.selectedId === z.id;
        return `
            <g data-fp-kind="zone" data-fp-id="${z.id}" style="cursor:${fpState.mode === 'select' ? 'move' : 'default'};">
                <rect x="${z.x}" y="${z.y}" width="${z.w}" height="${z.h}"
                      fill="${z.fill}" stroke="${z.stroke}" stroke-width="${selected ? 4 : 2}"
                      stroke-dasharray="${selected ? '0' : '0'}"
                      data-fp-kind="zone" data-fp-id="${z.id}"
                      style="opacity:0.78;"/>
                <text x="${z.x + 10}" y="${z.y + 22}" font-family="system-ui, sans-serif" font-weight="700"
                      font-size="14" fill="${z.stroke}" pointer-events="none">${escapeSvg(z.label)}</text>
            </g>
        `;
    }).join('');
}

function fpRenderWalls() {
    const layer = document.getElementById('fpLayerWalls');
    if (!layer) return;
    layer.innerHTML = fpState.walls.map(w => {
        const selected = fpState.selectedId === w.id;
        const stroke = selected ? '#FF6B35' : '#34495E';
        const sw = selected ? w.thickness + 2 : w.thickness;
        return `<line x1="${w.x1}" y1="${w.y1}" x2="${w.x2}" y2="${w.y2}"
                      stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round"
                      data-fp-kind="wall" data-fp-id="${w.id}"
                      style="cursor:${fpState.mode === 'select' ? 'move' : 'default'};"/>`;
    }).join('');
}

function fpRenderDoors() {
    const layer = document.getElementById('fpLayerDoors');
    if (!layer) return;
    layer.innerHTML = fpState.doors.map(d => {
        const selected = fpState.selectedId === d.id;
        const stroke = selected ? '#FF6B35' : '#8B5A2B';
        return `
            <g data-fp-kind="door" data-fp-id="${d.id}" transform="translate(${d.x},${d.y}) rotate(${d.rot})" style="cursor:${fpState.mode === 'select' ? 'move' : 'default'};">
                <rect x="-${d.w/2}" y="-3" width="${d.w}" height="6" fill="white" stroke="${stroke}" stroke-width="2" data-fp-kind="door" data-fp-id="${d.id}"/>
                <path d="M -${d.w/2} 0 A ${d.w} ${d.w} 0 0 1 ${d.w/2} 0" fill="none" stroke="${stroke}" stroke-width="1.5" stroke-dasharray="3,3" data-fp-kind="door" data-fp-id="${d.id}"/>
            </g>
        `;
    }).join('');
}

function fpRenderTexts() {
    const layer = document.getElementById('fpLayerTexts');
    if (!layer) return;
    layer.innerHTML = fpState.texts.map(t => {
        const selected = fpState.selectedId === t.id;
        return `<text x="${t.x}" y="${t.y}" font-family="system-ui, sans-serif"
                      font-size="${t.size}" fill="${selected ? '#FF6B35' : '#1B4F72'}"
                      font-weight="600"
                      data-fp-kind="text" data-fp-id="${t.id}"
                      style="cursor:${fpState.mode === 'select' ? 'move' : 'default'};">${escapeSvg(t.text)}</text>`;
    }).join('');
}

function fpRenderDevices() {
    const layer = document.getElementById('fpLayerDevices');
    if (!layer) return;
    layer.innerHTML = fpState.devices.map(d => {
        const devType = SIM_DEVICE_TYPES[d.type] || { icon: '📦', label: '?' };
        const selected = fpState.selectedId === d.id;
        const ip = d.ip ? `<text x="${d.x}" y="${d.y + 56}" text-anchor="middle" font-family="monospace" font-size="10" fill="#566573">${escapeSvg(d.ip)}</text>` : '';
        return `
            <g data-fp-kind="device" data-fp-id="${d.id}" style="cursor:${fpState.mode === 'select' ? 'move' : 'default'};">
                <circle cx="${d.x}" cy="${d.y}" r="${selected ? 26 : 22}"
                        fill="white" stroke="${selected ? '#FF6B35' : '#2874A6'}" stroke-width="${selected ? 4 : 2.5}"
                        data-fp-kind="device" data-fp-id="${d.id}"/>
                <text x="${d.x}" y="${d.y + 7}" text-anchor="middle" font-size="22" pointer-events="none">${devType.icon}</text>
                <rect x="${d.x - 40}" y="${d.y + 26}" width="80" height="16" rx="6" fill="white" stroke="#5DADE2" stroke-width="1" pointer-events="none"/>
                <text x="${d.x}" y="${d.y + 37}" text-anchor="middle" font-family="system-ui, sans-serif"
                      font-size="10" font-weight="700" fill="#1B4F72" pointer-events="none">${escapeSvg(d.label)}</text>
                ${ip}
            </g>
        `;
    }).join('');
}

function fpRenderTempShape(start, end) {
    const layer = document.getElementById('fpLayerTemp');
    if (!layer) return;
    if (fpState.mode === 'wall') {
        const dx = Math.abs(end.x - start.x);
        const dy = Math.abs(end.y - start.y);
        const x2 = dx >= dy ? end.x : start.x;
        const y2 = dx >= dy ? start.y : end.y;
        layer.innerHTML = `<line x1="${start.x}" y1="${start.y}" x2="${x2}" y2="${y2}"
                                stroke="#FF6B35" stroke-width="6" stroke-linecap="round" opacity="0.7" stroke-dasharray="6,3"/>`;
    } else if (fpState.mode === 'zone') {
        const x = Math.min(start.x, end.x);
        const y = Math.min(start.y, end.y);
        const w = Math.abs(end.x - start.x);
        const h = Math.abs(end.y - start.y);
        const col = FP_ZONE_COLORS[fpCurrentZoneColor];
        layer.innerHTML = `<rect x="${x}" y="${y}" width="${w}" height="${h}"
                                fill="${col.fill}" stroke="${col.stroke}" stroke-width="2"
                                opacity="0.5" stroke-dasharray="6,3"/>`;
    }
}

function fpClearTempShape() {
    const layer = document.getElementById('fpLayerTemp');
    if (layer) layer.innerHTML = '';
}

function escapeSvg(s) {
    if (s === null || s === undefined) return '';
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// ============================================
// SELECCIÓN + PANEL DE PROPIEDADES
// ============================================

function fpSelect(id, kind) {
    fpState.selectedId = id;
    fpState.selectedKind = kind;
    fpRedraw();

    const empty = document.getElementById('fpPanelEmpty');
    const content = document.getElementById('fpPanelContent');

    if (!id || !kind) {
        if (empty) empty.style.display = 'flex';
        if (content) content.style.display = 'none';
        return;
    }

    if (empty) empty.style.display = 'none';
    if (content) content.style.display = 'block';

    const lists = { wall: fpState.walls, zone: fpState.zones, door: fpState.doors, text: fpState.texts, device: fpState.devices };
    const el = lists[kind]?.find(x => x.id === id);
    if (!el) return;

    if (kind === 'wall') {
        content.innerHTML = `
            <h3 style="color:var(--azul-oscuro); margin-bottom:14px;">🧱 Pared</h3>
            <div class="fp-prop-row"><label>Grosor:</label>
                <input type="range" min="3" max="14" value="${el.thickness}" oninput="fpUpdateWallThickness('${id}', this.value)">
                <span id="wt-val">${el.thickness}px</span>
            </div>
            <button class="btn btn-secondary" onclick="fpDeleteElement('${id}','wall')" style="margin-top:14px; width:100%;">🗑️ Eliminar</button>
        `;
    } else if (kind === 'zone') {
        content.innerHTML = `
            <h3 style="color:var(--azul-oscuro); margin-bottom:14px;">🟦 Zona</h3>
            <div class="fp-prop-row"><label>Nombre:</label>
                <input type="text" value="${escapeSvg(el.label)}" oninput="fpUpdateZoneLabel('${id}', this.value)" style="width:100%;">
            </div>
            <div class="fp-prop-row"><label>Color:</label>
                <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:6px;">
                    ${FP_ZONE_COLORS.map((c, idx) => `
                        <button class="fp-color-swatch ${el.fill === c.fill ? 'active' : ''}"
                                style="background:${c.fill}; border-color:${c.stroke};"
                                onclick="fpUpdateZoneColor('${id}', ${idx})"
                                title="${c.name}"></button>
                    `).join('')}
                </div>
            </div>
            <div class="fp-prop-row"><label>Tamaño:</label>
                <div style="display:flex; gap:8px; margin-top:6px;">
                    <input type="number" placeholder="W" value="${el.w}" min="40" oninput="fpUpdateZoneSize('${id}', 'w', this.value)" style="flex:1;">
                    <input type="number" placeholder="H" value="${el.h}" min="40" oninput="fpUpdateZoneSize('${id}', 'h', this.value)" style="flex:1;">
                </div>
            </div>
            <button class="btn btn-secondary" onclick="fpDeleteElement('${id}','zone')" style="margin-top:14px; width:100%;">🗑️ Eliminar</button>
        `;
    } else if (kind === 'door') {
        content.innerHTML = `
            <h3 style="color:var(--azul-oscuro); margin-bottom:14px;">🚪 Puerta</h3>
            <div class="fp-prop-row"><label>Ancho:</label>
                <input type="range" min="24" max="80" value="${el.w}" oninput="fpUpdateDoor('${id}', 'w', this.value)">
            </div>
            <div class="fp-prop-row"><label>Rotación:</label>
                <input type="range" min="0" max="360" step="15" value="${el.rot}" oninput="fpUpdateDoor('${id}', 'rot', this.value)">
                <span>${el.rot}°</span>
            </div>
            <button class="btn btn-secondary" onclick="fpDeleteElement('${id}','door')" style="margin-top:14px; width:100%;">🗑️ Eliminar</button>
        `;
    } else if (kind === 'text') {
        content.innerHTML = `
            <h3 style="color:var(--azul-oscuro); margin-bottom:14px;">🔤 Texto</h3>
            <div class="fp-prop-row"><label>Contenido:</label>
                <textarea oninput="fpUpdateText('${id}', this.value)" style="width:100%; min-height:60px; padding:8px; border-radius:8px; border:2px solid var(--borde); font-family:inherit;">${escapeSvg(el.text)}</textarea>
            </div>
            <div class="fp-prop-row"><label>Tamaño:</label>
                <input type="range" min="10" max="40" value="${el.size}" oninput="fpUpdateTextSize('${id}', this.value)">
                <span>${el.size}px</span>
            </div>
            <button class="btn btn-secondary" onclick="fpDeleteElement('${id}','text')" style="margin-top:14px; width:100%;">🗑️ Eliminar</button>
        `;
    } else if (kind === 'device') {
        const dt = SIM_DEVICE_TYPES[el.type];
        content.innerHTML = `
            <h3 style="color:var(--azul-oscuro); margin-bottom:14px;">${dt.icon} ${dt.label}</h3>
            <div class="fp-prop-row"><label>Etiqueta:</label>
                <input type="text" value="${escapeSvg(el.label)}" oninput="fpUpdateDeviceField('${id}', 'label', this.value)" style="width:100%;">
            </div>
            <div class="fp-prop-row"><label>IP (opcional):</label>
                <input type="text" value="${escapeSvg(el.ip)}" placeholder="192.168.1.10" oninput="fpUpdateDeviceField('${id}', 'ip', this.value)" style="width:100%;">
            </div>
            <div class="fp-prop-row"><label>VLAN:</label>
                <input type="text" value="${escapeSvg(el.vlan)}" placeholder="10" oninput="fpUpdateDeviceField('${id}', 'vlan', this.value)" style="width:100%;">
            </div>
            <div style="display:flex; gap:8px; margin-top:14px;">
                <button class="btn btn-secondary" onclick="fpDuplicateDevice('${id}')" style="flex:1;">📋 Duplicar</button>
                <button class="btn btn-secondary" onclick="fpDeleteElement('${id}','device')" style="flex:1;">🗑️ Borrar</button>
            </div>
        `;
    }
}

function fpUpdateWallThickness(id, v) {
    const w = fpState.walls.find(x => x.id === id);
    if (w) { w.thickness = parseInt(v); fpRedraw(); fpSave(); }
    const span = document.getElementById('wt-val');
    if (span) span.textContent = v + 'px';
}

function fpUpdateZoneLabel(id, v) {
    const z = fpState.zones.find(x => x.id === id);
    if (z) { z.label = v; fpRedraw(); fpSave(); }
}

function fpUpdateZoneColor(id, idx) {
    const z = fpState.zones.find(x => x.id === id);
    if (z) {
        z.fill = FP_ZONE_COLORS[idx].fill;
        z.stroke = FP_ZONE_COLORS[idx].stroke;
        fpRedraw();
        fpSave();
        fpSelect(id, 'zone'); // re-render panel
    }
}

function fpUpdateZoneSize(id, field, v) {
    const z = fpState.zones.find(x => x.id === id);
    if (z) { z[field] = parseInt(v) || 40; fpRedraw(); fpSave(); }
}

function fpUpdateDoor(id, field, v) {
    const d = fpState.doors.find(x => x.id === id);
    if (d) { d[field] = parseInt(v); fpRedraw(); fpSave(); fpSelect(id, 'door'); }
}

function fpUpdateText(id, v) {
    const t = fpState.texts.find(x => x.id === id);
    if (t) { t.text = v; fpRedraw(); fpSave(); }
}

function fpUpdateTextSize(id, v) {
    const t = fpState.texts.find(x => x.id === id);
    if (t) { t.size = parseInt(v); fpRedraw(); fpSave(); fpSelect(id, 'text'); }
}

function fpUpdateDeviceField(id, field, v) {
    const d = fpState.devices.find(x => x.id === id);
    if (d) { d[field] = v; fpRedraw(); fpSave(); }
}

function fpDuplicateDevice(id) {
    const d = fpState.devices.find(x => x.id === id);
    if (!d) return;
    const newId = 'dev-' + (fpState.counter++);
    fpState.devices.push({
        ...d,
        id: newId,
        x: d.x + 60,
        y: d.y + 60,
        label: d.label + ' (copia)'
    });
    fpRedraw();
    fpSave();
}

// ============================================
// ZOOM
// ============================================

function fpApplyZoom() {
    const canvas = document.getElementById('fpCanvas');
    if (!canvas) return;
    canvas.style.transform = `scale(${fpState.zoom})`;
    canvas.style.transformOrigin = '0 0';
    const zl = document.getElementById('fpZoomLevel');
    if (zl) zl.textContent = Math.round(fpState.zoom * 100) + '%';
}

function fpZoomIn() {
    fpState.zoom = Math.min(FP_ZOOM_MAX, fpState.zoom + FP_ZOOM_STEP);
    fpApplyZoom();
}

function fpZoomOut() {
    fpState.zoom = Math.max(FP_ZOOM_MIN, fpState.zoom - FP_ZOOM_STEP);
    fpApplyZoom();
}

function fpZoomReset() {
    fpState.zoom = 1;
    fpApplyZoom();
    fpCenter();
}

function fpCenter() {
    const scroll = document.getElementById('fpCanvasScroll');
    if (!scroll) return;
    scroll.scrollLeft = (FP_CANVAS_W * fpState.zoom - scroll.clientWidth) / 2;
    scroll.scrollTop = (FP_CANVAS_H * fpState.zoom - scroll.clientHeight) / 2;
}

// ============================================
// TOOLBOX PLEGABLE
// ============================================

function fpToggleToolbox() {
    const tb = document.getElementById('fpToolbox');
    if (tb) tb.classList.toggle('collapsed');
}

// ============================================
// PERSISTENCIA
// ============================================

function fpSave() {
    try {
        const data = {
            walls: fpState.walls,
            zones: fpState.zones,
            doors: fpState.doors,
            texts: fpState.texts,
            devices: fpState.devices,
            counter: fpState.counter
        };
        localStorage.setItem('redacademia_floorplan', JSON.stringify(data));
    } catch (e) {
        console.warn('No se pudo guardar el plano:', e);
    }
}

function fpLoadFromStorage() {
    try {
        const raw = localStorage.getItem('redacademia_floorplan');
        if (!raw) return;
        const data = JSON.parse(raw);
        fpState.walls = data.walls || [];
        fpState.zones = data.zones || [];
        fpState.doors = data.doors || [];
        fpState.texts = data.texts || [];
        fpState.devices = data.devices || [];
        fpState.counter = data.counter || (fpState.walls.length + fpState.zones.length + fpState.doors.length + fpState.texts.length + fpState.devices.length + 1);
        fpRedraw();
    } catch (e) {
        console.warn('No se pudo cargar el plano:', e);
    }
}

function fpNew() {
    if (!confirm('¿Borrar el plano actual y empezar de nuevo?')) return;
    fpState.walls = [];
    fpState.zones = [];
    fpState.doors = [];
    fpState.texts = [];
    fpState.devices = [];
    fpState.counter = 1;
    fpSelect(null, null);
    fpRedraw();
    fpSave();
}

function fpExportPNG() {
    const svg = document.getElementById('fpCanvas');
    if (!svg) return;
    const clone = svg.cloneNode(true);
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    // Fondo blanco
    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.setAttribute('width', '100%');
    bg.setAttribute('height', '100%');
    bg.setAttribute('fill', 'white');
    clone.insertBefore(bg, clone.firstChild);
    const svgData = new XMLSerializer().serializeToString(clone);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = FP_CANVAS_W;
        canvas.height = FP_CANVAS_H;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, FP_CANVAS_W, FP_CANVAS_H);
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(b => {
            const link = document.createElement('a');
            link.download = 'plano_redacademia.png';
            link.href = URL.createObjectURL(b);
            link.click();
            URL.revokeObjectURL(url);
        }, 'image/png');
    };
    img.src = url;
    addXP(20, 'Exportado plano a PNG');
}

function fpExportJSON() {
    const data = {
        walls: fpState.walls,
        zones: fpState.zones,
        doors: fpState.doors,
        texts: fpState.texts,
        devices: fpState.devices
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.download = 'plano_redacademia.json';
    link.href = URL.createObjectURL(blob);
    link.click();
    addXP(10, 'Exportado plano a JSON');
}

function fpUndo() {
    // Por simplicidad: undo basado en el ÚLTIMO elemento añadido
    const all = [
        ...fpState.devices.map(x => ({ kind: 'device', id: x.id, n: parseInt(x.id.split('-')[1] || 0) })),
        ...fpState.texts.map(x => ({ kind: 'text', id: x.id, n: parseInt(x.id.split('-')[1] || 0) })),
        ...fpState.doors.map(x => ({ kind: 'door', id: x.id, n: parseInt(x.id.split('-')[1] || 0) })),
        ...fpState.walls.map(x => ({ kind: 'wall', id: x.id, n: parseInt(x.id.split('-')[1] || 0) })),
        ...fpState.zones.map(x => ({ kind: 'zone', id: x.id, n: parseInt(x.id.split('-')[1] || 0) }))
    ].sort((a, b) => b.n - a.n);
    if (all.length === 0) return;
    fpDeleteElement(all[0].id, all[0].kind);
}

function fpRedo() {
    // Pendiente para futuro
    if (typeof showNotification === 'function') {
        showNotification('↷', 'Redo', 'Función pendiente, de momento usa Undo.');
    } else {
        console.log('Redo: pendiente.');
    }
}

// ============================================
// TECLADO
// ============================================

let fpKeyboardSet = false;
function fpSetupKeyboard() {
    if (fpKeyboardSet) return;
    fpKeyboardSet = true;
    document.addEventListener('keydown', (e) => {
        const inSubpage = document.getElementById('page-floorplan')?.style.display !== 'none';
        if (!inSubpage) return;
        const tag = (e.target.tagName || '').toLowerCase();
        if (tag === 'input' || tag === 'textarea') return;
        if (e.key === 'Escape') fpSetMode('select');
        else if (e.key === 'w' || e.key === 'W') fpSetMode('wall');
        else if (e.key === 'z' || e.key === 'Z') {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                fpUndo();
            } else {
                fpSetMode('zone');
            }
        }
        else if (e.key === 'd' || e.key === 'D') fpSetMode('erase');
        else if (e.key === 'Delete' || e.key === 'Backspace') {
            if (fpState.selectedId) {
                e.preventDefault();
                fpDeleteElement(fpState.selectedId, fpState.selectedKind);
            }
        }
    });
}

// ============================================
// PLANTILLAS
// ============================================

function fpLoadTemplate(key) {
    if (key === 'blank') return;
    if (!confirm(`¿Cargar la plantilla "${FP_TEMPLATES[key].name}"? Se borrará el plano actual.`)) {
        document.getElementById('fpTemplate').value = 'blank';
        return;
    }
    fpState.walls = [];
    fpState.zones = [];
    fpState.doors = [];
    fpState.texts = [];
    fpState.devices = [];
    fpState.counter = 1;

    const builders = {
        home: fpBuildHome,
        office: fpBuildOffice,
        school: fpBuildSchool,
        restaurant: fpBuildRestaurant
    };
    if (builders[key]) builders[key]();
    fpRedraw();
    fpSave();
    setTimeout(() => fpCenter(), 100);
    document.getElementById('fpTemplate').value = 'blank';
}

function fpBuildHome() {
    // Plano de un piso 3 habitaciones, salón, cocina, baño
    // Perímetro exterior
    fpState.walls.push(
        { id: 'wall-1', x1: 200, y1: 200, x2: 1200, y2: 200, thickness: 8 },
        { id: 'wall-2', x1: 1200, y1: 200, x2: 1200, y2: 800, thickness: 8 },
        { id: 'wall-3', x1: 1200, y1: 800, x2: 200, y2: 800, thickness: 8 },
        { id: 'wall-4', x1: 200, y1: 800, x2: 200, y2: 200, thickness: 8 },
        // Divisiones interiores
        { id: 'wall-5', x1: 200, y1: 460, x2: 700, y2: 460, thickness: 6 },
        { id: 'wall-6', x1: 700, y1: 200, x2: 700, y2: 800, thickness: 6 },
        { id: 'wall-7', x1: 900, y1: 460, x2: 1200, y2: 460, thickness: 6 },
        { id: 'wall-8', x1: 900, y1: 460, x2: 900, y2: 800, thickness: 6 }
    );
    fpState.zones.push(
        { id: 'zone-1', x: 220, y: 220, w: 460, h: 220, label: 'Salón / Comedor', fill: '#D6EAF8', stroke: '#2874A6' },
        { id: 'zone-2', x: 220, y: 480, w: 460, h: 300, label: 'Cocina', fill: '#FCF3CF', stroke: '#B7950B' },
        { id: 'zone-3', x: 720, y: 220, w: 460, h: 220, label: 'Habitación principal', fill: '#E8DAEF', stroke: '#6C3483' },
        { id: 'zone-4', x: 720, y: 480, w: 160, h: 300, label: 'Hab. 2', fill: '#D5F5E3', stroke: '#229954' },
        { id: 'zone-5', x: 920, y: 480, w: 260, h: 300, label: 'Baño / Hab. 3', fill: '#FADBD8', stroke: '#A93226' }
    );
    fpState.doors.push(
        { id: 'door-1', x: 460, y: 460, w: 40, rot: 0 },
        { id: 'door-2', x: 700, y: 320, w: 40, rot: 90 },
        { id: 'door-3', x: 900, y: 600, w: 40, rot: 90 }
    );
    fpState.devices.push(
        { id: 'dev-1', type: 'router', x: 1100, y: 300, label: 'Router ISP', ip: '192.168.1.1', vlan: '' },
        { id: 'dev-2', type: 'ap', x: 1100, y: 400, label: 'WiFi 5GHz', ip: '192.168.1.2', vlan: '' },
        { id: 'dev-3', type: 'smartphone', x: 400, y: 350, label: 'Móvil', ip: '', vlan: '' },
        { id: 'dev-4', type: 'laptop', x: 1000, y: 350, label: 'Portátil', ip: '', vlan: '' },
        { id: 'dev-5', type: 'tv', x: 300, y: 280, label: 'Smart TV', ip: '', vlan: '' }
    );
    fpState.texts.push(
        { id: 'text-1', x: 600, y: 180, text: '🏠 PLANO DE LA VIVIENDA', size: 18 }
    );
    fpState.counter = 20;
}

function fpBuildOffice() {
    fpState.walls.push(
        { id: 'wall-1', x1: 100, y1: 120, x2: 1500, y2: 120, thickness: 8 },
        { id: 'wall-2', x1: 1500, y1: 120, x2: 1500, y2: 900, thickness: 8 },
        { id: 'wall-3', x1: 1500, y1: 900, x2: 100, y2: 900, thickness: 8 },
        { id: 'wall-4', x1: 100, y1: 900, x2: 100, y2: 120, thickness: 8 },
        // Despachos
        { id: 'wall-5', x1: 100, y1: 400, x2: 500, y2: 400, thickness: 6 },
        { id: 'wall-6', x1: 500, y1: 120, x2: 500, y2: 600, thickness: 6 },
        // Sala reuniones
        { id: 'wall-7', x1: 1100, y1: 120, x2: 1100, y2: 400, thickness: 6 },
        // CPD
        { id: 'wall-8', x1: 1100, y1: 700, x2: 1500, y2: 700, thickness: 6 },
        { id: 'wall-9', x1: 1100, y1: 700, x2: 1100, y2: 900, thickness: 6 }
    );
    fpState.zones.push(
        { id: 'zone-1', x: 120, y: 140, w: 360, h: 240, label: 'Despacho 1 — RRHH', fill: '#D6EAF8', stroke: '#2874A6' },
        { id: 'zone-2', x: 120, y: 420, w: 360, h: 200, label: 'Despacho 2 — Dirección', fill: '#E8DAEF', stroke: '#6C3483' },
        { id: 'zone-3', x: 520, y: 140, w: 560, h: 740, label: 'Open Space — Operaciones', fill: '#D5F5E3', stroke: '#229954' },
        { id: 'zone-4', x: 1120, y: 140, w: 360, h: 240, label: 'Sala de reuniones', fill: '#FCF3CF', stroke: '#B7950B' },
        { id: 'zone-5', x: 1120, y: 420, w: 360, h: 260, label: 'Zona café / break', fill: '#FAE5D3', stroke: '#BA4A00' },
        { id: 'zone-6', x: 1120, y: 720, w: 360, h: 160, label: '🖥️ CPD', fill: '#E5E7E9', stroke: '#566573' }
    );
    fpState.doors.push(
        { id: 'door-1', x: 500, y: 300, w: 40, rot: 90 },
        { id: 'door-2', x: 500, y: 520, w: 40, rot: 90 },
        { id: 'door-3', x: 1100, y: 250, w: 40, rot: 90 },
        { id: 'door-4', x: 1100, y: 800, w: 40, rot: 90 }
    );
    fpState.devices.push(
        // CPD
        { id: 'dev-1', type: 'firewall', x: 1180, y: 780, label: 'Firewall', ip: '10.0.0.1', vlan: '99' },
        { id: 'dev-2', type: 'router', x: 1260, y: 780, label: 'Router Core', ip: '10.0.0.2', vlan: '99' },
        { id: 'dev-3', type: 'switch', x: 1340, y: 780, label: 'Switch 24p', ip: '10.0.0.3', vlan: '99' },
        { id: 'dev-4', type: 'server', x: 1420, y: 780, label: 'Servidor AD', ip: '10.0.0.10', vlan: '40' },
        // RRHH
        { id: 'dev-5', type: 'pc', x: 200, y: 220, label: 'PC-RRHH-1', ip: '192.168.10.10', vlan: '10' },
        { id: 'dev-6', type: 'pc', x: 350, y: 220, label: 'PC-RRHH-2', ip: '192.168.10.11', vlan: '10' },
        { id: 'dev-7', type: 'printer', x: 420, y: 320, label: 'Impr-RRHH', ip: '192.168.10.50', vlan: '10' },
        // Dirección
        { id: 'dev-8', type: 'pc', x: 300, y: 520, label: 'PC-Dirección', ip: '192.168.30.10', vlan: '30' },
        // Open Space
        { id: 'dev-9', type: 'pc', x: 620, y: 260, label: 'PC-Op-1', ip: '192.168.20.10', vlan: '20' },
        { id: 'dev-10', type: 'pc', x: 780, y: 260, label: 'PC-Op-2', ip: '192.168.20.11', vlan: '20' },
        { id: 'dev-11', type: 'pc', x: 940, y: 260, label: 'PC-Op-3', ip: '192.168.20.12', vlan: '20' },
        { id: 'dev-12', type: 'pc', x: 620, y: 460, label: 'PC-Op-4', ip: '192.168.20.13', vlan: '20' },
        { id: 'dev-13', type: 'pc', x: 780, y: 460, label: 'PC-Op-5', ip: '192.168.20.14', vlan: '20' },
        { id: 'dev-14', type: 'pc', x: 940, y: 460, label: 'PC-Op-6', ip: '192.168.20.15', vlan: '20' },
        { id: 'dev-15', type: 'ap', x: 800, y: 660, label: 'AP-Centro', ip: '192.168.99.5', vlan: '99' },
        // Sala reuniones
        { id: 'dev-16', type: 'tv', x: 1300, y: 220, label: 'TV Conferencias', ip: '', vlan: '' },
        { id: 'dev-17', type: 'ap', x: 1200, y: 320, label: 'AP-Reuniones', ip: '192.168.99.6', vlan: '99' },
        // Pasillo
        { id: 'dev-18', type: 'camera', x: 800, y: 880, label: 'CCTV-1', ip: '192.168.50.10', vlan: '50' }
    );
    fpState.texts.push(
        { id: 'text-1', x: 600, y: 100, text: '🏢 OFICINA — Planta principal', size: 20 },
        { id: 'text-2', x: 1180, y: 760, text: 'RACK', size: 12 }
    );
    fpState.counter = 40;
}

function fpBuildSchool() {
    fpState.walls.push(
        { id: 'wall-1', x1: 200, y1: 200, x2: 1400, y2: 200, thickness: 8 },
        { id: 'wall-2', x1: 1400, y1: 200, x2: 1400, y2: 900, thickness: 8 },
        { id: 'wall-3', x1: 1400, y1: 900, x2: 200, y2: 900, thickness: 8 },
        { id: 'wall-4', x1: 200, y1: 900, x2: 200, y2: 200, thickness: 8 },
        // Pasillo central
        { id: 'wall-5', x1: 200, y1: 480, x2: 1400, y2: 480, thickness: 6 },
        { id: 'wall-6', x1: 200, y1: 620, x2: 1400, y2: 620, thickness: 6 },
        // Aulas
        { id: 'wall-7', x1: 700, y1: 200, x2: 700, y2: 480, thickness: 6 },
        { id: 'wall-8', x1: 1100, y1: 200, x2: 1100, y2: 480, thickness: 6 },
        // Sala profes + CPD
        { id: 'wall-9', x1: 700, y1: 620, x2: 700, y2: 900, thickness: 6 },
        { id: 'wall-10', x1: 1100, y1: 620, x2: 1100, y2: 900, thickness: 6 }
    );
    fpState.zones.push(
        { id: 'zone-1', x: 220, y: 220, w: 460, h: 240, label: '🎒 Aula A — Primaria', fill: '#D5F5E3', stroke: '#229954' },
        { id: 'zone-2', x: 720, y: 220, w: 360, h: 240, label: '🎒 Aula B — Secundaria', fill: '#D6EAF8', stroke: '#2874A6' },
        { id: 'zone-3', x: 1120, y: 220, w: 260, h: 240, label: '💻 Aula informática', fill: '#FCF3CF', stroke: '#B7950B' },
        { id: 'zone-4', x: 220, y: 500, w: 1160, h: 100, label: 'Pasillo', fill: '#F8F9F9', stroke: '#B2BABB' },
        { id: 'zone-5', x: 220, y: 640, w: 460, h: 240, label: '☕ Sala de profesores', fill: '#FAE5D3', stroke: '#BA4A00' },
        { id: 'zone-6', x: 720, y: 640, w: 360, h: 240, label: '📚 Biblioteca', fill: '#E8DAEF', stroke: '#6C3483' },
        { id: 'zone-7', x: 1120, y: 640, w: 260, h: 240, label: '🖥️ CPD', fill: '#E5E7E9', stroke: '#566573' }
    );
    fpState.doors.push(
        { id: 'door-1', x: 450, y: 480, w: 40, rot: 0 },
        { id: 'door-2', x: 880, y: 480, w: 40, rot: 0 },
        { id: 'door-3', x: 1240, y: 480, w: 40, rot: 0 },
        { id: 'door-4', x: 450, y: 620, w: 40, rot: 0 },
        { id: 'door-5', x: 880, y: 620, w: 40, rot: 0 },
        { id: 'door-6', x: 1240, y: 620, w: 40, rot: 0 }
    );
    fpState.devices.push(
        // CPD
        { id: 'dev-1', type: 'firewall', x: 1180, y: 700, label: 'Firewall', ip: '10.0.0.1', vlan: '99' },
        { id: 'dev-2', type: 'router', x: 1240, y: 700, label: 'Router', ip: '10.0.0.2', vlan: '99' },
        { id: 'dev-3', type: 'switch', x: 1300, y: 700, label: 'Switch Core', ip: '10.0.0.3', vlan: '99' },
        { id: 'dev-4', type: 'server', x: 1240, y: 800, label: 'Servidor', ip: '10.0.0.10', vlan: '99' },
        // Aulas
        { id: 'dev-5', type: 'ap', x: 450, y: 350, label: 'AP-AulaA', ip: '192.168.10.1', vlan: '10' },
        { id: 'dev-6', type: 'tablet', x: 300, y: 350, label: 'Tablet 1', ip: '', vlan: '10' },
        { id: 'dev-7', type: 'tablet', x: 600, y: 350, label: 'Tablet 2', ip: '', vlan: '10' },
        { id: 'dev-8', type: 'ap', x: 900, y: 350, label: 'AP-AulaB', ip: '192.168.20.1', vlan: '20' },
        { id: 'dev-9', type: 'laptop', x: 800, y: 350, label: 'Portátil prof', ip: '', vlan: '20' },
        // Informática
        { id: 'dev-10', type: 'pc', x: 1180, y: 320, label: 'PC-Info-1', ip: '192.168.30.10', vlan: '30' },
        { id: 'dev-11', type: 'pc', x: 1280, y: 320, label: 'PC-Info-2', ip: '192.168.30.11', vlan: '30' },
        { id: 'dev-12', type: 'pc', x: 1180, y: 420, label: 'PC-Info-3', ip: '192.168.30.12', vlan: '30' },
        { id: 'dev-13', type: 'pc', x: 1280, y: 420, label: 'PC-Info-4', ip: '192.168.30.13', vlan: '30' },
        // Profes
        { id: 'dev-14', type: 'laptop', x: 350, y: 760, label: 'PC-Profe-1', ip: '192.168.40.10', vlan: '40' },
        { id: 'dev-15', type: 'laptop', x: 500, y: 760, label: 'PC-Profe-2', ip: '192.168.40.11', vlan: '40' },
        { id: 'dev-16', type: 'printer', x: 620, y: 760, label: 'Impr. profes', ip: '192.168.40.50', vlan: '40' },
        // Biblioteca
        { id: 'dev-17', type: 'pc', x: 800, y: 760, label: 'PC-Biblio', ip: '192.168.50.10', vlan: '50' },
        { id: 'dev-18', type: 'ap', x: 1000, y: 760, label: 'AP-Biblio', ip: '192.168.50.5', vlan: '50' }
    );
    fpState.texts.push(
        { id: 'text-1', x: 700, y: 180, text: '🎒 COLEGIO — Planta única', size: 20 }
    );
    fpState.counter = 40;
}

function fpBuildRestaurant() {
    fpState.walls.push(
        { id: 'wall-1', x1: 200, y1: 200, x2: 1400, y2: 200, thickness: 8 },
        { id: 'wall-2', x1: 1400, y1: 200, x2: 1400, y2: 900, thickness: 8 },
        { id: 'wall-3', x1: 1400, y1: 900, x2: 200, y2: 900, thickness: 8 },
        { id: 'wall-4', x1: 200, y1: 900, x2: 200, y2: 200, thickness: 8 },
        // Cocina
        { id: 'wall-5', x1: 1000, y1: 200, x2: 1000, y2: 700, thickness: 6 },
        { id: 'wall-6', x1: 1000, y1: 700, x2: 1400, y2: 700, thickness: 6 },
        // Barra
        { id: 'wall-7', x1: 200, y1: 400, x2: 600, y2: 400, thickness: 6 },
        // Aseos
        { id: 'wall-8', x1: 1000, y1: 750, x2: 1200, y2: 750, thickness: 6 },
        { id: 'wall-9', x1: 1200, y1: 700, x2: 1200, y2: 900, thickness: 6 }
    );
    fpState.zones.push(
        { id: 'zone-1', x: 220, y: 220, w: 380, h: 160, label: '🍷 Barra', fill: '#FAE5D3', stroke: '#BA4A00' },
        { id: 'zone-2', x: 220, y: 420, w: 760, h: 460, label: '🍽️ Sala de comensales', fill: '#D6EAF8', stroke: '#2874A6' },
        { id: 'zone-3', x: 620, y: 220, w: 360, h: 160, label: 'Entrada / TPV', fill: '#FCF3CF', stroke: '#B7950B' },
        { id: 'zone-4', x: 1020, y: 220, w: 360, h: 460, label: '👨‍🍳 Cocina', fill: '#D5F5E3', stroke: '#229954' },
        { id: 'zone-5', x: 1020, y: 720, w: 160, h: 160, label: '🚻 Aseos', fill: '#F8F9F9', stroke: '#B2BABB' },
        { id: 'zone-6', x: 1220, y: 720, w: 160, h: 160, label: '🖥️ CPD', fill: '#E5E7E9', stroke: '#566573' }
    );
    fpState.doors.push(
        { id: 'door-1', x: 1000, y: 450, w: 40, rot: 90 },
        { id: 'door-2', x: 1100, y: 750, w: 40, rot: 0 },
        { id: 'door-3', x: 1280, y: 700, w: 40, rot: 90 }
    );
    fpState.devices.push(
        // CPD
        { id: 'dev-1', type: 'router', x: 1280, y: 760, label: 'Router fibra', ip: '192.168.1.1', vlan: '' },
        { id: 'dev-2', type: 'switch', x: 1340, y: 760, label: 'Switch 8p', ip: '192.168.1.2', vlan: '99' },
        // TPV
        { id: 'dev-3', type: 'pc', x: 700, y: 300, label: 'TPV principal', ip: '192.168.10.10', vlan: '10' },
        { id: 'dev-4', type: 'printer', x: 850, y: 300, label: 'Impr. tickets', ip: '192.168.10.50', vlan: '10' },
        // Cocina
        { id: 'dev-5', type: 'tablet', x: 1200, y: 350, label: 'KDS Cocina', ip: '192.168.20.10', vlan: '20' },
        { id: 'dev-6', type: 'printer', x: 1200, y: 500, label: 'Impr. cocina', ip: '192.168.20.50', vlan: '20' },
        // WiFi clientes
        { id: 'dev-7', type: 'ap', x: 500, y: 600, label: 'AP-Clientes', ip: '192.168.30.1', vlan: '30' },
        { id: 'dev-8', type: 'smartphone', x: 350, y: 700, label: 'Cliente WiFi', ip: '', vlan: '30' },
        { id: 'dev-9', type: 'smartphone', x: 600, y: 700, label: 'Cliente WiFi 2', ip: '', vlan: '30' },
        // Cámaras
        { id: 'dev-10', type: 'camera', x: 300, y: 250, label: 'CCTV barra', ip: '192.168.99.10', vlan: '99' },
        { id: 'dev-11', type: 'camera', x: 1100, y: 250, label: 'CCTV cocina', ip: '192.168.99.11', vlan: '99' }
    );
    fpState.texts.push(
        { id: 'text-1', x: 700, y: 180, text: '🍽️ RESTAURANTE — Plano', size: 20 }
    );
    fpState.counter = 30;
}
