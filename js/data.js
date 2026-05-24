/* ============================================
   DATA.JS - Datos estáticos de la aplicación
   ============================================ */

// ===== NIVELES =====
const LEVELS = [
    { name: "Amante", icon: "💘", xp: 0, desc: "Acabas de conocer a las redes. Las miras con ojos tiernos." },
    { name: "Secretario", icon: "📋", xp: 150, desc: "Tomas notas, archivas tramas, ordenas paquetes. Trabajador modelo." },
    { name: "Máquina", icon: "⚙️", xp: 400, desc: "Procesas subredes en piloto automático. Te miran y dicen: madre mía." },
    { name: "Narval", icon: "🦄", xp: 800, desc: "Raro, poderoso, misterioso. Cortas paquetes ICMP como cuchillo en mantequilla." },
    { name: "Titán", icon: "💪", xp: 1400, desc: "Levantas racks con una mano. Los routers te temen." },
    { name: "Mecinah", icon: "🌟", xp: 2200, desc: "Nombre legendario. Vives a otro plano. El DHCP te ofrece IPs sin pedirlas." },
    { name: "Pirámide Aristotélica", icon: "🔺", xp: 3200, desc: "Has alcanzado la cima de la lógica reticular. Aristóteles llamaría para preguntarte." }
];

// ===== RECOMPENSAS =====
const REWARDS = [
    { id: "lago", title: "Paseo por el lago con Igor", icon: "🚣", xp: 200, desc: "Un paseo tranquilo, agua quieta, conversación profunda." },
    { id: "pescar", title: "Ir a pescar con Igor", icon: "🎣", xp: 500, desc: "Caña, paciencia y silencio. O sardinas robadas, lo que salga." },
    { id: "concierto", title: "Asistir a un concierto e invitar a todo Igor", icon: "🎤", xp: 900, desc: "Patio de butacas, palco, bafle. Cualquiera. Tú invitas." },
    { id: "beso", title: "Un beso fuerte con Igor", icon: "💋", xp: 1500, desc: "De los que dejan secuela. Aviso: puede provocar mareo." },
    { id: "perro", title: "Adoptar un perro y ponerle Igor", icon: "🐕", xp: 2500, desc: "Y al llamarlo en el parque, todos los Igores giran la cabeza." }
];

// ===== MÓDULOS =====
const MODULES = [
    {
        id: "intro",
        title: "Introducción a las Redes",
        icon: "🌐",
        color: "azul-medio",
        desc: "Qué es una red, para qué sirve, dónde están y por qué te cambian la vida.",
        tag: "Básico",
        difficulty: 1,
        featured: true
    },
    {
        id: "tipos-redes",
        title: "Tipos de Redes",
        icon: "🗺️",
        desc: "PAN, LAN, MAN, WAN, CAN, SAN, VLAN. Sí, hay un acrónimo para todo.",
        tag: "Básico",
        difficulty: 1,
        featured: true
    },
    {
        id: "topologias",
        title: "Topologías de Red",
        icon: "🔷",
        desc: "Estrella, bus, anillo, malla, árbol, híbrida. La forma sí importa.",
        tag: "Diseño",
        difficulty: 2,
        featured: false
    },
    {
        id: "modelos",
        title: "Modelos OSI y TCP/IP",
        icon: "📚",
        desc: "Las 7 capas que estructuran toda comunicación digital del planeta.",
        tag: "Teoría",
        difficulty: 2,
        featured: true
    },
    {
        id: "cableado",
        title: "Cableado y Conectores",
        icon: "🔌",
        desc: "Par trenzado, fibra óptica, coaxial, RJ45, T568A vs T568B, directo vs cruzado.",
        tag: "Físico",
        difficulty: 2,
        featured: true
    },
    {
        id: "dispositivos",
        title: "Dispositivos de Red",
        icon: "🖥️",
        desc: "Hub, switch, router, bridge, AP, firewall, servidor. Cada uno con su rollo.",
        tag: "Físico",
        difficulty: 2,
        featured: false
    },
    {
        id: "ip",
        title: "Direccionamiento IP",
        icon: "📍",
        desc: "IPv4, IPv6, públicas, privadas, clases, NAT, gateway, DNS.",
        tag: "Esencial",
        difficulty: 3,
        featured: true
    },
    {
        id: "subnetting",
        title: "Subnetting y Máscaras",
        icon: "🧮",
        desc: "El boss final teórico. Aquí muchos lloran. Tú no. Tú vas a brillar.",
        tag: "Avanzado",
        difficulty: 4,
        featured: true
    },
    {
        id: "binario",
        title: "Binario y Hexadecimal",
        icon: "💻",
        desc: "La muerte (según los apuntes originales). En realidad: divisiones por 2 y 16.",
        tag: "Matemáticas",
        difficulty: 2,
        featured: false
    },
    {
        id: "servicios",
        title: "DNS, DHCP y Protocolos",
        icon: "📡",
        desc: "Los servicios que hacen que internet parezca magia, pero no lo es.",
        tag: "Servicios",
        difficulty: 3,
        featured: false
    },
    {
        id: "wifi",
        title: "Redes Inalámbricas y WiFi",
        icon: "📶",
        desc: "WiFi, WPA/WPA2/WPA3, 2.4 vs 5 GHz, mesh, WiFi 6/6E/7.",
        tag: "Wireless",
        difficulty: 3,
        featured: false
    },
    {
        id: "vlans",
        title: "VLANs y Segmentación",
        icon: "🔀",
        desc: "Separar redes lógicamente sobre el mismo cable. Brujería pura.",
        tag: "Avanzado",
        difficulty: 4,
        featured: false
    },
    {
        id: "diseno",
        title: "Diseño Lógico y Físico",
        icon: "📐",
        desc: "Cómo se piensa, dibuja y monta una red de empresa real.",
        tag: "Práctico",
        difficulty: 4,
        featured: false
    },
    {
        id: "troubleshooting",
        title: "Diagnóstico y Troubleshooting",
        icon: "🔧",
        desc: "ping, ipconfig, tracert, netsh y el arte de no perder los nervios.",
        tag: "Práctico",
        difficulty: 3,
        featured: false
    },
    {
        id: "herramientas",
        title: "Herramientas del Técnico",
        icon: "🧰",
        desc: "Sergei Strelec, Ninite, CPU-Z, Spacesniffer, Rufus, Sigverif. El arsenal real.",
        tag: "Práctico",
        difficulty: 2,
        featured: true
    },
    {
        id: "monitorizacion",
        title: "Monitorización Windows",
        icon: "📊",
        desc: "Visor de eventos, Administrador de tareas, perfmon. Detecta antes de que reviente.",
        tag: "Avanzado",
        difficulty: 3,
        featured: false
    },
    {
        id: "incidencias",
        title: "Gestión de Incidencias",
        icon: "🎫",
        desc: "Detección → Registro → Diagnóstico → Resolución → Documentación. El ciclo ITIL real.",
        tag: "Empresarial",
        difficulty: 3,
        featured: false
    },
    {
        id: "windows-server",
        title: "Windows Server y VMs",
        icon: "🖧",
        desc: "Instalar Windows Server en VirtualBox, controlador de dominio, servicios.",
        tag: "Servidores",
        difficulty: 4,
        featured: false
    }
];

// ===== ESCENARIOS DEL SIMULADOR =====
const SCENARIOS = [
    {
        id: "casa",
        icon: "🏠",
        title: "Red Doméstica",
        desc: "Un router, varios PCs y un AP. Configúralo todo para que tu familia tenga WiFi.",
        difficulty: "easy"
    },
    {
        id: "oficina",
        icon: "🏢",
        title: "Pequeña Oficina",
        desc: "Router, switch, 5 PCs cableados y una impresora. Red local plana.",
        difficulty: "easy"
    },
    {
        id: "instituto",
        icon: "🏫",
        title: "Instituto",
        desc: "Dos aulas con su switch, profesorado y conexión a internet. Diseño básico.",
        difficulty: "medium"
    },
    {
        id: "biblioteca",
        icon: "📚",
        title: "Biblioteca pública",
        desc: "WiFi para usuarios, red interna para personal, y un servidor de catálogo.",
        difficulty: "medium"
    },
    {
        id: "empresa",
        icon: "🏭",
        title: "Empresa con Departamentos",
        desc: "RRHH, Ventas, Gerencia + CPD con firewall, servidores y APs.",
        difficulty: "hard"
    },
    {
        id: "centro-comercial",
        icon: "🛍️",
        title: "Centro comercial 2 plantas",
        desc: "Tiendas con su red, WiFi para clientes y red interna de gestión.",
        difficulty: "hard"
    },
    {
        id: "colegio",
        icon: "🎓",
        title: "Colegio multinivel",
        desc: "Aulas, laboratorio, sala profes, biblioteca y dirección. VLAN por nivel.",
        difficulty: "medium"
    },
    {
        id: "estadio",
        icon: "🏟️",
        title: "Estadio de fútbol",
        desc: "WiFi para aficionados, red prensa, cámaras CCTV, megafonía IP y taquillas.",
        difficulty: "hard"
    },
    {
        id: "plaza",
        icon: "⛲",
        title: "Plaza pública con WiFi",
        desc: "Ayuntamiento da WiFi gratis a vecinos, cámaras de seguridad y kioscos.",
        difficulty: "medium"
    },
    {
        id: "hospital",
        icon: "🏥",
        title: "Hospital con plantas",
        desc: "Red clínica aislada, WiFi pacientes/visitas, dispositivos médicos IoT.",
        difficulty: "hard"
    },
    {
        id: "restaurante",
        icon: "🍴",
        title: "Restaurante con TPV",
        desc: "Caja, comandero, cocina, WiFi clientes. Red pequeña con segmentación.",
        difficulty: "easy"
    },
    {
        id: "examen",
        icon: "📝",
        title: "EJERCICIO EXAMEN: Empresa CPD",
        desc: "CPD + 3 departamentos (RRHH 5, Ventas 10, Gerencia 3) + 4 APs. ¡El de Igor!",
        difficulty: "hard"
    }
];

// ===== DISPOSITIVOS DEL SIMULADOR =====
const SIM_DEVICE_TYPES = {
    pc: {
        label: "PC",
        icon: "🖥️",
        category: "Equipos finales",
        defaultIP: "",
        defaultMask: "255.255.255.0",
        defaultGW: "",
        configurable: true,
        canPing: true
    },
    laptop: {
        label: "Portátil",
        icon: "💻",
        category: "Equipos finales",
        defaultIP: "",
        defaultMask: "255.255.255.0",
        defaultGW: "",
        configurable: true,
        canPing: true,
        wireless: true
    },
    server: {
        label: "Servidor",
        icon: "🗄️",
        category: "Equipos finales",
        defaultIP: "",
        defaultMask: "255.255.255.0",
        defaultGW: "",
        configurable: true,
        canPing: true
    },
    printer: {
        label: "Impresora",
        icon: "🖨️",
        category: "Equipos finales",
        defaultIP: "",
        defaultMask: "255.255.255.0",
        defaultGW: "",
        configurable: true,
        canPing: true
    },
    smartphone: {
        label: "Móvil",
        icon: "📱",
        category: "Equipos finales",
        defaultIP: "",
        defaultMask: "255.255.255.0",
        defaultGW: "",
        configurable: true,
        canPing: true,
        wireless: true
    },
    switch: {
        label: "Switch",
        icon: "🔀",
        category: "Interconexión",
        configurable: false,
        ports: 24
    },
    router: {
        label: "Router",
        icon: "🛜",
        category: "Interconexión",
        configurable: true,
        isRouter: true,
        interfaces: []
    },
    ap: {
        label: "Access Point",
        icon: "📡",
        category: "Inalámbrico",
        configurable: true,
        defaultSSID: "MiWiFi",
        wireless: true
    },
    firewall: {
        label: "Firewall",
        icon: "🛡️",
        category: "Seguridad",
        configurable: true
    },
    cloud: {
        label: "Internet",
        icon: "☁️",
        category: "Otros",
        configurable: false
    },
    hub: {
        label: "Hub",
        icon: "🔘",
        category: "Interconexión",
        configurable: false,
        ports: 8
    },
    camera: {
        label: "Cámara IP",
        icon: "📷",
        category: "Equipos finales",
        defaultMask: "255.255.255.0",
        configurable: true,
        canPing: true
    },
    iptv: {
        label: "Teléfono IP",
        icon: "☎️",
        category: "Equipos finales",
        defaultMask: "255.255.255.0",
        configurable: true,
        canPing: true
    },
    tv: {
        label: "Smart TV",
        icon: "📺",
        category: "Equipos finales",
        defaultMask: "255.255.255.0",
        configurable: true,
        canPing: true,
        wireless: true
    },
    iot: {
        label: "Dispositivo IoT",
        icon: "🔆",
        category: "Equipos finales",
        defaultMask: "255.255.255.0",
        configurable: true,
        canPing: true,
        wireless: true
    },
    tablet: {
        label: "Tablet",
        icon: "📱",
        category: "Equipos finales",
        defaultMask: "255.255.255.0",
        configurable: true,
        canPing: true,
        wireless: true
    },
    nas: {
        label: "NAS",
        icon: "💾",
        category: "Equipos finales",
        defaultMask: "255.255.255.0",
        configurable: true,
        canPing: true
    },
    patchpanel: {
        label: "Patch Panel",
        icon: "🔲",
        category: "Interconexión",
        configurable: false,
        ports: 24
    }
};

// ===== CONTENIDO TEÓRICO POR MÓDULO =====
const MODULE_CONTENT = {
    intro: {
        title: "Introducción a las Redes",
        subtitle: "Lo básico que tienes que saber antes de meterte en honduras.",
        sections: [
            {
                title: "¿Qué es una red de ordenadores?",
                icon: "🌐",
                content: `
                    <p>Una <strong>red informática</strong> es un conjunto de dispositivos (ordenadores, móviles, impresoras, servidores...) conectados entre sí para <strong>compartir datos, recursos y servicios</strong>. Sin redes no habría internet, ni WhatsApp, ni Netflix, ni partidas online.</p>
                    <p>La red más pequeña son dos dispositivos hablándose. La más grande es <strong>Internet</strong>: una red mundial que conecta miles de millones de dispositivos.</p>
                    <div class="highlight-box">
                        <div class="highlight-box-title">💡 Idea clave</div>
                        <p>Una red no es magia. Son cables (o ondas) + reglas + dispositivos. Punto.</p>
                    </div>
                `
            },
            {
                title: "Para qué sirven las redes",
                icon: "🎯",
                content: `
                    <div class="info-grid">
                        <div class="info-card"><div class="info-card-icon">📁</div><div class="info-card-title">Compartir archivos</div><div class="info-card-desc">De un PC a otro sin pendrives</div></div>
                        <div class="info-card"><div class="info-card-icon">🖨️</div><div class="info-card-title">Compartir impresoras</div><div class="info-card-desc">Una impresora, toda la oficina</div></div>
                        <div class="info-card"><div class="info-card-icon">🌍</div><div class="info-card-title">Acceso a internet</div><div class="info-card-desc">Un solo proveedor, muchos usuarios</div></div>
                        <div class="info-card"><div class="info-card-icon">💬</div><div class="info-card-title">Comunicación</div><div class="info-card-desc">Email, chat, videollamadas</div></div>
                        <div class="info-card"><div class="info-card-icon">🎮</div><div class="info-card-title">Juegos online</div><div class="info-card-desc">Multijugador en tiempo real</div></div>
                        <div class="info-card"><div class="info-card-icon">☁️</div><div class="info-card-title">Servicios cloud</div><div class="info-card-desc">Drive, Spotify, Netflix...</div></div>
                    </div>
                `
            },
            {
                title: "Conexión a internet: las opciones",
                icon: "📶",
                content: `
                    <p>No todas las conexiones son iguales. Estas son las más comunes:</p>
                    <table class="data-table">
                        <thead><tr><th>Tipo</th><th>Velocidad típica</th><th>Notas</th></tr></thead>
                        <tbody>
                            <tr><td><strong>Fibra óptica</strong></td><td>Hasta 10 Gbps</td><td>La reina actual. Baja latencia, simétrica.</td></tr>
                            <tr><td><strong>ADSL</strong></td><td>Hasta 30 Mbps</td><td>En extinción. Funciona por hilo de cobre.</td></tr>
                            <tr><td><strong>Satelital</strong></td><td>50-200 Mbps</td><td>Para zonas remotas. Latencia alta salvo Starlink.</td></tr>
                            <tr><td><strong>4G / 5G</strong></td><td>100 Mbps - 10 Gbps</td><td>Móvil. El 5G es brutal en zonas urbanas.</td></tr>
                            <tr><td><strong>WiMAX / radio</strong></td><td>Variable</td><td>Inalámbrico de larga distancia.</td></tr>
                        </tbody>
                    </table>
                `
            },
            {
                title: "🆕 3 conceptos modernos que deberías conocer",
                icon: "✨",
                content: `
                    <div class="new-concept-box">
                        <strong>🌐 Edge Networking</strong><br>
                        Procesar datos cerca del usuario en vez de en un centro de datos lejano. Reduce latencia para coches autónomos, IoT y AR/VR.
                    </div>
                    <div class="new-concept-box">
                        <strong>☁️ Cloud Networking</strong><br>
                        La red ya no vive solo en un edificio: AWS, Azure y GCP montan redes virtuales que se extienden globalmente con un par de clics.
                    </div>
                    <div class="new-concept-box">
                        <strong>🤖 AIOps en redes</strong><br>
                        La IA monitoriza, predice y arregla problemas de red antes de que tú te enteres. Las redes empresariales modernas ya lo usan.
                    </div>
                `
            },
            {
                title: "🤫 Curiosidades que nadie te cuenta",
                icon: "🤫",
                content: `
                    <div class="curiosity-box">
                        🚢 <strong>Internet pasa por debajo del mar.</strong> Más del 95% del tráfico mundial entre continentes va por cables submarinos. Tiburones a veces los muerden.
                    </div>
                    <div class="curiosity-box">
                        ⏱️ <strong>Un paquete tarda menos de 200 ms</strong> en darle la vuelta al mundo. Tu queja por el lag muchas veces es por tu WiFi, no por la red global.
                    </div>
                    <div class="curiosity-box">
                        💡 <strong>El primer mensaje de internet</strong> (ARPANET, 1969) intentaba decir "LOGIN" y se colgó tras "LO". Empezamos fuerte.
                    </div>
                `
            },
            {
                title: "💡 Consejos prácticos",
                icon: "💡",
                content: `
                    <div class="tip-box">✅ <strong>Reinicia el router antes de llamar al técnico.</strong> Resuelve el 70% de los problemas.</div>
                    <div class="tip-box">✅ <strong>Si vas en serio, usa cable.</strong> WiFi para comodidad, cable para fiabilidad.</div>
                    <div class="tip-box">✅ <strong>Aprende a leer tu IP.</strong> Saber identificar 192.168.x.x vs 10.x.x.x te da puntos en cualquier conversación técnica.</div>
                `
            }
        ]
    },

    "tipos-redes": {
        title: "Tipos de Redes",
        subtitle: "Clasificación por alcance y por uso.",
        sections: [
            {
                title: "Clasificación por alcance",
                icon: "📏",
                content: `
                    <p>Las redes se nombran según el área que cubren. Recuerda este orden de menor a mayor:</p>
                    <table class="data-table">
                        <thead><tr><th>Tipo</th><th>Significado</th><th>Alcance</th><th>Ejemplo</th></tr></thead>
                        <tbody>
                            <tr><td><strong>PAN</strong></td><td>Personal Area Network</td><td>~10 m</td><td>Bluetooth: móvil ↔ auriculares</td></tr>
                            <tr><td><strong>LAN</strong></td><td>Local Area Network</td><td>50-100 m</td><td>Tu casa, tu oficina</td></tr>
                            <tr><td><strong>WLAN</strong></td><td>Wireless LAN</td><td>50-100 m</td><td>WiFi de casa</td></tr>
                            <tr><td><strong>CAN</strong></td><td>Campus Area Network</td><td>1-5 km</td><td>Universidad, parque tecnológico</td></tr>
                            <tr><td><strong>MAN</strong></td><td>Metropolitan Area Network</td><td>~50 km</td><td>WiFi municipal, fibra de operadora</td></tr>
                            <tr><td><strong>WAN</strong></td><td>Wide Area Network</td><td>Sin límite</td><td>Internet, red corporativa entre países</td></tr>
                        </tbody>
                    </table>
                `
            },
            {
                title: "Redes especiales: SAN y VLAN",
                icon: "🔧",
                content: `
                    <div class="lesson-content">
                        <p><strong>🗄️ SAN (Storage Area Network)</strong></p>
                        <p>Una red <strong>dedicada exclusivamente a almacenamiento</strong>. Servidores acceden a un pool de discos a alta velocidad sin interferir con el tráfico de usuario. Típica en datacenters y empresas con muchos datos (banca, ciberseguridad, streaming).</p>

                        <p style="margin-top:24px;"><strong>🔀 VLAN (Virtual LAN)</strong></p>
                        <p>Permite crear <strong>varias redes lógicas independientes</strong> sobre la misma red física. Útil para separar departamentos (RRHH, Ventas, Invitados) sin tirar cables nuevos. Necesita switches gestionables.</p>
                        <div class="highlight-box">
                            <div class="highlight-box-title">⚡ Beneficio clave</div>
                            <p>VLANs = más seguridad + menos tráfico inútil + mejor administración.</p>
                        </div>
                    </div>
                `
            },
            {
                title: "LAN: la reina del aula y de la casa",
                icon: "🏠",
                content: `
                    <p>La <strong>LAN</strong> es la que más vas a tocar. Características importantes:</p>
                    <ul style="padding-left:24px; line-height:2;">
                        <li>📏 Alcance: 50-100 m por segmento</li>
                        <li>⚡ Velocidad: de 100 Mbps a 10 Gbps</li>
                        <li>💰 Costo bajo: un switch o router y ya tienes red</li>
                        <li>🖨️ Permite compartir impresoras, archivos, internet</li>
                        <li>🏛️ Arquitectura: cliente-servidor o peer-to-peer</li>
                    </ul>
                    <div class="info-box">
                        <strong>Cliente-servidor:</strong> hay un servidor central que gestiona accesos, ficheros, correo, etc. Es el modelo típico empresarial.<br><br>
                        <strong>Peer-to-peer (P2P):</strong> todos los equipos son iguales y comparten directamente. Modelo casero.
                    </div>
                `
            },
            {
                title: "🆕 Tipos modernos que están entrando fuerte",
                icon: "🚀",
                content: `
                    <div class="new-concept-box">
                        <strong>🏭 IIoT Network (Industrial IoT)</strong><br>
                        Redes para fábricas con sensores, máquinas y robots. Muy fiables, en tiempo real, con protocolos específicos como PROFINET.
                    </div>
                    <div class="new-concept-box">
                        <strong>🚗 V2X (Vehicle-to-Everything)</strong><br>
                        Redes pensadas para coches conectados y conducción autónoma. Coches que hablan con coches, con semáforos y con la nube.
                    </div>
                    <div class="new-concept-box">
                        <strong>🌌 Mega-constelaciones (SAN espacial)</strong><br>
                        Starlink, OneWeb y Kuiper son redes WAN globales servidas por miles de satélites. Internet en mitad del Sahara.
                    </div>
                `
            },
            {
                title: "🤫 Lo que nadie suele contarte",
                icon: "🤫",
                content: `
                    <div class="curiosity-box">📡 El WiFi <strong>no es internet</strong>. Es solo la última parte: WiFi → router → ISP → internet. Cuando "no funciona el WiFi" casi siempre falla el ISP, no el WiFi.</div>
                    <div class="curiosity-box">🏢 Una <strong>"red empresarial"</strong> moderna ya no vive solo en la oficina. Suele ser una mezcla de LAN + WAN + VPN + cloud. Eso se llama <strong>SD-WAN</strong>.</div>
                    <div class="curiosity-box">🤔 Aunque sea una LAN, puede tener miles de equipos. <strong>"Local"</strong> hace referencia a la administración, no al tamaño.</div>
                `
            },
            {
                title: "💡 Consejos prácticos",
                icon: "💡",
                content: `
                    <div class="tip-box">✅ Cuando diseñes una red, <strong>piensa primero el alcance</strong>. ¿Es una casa? LAN. ¿Una empresa entre varias sedes? WAN o SD-WAN.</div>
                    <div class="tip-box">✅ Si tienes <strong>más de 50 dispositivos</strong>, plantea VLANs. Tu red lo agradecerá.</div>
                    <div class="tip-box">✅ Las redes <strong>P2P se quedan pequeñas rápido</strong>. Si la red crece, monta un servidor.</div>
                `
            }
        ]
    },

    "tipos-redes": {
        title: "Tipos de Redes por Alcance",
        subtitle: "PAN, LAN, MAN, WAN, CAN, SAN, VLAN... ordenadas por tamaño y propósito.",
        sections: [
            {
                title: "¿Por qué clasificamos las redes?",
                icon: "📐",
                content: `
                    <p>Las redes se clasifican principalmente por <strong>su alcance geográfico</strong>: no es lo mismo conectar dos móviles por Bluetooth que conectar dos continentes. Cada tipo tiene tecnologías, velocidades y problemas distintos.</p>
                    <p>Saber identificar el tipo te ayuda a:</p>
                    <ul>
                        <li>Elegir <strong>la tecnología correcta</strong> (no vas a tirar fibra de Madrid a Barcelona para tu casa).</li>
                        <li>Entender <strong>qué dispositivos necesitas</strong> (un switch en una LAN, un router para salir a la WAN).</li>
                        <li>Dimensionar costes y mantenimiento.</li>
                    </ul>
                    <div class="highlight-box">
                        <div class="highlight-box-title">💡 Regla mnemotécnica</div>
                        <p>De pequeño a grande: <strong>P</strong>elea <strong>L</strong>os <strong>M</strong>iércoles <strong>W</strong>enceslao. PAN → LAN → MAN → WAN.</p>
                    </div>
                `
            },
            {
                title: "🏠 PAN — Personal Area Network",
                icon: "📱",
                content: `
                    <p>La <strong>red más pequeña que existe</strong>. Su alcance típico es de unos pocos metros, alrededor de una persona. Conecta sus dispositivos personales entre sí.</p>
                    <ul>
                        <li><strong>Alcance:</strong> 1-10 metros normalmente.</li>
                        <li><strong>Tecnologías:</strong> Bluetooth, NFC, ZigBee, USB, IrDA (infrarrojos, obsoleto).</li>
                        <li><strong>Ejemplos cotidianos:</strong> auriculares Bluetooth con el móvil, smartwatch sincronizando, pago contactless con NFC, mando inalámbrico de TV.</li>
                    </ul>
                    <div class="tip-box">📡 Existe también la <strong>WPAN</strong> (Wireless PAN): es lo mismo pero por aire. Hoy día casi todas las PAN son wireless.</div>
                `
            },
            {
                title: "🏢 LAN — Local Area Network",
                icon: "🔌",
                content: `
                    <p>La <strong>red local</strong>: el clásico de una casa, oficina, aula, planta de un edificio. Limitada normalmente a un solo edificio o un campus pequeño.</p>
                    <ul>
                        <li><strong>Alcance:</strong> hasta 1-2 km (un edificio o campus).</li>
                        <li><strong>Tecnologías:</strong> Ethernet (cable RJ45), WiFi.</li>
                        <li><strong>Velocidades:</strong> 1 Gbps muy común, 10 Gbps en empresas, 2.5/5 Gbps multi-gig emergente.</li>
                        <li><strong>Elementos típicos:</strong> switch, router, AP, cableado estructurado, patch panel.</li>
                    </ul>
                    <div class="info-grid">
                        <div class="info-card"><div class="info-card-icon">🏠</div><div class="info-card-title">LAN doméstica</div><div class="info-card-desc">5-30 dispositivos, router del ISP + WiFi.</div></div>
                        <div class="info-card"><div class="info-card-icon">🏢</div><div class="info-card-title">LAN empresarial</div><div class="info-card-desc">Cientos de equipos, VLANs, servidores, gestión centralizada.</div></div>
                        <div class="info-card"><div class="info-card-icon">🏫</div><div class="info-card-title">LAN educativa</div><div class="info-card-desc">Aulas + sala de profesores + WiFi de invitados.</div></div>
                    </div>
                    <div class="tip-box">⚡ La diferencia con una WAN: la LAN la <strong>controlas tú</strong>. La WAN te la alquila un operador.</div>
                `
            },
            {
                title: "🏘️ MAN — Metropolitan Area Network",
                icon: "🌆",
                content: `
                    <p>La <strong>red metropolitana</strong>: une varias LAN dentro de una <strong>ciudad o área metropolitana</strong>. Es el tamaño intermedio entre LAN y WAN.</p>
                    <ul>
                        <li><strong>Alcance:</strong> 5-50 km (un área urbana).</li>
                        <li><strong>Tecnologías:</strong> fibra óptica (MetroEthernet), enlaces microondas, WiMAX.</li>
                        <li><strong>Ejemplos reales:</strong>
                            <ul>
                                <li>Ayuntamiento conectando todas sus sedes municipales (oficinas, polideportivos, bibliotecas).</li>
                                <li>Universidad con varios campus distribuidos por la ciudad.</li>
                                <li>Empresa con cinco oficinas en una misma capital.</li>
                                <li>Red de cámaras de tráfico de una ciudad.</li>
                            </ul>
                        </li>
                    </ul>
                    <div class="tip-box">💰 Una MAN suele requerir <strong>contratar enlaces dedicados</strong> a un operador (fibra oscura, líneas punto a punto), o colocar tus propios radioenlaces.</div>
                `
            },
            {
                title: "🌍 WAN — Wide Area Network",
                icon: "🌐",
                content: `
                    <p>La <strong>red de área extensa</strong>: conecta zonas geográficas amplísimas, países o continentes enteros. <strong>Internet es la WAN definitiva</strong>.</p>
                    <ul>
                        <li><strong>Alcance:</strong> ilimitado (mundial).</li>
                        <li><strong>Tecnologías:</strong> fibra óptica submarina, satélite, MPLS, líneas dedicadas, redes 4G/5G de operadores.</li>
                        <li><strong>Operadores:</strong> Telefónica, Orange, Vodafone, AT&T, Tier 1 globales.</li>
                        <li><strong>Ejemplos:</strong>
                            <ul>
                                <li>Internet (la WAN de WANs).</li>
                                <li>Red corporativa de un banco con sucursales en 30 países.</li>
                                <li>Red privada de una multinacional uniendo oficinas en varios continentes.</li>
                            </ul>
                        </li>
                    </ul>
                    <div class="highlight-box">
                        <div class="highlight-box-title">🔑 Clave técnica</div>
                        <p>En una WAN, los datos pasan por <strong>muchísimos routers intermedios</strong>. El protocolo que decide la ruta es BGP (Border Gateway Protocol). Es el "GPS" de internet.</p>
                    </div>
                `
            },
            {
                title: "🎓 CAN — Campus Area Network",
                icon: "🏫",
                content: `
                    <p>La <strong>red de campus</strong>: une varios edificios contiguos dentro de un mismo recinto. Es un tamaño intermedio entre LAN y MAN.</p>
                    <ul>
                        <li><strong>Alcance:</strong> unos pocos km, pero todo dentro de un recinto propio.</li>
                        <li><strong>Tecnologías:</strong> fibra entre edificios, switches de core potentes, WiFi unificado.</li>
                        <li><strong>Ejemplos:</strong> campus universitario, base militar, complejo hospitalario, parque empresarial, polígono industrial de una sola empresa.</li>
                    </ul>
                    <div class="tip-box">🏗️ A diferencia de la MAN, en una CAN <strong>el tendido entre edificios es propio</strong> (no necesitas pedir paso a un operador porque todos los edificios pertenecen al mismo dueño).</div>
                `
            },
            {
                title: "💾 SAN — Storage Area Network",
                icon: "🗄️",
                content: `
                    <p>La <strong>red de almacenamiento</strong>: red especializada y de altísimo rendimiento, dedicada exclusivamente a conectar servidores con sistemas de almacenamiento (cabinas de discos).</p>
                    <ul>
                        <li><strong>Propósito:</strong> que los servidores accedan a discos remotos <em>como si fuesen locales</em>.</li>
                        <li><strong>Tecnologías:</strong> Fibre Channel (8/16/32 Gbps), iSCSI sobre Ethernet, NVMe-oF.</li>
                        <li><strong>Dónde se usa:</strong> centros de datos, virtualización (VMware, Hyper-V), bases de datos críticas.</li>
                    </ul>
                    <div class="tip-box">📦 Una SAN no se ve "a nivel de archivos", sino a nivel de <strong>bloques</strong>. El servidor cree que tiene un disco duro local, pero está al otro lado del datacenter.</div>
                    <div class="highlight-box">
                        <div class="highlight-box-title">📁 SAN vs NAS</div>
                        <p>Aunque suenan parecidos: <strong>NAS</strong> (Network Attached Storage) sirve <em>archivos</em> por la red normal (SMB, NFS) — lo usa el departamento entero. <strong>SAN</strong> sirve <em>bloques</em> a servidores mediante red dedicada — lo usan infraestructuras críticas.</p>
                    </div>
                `
            },
            {
                title: "🏷️ VLAN — Virtual LAN",
                icon: "🗂️",
                content: `
                    <p>La <strong>VLAN</strong> no es una red física, es una <strong>red lógica dentro de un switch</strong>. Permite dividir un mismo switch (o varios) en varias "redes virtuales" independientes, aunque compartan cables.</p>
                    <ul>
                        <li><strong>Por qué se usan:</strong>
                            <ul>
                                <li><strong>Seguridad:</strong> aislas departamentos (RRHH no llega a Producción).</li>
                                <li><strong>Rendimiento:</strong> menos broadcast inútil entre máquinas que no deberían hablarse.</li>
                                <li><strong>Organización:</strong> puedes mover usuarios entre VLANs sin cambiar el cableado.</li>
                            </ul>
                        </li>
                        <li><strong>Cómo funcionan:</strong> el switch etiqueta cada trama con un número de VLAN (802.1Q). Solo las tramas con la misma etiqueta se hablan.</li>
                        <li><strong>Ejemplo típico:</strong> en una empresa: VLAN 10 = RRHH, VLAN 20 = Ventas, VLAN 30 = Gerencia, VLAN 99 = gestión, VLAN 40 = WiFi invitados.</li>
                    </ul>
                    <div class="highlight-box">
                        <div class="highlight-box-title">⚡ Para hablar entre VLANs hace falta un router</div>
                        <p>Dos equipos de VLANs distintas <em>nunca</em> se hablan directamente, ni aunque estén conectados al mismo switch. Hay que <strong>enrutarlas</strong> con un router o un switch L3. Esto se llama "router on a stick" cuando un router con un solo cable gestiona el tráfico entre varias VLANs.</p>
                    </div>
                `
            },
            {
                title: "📡 Otras variantes que oirás por ahí",
                icon: "🔠",
                content: `
                    <table class="data-table">
                        <thead><tr><th>Sigla</th><th>Significado</th><th>Qué es</th></tr></thead>
                        <tbody>
                            <tr><td><strong>WLAN</strong></td><td>Wireless LAN</td><td>LAN inalámbrica. WiFi vamos.</td></tr>
                            <tr><td><strong>WMAN</strong></td><td>Wireless MAN</td><td>MAN inalámbrica (WiMAX, enlaces radio entre edificios).</td></tr>
                            <tr><td><strong>WWAN</strong></td><td>Wireless WAN</td><td>4G/5G y satélite.</td></tr>
                            <tr><td><strong>HAN</strong></td><td>Home Area Network</td><td>Red doméstica de IoT (Hue, Alexa, termostato, sensores).</td></tr>
                            <tr><td><strong>BAN</strong></td><td>Body Area Network</td><td>Sensores que llevas puestos (pulsera, ropa inteligente, marcapasos conectado).</td></tr>
                            <tr><td><strong>VPN</strong></td><td>Virtual Private Network</td><td>Túnel cifrado dentro de internet que <em>simula</em> una LAN. No es un alcance físico, es una capa lógica.</td></tr>
                        </tbody>
                    </table>
                `
            },
            {
                title: "🆕 3 conceptos modernos imprescindibles",
                icon: "✨",
                content: `
                    <div class="info-grid">
                        <div class="info-card"><div class="info-card-icon">☁️</div><div class="info-card-title">SD-WAN</div><div class="info-card-desc">WAN definida por software. El router de borde elige inteligentemente qué enlace usar (fibra, 5G, MPLS) según el tráfico. Reemplazando MPLS clásico.</div></div>
                        <div class="info-card"><div class="info-card-icon">🌐</div><div class="info-card-title">Overlay networks</div><div class="info-card-desc">Tailscale, Zerotier, WireGuard mesh: redes virtuales encima de internet que parecen LAN aunque los nodos estén separados por miles de km.</div></div>
                        <div class="info-card"><div class="info-card-icon">📦</div><div class="info-card-title">CNI / redes de contenedores</div><div class="info-card-desc">Kubernetes y Docker crean redes virtuales internas con miles de IPs solo para que sus contenedores se hablen. Toda una LAN dentro de un servidor.</div></div>
                    </div>
                `
            },
            {
                title: "🤔 3 curiosidades",
                icon: "🎲",
                content: `
                    <div class="info-grid">
                        <div class="info-card"><div class="info-card-icon">🌊</div><div class="info-card-title">El 99% de internet va por mar</div><div class="info-card-desc">No por satélite: por cables de fibra submarinos. Si se corta uno entre continentes, países enteros se quedan ralentizados.</div></div>
                        <div class="info-card"><div class="info-card-icon">📞</div><div class="info-card-title">La PAN existe desde 1995</div><div class="info-card-desc">El término lo acuñó Thomas Zimmerman para una red... que transmitía datos a través del cuerpo humano. En serio.</div></div>
                        <div class="info-card"><div class="info-card-icon">🚀</div><div class="info-card-title">Starlink es WAN+WWAN</div><div class="info-card-desc">Una WAN inalámbrica vía satélite. Tiene unos 6.000 satélites en órbita baja dando internet a sitios donde no llega la fibra.</div></div>
                    </div>
                `
            },
            {
                title: "📚 3 recursos recomendados",
                icon: "🎓",
                content: `
                    <ul>
                        <li><strong>YouTube — NetworkChuck:</strong> explicaciones potentes y divertidas de todo tipo de redes.</li>
                        <li><strong>Cisco Networking Academy:</strong> cursos gratis de redes desde cero. CCNA es la certificación de referencia.</li>
                        <li><strong>"Computer Networking: A Top-Down Approach"</strong> (Kurose & Ross): el libro de referencia universitario.</li>
                    </ul>
                `
            }
        ]
    },

    topologias: {
        title: "Topologías de Red",
        subtitle: "La forma física y lógica con la que conectas los dispositivos.",
        sections: [
            {
                title: "¿Qué es una topología?",
                icon: "🔷",
                content: `
                    <p>La <strong>topología de red</strong> describe <strong>cómo están conectados</strong> los dispositivos entre sí. Hay dos niveles:</p>
                    <div class="info-grid">
                        <div class="info-card"><div class="info-card-icon">📦</div><div class="info-card-title">Topología física</div><div class="info-card-desc">Cómo están dispuestos los cables y dispositivos en el espacio real.</div></div>
                        <div class="info-card"><div class="info-card-icon">🧠</div><div class="info-card-title">Topología lógica</div><div class="info-card-desc">Cómo viajan los datos por la red, independientemente del cableado.</div></div>
                    </div>
                    <div class="highlight-box">
                        <div class="highlight-box-title">⚡ Importante</div>
                        <p>Una red puede parecer una estrella físicamente y comportarse como un bus lógicamente. Es habitual.</p>
                    </div>
                `
            },
            {
                title: "Las topologías clásicas",
                icon: "🌐",
                content: `
                    <div class="info-grid">
                        <div class="info-card"><div class="info-card-icon">⭐</div><div class="info-card-title">Estrella</div><div class="info-card-desc">Todos al nodo central (switch/router). La más usada hoy. Si cae el central, cae todo.</div></div>
                        <div class="info-card"><div class="info-card-icon">🚌</div><div class="info-card-title">Bus</div><div class="info-card-desc">Todos pinchados a un cable común. Sencilla pero frágil. Hoy ya no se usa.</div></div>
                        <div class="info-card"><div class="info-card-icon">⭕</div><div class="info-card-title">Anillo</div><div class="info-card-desc">Cada equipo conectado al siguiente formando un círculo. Token ring, ya histórico.</div></div>
                        <div class="info-card"><div class="info-card-icon">🕸️</div><div class="info-card-title">Malla</div><div class="info-card-desc">Todos con todos. Súper redundante, caro. Usada en backbones de internet.</div></div>
                        <div class="info-card"><div class="info-card-icon">🌳</div><div class="info-card-title">Árbol</div><div class="info-card-desc">Jerárquica: switches conectados en niveles. Típica en redes grandes.</div></div>
                        <div class="info-card"><div class="info-card-icon">🔀</div><div class="info-card-title">Híbrida</div><div class="info-card-desc">Combinación de varias. Casi todas las redes reales son híbridas.</div></div>
                    </div>
                `
            },
            {
                title: "Ventajas e inconvenientes",
                icon: "⚖️",
                content: `
                    <table class="data-table">
                        <thead><tr><th>Topología</th><th>Ventajas</th><th>Inconvenientes</th></tr></thead>
                        <tbody>
                            <tr><td><strong>Estrella</strong></td><td>Fácil mantener, si cae un nodo no afecta al resto</td><td>Si cae el central, cae todo</td></tr>
                            <tr><td><strong>Bus</strong></td><td>Barata, sencilla</td><td>Si se corta el cable, adiós red</td></tr>
                            <tr><td><strong>Anillo</strong></td><td>Datos viajan rápido (un sentido)</td><td>Un fallo rompe el anillo</td></tr>
                            <tr><td><strong>Malla</strong></td><td>Súper redundante, tolera fallos</td><td>Cara, complicada de cablear</td></tr>
                            <tr><td><strong>Árbol</strong></td><td>Escalable, organizada</td><td>Si cae el raíz, cae el subárbol</td></tr>
                        </tbody>
                    </table>
                `
            },
            {
                title: "🆕 Topologías modernas",
                icon: "✨",
                content: `
                    <div class="new-concept-box">
                        <strong>🍃 Leaf-Spine</strong><br>
                        Topología de moda en datacenters. Dos capas: "spine" (columna) y "leaf" (hojas). Cada leaf conecta a todos los spine. Latencia predecible para tráfico este-oeste (servidor ↔ servidor).
                    </div>
                    <div class="new-concept-box">
                        <strong>📡 Mesh inalámbrico</strong><br>
                        Los APs WiFi se hablan entre ellos (no solo con el router) para cubrir casas y oficinas grandes. Las marcas tipo eero, Deco o Orbi son esto.
                    </div>
                    <div class="new-concept-box">
                        <strong>🕸️ Fabric SDN</strong><br>
                        Toda la red se ve como un "tejido" unificado controlado por software. El admin define políticas, el sistema configura los dispositivos.
                    </div>
                `
            },
            {
                title: "🤫 Lo que nadie suele contarte",
                icon: "🤫",
                content: `
                    <div class="curiosity-box">🌟 La <strong>"estrella"</strong> moderna no es solo una estrella: dentro del switch hay un bus electrónico. Físicamente estrella, lógicamente bus.</div>
                    <div class="curiosity-box">🏛️ El <strong>backbone de internet</strong> es una malla parcial entre operadores. Por eso cuando cae un cable submarino el tráfico se reencamina.</div>
                    <div class="curiosity-box">🪲 El <strong>cable coaxial fino (10BASE2)</strong>, típico del bus de los 90, fallaba constantemente porque alguien daba un golpe en una pata y rompía la red entera.</div>
                `
            },
            {
                title: "💡 Consejos prácticos",
                icon: "💡",
                content: `
                    <div class="tip-box">✅ Para redes pequeñas y medianas: <strong>estrella</strong>. Siempre. No te compliques.</div>
                    <div class="tip-box">✅ Para redes grandes y críticas: <strong>árbol con redundancia</strong>. Doble enlace al core.</div>
                    <div class="tip-box">✅ Documenta la topología <strong>antes</strong> de instalar nada. Ahorrarás horas de troubleshooting.</div>
                `
            }
        ]
    },

    modelos: {
        title: "Modelos OSI y TCP/IP",
        subtitle: "La gramática que estructura toda comunicación de red.",
        sections: [
            {
                title: "¿Por qué un modelo en capas?",
                icon: "📚",
                content: `
                    <p>Comunicar dos máquinas implica muchas cosas distintas: el cable, el formato de los datos, la dirección, la sesión, la presentación... Para no volverse loco, todo se <strong>divide en capas</strong>. Cada capa hace una sola cosa, bien. Y le pasa el resultado a la siguiente.</p>
                    <div class="highlight-box">
                        <div class="highlight-box-title">🧅 Como una cebolla</div>
                        <p>Cuando envías, vas <strong>bajando capas</strong> (añadiendo cabeceras). Cuando recibes, vas <strong>subiendo</strong> (quitando cabeceras). Ese proceso se llama <strong>encapsulación</strong>.</p>
                    </div>
                `
            },
            {
                title: "Modelo OSI: 7 capas",
                icon: "7️⃣",
                content: `
                    <table class="data-table">
                        <thead><tr><th>#</th><th>Capa</th><th>Función</th><th>Ejemplos</th></tr></thead>
                        <tbody>
                            <tr><td>7</td><td><strong>Aplicación</strong></td><td>Interacción con el usuario</td><td>HTTP, FTP, DNS, SMTP</td></tr>
                            <tr><td>6</td><td><strong>Presentación</strong></td><td>Formato, cifrado, compresión</td><td>SSL/TLS, JPEG, MP4</td></tr>
                            <tr><td>5</td><td><strong>Sesión</strong></td><td>Abrir/cerrar conversaciones</td><td>NetBIOS, RPC</td></tr>
                            <tr><td>4</td><td><strong>Transporte</strong></td><td>Entrega fiable extremo a extremo</td><td>TCP, UDP</td></tr>
                            <tr><td>3</td><td><strong>Red</strong></td><td>Direccionamiento lógico y routing</td><td>IP, ICMP</td></tr>
                            <tr><td>2</td><td><strong>Enlace</strong></td><td>Direccionamiento físico (MAC)</td><td>Ethernet, WiFi 802.11</td></tr>
                            <tr><td>1</td><td><strong>Física</strong></td><td>Bits sobre el medio</td><td>Cable, fibra, ondas</td></tr>
                        </tbody>
                    </table>
                    <div class="tip-box">📝 Truco para memorizar: <strong>"Por Favor No Toques Sus Programas Adolescentes"</strong> (Física, Enlace, Red, Transporte, Sesión, Presentación, Aplicación).</div>
                `
            },
            {
                title: "Modelo TCP/IP: 4 capas",
                icon: "4️⃣",
                content: `
                    <p>El modelo real que se usa en internet. Más simple. Agrupa capas del OSI:</p>
                    <table class="data-table">
                        <thead><tr><th>TCP/IP</th><th>Equivale en OSI a...</th><th>Protocolos</th></tr></thead>
                        <tbody>
                            <tr><td><strong>Aplicación</strong></td><td>Aplicación + Presentación + Sesión</td><td>HTTP, DNS, FTP, SMTP, DHCP</td></tr>
                            <tr><td><strong>Transporte</strong></td><td>Transporte</td><td>TCP, UDP</td></tr>
                            <tr><td><strong>Internet</strong></td><td>Red</td><td>IP, ICMP, ARP</td></tr>
                            <tr><td><strong>Acceso a red</strong></td><td>Enlace + Física</td><td>Ethernet, WiFi</td></tr>
                        </tbody>
                    </table>
                `
            },
            {
                title: "TCP vs UDP: la pareja del momento",
                icon: "🤼",
                content: `
                    <div class="info-grid">
                        <div class="info-card">
                            <div class="info-card-icon">🤝</div>
                            <div class="info-card-title">TCP (fiable)</div>
                            <div class="info-card-desc">Establece conexión, garantiza entrega, reordena paquetes. Para web, email, descargas.</div>
                        </div>
                        <div class="info-card">
                            <div class="info-card-icon">⚡</div>
                            <div class="info-card-title">UDP (rápido)</div>
                            <div class="info-card-desc">Sin conexión, sin garantías, mínimo overhead. Para streaming, juegos, llamadas, DNS.</div>
                        </div>
                    </div>
                `
            },
            {
                title: "🆕 Lo nuevo en la capa de transporte",
                icon: "🚀",
                content: `
                    <div class="new-concept-box">
                        <strong>⚡ QUIC</strong><br>
                        Protocolo moderno (sobre UDP) que Google empujó y ahora está en HTTP/3. Más rápido que TCP+TLS, menos handshakes, mejor en redes móviles inestables.
                    </div>
                    <div class="new-concept-box">
                        <strong>🌐 HTTP/3</strong><br>
                        Versión actual de HTTP. Va sobre QUIC. Si tu web no carga, una de las razones suele ser que su CDN ya está en HTTP/3.
                    </div>
                    <div class="new-concept-box">
                        <strong>🔐 TLS 1.3</strong><br>
                        Versión moderna de cifrado en capa presentación. Más rápido, más seguro, sin parámetros obsoletos.
                    </div>
                `
            },
            {
                title: "🤫 Curiosidades",
                icon: "🤫",
                content: `
                    <div class="curiosity-box">🤓 OSI <strong>nunca se implementó como tal</strong>. Es un modelo teórico. Lo que realmente corre Internet es TCP/IP.</div>
                    <div class="curiosity-box">📦 Cada vez que mandas un mensaje por WhatsApp, <strong>se añaden cabeceras de unas 60 bytes</strong> antes de salir de tu móvil.</div>
                    <div class="curiosity-box">🍅 La palabra "<strong>protocolo</strong>" viene del griego "prōtokollon", la primera hoja pegada a un manuscrito. Las normas iban ahí.</div>
                `
            },
            {
                title: "💡 Consejos prácticos",
                icon: "💡",
                content: `
                    <div class="tip-box">✅ Al hacer troubleshooting, sube por las capas: <strong>física → enlace → red → transporte → aplicación</strong>. Verifica cable, luego MAC, luego IP, luego puerto, luego app.</div>
                    <div class="tip-box">✅ Si el problema parece raro, <strong>casi siempre es DNS</strong>. Es un meme entre admins.</div>
                    <div class="tip-box">✅ Aprende a usar <strong>Wireshark</strong>. Ver paquetes reales por capas vale por 10 clases.</div>
                `
            }
        ]
    },

    cableado: {
        title: "Cableado y Conectores",
        subtitle: "La fontanería de las redes. Sin esto no hay paquetes.",
        sections: [
            {
                title: "Cable de par trenzado",
                icon: "🔌",
                content: `
                    <p>El cable más usado hoy en redes Ethernet. Lleva <strong>8 hilos de cobre</strong> trenzados de dos en dos (de ahí el nombre).</p>
                    <p>El trenzado <strong>cancela interferencias electromagnéticas</strong>. Por eso los cables siempre están enrollados, no es decoración.</p>
                    <div class="info-grid">
                        <div class="info-card"><div class="info-card-icon">🟠</div><div class="info-card-title">Par naranja</div><div class="info-card-desc">Naranja-blanco + naranja</div></div>
                        <div class="info-card"><div class="info-card-icon">🟢</div><div class="info-card-title">Par verde</div><div class="info-card-desc">Verde-blanco + verde</div></div>
                        <div class="info-card"><div class="info-card-icon">🔵</div><div class="info-card-title">Par azul</div><div class="info-card-desc">Azul-blanco + azul</div></div>
                        <div class="info-card"><div class="info-card-icon">🟤</div><div class="info-card-title">Par marrón</div><div class="info-card-desc">Marrón-blanco + marrón</div></div>
                    </div>
                    <div class="info-box">📏 <strong>Longitud máxima por tirada:</strong> 100 metros. Si necesitas más, mete un switch o un repetidor en medio.</div>
                `
            },
            {
                title: "Tipos: UTP, FTP, STP, SFTP",
                icon: "🛡️",
                content: `
                    <table class="data-table">
                        <thead><tr><th>Tipo</th><th>Apantallamiento</th><th>Uso típico</th></tr></thead>
                        <tbody>
                            <tr><td><strong>UTP</strong></td><td>Ninguno</td><td>El más común. Casas, oficinas pequeñas.</td></tr>
                            <tr><td><strong>FTP</strong></td><td>Pantalla global de aluminio</td><td>Entornos con algo de interferencia.</td></tr>
                            <tr><td><strong>STP</strong></td><td>Cada par apantallado individualmente</td><td>Redes industriales, alta velocidad.</td></tr>
                            <tr><td><strong>SFTP</strong></td><td>Cada par + pantalla global</td><td>Máxima protección. Datacenters.</td></tr>
                        </tbody>
                    </table>
                    <div class="tip-box">📝 <strong>Regla mental:</strong> más letras = más blindaje = más caro = menos interferencias.</div>
                `
            },
            {
                title: "Categorías Cat5, Cat6, Cat7, Cat8",
                icon: "🏷️",
                content: `
                    <table class="data-table">
                        <thead><tr><th>Categoría</th><th>Velocidad</th><th>Frecuencia</th><th>Uso recomendado</th></tr></thead>
                        <tbody>
                            <tr><td>Cat5</td><td>100 Mbps</td><td>100 MHz</td><td>Antiguo. Reemplazar.</td></tr>
                            <tr><td>Cat5e</td><td>1 Gbps</td><td>100 MHz</td><td>Aceptable en casa.</td></tr>
                            <tr><td>Cat6</td><td>1 Gbps (10 Gbps hasta 55m)</td><td>250 MHz</td><td>Estándar actual.</td></tr>
                            <tr><td>Cat6a</td><td>10 Gbps</td><td>500 MHz</td><td>Profesional.</td></tr>
                            <tr><td>Cat7</td><td>10 Gbps</td><td>600 MHz</td><td>Datacenter.</td></tr>
                            <tr><td>Cat8</td><td>25-40 Gbps</td><td>2000 MHz</td><td>Top de gama.</td></tr>
                        </tbody>
                    </table>
                `
            },
            {
                title: "T568A vs T568B: el lío de los colores",
                icon: "🎨",
                content: `
                    <p>Son los dos <strong>estándares de cableado</strong>. Definen en qué orden van los hilos dentro del conector RJ45.</p>
                    <div class="info-grid">
                        <div class="info-card">
                            <div class="info-card-title">T568A</div>
                            <div class="info-card-desc">Verde-blanco, verde, naranja-blanco, azul, azul-blanco, naranja, marrón-blanco, marrón</div>
                        </div>
                        <div class="info-card">
                            <div class="info-card-title">T568B</div>
                            <div class="info-card-desc">Naranja-blanco, naranja, verde-blanco, azul, azul-blanco, verde, marrón-blanco, marrón</div>
                        </div>
                    </div>
                    <div class="highlight-box">
                        <div class="highlight-box-title">🎯 La regla de oro</div>
                        <p><strong>Cable directo:</strong> mismo estándar en ambos extremos (A-A o B-B). Para conectar dispositivos <strong>de distinto tipo</strong> (PC↔Switch, Switch↔Router).<br><br>
                        <strong>Cable cruzado:</strong> un extremo A, otro B. Para conectar dispositivos <strong>del mismo tipo</strong> (PC↔PC, Switch↔Switch).</p>
                    </div>
                    <div class="info-box">📌 <strong>Hoy es casi histórico:</strong> los switches modernos tienen <strong>Auto-MDIX</strong>, detectan el tipo y se ajustan solos. Sigue siendo importante saberlo para exámenes.</div>
                `
            },
            {
                title: "Fibra óptica",
                icon: "💡",
                content: `
                    <p>En vez de electricidad por cobre, transmite <strong>luz</strong> por hilos de vidrio finos como un pelo. Brutalmente rápida, sin interferencias, e ignífuga.</p>
                    <div class="info-grid">
                        <div class="info-card">
                            <div class="info-card-icon">📏</div>
                            <div class="info-card-title">Monomodo</div>
                            <div class="info-card-desc">Un solo haz. Largas distancias (km). Más cara.</div>
                        </div>
                        <div class="info-card">
                            <div class="info-card-icon">🌈</div>
                            <div class="info-card-title">Multimodo</div>
                            <div class="info-card-desc">Varios haces. Distancias cortas (hasta 2 km). Más barata.</div>
                        </div>
                    </div>
                    <p><strong>Conectores típicos:</strong> SC, LC, ST, FC, MT-RJ, FDDI.</p>
                    <p>En las casas: <strong>FTTH</strong> (Fiber to the Home). El operador trae la fibra hasta tu router.</p>
                `
            },
            {
                title: "🆕 Tendencias modernas en cableado",
                icon: "✨",
                content: `
                    <div class="new-concept-box">
                        <strong>⚡ PoE++ (802.3bt)</strong><br>
                        Power over Ethernet hasta 90 W por puerto. Alimentas APs, cámaras y hasta pantallas con un solo cable de red.
                    </div>
                    <div class="new-concept-box">
                        <strong>🌐 400 Gbps Ethernet</strong><br>
                        Estándar de datacenters modernos. Para entrenar modelos de IA hace falta mucho ancho de banda entre GPUs.
                    </div>
                    <div class="new-concept-box">
                        <strong>🎯 Cable de fibra OS2 single-mode</strong><br>
                        Se está convirtiendo en el estándar de campus modernos. Más distancia, futuro-prueba.
                    </div>
                `
            },
            {
                title: "🤫 Lo que nadie te cuenta",
                icon: "🤫",
                content: `
                    <div class="curiosity-box">🐱 Muchos errores de red en casas son culpa de <strong>gatos mordiendo cables</strong>. En serio.</div>
                    <div class="curiosity-box">🔥 Cuando hablan de "fibra a casa", la <strong>última pieza dentro de tu router es electrónica</strong>, no luz. La fibra se convierte a Ethernet ahí.</div>
                    <div class="curiosity-box">📏 La regla de los <strong>100 metros</strong> no es magia: es la latencia máxima permitida en Ethernet para detección de colisiones a 10/100 Mbps.</div>
                `
            },
            {
                title: "💡 Consejos prácticos",
                icon: "💡",
                content: `
                    <div class="tip-box">✅ Cuando crimpas RJ45, <strong>destrenza lo mínimo posible</strong> antes del conector. Cada cm sin trenzar pierde rendimiento.</div>
                    <div class="tip-box">✅ Etiqueta <strong>ambos extremos</strong> de cada cable. Tu yo del futuro te lo agradecerá.</div>
                    <div class="tip-box">✅ Si dudas entre Cat5e y Cat6, gasta los <strong>3 € más</strong> y pon Cat6. El cable se queda 20 años, los switches cambian.</div>
                `
            }
        ]
    },

    dispositivos: {
        title: "Dispositivos de Red",
        subtitle: "Los actores físicos. Cada uno con su rol.",
        sections: [
            {
                title: "Los protagonistas básicos",
                icon: "🖥️",
                content: `
                    <div class="info-grid">
                        <div class="info-card">
                            <div class="info-card-icon">🔘</div>
                            <div class="info-card-title">Hub</div>
                            <div class="info-card-desc">Repite la señal por TODOS los puertos. Ineficiente. Ya no se usa.</div>
                        </div>
                        <div class="info-card">
                            <div class="info-card-icon">🔀</div>
                            <div class="info-card-title">Switch</div>
                            <div class="info-card-desc">Como el hub pero inteligente: aprende MACs y envía solo al puerto correcto. El rey de la LAN.</div>
                        </div>
                        <div class="info-card">
                            <div class="info-card-icon">🛜</div>
                            <div class="info-card-title">Router</div>
                            <div class="info-card-desc">Conecta REDES distintas. Usa IPs. Hace NAT entre LAN y WAN.</div>
                        </div>
                        <div class="info-card">
                            <div class="info-card-icon">📡</div>
                            <div class="info-card-title">Access Point (AP)</div>
                            <div class="info-card-desc">Convierte la red cableada en WiFi. Da cobertura inalámbrica.</div>
                        </div>
                        <div class="info-card">
                            <div class="info-card-icon">🛡️</div>
                            <div class="info-card-title">Firewall</div>
                            <div class="info-card-desc">Filtra el tráfico según reglas. Primera línea de defensa.</div>
                        </div>
                        <div class="info-card">
                            <div class="info-card-icon">🗄️</div>
                            <div class="info-card-title">Servidor</div>
                            <div class="info-card-desc">Ofrece servicios a clientes: web, archivos, BBDD, correo, DHCP, DNS...</div>
                        </div>
                        <div class="info-card">
                            <div class="info-card-icon">📞</div>
                            <div class="info-card-title">Módem</div>
                            <div class="info-card-desc">Convierte señales analógicas (línea ADSL/fibra) en digitales y viceversa.</div>
                        </div>
                        <div class="info-card">
                            <div class="info-card-icon">🌉</div>
                            <div class="info-card-title">Bridge / Puente</div>
                            <div class="info-card-desc">Une dos segmentos de red formando una sola. Funciona con MACs.</div>
                        </div>
                    </div>
                `
            },
            {
                title: "Switch L2 vs L3",
                icon: "🆚",
                content: `
                    <table class="data-table">
                        <thead><tr><th>Característica</th><th>Switch L2</th><th>Switch L3</th></tr></thead>
                        <tbody>
                            <tr><td><strong>Capa OSI</strong></td><td>Enlace (2)</td><td>Red (3)</td></tr>
                            <tr><td><strong>Funciona con</strong></td><td>MAC</td><td>MAC + IP</td></tr>
                            <tr><td><strong>VLANs</strong></td><td>Sí, pero no enruta entre ellas</td><td>Sí, y enruta entre ellas</td></tr>
                            <tr><td><strong>Routing</strong></td><td>No</td><td>Sí (estático/dinámico)</td></tr>
                            <tr><td><strong>Uso típico</strong></td><td>Planta, departamento</td><td>Core, distribución</td></tr>
                            <tr><td><strong>Precio</strong></td><td>Barato</td><td>Caro</td></tr>
                        </tbody>
                    </table>
                    <div class="info-box">💡 Un switch L3 hace algunas funciones de router. Por eso es típico tener en el CPD <strong>un switch L3 que enruta entre VLANs</strong> sin necesidad de pasar por el router principal.</div>
                `
            },
            {
                title: "Router: el portero entre redes",
                icon: "🛜",
                content: `
                    <p>El router une la <strong>LAN con la WAN</strong> (normalmente internet). Sus funciones clave:</p>
                    <ul style="padding-left:24px; line-height:2;">
                        <li>📍 <strong>Routing:</strong> elige la mejor ruta para cada paquete</li>
                        <li>🎭 <strong>NAT:</strong> traduce IP privada ↔ IP pública</li>
                        <li>🚪 <strong>Gateway:</strong> es la puerta de salida de tu red</li>
                        <li>🔥 <strong>Firewall básico:</strong> bloquea conexiones no solicitadas</li>
                        <li>📡 <strong>WiFi:</strong> en routers domésticos suele venir integrado</li>
                        <li>📅 <strong>DHCP:</strong> reparte IPs a los equipos de la LAN</li>
                    </ul>
                    <div class="tip-box">📌 Lo que en casa llamamos "router" suele ser un <strong>módem-router-switch-AP-firewall-DHCP-DNS</strong> todo en uno. Por eso pesa.</div>
                `
            },
            {
                title: "🆕 Dispositivos modernos",
                icon: "✨",
                content: `
                    <div class="new-concept-box">
                        <strong>📦 SD-WAN appliance</strong><br>
                        Router de empresa que crea una WAN inteligente sobre múltiples enlaces (fibra, 5G, MPLS) y elige el mejor en cada momento.
                    </div>
                    <div class="new-concept-box">
                        <strong>🤖 NGFW (Next-Gen Firewall)</strong><br>
                        Firewall moderno con inspección profunda (DPI), IPS, control de aplicaciones y detección de amenazas con IA.
                    </div>
                    <div class="new-concept-box">
                        <strong>🌐 Switch programable (P4)</strong><br>
                        Switches cuyo plano de datos se programa con un lenguaje (P4). Marcan tendencia en datacenters de hyperscalers.
                    </div>
                `
            },
            {
                title: "🤫 Curiosidades",
                icon: "🤫",
                content: `
                    <div class="curiosity-box">🦖 Los <strong>hubs</strong> básicamente eran inútiles. Cada paquete iba a TODOS los puertos. Hoy un switch barato les da mil vueltas.</div>
                    <div class="curiosity-box">🍝 Los <strong>routers caseros</strong> de Movistar/Vodafone/Orange suelen ser básicos. Pillarte uno mejor (Asus, MikroTik, Ubiquiti) cambia tu vida.</div>
                    <div class="curiosity-box">⚡ El <strong>switch Cisco Catalyst 9600</strong> puede mover hasta 25.6 Tbps. Suficiente para una ciudad pequeña.</div>
                `
            },
            {
                title: "💡 Consejos prácticos",
                icon: "💡",
                content: `
                    <div class="tip-box">✅ <strong>No mezcles velocidades sin necesidad.</strong> Un switch 10/100 reduce todo a 100 aunque haya equipos Gbps.</div>
                    <div class="tip-box">✅ El <strong>firewall del router</strong> está activado por defecto. No lo desactives "para que vaya más rápido". No mejora nada y te abres al mundo.</div>
                    <div class="tip-box">✅ Si la red corporativa tiene VLANs, ten muy claro qué hace el <strong>switch L3</strong>. Es la pieza más crítica.</div>
                `
            }
        ]
    },

    ip: {
        title: "Direccionamiento IP",
        subtitle: "Cómo se identifican y encuentran los dispositivos en una red.",
        sections: [
            {
                title: "¿Qué es una dirección IP?",
                icon: "📍",
                content: `
                    <p>Una <strong>dirección IP</strong> identifica de forma única un dispositivo en una red. Es como su DNI digital. Sin IP, no puedes hablar con nadie.</p>
                    <p>Tiene dos partes:</p>
                    <div class="info-grid">
                        <div class="info-card">
                            <div class="info-card-icon">🌐</div>
                            <div class="info-card-title">ID de red</div>
                            <div class="info-card-desc">A qué red pertenece (ej. 192.168.1.0)</div>
                        </div>
                        <div class="info-card">
                            <div class="info-card-icon">🖥️</div>
                            <div class="info-card-title">ID de host</div>
                            <div class="info-card-desc">Qué dispositivo concreto es (ej. .5)</div>
                        </div>
                    </div>
                    <p>La <strong>máscara de subred</strong> es la que define dónde acaba la red y dónde empieza el host. Imprescindible.</p>
                `
            },
            {
                title: "IPv4 vs IPv6",
                icon: "🔢",
                content: `
                    <table class="data-table">
                        <thead><tr><th>Característica</th><th>IPv4</th><th>IPv6</th></tr></thead>
                        <tbody>
                            <tr><td>Bits</td><td>32</td><td>128</td></tr>
                            <tr><td>Formato</td><td>192.168.1.1</td><td>2001:db8::1</td></tr>
                            <tr><td>Direcciones totales</td><td>~4.300 millones</td><td>340 sextillones</td></tr>
                            <tr><td>Notación</td><td>Decimal con puntos</td><td>Hexadecimal con dos puntos</td></tr>
                            <tr><td>Estado</td><td>Agotado, en NAT</td><td>Futuro y presente</td></tr>
                        </tbody>
                    </table>
                    <div class="info-box">🌟 <strong>IPv6 está creciendo:</strong> Google reporta que en 2025 más del 45% del tráfico mundial ya es IPv6.</div>
                `
            },
            {
                title: "IP pública vs privada",
                icon: "🏠",
                content: `
                    <div class="info-grid">
                        <div class="info-card">
                            <div class="info-card-icon">🌍</div>
                            <div class="info-card-title">Pública</div>
                            <div class="info-card-desc">Visible en internet. La asigna tu ISP. Suele ser dinámica.</div>
                        </div>
                        <div class="info-card">
                            <div class="info-card-icon">🔒</div>
                            <div class="info-card-title">Privada</div>
                            <div class="info-card-desc">Solo dentro de tu red local. No es accesible desde fuera.</div>
                        </div>
                    </div>
                    <p><strong>Rangos de IP privada (RFC 1918):</strong></p>
                    <table class="data-table">
                        <thead><tr><th>Clase</th><th>Rango</th><th>Máscara</th></tr></thead>
                        <tbody>
                            <tr><td>A</td><td>10.0.0.0 — 10.255.255.255</td><td>/8 (255.0.0.0)</td></tr>
                            <tr><td>B</td><td>172.16.0.0 — 172.31.255.255</td><td>/12 (255.240.0.0)</td></tr>
                            <tr><td>C</td><td>192.168.0.0 — 192.168.255.255</td><td>/16 (255.255.0.0)</td></tr>
                        </tbody>
                    </table>
                    <div class="tip-box">💡 El router hace <strong>NAT</strong>: traduce tu IP privada por la pública al salir y al revés al volver. Como un portero que recoge nombre y reparte cartas.</div>
                `
            },
            {
                title: "Clases tradicionales A, B, C",
                icon: "🅰️",
                content: `
                    <table class="data-table">
                        <thead><tr><th>Clase</th><th>Primer octeto</th><th>Máscara por defecto</th><th>Redes posibles</th><th>Hosts por red</th></tr></thead>
                        <tbody>
                            <tr><td><strong>A</strong></td><td>1 — 126</td><td>255.0.0.0 (/8)</td><td>126</td><td>16.777.214</td></tr>
                            <tr><td><strong>B</strong></td><td>128 — 191</td><td>255.255.0.0 (/16)</td><td>16.384</td><td>65.534</td></tr>
                            <tr><td><strong>C</strong></td><td>192 — 223</td><td>255.255.255.0 (/24)</td><td>2.097.152</td><td>254</td></tr>
                            <tr><td><strong>D</strong></td><td>224 — 239</td><td>—</td><td>Multicast</td><td>—</td></tr>
                            <tr><td><strong>E</strong></td><td>240 — 255</td><td>—</td><td>Reservada</td><td>—</td></tr>
                        </tbody>
                    </table>
                    <div class="info-box">📌 Las clases siguen estudiándose por contexto histórico, pero en la práctica hoy se usa <strong>CIDR</strong> (Classless Inter-Domain Routing) que permite cualquier prefijo /1 a /32.</div>
                `
            },
            {
                title: "Direcciones especiales",
                icon: "⭐",
                content: `
                    <table class="data-table">
                        <thead><tr><th>Dirección</th><th>Qué es</th></tr></thead>
                        <tbody>
                            <tr><td>0.0.0.0</td><td>Cualquier red / red desconocida</td></tr>
                            <tr><td>127.0.0.1</td><td>Loopback (yo mismo)</td></tr>
                            <tr><td>255.255.255.255</td><td>Broadcast a toda la red local</td></tr>
                            <tr><td>192.168.x.0</td><td>Dirección de red (no asignable)</td></tr>
                            <tr><td>192.168.x.255</td><td>Broadcast de la subred</td></tr>
                            <tr><td>169.254.x.x</td><td>APIPA: no se pudo conseguir IP por DHCP</td></tr>
                        </tbody>
                    </table>
                `
            },
            {
                title: "MAC: la otra dirección",
                icon: "🏷️",
                content: `
                    <p>La <strong>MAC (Media Access Control)</strong> es la dirección física de la tarjeta de red. Cada fabricante asigna una única a cada tarjeta que sale de fábrica.</p>
                    <p><strong>Formato:</strong> 6 grupos de 2 hexadecimales: <code>00:1A:2B:3C:4D:5E</code></p>
                    <p>Los primeros 3 grupos identifican al <strong>fabricante</strong> (OUI), los otros 3 al modelo y la unidad.</p>
                    <div class="info-box">🔐 <strong>Filtrado MAC:</strong> puedes restringir qué MACs se conectan a tu WiFi. Útil, pero saltable: cualquiera puede clonar una MAC.</div>
                `
            },
            {
                title: "🆕 Lo nuevo en direccionamiento",
                icon: "✨",
                content: `
                    <div class="new-concept-box">
                        <strong>🌐 IPv6 SLAAC</strong><br>
                        En IPv6 los equipos pueden autoconfigurarse la IP sin DHCP. El router anuncia el prefijo y cada host genera su dirección.
                    </div>
                    <div class="new-concept-box">
                        <strong>🔒 CGNAT (Carrier-Grade NAT)</strong><br>
                        Los operadores ya no te dan IP pública propia: cientos de clientes comparten una. Por eso muchos juegos online y servicios caseros no funcionan bien.
                    </div>
                    <div class="new-concept-box">
                        <strong>📡 IPAM moderno</strong><br>
                        Las empresas usan herramientas (Infoblox, NetBox, BlueCat) para gestionar miles de IPs como activos. Lo de Excel ya quedó atrás.
                    </div>
                `
            },
            {
                title: "🤫 Curiosidades",
                icon: "🤫",
                content: `
                    <div class="curiosity-box">🌍 La IP <strong>1.1.1.1</strong> es de Cloudflare y es uno de los DNS públicos más rápidos del mundo. La 8.8.8.8 es de Google.</div>
                    <div class="curiosity-box">📉 IPv4 oficialmente <strong>se agotó en 2011</strong>. Hoy se reciclan, se subastan (a $40-60 por dirección) o se sustituyen con NAT.</div>
                    <div class="curiosity-box">🎯 <strong>127.0.0.1 — there's no place like home.</strong> Es un meme entre desarrolladores. Eres tú mismo.</div>
                `
            },
            {
                title: "💡 Consejos prácticos",
                icon: "💡",
                content: `
                    <div class="tip-box">✅ Para tu red doméstica usa <strong>192.168.x.x</strong>. Es la más compatible.</div>
                    <div class="tip-box">✅ Documenta TODAS las IPs estáticas. Un IP-conflict te puede tirar la red.</div>
                    <div class="tip-box">✅ Usa <strong>DNS públicos rápidos</strong> (1.1.1.1, 8.8.8.8) si tu ISP es lento.</div>
                `
            }
        ]
    },

    subnetting: {
        title: "Subnetting y Máscaras de Subred",
        subtitle: "El boss final de las redes. Aquí muchos tropiezan. Tú no.",
        sections: [
            {
                title: "¿Qué es el subnetting?",
                icon: "🧮",
                content: `
                    <p>El <strong>subnetting</strong> es el arte de <strong>dividir una red grande en redes más pequeñas (subredes)</strong>. Se hace tomando "bits prestados" de la parte de host de la IP.</p>
                    <p><strong>¿Por qué subnetar?</strong></p>
                    <ul style="padding-left:24px; line-height:2;">
                        <li>🔒 Aislar departamentos (RRHH ≠ Ventas)</li>
                        <li>🚀 Reducir broadcast (menos tráfico inútil)</li>
                        <li>📋 Organizar mejor la red</li>
                        <li>🧠 Aplicar políticas de seguridad por subred</li>
                    </ul>
                    <div class="highlight-box">
                        <div class="highlight-box-title">🎯 Idea clave</div>
                        <p>Para subnetar, le añadimos <strong>bits a la máscara</strong> por la izquierda en el octeto que toca. Cada bit añadido = doble de subredes, mitad de hosts.</p>
                    </div>
                `
            },
            {
                title: "Máscara y prefijo",
                icon: "🎭",
                content: `
                    <p>La máscara puede escribirse en <strong>decimal</strong> o como <strong>prefijo /</strong>:</p>
                    <table class="data-table">
                        <thead><tr><th>Prefijo</th><th>Máscara decimal</th><th>Hosts útiles</th><th>Notas</th></tr></thead>
                        <tbody>
                            <tr><td>/8</td><td>255.0.0.0</td><td>16.777.214</td><td>Clase A por defecto</td></tr>
                            <tr><td>/16</td><td>255.255.0.0</td><td>65.534</td><td>Clase B por defecto</td></tr>
                            <tr><td>/24</td><td>255.255.255.0</td><td>254</td><td>Clase C por defecto</td></tr>
                            <tr><td>/25</td><td>255.255.255.128</td><td>126</td><td>2 subredes /24</td></tr>
                            <tr><td>/26</td><td>255.255.255.192</td><td>62</td><td>4 subredes /24</td></tr>
                            <tr><td>/27</td><td>255.255.255.224</td><td>30</td><td>8 subredes /24</td></tr>
                            <tr><td>/28</td><td>255.255.255.240</td><td>14</td><td>16 subredes /24</td></tr>
                            <tr><td>/30</td><td>255.255.255.252</td><td>2</td><td>Enlaces punto a punto</td></tr>
                        </tbody>
                    </table>
                    <div class="info-box">📐 <strong>Fórmula clave:</strong> hosts útiles = 2^(bits de host) - 2 (restamos red y broadcast).</div>
                `
            },
            {
                title: "Método paso a paso",
                icon: "📋",
                content: `
                    <p>Para subnetar una red sigue estos pasos. Te los pongo con un ejemplo de los apuntes: <strong>IP 192.168.10.160, necesitamos 4 subredes</strong>.</p>
                    <ol style="padding-left:24px; line-height:2;">
                        <li><strong>Sacar la clase</strong> → 192 ⇒ Clase C ⇒ máscara /24 (255.255.255.0)</li>
                        <li><strong>Bits fijos / variables:</strong> 24 fijos, 8 variables (octeto último)</li>
                        <li><strong>Potencia de 2</strong> que cubra el nº de subredes:
                            <ul><li>2¹=2 ❌</li><li>2²=4 ✅</li></ul>
                        </li>
                        <li><strong>Guarda exponente</strong> (2) y resultado (4)</li>
                        <li><strong>Suma bits prestados a la máscara:</strong> 24+2 = /26 ⇒ 255.255.255.192</li>
                        <li><strong>Calcular incremento:</strong> 256 / 4 = 64</li>
                        <li><strong>Generar subredes</strong> de 64 en 64:
                            <ul>
                                <li>192.168.10.0 — .63</li>
                                <li>192.168.10.64 — .127</li>
                                <li>192.168.10.128 — .191</li>
                                <li>192.168.10.192 — .255</li>
                            </ul>
                        </li>
                        <li><strong>Hosts útiles por subred:</strong> 2^(32-26) - 2 = 64 - 2 = 62</li>
                    </ol>
                    <div class="highlight-box">
                        <div class="highlight-box-title">⚡ Recuerda</div>
                        <p>Por cada subred: primera dirección = <strong>dirección de red</strong>, última = <strong>broadcast</strong>. No se asignan a hosts.</p>
                    </div>
                `
            },
            {
                title: "Identificar a qué subred pertenece una IP",
                icon: "🔍",
                content: `
                    <p>Ejemplo: tengo <strong>192.178.45.68/27</strong> y quiero saber su subred.</p>
                    <ol style="padding-left:24px; line-height:2;">
                        <li>Prefijo /27 → máscara 255.255.255.224 → incremento = 256-224 = 32</li>
                        <li>Octeto del host: 68</li>
                        <li>68 / 32 = 2 (cociente)</li>
                        <li>2 × 32 = 64 → <strong>dirección de red: 192.178.45.64/27</strong></li>
                        <li>Rango útil: .65 a .94 (broadcast: .95)</li>
                    </ol>
                    <div class="tip-box">📌 La fórmula es: <strong>dirección de red = (octeto_host / incremento) × incremento</strong>.</div>
                `
            },
            {
                title: "🆕 VLSM y CIDR",
                icon: "✨",
                content: `
                    <div class="new-concept-box">
                        <strong>📏 VLSM (Variable Length Subnet Mask)</strong><br>
                        Usar máscaras de tamaño distinto en cada subred. Si Ventas necesita 50 hosts y Gerencia 5, no malgastas: pones /26 para uno y /29 para otro.
                    </div>
                    <div class="new-concept-box">
                        <strong>🔢 CIDR (Classless Inter-Domain Routing)</strong><br>
                        Olvídate de clases. Cualquier prefijo entre /1 y /32 es válido. Es el estándar actual de internet.
                    </div>
                    <div class="new-concept-box">
                        <strong>📋 Supernetting</strong><br>
                        Al revés: agrupar varias redes pequeñas en una grande para simplificar tablas de enrutamiento. Típico en proveedores de internet.
                    </div>
                `
            },
            {
                title: "🤫 Lo que nadie te cuenta",
                icon: "🤫",
                content: `
                    <div class="curiosity-box">🧊 Las subredes /30 y /31 se usan en enlaces punto a punto entre routers. Solo necesitas 2 IPs útiles.</div>
                    <div class="curiosity-box">🎯 En las certificaciones (CCNA, etc.) suelen pedirte <strong>subnetting mental en 30 segundos</strong>. Práctica práctica práctica.</div>
                    <div class="curiosity-box">🧠 Mucha gente memoriza una <strong>"tabla de incrementos"</strong>: /25=128, /26=64, /27=32, /28=16, /29=8, /30=4. Te ahorra cálculos.</div>
                `
            },
            {
                title: "💡 Consejos prácticos",
                icon: "💡",
                content: `
                    <div class="tip-box">✅ Para subnetting fluido, <strong>aprende la tabla de potencias de 2</strong> hasta 256.</div>
                    <div class="tip-box">✅ Empieza siempre buscando <strong>la potencia de 2 mínima</strong> que cubra el número pedido.</div>
                    <div class="tip-box">✅ Usa la <strong>calculadora del módulo</strong> y el simulador para verificar. Pero no hagas trampa en exámenes.</div>
                    <div class="tip-box">✅ Al subnetar, suma siempre <strong>2 al número de hosts requerido</strong> (red + broadcast).</div>
                `
            }
        ]
    },

    binario: {
        title: "Binario y Hexadecimal",
        subtitle: "La base matemática de TODO en informática.",
        sections: [
            {
                title: "Sistema binario (base 2)",
                icon: "💻",
                content: `
                    <p>El sistema binario solo usa <strong>dos dígitos: 0 y 1</strong>. Cada dígito se llama <strong>bit</strong>.</p>
                    <p>8 bits = 1 byte. Y un byte puede representar valores de 0 a 255 (2⁸ = 256 valores).</p>
                    <div class="info-box">📍 Una dirección IPv4 son 32 bits = 4 bytes = 4 octetos como <code>192.168.1.1</code>.</div>
                    <table class="data-table">
                        <thead><tr><th>Posición</th><th>8</th><th>7</th><th>6</th><th>5</th><th>4</th><th>3</th><th>2</th><th>1</th></tr></thead>
                        <tbody><tr><td><strong>Valor</strong></td><td>128</td><td>64</td><td>32</td><td>16</td><td>8</td><td>4</td><td>2</td><td>1</td></tr></tbody>
                    </table>
                    <p>Para sacar un valor decimal de un binario, sumas las posiciones donde hay un 1.</p>
                    <p>Ejemplo: <code>11000000</code> → 128 + 64 = <strong>192</strong>.</p>
                `
            },
            {
                title: "Decimal → Binario",
                icon: "➡️",
                content: `
                    <p>Divide entre 2 sucesivamente. Apunta el resto. Lee de abajo arriba.</p>
                    <div class="info-box" style="font-family: 'Courier New', monospace;">
                        Ejemplo: 13 → ?<br>
                        13 / 2 = 6 resto <strong>1</strong><br>
                        6 / 2 = 3 resto <strong>0</strong><br>
                        3 / 2 = 1 resto <strong>1</strong><br>
                        1 / 2 = 0 resto <strong>1</strong><br>
                        Leemos de abajo arriba: <strong>1101</strong>
                    </div>
                    <p>Comprobación: 1101 = 8 + 4 + 1 = 13 ✅</p>
                `
            },
            {
                title: "Binario → Decimal",
                icon: "⬅️",
                content: `
                    <p>Multiplica cada dígito por su potencia de 2 y suma.</p>
                    <div class="info-box" style="font-family: 'Courier New', monospace;">
                        Ejemplo: 10110 → ?<br>
                        1 × 2⁴ = 16<br>
                        0 × 2³ = 0<br>
                        1 × 2² = 4<br>
                        1 × 2¹ = 2<br>
                        0 × 2⁰ = 0<br>
                        Total: <strong>22</strong>
                    </div>
                `
            },
            {
                title: "Sistema hexadecimal (base 16)",
                icon: "🔢",
                content: `
                    <p>Usa <strong>16 símbolos</strong>: 0-9 y A-F. Cada dígito hex equivale a 4 bits binarios.</p>
                    <table class="data-table">
                        <thead><tr><th>Decimal</th><th>Hex</th><th>Decimal</th><th>Hex</th></tr></thead>
                        <tbody>
                            <tr><td>0</td><td>0</td><td>8</td><td>8</td></tr>
                            <tr><td>1</td><td>1</td><td>9</td><td>9</td></tr>
                            <tr><td>2</td><td>2</td><td>10</td><td>A</td></tr>
                            <tr><td>3</td><td>3</td><td>11</td><td>B</td></tr>
                            <tr><td>4</td><td>4</td><td>12</td><td>C</td></tr>
                            <tr><td>5</td><td>5</td><td>13</td><td>D</td></tr>
                            <tr><td>6</td><td>6</td><td>14</td><td>E</td></tr>
                            <tr><td>7</td><td>7</td><td>15</td><td>F</td></tr>
                        </tbody>
                    </table>
                    <p><strong>Usos típicos:</strong> direcciones MAC (00:1A:2B...), colores (#FF8800), direcciones IPv6, memoria.</p>
                `
            },
            {
                title: "Decimal ↔ Hex",
                icon: "🔄",
                content: `
                    <p><strong>Decimal → Hex:</strong> divide entre 16 sucesivamente y apunta restos (10-15 = A-F). Lee de abajo arriba.</p>
                    <div class="info-box" style="font-family: 'Courier New', monospace;">
                        Ejemplo: 255 → ?<br>
                        255 / 16 = 15 resto <strong>15 (F)</strong><br>
                        15 / 16 = 0 resto <strong>15 (F)</strong><br>
                        Resultado: <strong>FF</strong>
                    </div>
                    <p><strong>Hex → Decimal:</strong> multiplica cada dígito por su potencia de 16 y suma.</p>
                    <div class="info-box" style="font-family: 'Courier New', monospace;">
                        Ejemplo: D47F → ?<br>
                        D × 16³ = 13 × 4096 = 53248<br>
                        4 × 16² = 1024<br>
                        7 × 16¹ = 112<br>
                        F × 16⁰ = 15<br>
                        Total: <strong>54399</strong>
                    </div>
                `
            },
            {
                title: "🆕 Aplicaciones modernas",
                icon: "✨",
                content: `
                    <div class="new-concept-box">
                        <strong>🎨 Colores en CSS/diseño:</strong> #87CEEB es azul cielo. Cada par es R, G, B en hex.
                    </div>
                    <div class="new-concept-box">
                        <strong>🔐 Hashes criptográficos:</strong> SHA-256 produce 64 dígitos hex. Bitcoin, certificados SSL, firmas digitales.
                    </div>
                    <div class="new-concept-box">
                        <strong>🌐 IPv6:</strong> totalmente en hexadecimal. Por eso aprender hex es ya inevitable.
                    </div>
                `
            },
            {
                title: "💡 Consejos prácticos",
                icon: "💡",
                content: `
                    <div class="tip-box">✅ Memoriza estas equivalencias binarias: <strong>1=1, 10=2, 11=3, 100=4, 101=5, 110=6, 111=7, 1000=8</strong>.</div>
                    <div class="tip-box">✅ <strong>FF = 255 = 11111111</strong>. Es la equivalencia más útil.</div>
                    <div class="tip-box">✅ Para máscaras de subred, aprende a mirar el último octeto en binario directamente: te ahorra horas.</div>
                `
            }
        ]
    },

    servicios: {
        title: "DNS, DHCP y Protocolos",
        subtitle: "Los servicios invisibles que hacen funcionar todo.",
        sections: [
            {
                title: "DNS: la guía telefónica de internet",
                icon: "📚",
                content: `
                    <p><strong>DNS (Domain Name System)</strong> traduce nombres como <code>google.com</code> a IPs como <code>142.250.184.110</code>. Es lo que te permite no tener que memorizar IPs.</p>
                    <p>El proceso simplificado:</p>
                    <ol style="padding-left:24px; line-height:2;">
                        <li>Escribes <code>marca.com</code> en el navegador</li>
                        <li>Tu equipo consulta su DNS configurado</li>
                        <li>El DNS pregunta a otros DNS hasta encontrar la IP de marca.com</li>
                        <li>Te devuelve la IP y tu navegador conecta</li>
                    </ol>
                    <p><strong>DNS públicos conocidos:</strong></p>
                    <ul style="padding-left:24px; line-height:1.9;">
                        <li>🟢 Google: <code>8.8.8.8</code> / <code>8.8.4.4</code></li>
                        <li>🟠 Cloudflare: <code>1.1.1.1</code> / <code>1.0.0.1</code></li>
                        <li>🟣 Quad9 (con bloqueo de malware): <code>9.9.9.9</code></li>
                    </ul>
                `
            },
            {
                title: "DHCP: el repartidor de IPs",
                icon: "🎁",
                content: `
                    <p><strong>DHCP (Dynamic Host Configuration Protocol)</strong> asigna automáticamente IPs y demás parámetros (máscara, gateway, DNS) a los equipos que se conectan a la red.</p>
                    <p>Proceso (DORA):</p>
                    <ol style="padding-left:24px; line-height:2;">
                        <li><strong>D</strong>iscover: tu equipo grita "¿Hay algún DHCP por aquí?"</li>
                        <li><strong>O</strong>ffer: el servidor DHCP responde "Te ofrezco esta IP"</li>
                        <li><strong>R</strong>equest: tu equipo dice "Acepto, dame esa IP"</li>
                        <li><strong>A</strong>cknowledge: el DHCP confirma "Tuya, válida por X tiempo"</li>
                    </ol>
                    <div class="info-box">⏰ Las IPs se prestan por un tiempo (<strong>lease time</strong>), no para siempre. Si no la renuevas, vuelve al pool.</div>
                    <div class="tip-box">🎯 <strong>Reserva DHCP:</strong> puedes hacer que un equipo siempre reciba la misma IP por su MAC. Lo mejor de ambos mundos.</div>
                `
            },
            {
                title: "Otros protocolos importantes",
                icon: "🌐",
                content: `
                    <table class="data-table">
                        <thead><tr><th>Protocolo</th><th>Puerto</th><th>Para qué sirve</th></tr></thead>
                        <tbody>
                            <tr><td><strong>HTTP</strong></td><td>80</td><td>Web sin cifrar</td></tr>
                            <tr><td><strong>HTTPS</strong></td><td>443</td><td>Web cifrada (TLS)</td></tr>
                            <tr><td><strong>FTP</strong></td><td>20/21</td><td>Transferencia de archivos</td></tr>
                            <tr><td><strong>SFTP / SSH</strong></td><td>22</td><td>Acceso remoto seguro</td></tr>
                            <tr><td><strong>SMTP</strong></td><td>25/587</td><td>Envío de email</td></tr>
                            <tr><td><strong>POP3 / IMAP</strong></td><td>110 / 143</td><td>Recepción de email</td></tr>
                            <tr><td><strong>DNS</strong></td><td>53</td><td>Resolución de nombres</td></tr>
                            <tr><td><strong>DHCP</strong></td><td>67/68</td><td>Asignación de IPs</td></tr>
                            <tr><td><strong>ICMP</strong></td><td>—</td><td>Diagnóstico (ping, tracert)</td></tr>
                            <tr><td><strong>SNMP</strong></td><td>161/162</td><td>Monitorización de dispositivos</td></tr>
                            <tr><td><strong>NTP</strong></td><td>123</td><td>Sincronización de hora</td></tr>
                        </tbody>
                    </table>
                `
            },
            {
                title: "HTTP vs HTTPS",
                icon: "🔒",
                content: `
                    <div class="info-grid">
                        <div class="info-card">
                            <div class="info-card-icon">📭</div>
                            <div class="info-card-title">HTTP</div>
                            <div class="info-card-desc">Sin cifrado. Todo viaja en claro. Hoy considerado inseguro.</div>
                        </div>
                        <div class="info-card">
                            <div class="info-card-icon">🔐</div>
                            <div class="info-card-title">HTTPS</div>
                            <div class="info-card-desc">HTTP + TLS. Los datos van cifrados. El candadito 🔒 del navegador.</div>
                        </div>
                    </div>
                    <div class="warning-box">⚠️ Si una web te pide datos sensibles por HTTP (sin candado), <strong>huye</strong>. En 2026 casi todo es HTTPS por defecto.</div>
                `
            },
            {
                title: "🆕 Servicios modernos",
                icon: "✨",
                content: `
                    <div class="new-concept-box">
                        <strong>🔐 DoH y DoT</strong><br>
                        DNS sobre HTTPS / TLS. Las consultas DNS van cifradas para que tu ISP no vea qué webs visitas.
                    </div>
                    <div class="new-concept-box">
                        <strong>⚡ HTTP/3 (QUIC)</strong><br>
                        Versión moderna de HTTP que va sobre UDP+QUIC. Más rápido en móviles, mejor con cambios de red.
                    </div>
                    <div class="new-concept-box">
                        <strong>🤖 mDNS / Bonjour</strong><br>
                        DNS multicast para descubrir servicios en LAN (impresoras, Chromecasts, AirPlay). Sin servidor DNS central.
                    </div>
                `
            },
            {
                title: "💡 Consejos prácticos",
                icon: "💡",
                content: `
                    <div class="tip-box">✅ Si una página no carga pero otras sí: <strong>cambia el DNS</strong>. Casi siempre soluciona.</div>
                    <div class="tip-box">✅ <strong>Reserva DHCP</strong> para impresoras, NAS y servidores. Para PCs normales no hace falta.</div>
                    <div class="tip-box">✅ Memoriza al menos <strong>HTTP 80, HTTPS 443, SSH 22, DNS 53, DHCP 67/68</strong>. Sale en cualquier examen.</div>
                `
            }
        ]
    },

    wifi: {
        title: "Redes Inalámbricas y WiFi",
        subtitle: "Conectividad sin cables: el milagro de las ondas.",
        sections: [
            {
                title: "¿Qué es el WiFi?",
                icon: "📶",
                content: `
                    <p><strong>WiFi</strong> (Wireless Fidelity) es el estándar de redes inalámbricas locales más usado. Pertenece a la familia <strong>IEEE 802.11</strong>.</p>
                    <p>Usa ondas de radio para transmitir datos entre dispositivos. El AP (Access Point) actúa de centro: convierte la red cableada en inalámbrica.</p>
                    <div class="info-box">📡 El SSID es el nombre de la WiFi. Es solo un texto, no implica seguridad.</div>
                `
            },
            {
                title: "Bandas y canales",
                icon: "📻",
                content: `
                    <div class="info-grid">
                        <div class="info-card">
                            <div class="info-card-icon">📡</div>
                            <div class="info-card-title">2.4 GHz</div>
                            <div class="info-card-desc">Más alcance, menos velocidad. Saturada por todo (microondas, Bluetooth).</div>
                        </div>
                        <div class="info-card">
                            <div class="info-card-icon">⚡</div>
                            <div class="info-card-title">5 GHz</div>
                            <div class="info-card-desc">Más velocidad, menos alcance. Más canales, menos interferencias.</div>
                        </div>
                        <div class="info-card">
                            <div class="info-card-icon">🚀</div>
                            <div class="info-card-title">6 GHz</div>
                            <div class="info-card-desc">Nueva. Solo WiFi 6E y 7. Brutal velocidad. Poco alcance.</div>
                        </div>
                    </div>
                    <div class="tip-box">📝 En 2.4 GHz solo hay 3 canales no solapados: <strong>1, 6 y 11</strong>. Si tus vecinos están en 6, ponte en 1 o 11.</div>
                `
            },
            {
                title: "Generaciones WiFi",
                icon: "📅",
                content: `
                    <table class="data-table">
                        <thead><tr><th>Nombre</th><th>Estándar</th><th>Año</th><th>Velocidad máx.</th><th>Banda</th></tr></thead>
                        <tbody>
                            <tr><td>WiFi 1</td><td>802.11a/b</td><td>1999</td><td>11 Mbps</td><td>2.4 / 5 GHz</td></tr>
                            <tr><td>WiFi 2</td><td>802.11g</td><td>2003</td><td>54 Mbps</td><td>2.4 GHz</td></tr>
                            <tr><td>WiFi 4</td><td>802.11n</td><td>2009</td><td>600 Mbps</td><td>2.4 / 5 GHz</td></tr>
                            <tr><td>WiFi 5</td><td>802.11ac</td><td>2014</td><td>~3.5 Gbps</td><td>5 GHz</td></tr>
                            <tr><td>WiFi 6</td><td>802.11ax</td><td>2019</td><td>~9.6 Gbps</td><td>2.4 / 5 GHz</td></tr>
                            <tr><td>WiFi 6E</td><td>802.11ax-6E</td><td>2021</td><td>~9.6 Gbps</td><td>+ 6 GHz</td></tr>
                            <tr><td><strong>WiFi 7</strong></td><td>802.11be</td><td>2024</td><td>~46 Gbps</td><td>2.4/5/6 GHz</td></tr>
                        </tbody>
                    </table>
                `
            },
            {
                title: "Seguridad: WEP, WPA, WPA2, WPA3",
                icon: "🔒",
                content: `
                    <table class="data-table">
                        <thead><tr><th>Protocolo</th><th>Año</th><th>Cifrado</th><th>Estado</th></tr></thead>
                        <tbody>
                            <tr><td><strong>WEP</strong></td><td>1999</td><td>RC4</td><td>❌ Roto. NO usar.</td></tr>
                            <tr><td><strong>WPA</strong></td><td>2003</td><td>RC4 + TKIP</td><td>❌ Vulnerable.</td></tr>
                            <tr><td><strong>WPA2</strong></td><td>2004</td><td>AES (CCMP)</td><td>✅ Sigue siendo seguro.</td></tr>
                            <tr><td><strong>WPA3</strong></td><td>2018</td><td>AES + SAE</td><td>✅ Lo mejor disponible.</td></tr>
                        </tbody>
                    </table>
                    <div class="warning-box">⚠️ <strong>WPS (Wi-Fi Protected Setup)</strong> es el ataque favorito de los ladrones de WiFi. Desactívalo siempre.</div>
                `
            },
            {
                title: "🆕 WiFi moderno",
                icon: "✨",
                content: `
                    <div class="new-concept-box">
                        <strong>📡 MU-MIMO (Multi-User MIMO)</strong><br>
                        El AP habla con varios dispositivos a la vez en vez de uno tras otro. Esencial cuando hay muchos clientes.
                    </div>
                    <div class="new-concept-box">
                        <strong>🌐 Mesh WiFi</strong><br>
                        Varios APs cooperando como una sola red. Roaming transparente. Sistemas como eero, Deco, Orbi.
                    </div>
                    <div class="new-concept-box">
                        <strong>⚡ MLO (Multi-Link Operation)</strong><br>
                        Función estrella de WiFi 7: usar varias bandas SIMULTÁNEAMENTE para más velocidad y fiabilidad.
                    </div>
                `
            },
            {
                title: "🤫 Curiosidades",
                icon: "🤫",
                content: `
                    <div class="curiosity-box">🔬 El nombre <strong>"WiFi"</strong> no significa nada técnico. Fue inventado por una agencia de marketing.</div>
                    <div class="curiosity-box">📊 Cada paquete WiFi tiene <strong>cabeceras añadidas</strong> que reducen la velocidad real al ~60% de la nominal.</div>
                    <div class="curiosity-box">🔒 <strong>WPS</strong> tiene un fallo de diseño: tras unas horas de ataque por fuerza bruta, te dan la contraseña. Por eso desactívalo.</div>
                `
            },
            {
                title: "💡 Consejos prácticos",
                icon: "💡",
                content: `
                    <div class="tip-box">✅ Si tu router lo permite, separa las redes en <strong>2.4 y 5 GHz con SSIDs distintos</strong>. Más control.</div>
                    <div class="tip-box">✅ Pon contraseñas de <strong>al menos 16 caracteres</strong>. WPA2 con clave corta es fácil de romper.</div>
                    <div class="tip-box">✅ Para cobertura grande, prefiere <strong>mesh</strong> sobre repetidores. Los repetidores cortan la velocidad a la mitad.</div>
                    <div class="tip-box">✅ Crea una <strong>red de invitados</strong> separada de tu red principal.</div>
                `
            }
        ]
    },

    vlans: {
        title: "VLANs y Segmentación",
        subtitle: "Una sola red física, muchas redes lógicas independientes.",
        sections: [
            {
                title: "¿Qué es una VLAN?",
                icon: "🔀",
                content: `
                    <p>Una <strong>VLAN (Virtual LAN)</strong> es una red lógica independiente dentro de una red física. Permite que dispositivos físicamente conectados al mismo switch <strong>no se vean entre sí</strong> si están en VLANs distintas.</p>
                    <div class="highlight-box">
                        <div class="highlight-box-title">🎯 Caso típico</div>
                        <p>En una empresa: VLAN 10 para Empleados, VLAN 20 para Invitados, VLAN 30 para Servidores. Todos en el mismo switch, pero tráficos separados.</p>
                    </div>
                `
            },
            {
                title: "Ventajas de las VLANs",
                icon: "✅",
                content: `
                    <div class="info-grid">
                        <div class="info-card">
                            <div class="info-card-icon">🔒</div>
                            <div class="info-card-title">Seguridad</div>
                            <div class="info-card-desc">Aíslas departamentos sensibles (RRHH, Finanzas).</div>
                        </div>
                        <div class="info-card">
                            <div class="info-card-icon">📉</div>
                            <div class="info-card-title">Menos broadcast</div>
                            <div class="info-card-desc">Cada VLAN tiene su propio dominio de broadcast.</div>
                        </div>
                        <div class="info-card">
                            <div class="info-card-icon">⚡</div>
                            <div class="info-card-title">Mejor rendimiento</div>
                            <div class="info-card-desc">Menos colisiones, menos tráfico inútil.</div>
                        </div>
                        <div class="info-card">
                            <div class="info-card-icon">🔧</div>
                            <div class="info-card-title">Fácil gestión</div>
                            <div class="info-card-desc">Mover usuarios sin tocar cableado.</div>
                        </div>
                    </div>
                `
            },
            {
                title: "Tipos de puertos en VLAN",
                icon: "🔌",
                content: `
                    <div class="info-grid">
                        <div class="info-card">
                            <div class="info-card-icon">🎯</div>
                            <div class="info-card-title">Access</div>
                            <div class="info-card-desc">Pertenece a UNA sola VLAN. Donde se enchufan PCs, impresoras, etc.</div>
                        </div>
                        <div class="info-card">
                            <div class="info-card-icon">🛤️</div>
                            <div class="info-card-title">Trunk</div>
                            <div class="info-card-desc">Lleva tráfico de VARIAS VLANs. Etiqueta con 802.1Q. Entre switches o switch-router.</div>
                        </div>
                    </div>
                    <div class="info-box">🏷️ <strong>802.1Q</strong> añade una etiqueta de 4 bytes a cada frame con el ID de VLAN (1-4094). Es como ponerle un pegatín al sobre.</div>
                `
            },
            {
                title: "Routing entre VLANs",
                icon: "🛣️",
                content: `
                    <p>Las VLANs por defecto NO se comunican entre sí. Para que sí lo hagan necesitas <strong>routing</strong>:</p>
                    <div class="info-grid">
                        <div class="info-card">
                            <div class="info-card-icon">🥢</div>
                            <div class="info-card-title">Router-on-a-stick</div>
                            <div class="info-card-desc">Un router con un trunk a múltiples VLANs (subinterfaces).</div>
                        </div>
                        <div class="info-card">
                            <div class="info-card-icon">⚡</div>
                            <div class="info-card-title">Switch L3</div>
                            <div class="info-card-desc">El switch enruta directamente entre VLANs. Más rápido.</div>
                        </div>
                    </div>
                `
            },
            {
                title: "VLANs típicas",
                icon: "📋",
                content: `
                    <table class="data-table">
                        <thead><tr><th>VLAN ID</th><th>Uso típico</th></tr></thead>
                        <tbody>
                            <tr><td>1</td><td>Default (NO usar para datos)</td></tr>
                            <tr><td>10</td><td>Empleados</td></tr>
                            <tr><td>20</td><td>Invitados / WiFi público</td></tr>
                            <tr><td>30</td><td>Voz (VoIP)</td></tr>
                            <tr><td>40</td><td>Servidores</td></tr>
                            <tr><td>50</td><td>Gestión (admin de switches)</td></tr>
                            <tr><td>99</td><td>Native VLAN del trunk</td></tr>
                        </tbody>
                    </table>
                `
            },
            {
                title: "🆕 Tendencias modernas",
                icon: "✨",
                content: `
                    <div class="new-concept-box">
                        <strong>🧩 VXLAN</strong><br>
                        VLAN sobre IP. Permite tener millones de VLANs (24 bits) sobre cualquier red enrutada. Estándar en datacenters.
                    </div>
                    <div class="new-concept-box">
                        <strong>🤖 Microsegmentación</strong><br>
                        En vez de VLANs por departamento, segmentas por aplicación o por carga de trabajo. Zero Trust pure.
                    </div>
                    <div class="new-concept-box">
                        <strong>📡 Dynamic VLAN assignment</strong><br>
                        El usuario se conecta y según su identidad (802.1X) recibe automáticamente la VLAN correspondiente.
                    </div>
                `
            },
            {
                title: "💡 Consejos prácticos",
                icon: "💡",
                content: `
                    <div class="tip-box">✅ <strong>No uses la VLAN 1</strong> para tráfico. Es la default y eso ya es un problema de seguridad.</div>
                    <div class="tip-box">✅ Cada VLAN debería tener su <strong>propia subred IP</strong>. Si están en la misma subred, te lías solo.</div>
                    <div class="tip-box">✅ Documenta tus VLANs en un Excel/Notion: ID, propósito, subred, gateway, DHCP scope.</div>
                `
            }
        ]
    },

    diseno: {
        title: "Diseño Lógico y Físico de Redes",
        subtitle: "Cómo pasar de un plano vacío a una red empresarial real.",
        sections: [
            {
                title: "Diseño lógico vs físico",
                icon: "📐",
                content: `
                    <div class="info-grid">
                        <div class="info-card">
                            <div class="info-card-icon">🧠</div>
                            <div class="info-card-title">Diseño lógico</div>
                            <div class="info-card-desc">Esquema de IPs, VLANs, subredes, servicios, routing. No depende del espacio físico.</div>
                        </div>
                        <div class="info-card">
                            <div class="info-card-icon">📦</div>
                            <div class="info-card-title">Diseño físico</div>
                            <div class="info-card-desc">Ubicación de racks, switches, APs, cableado. Plano de planta con dispositivos.</div>
                        </div>
                    </div>
                `
            },
            {
                title: "Modelo jerárquico de 3 capas",
                icon: "🏗️",
                content: `
                    <p>El diseño clásico empresarial. Tres capas con roles distintos:</p>
                    <table class="data-table">
                        <thead><tr><th>Capa</th><th>Rol</th><th>Dispositivos típicos</th></tr></thead>
                        <tbody>
                            <tr><td><strong>Core</strong></td><td>Backbone de alta velocidad. Solo enruta.</td><td>Switches L3 muy potentes</td></tr>
                            <tr><td><strong>Distribución</strong></td><td>Conecta core con acceso. Aplica políticas.</td><td>Switches L3</td></tr>
                            <tr><td><strong>Acceso</strong></td><td>Conecta usuarios finales.</td><td>Switches L2, APs</td></tr>
                        </tbody>
                    </table>
                    <div class="info-box">🔝 Cuanto más arriba, más velocidad y más redundancia. Caer el core = caer toda la red.</div>
                `
            },
            {
                title: "Elementos del CPD",
                icon: "🏢",
                content: `
                    <p>El <strong>CPD (Centro de Procesamiento de Datos)</strong> es el corazón de la red. Suele contener:</p>
                    <ul style="padding-left:24px; line-height:2;">
                        <li>🛜 <strong>Router principal</strong> (conexión al exterior)</li>
                        <li>🛡️ <strong>Firewall</strong> (filtrado de tráfico)</li>
                        <li>🔀 <strong>Switch L3 de core</strong> (24-48 bocas)</li>
                        <li>📋 <strong>Patch panels</strong> (panel donde llegan los cables del edificio)</li>
                        <li>🗄️ <strong>Servidores</strong> (dominio, ficheros, BBDD, backup, web)</li>
                        <li>🔋 <strong>SAI/UPS</strong> (sistema de alimentación ininterrumpida)</li>
                        <li>❄️ <strong>Climatización</strong> (la temperatura debe estar a 18-22°C)</li>
                        <li>🚨 <strong>Sistema antiincendios</strong> (con gas, no con agua)</li>
                    </ul>
                `
            },
            {
                title: "Cableado estructurado",
                icon: "🏗️",
                content: `
                    <p>Es la <strong>norma para tirar cable de red profesionalmente</strong> en edificios. Define todo: tipos de cable, conectores, distancias, etiquetado, certificación.</p>
                    <p>Componentes:</p>
                    <div class="info-grid">
                        <div class="info-card">
                            <div class="info-card-icon">📋</div>
                            <div class="info-card-title">Patch panel</div>
                            <div class="info-card-desc">Panel en el rack donde llegan los cables del edificio. Por delante salen patch cords cortos al switch.</div>
                        </div>
                        <div class="info-card">
                            <div class="info-card-icon">🗄️</div>
                            <div class="info-card-title">Rack</div>
                            <div class="info-card-desc">Armario donde se monta todo el equipo. Tamaño en U (unidades).</div>
                        </div>
                        <div class="info-card">
                            <div class="info-card-icon">🔌</div>
                            <div class="info-card-title">Roseta</div>
                            <div class="info-card-desc">Toma de red de pared donde enchufas el latiguillo al PC.</div>
                        </div>
                        <div class="info-card">
                            <div class="info-card-icon">🪜</div>
                            <div class="info-card-title">Canalización</div>
                            <div class="info-card-desc">Bandejas y tubos por donde van los cables. Etiquetadas.</div>
                        </div>
                    </div>
                `
            },
            {
                title: "Proceso de diseño paso a paso",
                icon: "📋",
                content: `
                    <ol style="padding-left:24px; line-height:2.2;">
                        <li>📋 <strong>Recogida de requisitos:</strong> ¿cuántos usuarios? ¿qué hacen? ¿servicios?</li>
                        <li>📐 <strong>Plano del edificio:</strong> medidas, plantas, puntos clave.</li>
                        <li>🌐 <strong>Diseño lógico:</strong> VLANs, subredes, IPs, servicios.</li>
                        <li>📦 <strong>Diseño físico:</strong> dónde van rack, AP, switches, rosetas.</li>
                        <li>🛒 <strong>Elección de equipos:</strong> marca, modelo, presupuesto.</li>
                        <li>📏 <strong>Cálculo de cable:</strong> metros, latiguillos, organizadores.</li>
                        <li>🏗️ <strong>Instalación:</strong> obra civil, tirada de cable, montaje rack.</li>
                        <li>⚙️ <strong>Configuración:</strong> IPs, VLANs, routing, WiFi.</li>
                        <li>✅ <strong>Pruebas:</strong> conectividad, rendimiento, fallos simulados.</li>
                        <li>📝 <strong>Documentación:</strong> esquemas, inventario, contraseñas.</li>
                    </ol>
                `
            },
            {
                title: "🆕 Tendencias modernas en diseño",
                icon: "✨",
                content: `
                    <div class="new-concept-box">
                        <strong>☁️ Cloud-first / Hybrid</strong><br>
                        Cada vez más empresas mueven servidores a AWS/Azure y mantienen solo lo crítico on-premise.
                    </div>
                    <div class="new-concept-box">
                        <strong>🔐 Zero Trust</strong><br>
                        Modelo de seguridad: nunca confíes por defecto, ni siquiera dentro de la red. Cada conexión se verifica.
                    </div>
                    <div class="new-concept-box">
                        <strong>🤖 Network as Code</strong><br>
                        Configuras toda la red con Ansible, Terraform o scripts. Versionado en git. Adiós a cambios manuales.
                    </div>
                `
            },
            {
                title: "💡 Consejos prácticos",
                icon: "💡",
                content: `
                    <div class="tip-box">✅ <strong>Sobre-dimensiona el cableado.</strong> Tirar fibra extra hoy cuesta poco. Tirarla mañana, mucho.</div>
                    <div class="tip-box">✅ <strong>Etiqueta TODO.</strong> Cada cable, cada roseta, cada puerto del patch panel.</div>
                    <div class="tip-box">✅ Documenta con esquemas (Draw.io, Lucidchart, diagrams.net). <strong>Lo que no está documentado, no existe.</strong></div>
                `
            }
        ]
    },

    troubleshooting: {
        title: "Diagnóstico y Troubleshooting",
        subtitle: "Cuando algo falla, ¿por dónde empiezo?",
        sections: [
            {
                title: "Método capa por capa",
                icon: "🪜",
                content: `
                    <p>Cuando algo no funciona, sube las capas del modelo OSI/TCP-IP:</p>
                    <ol style="padding-left:24px; line-height:2;">
                        <li><strong>Capa 1 - Física:</strong> ¿está el cable enchufado? ¿LED del switch encendido?</li>
                        <li><strong>Capa 2 - Enlace:</strong> ¿MAC correcta? ¿en la VLAN correcta?</li>
                        <li><strong>Capa 3 - Red:</strong> ¿tiene IP? ¿la máscara y gateway son correctos?</li>
                        <li><strong>Capa 4 - Transporte:</strong> ¿puerto abierto? ¿firewall?</li>
                        <li><strong>Capa 7 - Aplicación:</strong> ¿el servicio está corriendo? ¿DNS resuelve?</li>
                    </ol>
                    <div class="highlight-box">
                        <div class="highlight-box-title">🧠 Regla mental</div>
                        <p><strong>"Es siempre DNS."</strong> No siempre lo es, pero suficientes veces como para revisarlo primero.</p>
                    </div>
                `
            },
            {
                title: "Comandos esenciales",
                icon: "⌨️",
                content: `
                    <table class="data-table">
                        <thead><tr><th>Comando</th><th>Para qué sirve</th></tr></thead>
                        <tbody>
                            <tr><td><code>ipconfig</code> / <code>ifconfig</code></td><td>Ver configuración de red local</td></tr>
                            <tr><td><code>ipconfig /all</code></td><td>Info completa, incluyendo DNS y DHCP</td></tr>
                            <tr><td><code>ipconfig /release</code></td><td>Liberar IP DHCP</td></tr>
                            <tr><td><code>ipconfig /renew</code></td><td>Pedir nueva IP DHCP</td></tr>
                            <tr><td><code>ipconfig /flushdns</code></td><td>Borrar caché DNS local</td></tr>
                            <tr><td><code>ping &lt;ip o nombre&gt;</code></td><td>Comprueba conectividad y latencia</td></tr>
                            <tr><td><code>tracert</code> / <code>traceroute</code></td><td>Ruta paquete a paquete hasta el destino</td></tr>
                            <tr><td><code>pathping</code></td><td>ping + tracert combinados</td></tr>
                            <tr><td><code>nslookup</code></td><td>Consulta DNS manual</td></tr>
                            <tr><td><code>netstat -an</code></td><td>Conexiones activas y puertos abiertos</td></tr>
                            <tr><td><code>arp -a</code></td><td>Tabla ARP local (IP↔MAC)</td></tr>
                            <tr><td><code>getmac</code></td><td>MAC de las interfaces</td></tr>
                            <tr><td><code>hostname</code></td><td>Nombre del equipo</td></tr>
                            <tr><td><code>netsh</code></td><td>Suite completa de gestión de red</td></tr>
                        </tbody>
                    </table>
                `
            },
            {
                title: "Ping: el comando rey",
                icon: "📡",
                content: `
                    <p>Envía paquetes <strong>ICMP echo request</strong>. Si recibes respuesta, hay conectividad.</p>
                    <div class="info-box" style="font-family: 'Courier New', monospace;">
                        $ ping 8.8.8.8<br>
                        Reply from 8.8.8.8: bytes=32 time=15ms TTL=117<br>
                        Reply from 8.8.8.8: bytes=32 time=14ms TTL=117<br>
                        ...<br>
                        <strong>Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)</strong>
                    </div>
                    <p><strong>Orden lógico de pings:</strong></p>
                    <ol style="padding-left:24px; line-height:1.9;">
                        <li><code>ping 127.0.0.1</code> → tu propio stack TCP/IP</li>
                        <li><code>ping &lt;tu IP&gt;</code> → tu tarjeta de red</li>
                        <li><code>ping &lt;gateway&gt;</code> → tu red local</li>
                        <li><code>ping 8.8.8.8</code> → internet por IP</li>
                        <li><code>ping google.com</code> → internet + DNS</li>
                    </ol>
                    <p>Si uno falla, sabes exactamente dónde está el problema.</p>
                `
            },
            {
                title: "Tracert: el GPS de los paquetes",
                icon: "🗺️",
                content: `
                    <p>Te muestra <strong>todos los routers</strong> por los que pasa un paquete hasta el destino. Útil para localizar dónde se rompe la cadena.</p>
                    <div class="info-box" style="font-family: 'Courier New', monospace; font-size:0.85em;">
                        $ tracert google.com<br>
                        1   1 ms   192.168.1.1   router casa<br>
                        2   15 ms  10.0.0.1      ISP gateway<br>
                        3   18 ms  77.224.x.x    red Telefónica<br>
                        ...<br>
                        12  35 ms  142.250.x.x   google.com
                    </div>
                    <p>Usa TTL (Time To Live) creciente: 1, 2, 3... y cada router responde "expirado" hasta llegar al final.</p>
                `
            },
            {
                title: "Problemas típicos y soluciones",
                icon: "🔧",
                content: `
                    <table class="data-table">
                        <thead><tr><th>Síntoma</th><th>Posible causa</th><th>Qué probar</th></tr></thead>
                        <tbody>
                            <tr><td>Sin IP, aparece 169.254.x.x</td><td>DHCP no responde (APIPA)</td><td>Revisar cable, router, servidor DHCP</td></tr>
                            <tr><td>Tengo IP, no llego al gateway</td><td>Cable suelto, VLAN incorrecta</td><td>Ping gateway, check switch</td></tr>
                            <tr><td>Llego al gateway, no a internet</td><td>Router caído o sin WAN</td><td>Reiniciar router, llamar ISP</td></tr>
                            <tr><td>Web no carga, pero ping sí</td><td>DNS roto</td><td>Cambiar DNS, flushdns</td></tr>
                            <tr><td>Lento solo en ciertas horas</td><td>Saturación, otros usuarios</td><td>Medir bandwidth, ver con tracert</td></tr>
                            <tr><td>WiFi se desconecta solo</td><td>Saturación canal, interferencias</td><td>Cambiar canal, banda</td></tr>
                        </tbody>
                    </table>
                `
            },
            {
                title: "🆕 Herramientas modernas",
                icon: "✨",
                content: `
                    <div class="new-concept-box">
                        <strong>🦈 Wireshark</strong><br>
                        Captura paquetes en tiempo real. Imprescindible para entender qué está pasando de verdad en la red.
                    </div>
                    <div class="new-concept-box">
                        <strong>📊 PRTG / Zabbix / LibreNMS</strong><br>
                        Monitorización profesional. Te avisan antes de que el usuario se queje.
                    </div>
                    <div class="new-concept-box">
                        <strong>🤖 ThousandEyes / Catchpoint</strong><br>
                        Monitorización de experiencia digital de extremo a extremo. Saben si Slack o Google Drive están lentos desde la perspectiva de TU oficina.
                    </div>
                `
            },
            {
                title: "💡 Consejos prácticos",
                icon: "💡",
                content: `
                    <div class="tip-box">✅ <strong>El 90% se arregla reiniciando el router.</strong> No es broma. Es probabilidad pura.</div>
                    <div class="tip-box">✅ <strong>Mantén un cable de red en la mochila.</strong> Si el WiFi falla, conectas por cable y diagnosticas.</div>
                    <div class="tip-box">✅ <strong>Aprende a leer logs.</strong> Tanto del router/switch como del Visor de eventos de Windows.</div>
                    <div class="tip-box">✅ <strong>Documenta cada incidencia y su solución.</strong> Tu yo del futuro te abrazará.</div>
                `
            }
        ]
    },

    // ============================================
    // HERRAMIENTAS DEL TÉCNICO
    // ============================================
    herramientas: {
        sections: [
            {
                title: "🧰 El arsenal del técnico",
                icon: "🧰",
                content: `
                    <p>Un buen técnico se distingue por las <strong>herramientas que conoce y sabe usar</strong>. No basta con saber teoría: cuando un equipo no arranca, cuando un disco se llena sin saber por qué, cuando una contraseña se ha perdido... necesitas saber qué botón pulsar.</p>
                    <p>En este módulo vas a conocer las herramientas más utilizadas por técnicos informáticos en el mundo real. Algunas son oficiales y conocidas, otras son <strong>"secretas" entre profesionales</strong>, y casi todas son gratis.</p>
                    <div class="highlight-box">
                        <div class="highlight-box-title">🎯 Filosofía</div>
                        <p>Tener un USB con varias de estas herramientas <strong>bien configurado</strong> es la diferencia entre tardar 5 minutos o tardar 5 horas en arreglar un PC.</p>
                    </div>
                `
            },
            {
                title: "💿 Sergei Strelec — El PE definitivo",
                icon: "💿",
                content: `
                    <p><strong>Sergei Strelec</strong> (también llamado Windows 10/11 PE Sergei Strelec) es un <strong>disco de rescate booteable</strong> parecido a Hiren's Boot, pero mucho más completo y técnico. Es una de las herramientas más potentes que existen para reparar y recuperar PCs.</p>
                    <h4 style="color:var(--azul-oscuro); margin-top:14px;">¿Qué es exactamente?</h4>
                    <p>Es una <strong>imagen PE (Preinstallation Environment)</strong> basada en Windows 10/11, creada por un técnico ruso. Arranca desde USB o DVD y te inicia un Windows portátil cargado en RAM, desde el que puedes:</p>
                    <ul style="padding-left:24px; line-height:1.9;">
                        <li><strong>Recuperar sistemas</strong> que no arrancan</li>
                        <li><strong>Reparar arranque</strong> (MBR, GPT, BCD) con BOOTICE</li>
                        <li><strong>Clonar discos</strong> con AOMEI, Partition Wizard</li>
                        <li><strong>Hacer backup/restore</strong> de particiones</li>
                        <li><strong>Quitar contraseñas</strong> de Windows con NTPWEdit o PassFab</li>
                        <li><strong>Analizar hardware</strong> con CrystalDiskInfo, Victoria, HDDScan</li>
                        <li><strong>Limpiar virus</strong> con Dr.Web CureIt</li>
                        <li><strong>Recuperar archivos</strong> de un PC muerto</li>
                        <li><strong>Navegar por internet</strong> desde el PE</li>
                    </ul>
                    <div class="warning-box">⚠️ <strong>Importante:</strong> No es oficial ni está licenciado por Microsoft. No se encuentra en webs oficiales. Suele descargarse desde <strong>MajorGeeks</strong> (sitio de confianza) o desde foros.</div>
                    <h4 style="color:var(--azul-oscuro); margin-top:14px;">Instalación con Ventoy</h4>
                    <ol style="padding-left:24px; line-height:1.9;">
                        <li>Conectamos USB</li>
                        <li>Abrimos <code>Ventoy2Disk.exe</code></li>
                        <li>En "Device" seleccionamos nuestro USB y damos a Instalar</li>
                        <li>Copiamos la ISO descargada <code>WinPE_10_11_Sergei_Strelec_x64.iso</code> DENTRO del USB</li>
                        <li>¡Listo! Reiniciamos y arrancamos desde USB</li>
                    </ol>
                    <h4 style="color:var(--azul-oscuro); margin-top:14px;">Instalación con Rufus</h4>
                    <ol style="padding-left:24px; line-height:1.9;">
                        <li>Conecta tu USB</li>
                        <li>En "Seleccionar" elige la ISO de Strelec</li>
                        <li>Esquema de partición: <strong>MBR</strong></li>
                        <li>Sistema de archivos: <strong>FAT32</strong> (si te deja). Si la ISO pesa demasiado, <strong>NTFS</strong></li>
                        <li>Pulsa <strong>EMPEZAR</strong></li>
                    </ol>
                `
            },
            {
                title: "📦 Ninite — Instalar 20 programas en 1 clic",
                icon: "📦",
                content: `
                    <p><strong>Ninite</strong> es una herramienta increíble cuando tienes que <strong>configurar un PC desde cero</strong>. En lugar de descargar 20 instaladores uno a uno, marcas las casillas de los programas que quieres y Ninite genera UN único instalador que descarga e instala todo automáticamente, sin clicar siguiente siguiente siguiente.</p>
                    <h4 style="color:var(--azul-oscuro); margin-top:14px;">¿Qué puedes instalar?</h4>
                    <p>Categorías típicas:</p>
                    <ul style="padding-left:24px; line-height:1.9;">
                        <li><strong>Navegadores:</strong> Chrome, Firefox, Edge, Brave, Opera</li>
                        <li><strong>Mensajería:</strong> Discord, Zoom, Teams, Pidgin, Trillian</li>
                        <li><strong>Imagen:</strong> Krita, Blender, Paint.NET, GIMP, IrfanView, Inkscape</li>
                        <li><strong>Documentos:</strong> Foxit Reader, LibreOffice, OpenOffice, SumatraPDF, CutePDF</li>
                        <li><strong>Multimedia:</strong> VLC, AIMP, foobar2000, Spotify, MediaMonkey, HandBrake</li>
                        <li><strong>Tiempos de ejecución:</strong> .NET 4.8.1, .NET Desktop Runtime 8/9/10, Java</li>
                        <li><strong>Compartir archivos:</strong> qBittorrent</li>
                        <li><strong>Seguridad:</strong> Malwarebytes</li>
                    </ul>
                    <p>Tan solo visitas <strong>ninite.com</strong>, marcas las casillas y descargas el instalador único.</p>
                    <div class="warning-box">⚠️ <strong>Atención:</strong> Se dice y se comenta que puede contener algún adware en versiones modernas. Recomendable <strong>escanear el instalador con Malwarebytes</strong> antes de ejecutarlo. Pero te ahorra horas.</div>
                `
            },
            {
                title: "🖥️ CPU-Z — Inventario del hardware",
                icon: "🖥️",
                content: `
                    <p><strong>CPU-Z</strong> es un software que nos permite conocer el <strong>funcionamiento detallado y la configuración exacta de un equipo</strong>. Es importante si quieres actualizar el PC (añadir más RAM, ver qué procesador tienes, etc.).</p>
                    <p>Aporta una utilidad más profunda en prácticamente todas las áreas en comparación con las herramientas proporcionadas por Windows, para identificar varios componentes de hardware <strong>sin necesidad de abrir el chasis del PC</strong>.</p>
                    <h4 style="color:var(--azul-oscuro); margin-top:14px;">Lo más útil</h4>
                    <ul style="padding-left:24px; line-height:1.9;">
                        <li><strong>Datos SPD de la RAM:</strong> fabricante, fecha de fabricación, número de pieza. Crucial si vas a añadir más memoria y necesitas que sea compatible.</li>
                        <li><strong>CPU:</strong> modelo exacto, socket, voltaje, instrucciones soportadas, multiplicador.</li>
                        <li><strong>Mainboard:</strong> modelo, chipset, BIOS, slots PCI.</li>
                        <li><strong>Gráficos:</strong> GPU detectada y características.</li>
                    </ul>
                    <p>Descarga: <code>https://www.cpuid.com/softwares/cpu-z.html</code></p>
                `
            },
            {
                title: "📊 Spacesniffer — ¿Quién se ha comido mi disco?",
                icon: "📊",
                content: `
                    <p>Útil cuando una unidad está bastante saturada, llena de archivos, y no eres capaz de dilucidar cuáles de éstos son prescindibles.</p>
                    <p><strong>Spacesniffer</strong> escanea la unidad y muestra los archivos/carpetas <strong>en bloques proporcionales a su tamaño</strong>. Verás de un vistazo qué carpeta se está comiendo 200 GB de tu disco. Bestial.</p>
                    <div class="info-box">📌 Existe una alternativa muy parecida llamada <strong>WinDirStat</strong>, también gratuita.</div>
                `
            },
            {
                title: "🔐 Sigverif — Detector de archivos sin firma",
                icon: "🔐",
                content: `
                    <p>Si pulsas <code>Windows+R</code> accederás al panel de Ejecutar. Si escribes <code>sigverif</code>, podrás <strong>rastrear tu equipo en busca de modificaciones maliciosas</strong> o archivos que no contengan una firma digital válida.</p>
                    <p>Se escaneará tu equipo en busca de estos archivos. Útil para detectar:</p>
                    <ul style="padding-left:24px; line-height:1.9;">
                        <li>Drivers modificados o no oficiales</li>
                        <li>DLLs sospechosas</li>
                        <li>Ejecutables del sistema alterados</li>
                    </ul>
                    <div class="tip-box">💡 No es un antivirus, pero es un primer indicador rápido si sospechas que tu sistema ha sido manipulado.</div>
                `
            },
            {
                title: "📈 perfmon /report — Auto-diagnóstico Windows",
                icon: "📈",
                content: `
                    <p>Si abres una consola con permisos de administrador y ejecutas:</p>
                    <p><code>perfmon /report</code></p>
                    <p>Windows recogerá información durante <strong>60 segundos</strong> y luego te mostrará un <strong>informe extenso de diagnóstico</strong> con problemas detectados, recomendaciones, errores en CPU, disco, memoria, red...</p>
                    <p>Es la forma más rápida de tener una "foto" del estado actual del sistema. Muy útil para tickets de soporte: ejecuta el report y pásalo al usuario.</p>
                `
            },
            {
                title: "💽 Rufus — Crear USBs booteables",
                icon: "💽",
                content: `
                    <p><strong>Rufus</strong> es la herramienta más usada para crear USBs booteables a partir de ISOs. Sirve para instalar Windows, Linux, herramientas de rescate, etc.</p>
                    <h4 style="color:var(--azul-oscuro); margin-top:14px;">Esquema de partición — esto importa</h4>
                    <ul style="padding-left:24px; line-height:1.9;">
                        <li><strong>MBR:</strong> Ordenadores o placas antiguas. Si el sistema a instalar tiene las dos arquitecturas (32 y 64 bits) siempre usaremos MBR para evitar errores. Compatibilidad con BIOS y UEFI.</li>
                        <li><strong>GPT:</strong> Nuevos equipos. UEFI por supuesto. Una única arquitectura (64 bits).</li>
                    </ul>
                    <h4 style="color:var(--azul-oscuro); margin-top:14px;">Windows 11 sin TPM 2.0</h4>
                    <p>Si tu equipo no tiene TPM o Secure Boot (lo habitual en PCs antiguos), Rufus mostrará automáticamente una ventana con opciones especiales para Windows 11:</p>
                    <ul style="padding-left:24px; line-height:1.9;">
                        <li>☑️ Remove requirement for 4GB+ RAM</li>
                        <li>☑️ Remove requirement for Secure Boot</li>
                        <li>☑️ Remove requirement for TPM 2.0</li>
                        <li>☐ Remove requirement for Microsoft Account (opcional)</li>
                    </ul>
                    <p>Esto hace que Rufus modifique el instalador para que Windows 11 pueda ejecutarse sin esos requisitos.</p>
                    <div class="info-box">
                        <strong>Opciones de formato típicas:</strong><br>
                        • Sistema de archivos: NTFS<br>
                        • Tamaño del clúster: 4096 bytes (por defecto)<br>
                        • Etiqueta del volumen: algo como "WIN11_USB"
                    </div>
                `
            },
            {
                title: "🎁 Otras herramientas imprescindibles",
                icon: "🎁",
                content: `
                    <div class="new-concept-box">
                        <strong>🛡️ Malwarebytes Free</strong><br>
                        Para limpieza puntual de malware. Complementa al antivirus residente.
                    </div>
                    <div class="new-concept-box">
                        <strong>🦈 Wireshark</strong><br>
                        Analizador de paquetes de red. Si quieres saber EXACTAMENTE qué pasa en la red, este es el rey.
                    </div>
                    <div class="new-concept-box">
                        <strong>📡 Advanced IP Scanner</strong><br>
                        Escanea tu red local y muestra todos los dispositivos conectados con MAC, fabricante, etc.
                    </div>
                    <div class="new-concept-box">
                        <strong>🔍 Process Explorer (Sysinternals)</strong><br>
                        Como el Administrador de tareas pero con esteroides. Microsoft compró Sysinternals porque era muy bueno.
                    </div>
                    <div class="new-concept-box">
                        <strong>🧹 BleachBit / CCleaner</strong><br>
                        Limpieza de archivos temporales, cookies, registro. CCleaner ha tenido polémicas, BleachBit es alternativa abierta.
                    </div>
                    <div class="new-concept-box">
                        <strong>💾 Macrium Reflect / Veeam Agent</strong><br>
                        Para hacer imágenes completas de disco. Si tienes que reinstalar 10 PCs iguales, lo haces una vez y restauras.
                    </div>
                `
            }
        ]
    },

    // ============================================
    // MONITORIZACIÓN WINDOWS
    // ============================================
    monitorizacion: {
        sections: [
            {
                title: "📊 ¿Por qué monitorizar?",
                icon: "📊",
                content: `
                    <p>La monitorización del software es un <strong>proceso fundamental</strong> en la administración de cualquier sistema operativo. Permite observar y analizar el comportamiento del sistema y de las aplicaciones <strong>mientras están en funcionamiento</strong>.</p>
                    <p>El objetivo principal es <strong>detectar problemas antes de que afecten gravemente al rendimiento</strong> o provoquen fallos en el equipo.</p>
                    <div class="highlight-box">
                        <div class="highlight-box-title">🎯 Ventaja clave</div>
                        <p>La monitorización permite intervenir <strong>antes de que el usuario llame</strong>. La diferencia entre un técnico reactivo y uno proactivo.</p>
                    </div>
                `
            },
            {
                title: "⚙️ Uso de CPU",
                icon: "⚙️",
                content: `
                    <p>El procesador es el componente encargado de ejecutar las instrucciones de los programas. Por eso un <strong>uso excesivo o constante al 100%</strong> puede indicar:</p>
                    <ul style="padding-left:24px; line-height:1.9;">
                        <li>Una aplicación está consumiendo demasiados recursos</li>
                        <li>Un proceso no funciona correctamente (bucle infinito)</li>
                        <li>Posible malware (criptomineros, troyanos)</li>
                        <li>Hardware deficiente para la carga (CPU obsoleta)</li>
                    </ul>
                    <p>Mediante la monitorización, el administrador identifica qué proceso causa el problema y lo cierra o investiga.</p>
                    <div class="tip-box">💡 <strong>Truco:</strong> En el Administrador de tareas, ordena por "CPU" descendente. El sospechoso suele estar en lo alto.</div>
                `
            },
            {
                title: "🧠 Uso de memoria RAM",
                icon: "🧠",
                content: `
                    <p>La memoria RAM es el espacio donde se cargan temporalmente los programas en ejecución. Su disponibilidad es <strong>esencial</strong>. Si un programa consume cantidad excesiva, puede provocar:</p>
                    <ul style="padding-left:24px; line-height:1.9;">
                        <li>Sistema lento por uso intensivo del archivo de paginación</li>
                        <li>Imposibilidad de abrir otras aplicaciones</li>
                        <li>Cierre forzado de procesos por parte del SO</li>
                    </ul>
                    <p>Ejemplo clásico: un <strong>navegador con muchas pestañas abiertas</strong> o una aplicación con errores de programación puede consumir progresivamente más memoria (memory leak) hasta afectar al rendimiento general.</p>
                `
            },
            {
                title: "👀 Procesos en ejecución",
                icon: "👀",
                content: `
                    <p>Un <strong>proceso</strong> es una instancia de un programa en funcionamiento. El SO gestiona múltiples procesos simultáneamente. Supervisarlos permite identificar:</p>
                    <ul style="padding-left:24px; line-height:1.9;">
                        <li><strong>Aplicaciones desconocidas:</strong> "¿qué hace este proceso aquí?"</li>
                        <li><strong>Procesos duplicados:</strong> 15 copias de svchost.exe (normal), pero 15 copias de "winupdater_2.exe" no.</li>
                        <li><strong>Software malicioso:</strong> nombres extraños y alto consumo de recursos.</li>
                    </ul>
                    <div class="info-box">📌 Servicios típicos legítimos: svchost.exe, lsass.exe, csrss.exe, dwm.exe. Falsos clásicos: svch0st.exe (cero en lugar de o), system32.exe, rundll64.exe.</div>
                `
            },
            {
                title: "🗒️ Visor de eventos de Windows",
                icon: "🗒️",
                content: `
                    <p>El <strong>Visor de eventos</strong> es una herramienta fundamental de Windows que permite <strong>consultar los registros de actividad del sistema</strong>. Estos registros contienen información detallada sobre el funcionamiento del sistema, las aplicaciones y la seguridad.</p>
                    <h4 style="color:var(--azul-oscuro); margin-top:14px;">Categorías principales</h4>
                    <ul style="padding-left:24px; line-height:1.9;">
                        <li><strong>Registros de Aplicación:</strong> errores y eventos relacionados con programas instalados.</li>
                        <li><strong>Registros de Sistema:</strong> información sobre el funcionamiento del SO (drivers, servicios, hardware).</li>
                        <li><strong>Registros de Seguridad:</strong> eventos relacionados con el acceso al sistema (inicios de sesión, cambios de permisos, intentos fallidos).</li>
                    </ul>
                    <h4 style="color:var(--azul-oscuro); margin-top:14px;">Ejemplo práctico</h4>
                    <p>Si una aplicación se cierra inesperadamente, el visor de eventos registra un error que incluye:</p>
                    <ul style="padding-left:24px; line-height:1.9;">
                        <li>📅 Momento exacto en que ocurrió</li>
                        <li>📛 Programa afectado y su versión</li>
                        <li>🔢 Código de error (ej: 0xc0000005 = access violation)</li>
                        <li>📂 Módulo que falló</li>
                    </ul>
                    <p>Esta información permite identificar la causa raíz. Si un servicio falla o no se inicia correctamente, también se registra, permitiendo su diagnóstico.</p>
                    <div class="tip-box">💡 Cómo abrirlo: <code>Windows + R</code> → escribir <code>eventvwr.msc</code> → Enter</div>
                `
            },
            {
                title: "📋 Administrador de tareas (Ctrl+Shift+Esc)",
                icon: "📋",
                content: `
                    <p>La herramienta más usada del día a día. Pestañas clave:</p>
                    <ul style="padding-left:24px; line-height:1.9;">
                        <li><strong>Procesos:</strong> vista resumida con CPU/RAM/Disco/Red por proceso.</li>
                        <li><strong>Rendimiento:</strong> gráficas en tiempo real de CPU, memoria, disco, red, GPU.</li>
                        <li><strong>Historial de aplicaciones:</strong> qué app ha consumido más recursos las últimas semanas.</li>
                        <li><strong>Inicio:</strong> qué programas arrancan con el equipo. Aquí se deshabilitan los pesados.</li>
                        <li><strong>Usuarios:</strong> sesiones activas y sus recursos.</li>
                        <li><strong>Detalles:</strong> vista técnica con PID, usuario, prioridad...</li>
                        <li><strong>Servicios:</strong> servicios Windows y su estado.</li>
                    </ul>
                `
            },
            {
                title: "📊 Monitor de recursos",
                icon: "📊",
                content: `
                    <p>Versión "extendida" del Administrador de tareas. Se abre desde la pestaña Rendimiento → "Abrir el Monitor de recursos".</p>
                    <p>Te permite ver, por ejemplo:</p>
                    <ul style="padding-left:24px; line-height:1.9;">
                        <li>Qué procesos están escribiendo en disco AHORA y a qué velocidad.</li>
                        <li>Qué procesos están usando la red y a qué IPs externas se conectan.</li>
                        <li>Identificadores asociados, módulos cargados...</li>
                    </ul>
                    <div class="info-box">📌 Si quieres saber "¿qué está atascando mi disco?", el Monitor de recursos > Disco te lo dice.</div>
                `
            },
            {
                title: "🔬 Servicios Windows",
                icon: "🔬",
                content: `
                    <p>Los <strong>servicios</strong> son programas que se ejecutan en segundo plano y proporcionan funciones esenciales (red, seguridad, impresión, etc.). Si un servicio importante se detiene, ciertas funciones del sistema dejarán de estar disponibles.</p>
                    <h4 style="color:var(--azul-oscuro); margin-top:14px;">Cómo gestionarlos</h4>
                    <p><code>Windows + R</code> → <code>services.msc</code> → Enter. O desde el Administrador de tareas, pestaña "Servicios".</p>
                    <h4 style="color:var(--azul-oscuro); margin-top:14px;">Tipos de inicio</h4>
                    <ul style="padding-left:24px; line-height:1.9;">
                        <li><strong>Automático:</strong> arranca con Windows.</li>
                        <li><strong>Automático (inicio retrasado):</strong> arranca poco después del logon. Reduce el tiempo de arranque visible.</li>
                        <li><strong>Manual:</strong> solo si algo lo solicita.</li>
                        <li><strong>Deshabilitado:</strong> bloqueado, no arranca aunque otro servicio lo llame.</li>
                    </ul>
                    <div class="warning-box">⚠️ <strong>Cuidado:</strong> deshabilitar servicios al azar puede romper Windows. Si no sabes para qué sirve, NO lo toques.</div>
                `
            }
        ]
    },

    // ============================================
    // GESTIÓN DE INCIDENCIAS
    // ============================================
    incidencias: {
        sections: [
            {
                title: "🎫 ¿Qué es una incidencia?",
                icon: "🎫",
                content: `
                    <p>En un entorno empresarial, es <strong>inevitable</strong> que se produzcan incidencias relacionadas con el software o el hardware: errores en aplicaciones, fallos del sistema, problemas de configuración, equipos que no encienden, redes caídas, impresoras que no imprimen...</p>
                    <p>La <strong>gestión de incidencias</strong> es el proceso organizado que permite detectar, registrar, analizar y resolver estos problemas <strong>de forma eficiente</strong>.</p>
                    <div class="highlight-box">
                        <div class="highlight-box-title">🎯 ¿Por qué es importante?</div>
                        <p>Garantiza un funcionamiento <strong>estable</strong> del sistema y minimiza el impacto de los fallos en la actividad de la empresa. Una incidencia mal gestionada puede costarle a una empresa miles de euros por hora de parada.</p>
                    </div>
                `
            },
            {
                title: "🔁 El ciclo completo de una incidencia",
                icon: "🔁",
                content: `
                    <p>El proceso sigue estos pasos:</p>
                    <ol style="padding-left:24px; line-height:2;">
                        <li><strong>📌 Detección y Registro:</strong> un usuario detecta un problema y lo comunica al departamento técnico, normalmente mediante <strong>sistema de tickets</strong> o plataforma de soporte.</li>
                        <li><strong>🏷️ Clasificación y priorización:</strong> se asigna gravedad, categoría y prioridad. ¿Es un usuario o son 200? ¿Es crítico o cosmético?</li>
                        <li><strong>🔍 Investigación y diagnóstico:</strong> el personal técnico analiza el problema, identifica la causa. Revisa configuraciones, comprueba el estado del sistema, consulta registros de eventos.</li>
                        <li><strong>🆙 Escalado y asignación:</strong> si el técnico de primera línea no puede resolverlo, se escala a un nivel superior (N2, N3).</li>
                        <li><strong>🔧 Resolución y seguimiento:</strong> aplicación de la solución (actualizar software, reinstalar app, modificar config, eliminar malware...).</li>
                        <li><strong>✅ Cierre del incidente:</strong> verificación de que el problema está resuelto y <strong>documentación de la solución</strong>.</li>
                    </ol>
                    <div class="tip-box">💡 La documentación es CLAVE: permite resolver incidencias similares mucho más rápido en el futuro.</div>
                `
            },
            {
                title: "📊 Niveles de soporte (Tier model)",
                icon: "📊",
                content: `
                    <p>Las empresas suelen organizar el soporte en <strong>niveles</strong>:</p>
                    <table class="data-table">
                        <thead><tr><th>Nivel</th><th>Quién es</th><th>Qué resuelve</th></tr></thead>
                        <tbody>
                            <tr><td><strong>N1 - Helpdesk</strong></td><td>Técnicos de primera línea</td><td>Reiniciar PC, reseteo contraseña, instalación básica, guion de soporte.</td></tr>
                            <tr><td><strong>N2 - Soporte</strong></td><td>Técnicos especializados</td><td>Problemas más complejos: configuración avanzada, análisis logs, hardware.</td></tr>
                            <tr><td><strong>N3 - Expertos</strong></td><td>Ingenieros / arquitectos</td><td>Problemas raros, customizaciones, troubleshooting profundo.</td></tr>
                            <tr><td><strong>N4 - Vendor</strong></td><td>Fabricante (Microsoft, Cisco...)</td><td>Bugs del producto, cambios en código fuente.</td></tr>
                        </tbody>
                    </table>
                    <p>Una incidencia bien gestionada <strong>no salta de nivel sin razón</strong>: si N1 puede arreglarlo (90% de casos), no escala.</p>
                `
            },
            {
                title: "⏱️ SLA — Acuerdos de Nivel de Servicio",
                icon: "⏱️",
                content: `
                    <p>El <strong>SLA (Service Level Agreement)</strong> es el contrato que define cuánto puede tardar un proveedor en resolver una incidencia <strong>según su prioridad</strong>.</p>
                    <p>Ejemplo típico:</p>
                    <ul style="padding-left:24px; line-height:1.9;">
                        <li><strong>P1 (Crítica):</strong> servidor caído, toda la empresa parada. Tiempo de respuesta: 15 min. Resolución: 4 horas.</li>
                        <li><strong>P2 (Alta):</strong> un departamento sin servicio. Respuesta: 1 h. Resolución: 8 h.</li>
                        <li><strong>P3 (Media):</strong> un usuario afectado, hay workaround. Respuesta: 4 h. Resolución: 2 días.</li>
                        <li><strong>P4 (Baja):</strong> consulta, mejora. Respuesta: 1 día. Resolución: 5 días laborables.</li>
                    </ul>
                    <div class="warning-box">⚠️ Incumplir el SLA puede tener penalizaciones económicas. Por eso las empresas miden las incidencias muy seriamente.</div>
                `
            },
            {
                title: "🛠️ Herramientas de ticketing",
                icon: "🛠️",
                content: `
                    <p>Las más usadas en empresas:</p>
                    <div class="new-concept-box">
                        <strong>🎫 Jira Service Management</strong><br>
                        De Atlassian. Muy potente, integrado con desarrollo (Jira Software). Estándar en muchas tech companies.
                    </div>
                    <div class="new-concept-box">
                        <strong>🌐 ServiceNow</strong><br>
                        Líder de mercado para grandes empresas. Caro pero brutal.
                    </div>
                    <div class="new-concept-box">
                        <strong>🆓 GLPI</strong><br>
                        Open source, gratuito. Ideal para pymes y administraciones públicas.
                    </div>
                    <div class="new-concept-box">
                        <strong>🎫 Zendesk</strong><br>
                        Más orientado a soporte de clientes externos que interno.
                    </div>
                    <div class="new-concept-box">
                        <strong>📋 Freshdesk / Freshservice</strong><br>
                        Alternativas modernas y accesibles para pymes.
                    </div>
                `
            },
            {
                title: "📝 Cómo redactar un buen ticket",
                icon: "📝",
                content: `
                    <p>Tanto si eres usuario reportando como técnico documentando, un buen ticket incluye:</p>
                    <ol style="padding-left:24px; line-height:1.9;">
                        <li><strong>Asunto claro:</strong> "Outlook no envía correos desde esta mañana" (no "no me funciona el correo").</li>
                        <li><strong>Descripción detallada:</strong> qué pasa, qué intentaste hacer, qué error sale exactamente.</li>
                        <li><strong>Pasos para reproducir:</strong> 1) Abro Outlook. 2) Compongo correo. 3) Doy a Enviar. 4) Aparece error X.</li>
                        <li><strong>Comportamiento esperado vs real:</strong> "Esperaba que se enviara, en su lugar aparece...".</li>
                        <li><strong>Capturas de pantalla:</strong> del error tal cual.</li>
                        <li><strong>Información del sistema:</strong> versión de Windows, Outlook, equipo, usuario, ubicación.</li>
                        <li><strong>Urgencia:</strong> ¿afecta a tu trabajo? ¿hay workaround?</li>
                    </ol>
                    <div class="info-box">📌 Un buen técnico ahorra horas leyendo un ticket bien escrito.</div>
                `
            }
        ]
    },

    // ============================================
    // WINDOWS SERVER Y VIRTUAL BOX
    // ============================================
    "windows-server": {
        sections: [
            {
                title: "🖧 ¿Qué es Windows Server?",
                icon: "🖧",
                content: `
                    <p><strong>Windows Server</strong> es la versión de Windows diseñada para hacer funcionar <strong>servicios de red empresariales</strong>: controlador de dominio, DNS, DHCP, servidor de archivos, IIS (web), Hyper-V (virtualización), Active Directory...</p>
                    <p>No es para que un usuario use Word. Es para que <strong>otros equipos lo usen</strong>.</p>
                    <div class="highlight-box">
                        <div class="highlight-box-title">🎯 Roles típicos</div>
                        <p><strong>AD DS</strong> (Active Directory Domain Services), <strong>DNS</strong>, <strong>DHCP</strong>, <strong>File Server</strong>, <strong>Print Server</strong>, <strong>Hyper-V</strong>, <strong>IIS</strong>, <strong>Remote Desktop Services</strong>, <strong>Failover Clustering</strong>.</p>
                    </div>
                `
            },
            {
                title: "💿 Instalación en VirtualBox paso a paso",
                icon: "💿",
                content: `
                    <p>La instalación de Windows Server en una <strong>máquina virtual mediante Oracle VM VirtualBox</strong> permite simular un servidor real dentro de un ordenador, facilitando el aprendizaje y configuración <strong>sin necesidad de hardware adicional</strong>.</p>
                    <ol style="padding-left:24px; line-height:2;">
                        <li><strong>Crear la máquina virtual.</strong> Abrir VirtualBox y pulsar en "Nueva". Nombre para la máquina, tipo "Windows" y elegir la versión de Windows Server.</li>
                        <li><strong>Asignar la memoria RAM.</strong> Mínimo 2 GB, recomendable 4 GB para un mejor rendimiento.</li>
                        <li><strong>Crear el disco duro virtual.</strong> Nuevo disco en formato VDI, almacenamiento dinámico, mínimo 50 GB. Aquí se instalará el SO.</li>
                        <li><strong>Montar el archivo ISO de Windows Server.</strong> Configuración de la máquina → Almacenamiento → seleccionar la ISO en la unidad óptica virtual.</li>
                        <li><strong>Iniciar la máquina virtual.</strong> Arrancar. El sistema comienza la instalación. Seleccionar idioma, formato regional y tipo de teclado.</li>
                        <li><strong>Seleccionar el tipo de instalación.</strong> Elegir la versión deseada, preferiblemente con <strong>entorno gráfico (Desktop Experience)</strong> para facilitar su uso.</li>
                        <li><strong>Configurar la contraseña del administrador.</strong> Establecer una contraseña segura para la cuenta principal del sistema (la cuenta Administrator).</li>
                        <li><strong>Instalar las Guest Additions.</strong> Una vez iniciado el sistema, instalarlas desde el menú de VirtualBox para mejorar rendimiento, resolución de pantalla y integración con el equipo host.</li>
                    </ol>
                `
            },
            {
                title: "🌳 Active Directory — el cerebro corporativo",
                icon: "🌳",
                content: `
                    <p><strong>Active Directory (AD)</strong> es un servicio de directorio que centraliza la gestión de usuarios, equipos, permisos y políticas en una red empresarial.</p>
                    <h4 style="color:var(--azul-oscuro); margin-top:14px;">Conceptos clave</h4>
                    <ul style="padding-left:24px; line-height:1.9;">
                        <li><strong>Dominio:</strong> unidad administrativa lógica (ej: <code>empresa.local</code>).</li>
                        <li><strong>Bosque:</strong> agrupación de uno o más dominios.</li>
                        <li><strong>Unidad organizativa (OU):</strong> contenedor dentro del dominio para organizar usuarios/equipos.</li>
                        <li><strong>GPO (Group Policy Object):</strong> políticas que se aplican a usuarios/equipos automáticamente (ej: configurar el escritorio, bloquear USB, forzar contraseña).</li>
                        <li><strong>DC (Domain Controller):</strong> el servidor Windows Server que tiene el rol AD DS. Es el guardián del dominio.</li>
                    </ul>
                    <div class="info-box">📌 Si tu PC es del dominio <code>empresa.local</code>, al iniciar sesión NO usas una cuenta local: usas tu cuenta de dominio, y el DC valida tu contraseña.</div>
                `
            },
            {
                title: "🌐 DHCP y DNS en Windows Server",
                icon: "🌐",
                content: `
                    <p>Dos roles muy frecuentes en cualquier Windows Server:</p>
                    <h4 style="color:var(--azul-oscuro); margin-top:14px;">DHCP Server</h4>
                    <p>Asigna IPs automáticamente a los equipos cliente. Configuras:</p>
                    <ul style="padding-left:24px; line-height:1.9;">
                        <li><strong>Ámbito (scope):</strong> rango de IPs que reparte (ej: 192.168.1.100 - 192.168.1.200).</li>
                        <li><strong>Reservas:</strong> IPs fijas para impresoras, servidores, etc., ligadas a su MAC.</li>
                        <li><strong>Opciones:</strong> gateway, DNS, dominio que se entregan junto con la IP.</li>
                        <li><strong>Duración del lease:</strong> cuánto tiempo es válida la IP asignada antes de renovar (típico: 8 días).</li>
                    </ul>
                    <h4 style="color:var(--azul-oscuro); margin-top:14px;">DNS Server</h4>
                    <p>Traduce nombres a IPs. En un entorno empresarial, este DNS local es el que sabe:</p>
                    <ul style="padding-left:24px; line-height:1.9;">
                        <li>Las IPs de servidores internos (servidor-archivos, intranet...).</li>
                        <li>Reenvía consultas externas a DNS públicos (Google, Cloudflare).</li>
                        <li>Almacena registros para resolución inversa (IP → nombre).</li>
                    </ul>
                `
            },
            {
                title: "🐧 Alternativas en Linux",
                icon: "🐧",
                content: `
                    <p>Windows Server no es la única opción. Mucho del mundo corporativo corre en Linux:</p>
                    <ul style="padding-left:24px; line-height:1.9;">
                        <li><strong>Samba + OpenLDAP:</strong> alternativa a Active Directory.</li>
                        <li><strong>isc-dhcp / Kea:</strong> servidores DHCP.</li>
                        <li><strong>BIND9 / Unbound:</strong> servidores DNS.</li>
                        <li><strong>nginx / Apache:</strong> servidores web (equivalente a IIS).</li>
                        <li><strong>Postfix / Dovecot:</strong> correo (equivalente a Exchange).</li>
                    </ul>
                    <p>Muchas pymes y administraciones públicas usan <strong>combinaciones</strong>: Active Directory para usuarios + servidores Linux para servicios.</p>
                `
            }
        ]
    }
};

// ============================================
// TEORÍA COMPLETA DE SUBNETTING (apuntes de Igor paso a paso)
// ============================================
const SUBNETTING_THEORY = {
    intro: `
        <h2 style="color:var(--azul-oscuro); margin-bottom:14px;">🧮 ¿Por qué hacer subnetting?</h2>
        <p>El <strong>subnetting</strong> es el proceso de dividir una red grande en redes más pequeñas. ¿Por qué hacerlo?</p>
        <ul style="padding-left:24px; line-height:1.9;">
            <li><strong>🔐 Seguridad:</strong> aislar departamentos. Que RRHH no vea el tráfico de Contabilidad.</li>
            <li><strong>⚡ Rendimiento:</strong> menos broadcast en cada subred = menos saturación.</li>
            <li><strong>🎯 Organización:</strong> agrupar lógicamente equipos del mismo área.</li>
            <li><strong>📊 Control:</strong> aplicar reglas distintas por subred (firewall, QoS, ACLs).</li>
            <li><strong>💰 Eficiencia:</strong> no desperdiciar direcciones IP cuando solo necesitas 30.</li>
        </ul>
        <div class="highlight-box">
            <div class="highlight-box-title">🎯 La pregunta clave</div>
            <p>Cuando alguien te diga "tengo la red X y necesito Y subredes", tu trabajo es <strong>calcular el nuevo prefijo, la nueva máscara, el incremento y los rangos de cada subred</strong>.</p>
        </div>
    `,

    fundamentals: `
        <h2 style="color:var(--azul-oscuro);">📚 Fundamentos previos imprescindibles</h2>

        <h3 style="color:var(--azul-medio); margin-top:18px;">1. La IP es un número de 32 bits</h3>
        <p>Sabemos que la IP es un conjunto de <strong>32 bits</strong> separados o representados en cuatro bloques de 8 bits. Por lo tanto:</p>
        <div class="code-block" style="background:var(--celeste); padding:12px; border-radius:10px; font-family:'Courier New', monospace; margin:12px 0;">
            192.172.81.2 = 11000000.10101100.01010001.00000010<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;8 bits . 8 bits . 8 bits . 8 bits = <strong>32 bits</strong>
        </div>

        <h3 style="color:var(--azul-medio); margin-top:18px;">2. La máscara también son 32 bits</h3>
        <p>Pasa lo mismo con la máscara de subred:</p>
        <div class="code-block" style="background:var(--celeste); padding:12px; border-radius:10px; font-family:'Courier New', monospace; margin:12px 0;">
            255.255.255.0 = 11111111.11111111.11111111.00000000<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;8 bits . 8 bits . 8 bits . 8 bits = <strong>32 bits</strong>
        </div>

        <h3 style="color:var(--azul-medio); margin-top:18px;">3. Parte de red vs parte de host</h3>
        <p>La parte limitada por los bloques de 255 (hasta donde lleguen) será la <strong>parte fija o de red</strong>, mientras que la de 0 es la que variará indicando cuántas direcciones podremos tener (<strong>parte de host</strong>).</p>

        <h3 style="color:var(--azul-medio); margin-top:18px;">4. Prefijo de red</h3>
        <p>El prefijo de la red define cuántos bits componen el número de red. Es otra forma de representar la máscara y nos dice cuántos octetos están fijos. Relación entre tipo y prefijo:</p>
        <table class="data-table">
            <thead><tr><th>Tipo</th><th>Máscara</th><th>Prefijo</th><th>Hosts útiles</th></tr></thead>
            <tbody>
                <tr><td>Tipo A</td><td>255.0.0.0</td><td>/8</td><td>16.777.214</td></tr>
                <tr><td>Tipo B</td><td>255.255.0.0</td><td>/16</td><td>65.534</td></tr>
                <tr><td>Tipo C</td><td>255.255.255.0</td><td>/24</td><td>254</td></tr>
            </tbody>
        </table>

        <h3 style="color:var(--azul-medio); margin-top:18px;">5. Rangos de IPs y clases</h3>
        <table class="data-table">
            <thead><tr><th>Clase</th><th>Rango</th><th>Para qué</th></tr></thead>
            <tbody>
                <tr><td><strong>A</strong></td><td>0.0.0.0 – 127.255.255.255</td><td>Redes gigantescas (operadores).</td></tr>
                <tr><td><strong>B</strong></td><td>128.0.0.0 – 191.255.255.255</td><td>Universidades, instituciones medianas.</td></tr>
                <tr><td><strong>C</strong></td><td>192.0.0.0 – 223.255.255.255</td><td>Redes domésticas y de pyme.</td></tr>
            </tbody>
        </table>
        <p>Para saber la clase, nos fijamos en el <strong>primer octeto</strong>.</p>

        <h3 style="color:var(--azul-medio); margin-top:18px;">6. La dirección de red</h3>
        <p>La <strong>dirección de red</strong> es la manera de referirnos a una red por defecto. Es el punto de partida para los rangos de subred. Siempre acabará en 0 tomando los bits reservados para el host. Ejemplos:</p>
        <table class="data-table">
            <thead><tr><th>IP</th><th>Clase</th><th>Máscara</th><th>Dirección de red</th></tr></thead>
            <tbody>
                <tr><td>197.150.10.14</td><td>C</td><td>255.255.255.0</td><td><strong>197.150.10.0</strong></td></tr>
                <tr><td>120.50.10.6</td><td>A</td><td>255.0.0.0</td><td><strong>120.0.0.0</strong></td></tr>
                <tr><td>135.9.101.2</td><td>B</td><td>255.255.0.0</td><td><strong>135.9.0.0</strong></td></tr>
                <tr><td>201.215.32.11</td><td>C</td><td>255.255.255.0</td><td><strong>201.215.32.0</strong></td></tr>
                <tr><td>127.92.101.5</td><td>A</td><td>255.0.0.0</td><td><strong>127.0.0.0</strong></td></tr>
            </tbody>
        </table>

        <h3 style="color:var(--azul-medio); margin-top:18px;">7. Potencias de 2: tu mejor amiga</h3>
        <p>Es indispensable pensar en potencias de 2. Esto va a ser significativo a la hora de saber cuántas subredes podemos obtener.</p>
        <div class="info-box">
            <strong>Ejemplo:</strong> ¿Nos piden 10 subredes?<br>
            • 2³ = 8 → menor que 10 (no sirve)<br>
            • 2⁴ = 16 → mayor que 10 (¡nos sirve!)
        </div>
        <p>En resumen, la potencia de 2 nos va a decir si podemos tener un número determinado o superior de redes. Es indispensable recordar <strong>el exponente</strong> porque nos va a decir los <strong>bits prestados</strong> que vamos a tomar de la máscara.</p>

        <h3 style="color:var(--azul-medio); margin-top:18px;">8. Hosts disponibles</h3>
        <p>¿Cómo puedo saber el número de hosts disponibles de una dirección? Ejemplo: 101.135.21.62 /20</p>
        <ol style="padding-left:24px; line-height:1.9;">
            <li>2 elevado a (32 - prefijo): 2^(32-20) = 2^12 = 4096</li>
            <li>Restamos 2 (broadcast y red): 4096 - 2 = <strong>4094 hosts</strong></li>
        </ol>

        <table class="data-table" style="margin-top:18px;">
            <thead><tr><th>Posición (der → izq)</th><th>Valor</th></tr></thead>
            <tbody>
                <tr><td>1ª</td><td>1</td></tr>
                <tr><td>2ª</td><td>2</td></tr>
                <tr><td>3ª</td><td>4</td></tr>
                <tr><td>4ª</td><td>8</td></tr>
                <tr><td>5ª</td><td>16</td></tr>
                <tr><td>6ª</td><td>32</td></tr>
                <tr><td>7ª</td><td>64</td></tr>
                <tr><td>8ª</td><td>128</td></tr>
            </tbody>
        </table>
    `,

    caso_practico_1: `
        <h2 style="color:var(--azul-oscuro);">📝 Caso práctico 1: 5 subredes desde 192.178.45.6</h2>
        <p>Vamos a abordar nuestro primer caso práctico (extraído directamente de los apuntes originales) con estos datos:</p>
        <div class="highlight-box">
            <strong>📌 Datos:</strong> IP: 192.178.45.6 — Necesitamos: 5 subredes
        </div>

        <h3 style="color:var(--azul-medio); margin-top:18px;">PASO 1: Sacar clase, máscara, prefijo, bits fijos y de host</h3>
        <table class="data-table">
            <tbody>
                <tr><td><strong>Clase</strong></td><td>C (192 está entre 192-223)</td></tr>
                <tr><td><strong>Máscara</strong></td><td>255.255.255.0</td></tr>
                <tr><td><strong>Prefijo</strong></td><td>/24</td></tr>
                <tr><td><strong>Bits fijos</strong></td><td>24</td></tr>
                <tr><td><strong>Bits de host</strong></td><td>8</td></tr>
            </tbody>
        </table>

        <h3 style="color:var(--azul-medio); margin-top:18px;">PASO 2: Potencias de 2 para 5 subredes</h3>
        <table class="data-table">
            <thead><tr><th>Potencia</th><th>Resultado</th><th>¿Sirve?</th></tr></thead>
            <tbody>
                <tr><td>2¹</td><td>2</td><td>❌ NO (menor que 5)</td></tr>
                <tr><td>2²</td><td>4</td><td>❌ NO (menor que 5)</td></tr>
                <tr><td><strong>2³</strong></td><td><strong>8</strong></td><td>✅ <strong>SÍ SIRVE</strong></td></tr>
            </tbody>
        </table>
        <p><strong>Recordamos:</strong> exponente = <strong>3</strong>, resultado = <strong>8</strong>.</p>

        <h3 style="color:var(--azul-medio); margin-top:18px;">PASO 3: Bits prestados a la máscara</h3>
        <p>El 3 determina los bits que debemos tomar prestados. Los añadimos a la máscara <strong>por la IZQUIERDA</strong> del octeto que corresponda:</p>
        <div class="code-block" style="background:var(--celeste); padding:12px; border-radius:10px; font-family:'Courier New', monospace; margin:12px 0;">
            Antes: 11111111.11111111.11111111.<span style="color:#E67E22;">00000000</span> = 255.255.255.0<br>
            Después: 11111111.11111111.11111111.<span style="color:#2874A6; font-weight:800;">111</span><span style="color:#E67E22;">00000</span> = <strong>255.255.255.224</strong>
        </div>
        <p>Nueva máscara: <strong>255.255.255.224</strong> → prefijo <strong>/27</strong></p>

        <h3 style="color:var(--azul-medio); margin-top:18px;">PASO 4: Calcular el incremento</h3>
        <p>De un octeto podemos obtener <strong>256 direcciones</strong>. Dividimos 256 entre el resultado de la potencia del paso 2:</p>
        <div class="highlight-box">
            <strong>256 / 8 = 32</strong> → El incremento es de <strong>32</strong> direcciones por subred.
        </div>
        <p>Alternativa: 256 - 224 (último octeto de la máscara) = 32. Mismo resultado.</p>

        <h3 style="color:var(--azul-medio); margin-top:18px;">PASO 5: Generar las subredes (con red y broadcast)</h3>
        <table class="data-table">
            <thead><tr><th>Subred</th><th>Red</th><th>Rango útil</th><th>Broadcast</th><th>Gateway sugerido</th></tr></thead>
            <tbody>
                <tr><td><strong>1</strong></td><td>192.178.45.0/27</td><td>192.178.45.1 – 192.178.45.30</td><td>192.178.45.31</td><td>192.178.45.1</td></tr>
                <tr><td><strong>2</strong></td><td>192.178.45.32/27</td><td>192.178.45.33 – 192.178.45.62</td><td>192.178.45.63</td><td>192.178.45.33</td></tr>
                <tr><td><strong>3</strong></td><td>192.178.45.64/27</td><td>192.178.45.65 – 192.178.45.94</td><td>192.178.45.95</td><td>192.178.45.65</td></tr>
                <tr><td><strong>4</strong></td><td>192.178.45.96/27</td><td>192.178.45.97 – 192.178.45.126</td><td>192.178.45.127</td><td>192.178.45.97</td></tr>
                <tr><td><strong>5</strong></td><td>192.178.45.128/27</td><td>192.178.45.129 – 192.178.45.158</td><td>192.178.45.159</td><td>192.178.45.129</td></tr>
            </tbody>
        </table>
        <p>Y nos sobran <strong>3 subredes más</strong> (160-191, 192-223, 224-255) para futuras necesidades.</p>

        <h3 style="color:var(--azul-medio); margin-top:18px;">PASO 6: Hosts útiles por subred</h3>
        <p>2^(32 - 27) - 2 = 2⁵ - 2 = 32 - 2 = <strong>30 hosts útiles</strong> por subred.</p>
    `,

    rewind: `
        <h2 style="color:var(--azul-oscuro);">🔁 El enfoque inverso (cálculo "rewind")</h2>
        <p>Ahora imagina el caso al revés: nos dan ya los <strong>bits prestados</strong> (por ejemplo 3 al último octeto, es decir, /27). Tenemos la IP <strong>192.178.45.8/27</strong>. ¿Cómo sabemos el intervalo de cada subred?</p>

        <h3 style="color:var(--azul-medio); margin-top:18px;">PASO 1: Identificar octeto variable y su máscara</h3>
        <p>El octeto variable en este caso es el último. Transformamos a decimal los bits del último octeto:</p>
        <div class="code-block" style="background:var(--celeste); padding:12px; border-radius:10px; font-family:'Courier New', monospace; margin:12px 0;">
            <strong>11100000</strong> = 128 + 64 + 32 = <strong>224</strong>
        </div>
        <p>Máscara completa: <strong>255.255.255.224</strong></p>

        <h3 style="color:var(--azul-medio); margin-top:18px;">PASO 2: Calcular el incremento</h3>
        <div class="highlight-box">
            <strong>256 - 224 = 32</strong> → tendríamos <strong>1 subred por cada 32 direcciones</strong>.
        </div>

        <h3 style="color:var(--azul-medio); margin-top:18px;">PASO 3: Hosts útiles por subred</h3>
        <p>32 - 27 = 5 bits de host. 2⁵ = 32 direcciones totales. 32 - 2 = <strong>30 hosts útiles</strong>.</p>

        <h3 style="color:var(--azul-medio); margin-top:18px;">PASO 4: Listar los intervalos</h3>
        <ul style="padding-left:24px; line-height:1.9;">
            <li>192.178.45.0 – 192.178.45.31</li>
            <li>192.178.45.32 – 192.178.45.63</li>
            <li>192.178.45.64 – 192.178.45.95</li>
            <li>192.178.45.96 – 192.178.45.127</li>
            <li>192.178.45.128 – 192.178.45.159</li>
            <li>... (hasta llegar a 255)</li>
        </ul>

        <h3 style="color:var(--azul-medio); margin-top:18px;">PASO 5: ¿A qué rango pertenece 192.178.45.68?</h3>
        <p>Si queremos saber a qué rango pertenece una IP, hacemos:</p>
        <ol style="padding-left:24px; line-height:1.9;">
            <li>Dividimos el valor del octeto variable entre el incremento: <strong>68 / 32 = 2</strong> (con resto).</li>
            <li>Tomamos el cociente (2) y lo multiplicamos por el incremento: <strong>2 × 32 = 64</strong>.</li>
            <li>Dirección de red: <strong>192.178.45.64/27</strong>. ¡Encontrada!</li>
        </ol>

        <div class="warning-box">
            <strong>Consejos:</strong>
            <ul style="margin-top:8px; padding-left:24px; line-height:1.7;">
                <li>En el octeto donde calculamos la subred, este SIEMPRE empezará en 0.</li>
                <li>Cuando un incremento supere 255, hay que sumar 1 al octeto anterior.<br>Ejemplo: 10.20.192.0/18 + 64 = 10.21.0.0 (sumamos +64 a 192 e incrementa el segundo).</li>
                <li>Para 10.255.192.0/18, se ve comprometido el tercero, el segundo (255) y el primero (10). 10.255.192.0 + 64 = 11.0.0.0.</li>
            </ul>
        </div>
    `,

    resumen: `
        <h2 style="color:var(--azul-oscuro);">📋 Resumen del procedimiento (los 10 pasos de Igor)</h2>
        <p>Esto es lo que tienes que memorizar. Si lo dominas, eres imparable.</p>
        <ol style="padding-left:24px; line-height:2;">
            <li>Nos dan una IP y un número de subredes. Ejemplo: 192.168.10.160 y 4 subredes.</li>
            <li>Obtenemos la <strong>máscara</strong>: 255.255.255.0 tipo C, es decir, /24. 24 bits fijos y 8 variables.</li>
            <li><strong>Potencia de 2</strong> para saber si llego a las subredes que me piden (4) y conocer los bits prestados: 2¹=2 (NO). 2²=4 (SÍ).</li>
            <li>Almacenamos <strong>exponente y resultado</strong>: 2 y 4.</li>
            <li><strong>Bits prestados:</strong> 24 + 2 = <strong>26</strong>. Nueva máscara /26 (255.255.255.192).</li>
            <li>Sabemos que la primera dirección de red es 192.168.10.0 y necesitamos conocer el <strong>incremento</strong>.</li>
            <li>De un octeto podemos sacar <strong>256 redes</strong> (contando la 0).</li>
            <li>Dividimos <strong>256 / 4 = 64</strong>. El incremento es 64.</li>
            <li>Sacamos los <strong>rangos</strong> de las 4 subredes (cada 64). Reservamos red, broadcast y gateway en cada una.</li>
            <li><strong>Hosts útiles:</strong> 2^(32-26) = 2⁶ = 64 - 2 = <strong>62 direcciones disponibles</strong> por intervalo.</li>
        </ol>

        <h3 style="color:var(--azul-medio); margin-top:18px;">Tabla completa de las 4 subredes:</h3>
        <table class="data-table">
            <thead><tr><th>Subred</th><th>Red</th><th>Rango útil</th><th>Broadcast</th></tr></thead>
            <tbody>
                <tr><td>1</td><td>192.168.10.0/26</td><td>.1 – .62</td><td>192.168.10.63</td></tr>
                <tr><td>2</td><td>192.168.10.64/26</td><td>.65 – .126</td><td>192.168.10.127</td></tr>
                <tr><td>3</td><td>192.168.10.128/26</td><td>.129 – .190</td><td>192.168.10.191</td></tr>
                <tr><td>4</td><td>192.168.10.192/26</td><td>.193 – .254</td><td>192.168.10.255</td></tr>
            </tbody>
        </table>
    `,

    nat_resumen: `
        <h2 style="color:var(--azul-oscuro);">🎭 Conversación entre borrachos (NAT explicado por Igor)</h2>
        <div class="curiosity-box" style="font-style:italic;">
            <p>"Que sí Wenceslao, como te lo cuento, cucha. Tú tienes una dirección propia, una pa-ti, porque te lo mereses. Tú dentro de una red doméstica, tienes tu dirección fija asignada, tuya privada. Probablemente hayas configurado los DNS porque eres mu tuyo. ¿Los de Google? Pos mismamente capitán.</p>
            <p>Desde tu dirección privada fija quieres irte a ver lo tuyo al MARCA o donde sea. Ojo titán, no te me vayas a meter en páginas de dudosa talante ya que estarán bloqueadas por su DNS.</p>
            <p>Cucha, una vez que ya hayas lanzado la solicitud, el <strong>router se encargará de leer tu IP privada, enmascararla, almacenar la solicitud con tu número privado y todo, y al final, mandarla a donde sea bajo una IP pública</strong>. Pública como tu padre Wenceslao, que la saludan todos en el barrio.</p>
            <p>Cucha, cuando ya has mandado la solisitus y tienes tu IP pública, lo siguiente que pasará será que <strong>se buscará el nombre de MARCA en el servidor DNS</strong> de turno para sacar su dirección IP pública fija. Se mandará tu solisitus a esa IP y se te devolverá a tu router bajo tu IP pública. Eto es el NAT macho, el intercambio de paquetes vía IP públicas y privadas.</p>
            <p>Calla coño que no he acabado. Pos último el router tiene <strong>memorisado quién ha mandado la solicitud</strong> por lo que sabrá que de tu pública, se transformará como en Ramón que ahora es Jessica, saldrá tu privada y te llegará a ti y no a otro miembro de la red."</p>
        </div>
        <p style="margin-top:14px;">Genial explicación que viene en tus apuntes, Igor. NAT es exactamente eso: un router que <strong>traduce</strong> entre las direcciones IP privadas internas y la IP pública externa, manteniendo una tabla de "¿quién pidió qué?" para devolver las respuestas a quien corresponde.</p>
    `
};

// ============================================
// EJERCICIOS DE SUBNETTING CON SOLUCIÓN COMPLETA
// ============================================
const SUBNETTING_EXERCISES = [
    {
        id: "sub-ex-1",
        difficulty: "fácil",
        question: "Tienes la red <strong>192.168.1.0/24</strong>. Necesitas <strong>2 subredes</strong>. ¿Qué prefijo nuevo necesitas?",
        answer: "/25",
        steps: [
            "Para 2 subredes necesitamos 2¹ = 2 bits prestados. Solo basta con <strong>1 bit</strong>.",
            "Nuevo prefijo: 24 + 1 = <strong>/25</strong>",
            "Nueva máscara: 255.255.255.128",
            "Subredes resultantes:<br>• 192.168.1.0/25 (.1 - .126, broadcast .127)<br>• 192.168.1.128/25 (.129 - .254, broadcast .255)",
            "Hosts útiles: 2⁷ - 2 = <strong>126</strong> por subred."
        ]
    },
    {
        id: "sub-ex-2",
        difficulty: "fácil",
        question: "Tienes la red <strong>192.168.10.0/24</strong>. Necesitas <strong>4 subredes</strong>. Calcula todo.",
        answer: "/26, máscara 255.255.255.192, incremento 64, 62 hosts útiles",
        steps: [
            "Potencias: 2¹=2 NO, 2²=4 SÍ. Exponente = 2 (bits prestados).",
            "Nuevo prefijo: 24 + 2 = <strong>/26</strong>",
            "Nueva máscara: 255.255.255.192",
            "Incremento: 256 / 4 = <strong>64</strong>",
            "Subredes: 192.168.10.0/26, .64/26, .128/26, .192/26",
            "Hosts útiles: 2⁶ - 2 = <strong>62</strong> por subred."
        ]
    },
    {
        id: "sub-ex-3",
        difficulty: "medio",
        question: "Tienes <strong>192.168.20.0/24</strong>. Necesitas <strong>5 subredes</strong>. Calcula todo.",
        answer: "/27, máscara 255.255.255.224, incremento 32, 30 hosts útiles",
        steps: [
            "Potencias: 2²=4 NO, 2³=8 SÍ (cubre las 5 que necesitamos). Exponente = 3.",
            "Nuevo prefijo: 24 + 3 = <strong>/27</strong>",
            "Nueva máscara: 255.255.255.224 (11100000 en el último octeto)",
            "Incremento: 256 / 8 = <strong>32</strong>",
            "Hosts útiles: 2⁵ - 2 = <strong>30</strong>",
            "Subredes generadas (8 totales, usaríamos las 5 primeras):<br>• .0/27 → .31<br>• .32/27 → .63<br>• .64/27 → .95<br>• .96/27 → .127<br>• .128/27 → .159"
        ]
    },
    {
        id: "sub-ex-4",
        difficulty: "medio",
        question: "Tienes <strong>10.0.0.0/8</strong>. Necesitas dividir en <strong>16 subredes</strong>.",
        answer: "/12, máscara 255.240.0.0",
        steps: [
            "Potencias: 2⁴ = 16. Exponente = 4 bits prestados.",
            "Nuevo prefijo: 8 + 4 = <strong>/12</strong>",
            "Nueva máscara: 255.240.0.0 (11110000 en segundo octeto)",
            "Incremento en el SEGUNDO octeto: 256 / 16 = <strong>16</strong>",
            "Subredes: 10.0.0.0/12, 10.16.0.0/12, 10.32.0.0/12, 10.48.0.0/12... hasta 10.240.0.0/12",
            "Hosts útiles por subred: 2²⁰ - 2 = <strong>1.048.574</strong> (¡una millonada!)"
        ]
    },
    {
        id: "sub-ex-5",
        difficulty: "medio",
        question: "Tengo la red <strong>192.178.45.0/27</strong>. ¿A qué subred pertenece la IP <strong>192.178.45.68</strong>?",
        answer: "192.178.45.64/27",
        steps: [
            "Incremento de /27: 256 - 224 = <strong>32</strong>",
            "Tomamos el último octeto de la IP: 68",
            "Dividimos: 68 / 32 = <strong>2</strong> (cociente, ignoramos el resto)",
            "Multiplicamos cociente × incremento: 2 × 32 = <strong>64</strong>",
            "Dirección de red: <strong>192.178.45.64/27</strong>",
            "Rango: 192.178.45.65 - 192.178.45.94, broadcast 192.178.45.95"
        ]
    },
    {
        id: "sub-ex-6",
        difficulty: "medio",
        question: "Necesitas dar IP a <strong>50 equipos</strong> en una subred. ¿Qué prefijo mínimo necesitas?",
        answer: "/26 (con 62 hosts útiles)",
        steps: [
            "Necesitamos al menos 50 hosts + 2 reservadas (red y broadcast) = <strong>52 mínimo</strong>",
            "Potencias de 2: 2⁵=32 (insuficiente), 2⁶=64 ✅",
            "Bits de host necesarios: <strong>6</strong>",
            "Prefijo: 32 - 6 = <strong>/26</strong>",
            "Máscara: 255.255.255.192",
            "Hosts útiles disponibles: 64 - 2 = 62 (suficiente para tus 50)"
        ]
    },
    {
        id: "sub-ex-7",
        difficulty: "difícil",
        question: "Red <strong>192.168.0.0/24</strong>. Necesitas <strong>3 subredes</strong> con estos tamaños: 100 hosts, 50 hosts, 20 hosts (VLSM).",
        answer: "VLSM: /25 (126 hosts), /26 (62 hosts), /27 (30 hosts)",
        steps: [
            "<strong>Subred 1 (100 hosts):</strong> necesitamos 2⁷=128 → /25 (126 hosts útiles). Asignamos <strong>192.168.0.0/25</strong> (.0 a .127).",
            "<strong>Subred 2 (50 hosts):</strong> necesitamos 2⁶=64 → /26 (62 hosts útiles). Asignamos <strong>192.168.0.128/26</strong> (.128 a .191).",
            "<strong>Subred 3 (20 hosts):</strong> necesitamos 2⁵=32 → /27 (30 hosts útiles). Asignamos <strong>192.168.0.192/27</strong> (.192 a .223).",
            "Nos sobra el rango .224 a .255 para futuras necesidades.",
            "Esto se llama <strong>VLSM (Variable Length Subnet Mask)</strong>: usamos máscaras distintas en cada subred según necesidad. Eficiencia máxima."
        ]
    },
    {
        id: "sub-ex-8",
        difficulty: "difícil",
        question: "Una empresa tiene <strong>RRHH (5 PCs), Ventas (10 PCs) y Gerencia (3 PCs)</strong>. Desde 192.168.1.0/24. Diseña las subredes.",
        answer: "VLSM con /28 para cada departamento",
        steps: [
            "<strong>RRHH (5 PCs):</strong> /29 (6 hosts) bastaría, pero usamos /28 (14 hosts) por margen. Asignamos <strong>192.168.1.0/28</strong> (.1-.14, gateway .1).",
            "<strong>Ventas (10 PCs):</strong> /28 (14 hosts) justo. Asignamos <strong>192.168.1.16/28</strong> (.17-.30, gateway .17).",
            "<strong>Gerencia (3 PCs):</strong> /29 (6 hosts) sobra. Asignamos <strong>192.168.1.32/29</strong> (.33-.38, gateway .33).",
            "Nos sobra mucho rango para crecer.",
            "<strong>Recomendación profesional:</strong> deja margen. Usar /28 para todos los departamentos pequeños te da flexibilidad para crecer un 50-100% sin reconfigurar."
        ]
    },
    {
        id: "sub-ex-9",
        difficulty: "difícil",
        question: "Tienes <strong>172.16.0.0/16</strong>. Necesitas <strong>100 subredes</strong> con al menos 200 hosts cada una.",
        answer: "/24, máscara 255.255.255.0, 254 hosts útiles, 256 subredes posibles",
        steps: [
            "Para 100 subredes: 2⁶=64 NO, 2⁷=128 SÍ. Necesitamos 7 bits prestados.",
            "Para 200 hosts: 2⁷=128 NO, 2⁸=256 SÍ. Necesitamos 8 bits de host.",
            "Total: 7 (subred) + 8 (host) = 15 bits. Pero solo tenemos 32-16 = 16 bits disponibles.",
            "Bits prestados: 16 - 8 = <strong>8 bits</strong> → 2⁸ = 256 subredes (cumple ≥100).",
            "Prefijo: 16 + 8 = <strong>/24</strong>. Máscara: 255.255.255.0.",
            "Subredes: 172.16.0.0/24, 172.16.1.0/24, 172.16.2.0/24... hasta 172.16.255.0/24.",
            "Hosts por subred: 2⁸ - 2 = <strong>254</strong> (cumple ≥200). ✅"
        ]
    },
    {
        id: "sub-ex-10",
        difficulty: "experto",
        question: "Calcula la <strong>dirección de red, broadcast y rango útil</strong> de <strong>192.168.45.137/27</strong>.",
        answer: "Red: 192.168.45.128, Broadcast: 192.168.45.159, Rango: .129 - .158",
        steps: [
            "Máscara de /27: 255.255.255.224",
            "Incremento: 256 - 224 = <strong>32</strong>",
            "Dividimos 137 / 32 = <strong>4</strong> (cociente).",
            "Multiplicamos: 4 × 32 = <strong>128</strong>",
            "Dirección de red: <strong>192.168.45.128/27</strong>",
            "Broadcast: 128 + 32 - 1 = <strong>192.168.45.159</strong>",
            "Rango útil: <strong>192.168.45.129</strong> hasta <strong>192.168.45.158</strong> (30 hosts útiles)"
        ]
    },
    {
        id: "sub-ex-11",
        difficulty: "experto",
        question: "Calcula todo de <strong>10.20.30.45/22</strong>",
        answer: "Red: 10.20.28.0, Broadcast: 10.20.31.255, 1022 hosts útiles",
        steps: [
            "Máscara de /22: 255.255.252.0 (los primeros 22 bits a 1, los últimos 10 a 0)",
            "El octeto 'variable' es el tercero. Bits del octeto 3: 11111100 (252)",
            "Incremento en el tercer octeto: 256 - 252 = <strong>4</strong>",
            "Tomamos el tercer octeto: 30. Dividimos 30 / 4 = <strong>7</strong> (cociente).",
            "7 × 4 = <strong>28</strong> → tercer octeto de la red.",
            "Dirección de red: <strong>10.20.28.0/22</strong>",
            "Broadcast: 10.20.28.0 + 1024 direcciones - 1 = <strong>10.20.31.255</strong>",
            "Rango útil: 10.20.28.1 - 10.20.31.254",
            "Hosts útiles: 2¹⁰ - 2 = <strong>1022</strong>"
        ]
    }
];
