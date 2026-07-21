import Link from "next/link";
import { Container } from "./Container";

const SocialIcon = ({ children }: { children: React.ReactNode }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
  >
    {children}
  </svg>
);

const SOCIALS = [
  {
    label: "Instagram",
    icon: (
      <SocialIcon>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </SocialIcon>
    ),
  },
  {
    label: "LinkedIn",
    icon: (
      <SocialIcon>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </SocialIcon>
    ),
  },
  {
    label: "X",
    icon: (
      <SocialIcon>
        <path d="M4 4l7.07 8.51L4 20h2.4l5.83-6.27L16 20h4l-7.42-8.93L19.5 4H17l-5.43 5.86L8 4H4z" />
      </SocialIcon>
    ),
  },
  {
    label: "YouTube",
    icon: (
      <SocialIcon>
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
      </SocialIcon>
    ),
  },
];

const COLUMNS = [
  {
    title: "Plataforma",
    links: [
      { label: "Inventario", href: "/inventario" },
      { label: "Comparador", href: "#" },
      { label: "Financiamiento", href: "#" },
      { label: "Marcas", href: "#" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Nosotros", href: "#" },
      { label: "Contacto", href: "/contacto" },
      { label: "Blog", href: "#" },
      { label: "FAQ", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacidad", href: "#" },
      { label: "Términos", href: "#" },
      { label: "Cookies", href: "#" },
      { label: "Compliance", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden">
      <div className="absolute inset-0 bg-[var(--color-ink)]" />
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(27,90,138,0.4),transparent_70%)]" />

      <Container className="relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 py-20">
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                <span className="font-bold text-[var(--color-primary)] text-base">M</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-semibold text-white">Mi Auto Match</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                  Plataforma
                </span>
              </div>
            </Link>
            <p className="mt-6 text-white/60 text-[15px] leading-relaxed max-w-sm text-pretty">
              Plataforma tecnológica especializada en conectar personas con el vehículo ideal,
              mediante una experiencia digital moderna y transparente.
            </p>
            <div className="mt-8 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h4 className="text-white text-sm font-semibold tracking-tight mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[14px] text-white/55 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-white/45">
            © 2026 Mi Auto Match. Todos los derechos reservados.
          </p>
          <p className="text-[13px] text-white/45">
            Hecho con tecnología en Chile
          </p>
        </div>
      </Container>
    </footer>
  );
}
