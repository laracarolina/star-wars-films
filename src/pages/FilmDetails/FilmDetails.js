import './FilmDetails.scss'
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button'; import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import LightSaber from '../../assets/images/lightsabers.svg';
import { useHistory } from 'react-router-dom';
import { resources } from '../../services/resources';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Loading from '../../assets/animations/lottie-loading';
import Lottie from 'react-lottie';
import PropTypes from 'prop-types';
import withWidth from '@material-ui/core/withWidth';

const FilmDetails = (props) => {
  const classes = useStyles();
  const [film, setFilm] = useState({});
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { width } = props;

  useEffect(() => {
    setLoading(true);
    const film = JSON.parse(localStorage.getItem('filmDetailed'));
    setFilm(film);
    getPeople();
    async function getPeople() {
      let filmPeople = [];
      for (let i = 0; i < film.characters.length; i++) {
        const personData = await resources.getPeople(film.characters[i].substring(film.characters[1].length - 2))
        filmPeople.push(personData.data);
      }
      setPeople(filmPeople);
      setLoading(false);
    }
  }, [])

  const handleBtnChange = () => {
    history.push('/');
  }

  return (
    <div
      className="container">
      <div
        className="container-details">
        <div
          className={width === 'xs' ? 'container-width-xs' : 'container-width'}>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => handleBtnChange()}
            classes={{ root: (width === 'xs' ? classes.buttonRootXs : classes.buttonRoot) }}>
            Back
          </Button>
          {width === 'xs' ?
            <h3>{film.title}</h3>
            :
            <h1>{film.title}</h1>
          }
          <img
            src={LightSaber}
            alt="lightsaber" />
          <p>{film.opening_crawl}</p>
          <div
            className="details">
            <span>Release date: {film.release_date}</span>
            <span>Director: {film.director}</span>
          </div>
          <h2>People</h2>
          <List
            component="nav"
            aria-label="main mailbox folders">
            {
              loading ?
                <Lottie
                  options={{ animationData: Loading }}
                  width={200}
                  height={300} />
                :
                people.map((people, idx) => (
                  <div key={idx}>
                    <ListItem
                      classes={{ root: (width === 'xs' ? classes.listItemRootXs : classes.listItemRoot) }}>
                      <ListItemText
                        primary={people.name} />
                    </ListItem>
                    <Divider />
                  </div>
                ))
            }
          </List>
        </div>
      </div>
    </div >
  )
}

const useStyles = makeStyles({
  buttonRoot: {
    color: '#fff',
    width: '550px',
    backgroundColor: 'rgb(247, 197, 33)',
    fontWeight: 'bold',
    marginTop: '50px'
  },
  buttonRootXs: {
    color: '#fff',
    width: '290px',
    backgroundColor: 'rgb(247, 197, 33)',
    fontWeight: 'bold',
    marginTop: '50px'
  },
  listItemRoot: {
    backgroundColor: '#fff',
    width: '550px',
    color: 'black',
    height: '60px',
    marginBottom: '10px',
    '&:hover': {
      backgroundColor: 'rgb(247, 197, 33)',
      color: '#fff',
      fontWeight: 'bold'
    }
  },
  listItemRootXs: {
    backgroundColor: '#fff',
    width: '290px',
    color: 'black',
    height: '60px',
    marginBottom: '10px',
    '&:hover': {
      backgroundColor: 'rgb(247, 197, 33)',
      color: '#fff',
      fontWeight: 'bold'
    }
  }
});

FilmDetails.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default withWidth()(FilmDetails);