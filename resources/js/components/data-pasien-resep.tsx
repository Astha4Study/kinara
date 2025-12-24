import { Highlight } from './ui/highlight';

type Props = {
    pasien: {
        nama_lengkap: string;
        nomor_pasien: string;
    };
};

const DataPasienResep = ({ pasien }: Props) => {
    return (
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="space-y-6 p-6">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                        Informasi Pasien
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Data identitas pasien
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Highlight
                        label="Nomor Pasien"
                        value={pasien.nomor_pasien}
                    />
                    <Highlight
                        label="Nama Lengkap"
                        value={pasien.nama_lengkap}
                    />
                </div>
            </div>
        </div>
    );
};

export default DataPasienResep;
