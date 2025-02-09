import sys
from scuapi import API

sc = API('StreamingCommunity.paris')

class streamingAPI:
        
    @staticmethod
    def getSeasonIds(slug, season_number=None):
        data = sc.load(slug, season_number)
        return data

    @staticmethod
    def getContent(name):
        res = sc.search(name)
        return res["id"], res["slug"]

    @staticmethod
    def getMovieLink(slug):
        url = sc.get_links(slug)[1]
        return url
    @staticmethod
    def getEpisodeLink(slug, episode_id):
        url = sc.get_links(slug, episode_id)[1]
        return url