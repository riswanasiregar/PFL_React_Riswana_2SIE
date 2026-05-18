import Button from "../../components/Button";
import PageHeader from "../../components/PageHeader";
import Badge from "../../components/Badge";
import Avatar from "../../components/Avatar";
import Container from "../../components/Container";
import Footer from "../../components/Footer";

export default function Components() {
    return (
        <>
        <Container className="bg-gray-200">
            <PageHeader title="Components" />
            <p>Ini halaman Components</p>

            <div className="mb-3 flex gap-2">
                <Button>Simpan</Button>
                <Button type="secondary">Secondary</Button>
                <Button type="success">Success</Button>
                <Button type="danger">Hapus</Button>
                <Button type="warning">Kurang</Button>
            </div>

            <div className="mb-3 flex gap-2">
                <Badge>Berhasil</Badge>
                <Badge type="secondary">Secondary</Badge>
                <Badge type="success">Success</Badge>
                <Badge type="danger">Hapus</Badge>
                <Badge type="warning">Kurang</Badge>
            </div>
          <div className="mb-3 flex gap-2">
                <Avatar name="Riswana" />
                <Avatar name="Saddiah" />
        </div>

               {/*
            <Container className="bg-gray-200">
            <h1 className="text-3xl font-bold mb-4">
                Daftar Produk
            </h1>

            <p className="text-gray-600">
                Berikut adalah daftar produk terbaru.
            </p> */}
            
            </Container>
            <Footer />
            </>

    );
}