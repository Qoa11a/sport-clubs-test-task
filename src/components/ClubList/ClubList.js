import React from 'react';

import { getCitiesOptions, getActivitiesOptions } from '../../helpers';

import Loader from '../Loader/Loader';

import './ClubList.scss';

const FAKE_FETCH_TIMEOUT = 1000;

class ClubList extends React.Component {
  state = {
    clubs: [],
    citiesOptions: [],
    activitiesOptions: [],
    query: {
      city: '',
      activity: '',
    },
    isLoading: false,
  };

  componentDidMount() {
    this.getClubs();
  }

  getClubs() {
    this.setState(() => ({
      isLoading: true,
    }));
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

  startFakeTimeout() {
    setTimeout(() => {
      this.setState(() => ({
        isLoading: false,
      }));
    }, FAKE_FETCH_TIMEOUT);
  }

  onChangeCityFilter = (event) => {
    const { clubs, query } = this.state;
    const city = event.target.value;
    this.setState(() => ({
      isLoading: true,
      query: {
        ...query,
        city,
      },
      activitiesOptions: getActivitiesOptions(clubs, city),
    }));
    this.startFakeTimeout();
  };

  onChangeActivityFilter = (event) => {
    const { clubs, query } = this.state;
    const activity = event.target.value;
    this.setState(() => ({
      isLoading: true,
      query: {
        ...query,
        activity,
      },
      citiesOptions: getCitiesOptions(clubs, activity),
    }));
    this.startFakeTimeout();
  };

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
                onChange={this.onChangeCityFilter}
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
                onChange={this.onChangeActivityFilter}
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
                <a
                  href={club.link}
                  className='clubList__clubItem_link'
                  key={index}
                >
                  <div className='clubList__clubItem clubItem'>
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
