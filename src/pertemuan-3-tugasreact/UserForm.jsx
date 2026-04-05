import React, { useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";

export default function UserForm() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    nohp: "",
    prodi: "",
    kegiatan: "",
  });

  const [errors, setErrors] = useState({});
  const [hasil, setHasil] = useState(null);

  // VALIDATION
  const validate = (data = formData) => {
    let newErrors = {};

    if (!data.nama) newErrors.nama = "Nama wajib diisi";
    else if (/\d/.test(data.nama)) newErrors.nama = "Nama tidak boleh angka";
    else if (data.nama.length < 3) newErrors.nama = "Minimal 3 karakter";

    if (!data.email) newErrors.email = "Email wajib diisi";
    else if (!data.email.includes("@")) newErrors.email = "Harus ada simbol @";
    else if (!data.email.includes("ac.id"))
      newErrors.email = "Gunakan email kampus";

    if (!data.nohp) newErrors.nohp = "No HP wajib diisi";
    else if (isNaN(data.nohp)) newErrors.nohp = "Harus angka";
    else if (data.nohp.length < 10) newErrors.nohp = "Minimal 10 digit";

    if (!data.prodi) newErrors.prodi = "Program studi wajib dipilih";

    if (!data.kegiatan) newErrors.kegiatan = "Jenis kegiatan wajib dipilih";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // HANDLE CHANGE
  const handleChange = (e) => {
    const updatedData = {
      ...formData,
      [e.target.name]: e.target.value,
    };

    setFormData(updatedData);
    validate(updatedData);
  };

  // HANDLE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      setHasil(formData);
    }
  };

  return (
    /* backround */
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-8"
      style={{
        backgroundImage: "url('/img/backround.jpg')",
      }}
    >
      {/* CARD TRANSPARENT */}
      <div className="bg-white/50 backdrop-blur-md shadow-lg rounded-2xl w-full max-w-4xl p-8">
        {/* TITLE */}
        <h2 className="text-[#004B5F] font-semibold text-2xl text-center mb-8">
          Form Pendaftaran Kegiatan Kemahasiswaan <br />
          Politeknik Caltex Riau
        </h2>

        <form onSubmit={handleSubmit}>
          {/* GRID 2 KOLOM */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
            <InputField
              label="Nama Lengkap"
              name="nama"
              type="text"
              value={formData.nama}
              onChange={handleChange}
              error={errors.nama}
            />

            <InputField
              label="Nomor HP"
              name="nohp"
              type="text"
              value={formData.nohp}
              onChange={handleChange}
              error={errors.nohp}
            />

            <InputField
              label="Email Kampus"
              name="email"
              type="text"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />

            <SelectField
              label="Program Studi"
              name="prodi"
              value={formData.prodi}
              onChange={handleChange}
              error={errors.prodi}
              options={[
                "Sistem Informasi",
                "Teknik Informatika",
                "Teknologi Rekayasa Komputer",
                "Teknik Elektronika",
                "Teknik Listrik",
                "Teknik Mesin",
                "Teknologi Rekayasa Sistem Elektronika", "Teknologi Rekayasa Mekatronika" , "Teknologi Rekayasa Jaringan Telekomunikasi", "Akuntansi Perpajakan", "Bisnis Digital", "Hubungan Masyarakat dan komunikasi Digital"
              ]}
            />

            <div className="md:col-span-2">
              <SelectField
                label="Jenis Kegiatan"
                name="kegiatan"
                value={formData.kegiatan}
                onChange={handleChange}
                error={errors.kegiatan}
                options={["Seminar", "Workshop", "Pelatihan", "Lomba"]}
              />
            </div>
          </div>

          {/* BUTTON */}
          {Object.keys(errors).length === 0 &&
            Object.values(formData).every((value) => value !== "") && (
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="bg-[#004B5F] hover:bg-[#004B5F] text-white px-6 py-2 rounded-lg shadow"
 >
                  Save Changes
                </button>
              </div>
            )}
        </form>

        {/* RESULT */}
        {hasil && (
          <div className="mt-6 bg-[#004B5F]/40 backdrop-blur-md p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Data berhasil dikirim:</h3>

            <p>Nama: {hasil.nama}</p>
            <p>Email: {hasil.email}</p>
            <p>No HP: {hasil.nohp}</p>
            <p>Prodi: {hasil.prodi}</p>
            <p>Kegiatan: {hasil.kegiatan}</p>
          </div>
        )}
      </div>
    </div>
  );
}