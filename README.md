# Dr. García Arrieta — Sitio Web

Propuesta de rediseño premium para el Dr. Francisco Arturo García Arrieta, urólogo especialista en Tijuana, BC.

## Stack

- **Next.js 16** — App Router
- **React 19**
- **Tailwind CSS v4** — paleta personalizada (navy + teal)
- **GSAP 3** — animaciones de hero y entrance
- **Resend** — envío de correos desde el formulario de contacto
- **Zod** — validación del formulario
- **Lucide React + React Icons** — iconografía

## Estructura

```
app/
  globals.css       # Tema, colores, animaciones CSS
  layout.tsx        # Metadata SEO
  page.tsx          # Entrada principal
  api/contact/      # Endpoint formulario de contacto
components/
  LandingPage.tsx   # Componente principal (~700 líneas)
```

## Secciones

1. **Hero** — split layout, foto real del doctor, animación GSAP
2. **Marquee** — banda de credenciales animada
3. **Stats** — 425+ reseñas, 80K seguidores, 24/7, 10+ años
4. **Servicios** — grid de 16 especialidades urológicas
5. **HoLEP Spotlight** — video real + copy técnico
6. **Procedimientos en Video** — autoplay por scroll
7. **¿Por qué elegirnos?** — 3 diferenciadores con iconos
8. **Especialista** — perfil del doctor con credenciales
9. **Hospitales** — centros de adscripción
10. **Urgencias CTA** — llamada a la acción de emergencia
11. **Testimonios** — doble marquee automático (425+ reseñas)
12. **Redes Sociales** — Instagram, TikTok, Facebook, YouTube
13. **Contacto** — formulario + datos de contacto
14. **Footer** — cédulas, contacto, redes

## Desarrollo

```bash
npm install
npm run dev
```

## Variables de entorno

Crea un archivo `.env.local` con:

```env
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_EMAIL=centroavanzadodeurologia@gmail.com
```
