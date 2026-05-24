/* ============================================
   DATA-EXTENDED.JS — Módulos nuevos extensivos
   Sumamos al data.js original. No tocamos nada existente.
   ============================================ */

// LIBROS PÚBLICOS DE REFERENCIA REUTILIZABLES
const PUBLIC_BOOKS = {
    tanenbaum: {
        title: 'Redes de computadoras (5ª edición)',
        author: 'Andrew S. Tanenbaum, David Wetherall',
        desc: 'El libro de referencia universal en redes. Cubre desde la capa física hasta la aplicación con rigor académico. PDF disponible en repositorios universitarios.',
        url: 'https://gc.scalahed.com/recursos/files/r161r/w25733w/redes_de_computadoras-freelibros-org.pdf',
        license: '📚 Académico'
    },
    severance: {
        title: 'Introducción a las redes',
        author: 'Charles Severance (traducido por Fernando Tardío)',
        desc: 'Libro abierto, didáctico y conciso. Perfecto para empezar. Explica TCP/IP, HTTP, DNS y la historia de internet con claridad.',
        url: 'https://www.dr-chuck.com/net-intro/book/translations/Spanish/2021-06-12-book.pdf',
        license: '🆓 Creative Commons BY-NC'
    },
    fundamentosUTEQ: {
        title: 'Fundamentos de Redes',
        author: 'Eduardo Samaniego, Jorge Murillo — Universidad Técnica Estatal de Quevedo',
        desc: 'Libro universitario libre. 4 unidades: introducción, transmisión, arquitecturas y TCP/IP. Excelente para FP.',
        url: 'https://www.researchgate.net/publication/358105030_Libro_de_Fundamentos_de_REDES',
        license: '📚 Universitario abierto'
    },
    rfc791: {
        title: 'RFC 791 — Internet Protocol (IPv4)',
        author: 'Information Sciences Institute (DARPA)',
        desc: 'El RFC original del protocolo IP. Define el formato de datagramas y direccionamiento. Lectura técnica obligatoria.',
        url: 'https://www.rfc-editor.org/rfc/rfc791',
        license: '🆓 Dominio público'
    },
    rfc8200: {
        title: 'RFC 8200 — IPv6 Specification',
        author: 'S. Deering, R. Hinden',
        desc: 'Especificación oficial de IPv6. La biblia para entender cómo funciona IPv6 a nivel de protocolo.',
        url: 'https://www.rfc-editor.org/rfc/rfc8200',
        license: '🆓 Dominio público'
    },
    ciscoPress: {
        title: 'Cisco Networking Academy — Materiales libres',
        author: 'Cisco Systems',
        desc: 'Apuntes oficiales de CCNA accesibles en línea. Cobertura completa de switching, routing y seguridad.',
        url: 'https://www.netacad.com/',
        license: '🆓 Registro gratuito'
    },
    tiaTabasco: {
        title: 'Guía para aplicar la norma TIA/EIA 568 para cableado estructurado',
        author: 'Gobierno de Tabasco / Fluke Networks',
        desc: 'Guía oficial detallada de cableado estructurado: categorías, instalación, certificación y pruebas con Fluke.',
        url: 'https://tabasco.gob.mx/sites/default/files/Manual-para-aplicar-la-norma-TIA-EIA-para-Cableado-Estructurado.pdf',
        license: '🆓 Documento público'
    }
};

// MÓDULOS NUEVOS
const EXTENDED_MODULES = [
    // ===== CAPA FÍSICA =====
    {
        id: 'cableado-estructurado-pro',
        category: 'capa-fisica',
        title: 'Cableado estructurado avanzado',
        subtitle: 'Norma TIA-568, categorías de cable, certificación',
        icon: '🔌',
        level: 'intermedio',
        duration: '60 min'
    },
    {
        id: 'fibra-optica-completa',
        category: 'capa-fisica',
        title: 'Fibra óptica: SM, MM y conectores',
        subtitle: 'OS1/OS2, OM1-OM5, fusión, SFP y transceptores',
        icon: '✨',
        level: 'intermedio',
        duration: '55 min'
    },
    {
        id: 'patch-panel-rack',
        category: 'capa-fisica',
        title: 'Patch panels, racks y PoE',
        subtitle: 'Instalación paso a paso, gestión de cableado, alimentación',
        icon: '🗄️',
        level: 'práctico',
        duration: '50 min'
    },

    // ===== DISEÑO DE RED =====
    {
        id: 'vlans-trunking',
        category: 'diseno',
        title: 'VLANs avanzadas y trunking 802.1Q',
        subtitle: 'Segmentación L2, etiquetado, VLAN nativa, voz',
        icon: '🏷️',
        level: 'intermedio',
        duration: '65 min'
    },
    {
        id: 'spanning-tree',
        category: 'diseno',
        title: 'Spanning Tree: STP, RSTP y MSTP',
        subtitle: 'Prevención de bucles L2, root bridge, convergencia',
        icon: '🌳',
        level: 'avanzado',
        duration: '70 min'
    },
    {
        id: 'switch-capa3',
        category: 'diseno',
        title: 'Switch capa 3 e inter-VLAN routing',
        subtitle: 'SVI, routed ports, configuración completa paso a paso',
        icon: '🔀',
        level: 'avanzado',
        duration: '75 min'
    },
    {
        id: 'alta-disponibilidad',
        category: 'diseno',
        title: 'Alta disponibilidad: HSRP, VRRP, LACP',
        subtitle: 'Redundancia de gateway, agregación de enlaces, failover',
        icon: '🛡️',
        level: 'avanzado',
        duration: '60 min'
    },

    // ===== SEGURIDAD =====
    {
        id: 'firewalls-ngfw',
        category: 'seguridad',
        title: 'Firewalls: stateful y NGFW',
        subtitle: 'Inspección profunda, IPS, DPI, application awareness',
        icon: '🔥',
        level: 'intermedio',
        duration: '65 min'
    },
    {
        id: 'vpn-ipsec-wireguard',
        category: 'seguridad',
        title: 'VPN: IPsec, WireGuard y OpenVPN',
        subtitle: 'Túneles cifrados, site-to-site, road warrior',
        icon: '🔐',
        level: 'intermedio',
        duration: '60 min'
    },
    {
        id: 'acls-hardening',
        category: 'seguridad',
        title: 'ACLs y hardening de red',
        subtitle: 'Listas de control de acceso, port security, 802.1X',
        icon: '🚧',
        level: 'avanzado',
        duration: '55 min'
    },

    // ===== CLOUD Y MODERNO =====
    {
        id: 'ipv6-completo',
        category: 'cloud-moderno',
        title: 'IPv6 de cero a héroe',
        subtitle: 'Direccionamiento, SLAAC, NDP, dual-stack, transición',
        icon: '🌐',
        level: 'intermedio',
        duration: '70 min'
    },
    {
        id: 'sdn-sdwan',
        category: 'cloud-moderno',
        title: 'SDN y SD-WAN',
        subtitle: 'Software-Defined Networking, control plane, OpenFlow',
        icon: '☁️',
        level: 'avanzado',
        duration: '55 min'
    },
    {
        id: 'redes-docker',
        category: 'cloud-moderno',
        title: 'Redes en contenedores Docker',
        subtitle: 'Bridge, host, overlay, macvlan, compose y K8s',
        icon: '🐳',
        level: 'práctico',
        duration: '60 min'
    },

    // ===== INALÁMBRICAS =====
    {
        id: 'wifi6-7',
        category: 'inalambricas',
        title: 'WiFi 6, 6E y 7',
        subtitle: 'OFDMA, MU-MIMO, MLO, bandas 2.4/5/6 GHz',
        icon: '📶',
        level: 'intermedio',
        duration: '65 min'
    },
    {
        id: 'wifi-mesh-roaming',
        category: 'inalambricas',
        title: 'WiFi mesh y roaming 802.11k/r/v',
        subtitle: 'Redes malladas, transición transparente, optimización',
        icon: '🕸️',
        level: 'avanzado',
        duration: '50 min'
    },
    {
        id: 'wifi-empresarial',
        category: 'inalambricas',
        title: 'WiFi empresarial: RADIUS y WPA2-Enterprise',
        subtitle: '802.1X, EAP, certificados, portales cautivos',
        icon: '🏢',
        level: 'avanzado',
        duration: '60 min'
    }
];

// CATEGORÍAS NUEVAS
const EXTENDED_CATEGORIES = {
    'capa-fisica': { label: '🔌 Capa física', color: 'azul', desc: 'Cableado, fibra, racks y conexiones físicas' },
    'diseno': { label: '🏗️ Diseño de red', color: 'turquesa', desc: 'Arquitecturas, VLANs, STP, alta disponibilidad' },
    'seguridad': { label: '🛡️ Seguridad', color: 'rojo', desc: 'Firewalls, VPNs, ACLs y hardening' },
    'cloud-moderno': { label: '☁️ Cloud y moderno', color: 'violeta', desc: 'IPv6, SDN, SD-WAN, contenedores' },
    'inalambricas': { label: '📶 Inalámbricas', color: 'verde', desc: 'WiFi 6/7, mesh, roaming, seguridad WiFi' }
};

// CONTENIDO MASIVO DE LOS MÓDULOS
const EXTENDED_CONTENT = {

// ============================================================================
// CAPA FÍSICA — Cableado estructurado avanzado
// ============================================================================
'cableado-estructurado-pro': [
{
    title: '📖 Norma TIA/EIA-568: el estándar mundial del cableado',
    content: `
<p>Cuando entras en una sala de servidores, todo lo que ves —cables ordenados, paneles, racks— responde a un estándar: <strong>ANSI/TIA-568</strong>. Esta norma, mantenida por la Telecommunications Industry Association, define cómo debe diseñarse, instalarse y verificarse un sistema de cableado estructurado.</p>

<h4>📜 Historia rápida</h4>
<ul>
    <li><strong>1991</strong> — Primera versión TIA-568. Nació porque cada fabricante tenía su propio sistema y era un caos.</li>
    <li><strong>2001</strong> — Revisión B: introduce categorías 5e, 6 y 6a.</li>
    <li><strong>2009</strong> — Revisión C: nuevas tecnologías.</li>
    <li><strong>2015 → hoy</strong> — Revisión D y revisiones puntuales. Incluye Cat 8.</li>
</ul>

<h4>🏗️ Estructura de la norma</h4>
<p>La TIA-568 se divide en tres familias:</p>
<ul>
    <li><strong>TIA-568-B.1</strong>: cableado genérico de telecomunicaciones en edificios comerciales. Requisitos de estructura, configuración, parámetros de desempeño.</li>
    <li><strong>TIA-568-B.2</strong>: requerimientos generales para componentes de par trenzado balanceado.</li>
    <li><strong>TIA-568-B.3</strong>: componentes de cableado de fibra óptica.</li>
</ul>

<h4>🔗 Normas complementarias (la familia 569, 606, 607...)</h4>
<ul>
    <li><strong>TIA-569</strong>: caminos y espacios para telecomunicaciones (canalizaciones, salas, gabinetes).</li>
    <li><strong>TIA-606</strong>: administración del sistema de cableado (identificación, etiquetado, documentación).</li>
    <li><strong>TIA-607</strong>: puesta a tierra de equipos de telecomunicaciones.</li>
    <li><strong>TIA-758</strong>: cableado de planta externa.</li>
    <li><strong>ISO/IEC 11801</strong>: equivalente internacional de la TIA-568.</li>
</ul>

<div class="info-box">💡 <strong>Idea clave:</strong> el cableado estructurado no es "tirar cable y ya". Es un sistema completo donde cada bloque (área de trabajo → cableado horizontal → sala de telecomunicaciones → backbone → cuarto de equipos) tiene requisitos específicos y se documenta.</div>
    `
},
{
    title: '🎨 Categorías de cable UTP: Cat 5e, 6, 6a, 7, 8',
    content: `
<p>La gran pregunta del técnico: <strong>"¿qué cable pongo?"</strong>. La respuesta depende de la velocidad que necesites, la distancia, las interferencias y el presupuesto.</p>

<h4>📊 Tabla comparativa</h4>
<table>
    <thead>
        <tr>
            <th>Categoría</th>
            <th>Frecuencia</th>
            <th>Velocidad</th>
            <th>Distancia</th>
            <th>Uso típico</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Cat 5e</strong></td>
            <td>100 MHz</td>
            <td>1 Gbps</td>
            <td>100 m</td>
            <td>LAN doméstica, mínimo aceptable hoy</td>
        </tr>
        <tr>
            <td><strong>Cat 6</strong></td>
            <td>250 MHz</td>
            <td>1 Gbps (10G hasta 55m)</td>
            <td>100 m</td>
            <td>LAN empresarial estándar</td>
        </tr>
        <tr>
            <td><strong>Cat 6a</strong></td>
            <td>500 MHz</td>
            <td>10 Gbps</td>
            <td>100 m</td>
            <td>Servidores, backbone PoE+</td>
        </tr>
        <tr>
            <td><strong>Cat 7</strong></td>
            <td>600 MHz</td>
            <td>10 Gbps</td>
            <td>100 m</td>
            <td>Industrial, alto blindaje (no estándar TIA)</td>
        </tr>
        <tr>
            <td><strong>Cat 8</strong></td>
            <td>2000 MHz</td>
            <td>25-40 Gbps</td>
            <td>30 m</td>
            <td>Data center, backbone corto</td>
        </tr>
    </tbody>
</table>

<h4>🛡️ Blindajes</h4>
<ul>
    <li><strong>UTP</strong> (Unshielded Twisted Pair) — sin blindaje. Lo más común y barato.</li>
    <li><strong>FTP / F/UTP</strong> — lámina general (Foiled). Mejora frente a EMI moderada.</li>
    <li><strong>STP / S/FTP</strong> — blindaje individual por par + general. Industrial, ruidoso.</li>
    <li><strong>S/STP</strong> — máxima protección. Trabajos cerca de motores, soldadura, etc.</li>
</ul>

<div class="concept-box">
    <h4>💡 Regla práctica de Igor</h4>
    <p>Para una oficina nueva en 2026, <strong>Cat 6a es el "sweet spot"</strong>: prepara para 10 Gbps, soporta PoE++, dura 15-20 años y no es tan caro como Cat 8. Cat 5e solo en reemplazos o presupuestos muy ajustados.</p>
</div>

<h4>🌈 Norma de colores T568A vs T568B</h4>
<p>Cuando ponchas un RJ45 o un patch panel, debes seguir un orden de colores. Hay dos variantes:</p>
<ul>
    <li><strong>T568A</strong>: blanco-verde, verde, blanco-naranja, azul, blanco-azul, naranja, blanco-marrón, marrón.</li>
    <li><strong>T568B</strong>: blanco-naranja, naranja, blanco-verde, azul, blanco-azul, verde, blanco-marrón, marrón.</li>
</ul>
<p>Funcionalmente son equivalentes. La regla de oro: <strong>usa siempre la misma norma en ambos extremos del cable</strong>. En España y EEUU se usa más T568B; en gobierno/militar a veces T568A.</p>

<div class="warning-box">
    ⚠️ Si haces un extremo con T568A y otro con T568B, creas un <strong>cable cruzado</strong> (crossover). Esto antes se usaba para conectar dos PCs directamente o switch-switch. Hoy día casi todos los equipos tienen <strong>auto-MDI/MDIX</strong> y reconocen automáticamente el tipo de cable.
</div>
    `
},
{
    title: '✅ Certificación de cableado: pruebas que debes hacer',
    content: `
<p>Tirar el cable no es suficiente. Una instalación profesional <strong>se certifica</strong> con un analizador (Fluke, IDEAL, Softing) y se entrega un informe.</p>

<h4>🧪 Pruebas obligatorias</h4>
<ul>
    <li><strong>Wire Map</strong> — orden correcto de los pares. Detecta cables abiertos, cortocircuitos y pares cruzados.</li>
    <li><strong>Length</strong> — longitud del enlace, máximo 90 m horizontal + 10 m de patch cords.</li>
    <li><strong>NEXT</strong> (Near End Crosstalk) — diafonía en el extremo cercano. Cuánto se "filtra" la señal entre pares.</li>
    <li><strong>PSNEXT</strong> — NEXT considerando todos los pares simultáneamente.</li>
    <li><strong>FEXT</strong> — diafonía en el extremo lejano.</li>
    <li><strong>Return Loss</strong> — pérdida de retorno por desadaptación de impedancia.</li>
    <li><strong>Insertion Loss</strong> — atenuación total del enlace.</li>
    <li><strong>Propagation Delay</strong> — tiempo que tarda la señal en recorrer el cable.</li>
    <li><strong>Delay Skew</strong> — diferencia de retardo entre pares (importante en Gigabit).</li>
</ul>

<h4>📑 Tipos de certificación</h4>
<ul>
    <li><strong>Permanent Link</strong>: el cableado fijo del edificio (patch panel a roseta), sin los latiguillos.</li>
    <li><strong>Channel</strong>: el enlace completo incluyendo latiguillos. Es lo que "ve" el switch.</li>
</ul>

<div class="curiosity-box">
    <h4>💡 Truco de oro</h4>
    <p>Antes de etiquetar el cable como "instalado", guarda el informe de certificación en PDF. Si hay un problema dentro de 5 años, ese PDF te salva la vida: demuestras que <em>en su día funcionaba</em>, así el cliente no puede echarte la culpa.</p>
</div>

<h4>🏷️ Etiquetado (TIA-606)</h4>
<p>Cada cable debe llevar identificación en <strong>ambos extremos</strong>. Un esquema típico:</p>
<p class="mono"><code>EDIFICIO-PLANTA-RACK-PUERTO</code> → ejemplo: <code>A-02-R1-P24</code> = Edificio A, planta 2, Rack 1, Puerto 24.</p>
    `
},
{
    title: '🎥 Vídeos para aprender',
    content: ''  // se rellena dinámicamente con renderVideoGrid
},
{
    title: '📚 Libros y recursos',
    content: ''  // se rellena dinámicamente
}
],

// ============================================================================
// FIBRA ÓPTICA
// ============================================================================
'fibra-optica-completa': [
{
    title: '✨ Cómo funciona la fibra óptica',
    content: `
<p>La fibra óptica transmite información mediante <strong>pulsos de luz</strong> que viajan por un núcleo de vidrio (o plástico) ultrapuro. No usa electricidad como el cobre: usa fotones. Esto la hace inmune a interferencias electromagnéticas, capaz de alcanzar distancias enormes y ofrecer anchos de banda brutales.</p>

<h4>🔬 Anatomía de la fibra</h4>
<ul>
    <li><strong>Núcleo (core)</strong>: el vidrio por donde viaja la luz. Diámetro de 9 µm (monomodo) o 50/62.5 µm (multimodo).</li>
    <li><strong>Revestimiento (cladding)</strong>: vidrio con índice de refracción menor que el núcleo. Por aquí "rebota" la luz para no salirse.</li>
    <li><strong>Recubrimiento (coating)</strong>: protección plástica de 250 µm.</li>
    <li><strong>Buffer / chaqueta</strong>: protección mecánica y antiabrasiva.</li>
</ul>

<p>El truco físico se llama <strong>reflexión interna total</strong>: la luz que entra con cierto ángulo no escapa, rebota infinitamente por el núcleo hasta llegar al otro extremo.</p>

<h4>📡 Monomodo vs Multimodo</h4>
<table>
    <thead><tr><th>Tipo</th><th>Núcleo</th><th>Fuente luz</th><th>Distancia</th><th>Uso</th></tr></thead>
    <tbody>
        <tr>
            <td><strong>Multimodo (MM)</strong></td>
            <td>50 o 62.5 µm</td>
            <td>LED / VCSEL (850/1300 nm)</td>
            <td>Hasta 2 km</td>
            <td>Campus, edificios, data centers cortos</td>
        </tr>
        <tr>
            <td><strong>Monomodo (SM)</strong></td>
            <td>9 µm</td>
            <td>Láser (1310/1550 nm)</td>
            <td>Hasta 100+ km</td>
            <td>WAN, MAN, troncales de operador</td>
        </tr>
    </tbody>
</table>

<h4>🏷️ Categorías OM (multimodo) y OS (monomodo)</h4>
<ul>
    <li><strong>OM1</strong> (62.5/125 µm, naranja) — 1 Gbps a 275 m. Obsoleta.</li>
    <li><strong>OM2</strong> (50/125 µm, naranja) — 1 Gbps a 550 m, 10G a 82 m. En desuso.</li>
    <li><strong>OM3</strong> (50/125 µm, aqua) — 10G a 300 m, 40G/100G a 100 m. <strong>Estándar moderno.</strong></li>
    <li><strong>OM4</strong> (50/125 µm, aqua/violeta) — 10G a 400 m, 100G a 150 m. Data centers.</li>
    <li><strong>OM5</strong> (50/125 µm, lima) — multilongitud de onda (SWDM), hasta 400G.</li>
</ul>

<ul>
    <li><strong>OS1</strong> — monomodo interior, hasta 10 km.</li>
    <li><strong>OS2</strong> — monomodo exterior, hasta 200 km. Es la que usa Movistar y Telefónica para la red de fibra hasta tu casa.</li>
</ul>
    `
},
{
    title: '🔌 Conectores y SFPs',
    content: `
<h4>🔗 Conectores más usados</h4>
<ul>
    <li><strong>LC</strong> (Lucent Connector) — pequeño, dúplex. <strong>El más común hoy</strong> en switches y servidores.</li>
    <li><strong>SC</strong> (Subscriber Connector) — cuadrado, click. Habitual en ONTs domésticos y FTTH.</li>
    <li><strong>ST</strong> (Straight Tip) — bayoneta, antiguo. Aún en algunos campus.</li>
    <li><strong>FC</strong> — rosca, telecomunicaciones y laboratorios.</li>
    <li><strong>MPO/MTP</strong> — multifibra (12, 24, 48 fibras en un solo conector). Para 40G/100G/400G en data centers.</li>
</ul>

<h4>🎨 Pulidos del conector</h4>
<ul>
    <li><strong>PC</strong> (Physical Contact) — verde, gris.</li>
    <li><strong>UPC</strong> (Ultra Physical Contact) — azul. El más común.</li>
    <li><strong>APC</strong> (Angled Physical Contact) — verde, corte en 8°. Mejor pérdida de retorno. <strong>Usado en FTTH y CATV.</strong> Nunca mezclar APC con UPC: rompes el conector.</li>
</ul>

<h4>📡 Transceptores SFP / SFP+ / QSFP</h4>
<p>Un puerto de fibra no es como un puerto Ethernet: necesitas un <strong>módulo transceptor</strong> que convierte señal eléctrica ↔ óptica.</p>
<ul>
    <li><strong>SFP</strong> — 1 Gbps. Tamaño pequeño, hot-swap.</li>
    <li><strong>SFP+</strong> — 10 Gbps. Mismo formato físico que SFP.</li>
    <li><strong>SFP28</strong> — 25 Gbps.</li>
    <li><strong>QSFP+</strong> — 40 Gbps (4 × 10G).</li>
    <li><strong>QSFP28</strong> — 100 Gbps (4 × 25G).</li>
    <li><strong>QSFP-DD</strong> — 400 Gbps.</li>
</ul>

<div class="warning-box">
    ⚠️ Los SFPs <strong>tienen "marca"</strong>: un Cisco no acepta un SFP genérico salvo que activemos <code>service unsupported-transceiver</code>. En 2026 esto se ha relajado con la nueva regulación de "right to repair", pero comprueba siempre la compatibilidad antes de pedir 50 unidades.
</div>

<h4>🌈 Tecnologías WDM</h4>
<ul>
    <li><strong>CWDM</strong> (Coarse Wavelength Division Multiplexing) — 18 longitudes de onda, espaciado 20 nm.</li>
    <li><strong>DWDM</strong> (Dense WDM) — hasta 80+ longitudes de onda. Las operadoras meten 8 Tbps en un solo par de fibras.</li>
    <li><strong>BiDi</strong> — usa una sola fibra para TX y RX (longitudes 1310/1550 nm separadas).</li>
</ul>
    `
},
{
    title: '🔧 Fusión, empalmes y pruebas',
    content: `
<h4>🔥 Fusión vs conectores mecánicos</h4>
<p>Para unir dos fibras hay dos métodos:</p>
<ul>
    <li><strong>Fusión</strong>: una máquina (fusionadora, ~3000-15000 €) funde los extremos con un arco eléctrico. Pérdida típica &lt;0.05 dB.</li>
    <li><strong>Empalme mecánico</strong>: dos fibras unidas con gel y un acoplador. Pérdida 0.1-0.5 dB. Solo para reparaciones puntuales.</li>
</ul>

<h4>🧪 Pruebas en fibra</h4>
<ul>
    <li><strong>Inspección de conectores</strong>: microscopio óptico para ver suciedad o rayaduras. <em>El 80% de los problemas de fibra son por conectores sucios.</em></li>
    <li><strong>Power meter + light source</strong>: pareja básica. Mides cuánta luz llega al otro extremo.</li>
    <li><strong>OTDR</strong> (Optical Time Domain Reflectometer): emite pulsos y analiza los reflejos. Te dice <strong>dónde exactamente</strong> está cada empalme y cada problema. Imprescindible en instalaciones largas.</li>
    <li><strong>Visual Fault Locator</strong>: un láser rojo visible. Si rompes la fibra en algún sitio, se ve por dónde escapa la luz. Muy útil para localizar rotura visual.</li>
</ul>

<div class="curiosity-box">
    <h4>🤓 Curiosidad técnica</h4>
    <p>Una sola fibra monomodo OS2 puede transportar más de <strong>40 Tbps</strong> usando DWDM. Para hacernos una idea: eso es como transmitir <em>el contenido completo de Netflix</em> en aproximadamente un segundo. Por eso la fibra es irreemplazable en troncales de internet.</p>
</div>

<h4>📐 Cálculo de presupuesto óptico</h4>
<p>Antes de instalar un enlace, hay que verificar que la potencia llegue al otro extremo. Fórmula básica:</p>
<div class="cmd-block">
Pérdida total (dB) = (km × atenuación) + (Nº conectores × 0.5 dB) + (Nº empalmes × 0.1 dB) + margen 3 dB
</div>
<p>Si la pérdida total &gt; sensibilidad del receptor → no funciona. Hay que cambiar el SFP por uno de mayor alcance o reducir la distancia.</p>

<h4>🌍 FTTH y GPON</h4>
<p>La fibra que llega a tu casa (FTTH = Fiber To The Home) usa tecnología <strong>GPON</strong> (Gigabit Passive Optical Network). Es <em>punto-multipunto</em>: una fibra del operador se divide pasivamente (split 1:32 o 1:64) y llega a 32-64 abonados. Cada uno recibe la luz pero solo ve sus paquetes (separados por longitudes de onda distintas para subida y bajada).</p>
    `
},
{
    title: '🎥 Vídeos para aprender',
    content: ''
},
{
    title: '📚 Libros y recursos',
    content: ''
}
],

// ============================================================================
// PATCH PANELS Y RACKS
// ============================================================================
'patch-panel-rack': [
{
    title: '🗄️ Qué es un patch panel y por qué lo necesitas',
    content: `
<p>Un <strong>patch panel</strong> (panel de parcheo) es un panel pasivo donde terminan todos los cables de la instalación. Su trabajo no es electrónico, es <em>organizativo</em>: convierte un manojo caótico de cables en un frontal ordenado y manejable.</p>

<h4>🤔 ¿Por qué no enchufar el cable directamente al switch?</h4>
<p>Podrías. De hecho mucha gente lo hace en redes domésticas. Pero en una instalación profesional, el patch panel aporta:</p>
<ul>
    <li><strong>Flexibilidad</strong>: cambiar un puesto de la VLAN 10 a la 20 = mover un latiguillo de un puerto a otro, no recablear el edificio.</li>
    <li><strong>Protección</strong>: el cable horizontal (fijo del edificio) no se manipula. Los latiguillos sí, y son baratos de reemplazar.</li>
    <li><strong>Diagnóstico</strong>: con un tester verificas el cable estructural sin tocar electrónica.</li>
    <li><strong>Documentación</strong>: cada puerto numerado coincide con una roseta. Etiquetar es trivial.</li>
</ul>

<h4>🧩 Tipos de patch panel</h4>
<ul>
    <li><strong>De cobre</strong>: RJ45 hembra al frente, conector IDC tipo 110 o Krone detrás. 12, 16, 24, 32, 48 puertos.</li>
    <li><strong>De fibra</strong>: alojamientos para conectores LC, SC o MTP. Suelen ser modulares (cassettes).</li>
    <li><strong>De voz</strong>: 25 pares, Krone, para centralitas tradicionales.</li>
    <li><strong>Keystone</strong>: panel "vacío" con huecos donde insertas módulos individuales (RJ45, F, HDMI, fibra...). Flexibilísimo.</li>
</ul>
    `
},
{
    title: '🛠️ Cómo ponchar un patch panel paso a paso',
    content: `
<p>Esta es <strong>la habilidad técnica</strong> más práctica del cableado estructurado. Vamos a por ello.</p>

<h4>🧰 Herramientas necesarias</h4>
<div class="tool-grid">
    <div class="tool-card">
        <div class="tool-name">🔪 Pelador de cable</div>
        <div class="tool-desc">Quita la cubierta exterior sin dañar los pares internos.</div>
    </div>
    <div class="tool-card">
        <div class="tool-name">⚒️ Ponchadora de impacto</div>
        <div class="tool-desc">Krone o 110 (según el panel). Inserta el conductor y corta el sobrante en un solo golpe.</div>
    </div>
    <div class="tool-card">
        <div class="tool-name">✂️ Cortadora</div>
        <div class="tool-desc">Tijeras electricistas o alicates de corte.</div>
    </div>
    <div class="tool-card">
        <div class="tool-name">🧪 Tester de cable</div>
        <div class="tool-desc">Para verificar después.</div>
    </div>
    <div class="tool-card">
        <div class="tool-name">🏷️ Etiquetadora</div>
        <div class="tool-desc">Brother PT-H110, Dymo. Para identificar cada puerto.</div>
    </div>
    <div class="tool-card">
        <div class="tool-name">🪛 Velcros</div>
        <div class="tool-desc">Para organizar los cables. Bridas plásticas NO (cortan el cable al apretar).</div>
    </div>
</div>

<h4>📋 Procedimiento</h4>
<ol style="line-height:1.9;">
    <li><strong>Mide y corta</strong> el cable horizontal con holgura. Mejor sobra que falte (pero no demasiado: 30-50 cm de reserva por puerto).</li>
    <li><strong>Pela ~2.5 cm</strong> de la cubierta exterior. Hazlo con cuidado, sin dañar los pares.</li>
    <li><strong>Desenreda mínimamente</strong> los pares. Mantén el trenzado hasta el último momento posible (importante para minimizar diafonía).</li>
    <li><strong>Identifica la norma</strong> que vas a usar (T568A o T568B). En el patch panel viene impresa en cada puerto. <strong>Usa la misma en TODOS los puertos.</strong></li>
    <li><strong>Coloca cada hilo</strong> en su ranura IDC según los colores indicados.</li>
    <li><strong>Poncha con la ponchadora de impacto</strong>. Un golpe seco. La herramienta inserta el cable, hace contacto y corta el sobrante a la vez.</li>
    <li><strong>Repite</strong> con los 8 hilos.</li>
    <li><strong>Verifica visualmente</strong>: ningún hilo suelto, cobre asomando o pares enroscados saliendo del IDC.</li>
    <li><strong>Etiqueta</strong> el puerto en el frontal y el cable cerca del jack.</li>
    <li><strong>Testa</strong> con el comprobador antes de cerrar el rack. Si hay un wire map cruzado, lo arreglas ahora, no en producción.</li>
</ol>

<div class="warning-box">
    ⚠️ <strong>Errores típicos de novato:</strong>
    <ul>
        <li>Pelar demasiado la cubierta exterior (más de 3 cm) → diafonía.</li>
        <li>Desenredar los pares más de lo necesario → diafonía.</li>
        <li>Usar T568A en un extremo y T568B en otro → cable crossover involuntario.</li>
        <li>No etiquetar nada → 3 meses después es imposible saber qué va dónde.</li>
        <li>Tirar de los cables al pasarlos por la organizadora → micro-fisuras en el cobre, fallos intermitentes.</li>
    </ul>
</div>

<h4>📐 Gestión de cables del rack</h4>
<p>Un buen instalador deja el rack como una obra de arte. Trucos:</p>
<ul>
    <li>Cables horizontales por <strong>arriba</strong> o <strong>abajo</strong> del rack, nunca cruzando por el medio.</li>
    <li><strong>Organizadores horizontales</strong> 1U entre patch panel y switch para guiar los latiguillos.</li>
    <li><strong>Organizadores verticales</strong> en los laterales del rack.</li>
    <li><strong>Velcros</strong>, no bridas plásticas. Las bridas si las aprietas demás aplastan el cable y degradan la señal.</li>
    <li>Radio de curvatura mínimo: <strong>4x el diámetro del cable</strong> (más para fibra, ~20x).</li>
</ul>
    `
},
{
    title: '⚡ PoE: Power over Ethernet',
    content: `
<p><strong>PoE</strong> permite enviar <em>alimentación eléctrica</em> por el mismo cable Ethernet que lleva los datos. Es lo que hace que un teléfono IP, un AP WiFi o una cámara IP no necesiten un enchufe cerca: el switch les manda corriente.</p>

<h4>📊 Estándares PoE</h4>
<table>
    <thead><tr><th>Estándar</th><th>Nombre</th><th>Potencia máx</th><th>Uso típico</th></tr></thead>
    <tbody>
        <tr><td>IEEE 802.3af</td><td>PoE</td><td>15.4 W (12.95 W al dispositivo)</td><td>Teléfonos IP, sensores</td></tr>
        <tr><td>IEEE 802.3at</td><td>PoE+</td><td>30 W (25.5 W)</td><td>APs WiFi, cámaras PTZ, tablets</td></tr>
        <tr><td>IEEE 802.3bt Type 3</td><td>PoE++</td><td>60 W (51 W)</td><td>Pantallas pequeñas, APs WiFi 6</td></tr>
        <tr><td>IEEE 802.3bt Type 4</td><td>PoE++ / 4PPoE</td><td>90 W (71.3 W)</td><td>Portátiles, monitores, kioscos</td></tr>
    </tbody>
</table>

<h4>🔋 Componentes</h4>
<ul>
    <li><strong>PSE</strong> (Power Sourcing Equipment): el que da la corriente — switch PoE o inyector.</li>
    <li><strong>PD</strong> (Powered Device): el que la recibe — AP, cámara, teléfono.</li>
</ul>

<h4>🚀 Cálculo del presupuesto PoE</h4>
<p>Si tu switch tiene "<strong>PoE budget 370W</strong>" y vas a conectar 16 APs WiFi 6 a 25W cada uno:</p>
<div class="cmd-block">
16 APs × 25 W = 400 W   →   ⚠️ Excede el presupuesto (370 W)
</div>
<p>Solución: comprar un switch con presupuesto mayor o repartir entre dos switches.</p>

<div class="curiosity-box">
    <h4>💡 Truco práctico</h4>
    <p>Para evitar problemas de potencia, usa cable <strong>Cat 6a</strong> en instalaciones PoE++. El cable más grueso disipa mejor el calor del paso de corriente. Cat 5e con PoE++ a 90W puede llegar a calentarse hasta 60°C.</p>
</div>

<h4>🏗️ Tipos de racks</h4>
<ul>
    <li><strong>Rack abierto</strong>: 2 o 4 postes. Para CPDs pequeños, sin necesidad de cierre.</li>
    <li><strong>Rack cerrado</strong> (gabinete): con puertas, ventilación, llaves. Estándar empresarial.</li>
    <li><strong>Rack mural</strong>: pequeño (6-12U), se cuelga en pared.</li>
    <li><strong>Half-rack</strong>: media altura para espacios reducidos.</li>
</ul>

<p>La <strong>U</strong> es la unidad de altura del rack: <strong>1U = 44.45 mm (1.75")</strong>. Un rack estándar tiene 19" de ancho y 24, 42 o 48U de altura. Un switch suele ocupar 1U; un servidor 1U-4U; una SAN puede ocupar 8U-12U.</p>

<h4>🌡️ Refrigeración</h4>
<ul>
    <li>Flujo de aire: <strong>frente → atrás</strong>. El frente aspira frío, el trasero expulsa caliente.</li>
    <li>En CPDs grandes se usan <strong>pasillos calientes/fríos</strong>: filas de racks orientadas para que los frontales miren al pasillo frío.</li>
    <li>Mide la temperatura: ideal 22-24°C, máximo 27°C.</li>
    <li>Tapas ciegas (blank panels) en los huecos vacíos del rack: evitan que el aire caliente vuelva a entrar por delante.</li>
</ul>
    `
},
{
    title: '🎥 Vídeos para aprender',
    content: ''
},
{
    title: '📚 Libros y recursos',
    content: ''
}
],

// ============================================================================
// VLANs avanzadas y trunking 802.1Q
// ============================================================================
'vlans-trunking': [
{
    title: '🏷️ VLANs: separación lógica en el mismo switch',
    content: `
<p>Una <strong>VLAN</strong> (Virtual LAN) es una red local <em>lógica</em> que existe sobre la misma infraestructura física. Antes de las VLANs, separar redes significaba <em>tener switches físicos distintos</em>. Con VLANs, un solo switch puede albergar 10 "redes" totalmente aisladas entre sí.</p>

<h4>🎯 Por qué usar VLANs</h4>
<ul>
    <li><strong>Seguridad</strong>: el tráfico de RRHH no puede ver el de Ventas.</li>
    <li><strong>Reducir broadcast</strong>: cada VLAN es un dominio de broadcast separado. Menos tormentas, menos ARP.</li>
    <li><strong>Organización</strong>: el departamento "Producción" puede estar repartido por 4 plantas y seguir siendo una sola red lógica.</li>
    <li><strong>Calidad de servicio (QoS)</strong>: priorizar voz IP (VLAN 100) frente a datos (VLAN 10).</li>
    <li><strong>Cumplimiento</strong>: PCI-DSS exige aislar máquinas que procesen tarjetas. VLAN dedicada.</li>
</ul>

<h4>🔢 Numeración estándar</h4>
<ul>
    <li><strong>VLAN 1</strong>: por defecto en Cisco. <em>Nunca</em> uses la VLAN 1 para nada importante.</li>
    <li><strong>VLAN 2-1001</strong>: rango normal.</li>
    <li><strong>VLAN 1002-1005</strong>: reservadas (Token Ring, FDDI).</li>
    <li><strong>VLAN 1006-4094</strong>: rango extendido.</li>
</ul>

<div class="concept-box">
    <h4>🧠 Idea clave</h4>
    <p>Una VLAN no es "una IP" ni "una subred". Una VLAN es un <em>dominio de broadcast L2</em>. Encima de cada VLAN normalmente pones una subred IP, pero son conceptos distintos. Puedes tener una VLAN sin IP (caso de transit-only) o dos subredes en una VLAN (mala práctica pero técnicamente posible).</p>
</div>

<h4>🎨 Diseño típico de una empresa</h4>
<ul>
    <li>VLAN 10 → Datos / PCs ofimática</li>
    <li>VLAN 20 → Voz IP (teléfonos)</li>
    <li>VLAN 30 → Wifi invitados</li>
    <li>VLAN 40 → Wifi corporativo</li>
    <li>VLAN 50 → Cámaras de seguridad</li>
    <li>VLAN 99 → Management (gestión de switches/APs)</li>
    <li>VLAN 100 → DMZ (servidores expuestos)</li>
    <li>VLAN 666 → Quarantine (dispositivos sin autenticar)</li>
</ul>
    `
},
{
    title: '🎫 802.1Q: cómo viajan las VLANs entre switches',
    content: `
<p>Cuando una VLAN tiene que viajar de un switch a otro por un mismo cable, los frames Ethernet se "etiquetan" con un identificador de VLAN. Este etiquetado es el estándar <strong>IEEE 802.1Q</strong> (también llamado "dot1q").</p>

<h4>📦 La etiqueta 802.1Q</h4>
<p>Se insertan 4 bytes adicionales en cada trama Ethernet:</p>
<div class="cmd-block">
+---------+---------+----------+-------+---------+-----------+
| Dst MAC | Src MAC | <b>TPID</b>     | <b>PCP</b>   | <b>DEI</b>     | <b>VLAN ID</b>   | EtherType | Data | FCS |
| 6 bytes | 6 bytes | 0x8100   | 3bit  | 1 bit   | 12 bit    |
+---------+---------+----------+-------+---------+-----------+
</div>
<ul>
    <li><strong>TPID</strong> (Tag Protocol ID): 0x8100. Marca la trama como etiquetada.</li>
    <li><strong>PCP</strong> (Priority Code Point): 3 bits = 8 niveles de prioridad (CoS, Class of Service).</li>
    <li><strong>DEI</strong> (Drop Eligible Indicator): 1 bit. En congestión, descártame primero.</li>
    <li><strong>VLAN ID</strong>: 12 bits = 4096 VLANs posibles (la 0 y 4095 reservadas).</li>
</ul>

<h4>🚢 Modos de puerto</h4>
<ul>
    <li><strong>Access</strong>: el puerto pertenece a UNA sola VLAN. Las tramas entran/salen sin etiqueta. Es lo que usas para PCs, impresoras, etc.</li>
    <li><strong>Trunk</strong>: el puerto transporta MÚLTIPLES VLANs etiquetadas. Se usa entre switches y entre switch ↔ router/AP.</li>
    <li><strong>Hybrid</strong> (HP/Aruba): mezcla, algunas etiquetadas, otra no.</li>
</ul>

<h4>🏝️ VLAN nativa</h4>
<p>En un trunk, las tramas <strong>sin etiqueta</strong> se asignan a la "VLAN nativa". Por defecto en Cisco es la VLAN 1. <strong>Cámbiala siempre</strong>: una vulnerabilidad clásica (VLAN hopping) explota la VLAN nativa predecible.</p>

<div class="cmd-block">
<span class="cmd-comment"># Configuración de un trunk en Cisco</span>
Switch(config)# interface GigabitEthernet0/24
Switch(config-if)# switchport mode trunk
Switch(config-if)# switchport trunk encapsulation dot1q
Switch(config-if)# switchport trunk allowed vlan 10,20,30,99
Switch(config-if)# switchport trunk native vlan 999     <span class="cmd-comment"># VLAN nativa "trampa"</span>
Switch(config-if)# no shutdown
</div>
    `
},
{
    title: '📞 VLAN de voz y QoS',
    content: `
<p>Los teléfonos IP funcionan habitualmente con <strong>una sola conexión Ethernet</strong> que comparten con el PC del usuario. ¿Cómo se separan voz y datos? Con una técnica especial: la <strong>Voice VLAN</strong>.</p>

<h4>🔧 Cómo funciona</h4>
<p>El switch tiene este comportamiento:</p>
<ul>
    <li>Las tramas del PC vienen <strong>sin etiqueta</strong> → van a la VLAN de datos (10).</li>
    <li>El teléfono IP <strong>etiqueta sus propias tramas</strong> con la VLAN de voz (20) que aprende vía CDP/LLDP.</li>
    <li>Un solo cable, dos VLANs, prioridad automática para la voz.</li>
</ul>

<div class="cmd-block">
Switch(config)# interface GigabitEthernet0/5
Switch(config-if)# switchport mode access
Switch(config-if)# switchport access vlan 10           <span class="cmd-comment"># Datos</span>
Switch(config-if)# switchport voice vlan 20            <span class="cmd-comment"># Voz</span>
Switch(config-if)# mls qos trust cos                   <span class="cmd-comment"># Confía en la prioridad CoS del teléfono</span>
Switch(config-if)# spanning-tree portfast              <span class="cmd-comment"># Convergencia rápida</span>
</div>

<h4>🎶 QoS y la cola de prioridad</h4>
<p>La voz necesita <strong>baja latencia (&lt;150 ms)</strong> y <strong>jitter mínimo</strong>. Por eso se marca con prioridad alta:</p>
<ul>
    <li>Capa 2: <strong>CoS 5</strong> (PCP en la etiqueta dot1q).</li>
    <li>Capa 3: <strong>DSCP EF</strong> (Expedited Forwarding) = 46.</li>
</ul>

<h4>⚠️ Ataques de seguridad relacionados con VLANs</h4>
<div class="warning-box">
    <ul>
        <li><strong>VLAN Hopping (Double Tagging)</strong>: el atacante envía un frame con dos etiquetas. El primer switch quita la externa y reenvía con la interna a otra VLAN.<br>
        <strong>Mitigación</strong>: cambia la VLAN nativa, deshabilita DTP (<code>switchport nonegotiate</code>), apaga puertos no usados.</li>
        <li><strong>Switch Spoofing</strong>: un PC se hace pasar por switch para negociar trunk con DTP.<br>
        <strong>Mitigación</strong>: deshabilita DTP en puertos access.</li>
    </ul>
</div>

<h4>📦 VLAN privadas (PVLAN)</h4>
<p>Una técnica avanzada: dentro de una misma VLAN, divides los puertos en:</p>
<ul>
    <li><strong>Isolated</strong>: solo se comunican con puertos "promiscuos".</li>
    <li><strong>Community</strong>: se comunican entre sí y con promiscuos.</li>
    <li><strong>Promiscuous</strong>: se comunican con todos.</li>
</ul>
<p>Útil en hoteles, hospitales y residencias donde quieres que cada habitación esté aislada de las demás pero todas puedan llegar al gateway.</p>
    `
},
{
    title: '🎥 Vídeos para aprender',
    content: ''
},
{
    title: '📚 Libros y recursos',
    content: ''
}
],

// (continúa con los demás módulos - los iremos añadiendo)
};

// ============================================================================
// VÍDEOS Y LIBROS POR MÓDULO
// ============================================================================
const EXTENDED_VIDEOS = {
    'cableado-estructurado-pro': [
        { search: 'cableado estructurado curso completo español TIA 568', title: 'Curso completo de cableado estructurado', channel: 'Resultados YouTube · español', duration: '1-2 h' },
        { search: 'diferencias cable UTP categoría 5e 6 6a 7 8', title: 'Cat 5e vs Cat 6 vs Cat 6a vs Cat 7 vs Cat 8', channel: 'Comparativa de categorías', duration: '10-15 min' },
        { search: 'norma TIA 568A 568B colores RJ45 explicación', title: 'Norma T568A vs T568B explicada', channel: 'Tutorial colores RJ45', duration: '8-12 min' },
        { search: 'cómo ponchar cable RJ45 paso a paso tutorial', title: 'Cómo crimpar un RJ45 paso a paso', channel: 'Tutorial práctico', duration: '5-10 min' },
        { search: 'certificación cableado estructurado Fluke DSX tutorial', title: 'Certificación de cableado con Fluke', channel: 'Pruebas profesionales', duration: '15-25 min' },
        { search: 'cableado estructurado instalación profesional empresa', title: 'Instalaciones profesionales', channel: 'Casos reales', duration: 'varios' }
    ],
    'fibra-optica-completa': [
        { search: 'fibra óptica explicada monomodo multimodo español', title: 'Monomodo vs Multimodo explicado', channel: 'Conceptos de fibra', duration: '10-20 min' },
        { search: 'conectores fibra óptica LC SC ST FC MPO diferencias', title: 'Conectores de fibra: LC, SC, ST, FC, MPO', channel: 'Tipos de conectores', duration: '10-15 min' },
        { search: 'SFP SFP+ QSFP módulos transceptores fibra explicación', title: 'SFP, SFP+ y QSFP: transceptores ópticos', channel: 'Módulos ópticos', duration: '15-25 min' },
        { search: 'fusión fibra óptica fusionadora tutorial paso a paso', title: 'Fusión de fibra óptica paso a paso', channel: 'Procedimiento de fusión', duration: '10-20 min' },
        { search: 'GPON FTTH funcionamiento ONT OLT explicado', title: 'GPON y FTTH: la fibra hasta casa', channel: 'Tecnología de operadores', duration: '15-25 min' },
        { search: 'OTDR reflectómetro fibra óptica funcionamiento', title: 'OTDR: cómo se usa un reflectómetro', channel: 'Pruebas con OTDR', duration: '20-30 min' }
    ],
    'patch-panel-rack': [
        { id: 'Yk-6qc4cylE', title: 'Conexión de PATCH PANEL para Cableado Estructurado', channel: 'Network Warriors', duration: '18 min' },
        { search: 'cómo instalar patch panel paso a paso ponchado', title: 'Tutorial: Instalación de patch panel', channel: 'Tutoriales de ponchado', duration: '10-20 min' },
        { search: 'rack servidores organización cableado profesional', title: 'Organización profesional de racks', channel: 'Buenas prácticas en rack', duration: '15-25 min' },
        { search: 'PoE Power over Ethernet 802.3af at bt explicación', title: 'PoE: estándares y cálculo de presupuesto', channel: 'Alimentación por Ethernet', duration: '10-15 min' },
        { search: 'montar rack 19 pulgadas desde cero CPD', title: 'Cómo montar un rack desde cero', channel: 'Montaje de CPDs', duration: '20-30 min' },
        { search: 'patch panel keystone modular instalación', title: 'Patch panels modulares (keystone)', channel: 'Tipos de paneles', duration: '8-15 min' },
        { search: 'gestión cableado rack velcros peinado profesional', title: 'Gestión y peinado de cables en rack', channel: 'Estética profesional', duration: '10-20 min' }
    ],
    'vlans-trunking': [
        { search: 'VLAN explicación desde cero qué es para qué sirve', title: 'VLANs explicadas desde cero', channel: 'Conceptos básicos', duration: '15-20 min' },
        { search: '802.1Q trunking switch Cisco configuración', title: '802.1Q trunking en switches Cisco', channel: 'Trunks y etiquetado', duration: '15-25 min' },
        { search: 'configurar VLAN Packet Tracer tutorial completo', title: 'Configurar VLANs en Packet Tracer', channel: 'Práctica en simulador', duration: '15-30 min' },
        { search: 'voice VLAN voz datos teléfono IP configuración', title: 'Voice VLAN: separar voz y datos', channel: 'Telefonía IP', duration: '10-15 min' },
        { search: 'VLAN nativa seguridad VLAN hopping ataque', title: 'VLAN nativa y seguridad de trunks', channel: 'Seguridad en VLANs', duration: '10-15 min' },
        { search: 'private VLAN PVLAN configuración isolated community', title: 'Private VLANs: aislamiento dentro de la VLAN', channel: 'PVLANs en producción', duration: '15-20 min' }
    ],
    'spanning-tree': [
        { search: 'Spanning Tree Protocol STP explicado español', title: 'STP explicado desde cero', channel: 'Fundamentos de STP', duration: '15-25 min' },
        { search: 'RSTP MSTP diferencias STP convergencia rápida', title: 'STP vs RSTP vs MSTP: diferencias', channel: 'Evolución de Spanning Tree', duration: '15-25 min' },
        { search: 'configurar Spanning Tree Cisco root bridge primary', title: 'Configurar STP y root bridge en Cisco', channel: 'Configuración práctica', duration: '15-25 min' },
        { search: 'PortFast BPDU Guard Root Guard Loop Guard', title: 'PortFast, BPDU Guard y protecciones', channel: 'Funciones de protección', duration: '10-20 min' },
        { search: 'EtherChannel vs STP enlaces redundantes balanceo', title: 'EtherChannel: alternativa a STP', channel: 'Enlaces agregados', duration: '10-20 min' }
    ],
    'switch-capa3': [
        { search: 'switch capa 3 Layer 3 vs router diferencias', title: 'Switch L3 vs Router: diferencias', channel: 'Conceptos clave', duration: '10-20 min' },
        { search: 'inter VLAN routing switch capa 3 SVI configuración', title: 'Inter-VLAN routing con SVI', channel: 'Configuración paso a paso', duration: '15-25 min' },
        { search: 'SVI switch virtual interface Cisco configuración', title: 'SVI: Switch Virtual Interface', channel: 'Concepto y uso', duration: '10-15 min' },
        { search: 'routed port switch Cisco no switchport configuración', title: 'Routed ports vs SVI', channel: 'Puertos L3 puros', duration: '8-15 min' },
        { search: 'OSPF switch capa 3 configuración Cisco básico', title: 'Routing dinámico en switch L3 (OSPF)', channel: 'Routing avanzado', duration: '20-30 min' }
    ],
    'alta-disponibilidad': [
        { search: 'HSRP Cisco configuración redundancia gateway', title: 'HSRP explicado y configurado', channel: 'Redundancia de gateway', duration: '15-25 min' },
        { search: 'VRRP vs HSRP vs GLBP diferencias comparativa', title: 'VRRP vs HSRP vs GLBP', channel: 'Comparativa de FHRPs', duration: '10-20 min' },
        { search: 'LACP EtherChannel configuración switch Cisco', title: 'LACP y EtherChannel paso a paso', channel: 'Agregación de enlaces', duration: '15-25 min' },
        { search: 'HSRP tracking interface failover automático', title: 'HSRP tracking de interfaz WAN', channel: 'Tracking y failover', duration: '10-15 min' },
        { search: 'alta disponibilidad red empresarial diseño redundancia', title: 'Alta disponibilidad en redes empresariales', channel: 'Diseño profesional', duration: '20-30 min' }
    ],
    'firewalls-ngfw': [
        { search: 'firewall stateful stateless diferencias funcionamiento', title: 'Firewall stateful vs stateless', channel: 'Tipos de firewall', duration: '8-15 min' },
        { search: 'qué es NGFW next generation firewall explicación', title: '¿Qué es un NGFW?', channel: 'Firewalls modernos', duration: '10-20 min' },
        { search: 'Deep Packet Inspection DPI cómo funciona', title: 'DPI: Deep Packet Inspection', channel: 'Inspección profunda', duration: '10-15 min' },
        { search: 'pfSense tutorial firewall open source instalación', title: 'pfSense: firewall open source', channel: 'Tutoriales pfSense', duration: '25-45 min' },
        { search: 'Fortinet FortiGate NGFW configuración básica', title: 'FortiGate NGFW: introducción', channel: 'Fortinet en práctica', duration: '20-30 min' },
        { search: 'OPNsense firewall tutorial español configuración', title: 'OPNsense: alternativa a pfSense', channel: 'OPNsense en español', duration: '20-40 min' }
    ],
    'vpn-ipsec-wireguard': [
        { search: 'IPsec VPN explicado fases IKE túnel', title: 'IPsec VPN: cómo funciona', channel: 'Fundamentos de IPsec', duration: '15-25 min' },
        { search: 'WireGuard VPN tutorial instalación configuración', title: 'WireGuard: la VPN moderna', channel: 'WireGuard práctico', duration: '15-30 min' },
        { search: 'OpenVPN vs WireGuard vs IPsec comparativa', title: 'OpenVPN vs WireGuard vs IPsec', channel: 'Comparativa', duration: '15-25 min' },
        { search: 'site to site VPN Cisco IOS configuración IKEv2', title: 'Site-to-site VPN con Cisco IOS', channel: 'VPNs empresariales', duration: '20-35 min' },
        { search: 'OpenVPN servidor instalación tutorial paso a paso', title: 'Montar tu propio servidor OpenVPN', channel: 'OpenVPN paso a paso', duration: '25-40 min' }
    ],
    'acls-hardening': [
        { search: 'ACL Cisco standard extended named configuración', title: 'ACLs Cisco: standard y extended', channel: 'Listas de control de acceso', duration: '15-25 min' },
        { search: 'port security switch Cisco configuración violación', title: 'Port Security en switches Cisco', channel: 'Seguridad de puertos', duration: '10-20 min' },
        { search: '802.1X autenticación red EAP supplicant', title: '802.1X: autenticación de red', channel: 'Autenticación basada en puerto', duration: '15-25 min' },
        { search: 'hardening switch Cisco IOS configuración segura', title: 'Hardening de switches Cisco', channel: 'Endurecimiento de equipos', duration: '20-35 min' },
        { search: 'DHCP snooping Dynamic ARP Inspection configuración', title: 'DHCP Snooping y DAI', channel: 'Mitigación de ataques L2', duration: '15-20 min' }
    ],
    'ipv6-completo': [
        { search: 'IPv6 explicado desde cero direccionamiento', title: 'IPv6 explicado desde cero', channel: 'Fundamentos de IPv6', duration: '15-25 min' },
        { search: 'IPv6 SLAAC autoconfiguración Router Advertisement', title: 'SLAAC y autoconfiguración IPv6', channel: 'Cómo se asigna IPv6', duration: '15-25 min' },
        { search: 'DHCPv6 stateful stateless configuración', title: 'DHCPv6 stateful y stateless', channel: 'DHCP en IPv6', duration: '10-20 min' },
        { search: 'NDP Neighbor Discovery Protocol IPv6 ARP', title: 'NDP: el ARP de IPv6', channel: 'Descubrimiento de vecinos', duration: '10-15 min' },
        { search: 'IPv6 transición dual stack NAT64 técnicas', title: 'Transición IPv4 a IPv6', channel: 'Técnicas de migración', duration: '15-25 min' },
        { search: 'configurar IPv6 Cisco router práctico tutorial', title: 'Configurar IPv6 en Cisco', channel: 'Configuración práctica', duration: '15-30 min' }
    ],
    'sdn-sdwan': [
        { search: 'SDN Software Defined Networking explicado', title: 'SDN explicado desde cero', channel: 'Fundamentos SDN', duration: '10-20 min' },
        { search: 'SD-WAN qué es funcionamiento ventajas MPLS', title: 'SD-WAN: la WAN moderna', channel: 'WAN definida por software', duration: '15-25 min' },
        { search: 'OpenFlow protocolo SDN control plane', title: 'OpenFlow y el control plane', channel: 'Protocolos SDN', duration: '15-25 min' },
        { search: 'VXLAN EVPN data center spine leaf explicado', title: 'VXLAN y EVPN: redes de CPD modernas', channel: 'Arquitectura moderna', duration: '20-30 min' },
        { search: 'SASE Secure Access Service Edge concepto', title: 'SASE: red y seguridad convergentes', channel: 'Tendencias 2026', duration: '10-20 min' }
    ],
    'redes-docker': [
        { search: 'Docker networking explicado bridge host overlay', title: 'Docker networking: bridge, host, overlay', channel: 'Fundamentos de red Docker', duration: '20-35 min' },
        { search: 'Docker macvlan tutorial contenedor red física', title: 'Docker macvlan: contenedor en la LAN', channel: 'Macvlan en la práctica', duration: '15-25 min' },
        { search: 'Docker compose redes networks tutorial', title: 'Docker compose y redes personalizadas', channel: 'Compose y networking', duration: '20-30 min' },
        { search: 'Kubernetes networking explicado services ingress', title: 'Networking en Kubernetes', channel: 'Redes en K8s', duration: '25-45 min' },
        { search: 'Docker swarm overlay network multi host', title: 'Docker Swarm: red overlay multi-host', channel: 'Orquestación con Swarm', duration: '15-30 min' }
    ],
    'wifi6-7': [
        { search: 'WiFi 6 vs WiFi 6E vs WiFi 7 diferencias', title: 'WiFi 6 vs 6E vs 7: comparativa', channel: 'Generaciones de WiFi', duration: '10-20 min' },
        { search: 'OFDMA MU-MIMO WiFi 6 explicación funcionamiento', title: 'OFDMA y MU-MIMO explicados', channel: 'Tecnologías WiFi 6', duration: '15-25 min' },
        { search: 'MLO Multi Link Operation WiFi 7 explicado', title: 'MLO: la novedad de WiFi 7', channel: 'WiFi 7 a fondo', duration: '10-20 min' },
        { search: 'banda 6 GHz WiFi 6E canales nuevo espectro', title: 'La banda de 6 GHz en WiFi 6E', channel: 'Nuevo espectro WiFi', duration: '10-15 min' },
        { search: 'TWT Target Wake Time WiFi 6 IoT batería', title: 'TWT: WiFi 6 para IoT', channel: 'Ahorro energético', duration: '8-15 min' },
        { search: 'WPA3 SAE seguridad WiFi nueva generación', title: 'WPA3: la nueva seguridad WiFi', channel: 'Cifrado moderno', duration: '10-15 min' }
    ],
    'wifi-mesh-roaming': [
        { search: 'WiFi mesh explicado vs repetidor diferencias', title: 'WiFi mesh vs repetidor', channel: 'Cómo funciona mesh', duration: '10-20 min' },
        { search: 'roaming WiFi 802.11k 802.11r 802.11v fast transition', title: 'Roaming 802.11k/r/v', channel: 'Roaming profesional', duration: '15-25 min' },
        { search: 'site survey WiFi heatmap diseño cobertura', title: 'Site survey y heatmaps WiFi', channel: 'Diseño de cobertura', duration: '20-30 min' },
        { search: 'sticky client WiFi problema cliente pegado AP', title: 'El problema del sticky client', channel: 'Optimización de roaming', duration: '10-15 min' },
        { search: 'UniFi mesh setup configuración Ubiquiti', title: 'Configurar UniFi mesh', channel: 'Ejemplo práctico UniFi', duration: '15-30 min' }
    ],
    'wifi-empresarial': [
        { search: 'WPA2 Enterprise vs WPA2 Personal diferencias', title: 'WPA2 Personal vs Enterprise', channel: 'Tipos de autenticación WiFi', duration: '10-15 min' },
        { search: '802.1X EAP autenticación WiFi empresarial', title: '802.1X y EAP explicados', channel: 'Autenticación empresarial', duration: '15-25 min' },
        { search: 'FreeRADIUS instalación configuración Linux WiFi', title: 'Configurar FreeRADIUS para WiFi', channel: 'Tutorial FreeRADIUS', duration: '25-45 min' },
        { search: 'EAP-TLS certificados WiFi empresarial PKI', title: 'EAP-TLS con certificados', channel: 'Autenticación por certificado', duration: '20-30 min' },
        { search: 'captive portal WiFi invitados hotspot configuración', title: 'Captive portals e invitados', channel: 'Portales cautivos', duration: '15-25 min' }
    ]
};

// LIBROS POR MÓDULO (referencias al catálogo PUBLIC_BOOKS + libros específicos)
const EXTENDED_BOOKS = {
    'cableado-estructurado-pro': [
        PUBLIC_BOOKS.tiaTabasco,
        PUBLIC_BOOKS.tanenbaum,
        {
            title: 'Manual de Cableado Estructurado',
            author: 'Panduit',
            desc: 'Manual técnico del fabricante. Diseño, instalación y prueba de cableado estructurado profesional.',
            url: 'https://www.panduit.com/en/products/cabling-systems/copper-systems.html',
            license: '🆓 Documento técnico'
        },
        {
            title: 'BICSI Telecommunications Distribution Methods Manual',
            author: 'BICSI',
            desc: 'La biblia mundial del cableado estructurado. Referencia profesional.',
            url: 'https://www.bicsi.org/standards/standards-purchase',
            license: '💰 De pago (algunos capítulos abiertos)'
        }
    ],
    'fibra-optica-completa': [
        PUBLIC_BOOKS.tanenbaum,
        {
            title: 'Manual de Fibra Óptica',
            author: 'Corning',
            desc: 'Guía técnica de Corning, uno de los mayores fabricantes mundiales. Tipos, instalación, pruebas.',
            url: 'https://www.corning.com/optical-communications/worldwide/en/home/resources.html',
            license: '🆓 Recurso del fabricante'
        },
        {
            title: 'Fiber Optics Reference Guide (4ª ed.)',
            author: 'David R. Goff',
            desc: 'Libro de referencia clásico sobre fibra óptica. Disponible en bibliotecas técnicas.',
            url: 'https://www.fiber-optics.info/',
            license: '📚 Comercial / extractos gratis'
        },
        {
            title: 'Guía técnica de fibra óptica para FTTH',
            author: 'COIT (Colegio de Ingenieros de Telecomunicación de España)',
            desc: 'Guía profesional para despliegues de FTTH en España.',
            url: 'https://www.coit.es/comunicacion/publicaciones',
            license: '🆓 Recurso colegial'
        }
    ],
    'patch-panel-rack': [
        PUBLIC_BOOKS.tiaTabasco,
        {
            title: 'Data Center Cabling Installation Best Practices',
            author: 'Panduit / CommScope',
            desc: 'Manual de buenas prácticas en CPDs. Gestión de cableado, racks, refrigeración.',
            url: 'https://www.commscope.com/resources/',
            license: '🆓 Documento técnico'
        },
        {
            title: 'IEEE 802.3 (PoE estándares)',
            author: 'IEEE Standards Association',
            desc: 'Estándar oficial de Ethernet y PoE. Lectura técnica de referencia.',
            url: 'https://standards.ieee.org/standard/802_3-2022.html',
            license: '🆓 Acceso libre'
        }
    ],
    'vlans-trunking': [
        PUBLIC_BOOKS.tanenbaum,
        PUBLIC_BOOKS.ciscoPress,
        {
            title: 'IEEE 802.1Q-2018 (Bridges and Bridged Networks)',
            author: 'IEEE',
            desc: 'Estándar oficial de VLANs y bridging. Lectura técnica avanzada.',
            url: 'https://standards.ieee.org/standard/802_1Q-2018.html',
            license: '🆓 Acceso libre'
        },
        {
            title: 'CCNA 200-301 Official Cert Guide',
            author: 'Wendell Odom',
            desc: 'El libro de preparación para el CCNA. Cubre VLANs, trunking, STP, routing en profundidad.',
            url: 'https://www.ciscopress.com/store/ccna-200-301-official-cert-guide-library-9780136792680',
            license: '💰 Comercial (sample chapters libres)'
        }
    ],
    'spanning-tree': [
        PUBLIC_BOOKS.tanenbaum,
        PUBLIC_BOOKS.ciscoPress,
        {
            title: 'IEEE 802.1D y 802.1w (STP/RSTP)',
            author: 'IEEE',
            desc: 'Estándares oficiales de Spanning Tree.',
            url: 'https://standards.ieee.org/standard/802_1D-2004.html',
            license: '🆓 Acceso libre'
        }
    ],
    'switch-capa3': [
        PUBLIC_BOOKS.ciscoPress,
        PUBLIC_BOOKS.tanenbaum,
        {
            title: 'Cisco Catalyst 9000 Configuration Guide',
            author: 'Cisco',
            desc: 'Documentación oficial de los switches actuales más usados. Inter-VLAN, SVI, routing.',
            url: 'https://www.cisco.com/c/en/us/support/switches/catalyst-9300-series-switches/products-installation-and-configuration-guides-list.html',
            license: '🆓 Cisco documentation'
        }
    ],
    'alta-disponibilidad': [
        PUBLIC_BOOKS.tanenbaum,
        {
            title: 'RFC 5798 — Virtual Router Redundancy Protocol (VRRP)',
            author: 'S. Nadas',
            desc: 'Especificación de VRRP, el estándar abierto frente al HSRP de Cisco.',
            url: 'https://www.rfc-editor.org/rfc/rfc5798',
            license: '🆓 RFC libre'
        },
        {
            title: 'IEEE 802.1AX (Link Aggregation)',
            author: 'IEEE',
            desc: 'Estándar de LACP y agregación de enlaces.',
            url: 'https://standards.ieee.org/standard/802_1AX-2020.html',
            license: '🆓 Acceso libre'
        }
    ],
    'firewalls-ngfw': [
        PUBLIC_BOOKS.tanenbaum,
        {
            title: 'pfSense: The Definitive Guide',
            author: 'Christopher M. Buechler',
            desc: 'Manual del firewall open source más usado. Reglas, NAT, VPN, alta disponibilidad.',
            url: 'https://docs.netgate.com/pfsense/en/latest/',
            license: '🆓 Documentación oficial'
        },
        {
            title: 'NIST SP 800-41 — Guidelines on Firewalls',
            author: 'National Institute of Standards and Technology',
            desc: 'Guía oficial del NIST sobre tecnologías de firewall.',
            url: 'https://csrc.nist.gov/publications/detail/sp/800-41/rev-1/final',
            license: '🆓 Documento público'
        },
        {
            title: 'OWASP Top 10',
            author: 'OWASP Foundation',
            desc: 'Las 10 vulnerabilidades web más críticas. Lectura imprescindible para diseñar reglas de NGFW.',
            url: 'https://owasp.org/www-project-top-ten/',
            license: '🆓 Creative Commons'
        }
    ],
    'vpn-ipsec-wireguard': [
        PUBLIC_BOOKS.tanenbaum,
        {
            title: 'RFC 4301 — Security Architecture for IP (IPsec)',
            author: 'S. Kent, K. Seo',
            desc: 'Arquitectura completa de IPsec. Lectura técnica avanzada.',
            url: 'https://www.rfc-editor.org/rfc/rfc4301',
            license: '🆓 RFC libre'
        },
        {
            title: 'WireGuard Whitepaper',
            author: 'Jason A. Donenfeld',
            desc: 'El paper original que diseñó WireGuard. 12 páginas brillantes.',
            url: 'https://www.wireguard.com/papers/wireguard.pdf',
            license: '🆓 Open source'
        },
        {
            title: 'OpenVPN Documentation',
            author: 'OpenVPN Inc.',
            desc: 'Documentación oficial completa de OpenVPN. Servidor, cliente, certificados, scripts.',
            url: 'https://openvpn.net/community-resources/',
            license: '🆓 Open source'
        }
    ],
    'acls-hardening': [
        PUBLIC_BOOKS.ciscoPress,
        {
            title: 'CIS Benchmarks — Cisco IOS',
            author: 'Center for Internet Security',
            desc: 'Guía oficial de hardening de switches y routers Cisco. Una checklist profesional.',
            url: 'https://www.cisecurity.org/benchmark/cisco',
            license: '🆓 CIS Pro (gratis con registro)'
        },
        {
            title: 'NIST SP 800-53 — Security Controls',
            author: 'NIST',
            desc: 'Catálogo de controles de seguridad para sistemas federales USA. Referencia universal.',
            url: 'https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final',
            license: '🆓 Documento público'
        }
    ],
    'ipv6-completo': [
        PUBLIC_BOOKS.rfc8200,
        PUBLIC_BOOKS.tanenbaum,
        {
            title: 'IPv6 Essentials (3ª edición)',
            author: 'Silvia Hagen',
            desc: 'Libro de referencia sobre IPv6. Direccionamiento, NDP, despliegue.',
            url: 'https://www.oreilly.com/library/view/ipv6-essentials-3rd/9781449335236/',
            license: '💰 O\'Reilly (extractos libres)'
        },
        {
            title: 'IPv6 en RedIRIS',
            author: 'RedIRIS (Red Académica Española)',
            desc: 'Guías y manuales en español sobre despliegue de IPv6.',
            url: 'https://www.rediris.es/ipv6/',
            license: '🆓 Recurso académico español'
        },
        {
            title: 'RFC 4291 — IPv6 Addressing Architecture',
            author: 'R. Hinden, S. Deering',
            desc: 'Especificación oficial del direccionamiento IPv6.',
            url: 'https://www.rfc-editor.org/rfc/rfc4291',
            license: '🆓 RFC libre'
        }
    ],
    'sdn-sdwan': [
        {
            title: 'Software-Defined Networks: A Systems Approach',
            author: 'Larry Peterson y Bruce Davie',
            desc: 'Libro abierto sobre SDN escrito por dos referentes mundiales.',
            url: 'https://sdn.systemsapproach.org/',
            license: '🆓 Creative Commons'
        },
        {
            title: 'OpenFlow Switch Specification',
            author: 'Open Networking Foundation',
            desc: 'Especificación oficial de OpenFlow, el protocolo más conocido de SDN.',
            url: 'https://opennetworking.org/sdn-resources/onf-specifications/openflow/',
            license: '🆓 ONF'
        },
        {
            title: 'SD-WAN for Dummies',
            author: 'Cisco / Cloudflare',
            desc: 'Guía introductoria a SD-WAN, casos de uso y arquitectura.',
            url: 'https://www.cisco.com/c/en/us/solutions/enterprise-networks/sd-wan/index.html',
            license: '🆓 Documento patrocinado'
        }
    ],
    'redes-docker': [
        {
            title: 'Docker Networking Overview',
            author: 'Docker Inc.',
            desc: 'Documentación oficial de redes en Docker. Bridge, host, overlay, macvlan.',
            url: 'https://docs.docker.com/network/',
            license: '🆓 Documentación oficial'
        },
        {
            title: 'Kubernetes Networking',
            author: 'Kubernetes.io',
            desc: 'Documentación oficial de redes en Kubernetes. Services, Ingress, CNI.',
            url: 'https://kubernetes.io/docs/concepts/services-networking/',
            license: '🆓 Apache 2.0'
        },
        {
            title: 'Docker Deep Dive',
            author: 'Nigel Poulton',
            desc: 'Libro de referencia sobre Docker, con capítulos sobre networking.',
            url: 'https://nigelpoulton.com/',
            license: '💰 Comercial (sample libre)'
        }
    ],
    'wifi6-7': [
        {
            title: 'WiFi Alliance — Documentación técnica',
            author: 'Wi-Fi Alliance',
            desc: 'Especificaciones oficiales de WiFi 6, 6E y 7. Hojas técnicas, certificación.',
            url: 'https://www.wi-fi.org/discover-wi-fi',
            license: '🆓 Recursos de la alianza'
        },
        {
            title: '802.11ax for Dummies',
            author: 'Aruba (HPE)',
            desc: 'Guía didáctica sobre WiFi 6: OFDMA, MU-MIMO, TWT.',
            url: 'https://www.arubanetworks.com/resource-library/?filter_term=802.11ax',
            license: '🆓 PDF de Aruba'
        },
        {
            title: 'IEEE 802.11be (WiFi 7)',
            author: 'IEEE',
            desc: 'Estándar oficial de WiFi 7. MLO, canales 320 MHz, 4K-QAM.',
            url: 'https://standards.ieee.org/ieee/802.11be/7516/',
            license: '🆓 Acceso libre'
        },
        {
            title: 'CWNA-109 Study Guide',
            author: 'David D. Coleman, David A. Westcott',
            desc: 'Libro de referencia para la certificación Certified Wireless Network Administrator.',
            url: 'https://www.cwnp.com/certifications/cwna',
            license: '💰 Comercial'
        }
    ],
    'wifi-mesh-roaming': [
        {
            title: 'WiFi Roaming Whitepaper',
            author: 'Aruba Networks',
            desc: 'Documento técnico sobre roaming 802.11k/r/v y fast transition.',
            url: 'https://www.arubanetworks.com/resource-library/?filter_term=roaming',
            license: '🆓 Aruba'
        },
        {
            title: 'IEEE 802.11s (Mesh Networking)',
            author: 'IEEE',
            desc: 'Estándar oficial de mesh WiFi.',
            url: 'https://standards.ieee.org/standard/802_11s-2011.html',
            license: '🆓 Acceso libre'
        },
        {
            title: 'WiFi en entornos densos',
            author: 'Ekahau',
            desc: 'Guías profesionales de diseño WiFi (heatmaps, predictive site survey).',
            url: 'https://www.ekahau.com/resources/',
            license: '🆓 Recursos del fabricante'
        }
    ],
    'wifi-empresarial': [
        {
            title: 'FreeRADIUS Documentation',
            author: 'FreeRADIUS Project',
            desc: 'Documentación oficial del servidor RADIUS open source más usado.',
            url: 'https://freeradius.org/documentation/',
            license: '🆓 GPL'
        },
        {
            title: 'RFC 3748 — Extensible Authentication Protocol (EAP)',
            author: 'B. Aboba et al.',
            desc: 'Especificación oficial de EAP, base de la autenticación 802.1X.',
            url: 'https://www.rfc-editor.org/rfc/rfc3748',
            license: '🆓 RFC libre'
        },
        {
            title: 'NIST SP 800-153 — Guidelines for Securing Wireless LANs',
            author: 'NIST',
            desc: 'Guía oficial sobre cómo asegurar redes WiFi empresariales.',
            url: 'https://csrc.nist.gov/publications/detail/sp/800-153/final',
            license: '🆓 Documento público'
        },
        {
            title: 'EAP-TLS Deployment Guide',
            author: 'Cisco',
            desc: 'Guía detallada de despliegue de EAP-TLS con certificados.',
            url: 'https://www.cisco.com/c/en/us/support/wireless/wireless-lan-controller-software/series.html',
            license: '🆓 Cisco docs'
        }
    ]
};
