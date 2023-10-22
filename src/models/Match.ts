type Match = {
    id: string;
    createdAt: Date;
    scoreA: number;
    scoreB: number;
    pairA: Pair;
    pairB: Pair;
    matchRatingDifference: MatchRatingDifference[];
}