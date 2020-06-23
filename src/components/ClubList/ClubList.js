import React from 'react';
import './ClubList.scss';
import Loader from '../../Loader';

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
        // I just want to show loader, that's why I have timeout here
        setTimeout(() => {
          this.setState({
            clubs,
            citiesOptions: clubs.reduce((acc, club) => {
              if (!acc.some((c) => c.slug === club.city.slug)) {
                acc.push(club.city);
              }
              return acc;
            }, []),
            activitiesOptions: clubs
              .reduce((acc, club) => {
                acc.push(...club.activity);
                return acc;
              }, [])
              .reduce((acc, act) => {
                if (!acc.some((c) => c.slug === act.slug)) {
                  acc.push(act);
                }
                return acc;
              }, []),
            isLoading: false,
          });
        }, 1000);
      });
  }

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
                  this.setState({
                    query: {
                      city: event.target.value,
                      activity: this.state.query.activity,
                    },
                  });
                }}
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
                  this.setState({
                    query: {
                      city: this.state.query.city,
                      activity: event.target.value,
                    },
                  });
                }}
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
