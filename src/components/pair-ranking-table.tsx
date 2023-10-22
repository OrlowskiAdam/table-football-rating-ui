import React, {useEffect} from "react";
import {
    Box, Card,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    ToggleButton,
    ToggleButtonGroup
} from "@mui/material";

type PairsTable = {
    pairs: Pair[]
}

const ratingOrder = ['GOLDA_RATING', 'ELO_RATING']

export const PairRankingTable: React.FC<PairsTable> = (props) => {
    const {pairs} = props;

    if (!pairs) {
        return (
            <Box sx={{display: "flex", justifyContent: "center"}}>
                <h2>Brak par do wyświetlenia</h2>
            </Box>
        )
    }

    return (
        <>
            <Table stickyHeader>
                <TableHead>
                    <TableCell>Para</TableCell>
                    {ratingOrder.map(ratingOrder => {
                        return <TableCell key={ratingOrder}>{ratingOrder.slice(0, -7)}</TableCell>
                    })}
                    <TableCell>Wygrane</TableCell>
                    <TableCell>Porażki</TableCell>
                </TableHead>
                <TableBody>
                    {pairs.map((pair) => (
                        <TableRow key={pair.id}>
                            <TableCell>
                                {pair.users.map(user => (
                                    <Box key={user.id} sx={{fontWeight: "bold", my: 1}}>
                                        {user.name} &quot;{user.nickname}&quot;
                                    </Box>
                                ))}
                            </TableCell>
                            {ratingOrder.map(ratingType => {
                                const rating = pair.ratings.find(rating => rating.ratingType === ratingType);
                                return <TableCell key={ratingType}>{rating?.value.toFixed(2)}</TableCell>
                            })}
                            <TableCell>0</TableCell>
                            <TableCell>0</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}