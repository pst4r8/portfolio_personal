# Portfolio — Javier Sánchez López

Portfolio personal desarrollado en HTML, CSS y JavaScript vanilla. Sin frameworks ni dependencias de build.

## Tecnologías

- **HTML5** — estructura semántica con SEO, Open Graph y JSON-LD
- **CSS3** — variables, Grid, Flexbox, animaciones, tema claro/oscuro
- **JavaScript** — vanilla ES6+, sin frameworks
- **AOS** — animaciones al hacer scroll
- **Font Awesome 6.5** — iconografía
- **SweetAlert2** — alertas y notificaciones
- **Google Fonts** — Inter + JetBrains Mono
- **Formspree** — backend del formulario de contacto

> Todas las librerías están descargadas localmente en `libs/` para evitar dependencias de CDN.

## Estructura

```
portfolio/
├── index.html          # Página principal
├── style.css           # Todos los estilos
├── script.js           # Toda la lógica JS
├── favicon.svg         # Favicon SVG personalizado
├── curriculum_javi_dev.pdf
├── perfil.jpeg         # Foto de perfil (no incluida en el repo)
└── libs/
    ├── aos/            # Animate On Scroll
    ├── fontawesome/    # Font Awesome (CSS + webfonts)
    ├── sweetalert2/    # SweetAlert2
    └── fonts/          # Inter + JetBrains Mono (woff2)
```

## Secciones

1. **Hero** — presentación con efecto typing y foto de perfil
2. **Sobre mí** — stack técnico con barras de nivel
3. **Experiencia** — timeline de trayectoria laboral
4. **Formación** — estudios y certificaciones
5. **Proyectos** — grid filtrable (Empresa / Personal)
6. **Contacto** — formulario funcional

## Funcionalidades

- Tema claro/oscuro con persistencia en `localStorage` (claro por defecto)
- Navbar con scroll activo y menú hamburguesa en móvil
- Filtro de proyectos por origen (Empresa / Personal)
- Formulario de contacto con validación JS y envío real
- FAB (Floating Action Button) con accesos rápidos a teléfono, LinkedIn y CV
- Cursor personalizado verde con dot + anillo animado (solo escritorio)
- Totalmente responsivo


## Contacto

**Javier Sánchez López**
[javisanchezlopezdev@gmail.com](mailto:javisanchezlopezdev@gmail.com)
[linkedin.com/in/javier-sánchez-lópez](https://www.linkedin.com/in/javier-s%C3%A1nchez-l%C3%B3pez-615687227/)
[github.com/JavierSA-dev](https://github.com/JavierSA-dev)
