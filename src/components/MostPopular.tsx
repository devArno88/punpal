"use client";

import { splitJoke } from "@/utils/str";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";

interface Joke {
    jokeId: string;
    jokeText: string;
    voteCount: number;
    lastVotedAt: string;
}

export default function MostPopular({ mostVotedJokes }: { mostVotedJokes: Joke[] }) {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (mostVotedJokes) setLoading(false);
    }, [mostVotedJokes]);
    if (loading) return null;
    return mostVotedJokes.length ? (
        <div className="w-full">
            <h2 className="text-2xl font-bold text-center mb-6 vote-count">
                Most <span className="green1-text">Popular</span> Puns
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {mostVotedJokes.map((joke) => {
                    const jokeParts = splitJoke(joke.jokeText);
                    const isOneLiner = jokeParts.length === 1;
                    const jokeElement = isOneLiner ? (
                        <h6 className="text-lg text-center dark:text-white">{jokeParts[0]}</h6>
                    ) : (
                        <>
                            <p className="text-lg text-center dark:text-white">{jokeParts[0]}</p>
                            <p className="text-lg text-center punchline green2-text">{jokeParts[1]}</p>
                        </>
                    );
                    const mostRecent = formatDistanceToNow(joke.lastVotedAt).replace("about", "");
                    return (
                        <div
                            key={joke.jokeId}
                            className="flex flex-col justify-between h-full bg-gray-200 dark:bg-gray-800 py-8 px-4 rounded-lg card-most-voted gap-2"
                        >
                            {jokeElement}
                            <div className="pt-2">
                                <p className="text-md text-center vote-count">Votes: {joke.voteCount}</p>
                                <p className="text-md text-center vote-count mt-1">Latest: {mostRecent} ago</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    ) : null;
}