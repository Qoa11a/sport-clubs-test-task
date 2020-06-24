export default (clubs, activityForFilter) => {
  return clubs.reduce((acc, club) => {
    if (
      !acc.some((c) => c.slug === club.city.slug) &&
      (club.activity.map((act) => act.slug).includes(activityForFilter) ||
        !activityForFilter)
    ) {
      acc.push(club.city);
    }
    return acc;
  }, []);
};
