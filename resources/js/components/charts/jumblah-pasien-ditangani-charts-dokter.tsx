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

type ChartItem = {
    hari: string;
    total: number;
};

type Props = {
    data: ChartItem[];
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
                Pasien ditangani: <strong>{payload[0].value} orang</strong>
            </p>
        </div>
    );
};

const JumblahPasienDitanganiChartsDokter = ({ data }: Props) => {
    return (
        <div className="h-full w-full">
            {/* Legend */}
            <div className="mb-3 flex gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-gray-600">Jumlah Pasien</span>
                </div>
            </div>

            {/* Chart */}
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient
                                id="pasienGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="#10b981"
                                    stopOpacity={0.25}
                                />
                                <stop
                                    offset="100%"
                                    stopColor="#10b981"
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
                            dataKey="hari"
                            tick={{ fontSize: 11, fill: '#64748b' }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <YAxis
                            allowDecimals={false}
                            tick={{ fontSize: 11, fill: '#64748b' }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <Tooltip content={<CustomTooltip />} />

                        <Line
                            type="monotone"
                            dataKey="total"
                            stroke="#10b981"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                            activeDot={{ r: 5 }}
                        />

                        <Area
                            type="monotone"
                            dataKey="total"
                            stroke="#10b981"
                            fill="url(#pasienGradient)"
                            strokeWidth={2}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default JumblahPasienDitanganiChartsDokter;
