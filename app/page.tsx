import Image from "next/image";
import ColaboradorForm from "@/components/ColaboradorForm";

const perfiles = [
  {
    icon: "◈",
    nombre: "Freelancer conector",
    descripcion:
      "Personas con networking o acceso a negocios y emprendedores. Tu red es tu aportación principal.",
  },
  {
    icon: "◐",
    nombre: "Diseñador visual",
    descripcion:
      "Branding, identidad, assets y dirección visual. Proyectos donde el detalle y la coherencia importan.",
  },
  {
    icon: "◉",
    nombre: "Implementador web",
    descripcion:
      "Next.js, Framer, Webflow, WordPress. Construyes lo que otros diseñan con calidad y velocidad.",
  },
  {
    icon: "◎",
    nombre: "Automatización",
    descripcion:
      "n8n, Make, APIs y workflows. Los sistemas que hacen que todo funcione sin intervención manual.",
  },
  {
    icon: "◌",
    nombre: "Copy y contenido",
    descripcion:
      "SEO, Pinterest, storytelling y contenido estructurado. Las palabras que posicionan y convierten.",
  },
];

const pasos = [
  {
    num: "01",
    titulo: "Registro",
    texto:
      "Completa el formulario con tu perfil, experiencia y ejemplos de trabajo. Solo toma unos minutos.",
  },
  {
    num: "02",
    titulo: "Evaluación",
    texto:
      "Revisamos tu perfil manualmente. Te contactamos cuando hay un proyecto que encaja con tu especialidad.",
  },
  {
    num: "03",
    titulo: "Colaboración",
    texto:
      "Trabajamos juntos en el proyecto. Los términos y ganancias se acuerdan antes de arrancar.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-surface text-ink">
      {/* Nav */}
      <nav className="border-b border-line sticky top-0 bg-surface z-10">
        <div className="max-w-wrap mx-auto px-6 h-[60px] flex items-center justify-between">
          <a href="https://byklai.com">
            <Image
              src="/logo-byklai_TN.png"
              alt="byklai"
              width={88}
              height={28}
              style={{ height: 28, width: "auto" }}
              priority
            />
          </a>
          <a
            href="https://byklai.com"
            className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink3 hover:text-ink transition-colors"
          >
            byklai.com →
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-wrap mx-auto px-6 pt-20 pb-16">
        <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink3 mb-5">
          Red de colaboradores · byklai
        </p>
        <h1 className="font-serif text-[clamp(2.4rem,5.5vw,3.8rem)] leading-[1.1] tracking-[-0.02em] text-ink mb-6 max-w-[600px]">
          Construye proyectos reales.
          <br />
          Genera ingresos.
          <br />
          Sin compromiso fijo.
        </h1>
        <p className="text-[17px] text-ink2 leading-[1.75] max-w-[540px] font-light">
          byklai es un estudio de sistemas digitales en Mérida, México. Construimos landings,
          automatizaciones y sistemas de captación para negocios. Buscamos profesionales
          independientes para sumar a proyectos según su especialidad — sin nómina, sin estructura
          rígida. Colaboración puntual con términos claros desde el inicio.
        </p>
      </section>

      {/* Perfiles */}
      <section className="bg-surface2 border-y border-line">
        <div className="max-w-wrap mx-auto px-6 py-16">
          <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink3 mb-3">
            Perfiles buscados
          </p>
          <h2 className="font-serif text-[clamp(1.7rem,3.5vw,2.4rem)] text-ink mb-10">
            ¿Eres uno de estos?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {perfiles.map((p, i) => (
              <div
                key={i}
                className="bg-surface border border-line rounded p-6 hover:border-ink3 transition-colors"
              >
                <div className="font-mono text-xl text-ink mb-3">{p.icon}</div>
                <h3 className="font-serif text-[18px] text-ink mb-2">{p.nombre}</h3>
                <p className="text-[14px] text-ink2 leading-[1.65] font-light">{p.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="max-w-wrap mx-auto px-6 py-16">
        <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink3 mb-3">
          Proceso
        </p>
        <h2 className="font-serif text-[clamp(1.7rem,3.5vw,2.4rem)] text-ink mb-10">
          Cómo funciona
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {pasos.map((paso, i) => (
            <div key={i}>
              <div className="font-mono text-[11px] tracking-[0.1em] text-ink3 mb-3">
                {paso.num}
              </div>
              <h3 className="font-serif text-[20px] text-ink mb-2">{paso.titulo}</h3>
              <p className="text-[14px] text-ink2 leading-[1.7] font-light">{paso.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Convocatoria activa */}
      <section className="border-t border-line bg-ink text-surface">
        <div className="max-w-wrap mx-auto px-6 py-10">
          <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-white/40 mb-3">
            Convocatoria activa · Mayo 2026
          </p>
          <p className="font-serif text-[clamp(1.4rem,2.8vw,2rem)] leading-snug text-white max-w-[580px]">
            Proyecto activo: buscamos implementador web y especialista en automatización.
          </p>
        </div>
      </section>

      {/* Formulario */}
      <section className="border-t border-line">
        <div className="max-w-[720px] mx-auto px-6 py-16 pb-20">
          <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink3 mb-3">
            Registro
          </p>
          <h2 className="font-serif text-[clamp(1.7rem,3.5vw,2.4rem)] text-ink mb-2">
            Quiero colaborar
          </h2>
          <p className="text-[15px] text-ink3 mb-10 leading-relaxed">
            Comparte tu perfil y te contactamos cuando haya un proyecto que encaje contigo.
          </p>
          <ColaboradorForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-line bg-surface2">
        <div className="max-w-wrap mx-auto px-6 py-8 flex flex-wrap justify-between items-center gap-4">
          <span className="font-mono text-[11px] tracking-[0.08em] text-ink3">
            byklai.com — sistemas digitales · Mérida, México
          </span>
          <a
            href="https://byklai.com"
            className="font-mono text-[11px] tracking-[0.08em] text-ink3 hover:text-ink transition-colors"
          >
            Ver portafolio →
          </a>
        </div>
      </footer>
    </div>
  );
}
