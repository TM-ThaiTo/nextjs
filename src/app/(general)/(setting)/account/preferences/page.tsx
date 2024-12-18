import LanguagePreferences from "./Preferences";
export async function generateMetadata() {
    return {
        title: 'Preferences | Alex Trinh Social',
        description: 'Preferences | Alex Trinh Social',
        openGraph: { title: 'Preferences | Alex Trinh Social', description: 'Preferences | Alex Trinh Social', url: `/account/preferences`, type: 'article' }
    };
}
export default function PreferencesPage() {
    return (
        <LanguagePreferences />
    )
}