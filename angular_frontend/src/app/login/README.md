# Login Feature – Angular 20

## Components & Files:
- `login.component.ts` / `.html` / `.css`: Modern, minimal login UI (accent: #F6AD55, primary: #2D3748, secondary: #4FD1C5, light theme).
- `login.service.ts`: Handles login & token management via Angular HttpClient.
- `auth.interceptor.ts`: Global HTTP interceptor for attaching token and handling authentication errors.

## Usage & Routing

- Login page accessible at `/login`.
- All HTTP requests will attach token if present via interceptor.
- 401s are automatically handled (redirects to login).

## To adjust API endpoint for login:
See `login.service.ts` (`loginUrl`).

## Styling

Fully responsive, follows project grid/card cues and minimalistic theme.

## Angular Version

Tested for Angular v20+ (signals, standalone components, interceptors etc).
