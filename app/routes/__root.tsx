// app/routes/__root.tsx
import type {ReactNode} from 'react';
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router';
import {must} from 'shared/must';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Zero Records',
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

const serverURL = must(
  import.meta.env.VITE_PUBLIC_SERVER,
  'VITE_PUBLIC_SERVER is required',
);

function RootDocument({children}: Readonly<{children: ReactNode}>) {
  return (
    <html>
      <head>
        <link rel="preconnect" href={serverURL} />
        <style
          dangerouslySetInnerHTML={{
            __html: `
          html {
            font-family: sans-serif;
            font-optical-sizing: auto;
            font-weight: 400;
            font-style: normal;
          }
        `,
          }}
        />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
