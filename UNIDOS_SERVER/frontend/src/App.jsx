
import React from "react";
import SimpleMap from "./SimpleMap";
import './App.css'
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 3, // Data is considered fresh for 5 seconds (no background re-fetch)
      gcTime: 1000 * 60 // Keep unused cache in memory/storage for 1 minute.. lowkey look this up since every 5 min the data is invalid
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

function App() {
  return (
    <div>
      <div className="Explanation">
        <h4 className="test"></h4>
      </div>
      <PersistQueryClientProvider client={queryClient} persistOptions={{persister}}>
        <SimpleMap/>
      </PersistQueryClientProvider>
      
    </div>
  );
}

export default App;