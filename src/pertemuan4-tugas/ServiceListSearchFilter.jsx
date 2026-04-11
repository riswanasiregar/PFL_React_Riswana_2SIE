import { useState } from "react";
import services from "./services.json";
import ServiceCard from "./ServiceCard";
import ServiceTable from "./ServiceTable";

export default function ServiceListSearchFilter() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [city, setCity] = useState("All");

  const filteredServices = services.filter((service) => {
    return (
      service.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || service.category === category) &&
      (city === "All" || service.contact.city === city)
    );
  });

  return (
    <div className="p-6">
      {/* SEARCH + FILTER */}

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search layanan..."
          className="border p-2 rounded"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>All</option>
          <option>Telemedicine</option>
          <option>Klinik</option>
          <option>Apotek</option>
          <option>Laboratorium</option>
        </select>

        <select
          className="border p-2 rounded"
          onChange={(e) => setCity(e.target.value)}
        >
          <option>All</option>
          <option>Pekanbaru</option>
          <option>Dumai</option>
          <option>Bangkinang</option>
        </select>
      </div>

      {/* GUEST VIEW */}

      <h1 className="text-xl font-bold mb-4">Guest View</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      {/* ADMIN VIEW */}

      <h1 className="text-xl font-bold mt-10 mb-4">Admin View</h1>

      <ServiceTable services={filteredServices} />
    </div>
  );
}
