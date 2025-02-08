import { useQuery } from "@tanstack/react-query"
import ListMovie from "../../components/ListMovie/ListMovie"
import tmdbAPI from "../../services/tmdbAPI"
import PropTypes from "prop-types"
import { useParams } from "react-router-dom"

Recommends.propTypes = {
    media_type: PropTypes.string.isRequired
}

export default function Recommends({media_type}){

    const { id } = useParams();

    const recommendationsQuery = useQuery({
        queryKey: [`recommendations-${media_type}`, id],
        queryFn: () => tmdbAPI.getRecommendations(media_type, id)
    });

    return(
        <div className="text-white">
          <h3 className="mb-4">Recommends</h3>
          <ListMovie data={recommendationsQuery.data?.data.results}/>
        </div>
    )
}