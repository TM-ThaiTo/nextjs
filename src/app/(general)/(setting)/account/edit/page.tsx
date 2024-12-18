
import React from 'react';
import EditProfile from './EditProfile';
import { action_dataMyUser } from '@/actions/user/actions';
import { redirect } from 'next/navigation';
export async function generateMetadata() {
    return {
        title: 'Edit Profile | Alex Trinh Social',
        description: 'Edit Profile | Alex Trinh Social',
        openGraph: { title: 'Edit Profile | Alex Trinh Social', description: 'Edit Profile | Alex Trinh Social', url: `/account/edit`, type: 'article' }
    };
}
export default async function SettingsPage() {
    const { data, error } = await action_dataMyUser();
    if (error || !data) redirect('/auth/login');

    return (
        <EditProfile user={data?.data} />
    );
}
