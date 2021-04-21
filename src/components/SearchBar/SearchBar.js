/* eslint-disable react/prop-types */
import "./SearchBar.scss";
import React, { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const SearchBar = (props) => {
  const { searchBar } = props;
  const [inputLabel, setInputLabel] = useState('Type a film title...');
  const classes = useStyles();

  const handleSearchKeyChange = (event) => {
    const { dispatch } = props;
    dispatch({
      type: 'CHANGE_SEARCH_KEY',
      value: event.target.value
    });
    setInputLabel(event.target.value === 'films' ?
      'Type a film title...'
      : 'Type a person name...');
  }

  const handleSearchValueChange = (event) => {
    const { dispatch } = props;
    dispatch({
      type: 'CHANGE_SEARCH_VALUE',
      value: event.target.value
    });
  }

  const handleSearchBtnChange = () => {
    const { dispatch } = props;
    dispatch({
      type: 'CHANGE_SEARCH_BTN',
      value: null
    });
  }


  return (
    <div
      className="container-bar">
      <div
        className="bar">
        <Hidden
          only="xs">
          <TextField
            label={inputLabel}
            value={searchBar.searchValue}
            variant="filled"
            fullWidth
            onChange={handleSearchValueChange}
            classes={{ root: classes.inputRoot }} />
        </Hidden>
        <Hidden
          smUp>
          <TextField
            label={inputLabel}
            value={searchBar.searchValue}
            variant="filled" fullWidth
            onChange={handleSearchValueChange}
            classes={{ root: classes.inputRootXs }} />
        </Hidden>
        <Button
          variant="contained"
          classes={{ root: classes.buttonRoot }}
          onClick={() => handleSearchBtnChange()}>
          Search
        </Button>
        <RadioGroup
          name="searchBy"
          row
          value={searchBar.searchKey}
          onChange={handleSearchKeyChange}>
          <FormControlLabel
            value="films"
            control={
              <Radio
                classes={{ root: classes.radioRoot, checked: classes.checked }} />
            }
            label="Films" />
          <FormControlLabel
            value="people"
            control={
              <Radio
                classes={{ root: classes.radioRoot, checked: classes.checked }} />
            }
            label="People" />
        </RadioGroup>
      </div>
    </div>
  )
}

const useStyles = makeStyles({
  buttonRoot: {
    color: '#fff',
    backgroundColor: 'rgb(247, 197, 33)',
    marginTop: '5px',
    fontWeight: 'bold'
  },
  radioRoot: {
    color: 'rgb(247, 197, 33)',
    '&$checked': {
      color: 'rgb(247, 197, 33)'
    }
  },
  checked: {},
  inputRoot: {
    width: '550px',
    backgroundColor: '#fff'
  },
  inputRootXs: {
    width: '290px',
    backgroundColor: '#fff'
  }
});

export default connect((state) => ({
  searchBar: state.searchBar
}))(SearchBar);