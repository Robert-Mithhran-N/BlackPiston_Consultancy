import { http, HttpResponse, delay } from 'msw';
import listingsData from './data/listings.json';
import usersData from './data/users.json';
import sellersData from './data/sellers.json';
import transactionsData from './data/transactions.json';
import auditLogsData from './data/auditLogs.json';

// In-memory mutable state (reset on refresh)
let listings = [...listingsData];
let users = [...usersData];
const sellers = [...sellersData];
const transactions = [...transactionsData];
const auditLogs = [...auditLogsData];

// KPI snapshot
const kpiData = {
    activeListings: listings.filter(l => l.status === 'active').length,
    pendingApprovals: listings.filter(l => l.status === 'pending').length,
    sold30d: listings.filter(l => l.status === 'sold').length,
    revenue30d: 485000,
    newUsers: 34,
    openTickets: 12,
};

// Revenue chart data
const revenueChart = [
    { date: '2026-01', revenue: 120000, listings: 18 },
    { date: '2026-02', revenue: 185000, listings: 24 },
    { date: '2026-03', revenue: 180000, listings: 21 },
];

const topModels = [
    { model: 'BMW M3', count: 14 },
    { model: 'Royal Enfield 650', count: 11 },
    { model: 'Mercedes E-Class', count: 9 },
    { model: 'Porsche 911', count: 8 },
    { model: 'KTM 390', count: 7 },
];

export const handlers = [
    // ─── Auth ──────────────────────────────────────────────
    http.post('/api/admin/login', async ({ request }) => {
        await delay(500);
        const body = await request.json() as { email?: string; password?: string };
        if (body.email === 'admin@blackpiston.com' && body.password === 'admin123') {
            return HttpResponse.json({ token: 'mock-jwt-token', user: users[0], requires2FA: true });
        }
        return HttpResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }),

    http.post('/api/admin/verify-2fa', async ({ request }) => {
        await delay(400);
        const body = await request.json() as { code?: string };
        if (body.code === '123456') {
            return HttpResponse.json({ token: 'mock-jwt-token-verified', user: users[0] });
        }
        return HttpResponse.json({ error: 'Invalid 2FA code' }, { status: 401 });
    }),

    // ─── Dashboard / KPIs ─────────────────────────────────
    http.get('/api/admin/kpis', async () => {
        await delay(300);
        return HttpResponse.json(kpiData);
    }),

    http.get('/api/admin/charts/revenue', async () => {
        await delay(400);
        return HttpResponse.json(revenueChart);
    }),

    http.get('/api/admin/charts/top-models', async () => {
        await delay(300);
        return HttpResponse.json(topModels);
    }),

    // ─── Listings ──────────────────────────────────────────
    http.get('/api/admin/listings', async ({ request }) => {
        await delay(300);
        const url = new URL(request.url);
        const status = url.searchParams.get('status');
        const type = url.searchParams.get('type');
        const search = url.searchParams.get('search')?.toLowerCase();

        let filtered = [...listings];
        if (status && status !== 'all') filtered = filtered.filter(l => l.status === status);
        if (type && type !== 'all') filtered = filtered.filter(l => l.type === type);
        if (search) filtered = filtered.filter(l =>
            l.title.toLowerCase().includes(search) ||
            l.make.toLowerCase().includes(search) ||
            l.model.toLowerCase().includes(search)
        );

        return HttpResponse.json({ data: filtered, total: filtered.length });
    }),

    http.get('/api/admin/listings/:id', async ({ params }) => {
        await delay(200);
        const listing = listings.find(l => l.id === params.id);
        if (!listing) return HttpResponse.json({ error: 'Not found' }, { status: 404 });
        return HttpResponse.json(listing);
    }),

    http.patch('/api/admin/listings/:id', async ({ params, request }) => {
        await delay(400);
        const body = await request.json() as Record<string, unknown>;
        const idx = listings.findIndex(l => l.id === params.id);
        if (idx === -1) return HttpResponse.json({ error: 'Not found' }, { status: 404 });
        listings[idx] = { ...listings[idx], ...body, updatedAt: new Date().toISOString() };
        return HttpResponse.json(listings[idx]);
    }),

    http.post('/api/admin/listings/bulk-action', async ({ request }) => {
        await delay(500);
        const body = await request.json() as { ids?: string[]; action?: string; reason?: string };
        const { ids = [], action } = body;
        ids.forEach(id => {
            const idx = listings.findIndex(l => l.id === id);
            if (idx !== -1) {
                if (action === 'approve') listings[idx].status = 'active';
                if (action === 'reject') listings[idx].status = 'archived';
                if (action === 'archive') listings[idx].status = 'archived';
            }
        });
        return HttpResponse.json({ success: true, affected: ids.length });
    }),

    // ─── Users ─────────────────────────────────────────────
    http.get('/api/admin/users', async ({ request }) => {
        await delay(300);
        const url = new URL(request.url);
        const search = url.searchParams.get('search')?.toLowerCase();
        const role = url.searchParams.get('role');

        let filtered = [...users];
        if (search) filtered = filtered.filter(u =>
            u.name.toLowerCase().includes(search) || u.email.toLowerCase().includes(search)
        );
        if (role && role !== 'all') filtered = filtered.filter(u => u.role === role);

        return HttpResponse.json({ data: filtered, total: filtered.length });
    }),

    http.patch('/api/admin/users/:id', async ({ params, request }) => {
        await delay(400);
        const body = await request.json() as Record<string, unknown>;
        const idx = users.findIndex(u => u.id === params.id);
        if (idx === -1) return HttpResponse.json({ error: 'Not found' }, { status: 404 });
        users[idx] = { ...users[idx], ...body } as typeof users[0];
        return HttpResponse.json(users[idx]);
    }),

    // ─── Sellers ───────────────────────────────────────────
    http.get('/api/admin/sellers', async () => {
        await delay(300);
        return HttpResponse.json({ data: sellers, total: sellers.length });
    }),

    // ─── Transactions ──────────────────────────────────────
    http.get('/api/admin/transactions', async () => {
        await delay(300);
        return HttpResponse.json({ data: transactions, total: transactions.length });
    }),

    // ─── Audit Logs ────────────────────────────────────────
    http.get('/api/admin/audit-logs', async () => {
        await delay(200);
        return HttpResponse.json({ data: auditLogs, total: auditLogs.length });
    }),
];
