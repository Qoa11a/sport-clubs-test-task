export default (clubs, cityForFilter) => {
  return clubs
    .reduce((acc, club) => {
      if (cityForFilter === club.city.slug || !cityForFilter) {
        acc.push(...club.activity);
      }
      return acc;
    }, [])
    .reduce((acc, act) => {
      if (!acc.some((c) => c.slug === act.slug)) {
        acc.push(act);
      }
      return acc;
    }, []);
};
