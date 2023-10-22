import React from "react";
import {Box, Chip, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import {ExpandLess, ExpandMore, Remove} from '@mui/icons-material';

type MatchesTable = {
    matches: Match[]
}

export const MatchesTable: React.FC<MatchesTable> = ({matches}) => {

    if (!matches) {
        return (
            <Box sx={{display: "flex", justifyContent: "center"}}>
                <h2>Brak meczy do wyświetlenia</h2>
            </Box>
        )
    }

    const getRatingDifference = (match: Match, pair: Pair, ratingType: string) => {
        const pairRatingDifference = match.matchRatingDifference.filter((rating): rating is PairRatingDifference => "pair" in rating);
        const matchRatingDifference = pairRatingDifference.find(rating => {
            return rating.pair.id === pair.id && rating.ratingType === ratingType;
        });
        const newRating = matchRatingDifference?.newRating || 0;
        const oldRating = matchRatingDifference?.oldRating || 0;
        const ratingDifferenceValue = Math.abs(newRating - oldRating).toFixed(2);
        let icon : React.JSX.Element;
        if (newRating > oldRating) {
            icon = <ExpandLess sx={{color: "green"}}/>
        } else if (newRating < oldRating) {
            icon = <ExpandMore sx={{color: "red"}}/>
        } else {
            icon = <Remove sx={{ color: "grey" }}/>
        }
        return (
            <Box sx={{display: "flex", alignItems: "flex-end", justifyContent: "center", my: 1}}>
                <Chip sx={{mx: 1}} label={ratingType.slice(0, -7)} size="small" /> {ratingDifferenceValue} {icon}
            </Box>
        )
    }

    return (
        <>
            <Table stickyHeader>
                <TableHead>
                    <TableCell align={"left"}>Data dodatnia</TableCell>
                    <TableCell>Para A</TableCell>
                    <TableCell align={"center"}>Rating</TableCell>
                    <TableCell></TableCell>
                    <TableCell align={"center"}></TableCell>
                    <TableCell></TableCell>
                    <TableCell align={"center"}>Rating</TableCell>
                    <TableCell align={"right"}>Para B</TableCell>
                </TableHead>
                <TableBody>
                    {matches.map(match => {
                        return (
                            <TableRow key={match.id}>
                                <TableCell align={"left"}>{new Date(match.createdAt).toLocaleString()}</TableCell>
                                <TableCell align={"left"}>
                                    <Box sx={{ display: "flex", wrap: "nowrap", alignItems: "center"}}>
                                        <Box>
                                            {match.pairA.users.map(user => (
                                                <Box key={user.id} sx={{fontWeight: "bold", my: 1}}>
                                                    {user.name} &quot;{user.nickname}&quot;
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell align={"center"}>
                                    <Box sx={{ mx: 2}}>
                                        {getRatingDifference(match, match.pairA, "GOLDA_RATING")}
                                        {getRatingDifference(match, match.pairA, "ELO_RATING")}
                                    </Box>
                                </TableCell>
                                <TableCell align={"left"}>{match.scoreA}</TableCell>
                                <TableCell align={"center"}>:</TableCell>
                                <TableCell align={"right"}>{match.scoreB}</TableCell>
                                <TableCell align={"center"}>
                                    <Box sx={{ mx: 2}}>
                                        {getRatingDifference(match, match.pairB, "GOLDA_RATING")}
                                        {getRatingDifference(match, match.pairB, "ELO_RATING")}
                                    </Box>
                                </TableCell>
                                <TableCell align={"right"}>
                                    {match.pairB.users.map(user => (
                                        <Box key={user.id} sx={{fontWeight: "bold", my: 1}}>
                                            {user.name} &quot;{user.nickname}&quot;
                                        </Box>
                                    ))}
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </>
    )
}