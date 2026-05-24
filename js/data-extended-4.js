/* ============================================
   DATA-EXTENDED-4.JS — Cloud/moderno e Inalámbricas
   IPv6, SDN, Docker, WiFi 6/7, Mesh, WiFi empresarial
   ============================================ */

Object.assign(EXTENDED_CONTENT, {

// ============================================================================
// IPv6 COMPLETO
// ============================================================================
'ipv6-completo': [
{
    title: '🌐 Por qué IPv6 y qué cambia',
    content: `
<p>IPv4 nació en 1983 con 4.300 millones de direcciones. Sonaba a mucho. En 2025 se agotaron oficialmente las últimas direcciones IPv4 de RIPE NCC. <strong>IPv6</strong>, definido en el RFC 8200, multiplica el espacio direccionable por <em>340 sextillones</em>.</p>

<h4>🔢 La cifra que asusta</h4>
<p>IPv4 = 2³² ≈ 4.3 × 10⁹ direcciones.<br>
IPv6 = 2¹²⁸ ≈ 3.4 × 10³⁸ direcciones.</p>

<p>Si IPv4 fuera una canica, IPv6 sería <em>340 sistemas solares de canicas</em>. Cada átomo de la superficie de la Tierra podría tener varios miles de direcciones IPv6 propias.</p>

<h4>📋 Cambios principales respecto a IPv4</h4>
<table>
    <thead><tr><th>Aspecto</th><th>IPv4</th><th>IPv6</th></tr></thead>
    <tbody>
        <tr><td>Tamaño de dirección</td><td>32 bits</td><td>128 bits</td></tr>
        <tr><td>Notación</td><td>Decimal con puntos</td><td>Hexadecimal con dos puntos</td></tr>
        <tr><td>Cabecera</td><td>Variable (20-60 bytes)</td><td>Fija 40 bytes</td></tr>
        <tr><td>Fragmentación</td><td>Router puede fragmentar</td><td>Solo el origen (Path MTU Discovery)</td></tr>
        <tr><td>Checksum cabecera</td><td>Sí</td><td>No (lo hace capa enlace y transporte)</td></tr>
        <tr><td>Broadcast</td><td>Sí</td><td>No existe (se reemplaza por multicast)</td></tr>
        <tr><td>ARP</td><td>Sí</td><td>NDP (Neighbor Discovery Protocol)</td></tr>
        <tr><td>NAT</td><td>Casi obligatorio</td><td>No es necesario</td></tr>
        <tr><td>Autoconfiguración</td><td>DHCP</td><td>SLAAC + DHCPv6</td></tr>
        <tr><td>Seguridad (IPsec)</td><td>Opcional</td><td>Diseñado integrado (aunque opcional)</td></tr>
    </tbody>
</table>

<h4>✍️ Notación</h4>
<p>Una IPv6 son 8 grupos de 4 dígitos hexadecimales separados por ":":</p>
<p><code>2001:0db8:85a3:0000:0000:8a2e:0370:7334</code></p>

<p>Reglas de simplificación:</p>
<ul>
    <li>Los <strong>ceros a la izquierda</strong> de cada grupo se omiten: <code>2001:db8:85a3:0:0:8a2e:370:7334</code></li>
    <li>Una sola secuencia de ceros consecutivos puede comprimirse con <code>::</code>: <code>2001:db8:85a3::8a2e:370:7334</code></li>
    <li>La compresión <code>::</code> solo puede aparecer UNA vez en la dirección.</li>
    <li>La dirección de loopback (127.0.0.1 en IPv4) es <code>::1</code>.</li>
    <li>La dirección "todos cero" (0.0.0.0) es <code>::</code>.</li>
</ul>
    `
},
{
    title: '🏷️ Tipos de direcciones IPv6',
    content: `
<p>IPv6 clasifica las direcciones por su <strong>scope</strong> (ámbito) y <strong>tipo</strong>:</p>

<h4>🌍 Por scope</h4>
<ul>
    <li><strong>Link-local</strong> (<code>fe80::/10</code>): solo válida en el segmento físico. Todo interfaz IPv6 tiene una automáticamente. Se usa para NDP, OSPFv3, etc.</li>
    <li><strong>Unique Local</strong> (<code>fc00::/7</code>, en la práctica <code>fd00::/8</code>): equivalente a la 10.0.0.0/8 de IPv4. Para uso interno, no enrutable en internet.</li>
    <li><strong>Global Unicast</strong> (<code>2000::/3</code>): direcciones públicas globalmente únicas y enrutables. Lo que un ISP te asigna.</li>
</ul>

<h4>📡 Por tipo</h4>
<ul>
    <li><strong>Unicast</strong>: una dirección, un destinatario.</li>
    <li><strong>Multicast</strong> (<code>ff00::/8</code>): un grupo. Reemplaza al broadcast de IPv4.
        <ul>
            <li><code>ff02::1</code>: todos los nodos del enlace.</li>
            <li><code>ff02::2</code>: todos los routers del enlace.</li>
            <li><code>ff02::1:ffXX:XXXX</code>: Solicited-node multicast (para NDP).</li>
        </ul>
    </li>
    <li><strong>Anycast</strong>: una dirección compartida por varios destinos; el enrutamiento elige el más cercano.</li>
</ul>

<h4>🆔 Identificador de interfaz (Interface ID)</h4>
<p>Los últimos 64 bits de una IPv6 identifican la máquina. Tres formas de generarlos:</p>
<ol>
    <li><strong>EUI-64</strong>: se construye a partir de la MAC del interfaz. Más predecible pero traza al hardware.</li>
    <li><strong>Random / Privacy Extension</strong> (<a>RFC 4941</a>): se generan aleatorios y rotan periódicamente. Mejor para privacidad. Predeterminado en Windows, macOS y Linux modernos.</li>
    <li><strong>Stable Private</strong> (<a>RFC 7217</a>): aleatorios pero estables para el mismo prefijo.</li>
</ol>

<h4>🎲 Generar EUI-64 a partir de una MAC</h4>
<p>Si la MAC es <code>00:1A:2B:3C:4D:5E</code>:</p>
<ol>
    <li>Dividir en dos mitades: <code>00:1A:2B</code> y <code>3C:4D:5E</code>.</li>
    <li>Insertar <code>FF:FE</code> en medio: <code>00:1A:2B:FF:FE:3C:4D:5E</code>.</li>
    <li>Invertir el séptimo bit del primer byte (el bit "U/L"): <code>00</code> → <code>02</code>.</li>
    <li>Resultado: <code>02:1A:2B:FF:FE:3C:4D:5E</code>.</li>
    <li>Formato IPv6: <code>21A:2BFF:FE3C:4D5E</code>.</li>
</ol>
    `
},
{
    title: '🚀 SLAAC, NDP y autoconfiguración',
    content: `
<p>Una de las maravillas de IPv6 es que los hosts pueden <strong>autoconfigurarse</strong> sin necesidad de DHCP.</p>

<h4>🧠 SLAAC: Stateless Address Autoconfiguration</h4>
<p>El proceso:</p>
<ol>
    <li>El host arranca y se asigna una dirección <strong>link-local</strong> <code>fe80::xxxx</code> a partir de su EUI-64 o aleatoria.</li>
    <li>Envía un mensaje <strong>Router Solicitation (RS)</strong> a la dirección multicast <code>ff02::2</code>.</li>
    <li>El router responde con un <strong>Router Advertisement (RA)</strong> que contiene:
        <ul>
            <li>El prefijo de red (<code>2001:db8:1::/64</code>).</li>
            <li>Si debe usar SLAAC o DHCPv6 (flags M y O).</li>
            <li>Su propia link-local como default gateway.</li>
            <li>MTU del enlace, opciones DNS, etc.</li>
        </ul>
    </li>
    <li>El host construye su dirección global combinando el prefijo + su interface ID.</li>
    <li>Hace <strong>DAD</strong> (Duplicate Address Detection) para verificar que nadie más usa esa dirección.</li>
    <li>Si nadie responde → la dirección queda activa.</li>
</ol>

<div class="info-box">
    💡 SLAAC funciona <em>sin servidor central</em>. Es como DHCP pero sin DHCP. Súper útil para IoT.
</div>

<h4>🤝 NDP: Neighbor Discovery Protocol</h4>
<p>NDP reemplaza a ARP en IPv6. Usa 5 tipos de mensajes ICMPv6:</p>
<ul>
    <li><strong>Router Solicitation (RS)</strong> — host pregunta a routers.</li>
    <li><strong>Router Advertisement (RA)</strong> — routers se anuncian.</li>
    <li><strong>Neighbor Solicitation (NS)</strong> — equivalente a ARP request.</li>
    <li><strong>Neighbor Advertisement (NA)</strong> — equivalente a ARP reply.</li>
    <li><strong>Redirect</strong> — informa de mejor ruta.</li>
</ul>

<h4>📋 DHCPv6: cuando SLAAC no basta</h4>
<p>Para configuraciones más controladas (asignación fija, registro de hostnames, opciones específicas), se usa <strong>DHCPv6</strong>:</p>
<ul>
    <li><strong>DHCPv6 stateful</strong>: el servidor asigna direcciones (como DHCPv4).</li>
    <li><strong>DHCPv6 stateless</strong>: SLAAC asigna la dirección pero el servidor da opciones (DNS, NTP).</li>
</ul>

<p>Los flags en el RA controlan el comportamiento:</p>
<ul>
    <li><strong>M=0, O=0</strong>: SLAAC puro. Sin DHCP.</li>
    <li><strong>M=0, O=1</strong>: SLAAC + DHCPv6 stateless para DNS.</li>
    <li><strong>M=1, O=1</strong>: DHCPv6 stateful completo.</li>
</ul>

<div class="warning-box">
    ⚠️ Android <strong>no soporta DHCPv6 stateful</strong>. Si tu red lo necesita, Android no podrá conectarse a IPv6. Usa SLAAC + RA o DHCPv6 stateless.
</div>

<h4>🔄 Dual-stack y transición</h4>
<p>La realidad: durante años IPv4 e IPv6 conviven. Estrategias:</p>
<ul>
    <li><strong>Dual-stack</strong>: cada host tiene IPv4 y IPv6. Habla con quien pueda en cada protocolo. Lo más extendido.</li>
    <li><strong>Tunelización</strong> (6to4, Teredo, ISATAP): IPv6 viaja encapsulado en IPv4. Útil cuando tu ISP solo da IPv4.</li>
    <li><strong>NAT64/DNS64</strong>: cliente IPv6 se conecta a destino IPv4 mediante traducción.</li>
    <li><strong>464XLAT</strong>: usado por operadores móviles (Telefónica, Vodafone). Red interna IPv6, IPv4 vive solo en el extremo.</li>
</ul>

<h4>📋 Configuración Cisco básica</h4>
<div class="cmd-block">
<span class="cmd-comment"># Habilitar IPv6 globalmente</span>
Router(config)# ipv6 unicast-routing

<span class="cmd-comment"># Configurar una interfaz</span>
Router(config)# interface GigabitEthernet0/0
Router(config-if)# ipv6 address 2001:db8:1::1/64
Router(config-if)# ipv6 address fe80::1 link-local
Router(config-if)# ipv6 nd ra interval 30
Router(config-if)# no shutdown

<span class="cmd-comment"># Ruta por defecto</span>
Router(config)# ipv6 route ::/0 2001:db8:0::1

<span class="cmd-comment"># Verificación</span>
Router# show ipv6 interface brief
Router# show ipv6 route
Router# show ipv6 neighbors
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
// SDN Y SD-WAN
// ============================================================================
'sdn-sdwan': [
{
    title: '☁️ SDN: separar el control de los datos',
    content: `
<p><strong>SDN</strong> (Software-Defined Networking) es una arquitectura que separa el "plano de control" (cerebro que decide rutas) del "plano de datos" (chips que reenvían paquetes). Esa separación permite gestionar redes enteras como una sola unidad programable.</p>

<h4>🧠 Planos de una red tradicional</h4>
<p>Cada switch o router tiene 3 planos integrados:</p>
<ul>
    <li><strong>Data plane (forwarding)</strong>: chips que mueven paquetes a velocidad de línea.</li>
    <li><strong>Control plane</strong>: software que toma decisiones (OSPF, BGP, STP) y rellena las tablas del data plane.</li>
    <li><strong>Management plane</strong>: SSH, SNMP, APIs. Configuración y monitorización.</li>
</ul>

<p>Problema: si tienes 200 switches, configuras 200 control planes individualmente. Cambiar una política exige tocar todos los equipos.</p>

<h4>🎯 La idea de SDN</h4>
<p>Con SDN:</p>
<ul>
    <li>El <strong>data plane</strong> sigue en los switches (chips ASIC siguen siendo necesarios para velocidad).</li>
    <li>El <strong>control plane</strong> se centraliza en un <strong>controlador SDN</strong> (servidor o cluster).</li>
    <li>El controlador habla con los switches mediante un protocolo "southbound" (clásicamente OpenFlow).</li>
    <li>Las aplicaciones de gestión hablan con el controlador mediante APIs "northbound" (REST).</li>
</ul>

<div class="info-box">
    💡 <strong>Resultado</strong>: el operador ve la red como <em>una sola entidad lógica</em>. Cambia una política → el controlador la propaga a todos los switches al instante.
</div>

<h4>🔧 Protocolos southbound</h4>
<ul>
    <li><strong>OpenFlow</strong> — el primero y más famoso. Permite al controlador inyectar flujos directamente en los switches.</li>
    <li><strong>NETCONF / YANG</strong> — más moderno, basado en SSH/XML. Standard IETF.</li>
    <li><strong>OpFlex</strong> — Cisco ACI.</li>
    <li><strong>P4</strong> — programación de pipelines de switch a bajo nivel.</li>
</ul>

<h4>🏗️ Tipos de despliegue SDN</h4>
<ul>
    <li><strong>Open SDN</strong>: estándares abiertos (OpenDaylight, ONOS).</li>
    <li><strong>SDN por superposición</strong>: VXLAN/EVPN sobre red IP existente. Es lo que usa el 90% de los CPDs modernos.</li>
    <li><strong>SDN propietario</strong>: Cisco ACI, VMware NSX, Arista CloudVision.</li>
    <li><strong>SDN híbrido</strong>: parte tradicional + parte SDN.</li>
</ul>

<h4>🎁 Casos de uso reales</h4>
<ul>
    <li>Centros de datos masivos (Google, Facebook, AWS) — gestionar 100.000 switches sin volverse loco.</li>
    <li>Empresas con micro-segmentación de tráfico fina.</li>
    <li>Despliegue automático: aprovisionar VLANs/subredes en minutos en vez de horas.</li>
    <li>Network slicing en 5G — cada servicio con su SLA virtualizado.</li>
</ul>
    `
},
{
    title: '🌍 SD-WAN: la WAN moderna',
    content: `
<p><strong>SD-WAN</strong> aplica los principios de SDN a las redes WAN. Permite a una empresa conectar sus sedes usando MÚLTIPLES enlaces (internet de varios ISPs, MPLS, LTE, satélite) y elegir el mejor para cada flujo de tráfico.</p>

<h4>📜 Problemas de la WAN tradicional</h4>
<ul>
    <li>Empresas con MPLS pagan caro a un único operador.</li>
    <li>Configuración manual y rígida en cada router.</li>
    <li>Tráfico hacia la nube (Office 365, AWS) viaja por backhaul → ineficiente.</li>
    <li>Cambiar una política → mantenimiento por cada router.</li>
</ul>

<h4>✨ Lo que cambia con SD-WAN</h4>
<ul>
    <li><strong>Multi-WAN inteligente</strong>: usa simultáneamente varios enlaces (MPLS + fibra + 5G).</li>
    <li><strong>Selección de path por aplicación</strong>: Office 365 va directo a internet, ERP por MPLS, voz por el enlace con menor jitter.</li>
    <li><strong>Túneles cifrados</strong>: IPsec automatizado entre todas las sedes.</li>
    <li><strong>Zero-touch provisioning</strong>: el aparato se enchufa en la sede, llama al controlador, descarga su configuración. Cero trabajo on-site.</li>
    <li><strong>Visibilidad completa</strong>: un dashboard único con todas las sedes y aplicaciones.</li>
</ul>

<h4>🏗️ Arquitectura típica</h4>
<ul>
    <li><strong>Edge / CPE</strong>: dispositivos en cada sede (Fortinet, Cisco vManage, Aruba EdgeConnect, VeloCloud).</li>
    <li><strong>Controller / Orchestrator</strong>: cerebro central en la nube o data center.</li>
    <li><strong>Gateway / POP</strong>: puntos de presencia para optimizar conexión a la nube.</li>
</ul>

<h4>🥊 SD-WAN vs MPLS</h4>
<table>
    <thead><tr><th></th><th>MPLS clásico</th><th>SD-WAN</th></tr></thead>
    <tbody>
        <tr><td>Coste</td><td>Alto</td><td>Bajo (usa internet barato)</td></tr>
        <tr><td>Despliegue</td><td>Semanas/meses</td><td>Días</td></tr>
        <tr><td>SLA</td><td>Garantizado por operador</td><td>Combinación de varios enlaces</td></tr>
        <tr><td>Seguridad</td><td>Red privada</td><td>Cifrado por túnel</td></tr>
        <tr><td>Flexibilidad</td><td>Baja</td><td>Alta</td></tr>
        <tr><td>Optimización para cloud</td><td>Mala</td><td>Excelente</td></tr>
    </tbody>
</table>

<h4>🛡️ SASE: la evolución</h4>
<p><strong>SASE</strong> (Secure Access Service Edge) combina SD-WAN con servicios de seguridad en la nube:</p>
<ul>
    <li>SD-WAN</li>
    <li>NGFW como servicio</li>
    <li>Secure Web Gateway</li>
    <li>CASB (Cloud Access Security Broker)</li>
    <li>Zero Trust Network Access (ZTNA)</li>
</ul>

<p>Productos SASE: Zscaler, Cloudflare One, Cato Networks, Palo Alto Prisma Access, Cisco Umbrella.</p>

<div class="curiosity-box">
    <h4>💡 Tendencia 2026</h4>
    <p>El MPLS no ha muerto: sigue en bancos, gobiernos y operadoras. Pero la mayoría de empresas medianas han migrado o están migrando a SD-WAN. <strong>SASE</strong> es el siguiente paso natural: redes y seguridad fusionadas en un servicio cloud.</p>
</div>
    `
},
{
    title: '🧠 Conceptos prácticos: VXLAN, EVPN y NFV',
    content: `
<p>SDN no es solo OpenFlow. En 2026 dominan otras tecnologías relacionadas que conviene conocer:</p>

<h4>📦 VXLAN — extender VLANs sobre IP</h4>
<p><strong>VXLAN</strong> (Virtual eXtensible LAN) es un protocolo de tunelización que permite extender redes L2 sobre cualquier red IP. Las claves:</p>
<ul>
    <li>Usa un identificador de 24 bits (<strong>VNI</strong>) → 16 millones de redes posibles (vs 4094 de VLAN tradicional).</li>
    <li>Encapsula tramas Ethernet en paquetes UDP (puerto 4789).</li>
    <li>El equipo que encapsula/desencapsula es un <strong>VTEP</strong> (VXLAN Tunnel End Point).</li>
    <li>Permite que VMs o contenedores en hosts distintos compartan la misma "VLAN lógica" sin importar la topología física.</li>
</ul>

<h4>🌍 EVPN — el plano de control moderno</h4>
<p><strong>EVPN</strong> (Ethernet VPN, RFC 7432) es el plano de control que dice a los VTEPs qué MACs hay detrás de cada uno. Reemplaza el "flood and learn" tradicional por BGP. Combinación habitual: <strong>BGP EVPN + VXLAN</strong> = la base de las redes de data center modernas (spine-leaf).</p>

<h4>🔧 NFV — funciones de red virtualizadas</h4>
<p><strong>NFV</strong> (Network Functions Virtualization) consiste en mover funciones que antes hacían cajas dedicadas (firewall, router, balanceador, DPI...) a software corriendo en servidores genéricos x86.</p>

<ul>
    <li>Antes: comprabas un Fortinet 100E para tu sucursal.</li>
    <li>Ahora: corres FortiGate-VM en un servidor o en la nube.</li>
</ul>

<h4>🌐 Service Mesh (Istio, Linkerd)</h4>
<p>En el mundo de microservicios y Kubernetes, una <strong>service mesh</strong> es una capa de red que gestiona la comunicación entre servicios. Aporta:</p>
<ul>
    <li>mTLS automático entre todos los servicios.</li>
    <li>Routing avanzado (canary, A/B testing).</li>
    <li>Observabilidad (métricas, trazas).</li>
    <li>Circuit breaking, retries.</li>
</ul>

<p>Implementado mediante <strong>sidecars</strong> (un proxy Envoy junto a cada microservicio). Es SDN llevado al extremo: la red se programa por aplicación.</p>

<h4>🔮 Tendencia 2026: programmable data plane</h4>
<p>Con <strong>P4</strong> y <strong>eBPF</strong>, ya no programas solo el control plane: programas el data plane mismo. Permite implementar protocolos nuevos, filtros, telemetría avanzada sin esperar al fabricante del hardware.</p>

<div class="concept-box">
    <h4>💡 Mapa mental rápido</h4>
    <ul>
        <li><strong>SDN clásico</strong> (OpenFlow) → casi nadie lo despliega así en 2026.</li>
        <li><strong>VXLAN + BGP EVPN</strong> → estándar en CPDs modernos.</li>
        <li><strong>SD-WAN</strong> → estándar en WAN empresarial.</li>
        <li><strong>SASE</strong> → futuro inmediato: red + seguridad como un servicio.</li>
        <li><strong>Service mesh</strong> → red dentro de Kubernetes.</li>
        <li><strong>eBPF/P4</strong> → ola de innovación en data plane.</li>
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
// REDES DOCKER
// ============================================================================
'redes-docker': [
{
    title: '🐳 Cómo funciona la red en Docker',
    content: `
<p>Cuando arrancas un contenedor Docker, necesita conexión: a otros contenedores, a tu host, a internet. Docker no usa los recursos de red del host directamente — crea un <strong>espacio de red aislado</strong> (network namespace) y lo conecta a una red virtual.</p>

<h4>🔧 Conceptos clave</h4>
<ul>
    <li><strong>Network namespace</strong>: aislamiento de red del kernel Linux. Cada contenedor tiene el suyo: su propia tabla de rutas, interfaces, iptables, etc.</li>
    <li><strong>veth pair</strong>: par de interfaces virtuales conectadas como un cable. Una punta dentro del contenedor (eth0), otra fuera (en el host).</li>
    <li><strong>bridge virtual</strong>: switch virtual del host (típicamente <code>docker0</code>).</li>
    <li><strong>iptables</strong>: gestiona NAT y filtrado del tráfico de contenedores.</li>
</ul>

<h4>📊 Tipos de redes Docker</h4>
<table>
    <thead><tr><th>Tipo</th><th>Cuándo usarla</th></tr></thead>
    <tbody>
        <tr><td><strong>bridge</strong></td><td>Por defecto. Contenedores en una red virtual privada en el host.</td></tr>
        <tr><td><strong>host</strong></td><td>El contenedor usa la red del host directamente. Sin aislamiento.</td></tr>
        <tr><td><strong>none</strong></td><td>Sin red. Para procesos completamente aislados.</td></tr>
        <tr><td><strong>overlay</strong></td><td>Para Docker Swarm: red entre contenedores en hosts distintos.</td></tr>
        <tr><td><strong>macvlan</strong></td><td>Contenedor con MAC y IP propia en la red física. Aparece como dispositivo físico.</td></tr>
        <tr><td><strong>ipvlan</strong></td><td>Como macvlan pero comparte MAC. Útil en redes que limitan MACs.</td></tr>
    </tbody>
</table>

<h4>🌉 Red bridge por defecto</h4>
<p>Cuando instalas Docker, crea automáticamente la red <code>bridge</code> (subred típica <code>172.17.0.0/16</code>):</p>

<div class="cmd-block">
$ docker network ls
NETWORK ID     NAME      DRIVER    SCOPE
c3cd46f397ce   bridge    bridge    local
ad4e4c24568e   host      host      local
1c69593fc6b9   none      null      local

$ docker network inspect bridge
<span class="cmd-comment"># Muestra el rango IP, gateway, contenedores conectados...</span>
</div>

<p>Los contenedores en la red <code>bridge</code> por defecto:</p>
<ul>
    <li>Tienen IP del rango 172.17.0.0/16.</li>
    <li>El gateway es <code>docker0</code> en el host.</li>
    <li>Se ven entre sí por IP, <strong>pero NO por nombre</strong>.</li>
    <li>Salen a internet vía NAT del host.</li>
</ul>

<h4>🎯 Buenas prácticas: redes definidas por el usuario</h4>
<p>Crear tu propia red bridge te da más control:</p>

<div class="cmd-block">
<span class="cmd-comment"># Crear red personalizada</span>
$ docker network create --driver bridge --subnet 10.0.0.0/24 mibridge

<span class="cmd-comment"># Lanzar contenedores en ella</span>
$ docker run -d --name web --network mibridge nginx
$ docker run -d --name db --network mibridge postgres

<span class="cmd-comment"># Desde "web", puedes hacer ping a "db" por nombre (resolución DNS automática)</span>
$ docker exec web ping db
</div>

<div class="info-box">
    💡 <strong>Truco</strong>: las redes creadas por el usuario tienen DNS automático entre contenedores. La red <code>bridge</code> por defecto NO.
</div>
    `
},
{
    title: '🛠️ Modos avanzados: host, macvlan, overlay',
    content: `
<h4>🏠 Modo host: sin aislamiento</h4>
<p>El contenedor comparte la pila de red del host. Si arrancas un nginx en modo host, escucha directamente en el puerto 80 del host (no hay que mapear <code>-p</code>):</p>

<div class="cmd-block">
$ docker run -d --network host nginx
<span class="cmd-comment"># El nginx queda en host_ip:80 directamente, sin NAT.</span>
</div>

<p>Ventajas: máximo rendimiento (sin overhead de NAT/bridge).<br>
Inconvenientes: sin aislamiento. No puedes tener 2 contenedores en el mismo puerto. Riesgo de conflicto con servicios del host.</p>

<h4>🎭 Macvlan: parecer un dispositivo físico</h4>
<p>Macvlan permite que un contenedor tenga su propia <strong>MAC</strong> e IP en la red física, como si fuera un PC más conectado al switch.</p>

<div class="cmd-block">
$ docker network create -d macvlan \\
    --subnet=192.168.1.0/24 \\
    --gateway=192.168.1.1 \\
    -o parent=eth0 \\
    redfisica

$ docker run -d --name miweb --network redfisica --ip 192.168.1.50 nginx
</div>

<p>Casos de uso:</p>
<ul>
    <li>Servicios legacy que necesitan ser visibles directamente en la LAN.</li>
    <li>Home Assistant, Pi-hole con IP propia en la red doméstica.</li>
    <li>Contenedores que deben hacerse pasar por dispositivos físicos.</li>
</ul>

<div class="warning-box">
    ⚠️ Macvlan tiene una limitación: por defecto el contenedor <strong>no puede comunicarse con el host</strong> en la misma macvlan (limitación del kernel). Workarounds: crear otra subred macvlan para el host, o usar ipvlan.
</div>

<h4>🌐 Overlay (Swarm / Kubernetes)</h4>
<p>Overlay permite conectar contenedores que corren en <strong>hosts distintos</strong> como si estuvieran en la misma red. Usa <strong>VXLAN</strong> para tunelizar el tráfico entre nodos.</p>

<div class="cmd-block">
<span class="cmd-comment"># Inicializar Swarm</span>
$ docker swarm init

<span class="cmd-comment"># En otro nodo</span>
$ docker swarm join --token SWMTKN-1... 10.0.0.1:2377

<span class="cmd-comment"># Crear red overlay</span>
$ docker network create -d overlay miservicio

<span class="cmd-comment"># Lanzar un servicio replicado</span>
$ docker service create --name web --replicas 3 --network miservicio nginx
</div>

<p>Las 3 réplicas pueden estar en 3 hosts distintos pero se ven en la misma red <code>miservicio</code>.</p>

<h4>🚢 Kubernetes networking (vistazo)</h4>
<p>K8s usa CNI (Container Network Interface) — un estándar que delega la red a plugins:</p>
<ul>
    <li><strong>Calico</strong>: BGP, políticas L3/L4 finas.</li>
    <li><strong>Flannel</strong>: simple, basado en VXLAN.</li>
    <li><strong>Cilium</strong>: basado en eBPF, observabilidad avanzada.</li>
    <li><strong>Weave Net</strong>: mesh, fácil de desplegar.</li>
</ul>

<p>Conceptos clave de K8s:</p>
<ul>
    <li><strong>Pod</strong>: unidad mínima (1+ contenedores con IP propia compartida).</li>
    <li><strong>Service</strong>: abstracción que da una IP virtual estable a un conjunto de pods.</li>
    <li><strong>Ingress</strong>: capa L7 que enruta HTTP/HTTPS a servicios.</li>
    <li><strong>NetworkPolicy</strong>: firewall a nivel de pod.</li>
</ul>
    `
},
{
    title: '📋 Docker Compose y redes',
    content: `
<p><strong>Docker Compose</strong> es la forma estándar de orquestar varios contenedores. Las redes se definen en el YAML:</p>

<div class="cmd-block">
<span class="cmd-comment"># docker-compose.yml</span>
version: '3.8'

services:
  web:
    image: nginx
    ports:
      - "80:80"
    networks:
      - frontend
    depends_on:
      - app

  app:
    image: miapp:latest
    networks:
      - frontend
      - backend
    environment:
      DB_HOST: db
      DB_USER: appuser

  db:
    image: postgres:16
    networks:
      - backend
    environment:
      POSTGRES_PASSWORD: secreto
    volumes:
      - dbdata:/var/lib/postgresql/data

networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
    internal: true        <span class="cmd-comment"># Sin salida a internet</span>

volumes:
  dbdata:
</div>

<p>Lo que ocurre cuando haces <code>docker compose up</code>:</p>
<ol>
    <li>Compose crea las redes <code>frontend</code> y <code>backend</code>.</li>
    <li>Crea los 3 contenedores y los conecta a las redes correspondientes.</li>
    <li>El contenedor <code>app</code> está en ambas: hace de puente entre web y db.</li>
    <li>El contenedor <code>db</code> está aislado en <code>backend</code> (internal) — no puede salir a internet.</li>
    <li>Resolución DNS automática: <code>app</code> puede usar <code>db</code> como hostname.</li>
</ol>

<h4>🔧 Comandos útiles</h4>
<div class="cmd-block">
<span class="cmd-comment"># Listar todas las redes</span>
$ docker network ls

<span class="cmd-comment"># Inspeccionar una red (IPs, contenedores, opciones)</span>
$ docker network inspect mibridge

<span class="cmd-comment"># Conectar un contenedor ya corriendo a una red</span>
$ docker network connect mibridge micontenedor

<span class="cmd-comment"># Desconectar</span>
$ docker network disconnect mibridge micontenedor

<span class="cmd-comment"># Borrar una red (debe estar sin contenedores)</span>
$ docker network rm mibridge

<span class="cmd-comment"># Eliminar redes huérfanas</span>
$ docker network prune

<span class="cmd-comment"># Ver la IP de un contenedor</span>
$ docker inspect micontenedor | grep IPAddress
</div>

<h4>🔍 Debugging</h4>
<div class="cmd-block">
<span class="cmd-comment"># Entrar al contenedor y probar conexiones</span>
$ docker exec -it web sh
/ # ping db
/ # nslookup db
/ # netstat -an
/ # curl http://app:8080/

<span class="cmd-comment"># Ver iptables del host</span>
$ sudo iptables -L -n -v
$ sudo iptables -t nat -L -n -v
</div>

<h4>🌐 IPv6 en Docker</h4>
<p>Docker soporta IPv6 pero hay que habilitarlo explícitamente:</p>

<div class="cmd-block">
<span class="cmd-comment"># /etc/docker/daemon.json</span>
{
  "ipv6": true,
  "fixed-cidr-v6": "2001:db8:1::/64"
}

<span class="cmd-comment"># Reiniciar Docker</span>
$ sudo systemctl restart docker
</div>

<div class="curiosity-box">
    <h4>💡 Buenas prácticas de red en Docker</h4>
    <ul>
        <li>Siempre crear redes propias, no usar la <code>bridge</code> por defecto.</li>
        <li>Una red por "tier" (frontend, backend, db).</li>
        <li>Las bases de datos en redes <code>internal: true</code>.</li>
        <li>Limitar puertos publicados con <code>-p 127.0.0.1:8080:8080</code> si solo es para el host.</li>
        <li>Usar <strong>secrets</strong> de Docker, no variables de entorno con contraseñas.</li>
        <li>Para producción: Kubernetes o Docker Swarm, no <code>docker run</code> manual.</li>
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
// WIFI 6/6E/7
// ============================================================================
'wifi6-7': [
{
    title: '📶 La evolución del WiFi',
    content: `
<p>El WiFi ha pasado por 7 generaciones desde 1997. La Wi-Fi Alliance simplificó la nomenclatura en 2018: lo que antes era 802.11ax ahora se llama "WiFi 6". Más fácil para todos.</p>

<h4>📜 Tabla histórica</h4>
<table>
    <thead><tr><th>Generación</th><th>Estándar</th><th>Año</th><th>Bandas</th><th>Velocidad máx</th></tr></thead>
    <tbody>
        <tr><td>WiFi 1</td><td>802.11b</td><td>1999</td><td>2.4 GHz</td><td>11 Mbps</td></tr>
        <tr><td>WiFi 2</td><td>802.11a</td><td>1999</td><td>5 GHz</td><td>54 Mbps</td></tr>
        <tr><td>WiFi 3</td><td>802.11g</td><td>2003</td><td>2.4 GHz</td><td>54 Mbps</td></tr>
        <tr><td>WiFi 4</td><td>802.11n</td><td>2009</td><td>2.4 / 5 GHz</td><td>600 Mbps</td></tr>
        <tr><td>WiFi 5</td><td>802.11ac</td><td>2014</td><td>5 GHz</td><td>3.5 Gbps</td></tr>
        <tr><td>WiFi 6</td><td>802.11ax</td><td>2019</td><td>2.4 / 5 GHz</td><td>9.6 Gbps</td></tr>
        <tr><td>WiFi 6E</td><td>802.11ax</td><td>2021</td><td>2.4 / 5 / 6 GHz</td><td>9.6 Gbps</td></tr>
        <tr><td>WiFi 7</td><td>802.11be</td><td>2024</td><td>2.4 / 5 / 6 GHz</td><td>46 Gbps</td></tr>
    </tbody>
</table>

<h4>📡 Bandas y características</h4>
<ul>
    <li><strong>2.4 GHz</strong>: largo alcance, atraviesa muros bien. Solo 3 canales no solapados (1, 6, 11). Saturada en zonas urbanas. Usada por microondas, Bluetooth, ZigBee.</li>
    <li><strong>5 GHz</strong>: más canales (~25), menos saturada, más velocidad. Menor alcance, peor con muros.</li>
    <li><strong>6 GHz</strong>: nueva banda abierta en 2021 para WiFi 6E/7. 1.2 GHz de espectro (vs 500 MHz en 5 GHz). 59 canales de 20 MHz, 14 de 80 MHz, 7 de 160 MHz, 3 de 320 MHz. Limpia y rapidísima.</li>
</ul>

<div class="info-box">
    💡 En España, la banda de 6 GHz está disponible desde 2021 (canales 5945-6425 MHz). Necesitas dispositivos compatibles con WiFi 6E o 7.
</div>
    `
},
{
    title: '🚀 WiFi 6: OFDMA, MU-MIMO y TWT',
    content: `
<p>WiFi 6 (802.11ax) no es solo "más rápido". Introduce tecnologías que <strong>cambian cómo funciona el WiFi</strong>, especialmente en entornos saturados con muchos dispositivos.</p>

<h4>🎯 OFDMA: el cambio fundamental</h4>
<p>En WiFi 5 y anteriores, un AP habla con <strong>un cliente a la vez</strong>. Como un profesor con varios alumnos: solo puede atender a uno mientras los demás esperan.</p>

<p>OFDMA (Orthogonal Frequency-Division Multiple Access) divide cada canal en sub-canales llamados <strong>Resource Units (RU)</strong>. El AP puede:</p>
<ul>
    <li>Enviar datos a <em>varios clientes simultáneamente</em>, cada uno en su RU.</li>
    <li>Asignar más RUs al cliente que más necesita.</li>
    <li>Mejorar la latencia drásticamente para tráfico pequeño (IoT, voz, gaming).</li>
</ul>

<div class="info-box">
    💡 Analogía: si WiFi 5 es <em>un solo carril</em>, OFDMA convierte la carretera en <em>autopista de 8 carriles</em>: muchos coches viajan a la vez aunque cada uno vaya despacio.
</div>

<h4>📡 MU-MIMO mejorado</h4>
<p>MU-MIMO (Multi-User Multiple Input Multiple Output) ya existía en WiFi 5, pero solo en downlink y limitado a 4 usuarios. En WiFi 6:</p>
<ul>
    <li>Hasta <strong>8 usuarios simultáneos</strong> en downlink Y uplink.</li>
    <li>El AP usa múltiples antenas para formar haces direccionales (beamforming).</li>
    <li>Cada haz "viaja" hacia un cliente específico.</li>
</ul>

<h4>😴 TWT: Target Wake Time</h4>
<p>Brutal para IoT. El AP negocia con cada cliente cuándo "despertar" para transmitir. Un sensor que solo manda un dato cada hora puede dormir 99% del tiempo sin perder conectividad.</p>

<ul>
    <li>Reduce consumo de batería <strong>hasta 7x</strong> en dispositivos IoT.</li>
    <li>Permite redes con miles de sensores sin saturación.</li>
    <li>Para móviles y portátiles: mayor duración de batería.</li>
</ul>

<h4>🔐 WPA3 obligatorio</h4>
<p>Todo equipo certificado WiFi 6 debe soportar <strong>WPA3</strong>:</p>
<ul>
    <li>SAE (Simultaneous Authentication of Equals) reemplaza al débil 4-way handshake.</li>
    <li>Resistente a ataques offline de diccionario.</li>
    <li>Forward secrecy: aunque alguien grabe el handshake y luego obtenga la PSK, no puede descifrar el tráfico pasado.</li>
</ul>

<h4>🎨 1024-QAM</h4>
<p>WiFi 5 usaba 256-QAM (codifica 8 bits por símbolo). WiFi 6 usa <strong>1024-QAM</strong> (10 bits por símbolo). Resultado: <strong>+25% de capacidad</strong> en las mismas condiciones físicas.</p>
    `
},
{
    title: '⚡ WiFi 6E y 7: el salto definitivo',
    content: `
<h4>🎁 WiFi 6E: WiFi 6 + banda de 6 GHz</h4>
<p>WiFi 6E es <em>técnicamente</em> el mismo 802.11ax que WiFi 6. La diferencia: añade la <strong>banda de 6 GHz</strong>, que estaba reservada y se abrió para uso WiFi en 2021.</p>

<p>Ventajas de la banda 6 GHz:</p>
<ul>
    <li>Sin tráfico legacy (no hay WiFi 4/5 que aproveche estos canales).</li>
    <li>Mucho más espectro (1.2 GHz vs ~500 MHz en 5 GHz).</li>
    <li>Canales contiguos de 80 MHz o 160 MHz sin solapamientos.</li>
    <li>Latencia ultra-baja por la ausencia de congestión.</li>
</ul>

<h4>🚀 WiFi 7 (802.11be): "Extremely High Throughput"</h4>
<p>Lanzado comercialmente en 2024. Las mejoras más impactantes:</p>

<h4>1️⃣ Canales de 320 MHz</h4>
<p>WiFi 6 maxa en canales de 160 MHz. WiFi 7 dobla a 320 MHz. Más ancho de canal = más velocidad bruta. Solo posible en la banda de 6 GHz (donde cabe).</p>

<h4>2️⃣ MLO — Multi-Link Operation</h4>
<p>El cambio más profundo. Un dispositivo WiFi 7 puede usar <strong>las 3 bandas simultáneamente</strong> (2.4 + 5 + 6 GHz). Beneficios:</p>
<ul>
    <li><strong>Agregación de ancho de banda</strong>: sumas las velocidades.</li>
    <li><strong>Failover automático</strong>: si una banda se congestiona o se pierde, el tráfico se balancea.</li>
    <li><strong>Latencia menor</strong>: el frame puede ir por la banda con menos cola.</li>
    <li><strong>Streaming sin microcortes</strong>: ideal para gaming online y videollamadas.</li>
</ul>

<h4>3️⃣ 4096-QAM</h4>
<p>WiFi 6 usa 1024-QAM. WiFi 7 sube a 4096-QAM (12 bits por símbolo). <strong>+20% sobre WiFi 6</strong> en condiciones óptimas.</p>

<h4>4️⃣ Multi-RU asignación flexible</h4>
<p>En WiFi 6, un cliente solo recibe RUs contiguas. En WiFi 7, puede recibir RUs en distintas partes del canal. Aprovecha mejor el espectro fragmentado.</p>

<h4>5️⃣ Latencia determinística</h4>
<p>WiFi 7 introduce mecanismos para garantizar latencia máxima a tráfico crítico (VR, control industrial). Muy importante para 5G + WiFi convergente.</p>

<h4>🥊 Comparativa rápida</h4>
<table>
    <thead><tr><th></th><th>WiFi 6</th><th>WiFi 6E</th><th>WiFi 7</th></tr></thead>
    <tbody>
        <tr><td>Estándar</td><td>802.11ax</td><td>802.11ax</td><td>802.11be</td></tr>
        <tr><td>Bandas</td><td>2.4 + 5 GHz</td><td>2.4 + 5 + 6 GHz</td><td>2.4 + 5 + 6 GHz</td></tr>
        <tr><td>Ancho de canal máx</td><td>160 MHz</td><td>160 MHz</td><td>320 MHz</td></tr>
        <tr><td>Modulación máx</td><td>1024-QAM</td><td>1024-QAM</td><td>4096-QAM</td></tr>
        <tr><td>MU-MIMO</td><td>8 streams</td><td>8 streams</td><td>16 streams</td></tr>
        <tr><td>MLO</td><td>No</td><td>No</td><td>Sí</td></tr>
        <tr><td>Velocidad teórica</td><td>9.6 Gbps</td><td>9.6 Gbps</td><td>46 Gbps</td></tr>
    </tbody>
</table>

<div class="concept-box">
    <h4>🎯 ¿Cuándo cambiar?</h4>
    <ul>
        <li>Si tienes WiFi 5 y muchos dispositivos: <strong>cambiar a WiFi 6</strong> ya merece la pena.</li>
        <li>Si tienes WiFi 6 funcionando bien: WiFi 7 es <em>future-proofing</em>, no urgente.</li>
        <li>En oficinas con &gt;50 dispositivos: WiFi 6E mínimo.</li>
        <li>Para CPDs / video profesional / gaming serio: WiFi 7.</li>
    </ul>
    Recuerda: para aprovechar 6 GHz, <strong>todos los dispositivos</strong> deben ser WiFi 6E o 7. Los teléfonos viejos seguirán en 2.4/5 GHz.
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
// WIFI MESH Y ROAMING
// ============================================================================
'wifi-mesh-roaming': [
{
    title: '🕸️ ¿Qué es una red WiFi mesh?',
    content: `
<p>Una <strong>red mesh</strong> (mallada) es un sistema de varios puntos de acceso que cooperan para ofrecer cobertura amplia con una sola red WiFi (un SSID). Los nodos se conectan entre sí inalámbricamente o por cable, y el cliente "salta" entre ellos transparentemente.</p>

<h4>🆚 Mesh vs repetidor tradicional</h4>
<table>
    <thead><tr><th></th><th>Repetidor (extender)</th><th>Mesh</th></tr></thead>
    <tbody>
        <tr><td>SSID</td><td>Diferente por nodo</td><td>Único en toda la red</td></tr>
        <tr><td>Roaming</td><td>Manual (cliente decide)</td><td>Automático y rápido</td></tr>
        <tr><td>Velocidad</td><td>Se reduce a la mitad</td><td>Backhaul dedicado</td></tr>
        <tr><td>Gestión</td><td>Cada nodo aparte</td><td>App única, mapa global</td></tr>
        <tr><td>Self-healing</td><td>No</td><td>Sí (si un nodo cae, otros buscan rutas)</td></tr>
    </tbody>
</table>

<h4>📡 Backhaul: el cuello de botella</h4>
<p>El <strong>backhaul</strong> es el enlace entre nodos mesh. Hay dos modos:</p>
<ul>
    <li><strong>Wireless backhaul</strong>: los nodos se hablan por WiFi. Lo más común en hogar. Si todos usan la misma banda que los clientes, la velocidad se divide.</li>
    <li><strong>Wired backhaul</strong>: cable Ethernet entre nodos. <strong>Lo mejor.</strong> Velocidad full, latencia mínima.</li>
    <li><strong>Tri-band</strong>: nodos con 3 radios (2.4 + 5 + 5 dedicado al backhaul). Compromiso intermedio.</li>
</ul>

<div class="concept-box">
    <h4>💡 Regla de oro de mesh</h4>
    <p>Si puedes, <strong>siempre cableado backhaul</strong>. Aunque te toque tirar un cable por la pared, te dará 2-3x más velocidad que el mesh inalámbrico. Si no puedes, busca un sistema tri-band.</p>
</div>

<h4>📦 Sistemas mesh populares</h4>
<ul>
    <li><strong>Hogar</strong>: TP-Link Deco, Asus ZenWiFi, Netgear Orbi, Eero (Amazon), Google Nest WiFi.</li>
    <li><strong>SOHO/Pyme</strong>: Ubiquiti UniFi, MikroTik, TP-Link Omada.</li>
    <li><strong>Empresarial</strong>: Cisco Meraki, Aruba Instant On, Aruba CX/CMP, Ruckus.</li>
</ul>

<h4>🧠 Protocolos detrás del mesh</h4>
<ul>
    <li><strong>IEEE 802.11s</strong>: estándar para mesh WiFi. Definido en 2011.</li>
    <li><strong>HWMP</strong> (Hybrid Wireless Mesh Protocol): el protocolo de routing dentro del mesh 802.11s.</li>
    <li>Muchos fabricantes implementan sus propios protocolos propietarios (Eero usa una variante).</li>
</ul>
    `
},
{
    title: '🚶 Roaming: cambiar de AP sin cortarse',
    content: `
<p>Cuando un cliente WiFi se mueve y se aleja del AP actual, debería conectarse al AP más cercano. Pero la <strong>decisión de roaming la toma el cliente</strong>, no la red. Esto crea problemas:</p>

<h4>🐛 El problema del "sticky client"</h4>
<p>Muchos clientes (especialmente Apple antiguos) se quedan "pegados" al AP original incluso si la señal es pésima. No saltan al AP cercano. Resultado: zumbidos en llamadas, vídeos a 240p, sensación de "internet lento".</p>

<p>Los APs pueden ayudar enviando hints al cliente, pero hace falta soporte por ambos lados.</p>

<h4>📋 Estándares de roaming</h4>

<h4>🔑 802.11k (Radio Resource Management)</h4>
<p>El AP <strong>publica una lista de "vecinos"</strong> al cliente: APs cercanos con sus canales, potencia y MAC. El cliente sabe a dónde puede saltar sin tener que escanear desde cero.</p>

<h4>⚡ 802.11r (Fast Transition)</h4>
<p>Cuando un cliente cambia de AP, normalmente debe re-autenticarse (4-way handshake WPA2). Eso tarda 200-500 ms — suficiente para cortar una llamada VoIP.</p>

<p>802.11r introduce <strong>Fast Transition (FT)</strong>: la autenticación se hace por anticipado con los APs vecinos. El cambio dura <strong>menos de 50 ms</strong>. Transparente para el usuario.</p>

<h4>📊 802.11v (BSS Transition Management)</h4>
<p>El AP puede <strong>sugerirle activamente al cliente</strong> que cambie de AP: "Hola cliente, hay otro AP con mejor señal en MAC XX:XX, considera saltar". Clientes modernos hacen caso.</p>

<h4>📡 802.11u (Hotspot 2.0 / Passpoint)</h4>
<p>Más enfocado a roaming entre operadores. Permite que un cliente con SIM/cuenta se autentique automáticamente en redes WiFi de aeropuertos, hoteles, etc.</p>

<div class="info-box">
    💡 La combinación mágica: <strong>802.11k + 802.11v + 802.11r</strong>. Hay quien le llama "KVR". En APs empresariales (Aruba, Meraki, Mist) viene activado por defecto. En consumer/SOHO depende del fabricante.
</div>

<h4>🎚️ Configuración profesional</h4>
<p>Buenas prácticas para minimizar problemas de roaming:</p>
<ul>
    <li><strong>Solapamiento de cobertura del 15-25%</strong> entre APs vecinos. Ni más (interferencias), ni menos (zonas muertas).</li>
    <li><strong>Power balancing</strong>: si subes la potencia del AP, los clientes lejanos se "estiran" demasiado. Mejor potencia moderada y más APs.</li>
    <li><strong>Channel reuse</strong>: en 2.4 GHz usar solo canales 1, 6 y 11 alternándolos. En 5 GHz hay 25+ canales: planificación automática (DCA/ARM).</li>
    <li><strong>Min RSSI</strong>: configurar el umbral por debajo del cual el AP "echa" al cliente para forzar el roaming.</li>
    <li><strong>Band steering</strong>: empujar a clientes dual-band hacia 5 GHz, liberando 2.4 GHz para los antiguos.</li>
    <li><strong>Disable lowest rates</strong>: deshabilitar 802.11b (1, 2, 5.5, 11 Mbps). Fuerzan la red a velocidades bajas y reducen capacidad de todos.</li>
</ul>
    `
},
{
    title: '🗺️ Site survey y planificación',
    content: `
<p>Una red WiFi profesional <strong>no se improvisa</strong>. Antes de comprar APs hay que planificar.</p>

<h4>📐 Predictive site survey</h4>
<p>Con software como <strong>Ekahau Pro</strong>, <strong>iBwave</strong> o <strong>NetSpot</strong>:</p>
<ol>
    <li>Cargas el plano del edificio.</li>
    <li>Defines materiales de paredes (hormigón, pladur, cristal).</li>
    <li>Colocas APs virtuales con sus especificaciones.</li>
    <li>El software calcula heatmaps de cobertura, capacidad y SNR.</li>
    <li>Ajustas hasta que cumple los requisitos.</li>
</ol>

<h4>🚶 Active site survey</h4>
<p>Una vez instalados los APs, recorres el edificio con un portátil + Ekahau o NetSpot midiendo señal real. Sirve para:</p>
<ul>
    <li>Verificar que el predictive coincide con la realidad.</li>
    <li>Encontrar zonas muertas no detectadas.</li>
    <li>Identificar interferencias externas.</li>
    <li>Documentar para el cliente.</li>
</ul>

<h4>🎯 Métricas clave</h4>
<ul>
    <li><strong>RSSI</strong> (Received Signal Strength Indicator): potencia de señal en dBm. Mejor que -65 dBm es excelente, peor que -75 dBm es marginal.</li>
    <li><strong>SNR</strong> (Signal to Noise Ratio): diferencia entre señal y ruido. &gt;25 dB ideal.</li>
    <li><strong>Channel utilization</strong>: porcentaje de tiempo que el canal está ocupado. &lt;30% bien, &gt;60% saturado.</li>
    <li><strong>Co-channel interference</strong>: APs cercanos en el mismo canal compitiendo. Minimizar.</li>
    <li><strong>Latency / jitter</strong>: en VoIP / videollamadas debe ser bajo y estable.</li>
</ul>

<h4>🏢 Densidad de APs</h4>
<table>
    <thead><tr><th>Escenario</th><th>Densidad típica</th></tr></thead>
    <tbody>
        <tr><td>Oficina abierta</td><td>1 AP cada 150-200 m²</td></tr>
        <tr><td>Aulas / sala reuniones</td><td>1 AP por aula</td></tr>
        <tr><td>Almacén / industrial</td><td>1 AP cada 300-500 m² (más alcance)</td></tr>
        <tr><td>Hotel</td><td>1 AP cada 2-3 habitaciones</td></tr>
        <tr><td>Auditorios / estadios</td><td>Diseño "alta densidad" con APs muy cercanos y potencia baja</td></tr>
    </tbody>
</table>

<div class="warning-box">
    ⚠️ Error típico: poner pocos APs con potencia máxima. Resultado: cobertura aparente pero capacidad ruinosa. Más APs con potencia <strong>moderada</strong> dan siempre mejor experiencia.
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
// WIFI EMPRESARIAL
// ============================================================================
'wifi-empresarial': [
{
    title: '🏢 WPA2/WPA3 Personal vs Enterprise',
    content: `
<p>En tu casa, el WiFi usa una contraseña ("preshared key", PSK) compartida por todos. En la empresa eso es inaceptable: ¿qué pasa cuando un empleado se va? ¿Cambias la PSK para todos? Imposible.</p>

<p>La solución es <strong>WPA2-Enterprise</strong> (y su sucesor WPA3-Enterprise): cada usuario se autentica con sus propias credenciales contra un <strong>servidor RADIUS</strong>.</p>

<h4>📊 Comparativa</h4>
<table>
    <thead><tr><th></th><th>Personal (PSK)</th><th>Enterprise (802.1X)</th></tr></thead>
    <tbody>
        <tr><td>Autenticación</td><td>Contraseña compartida</td><td>Usuario/contraseña o certificado por usuario</td></tr>
        <tr><td>Servidor central</td><td>No</td><td>RADIUS</td></tr>
        <tr><td>Revocación individual</td><td>No (hay que cambiar PSK global)</td><td>Sí, instantánea</td></tr>
        <tr><td>VLAN dinámica</td><td>No</td><td>Sí, según usuario/grupo</td></tr>
        <tr><td>Auditoría por usuario</td><td>No</td><td>Sí (logs por usuario, IP, hora)</td></tr>
        <tr><td>Complejidad</td><td>Trivial</td><td>Media-alta</td></tr>
    </tbody>
</table>

<h4>🔐 802.1X: el protocolo</h4>
<p>802.1X es un estándar para autenticación de acceso a red, no exclusivo de WiFi (también se usa en switches cableados). Tres actores:</p>
<ul>
    <li><strong>Supplicant</strong>: el cliente (portátil, móvil) que quiere conectarse.</li>
    <li><strong>Authenticator</strong>: el AP (o switch en wired) que controla el acceso.</li>
    <li><strong>Authentication Server</strong>: el RADIUS que valida credenciales.</li>
</ul>

<p>El AP no sabe si las credenciales son correctas. Las pasa al RADIUS y obedece su veredicto: <em>accept</em> (permite, opcionalmente asigna VLAN) o <em>reject</em> (bloquea).</p>

<h4>📋 EAP: la familia de métodos</h4>
<p>EAP (Extensible Authentication Protocol) define cómo se intercambian las credenciales. Hay varios "métodos EAP":</p>

<table>
    <thead><tr><th>Método</th><th>Credenciales</th><th>Cifrado</th><th>Uso</th></tr></thead>
    <tbody>
        <tr>
            <td><strong>EAP-TLS</strong></td>
            <td>Certificados (cliente + servidor)</td>
            <td>TLS</td>
            <td>Lo más seguro. Estándar profesional.</td>
        </tr>
        <tr>
            <td><strong>EAP-TTLS</strong></td>
            <td>Certificado servidor + user/pass cliente</td>
            <td>Túnel TLS</td>
            <td>Compromiso entre seguridad y facilidad.</td>
        </tr>
        <tr>
            <td><strong>PEAP-MSCHAPv2</strong></td>
            <td>Certificado servidor + user/pass cliente</td>
            <td>Túnel TLS</td>
            <td>Muy común en entornos Windows/AD.</td>
        </tr>
        <tr>
            <td><strong>EAP-FAST</strong></td>
            <td>PAC (Protected Access Credential)</td>
            <td>Túnel</td>
            <td>Cisco propietario.</td>
        </tr>
        <tr>
            <td><strong>EAP-SIM/AKA</strong></td>
            <td>SIM del móvil</td>
            <td>Sí</td>
            <td>Operadores (Hotspot 2.0).</td>
        </tr>
        <tr>
            <td><strong>EAP-MD5</strong></td>
            <td>Hash débil</td>
            <td>No</td>
            <td>❌ Obsoleto, inseguro.</td>
        </tr>
    </tbody>
</table>

<div class="concept-box">
    <h4>🎯 Recomendación</h4>
    <p><strong>EAP-TLS</strong> con certificados emitidos por una PKI interna es lo más seguro. No usa contraseñas (impossible phishing), revocas un certificado y el usuario queda fuera al instante.<br>
    <strong>PEAP-MSCHAPv2</strong> es lo más común porque integra fácil con Active Directory. Es seguro <em>siempre que el cliente verifique el certificado del servidor</em>. Si no lo verifica, vulnerable a "evil twin" attacks.</p>
</div>
    `
},
{
    title: '🛠️ Montar un RADIUS con FreeRADIUS',
    content: `
<p><strong>FreeRADIUS</strong> es el servidor RADIUS open source más usado del mundo. Lo instalamos en una Linux (Ubuntu/Debian):</p>

<div class="cmd-block">
$ sudo apt update
$ sudo apt install freeradius freeradius-utils

<span class="cmd-comment"># Estructura de configuración</span>
/etc/freeradius/3.0/
├── clients.conf       <span class="cmd-comment"># APs/switches autorizados</span>
├── users               <span class="cmd-comment"># Usuarios locales (legacy, mejor usar SQL)</span>
├── mods-enabled/       <span class="cmd-comment"># Módulos activos</span>
├── sites-enabled/      <span class="cmd-comment"># Sitios (default, inner-tunnel)</span>
└── certs/              <span class="cmd-comment"># Certificados PKI</span>
</div>

<h4>📋 clients.conf — registrar APs</h4>
<div class="cmd-block">
client AP_Oficina1 {
    ipaddr = 192.168.99.10
    secret = MiSecretoCompartido2026
    require_message_authenticator = yes
    nas_type = other
}

client AP_Range {
    ipaddr = 192.168.99.0/24
    secret = MiSecretoCompartido2026
}
</div>

<h4>👤 users — usuarios locales</h4>
<div class="cmd-block">
"igor" Cleartext-Password := "MiContraseñaSegura2026"
        Reply-Message = "Bienvenido Igor",
        Tunnel-Type = VLAN,
        Tunnel-Medium-Type = IEEE-802,
        Tunnel-Private-Group-Id = "10"

"ainhoa" Cleartext-Password := "OtraContraseña2026"
        Tunnel-Type = VLAN,
        Tunnel-Medium-Type = IEEE-802,
        Tunnel-Private-Group-Id = "20"
</div>

<p>Aquí ya tenemos VLAN dinámica: <em>Igor</em> entra a VLAN 10, <em>Ainhoa</em> a VLAN 20.</p>

<h4>🔗 Integración con LDAP/Active Directory</h4>
<p>En empresa real, los usuarios están en AD. Configuramos FreeRADIUS para validar contra AD:</p>

<div class="cmd-block">
<span class="cmd-comment"># En mods-enabled/ldap o mods-enabled/mschap</span>
ldap {
    server = 'ldap://dc.empresa.local'
    identity = 'cn=radius,ou=Service Accounts,dc=empresa,dc=local'
    password = 'PasswordServiceAccount'
    base_dn = 'dc=empresa,dc=local'
    user {
        base_dn = 'ou=Users,dc=empresa,dc=local'
        filter = '(sAMAccountName=%{User-Name})'
    }
}
</div>

<h4>🧪 Pruebas con radtest</h4>
<div class="cmd-block">
$ radtest igor MiContraseñaSegura2026 localhost 1812 testing123

<span class="cmd-comment"># Respuesta esperada:</span>
Received Access-Accept Id 12 from 127.0.0.1:1812
        Reply-Message = "Bienvenido Igor"
        Tunnel-Type = VLAN
        Tunnel-Medium-Type = IEEE-802
        Tunnel-Private-Group-Id = "10"
</div>

<h4>📡 Configurar el AP / Controlador</h4>
<p>En la mayoría de WLCs:</p>
<ol>
    <li>Crear servidor RADIUS: IP del FreeRADIUS, secreto compartido, puertos 1812/1813.</li>
    <li>Crear SSID Enterprise: Security → WPA2/WPA3 Enterprise → RADIUS server.</li>
    <li>Opcional: habilitar Dynamic VLAN Assignment.</li>
    <li>Asociar APs al SSID.</li>
</ol>

<h4>🏆 Productos comerciales alternativos</h4>
<ul>
    <li><strong>Microsoft NPS</strong> (Network Policy Server): RADIUS integrado en Windows Server.</li>
    <li><strong>Cisco ISE</strong>: la "Rolls Royce" del NAC. Muy potente, muy caro.</li>
    <li><strong>Aruba ClearPass</strong>: alternativa a ISE.</li>
    <li><strong>PacketFence</strong>: open source con interfaz web amigable.</li>
    <li><strong>JumpCloud / Foxpass / SecureW2</strong>: RADIUS-as-a-Service en la nube.</li>
</ul>
    `
},
{
    title: '🎫 Captive portals y redes de invitados',
    content: `
<p>Un <strong>captive portal</strong> es la página web que aparece cuando te conectas al WiFi de un hotel, aeropuerto o cafetería. Sirve para:</p>
<ul>
    <li>Mostrar términos de uso (legal).</li>
    <li>Pedir email, móvil o datos personales (marketing).</li>
    <li>Cobrar acceso (hotels premium).</li>
    <li>Limitar tiempo/ancho de banda.</li>
    <li>Autenticar invitados sin distribuir contraseñas.</li>
</ul>

<h4>⚙️ Cómo funciona</h4>
<ol>
    <li>El cliente conecta al SSID (típicamente abierto o con PSK simple).</li>
    <li>Obtiene IP por DHCP, pero el AP/controlador <strong>intercepta todo el tráfico HTTP/HTTPS</strong>.</li>
    <li>Cuando el cliente intenta abrir cualquier web, se le redirige al portal de login.</li>
    <li>Tras autenticarse o aceptar términos, el AP le pone en una "whitelist" y le deja salir.</li>
    <li>Pasado X tiempo o al desconectar, vuelve a la pantalla de login.</li>
</ol>

<h4>📜 Tipos de autenticación en captive portal</h4>
<ul>
    <li><strong>Click-through</strong>: solo aceptar T&amp;C, sin credenciales. Lo más simple.</li>
    <li><strong>Email/SMS</strong>: pide email o móvil, envía un código de verificación.</li>
    <li><strong>Social login</strong>: "entrar con Google/Facebook" (privacidad cuestionable).</li>
    <li><strong>Voucher/código</strong>: el recepcionista da un papelito con código de un solo uso.</li>
    <li><strong>Pago</strong>: integrado con Stripe/PayPal.</li>
    <li><strong>Externo</strong> (RADIUS, LDAP): usuarios corporativos.</li>
</ul>

<div class="warning-box">
    ⚠️ <strong>Captive portals + HSTS = problemas</strong>. Las webs con HSTS impiden ver el portal porque el navegador rehúsa hacer downgrade a HTTP. Solución: que el cliente intente abrir un dominio sin HTTPS como <code>captive.apple.com</code> o <code>connectivitycheck.android.com</code>, que es lo que muchos OS hacen automáticamente.
</div>

<h4>🌐 Redes de invitados: arquitectura</h4>
<p>Buenas prácticas para invitados:</p>
<ul>
    <li><strong>SSID separado</strong> con VLAN dedicada (típicamente VLAN 50 o 80).</li>
    <li><strong>Aislamiento del cliente</strong> (client isolation): los invitados no se ven entre sí.</li>
    <li><strong>Sin acceso a la LAN corporativa</strong>: ACL "deny ip any 192.168.0.0/16".</li>
    <li><strong>Solo internet</strong>: web, DNS y poco más. Bloquear P2P, SMTP saliente.</li>
    <li><strong>Bandwidth shaping</strong>: limitar a 5-10 Mbps por usuario.</li>
    <li><strong>Filtrado DNS</strong>: Cloudflare 1.1.1.2 (family) o Cisco Umbrella para bloquear malware/porno.</li>
    <li><strong>Logs por GDPR</strong>: retener mínimo necesario, anonimizar, política clara.</li>
</ul>

<h4>📋 Configuración típica en UniFi/Aruba</h4>
<div class="cmd-block">
<span class="cmd-comment"># Concepto general (varía por fabricante)</span>
SSID: Invitados-Empresa
Encryption: Open + Captive Portal
VLAN: 80
Client Isolation: enabled
Bandwidth Limit: 5 Mbps down / 2 Mbps up
Allowed Domains pre-auth: connectivitycheck.gstatic.com, captive.apple.com, etc.
Portal: Vouchers con expiración 24h
DNS: 1.1.1.2, 9.9.9.9
ACL: deny ip any 192.168.0.0/16, deny ip any 10.0.0.0/8, permit ip any any
</div>

<div class="curiosity-box">
    <h4>💡 Mejor práctica: PPSK</h4>
    <p>Una alternativa moderna entre PSK y Enterprise: <strong>PPSK</strong> (Per-PSK), también llamado iPSK, MPSK o Private PSK. Misma SSID, pero cada usuario tiene su propia contraseña. Si te vas, te revocan tu PSK sin afectar a los demás. Soportado por Aruba, Cisco Meraki, Ubiquiti UniFi y otros.</p>
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
]

});
