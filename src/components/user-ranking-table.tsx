import React from "react";
import {Box, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";

type UsersTable = {
    users: User[]
}

const ratingOrder = ['GOLDA_RATING', 'ELO_RATING']

export const UserRankingTable: React.FC<UsersTable> = (props) => {
    const {users} = props;

    if (!users) {
        return (
            <Box sx={{display: "flex", justifyContent: "center"}}>
                <h2>Brak użytkowników do wyświetlenia</h2>
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
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>
                                {user.name} &quot;{user.nickname}&quot;
                            </TableCell>
                            {ratingOrder.map(ratingType => {
                                const rating = user.ratings.find(rating => rating.ratingType === ratingType);
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