'use client';

import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { SectionSkeleton } from '@/components/ui/Skeleton';
import {
  SupportService,
  type SupportTicketResponse,
  type SupportTicketStatus
} from '@/lib/api/support.service';

const statuses: SupportTicketStatus[] = ['PENDING', 'RESOLVED', 'CLOSED'];

export default function SupportTicketsPage() {
  const [tickets, setTickets] = useState<SupportTicketResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<SupportTicketStatus | ''>('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadTickets = useCallback(async () => {
    setLoading(true);
    try {
      const response = await SupportService.getTickets({
        searchTerm: search.trim() || undefined,
        status: status || undefined,
        limit: 100
      });
      setTickets(response.data);
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Failed to load support tickets');
    } finally {
      setLoading(false);
    }
  }, [search, status]);

  useEffect(() => {
    const timeout = window.setTimeout(() => void loadTickets(), 250);
    return () => window.clearTimeout(timeout);
  }, [loadTickets]);

  const updateStatus = async (ticket: SupportTicketResponse, next: SupportTicketStatus) => {
    setUpdatingId(ticket.id);
    try {
      const updated = await SupportService.updateTicketStatus(ticket.id, next);
      setTickets((current) => current.map((item) => (item.id === ticket.id ? updated : item)));
      toast.success('Support ticket updated');
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Failed to update support ticket');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className='space-y-6 p-6'>
      <div>
        <h1 className='text-2xl font-bold text-gray-900'>Support Tickets</h1>
        <p className='mt-1 text-sm text-gray-600'>Review and resolve customer support requests.</p>
      </div>

      <div className='flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 sm:flex-row'>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder='Search name, email, or subject'
          className='flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm'
        />
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value as SupportTicketStatus | '')}
          className='rounded-lg border border-gray-200 px-3 py-2 text-sm'
        >
          <option value=''>All statuses</option>
          {statuses.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </div>

      {loading ? (
        <SectionSkeleton rows={5} />
      ) : tickets.length === 0 ? (
        <div className='rounded-xl border border-gray-200 bg-white p-10 text-center text-gray-500'>
          No support tickets found.
        </div>
      ) : (
        <div className='space-y-3'>
          {tickets.map((ticket) => (
            <article key={ticket.id} className='rounded-xl border border-gray-200 bg-white p-5'>
              <div className='flex flex-col justify-between gap-4 md:flex-row'>
                <div className='min-w-0'>
                  <div className='flex flex-wrap items-center gap-2'>
                    <h2 className='font-bold text-gray-900'>{ticket.subject}</h2>
                    <span className='rounded-full bg-gray-100 px-2 py-1 text-xs'>{ticket.status}</span>
                  </div>
                  <p className='mt-1 text-xs text-gray-500'>
                    {ticket.name} · {ticket.email} · {new Date(ticket.createdAt).toLocaleString()}
                  </p>
                  <p className='mt-3 whitespace-pre-wrap text-sm text-gray-700'>{ticket.message}</p>
                </div>
                <select
                  aria-label={`Status for ${ticket.subject}`}
                  value={ticket.status}
                  disabled={updatingId === ticket.id}
                  onChange={(event) => void updateStatus(ticket, event.target.value as SupportTicketStatus)}
                  className='h-10 rounded-lg border border-gray-200 px-3 text-sm disabled:opacity-50'
                >
                  {statuses.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
