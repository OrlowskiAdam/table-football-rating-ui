"use client";
import React, {useCallback, useEffect, useState} from "react";
import {ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {UserRankingTable} from "@/components/user-ranking-table";
import {getUsers} from "@/api/user-api";

type PageParams = {
    searchParams: {
        sortBy?: string;
    }
}

const Page: React.FC<PageParams> = ({searchParams}) => {
    const [users, setUsers] = useState<User[]>([]);
    const sortOption = searchParams["sortBy"] || "GOLDA_RATING";
    const router = useRouter();


    const sortRanking = useCallback((users: User[]): User[] => {
        return users.sort((a: User, b: User) => {
            const ratingA = a.ratings.find(rating => rating.ratingType === sortOption);
            const ratingB = b.ratings.find(rating => rating.ratingType === sortOption);
            if (ratingA && ratingB) {
                return ratingB.value - ratingA.value;
            }
            return 0;
        });
    }, [sortOption]);

    useEffect(() => {
        getUsers()
            .then((response) => {
                setUsers(sortRanking(response.data));
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
            <h1>Ranking graczy</h1>
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
            <UserRankingTable users={users}/>
        </>
    )
}

export default Page;