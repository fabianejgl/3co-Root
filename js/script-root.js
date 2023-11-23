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
            <input type="text" placeholder="Buscar productos...">
            <button><img src="imgs/img-root/lupa.svg" alt="Icono de búsqueda"></button>
        </div>
        
        <div class="icons">
            <a href=""><img src="imgs/img-root/usuario.svg" alt="Icono de usuario"></a>
            <a href=""><img src="imgs/img-root/carro.svg" alt="Icono de carrito de compras"></a>
            <a href=""><img src="imgs/img-root/menu.svg" alt="Icono de menú desplegable"></a>
        </div>
    </div>
`
document.getElementById("idfooter").innerHTML = `
    <div class="footer-top">
        <ul>
            <p class="eco-root"><span>3</span>CO <span>R</span>OOT</p>
            <p>CABA, Argentina</p>
            <div class="links-footer">
                <a href="https://www.pescar.org.ar/" target="_blank"><strong>Fundación Pescar</strong></a>
            <div>

            <!-- <div class="redes">

            </div> -->
        </ul>
        <ul>
            <p class="titulo-footer"><strong>Categorías</strong></p>
            <div class="links-footer">
                <a href="">Reciclados</a>
                <a href="">Reutilizables</a>
                <a href="">Biodegradables</a>
                <a href="">Segunda Mano</a>
                <a href="">Restaurados</a>
            </div>
        </ul>
        <ul>
            <p class="titulo-footer"><strong>Info</strong></p>
            <!-- <div class="links-footer">     -->
            <div class="links-footer">
                <a id="nosotros" href="">Sobre nosotros</a>
                <a id="noticias" href="">Noticias sustentables</a>
            </div>
            <!-- </div> -->
        </ul>
    </div>
    <div class="footer-bottom">
        <p>@Webecy - All Rights Reserved</p>
    </div>
`