# Design System: Equine Heritage (Criadero de Caballos de Élite)

**Versión:** 1.0.0  
**Inspiración:** Stitch Project `projects/11728903190359451331` (Elite Equine Legacy)  
**Estilo Visual:** *Heritage Minimalism & Luxury Equestrian Dark Mode*  
**Stack Técnico:** HTML5 + Tailwind CSS + Vanilla JavaScript (ES6 Modules)

---

## 1. Filosofía y Personalidad de Marca

El sistema de diseño **Equine Heritage** combina la elegancia editorial clásica de los criaderos de caballos de alta alcurnia con la sofisticación digital de las interfaces de lujo contemporáneas.

### Principios Fundamentales:
1. **Quiet Luxury (Lujo Silencioso):** Fondo oscuro profundo (*Obsidian Black* `#111317`), acentos sutiles de oro champaña (*Champagne Gold* `#D4AF37`) y destellos esmeralda ecuestre (*Emerald Forest* `#1A2E26`).
2. **Tipografía de Alto Contraste:** Encabezados monumentales y poéticos con serifa (*Playfair Display*) combinados con texto funcional y nítido sans-serif (*Inter*).
3. **Glassmorfismo y Bordes de Oro Líquido:** Tarjetas oscuras semitransparentes con desenfoque de fondo (*backdrop-blur*) y bordes de 1px en oro al 20%–40% de opacidad.
4. **Espaciado Generoso:** Sensación de amplitud, exclusividad y serenidad (márgenes de hasta 80px en desktop y padding vertical amplio).

---

## 2. Paleta de Colores (Color Tokens - Luminous Camel & Soft Charcoal)

### Colores Principales (Brand Accents)
| Token | Hex | Tailwind Utility | Propósito |
| :--- | :--- | :--- | :--- |
| `primary` | `#C8A675` | `bg-[#c8a675]` / `text-[#c8a675]` | Botones de acción principales, títulos y acentos activos |
| `primary-hover` | `#DDC295` | `hover:bg-[#ddc295]` / `text-[#ddc295]` | Estados hover interactivos y textos destacados |
| `primary-container`| `#AF8C5C` | `bg-[#af8c5c]` | Acentos secundarios e insignias |
| `on-primary` | `#1E222A` | `text-[#1e222a]` | Texto oscuro legible sobre botones camel |

### Fondos y Superficies (Soft Charcoal Surfaces)
| Token | Hex | Tailwind Utility | Propósito |
| :--- | :--- | :--- | :--- |
| `surface-base` | `#1E222A` | `bg-[#1e222a]` | Fondo principal (Carbón suave balanceado) |
| `surface-lowest` | `#181B22` | `bg-[#181b22]` | Fondo de secciones secundarias |
| `surface-low` | `#222832` | `bg-[#222832]` | Contenedores secundarios y modales |
| `surface-card` | `#2B323F` | `bg-[#2b323f]` | Tarjetas estándar con glassmorphism |
| `surface-high` | `#343D4D` | `bg-[#343d4d]` | Tarjetas elevadas y estados hover |
| `surface-highest`| `#3F495A` | `bg-[#3f495a]` | Inputs, badges y controles destacados |

### Textos y Contraste (Typography Colors)
| Token | Hex | Tailwind Utility | Propósito |
| :--- | :--- | :--- | :--- |
| `text-primary` | `#F8FAFC` | `text-white` / `text-slate-100` | Títulos y texto de alta visibilidad |
| `text-secondary`| `#CBD5E1` | `text-slate-300` | Subtítulos, descripciones y cuerpo |
| `text-muted` | `#94A3B8` | `text-slate-400` | Etiquetas secundarias, pie de foto y notas |
| `text-accent` | `#DDC295` | `text-[#ddc295]` / `text-[#c8a675]` | Énfasis y llamadas a la acción en tono camel luminoso |

### Bordes y Separadores
| Token | Hex / RGBA | Tailwind Utility | Propósito |
| :--- | :--- | :--- | :--- |
| `border-subtle` | `rgba(200, 166, 117, 0.24)`| `border-[#c8a675]/25`| Bordes de tarjetas y divisores |
| `border-hover` | `rgba(200, 166, 117, 0.65)`| `hover:border-[#c8a675]/65` | Hover en elementos interactivos |

---

## 3. Tipografía (Typography Scale)

### Fuentes
- **Headlines & Serif Accents:** `'Playfair Display', Georgia, serif`
- **Body & Interface:** `'Inter', -apple-system, BlinkMacSystemFont, sans-serif`

### Escalas Tipográficas
| Nivel | Fuente | Tamaño / Interlineado | Peso | Clase Sugerida |
| :--- | :--- | :--- | :--- | :--- |
| **Display Large** | Playfair Display | `72px / 84px` (`-0.02em`) | 700 Bold | `font-serif text-5xl md:text-7xl font-bold tracking-tight` |
| **Display Mobile**| Playfair Display | `44px / 52px` (`-0.02em`) | 700 Bold | `font-serif text-4xl font-bold` |
| **Headline Large** | Playfair Display | `48px / 56px` | 600 SemiBold | `font-serif text-3xl md:text-5xl font-semibold` |
| **Headline Medium**| Playfair Display | `32px / 40px` | 600 SemiBold | `font-serif text-2xl md:text-3xl font-semibold` |
| **Headline Small** | Playfair Display | `24px / 32px` | 600 SemiBold | `font-serif text-xl md:text-2xl font-semibold` |
| **Body Large** | Inter | `18px / 30px` | 400 Regular | `font-sans text-lg text-sand-300 leading-relaxed` |
| **Body Standard** | Inter | `16px / 24px` | 400 Regular | `font-sans text-base text-sand-300` |
| **Body Small** | Inter | `14px / 20px` | 400 Regular | `font-sans text-sm text-sand-400` |
| **Label / Caps** | Inter | `12px / 16px` (`0.15em`) | 600 SemiBold | `font-sans text-xs uppercase font-semibold tracking-widest text-gold-primary` |

---

## 4. Componentes y Patrones UI

### 1. Botones (Buttons)
- **Primary Gold Button:**
  ```html
  <button class="bg-gradient-to-r from-[#d4af37] to-[#f2ca50] text-[#111317] font-semibold text-sm px-7 py-3.5 rounded-sm hover:brightness-110 shadow-lg shadow-gold-container/20 transition-all duration-300 transform hover:-translate-y-0.5 tracking-wider uppercase">
    Explorar Linajes
  </button>
  ```
- **Secondary Ghost Button:**
  ```html
  <button class="border border-[#d4af37]/40 text-[#e2e2e8] hover:text-[#f2ca50] hover:border-[#d4af37] bg-[#1e2024]/40 backdrop-blur-md font-semibold text-sm px-7 py-3.5 rounded-sm transition-all duration-300 tracking-wider uppercase">
    Solicitar Cita Privada
  </button>
  ```

### 2. Tarjeta de Lujo (Luxury Glass Card)
- **Estructura:**
  ```html
  <div class="group relative bg-[#1e2024]/70 backdrop-blur-md border border-[#d4af37]/20 hover:border-[#d4af37]/50 rounded-sm p-6 transition-all duration-500 hover:shadow-2xl hover:shadow-[#d4af37]/10">
    <div class="overflow-hidden relative mb-4 rounded-sm">
      <img src="..." class="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out" alt="Ejemplar">
      <span class="absolute top-3 left-3 bg-[#111317]/80 backdrop-blur-md border border-[#d4af37]/30 text-[#f2ca50] text-[11px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-sm">
        Semental Élite
      </span>
    </div>
    <span class="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">Linaje Real</span>
    <h3 class="font-serif text-2xl text-[#e2e2e8] mt-1 mb-2 group-hover:text-[#f2ca50] transition-colors">Imperioso IV</h3>
    <p class="text-sm text-[#d0c5af] line-clamp-2 mb-4">Campeón internacional de doma clásica y paso español con genética de preservación pura.</p>
    <div class="flex items-center justify-between border-t border-[#4d4635]/40 pt-4">
      <span class="text-xs text-[#99907c]">Nacimiento: 2019</span>
      <span class="text-sm font-semibold text-[#f2ca50]">Genética Pura Sangre</span>
    </div>
  </div>
  ```

### 3. Barra de Navegación Flotante (Floating Glass Nav)
- Fondo translúcido `bg-[#111317]/85` con `backdrop-blur-lg` y borde inferior `border-[#d4af37]/20`.
- Enlaces con tipografía `Inter` en mayúsculas, tamaño `12px`, `tracking-[0.15em]` y efecto hover con línea dorada animada.

### 4. Árbol Genealógico / Pedigrí (Bloodline Pedigree Tree)
- Estructura en cuadrícula con conectores en `border-[#4d4635]`.
- Nodos jerárquicos: *Padre / Madre -> Abuelos -> Bisabuelos*.
- Insignias de títulos y premios ganados con acabado metálico dorado.

### 5. Formularios de Solicitud Privada (Private Inquiry Inputs)
- Campos minimalistas con fondo `bg-[#1e2024]/50`, borde fino `border-[#4d4635]` y transición a `border-[#d4af37]` con resplandor dorado al foco.
- Etiquetas con `text-xs uppercase tracking-wider text-[#d0c5af]`.

---

## 5. Módulos y Pantallas Planificadas

1. **Página Principal (Hero & Presentation):**
   - Hero cinematográfico con video/foto de alta fidelidad, lema editorial y CTA de reserva.
   - Resumen de sementales destacados y estadísticas de campeonatos.
   - Manifiesto del criadero y valores de pureza genética.

2. **Catálogo de Sementales & Servicios Ecuestres:**
   - Filtros dinámicos por disciplina (Doma Clásica, Salto, Paso Español, Cría), edad y premios.
   - Tarjetas interactivas con modal de ficha técnica completa y video.
   - Cursos de equitación y programas de alta escuela.

3. **Genealogía y Líneas de Sangre (Pedigrí Interactivo):**
   - Visualizador de árbol genealógico interactivo de cada ejemplar.
   - Certificaciones de pureza genética y registros morfológicos.

4. **Historia y Legado (Our Legacy & Heritage):**
   - Línea de tiempo interactiva desde los inicios del criadero hasta el presente.
   - Instalaciones de clase mundial (pistas, caballerizas, laboratorios de inseminación).

5. **Contacto & Citas Privadas (VIP Inquiries):**
   - Agendamiento de visitas guiadas exclusivas y asesoría de compra genética.
   - Mapa de ubicación interactivo y detalles de conserjería ecuestre.
