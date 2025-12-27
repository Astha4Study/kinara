import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from 'recharts';

type Props = {
    data: {
        name: string;
        value: number;
    }[];
};

// Warna konsisten dengan tema chart dokter (emerald, amber, blue)
const COLORS: Record<string, string> = {
    'Menunggu': '#f59e0b', // amber-500
    'Sedang Diperiksa': '#3b82f6', // blue-500
    'Selesai': '#10b981', // emerald-500
};

const DistribusiStatusPiechartDokter = ({ data }: Props) => {
    if (!data || data.length === 0) {
        return (
            <div className="flex h-full items-center justify-center text-xs text-gray-500">
                Tidak ada data status hari ini
            </div>
        );
    }

    return (
        <div className="h-full w-full">
            {/* Legend custom */}
            <div className="mb-3 flex gap-4 text-xs">
                {Object.entries(COLORS).map(([status, color]) => (
                    <div key={status} className="flex items-center gap-1.5">
                        <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: color }}
                        />
                        <span className="text-gray-600">{status}</span>
                    </div>
                ))}
            </div>

            <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={3}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[entry.name] ?? '#CBD5E1'}
                            />
                        ))}
                    </Pie>

                    <Tooltip
                        formatter={(value?: number, name?: string) => [
                            `${value ?? 0} pasien`,
                            name ?? '',
                        ]}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DistribusiStatusPiechartDokter;
