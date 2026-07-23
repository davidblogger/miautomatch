import { ArrowUpRight, Car, Eye, Users, TrendingUp } from "lucide-react";

const KPIS = [
  { label: "Vehículos activos", value: "1.247", trend: "+12%", icon: Car, tone: "primary" },
  { label: "Visitas hoy", value: "8.392", trend: "+5,4%", icon: Eye, tone: "accent" },
  { label: "Leads del mes", value: "186", trend: "+23%", icon: Users, tone: "primary" },
  { label: "Tasa de conversión", value: "3,2%", trend: "+0,4%", icon: TrendingUp, tone: "accent" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-10">
      <header>
        <span className="text-[11px] uppercase tracking-[0.25em] text-[var(--color-text-muted)] font-medium">
          Vista general
        </span>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] text-balance">
          Dashboard
        </h1>
        <p className="mt-3 text-[15px] text-[var(--color-text-secondary)] max-w-xl text-pretty">
          Resumen de actividad, métricas clave y próximos pasos para tu plataforma.
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPIS.map((k) => {
          const Icon = k.icon;
          return (
            <div
              key={k.label}
              className="group bg-white border border-[var(--color-border)] rounded-2xl p-5 hover:border-[var(--color-primary)]/30 hover:shadow-[var(--shadow-md)] transition-all"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    k.tone === "primary"
                      ? "bg-[var(--color-primary-50)] text-[var(--color-primary)]"
                      : "bg-emerald-50 text-emerald-700"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {k.trend}
                </span>
              </div>
              <div className="mt-5">
                <div className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] font-mono">
                  {k.value}
                </div>
                <div className="mt-1 text-[13px] text-[var(--color-text-secondary)]">
                  {k.label}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white border border-[var(--color-border)] rounded-3xl p-8">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">Vehículos publicados</h2>
              <p className="text-[13px] text-[var(--color-text-secondary)] mt-1">
                Actividad de los últimos 6 meses
              </p>
            </div>
            <span className="text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">
              Mensual
            </span>
          </div>

          <div className="h-64 flex items-end gap-3">
            {[42, 58, 73, 51, 89, 102].map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-[var(--color-primary-50)] rounded-t-lg relative group">
                  <div
                    className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[var(--color-primary)] to-[var(--color-primary-light)] rounded-t-lg transition-all"
                    style={{ height: `${(v / 102) * 100}%` }}
                  />
                </div>
                <span className="text-[11px] text-[var(--color-text-muted)] font-mono">
                  {["Jun", "Jul", "Ago", "Sep", "Oct", "Nov"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 bg-white border border-[var(--color-border)] rounded-3xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold tracking-tight">Actividad reciente</h2>
            <button className="text-[12px] text-[var(--color-primary)] hover:underline">
              Ver todo
            </button>
          </div>

          <ul className="space-y-4">
            {[
              { who: "Tú", what: "publicaste", which: "BMW M4 Competition", when: "hace 2h" },
              { who: "Camila", what: "actualizó", which: "Porsche Taycan 4S", when: "hace 5h" },
              { who: "Tú", what: "eliminaste", which: "Audi A4 2019", when: "ayer" },
              { who: "Sistema", what: "aprobó", which: "Mercedes AMG GT", when: "ayer" },
            ].map((a, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--color-primary-50)] flex items-center justify-center text-[11px] font-semibold text-[var(--color-primary)] shrink-0">
                  {a.who[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] text-[var(--color-text-primary)]">
                    <span className="font-semibold">{a.who}</span>{" "}
                    <span className="text-[var(--color-text-secondary)]">{a.what}</span>{" "}
                    <span className="font-medium">{a.which}</span>
                  </div>
                  <div className="text-[11px] text-[var(--color-text-muted)] mt-0.5">
                    {a.when}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[var(--color-primary)] rounded-3xl p-8 text-white relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 20%, rgba(27,90,138,0.6) 0%, transparent 50%)",
          }}
        />
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold tracking-tight">3 vehículos pendientes de aprobación</h3>
            <p className="mt-1 text-[14px] text-white/70">
              Revisa y aprueba los nuevos ingresos para publicarlos en el inventario.
            </p>
          </div>
          <a
            href="/vehiculos"
            className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-white text-[var(--color-primary)] font-medium text-[14px] hover:bg-white/95 transition-colors"
          >
            Revisar pendientes
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}