const fs = require('fs');
const path = require('path');
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  HeadingLevel,
  AlignmentType,
  ShadingType,
  VerticalAlign,
  Header,
  Footer,
  PageNumber
} = require('docx');

// Colors
const COLOR_PRIMARY = '1E56A0';     // Azul corporativo principal
const COLOR_SECONDARY = '00B2A9';   // Teal acento
const COLOR_DARK = '1E293B';        // Gris pizarra oscuro
const COLOR_MUTED = '64748B';       // Gris texto secundario
const COLOR_BG_INPUT = 'F8FAFC';    // Fondo claro para celdas a rellenar
const COLOR_BG_CALLOUT = 'EFF6FF';  // Fondo caja de instrucciones
const COLOR_BORDER = 'CBD5E1';      // Borde de tablas
const COLOR_BORDER_CALLOUT = '93C5FD';

// Helper for thin borders
const thinBorder = {
  style: BorderStyle.SINGLE,
  size: 4,
  color: COLOR_BORDER
};

const tableBorders = {
  top: thinBorder,
  bottom: thinBorder,
  left: thinBorder,
  right: thinBorder,
  insideHorizontal: thinBorder,
  insideVertical: thinBorder
};

function createHeading(text, level = HeadingLevel.HEADING_1) {
  return new Paragraph({
    text: text,
    heading: level,
    spacing: { before: 280, after: 120 }
  });
}

function createSubheading(text) {
  return new Paragraph({
    children: [
      new TextRun({
        text: text,
        bold: true,
        size: 22,
        color: COLOR_PRIMARY
      })
    ],
    spacing: { before: 200, after: 80 }
  });
}

function createInstruction(text) {
  return new Paragraph({
    children: [
      new TextRun({
        text: text,
        italics: true,
        size: 19,
        color: COLOR_MUTED
      })
    ],
    spacing: { before: 60, after: 120 }
  });
}

function createTableHeaderRow(headers, widths = [28, 32, 40]) {
  return new TableRow({
    tableHeader: true,
    children: headers.map((headerText, i) => new TableCell({
      width: { size: widths[i], type: WidthType.PERCENTAGE },
      shading: { fill: COLOR_PRIMARY, type: ShadingType.CLEAR },
      verticalAlign: VerticalAlign.CENTER,
      margins: { top: 120, bottom: 120, left: 140, right: 140 },
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: headerText,
              bold: true,
              color: 'FFFFFF',
              size: 20
            })
          ],
          alignment: AlignmentType.LEFT
        })
      ]
    }))
  });
}

function createTableRow(field, example, placeholder = '[ Escriba aquí su información ]', widths = [28, 32, 40]) {
  return new TableRow({
    children: [
      // Col 1: Campo
      new TableCell({
        width: { size: widths[0], type: WidthType.PERCENTAGE },
        verticalAlign: VerticalAlign.CENTER,
        margins: { top: 100, bottom: 100, left: 140, right: 140 },
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: field,
                bold: true,
                size: 19,
                color: COLOR_DARK
              })
            ]
          })
        ]
      }),
      // Col 2: Especificación / Ejemplo
      new TableCell({
        width: { size: widths[1], type: WidthType.PERCENTAGE },
        verticalAlign: VerticalAlign.CENTER,
        margins: { top: 100, bottom: 100, left: 140, right: 140 },
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: example,
                size: 18,
                color: COLOR_MUTED
              })
            ]
          })
        ]
      }),
      // Col 3: Espacio para rellenar
      new TableCell({
        width: { size: widths[2], type: WidthType.PERCENTAGE },
        shading: { fill: COLOR_BG_INPUT, type: ShadingType.CLEAR },
        verticalAlign: VerticalAlign.CENTER,
        margins: { top: 100, bottom: 100, left: 140, right: 140 },
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: placeholder,
                color: placeholder.startsWith('[') ? '94A3B8' : COLOR_DARK,
                italics: placeholder.startsWith('['),
                size: 19
              })
            ]
          })
        ]
      })
    ]
  });
}

function createCheckRow(platform, example, widths = [24, 16, 26, 34]) {
  return new TableRow({
    children: [
      new TableCell({
        width: { size: widths[0], type: WidthType.PERCENTAGE },
        verticalAlign: VerticalAlign.CENTER,
        margins: { top: 90, bottom: 90, left: 120, right: 120 },
        children: [new Paragraph({ children: [new TextRun({ text: platform, bold: true, size: 19, color: COLOR_DARK })] })]
      }),
      new TableCell({
        width: { size: widths[1], type: WidthType.PERCENTAGE },
        shading: { fill: COLOR_BG_INPUT, type: ShadingType.CLEAR },
        verticalAlign: VerticalAlign.CENTER,
        margins: { top: 90, bottom: 90, left: 120, right: 120 },
        children: [new Paragraph({ children: [new TextRun({ text: '[  ] Sí   [  ] No', size: 18, color: '64748B' })] })]
      }),
      new TableCell({
        width: { size: widths[2], type: WidthType.PERCENTAGE },
        verticalAlign: VerticalAlign.CENTER,
        margins: { top: 90, bottom: 90, left: 120, right: 120 },
        children: [new Paragraph({ children: [new TextRun({ text: example, size: 18, color: COLOR_MUTED })] })]
      }),
      new TableCell({
        width: { size: widths[3], type: WidthType.PERCENTAGE },
        shading: { fill: COLOR_BG_INPUT, type: ShadingType.CLEAR },
        verticalAlign: VerticalAlign.CENTER,
        margins: { top: 90, bottom: 90, left: 120, right: 120 },
        children: [new Paragraph({ children: [new TextRun({ text: '[ Pegar enlace URL completo ]', italics: true, size: 18, color: '94A3B8' })] })]
      })
    ]
  });
}

async function generate() {
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: 'Arial',
            size: 20,
            color: COLOR_DARK
          }
        }
      },
      heading1: {
        run: {
          font: 'Arial',
          size: 28,
          bold: true,
          color: COLOR_PRIMARY
        }
      },
      heading2: {
        run: {
          font: 'Arial',
          size: 24,
          bold: true,
          color: COLOR_PRIMARY
        }
      }
    },
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1200, bottom: 1200, left: 1200, right: 1200 }
          }
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'SABORES & COLORES • ESTUDIO CREATIVO ', bold: true, color: COLOR_PRIMARY, size: 18 }),
                  new TextRun({ text: '• Formulario de Información para Tarjeta Digital (Landing Page)', color: COLOR_MUTED, size: 18 })
                ],
                alignment: AlignmentType.RIGHT
              })
            ]
          })
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'Favor de completar los campos sombreados y devolver este archivo.', italics: true, color: COLOR_MUTED, size: 16 }),
                  new TextRun({ text: '    Página ', color: COLOR_MUTED, size: 16 }),
                  new TextRun({ children: [PageNumber.CURRENT], color: COLOR_MUTED, size: 16 }),
                  new TextRun({ text: ' de ', color: COLOR_MUTED, size: 16 }),
                  new TextRun({ children: [PageNumber.TOTAL_PAGES], color: COLOR_MUTED, size: 16 })
                ],
                alignment: AlignmentType.CENTER
              })
            ]
          })
        },
        children: [
          // Banner Título
          new Paragraph({
            children: [
              new TextRun({
                text: 'FORMULARIO DE LEVANTAMIENTO DE DATOS',
                bold: true,
                size: 32,
                color: COLOR_PRIMARY
              })
            ],
            spacing: { after: 60 }
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Plantilla de Requerimientos y Espacios para Nuevos Clientes',
                bold: true,
                size: 22,
                color: COLOR_MUTED
              })
            ],
            spacing: { after: 180 }
          }),

          // Cuadro de Instrucciones
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 8, color: COLOR_BORDER_CALLOUT },
              bottom: { style: BorderStyle.SINGLE, size: 8, color: COLOR_BORDER_CALLOUT },
              left: { style: BorderStyle.SINGLE, size: 16, color: COLOR_PRIMARY },
              right: { style: BorderStyle.SINGLE, size: 8, color: COLOR_BORDER_CALLOUT },
              insideHorizontal: { style: BorderStyle.NONE },
              insideVertical: { style: BorderStyle.NONE }
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: COLOR_BG_CALLOUT, type: ShadingType.CLEAR },
                    margins: { top: 140, bottom: 140, left: 180, right: 180 },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: '📌 INSTRUCCIONES PARA EL CLIENTE:\n', bold: true, color: COLOR_PRIMARY, size: 20 }),
                          new TextRun({ text: '1. Este documento contiene todos los espacios y datos que conformarán su nueva Tarjeta Digital interactiva.\n', size: 18 }),
                          new TextRun({ text: '2. Por favor rellene los campos sombreados en gris claro ', size: 18 }),
                          new TextRun({ text: '[ Escriba aquí... ]', bold: true, size: 18, color: COLOR_PRIMARY }),
                          new TextRun({ text: ' con la información de su consultorio o negocio.\n', size: 18 }),
                          new TextRun({ text: '3. En las casillas de verificación, marque con una [X] las opciones deseadas.\n', size: 18 }),
                          new TextRun({ text: '4. Una vez completado, guarde este archivo y devuélvalo a su equipo de Sabores & Colores, Estudio Creativo junto con su fotografía profesional para iniciar la puesta en marcha.', size: 18 })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),

          new Paragraph({ text: '', spacing: { after: 200 } }),

          // DATOS DEL CLIENTE / CONTACTO
          createSubheading('DATOS GENERALES DEL CLIENTE (ADMINISTRATIVO)'),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: tableBorders,
            rows: [
              createTableHeaderRow(['Campo', 'Instrucción', 'Información a Completar']),
              createTableRow('Nombre de Contacto', 'Persona responsable del proyecto', '[ Nombre y Apellido ]'),
              createTableRow('Teléfono / WhatsApp', 'Para dudas de configuración', '[ Número con lada ]'),
              createTableRow('Correo Electrónico', 'Para entrega de accesos y avances', '[ Correo electrónico ]'),
              createTableRow('Fecha de Llenado', 'Fecha de entrega del formulario', '[ DD / MM / AAAA ]')
            ]
          }),

          new Paragraph({ text: '', spacing: { after: 200 } }),

          // BLOQUE 0: SEO & COMPARTIR EN REDES
          createHeading('0. Metadatos Web y SEO (Vista Previa en Redes)', HeadingLevel.HEADING_2),
          createInstruction('Controla la vista previa que aparece cuando compartes el link en WhatsApp, Facebook o cuando te buscan en Google.'),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: tableBorders,
            rows: [
              createTableHeaderRow(['Espacio en el Desarrollo', 'Especificación y Ejemplo', 'Información del Cliente (Rellenar aquí)']),
              createTableRow(
                'Título de la Pestaña (title)',
                'Nombre visible en la pestaña del navegador.\nEj: Dra. Martha Granados | Tarjeta Digital',
                '[ Ej: Dr(a). Nombre | Especialidad ]'
              ),
              createTableRow(
                'Descripción Corta (SEO)',
                '1 a 2 renglones descriptivos (máx. 160 caracteres).\nEj: Tarjeta digital de la Dra. Martha Granados. Médica Cirujana en CDMX.',
                '[ Resumen corto de su consultorio y especialidad ]'
              ),
              createTableRow(
                'Imagen para Compartir (OpenGraph)',
                'Foto profesional o banner (1200x630 px).\nAparece como miniatura al mandar el enlace.',
                '[  ] Se adjunta imagen por correo/drive\n[  ] Usar la misma fotografía de perfil'
              ),
              createTableRow(
                'Favicon (Ícono de pestaña)',
                'Ícono cuadrado de 32x32 px o logotipo SVG.',
                '[  ] Se adjunta archivo\n[  ] Usar ícono médico predeterminado'
              )
            ]
          }),

          new Paragraph({ text: '', spacing: { after: 220 } }),

          // SECCIÓN 1: PERFIL PRINCIPAL
          createHeading('1. Cabecera y Perfil Profesional (profile-header)', HeadingLevel.HEADING_2),
          createInstruction('Encabezado superior donde se presenta al especialista ante el paciente.'),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: tableBorders,
            rows: [
              createTableHeaderRow(['Espacio en el Desarrollo', 'Especificación y Ejemplo', 'Información del Cliente (Rellenar aquí)']),
              createTableRow(
                'Fotografía de Perfil Principal',
                'Retrato formal centrado, proporción 1:1 o vertical, fondo neutro, alta resolución.',
                '[  ] Fotografía adjunta (Nombre de archivo: ________)'
              ),
              createTableRow(
                'Insignia de Verificación',
                'Distintivo con palomita oficial de verificación.',
                '[  ] Sí incluir insignia       [  ] No incluir'
              ),
              createTableRow(
                'Nombre Completo y Grado',
                'Nombre profesional a destacar.\nEj: Dra. Martha Granados',
                '[ Dr(a). Nombre Completo y Apellidos ]'
              ),
              createTableRow(
                'Título o Especialidad Principal',
                'Subtítulo profesional.\nEj: Médica Cirujana',
                '[ Especialidad / Profesión ]'
              ),
              createTableRow(
                'Píldora 1 (Trayectoria / Años)',
                'Distintivo izquierdo.\nEj: 29 Años de Experiencia',
                '[ Ej: 15 Años de Experiencia / Alta Especialidad ]'
              ),
              createTableRow(
                'Píldora 2 (Cédula Profesional)',
                'Distintivo derecho con registro oficial.\nEj: Cédula Prof. 2695401',
                '[ Ej: Cédula Prof. 12345678 ]'
              ),
              createTableRow(
                'Certificación Adicional (Opcional)',
                'Consejo médico o certificación.\nEj: Certificación Vigente por el CONAMEGE',
                '[ Nombre del Consejo o Certificación Vigente ]'
              ),
              createTableRow(
                'Biografía Breve (Extracto)',
                '2 a 3 renglones sobre su enfoque profesional y trato humano (~220 caracteres).\nEj: Médica Cirujana comprometida con una atención empática...',
                '[ Escriba su presentación breve y enfoque de atención ]'
              ),
              createTableRow(
                'Botón: Guardar Contacto (.vcf)',
                'Genera el botón "Guardar Contacto en el Teléfono" con los datos para la agenda móvil.',
                'Nombre en agenda: [                               ]\nTeléfono celular: [                               ]\nTeléfono consultorio: [                           ]\nCorreo (opcional): [                              ]'
              )
            ]
          }),

          new Paragraph({ text: '', spacing: { after: 220 } }),

          // SECCIÓN 2: WHATSAPP DIRECTO
          createHeading('2. Contacto Directo Principal — WhatsApp CTA (whatsapp-cta)', HeadingLevel.HEADING_2),
          createInstruction('El botón de acción más destacado de la tarjeta para agendar citas directamente.'),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: tableBorders,
            rows: [
              createTableHeaderRow(['Espacio en el Desarrollo', 'Especificación y Ejemplo', 'Información del Cliente (Rellenar aquí)']),
              createTableRow(
                'Número de WhatsApp',
                'Número celular con código de país.\nEj: +52 55 1920 1638',
                '[ Código de país + Número a 10 dígitos ]'
              ),
              createTableRow(
                'Título del Botón CTA',
                'Llamado a la acción principal.\nPor defecto: Agendar Cita por WhatsApp',
                '[ Agendar Cita por WhatsApp / Solicitar Consulta ]'
              ),
              createTableRow(
                'Subtexto del Botón',
                'Frase de confianza.\nPor defecto: Atención personalizada y directa',
                '[ Atención personalizada y directa ]'
              ),
              createTableRow(
                'Mensaje Predeterminado',
                'Texto que se autocompleta cuando el paciente abre WhatsApp al dar clic.',
                'Ej: "Hola Dr(a). [Nombre], me gustaría solicitar información o agendar una consulta."'
              )
            ]
          }),

          new Paragraph({ text: '', spacing: { after: 220 } }),

          // SECCIÓN 3: EVENTO / PROMOCIÓN
          createHeading('3. Evento Especial / Plática / Promoción (event-card — Opcional)', HeadingLevel.HEADING_2),
          createInstruction('Módulo destacado para charlas en vivo, webinars, talleres o promociones especiales. Puede activarse o dejarse listo para el futuro.'),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: tableBorders,
            rows: [
              createTableHeaderRow(['Espacio en el Desarrollo', 'Especificación y Ejemplo', 'Información del Cliente (Rellenar aquí)']),
              createTableRow(
                '¿Activar en el lanzamiento?',
                'Define si el módulo se mostrará visible desde el inicio.',
                '[  ] Sí, activar con los siguientes datos\n[  ] No por ahora (dejar preparado en código)'
              ),
              createTableRow(
                'Etiqueta Superior (Badge)',
                'Ej: Plática En Vivo / Promoción del Mes',
                '[ Ej: Taller Online / Masterclass Gratuita ]'
              ),
              createTableRow(
                'Título del Evento o Promoción',
                'Ej: Entendiendo la Tiroiditis de Hashimoto',
                '[ Nombre del evento o promoción ]'
              ),
              createTableRow(
                'Descripción Breve',
                'Explicación del beneficio o de qué trata.',
                '[ Breve descripción en 2 líneas ]'
              ),
              createTableRow(
                'Fecha y Horario',
                'Ej: 30 de Septiembre, 2026 | 19:00 hrs',
                'Fecha: [                  ]  Hora: [             ]'
              ),
              createTableRow(
                'Plataforma o Lugar',
                'Ej: Google Meet / Zoom / Consultorio',
                '[ Modalidad del evento ]'
              ),
              createTableRow(
                'Enlace de Registro / CTA',
                'Link a formulario o WhatsApp de registro.\nEj: Google Forms o WhatsApp',
                'Enlace: [ Pegar URL ]\nTexto botón: [ ¡Inscríbete Gratis Aquí! ]'
              )
            ]
          }),

          new Paragraph({ text: '', spacing: { after: 220 } }),

          // SECCIÓN 4: REDES SOCIALES
          createHeading('4. Redes Sociales & Perfiles Profesionales (social-grid)', HeadingLevel.HEADING_2),
          createInstruction('Accesos directos con íconos personalizados. Marque con [X] cuáles desea incluir e inserte su enlace completo.'),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: tableBorders,
            rows: [
              new TableRow({
                tableHeader: true,
                children: [
                  new TableCell({
                    width: { size: 24, type: WidthType.PERCENTAGE },
                    shading: { fill: COLOR_PRIMARY, type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Plataforma', bold: true, color: 'FFFFFF', size: 19 })] })]
                  }),
                  new TableCell({
                    width: { size: 16, type: WidthType.PERCENTAGE },
                    shading: { fill: COLOR_PRIMARY, type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: '¿Incluir?', bold: true, color: 'FFFFFF', size: 19 })] })]
                  }),
                  new TableCell({
                    width: { size: 26, type: WidthType.PERCENTAGE },
                    shading: { fill: COLOR_PRIMARY, type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Usuario / Texto', bold: true, color: 'FFFFFF', size: 19 })] })]
                  }),
                  new TableCell({
                    width: { size: 34, type: WidthType.PERCENTAGE },
                    shading: { fill: COLOR_PRIMARY, type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Enlace Web (URL completa)', bold: true, color: 'FFFFFF', size: 19 })] })]
                  })
                ]
              }),
              createCheckRow('Doctoralia / Directorio', 'Perfil Profesional y Reseñas'),
              createCheckRow('Facebook', 'Ej: @Dra.MarthaGranados'),
              createCheckRow('Instagram', 'Ej: @dra.marthagranados'),
              createCheckRow('TikTok (Opcional)', 'Ej: @dra.marthagranados'),
              createCheckRow('LinkedIn (Opcional)', 'Ej: Nombre y Apellido'),
              createCheckRow('YouTube (Opcional)', 'Ej: @CanalProfesional'),
              createCheckRow('Sitio Web Adicional', 'Ej: MiSitioOficial.com')
            ]
          }),

          new Paragraph({ text: '', spacing: { after: 220 } }),

          // SECCIÓN 5: SERVICIOS Y ESPECIALIDADES
          createHeading('5. Servicios y Especialidades (services-card)', HeadingLevel.HEADING_2),
          createInstruction('Bloque de tarjetas con los tratamientos o áreas principales. La plantilla cuenta con 4 espacios principales (puede añadir extras si lo requiere).'),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: tableBorders,
            rows: [
              createTableHeaderRow(['Espacio de Servicio', 'Ejemplo de Referencia', 'Información del Cliente (Rellenar aquí)']),
              createTableRow(
                'SERVICIO 1',
                'Título: Control de Diabetes\nDesc: Planes integrales de manejo y seguimiento para regular tus niveles de glucosa.\nÍcono: Actividad / Salud',
                'Título: [                                              ]\nDescripción: [                                         ]\nIdea de Ícono: [ Ej: Corazón / Actividad / Consulta ]'
              ),
              createTableRow(
                'SERVICIO 2',
                'Título: Control de Peso y Obesidad\nDesc: Tratamientos personalizados y nutrición médica adaptada a tus metas de salud.\nÍcono: Corazón / Nutrición',
                'Título: [                                              ]\nDescripción: [                                         ]\nIdea de Ícono: [                                       ]'
              ),
              createTableRow(
                'SERVICIO 3',
                'Título: Rejuvenecimiento HIFU\nDesc: Tecnología médica avanzada en aparatología estética facial y corporal.\nÍcono: Destellos / Estética',
                'Título: [                                              ]\nDescripción: [                                         ]\nIdea de Ícono: [                                       ]'
              ),
              createTableRow(
                'SERVICIO 4',
                'Título: Medicina de Primer Contacto\nDesc: Certificados médicos laborales e internacionales, consulta general.\nÍcono: Estetoscopio',
                'Título: [                                              ]\nDescripción: [                                         ]\nIdea de Ícono: [                                       ]'
              ),
              createTableRow(
                'SERVICIO EXTRA 5 (Opcional)',
                'Espacio adicional en caso de requerir un 5to servicio destacado.',
                'Título: [                                              ]\nDescripción: [                                         ]'
              )
            ]
          }),

          new Paragraph({ text: '', spacing: { after: 220 } }),

          // SECCIÓN 6: UBICACIÓN Y CONSULTORIO
          createHeading('6. Ubicación del Consultorio e Información (info-card)', HeadingLevel.HEADING_2),
          createInstruction('Información para que los pacientes ubiquen su consultorio físico, sepan en qué horarios atienden y puedan llamar.'),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: tableBorders,
            rows: [
              createTableHeaderRow(['Espacio en el Desarrollo', 'Especificación y Ejemplo', 'Información del Cliente (Rellenar aquí)']),
              createTableRow(
                'Nombre del Consultorio / Clínica',
                'Razón social o nombre comercial.\nEj: Consultorio Médico Dra. Martha Granados',
                '[ Nombre del Consultorio o Clínica ]'
              ),
              createTableRow(
                'Dirección Física Completa',
                'Calle, número exterior/interior, piso, consultorio, colonia, CP, alcaldía/municipio, ciudad y estado.\nEj: Tlaxcala 116, Piso 2, Cons. 9, Col. Roma Sur, CDMX',
                '[ Dirección completa con referencias ]'
              ),
              createTableRow(
                'Horarios de Atención',
                'Días y rangos de horarios detallados.\nEj: Lun - Vie: 9:00 a 20:00 hrs (excepto Miér) | Sáb: 12:00 a 18:00 hrs',
                '[ Días y horas de atención ]'
              ),
              createTableRow(
                'Teléfono Fijo / Recepción',
                'Número para el botón "Llamar al Consultorio".\nEj: 55 5741 1115',
                '[ Número telefónico directo de recepción ]'
              ),
              createTableRow(
                'Enlace de Google Maps / Waze',
                'Para el botón "Abrir en Maps" (abre el GPS del paciente directamente).',
                '[ Pegar enlace de ubicación de Google Maps ]'
              )
            ]
          }),

          new Paragraph({ text: '', spacing: { after: 220 } }),

          // SECCIÓN 7: BRANDING Y PIE DE PÁGINA
          createHeading('7. Identidad Visual y Estilo de Marca (Branding)', HeadingLevel.HEADING_2),
          createInstruction('Personalización de colores y créditos en la tarjeta.'),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: tableBorders,
            rows: [
              createTableHeaderRow(['Elemento de Diseño', 'Especificación y Ejemplo', 'Información del Cliente (Rellenar aquí)']),
              createTableRow(
                'Color Principal de Marca',
                'Para botones primarios y destacados.\nEj: Azul médico (#1E56A0), Verde, Vino, etc.',
                '[ Color deseado o código hexadecimal #HEX ]'
              ),
              createTableRow(
                'Color Secundario / Fondo',
                'Para tarjetas y acentos suaves.\nEj: Celeste claro médico (#EBF3FE)',
                '[ Color deseado o código hexadecimal #HEX ]'
              ),
              createTableRow(
                'Logotipo Personal / Clínica',
                'En formato PNG sin fondo o SVG.',
                '[  ] Se adjunta logotipo por correo/drive\n[  ] No cuento con logotipo (usar solo tipografía)'
              ),
              createTableRow(
                'Pie de Página (Créditos / Firma)',
                'Firma o derechos de autor.\nEj: Hecho con ♥️ en Sabores & Colores, Estudio Creativo',
                '[ Hecho con ♥️ por ... / Derechos reservados ]'
              )
            ]
          }),

          new Paragraph({ text: '', spacing: { after: 260 } }),

          // BLOQUE FINAL DE ENTREGA
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 8, color: COLOR_BORDER_CALLOUT },
              bottom: { style: BorderStyle.SINGLE, size: 8, color: COLOR_BORDER_CALLOUT },
              left: { style: BorderStyle.SINGLE, size: 16, color: COLOR_SECONDARY },
              right: { style: BorderStyle.SINGLE, size: 8, color: COLOR_BORDER_CALLOUT },
              insideHorizontal: { style: BorderStyle.NONE },
              insideVertical: { style: BorderStyle.NONE }
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: 'F0FDFA', type: ShadingType.CLEAR },
                    margins: { top: 140, bottom: 140, left: 180, right: 180 },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: '✅ LISTA DE ARCHIVOS A ADJUNTAR CON ESTE FORMULARIO:\n', bold: true, color: COLOR_SECONDARY, size: 20 }),
                          new TextRun({ text: '[  ] Este formulario lleno en Word (.doc / .docx)\n', size: 18 }),
                          new TextRun({ text: '[  ] Fotografía profesional en alta resolución para el perfil\n', size: 18 }),
                          new TextRun({ text: '[  ] Logotipo en formato PNG con fondo transparente (opcional)\n', size: 18 }),
                          new TextRun({ text: '[  ] Imagen o banner para compartir en redes (opcional)\n\n', size: 18 }),
                          new TextRun({ text: '¡Muchas gracias! Con estos datos el equipo de Sabores & Colores, Estudio Creativo procederá al montaje y diseño de su Tarjeta Digital personalizada.', italics: true, bold: true, size: 18, color: COLOR_DARK })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          })
        ]
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  const outPathDocx = path.join(__dirname, '..', 'Formulario_Requerimientos_Tarjeta_Digital.docx');
  const outPathDoc = path.join(__dirname, '..', 'Formulario_Requerimientos_Tarjeta_Digital.doc');
  
  fs.writeFileSync(outPathDocx, buffer);
  fs.writeFileSync(outPathDoc, buffer);
  console.log('Archivos generados con éxito:');
  console.log('-', outPathDocx);
  console.log('-', outPathDoc);
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
