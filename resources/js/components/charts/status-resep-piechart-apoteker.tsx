import { Database } from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

type Props = {
    data: {
        name: string;
        value: number;
    }[];
};

// Warna khas apoteker/medis
const COLORS: Record<string, string> = {
    pending: '#22c55e', // hijau terang → identik dengan farmasi, herbal, kesehatan
    sedang_dibuat: '#0ea5e9', // biru → profesional, proses berjalan
    selesai: '#059669', // hijau emerald lebih pekat → resep selesai, aman
};

const StatusResepPiechartApoteker = ({ data }: Props) => {
    if (!data || data.length === 0) {
        return (
            <div className="flex h-full flex-col items-center justify-center gap-3 px-4 py-8 text-center">
                <Database className="h-12 w-12 text-emerald-600/60" />
                <div>
                    <p className="text-sm font-medium text-gray-700">
                        Belum ada resep masuk
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                        Resep akan muncul otomatis
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full w-full">
            {/* Legend custom */}
            <div className="mb-3 flex flex-wrap gap-4 text-xs">
                {Object.entries(COLORS).map(([label, color]) => (
                    <div key={label} className="flex items-center gap-1.5">
                        <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: color }}
                        />
                        <span className="text-gray-600">{label}</span>
                    </div>
                ))}
            </div>

            <ResponsiveContainer width="100%" height="85%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={75}
                        paddingAngle={3}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[entry.name] ?? '#CBD5E1'} // fallback abu-abu
                            />
                        ))}
                    </Pie>

                    <Tooltip
                        formatter={(value?: number, name?: string) => [
                            `${value ?? 0} resep`,
                            name ?? '',
                        ]}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default StatusResepPiechartApoteker;
