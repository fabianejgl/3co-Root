// Objeto Document
// Métodos
// Propiedad: innerHTML
// Template String
document.getElementById("idheader").innerHTML = `
    <!-- IZQ: Logo -->
    <div class="logo">
        <a href="index.html"><img src="imgs/img-root/logo.png" alt="Logo de la empresa"></a>
    </div>

    <!-- DER: Buscador --- persona, carrito, menú hamburguesa-->
    <div class="nav-header">
        <div class="buscador">
            <input type="text" placeholder="Buscar productos, vendedores...">
            <button><img src="imgs/img-root/lupa.png" alt="Icono de usuario"></button>
        </div>
        
        <div class="icons">
            <a href=""><img src="imgs/img-root/usuario.png" alt="Icono de usuario"></a>
            <a href=""><img src="imgs/img-root/carro.png" alt="Icono de carrito de compras"></a>
            <a href=""><img src="imgs/img-root/menu.png" alt="Icono de menú desplegable"></a>
        </div>
    </div>
`
document.getElementById("idfooter").innerHTML = `
    <div class="footer-top">
        <ul>
            <p class="eco-root"><span>3</span>CO <span>R</span>OOT</p>
            <p>CABA, Argentina</p>
            <a href="https://www.pescar.org.ar/" target="_blank"><strong>Fundación Pescar</strong></a>

            <!-- <div class="redes">

            </div> -->
        </ul>
        <ul>
            <p class="titulo-footer"><strong>Categorías</strong></p>
            <div class="links-footer">
                <a id="reciclado" href="">Reciclados</a>
                <a id="reutilizable" href="">Reutilizables</a>
                <a id="biodeg" href="">Biodegradables</a>
                <a id="seg-mano" href="">Segunda Mano</a>
                <a id="restau" href="">Restaurados</a>
            </div>                
        </ul>
        <ul>
            <p class="titulo-footer"><strong>Contacto</strong></p>
            <!-- <div class="links-footer">     -->
            <a id="nosotros" href="">Sobre nosotros</a>
            <a id="noticias" href="">Noticias sustentables</a>
            <!-- </div> -->
        </ul>
    </div>
    <div class="footer-bottom">
        <p>@Webecy - All Rights Reserved</p>
    </div>
`