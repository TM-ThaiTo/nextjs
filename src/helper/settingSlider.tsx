import { CustomNextArrow, CustomPrevArrow } from "@/style/custom/cutom.slick";
import { Settings } from "react-slick";

export const settings = (sliderRef: any, currentIndex: number, totalItems: number): Settings => ({
    dots: true,
    infinite: false,  // Non-circular navigation
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    prevArrow: currentIndex > 0 ? (
        <CustomPrevArrow onClick={() => sliderRef.current?.slickPrev()} />
    ) : undefined, // Do not render if at the first item
    nextArrow: currentIndex < totalItems - 1 ? (
        <CustomNextArrow onClick={() => sliderRef.current?.slickNext()} />
    ) : undefined, // Do not render if at the last item
    appendDots: (dots: React.ReactNode) => (
        <div style={{ position: 'absolute', bottom: 10, width: '100%', textAlign: 'center' }}>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>{dots}</ul>
        </div>
    ),
    beforeChange: (oldIndex: number, newIndex: number) => {
        if (newIndex < 0 || newIndex >= totalItems) return false; // Prevent invalid indexes
    }
});
