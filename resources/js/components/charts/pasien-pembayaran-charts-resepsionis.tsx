import {
    Area,
    AreaChart,
    CartesianGrid,
    Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

const formatRupiah = (v: number) =>
    new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(v);

type DataItem = {
    tanggal: string;
    pasien: number;
    pembayaran: number;
};

type Props = { data: DataItem[] };

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
                Pasien: <strong>{payload[0].value} orang</strong>
            </p>
            <p className="text-indigo-600">
                Pembayaran: <strong>{formatRupiah(payload[1].value)}</strong>
            </p>
        </div>
    );
};

const PasienPembayaranChartsResepsionis = ({ data }: Props) => {
    return (
        <div className="h-full w-full">
            {/* Legend bahasa Indonesia */}
            <div className="mb-3 flex gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-gray-600">Jumlah Pasien</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-indigo-500" />
                    <span className="text-gray-600">Total Pembayaran</span>
                </div>
            </div>

            <ResponsiveContainer width="100%" height="90%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient
                            id="pembayaranGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="0%"
                                stopColor="#6366f1"
                                stopOpacity={0.25}
                            />
                            <stop
                                offset="100%"
                                stopColor="#6366f1"
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>

                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#e5e7eb"
                        vertical={false}
                    />

                    <XAxis
                        dataKey="tanggal"
                        tickFormatter={(val) => val.slice(0, 3)}
                        tick={{ fontSize: 11, fill: '#64748b' }}
                        axisLine={false}
                        tickLine={false}
                    />

                    <YAxis
                        yAxisId="left"
                        tick={{ fontSize: 11, fill: '#64748b' }}
                        axisLine={false}
                        tickLine={false}
                    />

                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        tickFormatter={formatRupiah}
                        tick={{ fontSize: 11, fill: '#64748b' }}
                        axisLine={false}
                        tickLine={false}
                    />

                    <Tooltip content={<CustomTooltip />} />

                    <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="pasien"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                    />

                    <Area
                        yAxisId="right"
                        type="monotone"
                        dataKey="pembayaran"
                        stroke="#6366f1"
                        fill="url(#pembayaranGradient)"
                        strokeWidth={2}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PasienPembayaranChartsResepsionis;
