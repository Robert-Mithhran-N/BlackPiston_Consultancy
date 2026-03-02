import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface TimeRangeSelectorProps {
    value: string;
    onChange: (value: string) => void;
}

const ranges = [
    { label: '7D', value: '7d' },
    { label: '30D', value: '30d' },
    { label: '90D', value: '90d' },
];

export function TimeRangeSelector({ value, onChange }: TimeRangeSelectorProps) {
    return (
        <ToggleGroup type="single" value={value} onValueChange={(v) => v && onChange(v)} className="bg-muted/50 rounded-lg p-0.5">
            {ranges.map((r) => (
                <ToggleGroupItem
                    key={r.value}
                    value={r.value}
                    className="data-[state=on]:bg-[#0B2E22] data-[state=on]:text-[#C9A14A] text-xs font-medium px-3 h-7 rounded-md"
                    aria-label={`Show ${r.label} data`}
                >
                    {r.label}
                </ToggleGroupItem>
            ))}
        </ToggleGroup>
    );
}
