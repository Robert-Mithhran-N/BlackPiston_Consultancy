# Bugfix Requirements Document

## Introduction

The BlackPiston Consultancy frontend application (Vite + React + TypeScript) has multiple routing and navigation issues causing broken pages, 404 errors, incorrect redirects, and non-functional navigation links. These issues affect user experience across static routes, dynamic routes, navigation components, admin sections, and button handlers. This document defines the bug conditions and expected behavior to systematically fix all routing and navigation problems.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN a user navigates to `/vehicle/:id` using a numeric ID THEN the route parameter is named `:id` but the bug description mentions `:slug`, creating potential confusion about the expected parameter format

1.2 WHEN the Header component includes a link to `/create-listing` THEN the route does not exist in App.tsx (only `/sell-to-us` exists), causing a 404 error

1.3 WHEN a user clicks navigation links in the Header that reference `/create-listing` THEN they encounter a broken page instead of the intended sell/listing creation flow

1.4 WHEN the admin login route is accessed via `/admin-login` THEN it uses a non-standard path that doesn't follow the `/admin/*` pattern used by other admin routes

1.5 WHEN a user is not authenticated and tries to access admin routes THEN the AdminShell component checks localStorage for authentication, which is not a secure or proper authentication mechanism

1.6 WHEN navigation occurs between pages THEN there may be inconsistent route parameter naming (id vs slug) causing confusion in the codebase

1.7 WHEN the Footer component renders links for "Buy Cars", "Buy Motorbikes", "Sell Vehicle", and "Valuation" THEN all links point to generic routes without proper filtering or functionality

1.8 WHEN the Footer renders "Company" and "Legal" section links THEN all links point to "/" (home) instead of their respective pages, providing no actual navigation

1.9 WHEN a user accesses the vehicle detail page with an invalid or non-existent vehicle ID THEN the page shows a "Vehicle Not Found" message but the route still resolves (no 404 redirect)

1.10 WHEN the AdminSidebar renders and the user clicks logout THEN it navigates to `/admin-login` which is inconsistent with a potential `/admin/login` pattern

### Expected Behavior (Correct)

2.1 WHEN a user navigates to vehicle detail pages THEN the route parameter SHALL be consistently named (either `:id` or `:slug`) throughout the application and documentation

2.2 WHEN the Header component includes a "Sell" navigation link THEN it SHALL point to an existing route (either `/sell-to-us` or a properly configured `/create-listing` route)

2.3 WHEN a user clicks the "Sell" link in the Header navigation THEN they SHALL be directed to a working page for selling or creating listings

2.4 WHEN admin routes are configured THEN the admin login route SHALL follow a consistent pattern (either `/admin/login` or keep `/admin-login` but document the decision)

2.5 WHEN a user attempts to access admin routes without authentication THEN the application SHALL use a proper authentication mechanism (not just localStorage checks) or clearly document this as a development-only approach

2.6 WHEN vehicle routes are referenced throughout the application THEN they SHALL consistently use the same parameter name in routes, links, and documentation

2.7 WHEN the Footer renders navigation links THEN they SHALL point to actual functional pages or be properly configured with query parameters for filtering

2.8 WHEN the Footer renders "Company" and "Legal" section links THEN they SHALL either point to real pages or be marked as placeholder links with appropriate styling

2.9 WHEN a user accesses the vehicle detail page with an invalid vehicle ID THEN the application SHALL either redirect to a 404 page or handle the error gracefully with proper routing

2.10 WHEN the AdminSidebar logout functionality is triggered THEN it SHALL navigate to a consistently named admin login route that matches the routing pattern

2.11 WHEN the Header "Sell to Us" button is clicked THEN it SHALL navigate to the correct `/sell-to-us` route without errors

2.12 WHEN admin navigation items are clicked THEN all admin routes SHALL render correctly within the AdminShell layout

### Unchanged Behavior (Regression Prevention)

3.1 WHEN a user navigates to the home page "/" THEN the system SHALL CONTINUE TO render the Index page with Header and Footer

3.2 WHEN a user navigates to "/search" THEN the system SHALL CONTINUE TO render the Search page with filtering functionality

3.3 WHEN a user navigates to "/sell-to-us" THEN the system SHALL CONTINUE TO render the SellToUs page

3.4 WHEN a user navigates to "/auth" THEN the system SHALL CONTINUE TO render the Auth page

3.5 WHEN a user navigates to "/dashboard" THEN the system SHALL CONTINUE TO render the Dashboard page

3.6 WHEN a user navigates to valid admin routes like "/admin", "/admin/listings", "/admin/users" THEN the system SHALL CONTINUE TO render the correct admin pages within the AdminShell

3.7 WHEN a user navigates to an undefined route THEN the system SHALL CONTINUE TO render the NotFound page

3.8 WHEN VehicleCard components render links to vehicle details THEN they SHALL CONTINUE TO use the format `/vehicle/${vehicle.id}`

3.9 WHEN the Search page uses query parameters for filtering (e.g., "?type=motorbike") THEN the system SHALL CONTINUE TO apply those filters correctly

3.10 WHEN the AdminShell component renders THEN it SHALL CONTINUE TO display the AdminSidebar and AdminTopbar with the Outlet for nested routes

3.11 WHEN authenticated users access admin routes THEN the system SHALL CONTINUE TO render the admin interface without redirecting to login

3.12 WHEN the mobile navigation menu is opened in the Header THEN it SHALL CONTINUE TO display all navigation links and close when a link is clicked
