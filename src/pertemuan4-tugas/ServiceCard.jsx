export default function ServiceCard({ service }) {
  return (
    <div
      className="group bg-white rounded-3xl border border-slate-100 
                    shadow-sm hover:shadow-xl transition-all duration-500 
                    overflow-hidden max-w-sm"
    >
      {/* IMAGE */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover 
                     transition-transform duration-700 
                     group-hover:scale-105"
        />

        {/* overlay gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-t 
                        from-black/40 via-black/10 to-transparent"
        />

        {/* category badge */}
        <span
          className="absolute bottom-4 left-4 
                         bg-white/95 backdrop-blur-sm 
                         text-emerald-600 text-[11px] font-semibold 
                         px-3 py-1 rounded-lg shadow-sm 
                         tracking-wide"
        >
          {service.category}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-6">
        {/* rating + location */}
        <div className="flex items-center justify-between mb-3">
          <div
            className="flex items-center gap-1 
                          bg-amber-50 px-2 py-1 rounded-md"
          >
            <span className="text-xs">⭐</span>
            <span className="text-xs font-semibold text-amber-700">
              {service.rating}
            </span>
          </div>

          <span className="text-xs text-slate-400 flex items-center gap-1">
            📍 {service.contact.city}
          </span>
        </div>

        {/* title */}
        <h2
          className="text-lg font-bold text-slate-800 
                       leading-snug line-clamp-2 
                       group-hover:text-emerald-600 transition"
        >
          {service.name}
        </h2>

        {/* info healthcare trust */}
        <div
          className="mt-4 flex items-center justify-between 
                        text-xs text-slate-400 border-t border-slate-100 
                        pt-4"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Tersedia Hari Ini
          </div>

          <span className="italic">Terverifikasi</span>
        </div>

        {/* footer */}
        <div className="mt-5 flex items-center justify-between">
          {/* price */}
          <div>
            <p className="text-[11px] text-slate-400 uppercase tracking-wide">
              Estimasi Biaya
            </p>

            <p className="text-lg font-extrabold text-slate-900">
              <span className="text-slate-900 text-sm mr-1">Rp</span>

              {service.price.toLocaleString("id-ID")}
            </p>
          </div>

          {/* button */}
          <button
            className="bg-emerald-600 hover:bg-emerald-700 
                       text-white px-5 py-2 rounded-xl 
                       text-sm font-semibold 
                       transition active:scale-95 
                       shadow-md hover:shadow-lg"
          >
            Konsultasi
          </button>
        </div>
      </div>
    </div>
  );
}
