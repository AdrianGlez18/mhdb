"use client";

import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

type ProfileContextType = {
    profile: any;
    loading: boolean;
    refreshed: boolean;
    setRefreshed: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [refreshed, setRefreshed] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`/api/profile`);
                if (!response.ok) {
                    throw new Error('Failed to fetch profile');
                }
                const data = await response.json();
                setProfile(data);
                if (data.profile == undefined) router.push('/profile/edit');
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };

        if (profile === null || refreshed) {
            console.log('Fetching profile...');
            fetchProfile();
            setRefreshed(false);
        }
    }, [refreshed]);


    return (
        <ProfileContext.Provider value={{ profile, loading, refreshed, setRefreshed }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error('useProfile must be used within a ProfileProvider');
    }
    return context;
};
