export default function PageHeader({ title, breadcrumb, children }) {
  /* breadcrumb bisa string atau array of string */
  const crumbs = Array.isArray(breadcrumb) ? breadcrumb : [breadcrumb];

  return (
    <div
      id="pageheader-container"
      className="flex items-center justify-between p-4"
    >
      <div id="pageheader-left" className="flex flex-col">
        <span id="page-title" className="text-3xl font-semibold">
          {title}
        </span>

        <div
          id="breadcrumb-links"
          className="flex items-center font-medium space-x-2 mt-2"
        >
          {crumbs.map((crumb, index) => (
            <span key={index} className="flex items-center space-x-2">
              {index > 0 && <span className="text-gray-400 mx-1">/</span>}
              <span
                className={
                  index === crumbs.length - 1
                    ? "text-hijau font-semibold"
                    : "text-gray-500"
                }
              >
                {crumb}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* KANAN: children (tombol, dsb) */}
      <div id="action-button">{children}</div>
    </div>
  );
}
