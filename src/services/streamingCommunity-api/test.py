#!/usr/bin/env python3

import argparse
import json
from scuapi import API

def get_episode_link(name, episode, season):
    sc = API('StreamingCommunity.paris')
    
    # Search for the show
    data = sc.search(name)

    if name not in data:
        print(f"Error: Show '{name}' not found.")
        return None

    url = data[name]["url"].split("/")[-1]
    id = str(data[name]["id"])
    
    # Load show details
    info = sc.load(url)

    # Extract episode URLs
    episodes = [ep["url"].split("?e=")[-1] for ep in info["episodeList"]]

    try:
        episode_index = (int(season) - 1) * len(episodes) + int(episode) - 1
        iframe = sc.get_links(id, episodes[episode_index])[0]
        return iframe
    except IndexError:
        print(f"Error: Episode {episode} of Season {season} not found.")
        return None

def main():
    parser = argparse.ArgumentParser(description="Fetch streaming link for a TV show episode.")
    parser.add_argument("name", type=str, help="TV show name")
    parser.add_argument("episode", type=int, help="Episode number")
    parser.add_argument("season", type=int, help="Season number")

    args = parser.parse_args()
    
    iframe = get_episode_link(args.name, args.episode, args.season)
    if iframe:
        print(iframe)

if __name__ == "__main__":
    main()