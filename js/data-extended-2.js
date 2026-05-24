/* ============================================
   DATA-EXTENDED-2.JS — Continuación de módulos
   Spanning Tree, Switch L3, HA, Seguridad, IPv6, SDN, Docker, WiFi
   ============================================ */

// Añadimos al objeto EXTENDED_CONTENT
Object.assign(EXTENDED_CONTENT, {

// ============================================================================
// SPANNING TREE PROTOCOL
// ============================================================================
'spanning-tree': [
{
    title: '🌳 ¿Por qué existe STP? El problema del bucle L2',
    content: `
<p>Imagina dos switches conectados entre sí <strong>por dos cables</strong> (para redundancia). Si un PC conectado al switch A envía un broadcast (por ejemplo, un ARP request), pasa algo terrible:</p>

<ol>
    <li>El switch A reenvía el broadcast por <strong>todos sus puertos</strong>, incluido el enlace al switch B.</li>
    <li>El switch B recibe el broadcast y lo reenvía por todos sus puertos, incluido el <em>otro</em> enlace al switch A.</li>
    <li>El switch A recibe de nuevo el broadcast por el segundo enlace y lo vuelve a reenviar...</li>
    <li>El bucle nunca termina: el frame se multiplica exponencialmente.</li>
</ol>

<div class="warning-box">
    ⚠️ Esto se llama <strong>broadcast storm</strong> y en segundos colapsa toda la red. Los switches no tienen TTL como IP, por lo que el frame circula indefinidamente.
</div>

<h4>💡 La solución: Spanning Tree Protocol</h4>
<p>STP (IEEE 802.1D) es un algoritmo que <strong>detecta bucles y bloquea uno de los caminos redundantes</strong>, dejando solo un camino activo. Si el camino activo falla, STP desbloquea automáticamente el de respaldo.</p>

<p>Es como un GPS de la red: te indica por dónde ir y te avisa de calles cortadas. Solo que en lugar de carreteras, son cables.</p>

<h4>🏆 Bridge ID y root bridge</h4>
<p>Cada switch tiene un <strong>Bridge ID</strong> = <em>prioridad (16 bits) + MAC (48 bits)</em>. STP elige como <strong>root bridge</strong> al switch con el Bridge ID más bajo.</p>

<p>Por defecto, todos los switches tienen prioridad <strong>32768</strong>. Como las MACs son únicas, el switch más "antiguo" (MAC más baja) gana. Pero esto es un desastre: el switch más viejo y posiblemente menos potente termina haciendo de root.</p>

<div class="cmd-block">
<span class="cmd-comment"># Forzar a un switch concreto a ser el root</span>
Switch(config)# spanning-tree vlan 10 priority 4096
<span class="cmd-comment"># O usar el shortcut</span>
Switch(config)# spanning-tree vlan 10 root primary
Switch(config)# spanning-tree vlan 10 root secondary    <span class="cmd-comment"># En el switch de backup</span>
</div>

<h4>📡 BPDUs: el chismorreo entre switches</h4>
<p>STP funciona enviando mensajes llamados <strong>BPDU</strong> (Bridge Protocol Data Units) cada 2 segundos por todos los puertos. Estos mensajes contienen:</p>
<ul>
    <li>Quién soy yo (Bridge ID).</li>
    <li>Quién creo que es el root.</li>
    <li>Cuál es mi coste para llegar al root.</li>
</ul>

<p>Los switches comparan las BPDUs que reciben y deciden colectivamente:</p>
<ul>
    <li>Quién es el root bridge.</li>
    <li>Qué puerto de cada switch es el <strong>root port</strong> (el que lleva al root con menor coste).</li>
    <li>Qué puertos son <strong>designated</strong> (los que reenvían tráfico en cada segmento).</li>
    <li>Qué puertos quedan <strong>blocked</strong> (los redundantes que NO reenvían).</li>
</ul>
    `
},
{
    title: '⏱️ Estados, temporizadores y convergencia',
    content: `
<h4>🚦 Estados de un puerto STP (802.1D clásico)</h4>
<ol>
    <li><strong>Blocking</strong> (20s) — escucha BPDUs, no reenvía nada.</li>
    <li><strong>Listening</strong> (15s) — empieza a procesar BPDUs activamente.</li>
    <li><strong>Learning</strong> (15s) — aprende direcciones MAC pero no reenvía datos.</li>
    <li><strong>Forwarding</strong> — operativo, reenvía tráfico.</li>
    <li><strong>Disabled</strong> — apagado administrativamente.</li>
</ol>

<div class="warning-box">
    ⚠️ STP clásico tarda <strong>30-50 segundos</strong> en converger. Eso es eterno en redes modernas. Por eso nace RSTP.
</div>

<h4>⚡ RSTP — Rapid Spanning Tree (802.1w)</h4>
<p>RSTP es una evolución que converge en <strong>menos de 1 segundo</strong>. Cambios clave:</p>
<ul>
    <li>Reduce los estados a 3: Discarding, Learning, Forwarding.</li>
    <li>Define nuevos roles: Root, Designated, <strong>Alternate</strong> (backup directo al root) y <strong>Backup</strong> (backup al segmento).</li>
    <li>Negociación proactiva entre switches en lugar de timers fijos.</li>
    <li>Compatible hacia atrás con STP clásico.</li>
</ul>

<h4>🌲 PVST+ y Rapid PVST+ (Cisco)</h4>
<p>El problema de STP estándar es que solo mantiene <strong>una instancia para toda la red</strong>. Si tienes 4 VLANs, las 4 usan el mismo árbol. No puedes hacer balanceo de carga.</p>

<p>Cisco creó <strong>PVST+</strong> (Per-VLAN Spanning Tree): una instancia STP por cada VLAN. Así puedes hacer que la VLAN 10 use un trunk y la VLAN 20 use el otro.</p>

<h4>🚀 MSTP — Multiple Spanning Tree (802.1s)</h4>
<p>PVST+ consume muchos recursos si tienes 100 VLANs. <strong>MSTP</strong> agrupa varias VLANs en <em>instancias</em>. Por ejemplo: VLANs 10-50 → instancia 1, VLANs 51-100 → instancia 2. Solo 2 árboles en vez de 100.</p>

<div class="cmd-block">
<span class="cmd-comment"># MSTP en Cisco</span>
Switch(config)# spanning-tree mode mst
Switch(config)# spanning-tree mst configuration
Switch(config-mst)# name REDACADEMIA
Switch(config-mst)# revision 1
Switch(config-mst)# instance 1 vlan 10,20,30
Switch(config-mst)# instance 2 vlan 100,200
Switch(config-mst)# exit
</div>

<h4>🛡️ Funciones de protección</h4>
<ul>
    <li><strong>PortFast</strong>: en puertos access (PCs, impresoras), pasa directamente a forwarding. No esperes 30s para que un PC arranque.</li>
    <li><strong>BPDU Guard</strong>: si un puerto PortFast recibe una BPDU (alguien conectó un switch donde no debía), lo apaga.</li>
    <li><strong>Root Guard</strong>: protege la jerarquía. Si llega una BPDU "superior", bloquea ese puerto.</li>
    <li><strong>Loop Guard</strong>: previene bucles por unidirectional links.</li>
    <li><strong>UDLD</strong>: detecta enlaces unidireccionales (fibra rota en un sentido).</li>
</ul>

<div class="concept-box">
    <h4>🧠 Buena práctica</h4>
    <p>En 2026, lo correcto es usar <strong>Rapid PVST+</strong> en pymes y <strong>MSTP</strong> en redes grandes. STP clásico (802.1D) está obsoleto.<br>
    Habilita PortFast + BPDU Guard en todos los puertos de acceso. En los uplinks entre switches, Root Guard.</p>
</div>
    `
},
{
    title: '🚫 Alternativas modernas a STP',
    content: `
<p>STP se inventó en 1985. En 40 años han salido alternativas que <strong>no bloquean enlaces</strong>: aprovechan los caminos redundantes para hacer load balancing real.</p>

<h4>🔗 Link Aggregation (LACP / 802.3ad)</h4>
<p>Agrupa varios enlaces físicos como uno lógico de mayor capacidad. STP los ve como un solo puerto y no los bloquea.</p>
<ul>
    <li>2 × 1G → 2G (con LACP).</li>
    <li>4 × 10G → 40G entre switch de core y distribución.</li>
</ul>

<h4>🔄 MLAG / VPC (Multi-Chassis Link Aggregation)</h4>
<p>Lo mismo que LACP, pero los dos extremos están en switches <em>distintos</em>. Da redundancia activa-activa:</p>
<ul>
    <li><strong>Cisco vPC</strong>: en Nexus.</li>
    <li><strong>Arista MLAG</strong>.</li>
    <li><strong>Aruba VSF / Backplane Stacking</strong>.</li>
</ul>

<h4>🧱 TRILL y SPB</h4>
<p>Protocolos que sustituyen STP en redes grandes. Usan algoritmos de routing (IS-IS) en capa 2. Permiten múltiples caminos activos simultáneos. Cada vez más raros — los reemplaza la arquitectura <strong>spine-leaf con EVPN/VXLAN</strong>.</p>

<h4>🍃 Spine-Leaf</h4>
<p>La topología moderna en data centers:</p>
<ul>
    <li><strong>Leaves</strong>: switches de acceso donde se conectan servidores.</li>
    <li><strong>Spines</strong>: switches de núcleo, cada leaf se conecta a TODOS los spines.</li>
</ul>
<p>Cada servidor está siempre a 2 saltos. Todos los enlaces están activos (no se bloquea ninguno). Escala horizontalmente añadiendo spines o leaves.</p>

<div class="curiosity-box">
    <h4>💡 Trivia técnica</h4>
    <p>STP fue inventado en 1985 por <strong>Radia Perlman</strong>, ingeniera del Digital Equipment Corporation. Le pidieron resolver el problema de los bucles "antes del lunes". Lo escribió en un avión durante el fin de semana, con un poema que documenta el algoritmo (en serio: el RFC original incluye versos suyos). Hoy se la conoce como "la madre de Internet".</p>
</div>
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
// SWITCH CAPA 3
// ============================================================================
'switch-capa3': [
{
    title: '🔀 ¿Qué es un switch capa 3?',
    content: `
<p>Un <strong>switch capa 3</strong> (también llamado "multilayer switch" o L3 switch) es un híbrido: hace switching ultra-rápido como un switch L2 normal, <strong>pero además</strong> puede enrutar tráfico entre VLANs sin necesitar un router externo.</p>

<h4>🥊 Switch L3 vs Router</h4>
<table>
    <thead><tr><th>Característica</th><th>Switch L3</th><th>Router</th></tr></thead>
    <tbody>
        <tr><td>Puertos</td><td>24-48 Gigabit</td><td>4-8 puertos típicamente</td></tr>
        <tr><td>Velocidad</td><td>Línea (wire-speed, hardware ASIC)</td><td>Limitado por CPU</td></tr>
        <tr><td>Interfaces WAN</td><td>No (solo Ethernet)</td><td>Sí (Serial, ADSL, etc.)</td></tr>
        <tr><td>NAT</td><td>Limitado o no</td><td>Sí, completo</td></tr>
        <tr><td>Filtrado avanzado</td><td>ACLs básicas</td><td>ACLs avanzadas, QoS, NBAR</td></tr>
        <tr><td>Coste por puerto</td><td>Bajo</td><td>Alto</td></tr>
        <tr><td>Uso típico</td><td>Inter-VLAN en LAN</td><td>Salida a internet, WAN</td></tr>
    </tbody>
</table>

<p>En una empresa típica: el switch L3 enruta entre las VLANs internas, y un router (o firewall) se ocupa de la salida a internet.</p>

<h4>🚀 ¿Por qué es tan rápido?</h4>
<p>Un router clásico procesa cada paquete por CPU. Un switch L3 usa <strong>ASICs</strong> (chips dedicados): cachea las decisiones de routing y reenvía los siguientes paquetes a velocidad de línea. La técnica se llama <strong>Cisco Express Forwarding (CEF)</strong>.</p>
    `
},
{
    title: '⚙️ Configurar inter-VLAN routing con SVI',
    content: `
<p>Vamos al tutorial práctico. Tenemos un switch capa 3 con 4 VLANs:</p>
<ul>
    <li>VLAN 10 (Ventas) — 192.168.10.0/24, gateway 192.168.10.1</li>
    <li>VLAN 20 (RRHH) — 192.168.20.0/24, gateway 192.168.20.1</li>
    <li>VLAN 30 (Voz) — 192.168.30.0/24, gateway 192.168.30.1</li>
    <li>VLAN 99 (Gestión) — 192.168.99.0/24, gateway 192.168.99.1</li>
</ul>

<h4>📋 Paso 1: habilitar IP routing</h4>
<div class="cmd-block">
Switch(config)# <b>ip routing</b>
<span class="cmd-comment"># Crítico. Sin este comando el switch L3 actúa como L2.</span>
</div>

<h4>📋 Paso 2: crear las VLANs</h4>
<div class="cmd-block">
Switch(config)# vlan 10
Switch(config-vlan)# name VENTAS
Switch(config-vlan)# exit
Switch(config)# vlan 20
Switch(config-vlan)# name RRHH
Switch(config-vlan)# exit
Switch(config)# vlan 30
Switch(config-vlan)# name VOZ
Switch(config-vlan)# exit
Switch(config)# vlan 99
Switch(config-vlan)# name MGMT
Switch(config-vlan)# exit
</div>

<h4>📋 Paso 3: crear las SVI (Switch Virtual Interfaces)</h4>
<p>Una SVI es la "cara L3" de una VLAN. Es la IP que tendrán como gateway todos los dispositivos de esa VLAN.</p>

<div class="cmd-block">
Switch(config)# interface vlan 10
Switch(config-if)# description Gateway VLAN Ventas
Switch(config-if)# ip address 192.168.10.1 255.255.255.0
Switch(config-if)# no shutdown
Switch(config-if)# exit

Switch(config)# interface vlan 20
Switch(config-if)# ip address 192.168.20.1 255.255.255.0
Switch(config-if)# no shutdown
Switch(config-if)# exit

Switch(config)# interface vlan 30
Switch(config-if)# ip address 192.168.30.1 255.255.255.0
Switch(config-if)# no shutdown
Switch(config-if)# exit

Switch(config)# interface vlan 99
Switch(config-if)# ip address 192.168.99.1 255.255.255.0
Switch(config-if)# no shutdown
</div>

<h4>📋 Paso 4: asignar puertos a las VLANs</h4>
<div class="cmd-block">
Switch(config)# interface range Gi0/1 - 8
Switch(config-if-range)# switchport mode access
Switch(config-if-range)# switchport access vlan 10
Switch(config-if-range)# exit

Switch(config)# interface range Gi0/9 - 16
Switch(config-if-range)# switchport mode access
Switch(config-if-range)# switchport access vlan 20
Switch(config-if-range)# exit

<span class="cmd-comment"># Puerto trunk hacia el switch de acceso de la planta 2</span>
Switch(config)# interface Gi0/24
Switch(config-if)# switchport trunk encapsulation dot1q
Switch(config-if)# switchport mode trunk
Switch(config-if)# switchport trunk allowed vlan 10,20,30,99
</div>

<h4>📋 Paso 5: ruta por defecto al router</h4>
<div class="cmd-block">
<span class="cmd-comment"># Conectamos el switch L3 a un router que sale a internet en 200.45.10.0/30</span>
Switch(config)# interface Gi0/48
Switch(config-if)# no switchport         <span class="cmd-comment"># Convierte el puerto en L3 puro</span>
Switch(config-if)# ip address 200.45.10.2 255.255.255.252
Switch(config-if)# no shutdown
Switch(config-if)# exit

Switch(config)# ip route 0.0.0.0 0.0.0.0 200.45.10.1
</div>

<h4>📋 Paso 6: verificar</h4>
<div class="cmd-block">
Switch# show ip interface brief
Switch# show ip route
Switch# show vlan brief
Switch# show interfaces trunk
</div>
    `
},
{
    title: '🔀 SVI vs Routed Port',
    content: `
<p>En un switch L3 tienes dos formas de tener una interfaz IP:</p>

<h4>🎫 SVI — Switch Virtual Interface</h4>
<ul>
    <li>Es una interfaz <em>virtual</em> asociada a una VLAN.</li>
    <li>Lleva tráfico de todos los puertos que estén en esa VLAN.</li>
    <li>Comando: <code>interface vlan X</code>.</li>
    <li>Estado UP cuando AL MENOS un puerto físico de la VLAN está UP.</li>
    <li>Uso típico: gateway de una VLAN.</li>
</ul>

<h4>🔌 Routed Port</h4>
<ul>
    <li>Un puerto físico convertido en interfaz L3 pura. No es L2, no participa en VLANs ni en trunks.</li>
    <li>Comando: <code>no switchport</code> + <code>ip address</code>.</li>
    <li>Estado UP cuando el puerto físico está UP.</li>
    <li>Uso típico: conexión point-to-point con un router u otro switch L3.</li>
</ul>

<div class="concept-box">
    <h4>💡 ¿Cuándo usar cada uno?</h4>
    <ul>
        <li><strong>SVI</strong>: para hacer de gateway de una VLAN poblada de hosts.</li>
        <li><strong>Routed port</strong>: para uplinks "limpios" entre switches L3, donde no quieres complicarte con VLANs.</li>
    </ul>
</div>

<h4>🛣️ Routing dinámico opcional</h4>
<p>Hasta ahora hemos hecho rutas estáticas. Pero un switch L3 puede correr OSPF, EIGRP, BGP, RIP:</p>

<div class="cmd-block">
<span class="cmd-comment"># OSPF muy básico</span>
Switch(config)# router ospf 1
Switch(config-router)# network 192.168.10.0 0.0.0.255 area 0
Switch(config-router)# network 192.168.20.0 0.0.0.255 area 0
Switch(config-router)# network 200.45.10.0 0.0.0.3 area 0
Switch(config-router)# passive-interface vlan 10
Switch(config-router)# passive-interface vlan 20
</div>

<h4>🎯 DHCP relay</h4>
<p>Si el servidor DHCP no está en la misma VLAN, hay que decirle al switch L3 que reenvíe las peticiones:</p>

<div class="cmd-block">
Switch(config)# interface vlan 10
Switch(config-if)# ip helper-address 192.168.99.10
<span class="cmd-comment"># Las peticiones DHCP broadcast de la VLAN 10 se convierten en unicast hacia 192.168.99.10</span>
</div>

<h4>⚠️ Errores típicos</h4>
<div class="warning-box">
    <ul>
        <li><strong>No habilitar <code>ip routing</code></strong> → las SVI no enrutan entre sí.</li>
        <li><strong>Olvidarse de la ruta por defecto</strong> → las VLANs se comunican entre sí pero no salen a internet.</li>
        <li><strong>Tener la VLAN sin ningún puerto UP</strong> → la SVI queda en estado DOWN.</li>
        <li><strong>Falta de <code>ip helper-address</code></strong> → los PCs no obtienen DHCP.</li>
    </ul>
</div>
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
// ALTA DISPONIBILIDAD
// ============================================================================
'alta-disponibilidad': [
{
    title: '🛡️ FHRP: redundancia de gateway',
    content: `
<p>Imagina la red de una empresa: 200 PCs con gateway 192.168.1.1, que es la IP de un router. Ese router falla → toda la red sin internet. Catástrofe.</p>

<p>La solución es <strong>FHRP</strong> (First Hop Redundancy Protocol): un mecanismo donde dos o más routers <em>comparten una IP virtual de gateway</em>. Los PCs siguen usando esa IP. Si el router activo falla, el de respaldo asume el rol en segundos, transparente para los usuarios.</p>

<h4>🥊 Protocolos FHRP</h4>
<table>
    <thead><tr><th>Protocolo</th><th>Origen</th><th>Estándar</th><th>Modo</th></tr></thead>
    <tbody>
        <tr><td><strong>HSRP</strong></td><td>Cisco propietario</td><td>—</td><td>Activo/Pasivo</td></tr>
        <tr><td><strong>VRRP</strong></td><td>Estándar IETF</td><td>RFC 5798</td><td>Activo/Pasivo</td></tr>
        <tr><td><strong>GLBP</strong></td><td>Cisco propietario</td><td>—</td><td>Activo/Activo (load balancing)</td></tr>
    </tbody>
</table>

<h4>⚙️ HSRP en detalle</h4>
<ul>
    <li>Routers en un grupo comparten una <strong>IP virtual</strong> y una <strong>MAC virtual</strong> (formato 0000.0c07.acXX donde XX = grupo).</li>
    <li>El de mayor <strong>prioridad</strong> (defecto 100, máximo 255) es el <strong>active</strong>; el resto son <strong>standby</strong>.</li>
    <li>Envían mensajes Hello cada 3 s. Si no se reciben en 10 s → el standby toma el control.</li>
    <li><strong>Preemption</strong>: si vuelve a estar disponible el router con mayor prioridad, recupera el rol activo automáticamente (si <code>preempt</code> está habilitado).</li>
</ul>

<h4>📋 Configuración HSRP</h4>
<div class="cmd-block">
<span class="cmd-comment"># Router primario</span>
R1(config)# interface Gi0/0
R1(config-if)# ip address 192.168.1.2 255.255.255.0
R1(config-if)# standby version 2
R1(config-if)# standby 10 ip 192.168.1.1
R1(config-if)# standby 10 priority 110
R1(config-if)# standby 10 preempt
R1(config-if)# standby 10 timers 1 3

<span class="cmd-comment"># Router de backup</span>
R2(config)# interface Gi0/0
R2(config-if)# ip address 192.168.1.3 255.255.255.0
R2(config-if)# standby version 2
R2(config-if)# standby 10 ip 192.168.1.1
R2(config-if)# standby 10 priority 100      <span class="cmd-comment"># Menor → standby</span>
R2(config-if)# standby 10 preempt
</div>

<p>Los PCs siguen apuntando a 192.168.1.1 como gateway. Funcionará siempre, esté arriba quien esté arriba.</p>

<h4>📋 VRRP (equivalente estándar)</h4>
<div class="cmd-block">
R1(config-if)# vrrp 10 ip 192.168.1.1
R1(config-if)# vrrp 10 priority 110
R1(config-if)# vrrp 10 preempt
</div>

<div class="curiosity-box">
    <h4>💡 Truco profesional: tracking</h4>
    <p>Si el router activo tiene internet caído (pero su LAN sigue UP), HSRP no detectará nada raro y los usuarios estarán incomunicados. Solución: configura <strong>tracking</strong> de la interfaz WAN.</p>
    <div class="cmd-block">
R1(config)# track 1 interface Gi0/1 line-protocol
R1(config)# interface Gi0/0
R1(config-if)# standby 10 track 1 decrement 20
<span class="cmd-comment"># Si Gi0/1 cae, mi prioridad pasa de 110 a 90 → el otro router toma el control</span>
    </div>
</div>
    `
},
{
    title: '🔗 EtherChannel y LACP',
    content: `
<p><strong>EtherChannel</strong> permite agrupar varios enlaces físicos como uno lógico de mayor capacidad y redundancia.</p>

<h4>🎯 Beneficios</h4>
<ul>
    <li><strong>Más ancho de banda</strong>: 4 × 1G = 4G de capacidad.</li>
    <li><strong>Redundancia</strong>: si un cable falla, los otros siguen.</li>
    <li><strong>Sin STP bloqueando enlaces</strong>: el bundle se ve como un solo enlace lógico.</li>
    <li><strong>Balanceo de carga</strong>: el tráfico se reparte por hash (MAC, IP, puerto...).</li>
</ul>

<h4>📜 Protocolos de negociación</h4>
<ul>
    <li><strong>LACP</strong> (IEEE 802.3ad/802.1AX) — estándar abierto. <em>El más recomendado.</em></li>
    <li><strong>PAgP</strong> — Cisco propietario.</li>
    <li><strong>Static (on)</strong> — sin negociación. Frágil ante errores de cableado.</li>
</ul>

<h4>📋 Configuración LACP</h4>
<div class="cmd-block">
<span class="cmd-comment"># Switch A</span>
SwA(config)# interface range Gi0/1 - 4
SwA(config-if-range)# channel-protocol lacp
SwA(config-if-range)# channel-group 1 mode active        <span class="cmd-comment"># active = lo inicio yo</span>

<span class="cmd-comment"># Switch B</span>
SwB(config)# interface range Gi0/1 - 4
SwB(config-if-range)# channel-protocol lacp
SwB(config-if-range)# channel-group 1 mode active

<span class="cmd-comment"># Configurar la interfaz lógica (Port-channel)</span>
SwA(config)# interface Port-channel 1
SwA(config-if)# switchport mode trunk
SwA(config-if)# switchport trunk allowed vlan 10,20,30,99
</div>

<h4>⚖️ Modos LACP/PAgP</h4>
<table>
    <thead><tr><th>Modo</th><th>Protocolo</th><th>Comportamiento</th></tr></thead>
    <tbody>
        <tr><td>active</td><td>LACP</td><td>Inicia activamente la negociación</td></tr>
        <tr><td>passive</td><td>LACP</td><td>Solo responde a peticiones LACP</td></tr>
        <tr><td>desirable</td><td>PAgP</td><td>Inicia activamente la negociación</td></tr>
        <tr><td>auto</td><td>PAgP</td><td>Solo responde</td></tr>
        <tr><td>on</td><td>—</td><td>Sin negociación, forzado</td></tr>
    </tbody>
</table>

<div class="warning-box">
    ⚠️ Combinaciones que NO funcionan:
    <ul>
        <li><strong>passive + passive</strong>: ninguno inicia, no se forma el bundle.</li>
        <li><strong>auto + auto</strong>: idem.</li>
        <li><strong>active + desirable</strong>: protocolos distintos.</li>
    </ul>
    Recomendación: <strong>active + active</strong> en ambos extremos.
</div>

<h4>🎲 Balanceo de carga</h4>
<div class="cmd-block">
<span class="cmd-comment"># Por defecto: balanceo por MAC origen. Cámbialo según el patrón de tráfico</span>
SwA(config)# port-channel load-balance src-dst-ip
<span class="cmd-comment"># Otras opciones: src-mac, dst-mac, src-dst-mac, src-ip, dst-ip</span>
</div>

<h4>🔄 MLAG / vPC</h4>
<p>Un EtherChannel normal requiere que ambos extremos estén en el <strong>mismo switch físico</strong>. ¿Qué pasa si quiero redundancia frente a fallo de un switch entero?</p>

<p><strong>MLAG</strong> (Multi-Chassis Link Aggregation) o <strong>Cisco vPC</strong> permiten que un EtherChannel termine en <em>dos switches distintos</em> que actúan como uno solo.</p>

<ul>
    <li>El servidor "ve" un solo Port-channel.</li>
    <li>Los dos switches se sincronizan vía peer-link.</li>
    <li>Si uno falla, el otro mantiene el tráfico.</li>
    <li>Activo-activo real, sin enlaces bloqueados.</li>
</ul>
    `
},
{
    title: '🏗️ Diseño jerárquico Cisco',
    content: `
<p>Cisco propone una topología de 3 capas para LAN empresarial:</p>

<h4>🌳 Las tres capas</h4>
<ol>
    <li><strong>Capa de acceso</strong>: switches donde se conectan los usuarios finales. Suele tener PoE para teléfonos/APs. STP/PortFast, port-security.</li>
    <li><strong>Capa de distribución</strong>: switches L3 que agrupan varios switches de acceso. Aquí ocurren inter-VLAN routing, políticas, ACLs.</li>
    <li><strong>Capa de núcleo (core)</strong>: switches L3 muy rápidos que interconectan capas de distribución y proporcionan salida a internet. Sin filtrado, máxima velocidad.</li>
</ol>

<div class="concept-box">
    <h4>🎯 En pymes: modelo collapsed core</h4>
    <p>En empresas pequeñas, distribución y core son el mismo switch. Te ahorras hardware. Diseño "2 capas".</p>
</div>

<h4>📐 Buenas prácticas</h4>
<ul>
    <li>Conexiones <strong>redundantes</strong> entre capas (cada switch de acceso → 2 de distribución).</li>
    <li>Enlaces <strong>agregados</strong> (LACP) entre distribución y core.</li>
    <li><strong>HSRP/VRRP</strong> entre los dos switches de distribución.</li>
    <li><strong>STP</strong>: el switch de distribución más potente debe ser el root bridge.</li>
    <li><strong>VTP modo transparente</strong> o <strong>VTPv3</strong>: nunca dejar VTP server por defecto. Han caído redes enteras por eso.</li>
</ul>

<h4>🍃 Spine-Leaf (data center moderno)</h4>
<p>Para CPDs grandes, la topología jerárquica clásica no escala bien. La solución es <strong>spine-leaf</strong>:</p>
<ul>
    <li>Cada leaf (acceso) se conecta a TODOS los spines.</li>
    <li>Todos los enlaces activos (no STP).</li>
    <li>Cualquier servidor está siempre a 2 saltos del resto.</li>
    <li>Se usa <strong>EVPN/VXLAN</strong> para mover VLANs lógicamente sobre routing L3.</li>
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
]

});
