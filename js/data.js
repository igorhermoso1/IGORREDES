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
    }
};
