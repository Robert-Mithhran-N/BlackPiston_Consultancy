import {
    AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const CHART_COLORS = {
    primary: '#0B2E22',
    accent: '#C9A14A',
    highlight: '#E7D3A3',
    muted: '#9CA3AF',
    green: '#10B981',
    red: '#EF4444',
};

interface ChartProps {
    data: Record<string, unknown>[];
    type: 'area' | 'bar' | 'pie';
    dataKeys: { key: string; color?: string; label?: string }[];
    xKey?: string;
    height?: number;
    title?: string;
}

export function AdminChart({ data, type, dataKeys, xKey = 'date', height = 300, title }: ChartProps) {
    return (
        <div className="bg-card rounded-xl border border-border p-5 shadow-luxury">
            {title && (
                <h3 className="font-heading font-semibold text-base mb-4">{title}</h3>
            )}
            <ResponsiveContainer width="100%" height={height}>
                {type === 'area' ? (
                    <AreaChart data={data}>
                        <defs>
                            {dataKeys.map((dk, i) => (
                                <linearGradient key={dk.key} id={`gradient-${i}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={dk.color || CHART_COLORS.accent} stopOpacity={0.3} />
                                    <stop offset="95%" stopColor={dk.color || CHART_COLORS.accent} stopOpacity={0} />
                                </linearGradient>
                            ))}
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis dataKey={xKey} className="text-xs" tick={{ fill: '#9CA3AF' }} />
                        <YAxis className="text-xs" tick={{ fill: '#9CA3AF' }} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'hsl(var(--card))',
                                borderColor: 'hsl(var(--border))',
                                borderRadius: '8px',
                                fontSize: '13px',
                            }}
                        />
                        <Legend />
                        {dataKeys.map((dk, i) => (
                            <Area
                                key={dk.key}
                                type="monotone"
                                dataKey={dk.key}
                                name={dk.label || dk.key}
                                stroke={dk.color || CHART_COLORS.accent}
                                fill={`url(#gradient-${i})`}
                                strokeWidth={2}
                            />
                        ))}
                    </AreaChart>
                ) : type === 'bar' ? (
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis dataKey={xKey} className="text-xs" tick={{ fill: '#9CA3AF' }} />
                        <YAxis className="text-xs" tick={{ fill: '#9CA3AF' }} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'hsl(var(--card))',
                                borderColor: 'hsl(var(--border))',
                                borderRadius: '8px',
                                fontSize: '13px',
                            }}
                        />
                        {dataKeys.map((dk) => (
                            <Bar
                                key={dk.key}
                                dataKey={dk.key}
                                name={dk.label || dk.key}
                                fill={dk.color || CHART_COLORS.accent}
                                radius={[4, 4, 0, 0]}
                            />
                        ))}
                    </BarChart>
                ) : (
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey={dataKeys[0]?.key || 'value'}
                            nameKey={xKey}
                            cx="50%"
                            cy="50%"
                            outerRadius={height / 3}
                            innerRadius={height / 5}
                            paddingAngle={3}
                            label
                        >
                            {data.map((_, i) => (
                                <Cell key={i} fill={[CHART_COLORS.primary, CHART_COLORS.accent, CHART_COLORS.highlight, CHART_COLORS.green, CHART_COLORS.muted][i % 5]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'hsl(var(--card))',
                                borderColor: 'hsl(var(--border))',
                                borderRadius: '8px',
                                fontSize: '13px',
                            }}
                        />
                        <Legend />
                    </PieChart>
                )}
            </ResponsiveContainer>
        </div>
    );
}
