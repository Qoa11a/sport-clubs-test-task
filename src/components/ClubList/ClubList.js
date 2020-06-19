import React from 'react';
import './ClubList.css';

class ClubList extends React.Component {
  constructor() {
    super();

    this.state = {
      clubs: [],
      citiesOptions: [],
      activitiesOptions: [],
      query: {
        city: '',
        activity: '',
      },
    };
  }

  componentDidMount() {
    this.getClubs();
  }

  getClubs() {
    fetch('https://instasport.co/dashboard/api/v1/clubs/')
      .then((results) => results.json())
      .then((clubs) => {
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
        });
      });
  }

  render() {
    const { query, clubs, citiesOptions, activitiesOptions } = this.state;

    const filteredClubs = clubs.filter((club) => {
      const citySlug = club.city.slug;
      const isCityFilterPass = citySlug === query.city || query.city === '';
      const actSlugs = club.activity.map((act) => act.slug);
      const isActFilterPass =
        actSlugs.includes(query.activity) || query.activity === '';

      return isCityFilterPass && isActFilterPass;
    });

    return (
      <>
        <span>Select City:</span>
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
          <option value=''>Select an option</option>
          {citiesOptions.map((city, index) => {
            return (
              <option key={index} value={city.slug}>
                {city.title}
              </option>
            );
          })}
        </select>

        <span>Select Activity:</span>
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
          <option value=''>Select an option</option>
          {activitiesOptions.map((activity, index) => (
            <option key={index} value={activity.slug}>
              {activity.title}
            </option>
          ))}
        </select>

        <div className='clubList'>
          {filteredClubs.map((club, index) => {
            return (
              <div key={index} className='clubItem'>
                <h1>
                  <a href={club.link}>{club.title_short}</a>
                </h1>
                <p>City: {club.city.title}</p>
                <ul>
                  Activities:{' '}
                  {club.activity.map((act, index) => {
                    return <li key={index}>{act.title}</li>;
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

export default ClubList;
