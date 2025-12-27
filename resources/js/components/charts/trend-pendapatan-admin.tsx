import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

type TrendPendapatanItem = {
    tanggal: string;
    total: number;
};

type TrendPendapatanProps = {
    data: TrendPendapatanItem[];
};

const CustomTooltip = ({
    active,
    payload,
    label,
}: {
    active?: boolean;
    payload?: any[];
    label?: string;
}) => {
    if (!active || !payload?.length) return null;

    return (
        <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs shadow-sm">
            <p className="mb-1 font-medium text-gray-700">{label}</p>
            <p className="text-emerald-600">
                Pendapatan:{' '}
                <strong>Rp {payload[0].value.toLocaleString('id-ID')}</strong>
            </p>
        </div>
    );
};

const TrendPendapatanAdmin = ({ data }: TrendPendapatanProps) => {
    if (!data || data.length === 0) {
        return (
            <div className="flex h-64 items-center justify-center text-xs text-gray-500">
                Tidak ada data pendapatan
            </div>
        );
    }

    return (
        <div className="h-full w-full">
            {/* Legend */}
            <div className="mb-3 flex gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-gray-600">Pendapatan</span>
                </div>
            </div>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#e5e7eb"
                        vertical={false}
                    />
                    <XAxis
                        dataKey="tanggal"
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
                    <Line
                        type="monotone"
                        dataKey="total"
                        stroke="#10b981" // emerald
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TrendPendapatanAdmin;
