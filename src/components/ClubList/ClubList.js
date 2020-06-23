import React from 'react';
import './ClubList.scss';
import Loader from '../../Loader';

const getActivitiesOptions = (clubs, cityForFilter) => {
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

const getCitiesOptions = (clubs, activityForFilter) => {
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

class ClubList extends React.Component {
  state = {
    clubs: [],
    citiesOptions: [],
    activitiesOptions: [],
    query: {
      city: '',
      activity: '',
    },
    isLoading: true,
  };

  componentDidMount() {
    this.getClubs();
  }

  getClubs() {
    fetch('https://instasport.co/dashboard/api/v1/clubs/')
      .then((results) => results.json())
      .then((clubs) => {
        this.setState({
          clubs,
          citiesOptions: getCitiesOptions(clubs),
          activitiesOptions: getActivitiesOptions(clubs),
          isLoading: false,
        });
      });
  }

  updateCitiesOptions() {}

  render() {
    const {
      query,
      clubs,
      citiesOptions,
      activitiesOptions,
      isLoading,
    } = this.state;

    const filteredClubs = clubs.filter((club) => {
      const citySlug = club.city.slug;
      const isCityFilterPass = citySlug === query.city || query.city === '';
      const actSlugs = club.activity.map((act) => act.slug);
      const isActFilterPass =
        actSlugs.includes(query.activity) || query.activity === '';

      return isCityFilterPass && isActFilterPass;
    });

    return (
      <main className='main__container'>
        <div className='clubFilters'>
          <div className='clubFilters__cityFilter_container'>
            <span className='clubFilters__cityFilter_title'>
              Выберите Город:
            </span>
            <div className='select'>
              <select
                onChange={(event) => {
                  const city = event.target.value;
                  this.setState({
                    isLoading: true,
                  });
                  setTimeout(() => {
                    this.setState({
                      query: {
                        city,
                        activity: this.state.query.activity,
                      },
                      activitiesOptions: getActivitiesOptions(clubs, city),
                      isLoading: false,
                    });
                  }, 1000);
                }}
                value={this.state.query.city}
              >
                <option value=''>Все города</option>
                {citiesOptions.map((city, index) => {
                  return (
                    <option key={index} value={city.slug}>
                      {city.title}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className='clubFilters__activityFilter_container'>
            <span className='clubFilters__activityFilter_title'>
              Выберите Направление:
            </span>
            <div className='select'>
              <select
                onChange={(event) => {
                  const activity = event.target.value;
                  this.setState({
                    isLoading: true,
                  });
                  setTimeout(() => {
                    this.setState({
                      query: {
                        city: this.state.query.city,
                        activity,
                      },
                      citiesOptions: getCitiesOptions(clubs, activity),
                      isLoading: false,
                    });
                  }, 1000);
                }}
                value={this.state.query.activity}
              >
                <option value=''>Все направления</option>
                {activitiesOptions.map((activity, index) => (
                  <option key={index} value={activity.slug}>
                    {activity.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <div className='clubList'>
            {filteredClubs.map((club, index) => {
              return (
                <a href={club.link} className='clubList__clubItem_link'>
                  <div key={index} className='clubList__clubItem clubItem'>
                    <img
                      src={club.logo}
                      alt='Club Logo'
                      className='clubItem__logo'
                    />
                    <h1 className='clubItem__title'>{club.title_short}</h1>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </main>
    );
  }
}

export default ClubList;
