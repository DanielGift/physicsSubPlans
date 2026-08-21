import { useEffect, useMemo, useState } from 'react';
import { alienPhysicsQuestions } from '../activities/alienPhysics/questions';
import { experimentalDesignQuestions } from '../activities/experimentalDesign/questions';
import { physicsCourtQuestions } from '../activities/physicsCourt/questions';
import { TeacherAnswerPanel } from '../components/TeacherAnswerPanel';
import { PHYSICS_UNITS, REASONING_SKILLS, type ActivityId, type PhysicsUnit, type ReasoningSkill, type Verdict } from '../types';

interface BankEntry {
  id: string;
  activityId: ActivityId;
  difficulty: number;
  units: PhysicsUnit[];
  skills: ReasoningSkill[];
  verdict?: Verdict;
  searchText: string;
}

const ACTIVITY_LABELS: Record<ActivityId, string> = {
  'physics-court': 'Physics Court',
  'alien-physics': 'Alien Physics',
  'experimental-design': 'Experimental Design',
};

function buildEntries(verdictById: Record<string, Verdict>): BankEntry[] {
  const pc: BankEntry[] = physicsCourtQuestions.map((q) => ({
    id: q.id,
    activityId: 'physics-court',
    difficulty: q.difficulty,
    units: q.requiredUnits,
    skills: [],
    verdict: verdictById[q.id],
    searchText: `${q.id} ${q.claim} ${q.setup ?? ''}`.toLowerCase(),
  }));
  const ap: BankEntry[] = alienPhysicsQuestions.map((q) => ({
    id: q.id,
    activityId: 'alien-physics',
    difficulty: q.difficulty,
    units: [],
    skills: q.requiredSkills,
    searchText: `${q.id} ${q.prompt}`.toLowerCase(),
  }));
  const ed: BankEntry[] = experimentalDesignQuestions.map((q) => ({
    id: q.id,
    activityId: 'experimental-design',
    difficulty: q.difficulty,
    units: q.requiredUnits,
    skills: [],
    searchText: `${q.id} ${q.prompt}`.toLowerCase(),
  }));
  return [...pc, ...ap, ...ed];
}

/** Filters by activity, unit, skill, difficulty, verdict, and free text. IDs shown prominently (BUILD-SPEC.md §9). */
export function BankBrowser() {
  const [verdictById, setVerdictById] = useState<Record<string, Verdict>>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activityFilter, setActivityFilter] = useState<ActivityId | 'all'>('all');
  const [unitFilter, setUnitFilter] = useState<PhysicsUnit | 'all'>('all');
  const [skillFilter, setSkillFilter] = useState<ReasoningSkill | 'all'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [verdictFilter, setVerdictFilter] = useState<Verdict | 'all'>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    import('../activities/physicsCourt/answers').then(({ physicsCourtAnswers }) => {
      const next: Record<string, Verdict> = {};
      for (const [id, answer] of Object.entries(physicsCourtAnswers)) next[id] = answer.verdict;
      setVerdictById(next);
    });
  }, []);

  const entries = useMemo(() => buildEntries(verdictById), [verdictById]);

  const filtered = entries.filter((e) => {
    if (activityFilter !== 'all' && e.activityId !== activityFilter) return false;
    if (unitFilter !== 'all' && !e.units.includes(unitFilter)) return false;
    if (skillFilter !== 'all' && !e.skills.includes(skillFilter)) return false;
    if (difficultyFilter !== 'all' && e.difficulty !== Number(difficultyFilter)) return false;
    if (verdictFilter !== 'all' && e.verdict !== verdictFilter) return false;
    if (search && !e.searchText.includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="page stack">
      <h1>Bank Browser</h1>
      <div className="row-wrap card">
        <select value={activityFilter} onChange={(e) => setActivityFilter(e.target.value as ActivityId | 'all')}>
          <option value="all">All activities</option>
          {(Object.keys(ACTIVITY_LABELS) as ActivityId[]).map((id) => (
            <option key={id} value={id}>
              {ACTIVITY_LABELS[id]}
            </option>
          ))}
        </select>
        <select value={unitFilter} onChange={(e) => setUnitFilter(e.target.value as PhysicsUnit | 'all')}>
          <option value="all">All units</option>
          {PHYSICS_UNITS.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
        <select value={skillFilter} onChange={(e) => setSkillFilter(e.target.value as ReasoningSkill | 'all')}>
          <option value="all">All skills</option>
          {REASONING_SKILLS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)}>
          <option value="all">All difficulties</option>
          {[1, 2, 3, 4, 5].map((d) => (
            <option key={d} value={d}>
              Difficulty {d}
            </option>
          ))}
        </select>
        <select value={verdictFilter} onChange={(e) => setVerdictFilter(e.target.value as Verdict | 'all')}>
          <option value="all">All verdicts</option>
          <option value="always">always</option>
          <option value="sometimes">sometimes</option>
          <option value="never">never</option>
        </select>
        <input type="search" placeholder="Search…" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <table className="card" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left' }}>
            <th>ID</th>
            <th>Activity</th>
            <th>Difficulty</th>
            <th>Verdict</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((e) => (
            <tr key={e.id} onClick={() => setSelectedId(e.id === selectedId ? null : e.id)} style={{ cursor: 'pointer' }}>
              <td style={{ fontFamily: 'monospace' }}>{e.id}</td>
              <td>{ACTIVITY_LABELS[e.activityId]}</td>
              <td>{e.difficulty}</td>
              <td>{e.verdict ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedId && (
        <TeacherAnswerPanel activityId={entries.find((e) => e.id === selectedId)!.activityId} questionId={selectedId} />
      )}
    </div>
  );
}
