import ErrorPage from "../../components/ErrorPage";

export default function Error401() {
  return (
    <ErrorPage
      code={401}
      title="Unauthorized"
      description="Silakan login terlebih dahulu"
      image="/img/error401.png"
      bgColor="#5AC3D9"
      codeColor="#5AC3D9"
      btnColor="#5AC3D9"
    />
  );
}
