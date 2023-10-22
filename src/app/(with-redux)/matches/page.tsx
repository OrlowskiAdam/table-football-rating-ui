"use client";
import {useEffect, useState} from "react";
import {MatchesTable} from "@/components/matches-table";
import {getMatches} from "@/api/match-api";
import toast from "react-hot-toast";

const MatchesPage = () => {
    const [matches, setMatches] = useState<Match[]>([]);

    useEffect(() => {
        getMatches()
            .then((response) => {
                setMatches(response.data);
            })
            .catch((error) => {
                toast.error(error.message);
            });
    }, []);

    return (
        <>
            <h1>Historia meczy</h1>
            <MatchesTable matches={matches}/>
        </>
    )
}

export default MatchesPage;