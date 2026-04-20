import ErrorPage from "../components/ErrorPage";

export default function Error403() {
  return (
    <ErrorPage
      code={403}
      title="Forbidden"
      description="Anda tidak memiliki izin akses"
      image="/img/error403.png"
      bgColor="#8084D4"
      codeColor="#8084D4"
      btnColor="#8084D4"
    />
  );
}
