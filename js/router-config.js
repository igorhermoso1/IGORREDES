/* ============================================
   ROUTER-CONFIG.JS — Simulador CLI de router
   Emula la configuración de un router estilo Cisco IOS / similar
   ============================================ */

// Estado del router simulado
const routerState = {
    hostname: 'Router',
    mode: 'user',            // user | privileged | config | interface | dhcp | wifi | vlan | acl
    contextArg: null,        // nombre interfaz/vlan/dhcp pool actual
    enableSecret: '',
    interfaces: {
        'GigabitEthernet0/0': { ip: '', mask: '', desc: '', up: false, nat: 'inside' },
        'GigabitEthernet0/1': { ip: '', mask: '', desc: '', up: false, nat: 'inside' },
        'Serial0/0/0':        { ip: '', mask: '', desc: '', up: false, nat: 'outside' }
    },
    dhcpPools: {},           // { POOL_NAME: { network: '', mask: '', gateway: '', dns: '', excluded: [] } }
    vlans: {},               // { id: { name: '' } }
    wifi: {
        ssid: '',
        password: '',
        security: 'WPA2',
        band: '2.4',
        channel: 'auto',
        enabled: false
    },
    nat: {
        enabled: false,
        overload: false,
        accessList: null
    },
    routes: [],              // [{ network, mask, nextHop }]
    accessLists: {},         // { id: [{ action, ip }] }
    startupConfig: null,     // string con la config guardada
    history: [],
    historyIdx: -1,
    output: []               // líneas mostradas
};

// Catálogo de pistas y validaciones según el modo
const RC_PROMPTS = {
    user:        () => `${routerState.hostname}> `,
    privileged:  () => `${routerState.hostname}# `,
    config:      () => `${routerState.hostname}(config)# `,
    interface:   () => `${routerState.hostname}(config-if)# `,
    dhcp:        () => `${routerState.hostname}(dhcp-config)# `,
    wifi:        () => `${routerState.hostname}(config-wifi)# `,
    vlan:        () => `${routerState.hostname}(config-vlan)# `,
    acl:         () => `${routerState.hostname}(config-acl)# `
};

// Lecciones / tutorial paso a paso
const RC_LESSONS = [
    {
        id: 'l1',
        title: '🎯 Lección 1 — Acceso básico al router',
        goal: 'Aprende a navegar entre los modos de configuración',
        steps: [
            { cmd: 'enable', hint: 'Entra al modo privilegiado (como hacerse root).' },
            { cmd: 'configure terminal', hint: 'Entra al modo de configuración global.' },
            { cmd: 'hostname RouterDeIgor', hint: 'Cambia el nombre del router.' },
            { cmd: 'exit', hint: 'Vuelve al modo privilegiado.' },
            { cmd: 'show running-config', hint: 'Muestra la configuración actual.' }
        ]
    },
    {
        id: 'l2',
        title: '🌐 Lección 2 — Configurar IP en una interfaz LAN',
        goal: 'Configura GigabitEthernet0/0 con IP 192.168.1.1/24',
        steps: [
            { cmd: 'enable' },
            { cmd: 'configure terminal' },
            { cmd: 'interface GigabitEthernet0/0', hint: 'Entra a configurar el puerto LAN.' },
            { cmd: 'description LAN principal', hint: 'Descripción del puerto.' },
            { cmd: 'ip address 192.168.1.1 255.255.255.0', hint: 'Asigna IP + máscara.' },
            { cmd: 'no shutdown', hint: 'Levanta el puerto. Las interfaces vienen apagadas por defecto.' },
            { cmd: 'exit' },
            { cmd: 'exit' },
            { cmd: 'show ip interface brief', hint: 'Comprueba que está UP.' }
        ]
    },
    {
        id: 'l3',
        title: '📡 Lección 3 — Servidor DHCP',
        goal: 'Crea un pool DHCP para la red 192.168.1.0/24',
        steps: [
            { cmd: 'enable' },
            { cmd: 'configure terminal' },
            { cmd: 'ip dhcp excluded-address 192.168.1.1 192.168.1.10', hint: 'Reserva las primeras IPs.' },
            { cmd: 'ip dhcp pool LAN_POOL', hint: 'Crea el pool con un nombre.' },
            { cmd: 'network 192.168.1.0 255.255.255.0', hint: 'Define la red a repartir.' },
            { cmd: 'default-router 192.168.1.1', hint: 'Puerta de enlace (este router).' },
            { cmd: 'dns-server 8.8.8.8 1.1.1.1', hint: 'Servidores DNS.' },
            { cmd: 'exit' },
            { cmd: 'show ip dhcp pool', hint: 'Verifica el pool.' }
        ]
    },
    {
        id: 'l4',
        title: '📶 Lección 4 — Configurar el WiFi',
        goal: 'Activa el WiFi con SSID "IgorNet", WPA2 y banda 5 GHz',
        steps: [
            { cmd: 'enable' },
            { cmd: 'configure terminal' },
            { cmd: 'wifi', hint: 'Entra al modo configuración WiFi.' },
            { cmd: 'ssid IgorNet', hint: 'Nombre de la red.' },
            { cmd: 'password Igor2026!Net', hint: 'Contraseña.' },
            { cmd: 'security wpa2', hint: 'Cifrado WPA2.' },
            { cmd: 'band 5', hint: 'Banda 5 GHz.' },
            { cmd: 'enable', hint: 'Activa el WiFi (dentro de modo wifi, no es entrar al privilegiado).' },
            { cmd: 'exit' },
            { cmd: 'show wifi', hint: 'Comprueba la configuración.' }
        ]
    },
    {
        id: 'l5',
        title: '🌍 Lección 5 — Salida a internet con NAT',
        goal: 'Configura NAT con overload (PAT) para que la LAN salga por la WAN',
        steps: [
            { cmd: 'enable' },
            { cmd: 'configure terminal' },
            { cmd: 'interface GigabitEthernet0/1', hint: 'Entra al puerto WAN.' },
            { cmd: 'ip address 200.45.10.2 255.255.255.252', hint: 'IP pública asignada por el ISP.' },
            { cmd: 'ip nat outside', hint: 'Marca esta interfaz como "salida".' },
            { cmd: 'no shutdown' },
            { cmd: 'exit' },
            { cmd: 'interface GigabitEthernet0/0' },
            { cmd: 'ip nat inside', hint: 'Marca la LAN como "entrada".' },
            { cmd: 'exit' },
            { cmd: 'access-list 1 permit 192.168.1.0 0.0.0.255', hint: 'Permite todo el tráfico de la LAN.' },
            { cmd: 'ip nat inside source list 1 interface GigabitEthernet0/1 overload', hint: 'Activa PAT (NAT con overload).' },
            { cmd: 'show ip nat translations', hint: 'Verifica traducciones.' }
        ]
    },
    {
        id: 'l6',
        title: '🏷️ Lección 6 — Crear VLANs',
        goal: 'Crea VLAN 10 (RRHH) y VLAN 20 (Ventas)',
        steps: [
            { cmd: 'enable' },
            { cmd: 'configure terminal' },
            { cmd: 'vlan 10' },
            { cmd: 'name RRHH' },
            { cmd: 'exit' },
            { cmd: 'vlan 20' },
            { cmd: 'name VENTAS' },
            { cmd: 'exit' },
            { cmd: 'show vlan' }
        ]
    },
    {
        id: 'l7',
        title: '🗺️ Lección 7 — Ruta estática por defecto',
        goal: 'Configura la salida por defecto hacia el ISP',
        steps: [
            { cmd: 'enable' },
            { cmd: 'configure terminal' },
            { cmd: 'ip route 0.0.0.0 0.0.0.0 200.45.10.1', hint: 'Todo lo que no sé enrutar, va al ISP.' },
            { cmd: 'exit' },
            { cmd: 'show ip route' }
        ]
    },
    {
        id: 'l8',
        title: '💾 Lección 8 — Guardar la configuración',
        goal: 'Persiste los cambios para que sobrevivan a un reinicio',
        steps: [
            { cmd: 'enable' },
            { cmd: 'copy running-config startup-config', hint: 'Equivalente al "write memory" de toda la vida.' },
            { cmd: 'show startup-config' }
        ]
    }
];

let rcCurrentLesson = null;
let rcCurrentStep = 0;

// ============================================
// RENDER
// ============================================

function renderRouterConfigPage() {
    const container = document.getElementById('routerConfigContent');
    if (!container) return;

    container.innerHTML = `
        <div class="info-box" style="margin-bottom:18px;">
            🖥️ <strong>Simulador de configuración de router.</strong> Aprende a configurar un router como en la vida real, con CLI estilo Cisco IOS. Lecciones guiadas + terminal libre.
            <button class="btn btn-secondary" onclick="openTutorial('routerConfig')" style="margin-left:14px; padding:6px 14px;">📖 Ver tutorial</button>
        </div>

        <div class="rc-layout">
            <!-- LECCIONES IZQUIERDA -->
            <div class="rc-lessons">
                <h3 style="color:var(--azul-oscuro); margin-bottom:14px;">📚 Lecciones guiadas</h3>
                <div id="rcLessonsList"></div>

                <h3 style="color:var(--azul-oscuro); margin:20px 0 10px;">🎮 Modo libre</h3>
                <button class="btn btn-secondary" onclick="rcFreeMode()" style="width:100%;">
                    🚀 Explorar sin guía
                </button>

                <h3 style="color:var(--azul-oscuro); margin:20px 0 10px;">⚙️ Estado del router</h3>
                <div class="rc-state-summary" id="rcStateSummary"></div>
            </div>

            <!-- TERMINAL CENTRAL -->
            <div class="rc-terminal-wrapper">
                <div class="rc-terminal-header">
                    <span class="rc-terminal-title">💻 CLI — <span id="rcHostname">${routerState.hostname}</span></span>
                    <div class="rc-terminal-actions">
                        <button class="rc-action-btn" onclick="rcClear()" title="Limpiar pantalla">🧹 Clear</button>
                        <button class="rc-action-btn" onclick="rcReset()" title="Resetear router">⚠️ Reset</button>
                        <button class="rc-action-btn" onclick="rcShowRunning()" title="Mostrar config">📜 Running</button>
                    </div>
                </div>
                <div class="rc-terminal" id="rcTerminal" onclick="document.getElementById('rcInput').focus()"></div>
                <div class="rc-input-row">
                    <span class="rc-prompt" id="rcPrompt">${RC_PROMPTS.user()}</span>
                    <input type="text" class="rc-input" id="rcInput" autocomplete="off" spellcheck="false"
                           placeholder="Escribe un comando y pulsa Enter (prueba: enable, configure terminal, ?)"
                           onkeydown="rcOnKey(event)">
                </div>
            </div>

            <!-- AYUDA DERECHA -->
            <div class="rc-help">
                <h3 style="color:var(--azul-oscuro); margin-bottom:12px;">🧭 ¿En qué modo estoy?</h3>
                <div class="rc-mode-info" id="rcModeInfo"></div>

                <h3 style="color:var(--azul-oscuro); margin:18px 0 10px;">💡 Comandos disponibles</h3>
                <div class="rc-commands-list" id="rcCommandsList"></div>

                <h3 style="color:var(--azul-oscuro); margin:18px 0 10px;">🎯 Lección actual</h3>
                <div class="rc-lesson-progress" id="rcLessonProgress"></div>
            </div>
        </div>
    `;

    rcRenderLessonsList();
    rcRenderModeInfo();
    rcRenderCommandsList();
    rcRenderStateSummary();
    rcRenderLessonProgress();
    rcWelcome();

    // Foco al terminal
    setTimeout(() => {
        const inp = document.getElementById('rcInput');
        if (inp) inp.focus();
    }, 200);
}

function rcWelcome() {
    rcPrint('', 'plain');
    rcPrint('╔══════════════════════════════════════════════════════════╗', 'header');
    rcPrint('║  Bienvenido al simulador de configuración de router      ║', 'header');
    rcPrint('║  REDACADEMIA — IOS-like emulation                        ║', 'header');
    rcPrint('╚══════════════════════════════════════════════════════════╝', 'header');
    rcPrint('', 'plain');
    rcPrint('Estás en modo USUARIO. Escribe "enable" para entrar a privilegiado,', 'info');
    rcPrint('o "?" para ver los comandos disponibles en cada modo.', 'info');
    rcPrint('Tip: pulsa ↑/↓ para navegar tu historial de comandos.', 'info');
    rcPrint('', 'plain');
}

// ============================================
// IMPRESIÓN
// ============================================

function rcPrint(text, kind = 'plain') {
    routerState.output.push({ text, kind });
    const term = document.getElementById('rcTerminal');
    if (!term) return;
    const div = document.createElement('div');
    div.className = 'rc-line rc-line-' + kind;
    if (kind === 'cmd') {
        div.innerHTML = `<span class="rc-line-prompt">${escapeHtml(text.prompt)}</span><span>${escapeHtml(text.cmd)}</span>`;
    } else {
        div.textContent = text;
    }
    term.appendChild(div);
    term.scrollTop = term.scrollHeight;
}

function rcPrintCmd(prompt, cmd) {
    const term = document.getElementById('rcTerminal');
    if (!term) return;
    const div = document.createElement('div');
    div.className = 'rc-line rc-line-cmd';
    div.innerHTML = `<span class="rc-line-prompt">${escapeHtml(prompt)}</span><span class="rc-line-typed">${escapeHtml(cmd)}</span>`;
    term.appendChild(div);
    term.scrollTop = term.scrollHeight;
}

function escapeHtml(s) {
    if (s === null || s === undefined) return '';
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ============================================
// MANEJO DE TECLAS
// ============================================

function rcOnKey(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        const inp = document.getElementById('rcInput');
        const cmd = inp.value;
        inp.value = '';
        if (cmd.trim()) {
            routerState.history.push(cmd);
            routerState.historyIdx = routerState.history.length;
        }
        rcExecute(cmd);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (routerState.historyIdx > 0) {
            routerState.historyIdx--;
            document.getElementById('rcInput').value = routerState.history[routerState.historyIdx] || '';
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (routerState.historyIdx < routerState.history.length - 1) {
            routerState.historyIdx++;
            document.getElementById('rcInput').value = routerState.history[routerState.historyIdx] || '';
        } else {
            routerState.historyIdx = routerState.history.length;
            document.getElementById('rcInput').value = '';
        }
    } else if (e.key === 'Tab') {
        e.preventDefault();
        rcAutocomplete();
    } else if (e.key === '?') {
        // No prevenir, dejar entrar el ?
    }
}

function rcAutocomplete() {
    const inp = document.getElementById('rcInput');
    const cur = inp.value.trim().toLowerCase();
    if (!cur) return;
    const cmds = rcAvailableCommands();
    const matches = cmds.filter(c => c.toLowerCase().startsWith(cur));
    if (matches.length === 1) {
        inp.value = matches[0] + ' ';
    } else if (matches.length > 1) {
        rcPrintCmd(RC_PROMPTS[routerState.mode](), inp.value);
        rcPrint('Posibles comandos: ' + matches.join(', '), 'info');
    }
}

// ============================================
// EJECUCIÓN DE COMANDOS
// ============================================

function rcExecute(rawCmd) {
    const cmd = rawCmd.trim();
    const prompt = RC_PROMPTS[routerState.mode]();
    rcPrintCmd(prompt, cmd);

    if (!cmd) return;

    if (cmd === '?') return rcShowHelp();
    if (cmd === 'history') return rcShowHistory();

    // Parser principal por modo
    let handled = false;
    if (routerState.mode === 'user')       handled = rcHandleUser(cmd);
    else if (routerState.mode === 'privileged') handled = rcHandlePrivileged(cmd);
    else if (routerState.mode === 'config')     handled = rcHandleConfig(cmd);
    else if (routerState.mode === 'interface')  handled = rcHandleInterface(cmd);
    else if (routerState.mode === 'dhcp')       handled = rcHandleDhcp(cmd);
    else if (routerState.mode === 'wifi')       handled = rcHandleWifi(cmd);
    else if (routerState.mode === 'vlan')       handled = rcHandleVlan(cmd);
    else if (routerState.mode === 'acl')        handled = rcHandleAcl(cmd);

    if (!handled) {
        rcPrint(`% Comando incorrecto: "${cmd}"`, 'error');
        rcPrint('  Sugerencia: escribe "?" para ver los comandos disponibles en este modo.', 'info');
    }

    rcUpdatePrompt();
    rcRenderModeInfo();
    rcRenderCommandsList();
    rcRenderStateSummary();

    // Check progreso de lección
    if (rcCurrentLesson) rcCheckLessonProgress(cmd);
}

function rcUpdatePrompt() {
    const el = document.getElementById('rcPrompt');
    if (el) el.textContent = RC_PROMPTS[routerState.mode]();
    const hn = document.getElementById('rcHostname');
    if (hn) hn.textContent = routerState.hostname;
}

// ====== HANDLERS POR MODO ======

function rcHandleUser(cmd) {
    const lc = cmd.toLowerCase();
    if (lc === 'enable' || lc === 'en') {
        routerState.mode = 'privileged';
        if (routerState.enableSecret) {
            rcPrint('Password: (en este simulador no hace falta escribirla)', 'info');
        }
        return true;
    }
    if (lc === 'exit' || lc === 'logout' || lc === 'quit') {
        rcPrint('Logout. Pulsa cualquier tecla para reconectar.', 'info');
        return true;
    }
    if (lc.startsWith('show ')) {
        return rcHandleShow(lc.substring(5));
    }
    if (lc === 'ping' || lc.startsWith('ping ')) {
        const target = cmd.split(' ').slice(1).join(' ').trim() || '8.8.8.8';
        rcPrint(`Pinging ${target}...`, 'info');
        rcPrint(`Reply from ${target}: bytes=32 time<1ms TTL=64`, 'success');
        rcPrint(`Reply from ${target}: bytes=32 time<1ms TTL=64`, 'success');
        rcPrint(`Reply from ${target}: bytes=32 time<1ms TTL=64`, 'success');
        rcPrint(`Reply from ${target}: bytes=32 time<1ms TTL=64`, 'success');
        rcPrint(`Ping statistics for ${target}: Sent = 4, Received = 4, Lost = 0 (0% loss)`, 'success');
        return true;
    }
    return false;
}

function rcHandlePrivileged(cmd) {
    const lc = cmd.toLowerCase();
    if (lc === 'configure terminal' || lc === 'conf t' || lc === 'config t' || lc === 'config terminal') {
        routerState.mode = 'config';
        rcPrint('Enter configuration commands, one per line. End with CNTL/Z (o "end").', 'info');
        return true;
    }
    if (lc === 'disable' || lc === 'exit') {
        routerState.mode = 'user';
        return true;
    }
    if (lc.startsWith('show ')) {
        return rcHandleShow(lc.substring(5));
    }
    if (lc === 'copy running-config startup-config' || lc === 'wr' || lc === 'write memory' || lc === 'write') {
        routerState.startupConfig = rcBuildRunningConfig();
        rcPrint('Building configuration...', 'info');
        rcPrint('[OK]', 'success');
        addXP(20, 'Configuración guardada en NVRAM');
        return true;
    }
    if (lc === 'reload') {
        rcPrint('Proceed with reload? [confirm] yes', 'info');
        rcPrint('System reset. (en este simulador no se reinicia)', 'info');
        return true;
    }
    if (lc.startsWith('ping')) {
        return rcHandleUser(cmd);
    }
    if (lc === 'clear ip nat translations *') {
        rcPrint('Translation table cleared.', 'success');
        return true;
    }
    return false;
}

function rcHandleConfig(cmd) {
    const parts = cmd.split(/\s+/);
    const lc = cmd.toLowerCase();
    const p0 = parts[0].toLowerCase();

    if (lc === 'exit' || lc === 'end') {
        routerState.mode = 'privileged';
        return true;
    }

    if (p0 === 'hostname' && parts[1]) {
        routerState.hostname = parts[1];
        rcPrint(`Hostname cambiado a "${parts[1]}"`, 'success');
        return true;
    }

    if (p0 === 'enable' && parts[1] === 'secret' && parts[2]) {
        routerState.enableSecret = parts.slice(2).join(' ');
        rcPrint('Enable secret configurado.', 'success');
        return true;
    }

    if (p0 === 'interface' && parts[1]) {
        const iface = rcResolveInterface(parts[1]);
        if (!routerState.interfaces[iface]) {
            rcPrint(`% Interfaz desconocida: ${parts[1]}`, 'error');
            rcPrint(`  Disponibles: ${Object.keys(routerState.interfaces).join(', ')}`, 'info');
            return true;
        }
        routerState.mode = 'interface';
        routerState.contextArg = iface;
        return true;
    }

    if (p0 === 'ip' && parts[1] === 'dhcp' && parts[2] === 'pool' && parts[3]) {
        const name = parts[3];
        routerState.dhcpPools[name] = routerState.dhcpPools[name] || { network: '', mask: '', gateway: '', dns: '', excluded: [] };
        routerState.mode = 'dhcp';
        routerState.contextArg = name;
        return true;
    }

    if (p0 === 'ip' && parts[1] === 'dhcp' && parts[2] === 'excluded-address') {
        const from = parts[3];
        const to = parts[4] || from;
        // Guardamos como exclusión global del último pool, o solo logueamos
        rcPrint(`Excluded ${from}${to !== from ? ' - ' + to : ''} from DHCP pools.`, 'success');
        return true;
    }

    if (p0 === 'wifi' || (p0 === 'wireless')) {
        routerState.mode = 'wifi';
        return true;
    }

    if (p0 === 'vlan' && parts[1]) {
        const id = parseInt(parts[1]);
        if (isNaN(id) || id < 1 || id > 4094) {
            rcPrint('% VLAN ID debe estar entre 1 y 4094', 'error');
            return true;
        }
        routerState.vlans[id] = routerState.vlans[id] || { name: `VLAN${id}` };
        routerState.mode = 'vlan';
        routerState.contextArg = id;
        return true;
    }

    if (p0 === 'access-list' && parts[1]) {
        const id = parts[1];
        const action = parts[2];
        const network = parts[3];
        const wildcard = parts[4];
        if (action && network) {
            routerState.accessLists[id] = routerState.accessLists[id] || [];
            routerState.accessLists[id].push({ action, network, wildcard });
            rcPrint(`Access-list ${id} ${action} ${network}${wildcard ? ' ' + wildcard : ''} añadido.`, 'success');
            return true;
        }
    }

    if (p0 === 'ip' && parts[1] === 'nat' && parts[2] === 'inside' && parts[3] === 'source' && parts[4] === 'list') {
        const listId = parts[5];
        const ifaceArg = parts[7];
        const overload = parts[8] === 'overload';
        routerState.nat.enabled = true;
        routerState.nat.overload = overload;
        routerState.nat.accessList = listId;
        routerState.nat.outsideInterface = ifaceArg;
        rcPrint(`NAT inside source configurado${overload ? ' con overload (PAT)' : ''}.`, 'success');
        return true;
    }

    if (p0 === 'ip' && parts[1] === 'route') {
        const network = parts[2];
        const mask = parts[3];
        const nextHop = parts[4];
        if (network && mask && nextHop) {
            routerState.routes.push({ network, mask, nextHop });
            rcPrint(`Ruta estática añadida: ${network}/${mask} → ${nextHop}`, 'success');
            return true;
        }
    }

    if (lc.startsWith('no ')) {
        rcPrint(`(simulador) Comando "no" reconocido pero no totalmente implementado.`, 'info');
        return true;
    }

    return false;
}

function rcHandleInterface(cmd) {
    const parts = cmd.split(/\s+/);
    const p0 = parts[0].toLowerCase();
    const iface = routerState.contextArg;
    const ifObj = routerState.interfaces[iface];

    if (cmd.toLowerCase() === 'exit' || cmd.toLowerCase() === 'end') {
        routerState.mode = 'config';
        routerState.contextArg = null;
        return true;
    }

    if (p0 === 'ip' && parts[1] === 'address' && parts[2] && parts[3]) {
        const ip = parts[2];
        const mask = parts[3];
        if (!rcValidateIp(ip)) { rcPrint(`% IP inválida: ${ip}`, 'error'); return true; }
        if (!rcValidateIp(mask)) { rcPrint(`% Máscara inválida: ${mask}`, 'error'); return true; }
        ifObj.ip = ip;
        ifObj.mask = mask;
        rcPrint(`IP ${ip} ${mask} asignada a ${iface}.`, 'success');
        return true;
    }

    if (p0 === 'description') {
        ifObj.desc = parts.slice(1).join(' ');
        return true;
    }

    if (cmd.toLowerCase() === 'no shutdown' || cmd.toLowerCase() === 'no shut') {
        ifObj.up = true;
        rcPrint(`%LINK-3-UPDOWN: Interface ${iface}, changed state to up`, 'success');
        rcPrint(`%LINEPROTO-5-UPDOWN: Line protocol on Interface ${iface}, changed state to up`, 'success');
        return true;
    }

    if (cmd.toLowerCase() === 'shutdown') {
        ifObj.up = false;
        rcPrint(`%LINK-5-CHANGED: Interface ${iface}, changed state to administratively down`, 'info');
        return true;
    }

    if (p0 === 'ip' && parts[1] === 'nat') {
        if (parts[2] === 'inside') { ifObj.nat = 'inside'; rcPrint(`${iface} marcada como NAT inside.`, 'success'); return true; }
        if (parts[2] === 'outside') { ifObj.nat = 'outside'; rcPrint(`${iface} marcada como NAT outside.`, 'success'); return true; }
    }

    if (p0 === 'switchport' && parts[1] === 'mode') {
        rcPrint(`(simulador) ${iface} switchport mode ${parts[2]} configurado.`, 'success');
        return true;
    }

    if (p0 === 'switchport' && parts[1] === 'access' && parts[2] === 'vlan') {
        rcPrint(`${iface} asignada a VLAN ${parts[3]}.`, 'success');
        return true;
    }

    return false;
}

function rcHandleDhcp(cmd) {
    const parts = cmd.split(/\s+/);
    const p0 = parts[0].toLowerCase();
    const pool = routerState.dhcpPools[routerState.contextArg];

    if (cmd.toLowerCase() === 'exit' || cmd.toLowerCase() === 'end') {
        routerState.mode = 'config';
        routerState.contextArg = null;
        return true;
    }

    if (p0 === 'network' && parts[1] && parts[2]) {
        pool.network = parts[1];
        pool.mask = parts[2];
        rcPrint(`Red ${parts[1]} ${parts[2]} asignada al pool.`, 'success');
        return true;
    }

    if (p0 === 'default-router' && parts[1]) {
        pool.gateway = parts[1];
        rcPrint(`Gateway por defecto: ${parts[1]}`, 'success');
        return true;
    }

    if (p0 === 'dns-server') {
        pool.dns = parts.slice(1).join(' ');
        rcPrint(`DNS: ${pool.dns}`, 'success');
        return true;
    }

    if (p0 === 'domain-name' && parts[1]) {
        pool.domain = parts[1];
        return true;
    }

    if (p0 === 'lease' && parts[1]) {
        pool.lease = parts.slice(1).join(' ');
        rcPrint(`Lease time: ${pool.lease}`, 'success');
        return true;
    }

    return false;
}

function rcHandleWifi(cmd) {
    const parts = cmd.split(/\s+/);
    const p0 = parts[0].toLowerCase();
    const w = routerState.wifi;

    if (cmd.toLowerCase() === 'exit' || cmd.toLowerCase() === 'end') {
        routerState.mode = 'config';
        return true;
    }

    if (p0 === 'ssid' && parts[1]) {
        w.ssid = parts.slice(1).join(' ');
        rcPrint(`SSID = "${w.ssid}"`, 'success');
        return true;
    }

    if (p0 === 'password' && parts[1]) {
        w.password = parts.slice(1).join(' ');
        if (w.password.length < 8) {
            rcPrint(`% Atención: contraseña muy corta. WPA2 requiere mínimo 8 caracteres.`, 'error');
        } else {
            rcPrint(`Contraseña configurada (${w.password.length} caracteres).`, 'success');
        }
        return true;
    }

    if (p0 === 'security' && parts[1]) {
        const s = parts[1].toUpperCase();
        if (['WPA2', 'WPA3', 'WPA', 'WEP', 'OPEN'].includes(s)) {
            w.security = s;
            if (s === 'WEP') rcPrint(`% WEP es INSEGURO. Usa WPA2 o WPA3.`, 'error');
            else if (s === 'OPEN') rcPrint(`% OPEN: red sin contraseña. Solo para portales cautivos.`, 'info');
            else rcPrint(`Security = ${s}`, 'success');
            return true;
        }
        rcPrint(`% Opciones: WPA3, WPA2, WPA, WEP, OPEN`, 'error');
        return true;
    }

    if (p0 === 'band' && parts[1]) {
        if (['2.4', '5', '6'].includes(parts[1])) {
            w.band = parts[1];
            rcPrint(`Banda: ${parts[1]} GHz`, 'success');
            return true;
        }
        rcPrint(`% Bandas válidas: 2.4, 5, 6`, 'error');
        return true;
    }

    if (p0 === 'channel' && parts[1]) {
        w.channel = parts[1];
        rcPrint(`Canal: ${parts[1]}`, 'success');
        return true;
    }

    if (cmd.toLowerCase() === 'enable' || cmd.toLowerCase() === 'no shutdown') {
        if (!w.ssid) { rcPrint(`% Configura primero el SSID.`, 'error'); return true; }
        if (w.security !== 'OPEN' && (!w.password || w.password.length < 8)) {
            rcPrint(`% La contraseña debe tener al menos 8 caracteres para ${w.security}.`, 'error');
            return true;
        }
        w.enabled = true;
        rcPrint(`📶 WiFi ENCENDIDO. SSID "${w.ssid}" emitiendo en ${w.band} GHz con ${w.security}.`, 'success');
        return true;
    }

    if (cmd.toLowerCase() === 'shutdown' || cmd.toLowerCase() === 'no enable') {
        w.enabled = false;
        rcPrint(`WiFi APAGADO.`, 'info');
        return true;
    }

    return false;
}

function rcHandleVlan(cmd) {
    const parts = cmd.split(/\s+/);
    const p0 = parts[0].toLowerCase();
    const vlan = routerState.vlans[routerState.contextArg];

    if (cmd.toLowerCase() === 'exit' || cmd.toLowerCase() === 'end') {
        routerState.mode = 'config';
        routerState.contextArg = null;
        return true;
    }

    if (p0 === 'name' && parts[1]) {
        vlan.name = parts.slice(1).join(' ');
        rcPrint(`VLAN ${routerState.contextArg} renombrada a "${vlan.name}".`, 'success');
        return true;
    }

    return false;
}

function rcHandleAcl(cmd) {
    if (cmd.toLowerCase() === 'exit') { routerState.mode = 'config'; return true; }
    return false;
}

// ====== SHOW COMMANDS ======

function rcHandleShow(args) {
    const a = args.trim().toLowerCase();

    if (a === 'running-config' || a === 'run') {
        rcPrint(rcBuildRunningConfig(), 'config');
        return true;
    }
    if (a === 'startup-config' || a === 'startup') {
        if (!routerState.startupConfig) {
            rcPrint('% No se ha guardado ninguna configuración aún. Usa "copy running-config startup-config".', 'error');
        } else {
            rcPrint(routerState.startupConfig, 'config');
        }
        return true;
    }
    if (a === 'ip interface brief' || a === 'ip int brief') {
        rcPrint('Interface              IP-Address       OK?  Status                Protocol', 'header');
        Object.entries(routerState.interfaces).forEach(([name, i]) => {
            const ip = i.ip || 'unassigned';
            const status = i.up ? 'up' : (i.ip ? 'administratively down' : 'administratively down');
            const proto = i.up ? 'up' : 'down';
            rcPrint(`${name.padEnd(22)} ${ip.padEnd(16)} YES  ${status.padEnd(21)} ${proto}`, 'plain');
        });
        return true;
    }
    if (a === 'ip route' || a === 'route') {
        rcPrint('Routing table:', 'header');
        if (routerState.routes.length === 0) {
            rcPrint('  (vacía — solo redes directamente conectadas)', 'info');
        } else {
            routerState.routes.forEach(r => {
                rcPrint(`  S    ${r.network}/${r.mask} [1/0] via ${r.nextHop}`, 'plain');
            });
        }
        // Conectadas
        Object.entries(routerState.interfaces).forEach(([name, i]) => {
            if (i.ip && i.up) {
                rcPrint(`  C    ${i.ip}/${i.mask} is directly connected, ${name}`, 'plain');
            }
        });
        return true;
    }
    if (a === 'ip dhcp pool' || a.startsWith('ip dhcp')) {
        const pools = Object.entries(routerState.dhcpPools);
        if (pools.length === 0) {
            rcPrint('% No hay pools DHCP configurados.', 'info');
            return true;
        }
        pools.forEach(([name, p]) => {
            rcPrint(`Pool ${name}:`, 'header');
            rcPrint(`  Network: ${p.network} ${p.mask}`, 'plain');
            rcPrint(`  Gateway: ${p.gateway}`, 'plain');
            rcPrint(`  DNS: ${p.dns}`, 'plain');
        });
        return true;
    }
    if (a === 'wifi' || a === 'wireless') {
        const w = routerState.wifi;
        rcPrint('WiFi configuration:', 'header');
        rcPrint(`  SSID:      ${w.ssid || '(no configurado)'}`, 'plain');
        rcPrint(`  Security:  ${w.security}`, 'plain');
        rcPrint(`  Band:      ${w.band} GHz`, 'plain');
        rcPrint(`  Channel:   ${w.channel}`, 'plain');
        rcPrint(`  Status:    ${w.enabled ? '🟢 UP' : '🔴 DOWN'}`, 'plain');
        return true;
    }
    if (a === 'vlan' || a === 'vlan brief') {
        rcPrint('VLAN  Name                         Status', 'header');
        rcPrint('----  ---------------------------- ------', 'header');
        rcPrint('1     default                      active', 'plain');
        Object.entries(routerState.vlans).forEach(([id, v]) => {
            rcPrint(`${String(id).padEnd(5)} ${(v.name).padEnd(28)} active`, 'plain');
        });
        return true;
    }
    if (a === 'ip nat translations' || a === 'ip nat') {
        if (!routerState.nat.enabled) {
            rcPrint('% NAT no está configurado.', 'info');
        } else {
            rcPrint('Pro  Inside global    Inside local     Outside local    Outside global', 'header');
            rcPrint(`tcp  200.45.10.2:1024 192.168.1.10:52341 142.250.78.78:80 142.250.78.78:80`, 'plain');
            rcPrint(`tcp  200.45.10.2:1025 192.168.1.11:53120 1.1.1.1:443      1.1.1.1:443`, 'plain');
            rcPrint(`(simulado: ejemplos representativos)`, 'info');
        }
        return true;
    }
    if (a === 'access-lists' || a === 'access-list') {
        Object.entries(routerState.accessLists).forEach(([id, rules]) => {
            rcPrint(`Standard access list ${id}:`, 'header');
            rules.forEach(r => rcPrint(`  ${r.action} ${r.network} ${r.wildcard || ''}`, 'plain'));
        });
        if (Object.keys(routerState.accessLists).length === 0) {
            rcPrint('% No hay access-lists configuradas.', 'info');
        }
        return true;
    }
    if (a === 'version') {
        rcPrint('REDACADEMIA Router Simulator', 'header');
        rcPrint('IOS-like emulation, version 1.0', 'plain');
        rcPrint(`Hostname: ${routerState.hostname}`, 'plain');
        rcPrint(`Uptime: simulado, eterno.`, 'plain');
        return true;
    }
    if (a === 'clock' || a === 'date') {
        rcPrint(`Date/time: ${new Date().toLocaleString('es-ES')}`, 'plain');
        return true;
    }
    return false;
}

function rcBuildRunningConfig() {
    let out = '!\n';
    out += `! Last configuration change: ${new Date().toLocaleString('es-ES')}\n`;
    out += '!\n';
    out += `hostname ${routerState.hostname}\n`;
    if (routerState.enableSecret) out += `enable secret ${routerState.enableSecret}\n`;
    out += '!\n';
    Object.entries(routerState.interfaces).forEach(([name, i]) => {
        out += `interface ${name}\n`;
        if (i.desc) out += ` description ${i.desc}\n`;
        if (i.ip) out += ` ip address ${i.ip} ${i.mask}\n`;
        if (i.nat === 'inside') out += ` ip nat inside\n`;
        if (i.nat === 'outside') out += ` ip nat outside\n`;
        out += ` ${i.up ? 'no shutdown' : 'shutdown'}\n`;
        out += '!\n';
    });
    Object.entries(routerState.dhcpPools).forEach(([name, p]) => {
        out += `ip dhcp pool ${name}\n`;
        if (p.network) out += ` network ${p.network} ${p.mask}\n`;
        if (p.gateway) out += ` default-router ${p.gateway}\n`;
        if (p.dns) out += ` dns-server ${p.dns}\n`;
        out += '!\n';
    });
    if (routerState.wifi.ssid) {
        out += `wifi\n`;
        out += ` ssid ${routerState.wifi.ssid}\n`;
        out += ` security ${routerState.wifi.security}\n`;
        out += ` band ${routerState.wifi.band}\n`;
        if (routerState.wifi.password) out += ` password ${routerState.wifi.password.replace(/./g, '*')}\n`;
        out += ` ${routerState.wifi.enabled ? 'enable' : 'no enable'}\n`;
        out += '!\n';
    }
    Object.entries(routerState.vlans).forEach(([id, v]) => {
        out += `vlan ${id}\n name ${v.name}\n!\n`;
    });
    Object.entries(routerState.accessLists).forEach(([id, rules]) => {
        rules.forEach(r => {
            out += `access-list ${id} ${r.action} ${r.network}${r.wildcard ? ' ' + r.wildcard : ''}\n`;
        });
    });
    if (routerState.nat.enabled) {
        out += `ip nat inside source list ${routerState.nat.accessList} interface ${routerState.nat.outsideInterface}${routerState.nat.overload ? ' overload' : ''}\n`;
    }
    routerState.routes.forEach(r => {
        out += `ip route ${r.network} ${r.mask} ${r.nextHop}\n`;
    });
    out += '!\nend';
    return out;
}

// ============================================
// VALIDACIONES Y UTILIDADES
// ============================================

function rcValidateIp(ip) {
    if (!ip) return false;
    const parts = ip.split('.');
    if (parts.length !== 4) return false;
    return parts.every(p => {
        const n = parseInt(p);
        return !isNaN(n) && n >= 0 && n <= 255 && String(n) === p.trim();
    });
}

function rcResolveInterface(name) {
    // Permite abreviaturas: g0/0, gi0/0, gig0/0 → GigabitEthernet0/0
    const lc = name.toLowerCase();
    const match = lc.match(/^(g|gi|gig|gigabitethernet)(\d+\/\d+)$/);
    if (match) return 'GigabitEthernet' + match[2];
    const s = lc.match(/^(s|se|ser|serial)(\d+\/\d+\/\d+)$/);
    if (s) return 'Serial' + s[2];
    // Exacto
    const exact = Object.keys(routerState.interfaces).find(k => k.toLowerCase() === lc);
    return exact || name;
}

// ============================================
// COMANDOS DISPONIBLES POR MODO (panel ayuda)
// ============================================

function rcAvailableCommands() {
    const byMode = {
        user: ['enable', 'show running-config', 'show ip interface brief', 'show ip route', 'show vlan', 'show wifi', 'show version', 'ping', 'exit', '?'],
        privileged: ['configure terminal', 'show running-config', 'show startup-config', 'show ip interface brief', 'show ip route', 'show ip dhcp pool', 'show vlan', 'show wifi', 'show ip nat translations', 'copy running-config startup-config', 'ping', 'reload', 'disable', '?'],
        config: ['hostname <nombre>', 'interface <iface>', 'ip dhcp pool <nombre>', 'ip dhcp excluded-address <inicio> <fin>', 'wifi', 'vlan <id>', 'access-list <id> permit|deny <red> <wildcard>', 'ip nat inside source list <id> interface <iface> [overload]', 'ip route <red> <mascara> <next-hop>', 'enable secret <pass>', 'exit', '?'],
        interface: ['ip address <ip> <mascara>', 'description <texto>', 'no shutdown', 'shutdown', 'ip nat inside', 'ip nat outside', 'switchport mode access|trunk', 'switchport access vlan <id>', 'exit'],
        dhcp: ['network <red> <mascara>', 'default-router <ip>', 'dns-server <ip1> [ip2]', 'domain-name <dominio>', 'lease <dias>', 'exit'],
        wifi: ['ssid <nombre>', 'password <pass>', 'security WPA3|WPA2|WPA|WEP|OPEN', 'band 2.4|5|6', 'channel <num>|auto', 'enable', 'shutdown', 'exit'],
        vlan: ['name <nombre>', 'exit'],
        acl: ['permit|deny <red> <wildcard>', 'exit']
    };
    return byMode[routerState.mode] || [];
}

function rcRenderCommandsList() {
    const el = document.getElementById('rcCommandsList');
    if (!el) return;
    const cmds = rcAvailableCommands();
    el.innerHTML = cmds.map(c => `<div class="rc-cmd-item"><code>${escapeHtml(c)}</code></div>`).join('');
}

function rcShowHelp() {
    rcPrint(`Comandos disponibles en modo ${routerState.mode}:`, 'header');
    rcAvailableCommands().forEach(c => rcPrint(`  ${c}`, 'plain'));
}

function rcShowHistory() {
    rcPrint('Historial:', 'header');
    routerState.history.slice(-20).forEach((c, i) => rcPrint(`  ${i + 1}. ${c}`, 'plain'));
}

// ============================================
// PANEL DE AYUDA: modo + estado
// ============================================

function rcRenderModeInfo() {
    const el = document.getElementById('rcModeInfo');
    if (!el) return;
    const descripciones = {
        user: { icon: '👤', name: 'Modo USUARIO', desc: 'Solo lectura. Comandos básicos como ping y algunos show. Para hacer algo serio, escribe <code>enable</code>.' },
        privileged: { icon: '🔑', name: 'Modo PRIVILEGIADO (#)', desc: 'Eres root. Puedes ver todo y entrar al modo configuración con <code>configure terminal</code>.' },
        config: { icon: '⚙️', name: 'Modo CONFIGURACIÓN GLOBAL', desc: 'Aquí se hacen los cambios. Entra a una interfaz con <code>interface g0/0</code>, crea pools DHCP, VLANs, etc.' },
        interface: { icon: '🔌', name: 'Modo INTERFAZ', desc: `Configurando <strong>${routerState.contextArg}</strong>. Asigna IP, descripción, levántala con <code>no shutdown</code>.` },
        dhcp: { icon: '📡', name: 'Modo DHCP POOL', desc: `Configurando pool <strong>${routerState.contextArg}</strong>. Define red, gateway y DNS.` },
        wifi: { icon: '📶', name: 'Modo WiFi', desc: 'Configura SSID, contraseña, seguridad y banda. Luego <code>enable</code> para encender.' },
        vlan: { icon: '🏷️', name: 'Modo VLAN', desc: `Configurando VLAN <strong>${routerState.contextArg}</strong>. Ponle un nombre con <code>name</code>.` },
        acl: { icon: '🛡️', name: 'Modo ACL', desc: 'Reglas de filtrado de tráfico.' }
    };
    const m = descripciones[routerState.mode];
    el.innerHTML = `
        <div class="rc-mode-card">
            <div class="rc-mode-icon">${m.icon}</div>
            <div class="rc-mode-name">${m.name}</div>
            <div class="rc-mode-desc">${m.desc}</div>
        </div>
    `;
}

function rcRenderStateSummary() {
    const el = document.getElementById('rcStateSummary');
    if (!el) return;
    const upInterfaces = Object.entries(routerState.interfaces).filter(([_, i]) => i.up).length;
    const totalInterfaces = Object.keys(routerState.interfaces).length;
    const dhcpCount = Object.keys(routerState.dhcpPools).length;
    const vlanCount = Object.keys(routerState.vlans).length;
    const wifi = routerState.wifi.enabled ? '🟢' : '🔴';
    const nat = routerState.nat.enabled ? '🟢' : '🔴';

    el.innerHTML = `
        <div class="rc-state-row"><span>Hostname:</span><strong>${routerState.hostname}</strong></div>
        <div class="rc-state-row"><span>Interfaces UP:</span><strong>${upInterfaces}/${totalInterfaces}</strong></div>
        <div class="rc-state-row"><span>Pools DHCP:</span><strong>${dhcpCount}</strong></div>
        <div class="rc-state-row"><span>VLANs:</span><strong>${vlanCount}</strong></div>
        <div class="rc-state-row"><span>WiFi:</span><strong>${wifi} ${routerState.wifi.ssid || 'sin configurar'}</strong></div>
        <div class="rc-state-row"><span>NAT:</span><strong>${nat}</strong></div>
        <div class="rc-state-row"><span>Rutas estáticas:</span><strong>${routerState.routes.length}</strong></div>
    `;
}

// ============================================
// LECCIONES GUIADAS
// ============================================

function rcRenderLessonsList() {
    const el = document.getElementById('rcLessonsList');
    if (!el) return;
    const completed = userProgress.routerLessonsCompleted || {};
    el.innerHTML = RC_LESSONS.map(l => {
        const done = completed[l.id];
        return `
            <button class="rc-lesson-btn ${rcCurrentLesson?.id === l.id ? 'active' : ''} ${done ? 'completed' : ''}"
                    onclick="rcStartLesson('${l.id}')">
                <div class="rc-lesson-title">${done ? '✅' : '▶️'} ${l.title}</div>
                <div class="rc-lesson-goal">${l.goal}</div>
            </button>
        `;
    }).join('');
}

function rcStartLesson(id) {
    const lesson = RC_LESSONS.find(l => l.id === id);
    if (!lesson) return;
    rcCurrentLesson = lesson;
    rcCurrentStep = 0;
    rcPrint('', 'plain');
    rcPrint(`▶️ Iniciando: ${lesson.title}`, 'header');
    rcPrint(`🎯 Objetivo: ${lesson.goal}`, 'info');
    rcPrint(`📝 Sigue los comandos. La interfaz te irá guiando paso a paso.`, 'info');
    rcPrint('', 'plain');
    rcRenderLessonProgress();
    rcRenderLessonsList();
}

function rcFreeMode() {
    rcCurrentLesson = null;
    rcCurrentStep = 0;
    rcPrint('', 'plain');
    rcPrint('🚀 Modo libre activado. Configura el router a tu gusto.', 'header');
    rcRenderLessonProgress();
    rcRenderLessonsList();
}

function rcRenderLessonProgress() {
    const el = document.getElementById('rcLessonProgress');
    if (!el) return;
    if (!rcCurrentLesson) {
        el.innerHTML = `<div style="color:var(--texto-suave); padding:10px; text-align:center; font-size:0.88em;">No estás en ninguna lección.<br>Elige una a la izquierda.</div>`;
        return;
    }
    const steps = rcCurrentLesson.steps;
    el.innerHTML = `
        <div class="rc-lesson-current">
            <strong>${rcCurrentLesson.title}</strong>
            <div style="margin-top:6px; color:var(--texto-suave); font-size:0.85em;">${rcCurrentLesson.goal}</div>
        </div>
        <div class="rc-lesson-steps">
            ${steps.map((s, i) => {
                const done = i < rcCurrentStep;
                const current = i === rcCurrentStep;
                return `
                    <div class="rc-lesson-step ${done ? 'done' : ''} ${current ? 'current' : ''}">
                        <div class="rc-lesson-step-num">${done ? '✓' : i + 1}</div>
                        <div class="rc-lesson-step-body">
                            <code>${escapeHtml(s.cmd)}</code>
                            ${s.hint ? `<div class="rc-lesson-step-hint">${escapeHtml(s.hint)}</div>` : ''}
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function rcCheckLessonProgress(cmd) {
    if (!rcCurrentLesson) return;
    const expected = rcCurrentLesson.steps[rcCurrentStep];
    if (!expected) return;
    // Comparación flexible: el comando del usuario debe empezar igual al esperado, o ser equivalente
    const userCmd = cmd.trim().toLowerCase();
    const expCmd = expected.cmd.toLowerCase();

    // Validamos coincidencia "razonable": prefijos comunes o iguales
    if (userCmd === expCmd || rcCommandsEquivalent(userCmd, expCmd)) {
        rcCurrentStep++;
        if (rcCurrentStep >= rcCurrentLesson.steps.length) {
            rcPrint('', 'plain');
            rcPrint(`🎉 ¡Lección completada! +30 XP`, 'success');
            userProgress.routerLessonsCompleted = userProgress.routerLessonsCompleted || {};
            userProgress.routerLessonsCompleted[rcCurrentLesson.id] = true;
            saveProgress();
            addXP(30, `Lección router: ${rcCurrentLesson.title}`);
            rcCurrentLesson = null;
            rcCurrentStep = 0;
            rcRenderLessonsList();
        }
        rcRenderLessonProgress();
    }
}

function rcCommandsEquivalent(a, b) {
    // Equivalencias comunes
    const equiv = [
        ['enable', 'en'],
        ['configure terminal', 'conf t', 'config t', 'config terminal'],
        ['exit', 'end'],
        ['no shutdown', 'no shut'],
        ['show running-config', 'sh run', 'show run'],
        ['show ip interface brief', 'sh ip int br', 'show ip int brief']
    ];
    for (const group of equiv) {
        if (group.includes(a) && group.includes(b)) return true;
    }
    // Comparación por palabras significativas (ignora hostname específico, IPs específicas)
    const aWords = a.split(/\s+/);
    const bWords = b.split(/\s+/);
    if (aWords.length !== bWords.length) return false;
    return aWords.every((w, i) => {
        const bw = bWords[i];
        // Si el esperado es un valor (IP, número, palabra libre), aceptamos cualquiera
        const isValue = (s) => /^[a-z0-9._/!]+$/i.test(s) && (s.includes('.') || /^\d+$/.test(s) || ['lan_pool','rrhh','ventas','iorignet','igornet','routerdeigor','principal'].includes(s));
        return w === bw || (isValue(w) && isValue(bw));
    });
}

// ============================================
// ACCIONES DEL TERMINAL
// ============================================

function rcClear() {
    routerState.output = [];
    const term = document.getElementById('rcTerminal');
    if (term) term.innerHTML = '';
    rcWelcome();
}

function rcReset() {
    if (!confirm('¿Resetear el router? Se perderá toda la configuración no guardada.')) return;
    routerState.hostname = 'Router';
    routerState.mode = 'user';
    routerState.contextArg = null;
    routerState.enableSecret = '';
    Object.keys(routerState.interfaces).forEach(k => {
        routerState.interfaces[k] = { ip: '', mask: '', desc: '', up: false, nat: k === 'Serial0/0/0' ? 'outside' : 'inside' };
    });
    routerState.dhcpPools = {};
    routerState.vlans = {};
    routerState.wifi = { ssid: '', password: '', security: 'WPA2', band: '2.4', channel: 'auto', enabled: false };
    routerState.nat = { enabled: false, overload: false, accessList: null };
    routerState.routes = [];
    routerState.accessLists = {};
    rcClear();
    rcUpdatePrompt();
    rcRenderModeInfo();
    rcRenderCommandsList();
    rcRenderStateSummary();
    rcRenderLessonProgress();
}

function rcShowRunning() {
    rcPrint('', 'plain');
    rcPrint(rcBuildRunningConfig(), 'config');
}
