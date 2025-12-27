import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

type Props = {
    pendapatanTahunan: {
        bulan: string;
        total: number;
    }[];
};

const COLORS = [
    '#059669', // emerald-600
    '#14B8A6', // teal-500
    '#F59E0B', // amber-500
    '#0EA5E9', // sky-500
    '#F43F5E', // rose-500
    '#8B5CF6', // violet-500
    '#22C55E', // green-500
    '#EAB308', // yellow-500
    '#3B82F6', // blue-500
    '#EC4899', // pink-500
    '#6366F1', // indigo-500
    '#D946EF', // fuchsia-500
];

const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;
    const { bulan, total } = payload[0].payload;

    return (
        <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs shadow-sm">
            <p className="mb-1 font-medium text-gray-700">{bulan}</p>
            <p className="text-emerald-600">
                Pendapatan: <strong>Rp {total.toLocaleString('id-ID')}</strong>
            </p>
        </div>
    );
};

const TotalPendapatanTahunanAdmin = ({ pendapatanTahunan }: Props) => {
    if (!pendapatanTahunan || pendapatanTahunan.length === 0) {
        return (
            <div className="flex h-48 items-center justify-center text-xs text-gray-500">
                Tidak ada data pendapatan
            </div>
        );
    }

    // Ambil 6 bulan terakhir
    const lastSixMonths = pendapatanTahunan.slice(-6);

    return (
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={lastSixMonths}
                    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis
                        dataKey="bulan"
                        tick={{ fontSize: 11, fill: '#64748b' }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        allowDecimals={false}
                        tick={{ fontSize: 11, fill: '#64748b' }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(value) =>
                            `Rp ${value.toLocaleString('id-ID')}`
                        }
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="total">
                        {lastSixMonths.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TotalPendapatanTahunanAdmin;
