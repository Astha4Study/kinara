type DetailItem = {
    id: number;
    nama: string;
    jumlah: number;
    satuan?: string;
};

type Props = {
    detail: DetailItem[];
    processing?: boolean;
    onConfirm: () => void;
};

const TableObatPenyerahanObatApoteker = ({
    detail,
    processing = false,
    onConfirm,
}: Props) => {
    return (
        <div className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            {/* Header */}
            <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800">
                    Daftar Obat Resep
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    Obat yang akan diserahkan kepada pasien
                </p>
            </div>

            {/* Table */}
            <div className="flex-1 px-4 pb-4">
                <div className="overflow-hidden rounded-md border border-gray-200">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-600 uppercase">
                                    Obat
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-medium tracking-wider text-gray-600 uppercase">
                                    Jumlah
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {detail.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-gray-900">
                                        {item.nama}
                                    </td>
                                    <td className="px-4 py-3 text-right text-gray-700">
                                        {item.jumlah}{' '}
                                        {item.satuan ? item.satuan : ''}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Footer dengan tombol aksi */}
            <div className="flex justify-end border-t border-gray-200 bg-gray-50 px-6 py-4">
                <button
                    type="button"
                    disabled={processing}
                    onClick={onConfirm}
                    className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
                >
                    Konfirmasi Penyerahan Obat
                </button>
            </div>
        </div>
    );
};

export default TableObatPenyerahanObatApoteker;
