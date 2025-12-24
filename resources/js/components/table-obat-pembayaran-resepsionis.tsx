type DetailItem = {
    id: number;
    nama: string;
    jumlah: number;
    harga: number;
    subtotal: number;
    satuan?: string;
};

type Props = {
    detail: DetailItem[];
};

const TableObatPembayaranResepsionis = ({ detail }: Props) => {
    const grandTotal = detail.reduce((sum, i) => sum + i.subtotal, 0);

    return (
        <div className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            {/* Header */}
            <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800">
                    Detail Obat Resep
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    Daftar lengkap obat beserta harga yang dibayarkan
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
                                <th className="px-4 py-3 text-right text-xs font-medium tracking-wider text-gray-600 uppercase">
                                    Harga Satuan
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-medium tracking-wider text-gray-600 uppercase">
                                    Subtotal
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
                                    <td className="px-4 py-3 text-right text-gray-700">
                                        {new Intl.NumberFormat('id-ID', {
                                            style: 'currency',
                                            currency: 'IDR',
                                            minimumFractionDigits: 0,
                                        }).format(item.harga)}
                                    </td>
                                    <td className="px-4 py-3 text-right font-semibold text-gray-900">
                                        Rp{' '}
                                        {item.subtotal.toLocaleString('id-ID')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Footer Total */}
            <div className="mt-auto border-t border-gray-200 bg-gray-50 px-6 py-3">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">
                        Total
                    </span>
                    <span className="text-lg font-bold text-emerald-600">
                        Rp {grandTotal.toLocaleString('id-ID')}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TableObatPembayaranResepsionis;
