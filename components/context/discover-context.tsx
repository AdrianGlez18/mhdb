"use client";

import { getBookList, getTMDBTrailer, getTMDBTrendingList } from '@/lib/server/discover';
import { createContext, useContext, useEffect, useState } from 'react';

type DiscoverContextType = {
    content: any;
    loading: boolean;
};

const DiscoverContext = createContext<DiscoverContextType | undefined>(undefined);

export const DiscoverProvider = ({ children }: { children: React.ReactNode }) => {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response     = await getTMDBTrendingList('movie', 1);
                const responseTv   = await getTMDBTrendingList('tv', 1);
                const responseBook = await getBookList(); 

                const firstMovie   = response.results[0];
                const firstTv      = responseTv.results[0];

                const featured     = await getTMDBTrailer(firstMovie);
                const featuredTv   = await getTMDBTrailer(firstTv);

                const trailer = {
                    "id": firstMovie.id,
                    "title": firstMovie.title,
                    "key": featured?.key,
                    "description": firstMovie.overview,
                    "backdrop_path": firstMovie.backdrop_path
                }

                const trailerTv = {
                    "id": firstTv.id,
                    "title": firstTv.name,
                    "key": featuredTv?.key,
                    "description": firstTv.overview,
                    "backdrop_path": firstTv.backdrop_path
                }

                const discoverData: any = {
                    "movies": response.results,
                    "series": responseTv.results,
                    "books":  responseBook.items,
                    "trailer": trailer,
                    "trailerTv": trailerTv
                } 
                
                setContent(discoverData);
            } catch (error) {
                console.error('Error fetching content:', error);
            } finally {
                setLoading(false);
            }
        };

        if (content === null) {
            console.log('Fetching content...');
            fetchContent();
        }
    }, []); 

      

    return (
        <DiscoverContext.Provider value={{ content, loading }}>
            {children}
        </DiscoverContext.Provider>
    );
};

export const useContent = () => {
    const context = useContext(DiscoverContext);
    if (!context) {
      throw new Error('useContent hook must be used within a ContentProvider');
    }
    return context;
  };
  