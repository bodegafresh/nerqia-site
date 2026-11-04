import type { Locale } from "../config/site";

const es = {
  lang: "es-CL",
  seo: {
    title: "NERQIA | Tecnología que trabaja para ti",
    description:
      "Empresa chilena de tecnología e innovación: software a medida, automatización, datos e inteligencia artificial para personas, negocios y organizaciones.",
  },
  skip: "Ir al contenido",
  navLabel: "Navegación principal",
  footerNav: "Navegación del pie de página",
  language: "Seleccionar idioma",
  openMenu: "Abrir menú",
  closeMenu: "Cerrar menú",
  nav: [
    { id: "soluciones", label: "Soluciones" },
    { id: "ejemplos", label: "Ejemplos" },
    { id: "enfoque", label: "Nuestro enfoque" },
    { id: "innovacion", label: "Innovación" },
  ],
  talk: "Conversemos",
  contactSubject: "Conversemos sobre mi idea o consulta | NERQIA",
  hero: {
    eyebrow: "INGENIERÍA CON PROPÓSITO",
    first: "Tecnología",
    second: "que trabaja",
    accent: "para ti.",
    description:
      "Creamos software, conectamos herramientas y automatizamos tareas para personas y negocios. Tecnología e inteligencia artificial aplicadas a lo que necesitas resolver.",
    primary: "Explorar soluciones",
    secondary: "Cuéntanos tu idea",
    foot: "Del primer problema a la siguiente posibilidad.",
    graphic: ["DATOS", "PROCESOS", "INTELIGENCIA", "SOLUCIONES"],
    graphicFoot: "Conectar. Simplificar. Avanzar.",
  },
  strip: [
    "Menos tareas repetitivas.",
    "Más sistemas conectados.",
    "Mejores decisiones.",
  ],
  problems: {
    eyebrow: "EMPECEMOS POR LO QUE TE PASA",
    title: "¿Te suena alguno?",
    items: [
      {
        title: "Tareas repetitivas",
        question: "¿Pierdes tiempo copiando información o preparando reportes?",
        capability: "Automatización inteligente",
        target: "automatizacion",
        icon: "flow",
      },
      {
        title: "Información dispersa",
        question: "¿Tus datos están repartidos entre planillas y aplicaciones?",
        capability: "Datos e inteligencia artificial",
        target: "datos",
        icon: "layers",
      },
      {
        title: "Sistemas desconectados",
        question:
          "¿Tus herramientas no intercambian información automáticamente?",
        capability: "Software e integraciones",
        target: "software",
        icon: "code",
      },
      {
        title: "Ideas por desarrollar",
        question:
          "¿Tienes una idea digital y necesitas convertirla en una solución?",
        capability: "Desarrollo de software",
        target: "software",
        icon: "spark",
      },
    ],
  },
  examples: {
    eyebrow: "POSIBILIDADES CONCRETAS",
    title: "Soluciones que puedes",
    accent: "imaginar funcionando.",
    intro:
      "Estos son ejemplos de lo que podemos construir para tu caso, no proyectos ya entregados.",
    cta: "Conversemos sobre tu caso",
    labels: {
      before: "Antes",
      solution: "Posible solución",
      outcome: "Después esperado",
    },
    items: [
      {
        icon: "spark",
        title: "Alertas y notificaciones automáticas",
        before:
          "Un profesional lleva fechas, tareas y solicitudes entre mensajes y notas.",
        solution:
          "Un seguimiento sencillo con avisos para lo que requiere atención.",
        outcome:
          "Recordatorios oportunos y un registro organizado de lo pendiente.",
      },
      {
        icon: "flow",
        title: "Reportes y planillas sin tareas repetidas",
        before:
          "Una librería revisa ventas e inventario entre su sistema de venta y varias planillas.",
        solution:
          "Conectar sus herramientas y automatizar la preparación de reportes.",
        outcome:
          "Información reunida para revisar productos y ventas con menos trabajo manual.",
      },
      {
        icon: "layers",
        title: "Herramientas que trabajan juntas",
        before:
          "Un negocio ingresa los mismos pedidos en distintas aplicaciones.",
        solution:
          "Integrar las herramientas para compartir y sincronizar información.",
        outcome:
          "Registros actualizados sin volver a ingresar lo mismo en cada sistema.",
      },
      {
        icon: "code",
        title: "Aplicaciones a tu medida",
        before:
          "Una organización recibe solicitudes por mensajes y pierde de vista su avance.",
        solution:
          "Una aplicación a medida para registrar solicitudes y seguir su estado.",
        outcome:
          "Un punto de seguimiento compartido y más claridad sobre lo pendiente.",
      },
    ],
  },
  services: {
    eyebrow: "01 / QUÉ HACEMOS",
    title: "Buenas ideas.",
    accent: "Bien construidas.",
    intro:
      "La tecnología adecuada empieza por entender qué necesitas resolver.",
    items: [
      {
        id: "software",
        icon: "code",
        title: "Desarrollo de software",
        description:
          "Herramientas digitales que se adaptan a tu forma de trabajar.",
        examples: "Aplicaciones a medida · Plataformas · APIs e integraciones",
      },
      {
        id: "automatizacion",
        icon: "flow",
        title: "Automatización inteligente",
        description:
          "Menos trabajo manual. Más tiempo para lo que necesita de ti.",
        examples: "Flujos de trabajo · Alertas · Reportes automáticos",
      },
      {
        id: "datos",
        icon: "spark",
        title: "Datos e inteligencia artificial",
        description:
          "Transformamos información en herramientas útiles para decidir y actuar.",
        examples:
          "Análisis de datos · Modelos inteligentes · Asistentes con IA",
      },
      {
        id: "arquitectura",
        icon: "layers",
        title: "Arquitectura y consultoría",
        description:
          "Una base sólida para construir, integrar y evolucionar tus sistemas.",
        examples:
          "Diseño de soluciones · Modernización · Rendimiento y escalabilidad",
      },
    ],
  },
  audience: {
    eyebrow: "02 / A TU ESCALA",
    title: "Tu problema merece",
    accent: "la solución adecuada.",
    intro:
      "No todos los problemas necesitan una plataforma compleja. A veces, una automatización bien diseñada es suficiente.",
    items: [
      {
        number: "01",
        title: "Personas y profesionales",
        description: "Libera tiempo en tu día a día.",
        examples: [
          "Organiza información dispersa",
          "Recibe alertas que sí necesitas",
          "Automatiza tareas cotidianas",
        ],
      },
      {
        number: "02",
        title: "Emprendedores y negocios",
        description: "Dale espacio a tu negocio para crecer.",
        examples: [
          "Conecta tus herramientas",
          "Simplifica inventarios y reportes",
          "Agiliza procesos administrativos",
        ],
      },
      {
        number: "03",
        title: "Empresas y organizaciones",
        description: "Haz que tus sistemas avancen juntos.",
        examples: [
          "Integra plataformas y APIs",
          "Procesa y conecta tus datos",
          "Evoluciona tu arquitectura",
        ],
      },
    ],
  },
  process: {
    eyebrow: "03 / NUESTRO ENFOQUE",
    title: "Primero entendemos.",
    accent: "Después construimos.",
    intro:
      "Colaboración cercana, decisiones claras y resultados que podamos validar juntos.",
    items: [
      {
        title: "Entendemos el problema",
        description:
          "Escuchamos, hacemos preguntas y definimos qué resultado sería valioso para ti.",
      },
      {
        title: "Diseñamos lo necesario",
        description:
          "Elegimos una solución proporcionada al problema, con prioridades y alcance claros.",
      },
      {
        title: "Construimos y validamos",
        description:
          "Desarrollamos, probamos y revisamos contigo para comprobar que funciona en la práctica.",
      },
      {
        title: "Mejoramos y evolucionamos",
        description:
          "Aprendemos del uso real, medimos resultados y decidimos juntos el siguiente paso.",
      },
    ],
  },
  innovation: {
    eyebrow: "04 / PRODUCTOS E INNOVACIÓN",
    title: "Ideas que también",
    accent: "hacemos nuestras.",
    intro:
      "Exploramos nuevos caminos con productos propios. Estas iniciativas están en desarrollo.",
    status: "En desarrollo",
    products: {
      "match-alpha": {
        category: "DATOS + DEPORTE",
        title: "Match Alpha",
        description:
          "Análisis estadístico e inteligencia aplicada al fútbol. Información para explorar el juego con otra perspectiva.",
        note: "Herramienta de análisis e información. No es una casa de apuestas ni garantiza resultados.",
      },
      "galactic-explorer": {
        category: "EXPERIENCIAS INTERACTIVAS",
        title: "Galactic Explorer",
        description:
          "Exploración, imaginación y tecnología se encuentran en un proyecto de entretenimiento interactivo y videojuegos.",
        note: "Una iniciativa en desarrollo, sin fecha de lanzamiento anunciada.",
      },
    },
  },
  why: {
    eyebrow: "EL CRITERIO DETRÁS DEL CÓDIGO",
    title: "La mejor tecnología es",
    accent: "la que te sirve.",
    story: [
      "NERQIA es una empresa chilena de tecnología e innovación. Elegimos un nombre con personalidad, no un acrónimo: representa nuestra forma de unir ingeniería, inteligencia y creatividad.",
      "Transformamos ideas y necesidades en posibilidades reales. Acortamos la distancia entre lo que imaginas y una solución útil, sólida y con valor real.",
      "Construimos para personas y organizaciones y aspiramos a crear productos y plataformas propios, desde Chile para el mundo.",
    ],
    items: [
      {
        title: "Simplicidad con intención",
        description:
          "Empezamos por lo esencial y sumamos complejidad solo cuando aporta.",
      },
      {
        title: "Ingeniería para evolucionar",
        description:
          "Construimos bases mantenibles, preparadas para cambiar y crecer.",
      },
      {
        title: "Inteligencia aplicada",
        description:
          "Usamos IA y automatización donde su valor se pueda demostrar.",
      },
      {
        title: "Comunicación clara",
        description:
          "Traducimos decisiones técnicas en opciones que puedas entender.",
      },
    ],
  },
  contact: {
    eyebrow: "CONSTRUYAMOS EL SIGUIENTE PASO",
    title: "Cuéntanos qué",
    accent: "quieres resolver.",
    description:
      "Una tarea que se repite. Un sistema que no conversa con otro. Una idea por construir. Empecemos por ahí.",
    orientation:
      "No necesitas saber cómo resolverlo. Podemos descubrirlo juntos.",
    action: "Cuéntanos tu idea",
    hint: "Abre tu aplicación de correo. También puedes escribirnos directamente.",
    subject: "Mi idea o consulta con NERQIA",
    form: {
      title: "Preparemos tu mensaje",
      intro:
        "Completa lo esencial, revisa el borrador y ábrelo en tu aplicación de correo. Tú decides cuándo enviarlo.",
      name: "Nombre",
      email: "Correo electrónico",
      need: "¿Qué necesitas?",
      message: "Cuéntanos qué te gustaría mejorar",
      required: "Todos los campos son obligatorios.",
      select: "Selecciona una opción",
      options: [
        { value: "automation", label: "Automatizar una tarea o reporte" },
        { value: "integration", label: "Conectar herramientas o sistemas" },
        { value: "software", label: "Desarrollar una aplicación" },
        {
          value: "data",
          label: "Trabajar con datos o inteligencia artificial",
        },
        {
          value: "architecture",
          label: "Revisar arquitectura o sistemas existentes",
        },
        { value: "other", label: "Necesito orientación" },
      ],
      placeholder:
        "Puede ser algo que te quita tiempo, una idea o una duda. No necesitas usar términos técnicos.",
      prepare: "Revisar mi borrador",
      preview: "Tu borrador, listo para revisar",
      previewHint:
        "Aún no se ha enviado nada. Si cambias los datos, prepara nuevamente el borrador.",
      recipient: "Para",
      subjectLabel: "Asunto",
      open: "Abrir mi aplicación de correo",
      copy: "Copiar mensaje",
      copied: "Mensaje copiado. Pégalo en tu correo y envíalo cuando quieras.",
      manual:
        "No pudimos copiar automáticamente. El texto está seleccionado: usa Ctrl+C, ⌘C o la opción Copiar de tu dispositivo.",
      clear: "Borrar datos",
      cleared: "Los datos y el borrador se han borrado de esta página.",
      privacy:
        "Los datos quedan en esta página: no se guardan ni se envían a un servidor. Evita incluir información sensible. Al abrir tu correo o copiar el mensaje, compartes el borrador con esa aplicación o con tu portapapeles.",
      longDraft:
        "Este borrador es largo para algunos clientes de correo. Copia el mensaje y envíalo a la dirección visible.",
      errors: {
        summary: "Revisa los campos indicados antes de preparar el correo.",
        name: "Escribe tu nombre (hasta 80 caracteres).",
        email: "Escribe un correo válido (hasta 254 caracteres).",
        need: "Selecciona el tipo de necesidad.",
        message:
          "Escribe entre 10 y 1000 caracteres sobre lo que te gustaría mejorar.",
      },
    },
  },
  footer: {
    rights: "Todos los derechos reservados.",
    privacy: "Privacidad",
    top: "Volver al inicio",
    note: "Tecnología que trabaja para ti.",
    follow: "Síguenos y conoce nuestras ideas, proyectos y novedades.",
    socialNav: "Redes sociales de NERQIA",
    socialNames: {
      instagram: "Instagram de NERQIA",
      facebook: "Página de Facebook de NERQIA",
      tiktok: "TikTok de NERQIA",
    },
  },
  privacy: {
    title: "Tu privacidad, en simple.",
    close: "Cerrar información de privacidad",
    paragraphs: [
      "El formulario de contacto prepara un borrador en esta página. Los datos no se envían a un servidor ni se guardan en almacenamiento local por el sitio. Puedes borrarlos con el botón Borrar datos. No hay cuentas, analítica ni cookies de seguimiento; el idioma depende de la página que visitas.",
      "Solo al elegir abrir tu aplicación de correo o copiar el mensaje, el borrador pasa a esa aplicación o a tu portapapeles. El envío lo confirmas en tu correo. Si nos escribes, utilizaremos lo que compartas para responder y conversar sobre tu solicitud. Evita incluir datos sensibles.",
      "GitHub Pages, como proveedor de alojamiento, puede registrar información técnica de las visitas, como la dirección IP, para operar y proteger el servicio. Consulta su declaración de privacidad para conocer sus prácticas.",
      "Para consultas sobre el tratamiento de la información que nos envíes o para solicitar su eliminación, escríbenos al correo de contacto. Revisaremos tu solicitud considerando las obligaciones aplicables.",
    ],
    hostLink: "Declaración de privacidad de GitHub",
  },
};

// Widen strings while preserving keys: English must include every visible field.
type Translation<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? Translation<U>[]
    : { [K in keyof T]: Translation<T[K]> };
const en: Translation<typeof es> = {
  lang: "en",
  seo: {
    title: "NERQIA | Technology that works for you",
    description:
      "Chilean technology and innovation company. Custom software, automation, data and artificial intelligence for individuals, businesses and organizations.",
  },
  skip: "Skip to content",
  navLabel: "Main navigation",
  footerNav: "Footer navigation",
  language: "Select language",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  nav: [
    { id: "soluciones", label: "Solutions" },
    { id: "ejemplos", label: "Examples" },
    { id: "enfoque", label: "Our approach" },
    { id: "innovacion", label: "Innovation" },
  ],
  talk: "Let’s talk",
  contactSubject: "Let’s talk about my idea or question | NERQIA",
  hero: {
    eyebrow: "ENGINEERING WITH PURPOSE",
    first: "Technology",
    second: "that works",
    accent: "for you.",
    description:
      "We build software, connect tools and automate tasks for people and businesses. Technology and artificial intelligence applied to what you need to solve.",
    primary: "Explore solutions",
    secondary: "Tell us what’s on your mind",
    foot: "From the first challenge to the next possibility.",
    graphic: ["DATA", "PROCESSES", "INTELLIGENCE", "SOLUTIONS"],
    graphicFoot: "Connect. Simplify. Move forward.",
  },
  strip: [
    "Fewer repetitive tasks.",
    "More connected systems.",
    "Better decisions.",
  ],
  problems: {
    eyebrow: "LET’S START WITH YOUR CHALLENGE",
    title: "Sound familiar?",
    items: [
      {
        title: "Repetitive tasks",
        question: "Do you lose time copying information or preparing reports?",
        capability: "Intelligent automation",
        target: "automatizacion",
        icon: "flow",
      },
      {
        title: "Scattered information",
        question: "Is your data spread across spreadsheets and applications?",
        capability: "Data and artificial intelligence",
        target: "datos",
        icon: "layers",
      },
      {
        title: "Disconnected systems",
        question: "Do your tools fail to exchange information automatically?",
        capability: "Software and integrations",
        target: "software",
        icon: "code",
      },
      {
        title: "Ideas waiting to be built",
        question:
          "Have a digital idea and need to turn it into a working solution?",
        capability: "Software development",
        target: "software",
        icon: "spark",
      },
    ],
  },
  examples: {
    eyebrow: "PRACTICAL POSSIBILITIES",
    title: "Solutions you can",
    accent: "picture working.",
    intro:
      "These are examples of what we could build for your situation, not projects already delivered.",
    cta: "Let’s discuss your situation",
    labels: {
      before: "Before",
      solution: "Possible solution",
      outcome: "Expected outcome",
    },
    items: [
      {
        icon: "spark",
        title: "Automatic alerts and notifications",
        before:
          "An independent professional tracks dates, tasks and requests across messages and notes.",
        solution:
          "A simple tracking tool with alerts for things that need attention.",
        outcome:
          "Timely reminders and an organized record of what is still pending.",
      },
      {
        icon: "flow",
        title: "Reports and spreadsheets without repeated work",
        before:
          "A bookshop checks sales and stock across its sales system and several spreadsheets.",
        solution: "Connect its tools and automate report preparation.",
        outcome:
          "Information in one place to review products and sales with less manual work.",
      },
      {
        icon: "layers",
        title: "Tools that work together",
        before:
          "A business enters the same orders into different applications.",
        solution: "Integrate the tools to share and synchronize information.",
        outcome:
          "Updated records without entering the same details into every system.",
      },
      {
        icon: "code",
        title: "Applications built around you",
        before:
          "An organization receives requests through messages and loses track of their progress.",
        solution:
          "A tailored application to record requests and track their status.",
        outcome:
          "A shared place to follow progress and a clearer view of what is pending.",
      },
    ],
  },
  services: {
    eyebrow: "01 / WHAT WE DO",
    title: "Good ideas.",
    accent: "Built right.",
    intro:
      "The right technology starts with understanding what you need to solve.",
    items: [
      {
        id: "software",
        icon: "code",
        title: "Software development",
        description: "Digital tools built around the way you work.",
        examples: "Custom applications · Platforms · APIs and integrations",
      },
      {
        id: "automatizacion",
        icon: "flow",
        title: "Intelligent automation",
        description:
          "Less manual work. More time for what needs your attention.",
        examples: "Workflows · Alerts · Automated reports",
      },
      {
        id: "datos",
        icon: "spark",
        title: "Data and artificial intelligence",
        description:
          "We turn information into practical tools for decisions and action.",
        examples: "Data analysis · Intelligent models · AI assistants",
      },
      {
        id: "arquitectura",
        icon: "layers",
        title: "Architecture and consulting",
        description:
          "A solid foundation to build, integrate and evolve your systems.",
        examples:
          "Solution design · Modernization · Performance and scalability",
      },
    ],
  },
  audience: {
    eyebrow: "02 / AT YOUR SCALE",
    title: "Your challenge deserves",
    accent: "the right solution.",
    intro:
      "Not every problem needs a complex platform. Sometimes, a well-designed automation is enough.",
    items: [
      {
        number: "01",
        title: "People and professionals",
        description: "Make room in your everyday life.",
        examples: [
          "Organize scattered information",
          "Get the alerts you actually need",
          "Automate everyday tasks",
        ],
      },
      {
        number: "02",
        title: "Entrepreneurs and businesses",
        description: "Give your business room to grow.",
        examples: [
          "Connect your tools",
          "Simplify inventory and reporting",
          "Streamline administrative processes",
        ],
      },
      {
        number: "03",
        title: "Companies and organizations",
        description: "Help your systems move forward together.",
        examples: [
          "Integrate platforms and APIs",
          "Process and connect your data",
          "Evolve your architecture",
        ],
      },
    ],
  },
  process: {
    eyebrow: "03 / OUR APPROACH",
    title: "Understand first.",
    accent: "Then build.",
    intro:
      "Close collaboration, clear decisions and outcomes we can validate together.",
    items: [
      {
        title: "Understand the problem",
        description:
          "We listen, ask questions and define what a valuable outcome would look like for you.",
      },
      {
        title: "Design what is needed",
        description:
          "We choose a solution that fits the problem, with clear priorities and scope.",
      },
      {
        title: "Build and validate",
        description:
          "We develop, test and review with you to make sure it works in practice.",
      },
      {
        title: "Improve and evolve",
        description:
          "We learn from real use, measure results and decide on the next step together.",
      },
    ],
  },
  innovation: {
    eyebrow: "04 / PRODUCTS AND INNOVATION",
    title: "Ideas we also",
    accent: "make our own.",
    intro:
      "We explore new paths through our own products. These initiatives are in development.",
    status: "In development",
    products: {
      "match-alpha": {
        category: "DATA + SPORT",
        title: "Match Alpha",
        description:
          "Statistical analysis and intelligence applied to football. Information to explore the game from a different perspective.",
        note: "An analysis and information tool. Not a betting operator and no guaranteed outcomes.",
      },
      "galactic-explorer": {
        category: "INTERACTIVE EXPERIENCES",
        title: "Galactic Explorer",
        description:
          "Exploration, imagination and technology meet in an interactive entertainment and video game project.",
        note: "An initiative in development, with no announced launch date.",
      },
    },
  },
  why: {
    eyebrow: "THE THINKING BEHIND THE CODE",
    title: "The best technology",
    accent: "is useful to you.",
    story: [
      "NERQIA is a Chilean technology and innovation company. We chose a distinctive name, rather than an acronym: it represents how we bring engineering, intelligence and creativity together.",
      "We turn ideas and needs into real possibilities. We bridge the gap between what you imagine and a useful, sound solution that creates real value.",
      "We build for individuals and organizations, and aspire to create products and platforms of our own, from Chile to the world.",
    ],
    items: [
      {
        title: "Intentional simplicity",
        description:
          "We start with the essentials and add complexity only when it brings value.",
      },
      {
        title: "Engineering for change",
        description:
          "We build maintainable foundations, ready to evolve and grow.",
      },
      {
        title: "Applied intelligence",
        description:
          "We use AI and automation where their value can be demonstrated.",
      },
      {
        title: "Clear communication",
        description:
          "We translate technical decisions into options you can understand.",
      },
    ],
  },
  contact: {
    eyebrow: "LET’S BUILD THE NEXT STEP",
    title: "Tell us what",
    accent: "you want to solve.",
    description:
      "A repetitive task. Systems that do not connect. An idea waiting to be built. Let’s start there.",
    orientation:
      "You don’t need to know how to solve it. We can figure it out together.",
    action: "Tell us what’s on your mind",
    hint: "Opens your email application. You can also email us directly.",
    subject: "My idea or question for NERQIA",
    form: {
      title: "Let’s prepare your message",
      intro:
        "Fill in the essentials, review your draft and open it in your email application. You decide when to send it.",
      name: "Name",
      email: "Email address",
      need: "What do you need?",
      message: "Tell us what you would like to improve",
      required: "All fields are required.",
      select: "Select an option",
      options: [
        { value: "automation", label: "Automate a task or report" },
        { value: "integration", label: "Connect tools or systems" },
        { value: "software", label: "Build an application" },
        { value: "data", label: "Work with data or artificial intelligence" },
        {
          value: "architecture",
          label: "Review architecture or existing systems",
        },
        { value: "other", label: "I need guidance" },
      ],
      placeholder:
        "It could be something that takes up your time, an idea or a question. No technical terms needed.",
      prepare: "Review my draft",
      preview: "Your draft, ready to review",
      previewHint:
        "Nothing has been sent yet. If you edit the fields, prepare the draft again.",
      recipient: "To",
      subjectLabel: "Subject",
      open: "Open my email application",
      copy: "Copy message",
      copied:
        "Message copied. Paste it into your email and send it when you are ready.",
      manual:
        "Automatic copying was unavailable. The text is selected: use Ctrl+C, ⌘C or your device’s Copy option.",
      clear: "Clear details",
      cleared: "The details and draft have been cleared from this page.",
      privacy:
        "Your details stay on this page: they are not stored or sent to a server. Please avoid sensitive information. Opening your email or copying the message shares the draft with that application or your clipboard.",
      longDraft:
        "This draft is long for some email applications. Copy the message and send it to the address shown.",
      errors: {
        summary: "Check the indicated fields before preparing your email.",
        name: "Enter your name (up to 80 characters).",
        email: "Enter a valid email address (up to 254 characters).",
        need: "Select the type of request.",
        message:
          "Tell us what you would like to improve in 10 to 1000 characters.",
      },
    },
  },
  footer: {
    rights: "All rights reserved.",
    privacy: "Privacy",
    top: "Back to top",
    note: "Technology that works for you.",
    follow: "Follow our ideas, projects and news.",
    socialNav: "NERQIA social profiles",
    socialNames: {
      instagram: "NERQIA on Instagram",
      facebook: "NERQIA Facebook page",
      tiktok: "NERQIA on TikTok",
    },
  },
  privacy: {
    title: "Your privacy, simply put.",
    close: "Close privacy information",
    paragraphs: [
      "The contact form prepares a draft on this page. The site does not send the details to a server or save them in local storage. Use Clear details to remove them. There are no accounts, analytics or tracking cookies; language is determined by the page you visit.",
      "Only when you choose to open your email application or copy the message does the draft pass to that application or your clipboard. You confirm sending in your email application. If you email us, we use what you share to respond and discuss your request. Please avoid sensitive information.",
      "GitHub Pages, our hosting provider, may record technical visit information, such as IP addresses, to operate and protect its service. See its privacy statement for details about its practices.",
      "For questions about information you send us or to request its deletion, email our contact address. We will review your request considering applicable obligations.",
    ],
    hostLink: "GitHub Privacy Statement",
  },
};
export const copy = { es, en } satisfies Record<Locale, Translation<typeof es>>;
export type Copy = Translation<typeof es>;
