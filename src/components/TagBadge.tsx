interface TagBadgeProps {
  label: string;
  tone?: 'default' | 'always' | 'sometimes' | 'never';
}

const TONE_VAR: Partial<Record<Required<TagBadgeProps>['tone'], string>> = {
  always: 'var(--color-verdict-always)',
  sometimes: 'var(--color-verdict-sometimes)',
  never: 'var(--color-verdict-never)',
};

export function TagBadge({ label, tone = 'default' }: TagBadgeProps) {
  const color = TONE_VAR[tone];
  return (
    <span className="badge" style={color ? { color, borderColor: color } : undefined}>
      {label}
    </span>
  );
}
