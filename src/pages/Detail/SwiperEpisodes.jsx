import { Swiper, SwiperSlide } from "swiper/react";
import EpisodeCard from "./EpisodeCard";
import PropTypes from "prop-types";

SwiperEpisodes.propTypes = {
  episodes: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string,
  streamingSlug: PropTypes.string
}

export default function SwiperEpisodes({ episodes, name, streamingSlug }) {
  return (
    <Swiper slidesPerView="5" spaceBetween={20}>
      {episodes && episodes.map((episode, index) => (
        <SwiperSlide key={index}>
          <EpisodeCard streamingSlug={streamingSlug} name={name} episode={episode}/>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
