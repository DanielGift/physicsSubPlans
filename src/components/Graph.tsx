import type { GraphDefinition } from '../types';

interface GraphProps {
  graph: GraphDefinition;
  width?: number;
  height?: number;
}

const PADDING = 40;
const DEFAULT_COLORS = ['#1e5c4a', '#8a6d1d', '#2f7dd1'];

/** Hand-rolled SVG chart — no charting library (BUILD-SPEC.md §0). */
export function Graph({ graph, width = 480, height = 320 }: GraphProps) {
  const allPoints = graph.series.flatMap((s) => s.points);
  const xs = allPoints.map((p) => p[0]);
  const ys = allPoints.map((p) => p[1]);
  const xMin = Math.min(...xs, 0);
  const xMax = Math.max(...xs, 1);
  const yMin = Math.min(...ys, 0);
  const yMax = Math.max(...ys, 1);

  const plotWidth = width - PADDING * 2;
  const plotHeight = height - PADDING * 2;
  const toX = (x: number) => PADDING + ((x - xMin) / (xMax - xMin || 1)) * plotWidth;
  const toY = (y: number) => height - PADDING - ((y - yMin) / (yMax - yMin || 1)) * plotHeight;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" role="img" aria-label={`Graph of ${graph.yLabel} vs ${graph.xLabel}`}>
      <line x1={PADDING} y1={height - PADDING} x2={width - PADDING} y2={height - PADDING} stroke="currentColor" opacity={0.4} />
      <line x1={PADDING} y1={PADDING} x2={PADDING} y2={height - PADDING} stroke="currentColor" opacity={0.4} />
      <text x={width / 2} y={height - 8} textAnchor="middle" fontSize={12}>
        {graph.xLabel}
      </text>
      <text x={12} y={height / 2} textAnchor="middle" fontSize={12} transform={`rotate(-90 12 ${height / 2})`}>
        {graph.yLabel}
      </text>
      {graph.series.map((series, i) => {
        const color = series.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length];
        return (
          <g key={series.label}>
            <polyline fill="none" stroke={color} strokeWidth={2} points={series.points.map((p) => `${toX(p[0])},${toY(p[1])}`).join(' ')} />
            {series.points.map((p, idx) => (
              <circle key={idx} cx={toX(p[0])} cy={toY(p[1])} r={3} fill={color} />
            ))}
          </g>
        );
      })}
    </svg>
  );
}
