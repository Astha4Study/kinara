import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

type Props = {
    data: {
        name: string;
        value: number;
        color: string; // warna dikirim dari backend, wajib
    }[];
};

const CustomTooltip = ({
    active,
    payload,
}: {
    active?: boolean;
    payload?: any[];
}) => {
    if (!active || !payload?.length) return null;

    const { name, value } = payload[0].payload;

    return (
        <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs shadow-sm">
            <p className="mb-1 font-medium text-gray-700">{name}</p>
            <p className="text-gray-600">
                Total: <strong className="text-emerald-600">{value}</strong>
            </p>
        </div>
    );
};

const StatusLayananPieChartAdmin = ({ data }: Props) => {
    if (!data || data.length === 0) {
        return (
            <div className="flex h-48 items-center justify-center text-xs text-gray-500">
                Tidak ada data layanan
            </div>
        );
    }

    return (
        <div className="h-48 w-full">
            {/* Legend custom di atas */}
            <div className="mb-3 flex flex-wrap gap-4 text-xs">
                {data.map((item) => (
                    <div key={item.name} className="flex items-center gap-1.5">
                        <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: item.color }}
                        />
                        <span className="text-gray-600">{item.name}</span>
                    </div>
                ))}
            </div>

            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={4}
                        stroke="#fff"
                        strokeWidth={1}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default StatusLayananPieChartAdmin;
