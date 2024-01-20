import React from 'react';

import AudioTextLines from './audio_textlines.tsx';
import Home from './home.tsx';
import ErrorPage from './error/error.tsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    element: <Home />,
    path: "/",

    loader: async ({ request, params }) => {
      return null;
    },

    action: async ({ request }) => {
      return null;
    },
  },
  {
    path: ":resource",
    element: <AudioTextLines />,
    loader: async ({ request, params }) => {
      let { resource } = params;
      console.log(resource);
      console.log('calling fetch from loader');
      try {
        const data = await queryClient.fetchQuery([resource],
          async () => {
            const response = await fetch(`/data/${resource}.json`)
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json()
          });
        return data;
      }
      catch (error) {
        throw Error(`Error ${error}`);
      }
    },
    errorElement: <ErrorPage />,
  },
]);

function AppContainer() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default AppContainer;
