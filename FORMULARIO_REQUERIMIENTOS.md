# Formulario de Levantamiento de Información — Tarjeta Digital de Contacto (Landing Page)

Este formulario contiene todos los campos y espacios disponibles en la plantilla de **Tarjeta Digital**, estructurados exactamente en el mismo orden y jerarquía que las secciones del código y diseño del desarrollo.

---

## 📌 Guía Rápida para el Cliente
- **Objetivo**: Recopilar la información, enlaces, fotografías y datos necesarios para crear su tarjeta digital interactiva personalizada.
- **Campos Obligatorios (*)**: Aquellos indispensables para la funcionalidad principal.
- **Campos Opcionales**: Espacios que pueden incluirse u ocultarse según sus necesidades actuales.
- **Formatos de Imágenes**: Enviar archivos en formato PNG o JPG en alta calidad.

---

## Bloque 0: Configuración General y SEO (Google y Compartir en Redes)
*Configura cómo se verá el enlace cuando se comparta por WhatsApp, Facebook o cuando aparezca en motores de búsqueda.*

| Campo | Requisito / Formato | Ejemplo de Referencia | Respuesta del Cliente |
| :--- | :--- | :--- | :--- |
| **Título de la Pestaña / Web\*** | Máx. 60 caracteres | `Dra. Martha Granados \| Tarjeta Digital & Contacto` | `___________________________________` |
| **Descripción Breve (SEO)\*** | 1 a 2 renglones (máx. 155 caracteres) | `Tarjeta digital de la Dra. Martha Granados. Médica Cirujana en CDMX. Especialista en Control de Diabetes, Nutrición y Medicina Estética.` | `___________________________________` |
| **Imagen para Compartir (OpenGraph)\*** | Imagen horizontal (1200 x 630 px) o retrato formal | Archivo de foto profesional o banner de marca | `[ Adjuntar archivo ]` |
| **Favicon (Ícono de pestaña)** | Icono cuadrado o logo simplificado (SVG / ICO / PNG 32x32) | Ícono médico / Iniciales | `[ Adjuntar archivo / Opcional ]` |

---

## Sección 1: Cabecera y Perfil Profesional (`profile-header`)
*El encabezado principal donde se presenta al profesional ante el paciente/cliente.*

### 1.1 Fotografía y Verificación
- **[ ] Fotografía Principal de Perfil\***:
  - *Especificaciones*: Retrato profesional centrado, buena iluminación, fondo limpio o neutro. Proporción cuadrada 1:1 o vertical.
  - *Estado*: `[ ] Adjuntada`
- **[ ] Insignia de Verificación**:
  - ¿Desea incluir la insignia de verificación oficial (palomita azul/médica)?
  - `( ) Sí` &nbsp;&nbsp;&nbsp;&nbsp; `( ) No`

### 1.2 Datos de Presentación
| Campo | Longitud sugerida | Ejemplo de Referencia | Respuesta del Cliente |
| :--- | :--- | :--- | :--- |
| **Nombre Completo y Grado\*** | Máx. 40 caracteres | `Dra. Martha Granados` | `___________________________________` |
| **Título / Especialidad Principal\*** | Máx. 40 caracteres | `Médica Cirujana` | `___________________________________` |
| **Píldora 1: Experiencia / Trayectoria\*** | 2 a 4 palabras | `29 Años de Experiencia` | `___________________________________` |
| **Píldora 2: Registro / Cédula Profesional\*** | 2 a 5 palabras | `Cédula Prof. 2695401` | `___________________________________` |
| **Certificación Oficial (Opcional)** | Nombre del consejo / colegio | `Certificación Vigente por el CONAMEGE` | `___________________________________` |
| **Biografía / Mensaje de Presentación\*** | 2 a 3 líneas (aprox. 180 - 240 caracteres) | `Médica Cirujana comprometida con una atención profesional, empática y humana. Especializada en descubrir el origen de las enfermedades y brindarte un seguimiento integral.` | `___________________________________` |

---

## Sección 2: Contacto Directo Principal — WhatsApp CTA (`whatsapp-cta`)
*El botón destacado con mayor prominencia visual en la pantalla para generar citas o consultas directas.*

| Campo | Descripción | Ejemplo de Referencia | Respuesta del Cliente |
| :--- | :--- | :--- | :--- |
| **Número de WhatsApp (con lada)\*** | Teléfono móvil con código de país | `+52 55 1920 1638` | `___________________________________` |
| **Título del Botón CTA\*** | Llamado a la acción principal | `Agendar Cita por WhatsApp` | `___________________________________` |
| **Subtexto del Botón\*** | Frase corta de confianza | `Atención personalizada y directa` | `___________________________________` |
| **Mensaje de Apertura Predeterminado\*** | Texto que aparece escrito en el chat del usuario al dar clic | `Hola Dra. Martha Granados, me gustaría solicitar información o agendar una consulta.` | `___________________________________` |

---

## Sección 3: Evento Especial / Plática / Promoción Destacada (`event-card`)
*Módulo destacado para eventos, pláticas en vivo, webinars, talleres o promociones de temporada (Activable/Desactivable).*

- **¿Desea activar esta sección en el lanzamiento?**:
  - `( ) Sí, deseo incluir un evento/promoción actual`
  - `( ) No por el momento (se dejará lista en el código para activarse cuando lo requiera)`

*Si la respuesta es SÍ, favor de completar los siguientes datos:*

| Campo | Ejemplo de Referencia | Respuesta del Cliente |
| :--- | :--- | :--- |
| **Etiqueta / Badge Superior** | `Plática En Vivo` / `Promoción Especial` / `Masterclass Gratuita` | `___________________________________` |
| **Título del Evento / Charla** | `Entendiendo la Tiroiditis de Hashimoto` | `___________________________________` |
| **Descripción Breve** | `¿Te sientes exhausto sin razón y tu cuerpo se siente diferente? Acompáñanos a comprender los síntomas y diagnóstico.` | `___________________________________` |
| **Fecha del Evento** | `30 de Septiembre, 2026` | `___________________________________` |
| **Horario** | `19:00 hrs (Hora del Centro de México)` | `___________________________________` |
| **Modalidad o Plataforma** | `Google Meet` / `Zoom` / `Presencial en consultorio` | `___________________________________` |
| **Enlace de Registro / Formulario** | Enlace a Google Forms, Eventbrite o WhatsApp | `___________________________________` |
| **Texto del Botón de Inscripción** | `¡Inscríbete Gratis Aquí!` | `___________________________________` |

---

## Sección 4: Redes Sociales y Perfiles Profesionales (`social-grid`)
*Accesos directos a sus canales digitales con diseño de marca personalizado.*

| Red / Plataforma | ¿Incluir? | Usuario / Texto Secundario | Enlace Completo (URL) |
| :--- | :---: | :--- | :--- |
| **Doctoralia / Directorio Médico** | `[ ]` | Ej: `Perfil Profesional y Reseñas` | `https://www.doctoralia.com.mx/...` |
| **Facebook** | `[ ]` | Ej: `@Dra.MarthaGranados` | `https://www.facebook.com/...` |
| **Instagram** | `[ ]` | Ej: `@dra.marthagranados` | `https://www.instagram.com/...` |
| **TikTok** *(Opcional)* | `[ ]` | Ej: `@dra.marthagranados` | `https://www.tiktok.com/...` |
| **LinkedIn** *(Opcional)* | `[ ]` | Ej: `Dra. Martha Granados` | `https://www.linkedin.com/in/...` |
| **YouTube** *(Opcional)* | `[ ]` | Ej: `@DraMarthaGranados` | `https://www.youtube.com/...` |
| **Otro Directorio / Web** | `[ ]` | Nombre: `_____________________` | `_________________________________` |

---

## Sección 5: Servicios y Especialidades (`services-card`)
*Bloque de tarjetas para presentar los tratamientos, áreas de atención o servicios que ofrece. Por defecto cuenta con 4 espacios principales.*

### Servicio 1
- **Título del Servicio\***: `Control de Diabetes`
  - *Respuesta*: `________________________________________________`
- **Descripción corta\*** *(1-2 líneas, beneficios o alcance)*: `Planes integrales de manejo y seguimiento personalizado para regular tus niveles de glucosa.`
  - *Respuesta*: `________________________________________________`
- **Ícono o concepto sugerido**: `Gráfica de salud / Actividad física`
  - *Respuesta*: `________________________________________________`

### Servicio 2
- **Título del Servicio\***: `Control de Peso y Obesidad`
  - *Respuesta*: `________________________________________________`
- **Descripción corta\***: `Tratamientos personalizados y nutrición médica adaptada a tus metas de salud.`
  - *Respuesta*: `________________________________________________`
- **Ícono o concepto sugerido**: `Corazón / Bienestar`
  - *Respuesta*: `________________________________________________`

### Servicio 3
- **Título del Servicio\***: `Rejuvenecimiento HIFU 25D 360`
  - *Respuesta*: `________________________________________________`
- **Descripción corta\***: `Tecnología médica avanzada en aparatología estética para rejuvenecimiento facial y corporal.`
  - *Respuesta*: `________________________________________________`
- **Ícono o concepto sugerido**: `Destellos / Estética facial`
  - *Respuesta*: `________________________________________________`

### Servicio 4
- **Título del Servicio\***: `Medicina de Primer Contacto`
  - *Respuesta*: `________________________________________________`
- **Descripción corta\***: `Certificados médicos laborales e internacionales, consulta general y manejo del adulto mayor.`
  - *Respuesta*: `________________________________________________`
- **Ícono o concepto sugerido**: `Estetoscopio / Consulta general`
  - *Respuesta*: `________________________________________________`

*(Si requiere 5 o 6 servicios, puede añadir adicionales aquí)*:
- **Servicio adicional 5 (Opcional)**: `________________________________________________`
- **Servicio adicional 6 (Opcional)**: `________________________________________________`

---

## Sección 6: Ubicación del Consultorio e Información (`info-card`)
*Muestra a los pacientes dónde encontrarte físicamente, los días de atención y teléfonos fijos del consultorio.*

| Campo | Formato / Detalle | Ejemplo de Referencia | Respuesta del Cliente |
| :--- | :--- | :--- | :--- |
| **Título de la Sección\*** | Título del bloque | `Ubicación del Consultorio` | `___________________________________` |
| **Nombre de la Clínica / Consultorio\*** | Razón social o nombre del lugar | `Consultorio Médico Dra. Martha Granados` | `___________________________________` |
| **Dirección Física Completa\*** | Calle, número ext/int, piso, consultorio, colonia, CP, alcaldía/municipio, estado | `Tlaxcala 116, Piso 2, Consultorio 9, Col. Roma Sur, C.P. 06760, Alc. Cuauhtémoc, CDMX` | `___________________________________` |
| **Horarios de Atención Detallados\*** | Días y horas, incluyendo excepciones | `Lun - Vie: 9:00 a 20:00 hrs (excepto Miér) \| Sáb: 12:00 a 18:00 hrs` | `___________________________________` |
| **Teléfono Fijo / Recepción\*** | Para llamadas directas al consultorio | `55 5741 1115` | `___________________________________` |
| **Enlace a Google Maps / Waze\*** | Enlace directo para abrir la app de mapas al presionar el botón *"Abrir en Maps"* | `https://maps.google.com/?q=Tlaxcala+116,+Roma+Sur...` | `___________________________________` |

---

## Sección 7: Ficha de Contacto Descargable (.vcf / vCard)
*Permite a los usuarios guardar al especialista en la agenda de su teléfono con un solo clic mediante el botón "Guardar Contacto en el Teléfono".*

| Campo para el archivo .vcf | Ejemplo de Referencia | Respuesta del Cliente |
| :--- | :--- | :--- |
| **Nombre completo para agenda\*** | `Dra. Martha Granados` | `___________________________________` |
| **Puesto / Especialidad\*** | `Médica Cirujana` | `___________________________________` |
| **Empresa / Consultorio\*** | `Consultorio Médico Dra. Martha Granados` | `___________________________________` |
| **Celular / WhatsApp\*** | `+52 55 1920 1638` | `___________________________________` |
| **Teléfono del Consultorio\*** | `+52 55 5741 1115` | `___________________________________` |
| **Correo Electrónico (Opcional)** | `contacto@doctoragranados.com` | `___________________________________` |
| **Dirección guardada en agenda\*** | Dirección física del consultorio | `___________________________________` |
| **Nota descriptiva de contacto** | `Médica Cirujana \| Cédula Prof. 2695401` | `___________________________________` |

---

## Sección 8: Identidad Visual y Estilo (Branding)
*Personalización de colores y tipografía del sitio.*

| Elemento | Descripción | Ejemplo del Proyecto | Respuesta del Cliente |
| :--- | :--- | :--- | :--- |
| **Color Principal / Acento** | Color característico de la marca médica | Azul Marino / Azul Real (`#1e56a0`) | `[ Código HEX o muestra de color ]` |
| **Color Secundario / Fondo** | Tono suave para fondos y tarjetas | Azul claro / celeste médico (`#EBF3FE`) | `[ Código HEX o muestra de color ]` |
| **Logotipo / Isotipo (Opcional)** | Logotipo en alta resolución PNG transparente o SVG | `[ Archivo adjunto ]` | `[ ] Sí adjunto  /  [ ] Solo nombre` |
| **Pie de Página (Créditos / Copyright)** | Firma del pie de página | `Hecho con ♥️ en Sabores & Colores, Estudio Creativo` | `Hecho con ♥️ por [Tu Empresa / Marca]` |
