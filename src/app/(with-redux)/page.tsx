"use client";
import React, {useCallback, useEffect, useState} from "react";
import {getPairs} from "@/api/pair-api";
import {PairRankingTable} from "@/components/pair-ranking-table";
import {Box, Button, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {AddMatchDialog} from "@/components/add-match";

type PageParams = {
    searchParams: {
        sortBy?: string;
    }
}

const Page: React.FC<PageParams> = ({searchParams}) => {
    const [pairs, setPairs] = useState<Pair[]>([]);
    const [isDialogOpen ,setIsDialogOpen] = useState<boolean>(false);
    const sortOption = searchParams["sortBy"] || "GOLDA_RATING";
    const router = useRouter();


    const sortRanking = useCallback((pairs: Pair[]): Pair[] => {
        return pairs.sort((a: Pair, b: Pair) => {
            const ratingA = a.ratings.find(rating => rating.ratingType === sortOption);
            const ratingB = b.ratings.find(rating => rating.ratingType === sortOption);
            if (ratingA && ratingB) {
                return ratingB.value - ratingA.value;
            }
            return 0;
        });
    }, [sortOption]);

    useEffect(() => {
        getPairs()
            .then((response) => {
                const sortedPairs = sortRanking(response.data);
                setPairs(sortedPairs);
            })
            .catch((error) => {
                toast.error(error.message);
            });


    }, [sortRanking]);

    const handleSortChange = (_event: React.MouseEvent<HTMLElement>, value: string) => {
        if (value === null) {
            return;
        }
        router.push(`?sortBy=${value}`);
    }

    return (
        <>
            <h1>Ranking par</h1>
            <ToggleButtonGroup
                color="primary"
                value={sortOption}
                exclusive
                onChange={handleSortChange}
                aria-label="Platform"
                sx={{display: "flex", alignItems: "center"}}
            >
                <Typography variant={"h6"} sx={{mr: 2}} color={"primary"}>Sortuj według:</Typography>
                <ToggleButton value={"GOLDA_RATING"}>Golda</ToggleButton>
                <ToggleButton value={"ELO_RATING"}>Elo</ToggleButton>
            </ToggleButtonGroup>
            <PairRankingTable pairs={pairs}/>
        </>
    )
}

export default Page;