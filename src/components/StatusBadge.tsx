'use client';

import {
  CircleAlert,
  Eye,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import type { InspectionStatus } from '@/lib/types';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface StatusBadgeProps {
  status: InspectionStatus;
  size?: 'sm' | 'default';
}

const STATUS_CONFIG: Record<
  InspectionStatus,
  {
    style: React.CSSProperties;
    Icon: React.ElementType;
  }
> = {
  open: {
    style: {
      backgroundColor: 'var(--tg-status-open-container)',
      color: 'var(--tg-status-open)',
    },
    Icon: CircleAlert,
  },
  acknowledged: {
    style: {
      backgroundColor: 'var(--tg-status-acknowledged-container)',
      color: 'var(--tg-status-acknowledged)',
    },
    Icon: Eye,
  },
  inspection_required: {
    style: {
      backgroundColor: 'var(--tg-status-inspection-container)',
      color: 'var(--tg-status-inspection)',
    },
    Icon: AlertTriangle,
  },
  resolved: {
    style: {
      backgroundColor: 'var(--tg-status-resolved-container)',
      color: 'var(--tg-status-resolved)',
    },
    Icon: CheckCircle2,
  },
};

export default function StatusBadge({
  status,
  size = 'default',
}: StatusBadgeProps) {
  const { statusLabel } = useLanguage();
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.open;
  const { Icon } = config;

  const isSmall = size === 'sm';

  return (
    <span
      className={`inline-flex items-center font-medium ${
        isSmall ? 'rounded-md px-2 py-0.5 text-[10px]' : 'rounded-lg px-2.5 py-1 text-xs'
      }`}
      style={config.style}
    >
      <Icon
        className={`${isSmall ? 'mr-1 h-3 w-3' : 'mr-1.5 h-3.5 w-3.5'}`}
        aria-hidden="true"
      />
      {statusLabel(status)}
    </span>
  );
}