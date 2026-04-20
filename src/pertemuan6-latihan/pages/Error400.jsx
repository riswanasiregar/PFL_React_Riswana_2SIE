import ErrorPage from "../components/ErrorPage";

export default function Error400() {
  return (
    <ErrorPage
      code={400}
      title="Bad Request — Permintaan tidak valid"
      description="Silakan periksa kembali data Anda."
      image="/img/error400.png"
      bgColor="#79ADBA"
      codeColor="#79ADBA"
      btnColor="#79ADBA"
    />
  );
}
