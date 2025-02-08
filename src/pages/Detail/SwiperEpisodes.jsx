import { Swiper, SwiperSlide } from "swiper/react";
import EpisodeCard from "./EpisodeCard";

export default function SwiperEpisodes({ episodes }) {
  return (
    <Swiper slidesPerView="5" spaceBetween={20}>
      {episodes && episodes.map((episode, index) => (
        <SwiperSlide key={index}>
          <EpisodeCard episode={episode}/>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
