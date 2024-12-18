import MainPageMessage from "@/components/message/main/main.message";

export async function generateMetadata() {
    return {
        title: 'Inbox - Alex Trinh Social',
        description: 'Inbox - Alex Trinh Social bio',
        openGraph: {
            title: 'Inbox - Alex Trinh Social',
            description: 'Inbox - Alex Trinh Social bio',
            url: '/message',
            type: 'article',
        }
    }
}

export default async function PageMessage() {
    return <MainPageMessage />
}