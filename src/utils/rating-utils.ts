export const getRatingByType = (type: string, ratings: Rating[]): Rating | undefined => {
    return ratings.find((rating: Rating) => rating.ratingType === type);
}