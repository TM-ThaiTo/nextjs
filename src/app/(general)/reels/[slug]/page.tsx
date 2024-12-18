import { notFound, redirect } from "next/navigation";
// import ReelPlayer from '../components/ReelPlayer';

// const reels = [
//     { slug: 1, url: 'https://res.cloudinary.com/duvnxrvqr/video/upload/v1733123816/videos/674546ec3de39b217500ed1c/file_ksciql.mp4' },
//     { slug: 2, url: 'https://res.cloudinary.com/duvnxrvqr/video/upload/v1733123816/videos/674546ec3de39b217500ed1c/file_ksciql.mp4' },
//     { slug: 3, url: 'https://res.cloudinary.com/duvnxrvqr/video/upload/v1733123816/videos/674546ec3de39b217500ed1c/file_ksciql.mp4' },
// ];

// interface PageProps {
//     params: {
//         slug: string;
//     };
// }

const ReelPage = () => {
    return redirect('/reels/')
};

export default ReelPage;
