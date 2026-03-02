import { http, HttpResponse, delay } from 'msw';
import listingsData from './data/listings.json';
import usersData from './data/users.json';
import sellersData from './data/sellers.json';
import transactionsData from './data/transactions.json';
import auditLogsData from './data/auditLogs.json';
import sellRequestsData from './data/sellRequests.json';
import inventoryData from './data/inventory.json';

// ─── In-memory mutable state (reset on refresh) ──────────────
const listings = [...listingsData];
const users = [...usersData];
const sellers = [...sellersData];
const transactions = [...transactionsData];
const auditLogs = [...auditLogsData];
const sellRequests = [...sellRequestsData] as Record<string, unknown>[];
const inventory = [...inventoryData] as Record<string, unknown>[];

// ─── KPI snapshot ─────────────────────────────────────────────
const getKpis = () => ({
    pendingRequests: sellRequests.filter(r => r.status === 'pending').length,
    acquisitionsThisMonth: sellRequests.filter(r => r.status === 'approved').length,
    inventoryActive: inventory.filter(i => i.published === true).length,
    vehiclesSold: inventory.filter(i => i.status === 'sold').length,
    // Legacy KPIs kept for backwards compatibility
    activeListings: inventory.filter(i => i.published === true).length,
    pendingApprovals: sellRequests.filter(r => r.status === 'pending').length,
    sold30d: inventory.filter(i => i.status === 'sold').length,
    revenue30d: 485000,
    newUsers: 34,
    openTickets: sellRequests.filter(r => r.status === 'pending').length,
});

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
    // ═══════════════════════════════════════════════════════════
    // PUBLIC ENDPOINTS
    // ═══════════════════════════════════════════════════════════

    // ─── Public Inventory (only published admin items) ────────
    http.get('/api/inventory', async ({ request }) => {
        await delay(300);
        const url = new URL(request.url);
        const type = url.searchParams.get('type');
        const search = url.searchParams.get('search')?.toLowerCase();
        const make = url.searchParams.get('make');

        let items = inventory.filter(i => i.published === true);
        if (type && type !== 'all') items = items.filter(i => i.type === type);
        if (make) items = items.filter(i => (i.make as string).toLowerCase() === make.toLowerCase());
        if (search) items = items.filter(i =>
            (i.title as string).toLowerCase().includes(search) ||
            (i.make as string).toLowerCase().includes(search) ||
            (i.model as string).toLowerCase().includes(search)
        );

        return HttpResponse.json({ data: items, total: items.length });
    }),

    http.get('/api/inventory/:id', async ({ params }) => {
        await delay(200);
        const item = inventory.find(i => i.id === params.id || i.slug === params.id);
        if (!item || item.published !== true) {
            return HttpResponse.json({ error: 'Not found' }, { status: 404 });
        }
        return HttpResponse.json(item);
    }),

    // ─── Sell Requests (user submission) ──────────────────────
    http.post('/api/sell-requests', async ({ request }) => {
        await delay(600);
        const body = await request.json() as Record<string, unknown>;
        const newRequest = {
            id: `sr_${String(sellRequests.length + 1).padStart(3, '0')}`,
            ...body,
            status: 'pending',
            createdAt: new Date().toISOString(),
        };
        sellRequests.push(newRequest);
        return HttpResponse.json({
            requestId: newRequest.id,
            status: 'pending',
            message: 'Your sell request has been submitted. BlackPiston will contact you shortly.',
        }, { status: 201 });
    }),

    // ─── Messages (mock contact) ─────────────────────────────
    http.post('/api/messages', async ({ request }) => {
        await delay(400);
        const body = await request.json() as Record<string, unknown>;
        return HttpResponse.json({
            id: `msg_${Date.now()}`,
            ...body,
            sentAt: new Date().toISOString(),
            status: 'sent',
        }, { status: 201 });
    }),

    // ═══════════════════════════════════════════════════════════
    // ADMIN ENDPOINTS
    // ═══════════════════════════════════════════════════════════

    // ─── Auth ─────────────────────────────────────────────────
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

    // ─── Dashboard / KPIs ─────────────────────────────────────
    http.get('/api/admin/kpis', async () => {
        await delay(300);
        return HttpResponse.json(getKpis());
    }),

    http.get('/api/admin/charts/revenue', async () => {
        await delay(400);
        return HttpResponse.json(revenueChart);
    }),

    http.get('/api/admin/charts/top-models', async () => {
        await delay(300);
        return HttpResponse.json(topModels);
    }),

    // ─── Admin: Sell Requests Management ──────────────────────
    http.get('/api/admin/sell-requests', async ({ request }) => {
        await delay(300);
        const url = new URL(request.url);
        const status = url.searchParams.get('status');
        const search = url.searchParams.get('search')?.toLowerCase();

        let filtered = [...sellRequests];
        if (status && status !== 'all') filtered = filtered.filter(r => r.status === status);
        if (search) filtered = filtered.filter(r =>
            (r.name as string)?.toLowerCase().includes(search) ||
            (r.email as string)?.toLowerCase().includes(search) ||
            ((r.vehicle as Record<string, unknown>)?.make as string)?.toLowerCase().includes(search)
        );

        return HttpResponse.json({ data: filtered, total: filtered.length });
    }),

    http.get('/api/admin/sell-requests/:id', async ({ params }) => {
        await delay(200);
        const req = sellRequests.find(r => r.id === params.id);
        if (!req) return HttpResponse.json({ error: 'Not found' }, { status: 404 });
        return HttpResponse.json(req);
    }),

    http.patch('/api/admin/sell-requests/:id', async ({ params, request }) => {
        await delay(400);
        const body = await request.json() as Record<string, unknown>;
        const idx = sellRequests.findIndex(r => r.id === params.id);
        if (idx === -1) return HttpResponse.json({ error: 'Not found' }, { status: 404 });

        sellRequests[idx] = { ...sellRequests[idx], ...body, updatedAt: new Date().toISOString() };

        // If approved, auto-create a draft inventory item
        if (body.status === 'approved') {
            const req = sellRequests[idx];
            const vehicle = req.vehicle as Record<string, unknown>;
            const draftId = `inv_${String(inventory.length + 1).padStart(3, '0')}`;
            const draft = {
                id: draftId,
                slug: `${(vehicle.make as string)?.toLowerCase()}-${(vehicle.model as string)?.toLowerCase()}-${vehicle.year}-${draftId}`.replace(/\s+/g, '-'),
                source: 'admin',
                sellRequestId: req.id,
                make: vehicle.make,
                model: vehicle.model,
                title: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
                year: vehicle.year,
                price: req.askingPrice,
                mileage: vehicle.mileage,
                fuel: vehicle.fuel,
                transmission: vehicle.transmission,
                color: vehicle.color,
                location: 'To be assigned',
                images: req.photos || [],
                description: `Acquired from owner. ${(req.notes as string) || ''}`,
                specs: { engine: '', horsepower: 0, topSpeed: '', acceleration: '', drivetrain: '', seats: 0 },
                features: [],
                type: vehicle.type,
                badges: ['BlackPiston Certified'],
                published: false,
                status: 'draft',
                acquisitionPrice: (body.acquisitionPrice as number) || req.askingPrice,
                createdAt: new Date().toISOString(),
                publishedAt: null,
            };
            inventory.push(draft);
        }

        return HttpResponse.json(sellRequests[idx]);
    }),

    // ─── Admin: Inventory Management ──────────────────────────
    http.get('/api/admin/inventory', async ({ request }) => {
        await delay(300);
        const url = new URL(request.url);
        const published = url.searchParams.get('published');
        const search = url.searchParams.get('search')?.toLowerCase();

        let filtered = [...inventory];
        if (published === 'true') filtered = filtered.filter(i => i.published === true);
        if (published === 'false') filtered = filtered.filter(i => i.published === false);
        if (search) filtered = filtered.filter(i =>
            (i.title as string)?.toLowerCase().includes(search) ||
            (i.make as string)?.toLowerCase().includes(search)
        );

        return HttpResponse.json({ data: filtered, total: filtered.length });
    }),

    http.post('/api/admin/inventory', async ({ request }) => {
        await delay(500);
        const body = await request.json() as Record<string, unknown>;
        const newId = `inv_${String(inventory.length + 1).padStart(3, '0')}`;
        const newItem = {
            ...body,
            id: newId,
            slug: `${(body.make as string)?.toLowerCase()}-${(body.model as string)?.toLowerCase()}-${body.year}-${newId}`.replace(/\s+/g, '-'),
            source: 'admin',
            badges: (body.badges as string[]) || ['BlackPiston Certified'],
            published: body.published ?? false,
            status: body.published ? 'available' : 'draft',
            createdAt: new Date().toISOString(),
            publishedAt: body.published ? new Date().toISOString() : null,
        };
        inventory.push(newItem as Record<string, unknown>);
        return HttpResponse.json(newItem, { status: 201 });
    }),

    http.patch('/api/admin/inventory/:id', async ({ params, request }) => {
        await delay(400);
        const body = await request.json() as Record<string, unknown>;
        const idx = inventory.findIndex(i => i.id === params.id);
        if (idx === -1) return HttpResponse.json({ error: 'Not found' }, { status: 404 });

        // Handle publish action
        if (body.published === true && inventory[idx].published !== true) {
            body.publishedAt = new Date().toISOString();
            body.status = 'available';
        }

        inventory[idx] = { ...inventory[idx], ...body, updatedAt: new Date().toISOString() };
        return HttpResponse.json(inventory[idx]);
    }),

    // ─── Legacy Admin: Listings ───────────────────────────────
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

    // ─── Users ────────────────────────────────────────────────
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

    // ─── Sellers ──────────────────────────────────────────────
    http.get('/api/admin/sellers', async () => {
        await delay(300);
        return HttpResponse.json({ data: sellers, total: sellers.length });
    }),

    // ─── Transactions ─────────────────────────────────────────
    http.get('/api/admin/transactions', async () => {
        await delay(300);
        return HttpResponse.json({ data: transactions, total: transactions.length });
    }),

    // ─── Audit Logs ───────────────────────────────────────────
    http.get('/api/admin/audit-logs', async () => {
        await delay(200);
        return HttpResponse.json({ data: auditLogs, total: auditLogs.length });
    }),
];
