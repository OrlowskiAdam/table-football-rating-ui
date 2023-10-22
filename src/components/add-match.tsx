import {
    Autocomplete,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Divider,
    Tab,
    Tabs,
    TextField
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {getUsers} from "@/api/user-api";
import toast from "react-hot-toast";
import {createMatch} from "@/api/match-api";

type AddMatchDialogProps = {
    open: boolean;
    onClose: () => void;
}

type MatchFormType = {
    pairA: any[];
    pairB: any[];
    scoreA: number;
    scoreB: number;
    unitScores: UnitScore[];
}

type UnitScore = {
    scoreA: number;
    scoreB: number;
};

const initialMatchForm: MatchFormType = {
    pairA: [],
    pairB: [],
    scoreA: 0,
    scoreB: 0,
    unitScores: [
        {
            scoreA: 0,
            scoreB: 0
        },
        {
            scoreA: 0,
            scoreB: 0
        },
        {
            scoreA: 0,
            scoreB: 0
        },
        {
            scoreA: 0,
            scoreB: 0
        },
        {
            scoreA: 0,
            scoreB: 0
        }
    ],
};

export const AddMatchDialog: React.FC<AddMatchDialogProps> = (props) => {
    const [matchForm, setMatchForm] = useState<MatchFormType>(initialMatchForm);
    const {open, onClose} = props
    const [users, setUsers] = useState<User[]>();

    useEffect(() => {
        getUsers()
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                toast.error(error?.message);
            });
    }, []);

    const handleAddMatchButton = () => {
        matchForm.pairA = matchForm.pairA.map((user) => user.id);
        matchForm.pairB = matchForm.pairB.map((user) => user.id);
        createMatch(matchForm)
            .then((response) => console.log(response.data))
            .catch((error) => console.log(error.message))
        return null;
    }

    const handlePairScoreChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setMatchForm({
            ...matchForm,
            [event.target.name]: event.target.value,
        });
    }

    const handleUnitScoreChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, value: number): void => {
        let unitScore = matchForm.unitScores[value];
        // @ts-ignore
        unitScore[event.target.name] = event.target.value;
        setMatchForm({
            ...matchForm,
            unitScores: [
                ...matchForm.unitScores.slice(0, value),
                unitScore,
                ...matchForm.unitScores.slice(value + 1)
            ]
        });
    };

    return (
        <Dialog fullWidth maxWidth="sm" open={open} onClose={() => onClose()}>
            <DialogTitle>Dodawanie wyniku meczu</DialogTitle>
            <DialogContent dividers>
                <Box sx={{display: "flex", flexDirection: "column"}}>
                    <>
                        <Box sx={{display: "flex", wrap: "nowrap", flexDirection: "column"}}>
                            <Autocomplete
                                sx={{my: 1}}
                                multiple
                                disablePortal
                                value={matchForm?.pairA}
                                // @ts-ignore
                                options={users}
                                getOptionLabel={(option) => {
                                    // @ts-ignore
                                    return option.name;
                                }}
                                selectOnFocus
                                clearOnBlur
                                freeSolo
                                filterOptions={(options, params) => {
                                    return options.filter((option) => {
                                        return option.name.toLowerCase().includes(params.inputValue.toLowerCase()) ||
                                            option.nickname.toLowerCase().includes(params.inputValue.toLowerCase());
                                    })
                                }}
                                renderInput={(params) => <TextField {...params} label="Para A"/>}
                                onChange={(event, newValue) => {
                                    // @ts-ignore
                                    setMatchForm({...matchForm, pairA: newValue})
                                }}
                            />
                            <Autocomplete
                                sx={{my: 1}}
                                multiple
                                disablePortal
                                value={matchForm?.pairB}
                                // @ts-ignore
                                options={users}
                                getOptionLabel={(option) => {
                                    // @ts-ignore
                                    return option.name;
                                }}
                                selectOnFocus
                                clearOnBlur
                                freeSolo
                                filterOptions={(options, params) => {
                                    return options.filter((option) => {
                                        return option.name.toLowerCase().includes(params.inputValue.toLowerCase()) ||
                                            option.nickname.toLowerCase().includes(params.inputValue.toLowerCase());
                                    })
                                }}
                                renderInput={(params) => <TextField {...params} label="Para A"/>}
                                onChange={(event, newValue) => {
                                    // @ts-ignore
                                    setMatchForm({...matchForm, pairB: newValue})
                                }}
                            />
                        </Box>

                    </>
                </Box>
                <Divider sx={{my: 2}}/>
                <Box sx={{display: "flex", wrap: "nowrap", alignItems: "stretch", justifyContent: "space-between"}}>
                    <TextField sx={{mt: 1}}
                               name="scoreA"
                               label="Wynik pary A"
                               variant="outlined"
                               value={matchForm?.scoreA}
                               onChange={handlePairScoreChange}/>
                    <TextField sx={{mt: 1}}
                               name="scoreB"
                               label="Wynik pary B"
                               variant="outlined"
                               value={matchForm?.scoreB}
                               onChange={handlePairScoreChange}/>
                </Box>
                <Divider sx={{my: 2}}/>
                {Array.from(Array(5)).map((_, index) => {
                    return (
                        <Box
                            key={index}
                            sx={{display: "flex", wrap: "nowrap", alignItems: "stretch", justifyContent: "space-between"}}>
                            <TextField sx={{mt: 1}}
                                       name="scoreA"
                                       label={`Wynik meczu ${index + 1} pary A`}
                                       variant="outlined"
                                       value={matchForm?.unitScores[index].scoreA}
                                       onChange={(e) => handleUnitScoreChange(e, index)}/>
                            <TextField sx={{mt: 1}}
                                       name="scoreB"
                                       label={`Wynik meczu ${index + 1} pary B`}
                                       variant="outlined"
                                       value={matchForm?.unitScores[index].scoreB}
                                       onChange={(e) => handleUnitScoreChange(e, index)}/>
                        </Box>
                    )
                })}
            </DialogContent>
            <DialogActions>
                <Button sx={{m: 1, mr: 2}} variant={"contained"}
                        onClick={handleAddMatchButton}>Dodaj mecz</Button>
            </DialogActions>
        </Dialog>
    )
}