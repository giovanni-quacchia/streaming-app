import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
// Import Swiper styles
import "swiper/css/navigation";
import "swiper/css/pagination";
import PropTypes from "prop-types";
import MovieCard from "./MovieCard";

ListMovie.propType = {
  title: PropTypes.string,
  data: PropTypes.array,
  media_type: PropTypes.string
};

export default function ListMovie({ media_type, title, data = [] }) {
  return (
    <div className="my-4">
      <h2 className="text-light-grey">{title}</h2>
      <Swiper
        className="position-relative"
        modules={[Navigation, Pagination]}
        pagination={{
          dynamicBullets: true,
        }}
        navigation= {{
          "nextEl": '.swiper-button-next',
          "prevEl": '.swiper-button-prev',
          
        }}
        // style for pagination
        style={{
          "--swiper-pagination-color": "#00AAC0",
          "--swiper-pagination-bullet-inactive-color": "white",
          "--swiper-navigation-color":"white"
        }}
        slidesPerView={"auto"}
        onSlideChange={() => console.log("slide change")}
      >
        {data.map((movie, index) => (
          <SwiperSlide key={`${title}-${index}`} className={`list-movies p-2 mb-3`}>
            <MovieCard data={movie} media_type={movie.media_type || media_type}/>
          </SwiperSlide>
        ))}
        <div className="swiper-button-next d-sm-block d-none"></div>
        <div className="swiper-button-prev d-sm-block d-none"></div>
      </Swiper>
      
    </div>
  );
}
