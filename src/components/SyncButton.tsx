'use client';

import { useCallback, useEffect, useState } from 'react';
import { CheckCircle2, CircleAlert, CloudOff, RefreshCw, Wifi } from 'lucide-react';
import { toast } from 'sonner';
import { getFailedCount, getPendingCount } from '@/lib/storage';
import { syncNow } from '@/lib/sync';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface SyncButtonProps { onSyncComplete?: () => void; }

export default function SyncButton({ onSyncComplete }: SyncButtonProps) {
  const { t } = useLanguage();
  const [pending, setPending] = useState(0);
  const [failed, setFailed] = useState(0);
  const [syncing, setSyncing] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [online, setOnline] = useState(() => typeof navigator === 'undefined' || navigator.onLine);
  const [progress, setProgress] = useState<{ completed: number; total: number } | null>(null);
  const refresh = useCallback(async () => {
    const [nextPending, nextFailed] = await Promise.all([getPendingCount(), getFailedCount()]);
    setPending(nextPending); setFailed(nextFailed); setLoaded(true);
  }, []);

  useEffect(() => {
    const initialRefresh = window.setTimeout(() => void refresh(), 0);
    const goOnline = () => { setOnline(true); void refresh(); };
    const goOffline = () => setOnline(false);
    window.addEventListener('online', goOnline); window.addEventListener('offline', goOffline);
    return () => { window.clearTimeout(initialRefresh); window.removeEventListener('online', goOnline); window.removeEventListener('offline', goOffline); };
  }, [refresh]);

  const queued = pending + failed;
  async function handleSync() {
    if (!online) return;
    setSyncing(true); setProgress({ completed: 0, total: queued });
    try {
      const result = await syncNow((completed, total) => setProgress({ completed, total }));
      await refresh(); onSyncComplete?.();
      if (result.failed) toast.warning(`${result.failed} ${t('reportsFailedCount')}`);
      else if (result.synced) toast.success(`${result.synced} ${t('syncSuccess')}`);
    } catch (error) {
      console.error('Sync error:', error);
      toast.error(t('syncFailed'));
    } finally { setSyncing(false); setProgress(null); }
  }

  if (!online) return <div className="flex gap-3" role="status" aria-live="polite">
    <CloudOff className="mt-0.5 h-5 w-5 shrink-0" style={{ color: 'var(--tg-sync-pending)' }} />
    <div><p className="font-semibold" style={{ color: 'var(--tg-on-surface)' }}>{t('offlineSafeNotice')}</p><p className="mt-0.5 text-sm" style={{ color: 'var(--tg-on-surface-variant)' }}>{loaded ? `${queued} ${t('syncSafeStored')}` : t('syncChecking')}</p></div>
  </div>;

  return <div className="flex items-center justify-between gap-4" role="status" aria-live="polite">
    <div className="min-w-0"><p className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: 'var(--tg-on-surface)' }}>
      {syncing ? <RefreshCw className="tg-spin h-4 w-4" /> : failed ? <CircleAlert className="h-4 w-4" style={{ color: 'var(--tg-sync-failed)' }} /> : queued ? <Wifi className="h-4 w-4" style={{ color: 'var(--tg-primary)' }} /> : <CheckCircle2 className="h-4 w-4" style={{ color: 'var(--tg-sync-synced)' }} />}
      {syncing ? `${t('syncingProgress')}${progress?.total ? ` · ${progress.completed}/${progress.total}` : ''}` : !loaded ? t('syncChecking') : failed ? `${failed} ${t('reportsFailedCount')}` : queued ? `${queued} ${t('waitingBadge')}` : t('allSynced')}
    </p><p className="mt-0.5 text-xs" style={{ color: 'var(--tg-on-surface-variant)' }}>{!loaded ? t('readingReports') : failed ? t('retryFailedReports') : queued ? t('syncWaitingControl') : t('syncNoAction')}</p></div>
    {queued > 0 && <button type="button" onClick={handleSync} disabled={syncing} className="touch-target shrink-0 rounded-xl px-4 text-sm font-semibold disabled:opacity-60" style={{ backgroundColor: 'var(--tg-primary)', color: 'var(--tg-on-primary)' }}>{syncing ? t('syncingProgress') : failed ? t('syncRetry') : t('syncNow')}</button>}
  </div>;
}
