export const STAGES = [
  { id: 'new', label: 'New Idea', emoji: '💡', color: '#3B82F6' },
  { id: 'research', label: 'Research', emoji: '🔍', color: '#8B5CF6' },
  { id: 'poc', label: 'Proof of Concept', emoji: '🧪', color: '#F59E0B' },
  { id: 'codebase', label: 'Codebase Built', emoji: '💻', color: '#10B981' },
  { id: 'testing', label: 'Tested & Ready', emoji: '✅', color: '#84CC16' },
  { id: 'deployed', label: 'Deployed', emoji: '🎉', color: '#22C55E' },
];

export const DEFAULT_CATEGORIES = [
  { id: 'outreach', label: '📣 Targeted Outreach', color: '#EC4899' },
  { id: 'membership', label: '👥 Membership Services', color: '#8B5CF6' },
  { id: 'benefits', label: '💊 Benefits', color: '#10B981' },
  { id: 'compliance', label: '📋 Compliance', color: '#F59E0B' },
  { id: 'internal', label: '🔧 Internal Tools', color: '#6366F1' },
];

export const ADMIN_CODE = import.meta.env.VITE_ADMIN_CODE || '478';
