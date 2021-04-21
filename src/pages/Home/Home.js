/* eslint-disable react/prop-types */
import './Home.scss';
import React, { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { makeStyles } from '@material-ui/core/styles';
import { resources } from '../../services/resources';
import { connect } from 'react-redux';
import EmptyBox from '../../assets/animations/lottie-empty-box';
import Loading from '../../assets/animations/lottie-loading';
import Lottie from 'react-lottie';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import withWidth from '@material-ui/core/withWidth';

const Home = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { searchBar } = props;
  const { width } = props;
  console.log(width)
  const [datalist, setDatalist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    getData();
    async function getData() {
      let personFilms = [];
      const response = await (searchBar.searchKey === 'films' || searchBar.searchValue === '' ? resources.getFilms(getSearchParam()) : resources.getPeople(getSearchParam()));
      if (searchBar.searchKey === 'people' && searchBar.searchValue !== '') {
        for (const person of response.data.results) {
          for (let i = 0; i < person.films.length; i++) {
            const filmData = await resources.getFilms(person.films[i].substring(person.films[1].length - 2))
            personFilms.push(filmData.data);
          }
        }
        setDatalist(personFilms);
      } else {
        setDatalist(response.data.results);
      }
      setLoading(false);
    }
  }, [searchBar.searchKey, searchBar.searchBtn])

  const getSearchParam = () => {
    return searchBar.searchValue ? '?search=' + searchBar.searchValue : '';
  }

  const viewDetails = (film) => {
    localStorage.setItem('filmDetailed', JSON.stringify(film));
    history.push('/film-details');
  }

  return (
    <>
      <SearchBar />
      <List
        component="nav"
        aria-label="main mailbox folders">
        {
          loading ?
            <Lottie
              options={{ animationData: Loading }}
              width={200}
              height={300} />
            : datalist.length ?
              <div
                className="list-films-container">
                {
                  datalist.map((data, idx) => (
                    <div key={idx}>
                      <ListItem
                        button
                        onClick={() => viewDetails(data)}
                        classes={{ root: (width === 'xs' ? classes.listItemRootXs : classes.listItemRoot) }}>
                        <ListItemText
                          primary={data.title} />
                        <ListItemIcon
                          classes={{ root: classes.iconRoot }}>
                          <ArrowForwardIosIcon
                            fontSize="small" />
                        </ListItemIcon>
                      </ListItem>
                      <Divider />
                    </div>
                  ))
                }
              </div>
              :
              <div
                className="no-results-container">
                <Lottie
                  options={{ animationData: EmptyBox, loop: false }}
                  width={200}
                  height={300} />
                <p>No results found :(</p>
              </div>
        }
      </List>
    </>
  )
}

const useStyles = makeStyles({
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
  },
  iconRoot: {
    minWidth: 'unset'
  }
});

Home.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};


export default withWidth()(connect((state) => ({
  searchBar: state.searchBar
}))(Home));