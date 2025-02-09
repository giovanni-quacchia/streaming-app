#!/usr/bin/env python3

import sys
from scuapi import API

sc = API('StreamingCommunity.paris')

def getSeasonEpisodes(name, tv):
    [season, episode] = tv
    res = sc.search(name)
    id, slug = res["id"], res["slug"]
    
    # check if season available
    if season > res["seasons_count"]:
        raise Exception("Season unavailable")

    episodes = sc.load(f"{str(id)}-{slug}", season)
    link = sc.get_links(id, episodes[episode-1]["id"])[0]
    return link

    
def getMovieLink(name):
    res = sc.search(name)
    id, slug = res["id"], res["slug"]
    url = sc.get_links(id)[0]
    return (slug, url)

def getInput():
    
    if len(sys.argv) < 3:
        raise Exception("Must specify: media_type (movie or tv), content_name, [season, number]")
    
    content = sys.argv[1:3]
    
    if content[0] not in ("tv", "movie"):
        raise Exception("first arg must be movie or tv")
    
    if content[0] == "movie":
        return content, []
    
    if len(sys.argv) < 5:
        raise Exception("tv content requires season and episode number")
    
    tv = sys.argv[3:]

    if not tv[0].isdigit() or not tv[1].isdigit():
        raise Exception("season and episode must be integers")
    
    return content, [int(e) for e in tv]

def main():
    try:
        content, tv = getInput() # [media_type, content_name], [num_season, ep_season]
        
        if(not tv):
            (name, url) = getMovieLink(content[1])
            return url
        
        links = getSeasonEpisodes(content[1], tv)
        return links

    except Exception as e:
        print(f"Error: {e}")

    
    """
    iframe = get_episode_link(args.name, args.episode, args.season)
    if iframe:
        print(iframe)
    """

if __name__ == "__main__":
    print(main())